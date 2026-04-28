import { NextResponse } from "next/server";

const notImplemented = () =>
	NextResponse.json({ message: "Not implemented" }, { status: 501 });

export const GET = notImplemented;
export const POST = notImplemented;
export const PUT = notImplemented;
export const PATCH = notImplemented;
export const DELETE = notImplemented;
