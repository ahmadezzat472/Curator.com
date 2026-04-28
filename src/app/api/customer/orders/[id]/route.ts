import { NextResponse } from "next/server";

const notImplemented = () =>
	NextResponse.json({ message: "Not implemented" }, { status: 501 });

export const GET = notImplemented;
