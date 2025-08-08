import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const DATASET_ID = process.env.FB_DATASET_ID;       // e.g., 1551862949121403
    const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;   // from Events Manager > Conversions API

    if (!DATASET_ID || !ACCESS_TOKEN) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing FB_DATASET_ID or FB_ACCESS_TOKEN' }), { status: 500 });
    }

    // Optional test_event_code lets you see events in "Test Events"
    const testCode = process.env.FB_TEST_EVENT_CODE; // optional

    const url = new URL(`https://graph.facebook.com/v19.0/${DATASET_ID}/events`);
    url.searchParams.set('access_token', ACCESS_TOKEN);
    if (testCode) url.searchParams.set('test_event_code', testCode);

    // Expect body like: { data: [ { event_name, event_time, user_data, custom_data, action_source } ] }
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    const status = res.ok ? 200 : 500;
    return new Response(JSON.stringify(json), { status });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: String(e?.message || e) }), { status: 500 });
  }
}
