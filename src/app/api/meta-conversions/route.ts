"use server";

import { NextResponse } from "next/server";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN;
const GRAPH_VERSION = "v21.0";

export async function POST(request: Request) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Meta Pixel não configurado no servidor" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const clientIp =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      undefined;

    const eventPayload = {
      event_name: body.eventName,
      event_time: body.eventTime ?? Math.floor(Date.now() / 1000),
      event_id: body.eventId,
      event_source_url: body.sourceUrl,
      action_source: "website",
      user_data: {
        ...(clientIp && { client_ip_address: clientIp.split(",")[0]?.trim() }),
        client_user_agent: body.userAgent ?? request.headers.get("user-agent"),
        ...(body.fbc && { fbc: body.fbc }),
        ...(body.fbp && { fbp: body.fbp }),
        ...(body.userData ?? {}),
      },
      custom_data: body.eventData,
    };

    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [eventPayload],
          access_token: ACCESS_TOKEN,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("[Meta Pixel] Erro na Conversions API", result);
      return NextResponse.json({ error: "Meta API error", details: result }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      eventsReceived: result.events_received,
      fbtrace_id: result.fbtrace_id,
    });
  } catch (error) {
    console.error("[Meta Pixel] Erro geral na Conversions API", error);
    return NextResponse.json(
      { error: "Falha ao enviar evento", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}


