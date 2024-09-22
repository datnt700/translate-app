import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const response = await fetch(
      `https://api.mymemory.translated.net?langpair=${payload.languages}&q=${payload.text}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error translating text:', error);
    return NextResponse.json({ error: 'Translation failed' });
  }
}
