import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AppError } from "./errors";

export type ApiSuccess<T> = { data: T; meta?: Record<string, unknown> };

export function ok<T>(data: T, init?: ResponseInit): NextResponse {
  return NextResponse.json<ApiSuccess<T>>({ data }, init);
}

export function created<T>(data: T): NextResponse {
  return NextResponse.json<ApiSuccess<T>>({ data }, { status: 201 });
}

export function paginated<T>(
  data: T[],
  page: number,
  pageSize: number,
  total: number,
): NextResponse {
  return NextResponse.json<ApiSuccess<T[]>>({
    data,
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

export function noContent(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

export function fail(
  message: string,
  status: number,
  errors?: Record<string, string[]>,
): NextResponse {
  return NextResponse.json<ApiError>(
    { message, statusCode: status, errors },
    { status },
  );
}

function zodErrorToMap(error: ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_";
    (errors[key] ??= []).push(issue.message);
  }
  return errors;
}

export function handleRouteError(error: unknown): NextResponse {
  if (error instanceof ZodError) {
    return fail("Validation failed", 422, zodErrorToMap(error));
  }
  if (error instanceof SyntaxError) {
    return fail("Invalid JSON body", 400);
  }
  if (error instanceof AppError) {
    const errors =
      error.details && typeof error.details === "object"
        ? (error.details as Record<string, string[]>)
        : undefined;
    return fail(error.message, error.status, errors);
  }
  console.error(error);
  return fail("Internal server error", 500);
}
