import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ ok: false, error: "Missing url" }, { status: 400 });
  }

  try {
    const dataUrl = await QRCode.toDataURL(url, {
      width: 256,
      margin: 2,
      color: { dark: "#0e1220", light: "#ffffff" },
    });
    return NextResponse.json({ ok: true, dataUrl });
  } catch {
    return NextResponse.json({ ok: false, error: "QR generation failed" }, { status: 500 });
  }
}
