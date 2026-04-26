export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("@/lib/config");
    const { connectDB } = await import("@/lib/db/connection");
    await connectDB();
  }
}
