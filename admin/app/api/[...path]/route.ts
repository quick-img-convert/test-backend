import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:8000";

type Ctx = { params: { path: string[] } | Promise<{ path: string[] }> };

async function proxy(req: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params;
  const target = `${BACKEND}/${(path ?? []).join("/")}${req.nextUrl.search}`;
  const headers = new Headers();
  req.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (k === "host" || k === "connection" || k === "content-length") return;
    headers.set(key, value);
  });
  let body: ArrayBuffer | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.arrayBuffer();
  }
  let res: Response;
  try {
    res = await fetch(target, { method: req.method, headers, body, redirect: "manual" });
  } catch {
    return NextResponse.json(
      { error: { code: "backend_unreachable", message: "Backend not reachable. Start it with: docker compose up", details: {} } },
      { status: 502 }
    );
  }
  const outHeaders = new Headers();
  res.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (k === "content-encoding" || k === "content-length" || k === "transfer-encoding" || k === "connection") return;
    outHeaders.set(key, value);
  });
  const outBody = await res.arrayBuffer();
  return new NextResponse(outBody, { status: res.status, headers: outHeaders });
}

export async function GET(req: NextRequest, ctx: Ctx) { return proxy(req, ctx); }
export async function POST(req: NextRequest, ctx: Ctx) { return proxy(req, ctx); }
export async function PUT(req: NextRequest, ctx: Ctx) { return proxy(req, ctx); }
export async function PATCH(req: NextRequest, ctx: Ctx) { return proxy(req, ctx); }
export async function DELETE(req: NextRequest, ctx: Ctx) { return proxy(req, ctx); }
export async function OPTIONS(req: NextRequest, ctx: Ctx) { return proxy(req, ctx); }
