import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_WC_URL;
const CK = process.env.WC_CONSUMER_KEY;
const CS = process.env.WC_CONSUMER_SECRET;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const url = new URL(`${BASE_URL}/wp-json/wc/v3/products`);
  url.searchParams.set("consumer_key", CK!);
  url.searchParams.set("consumer_secret", CS!);

  // Forward allowed query params
  const allowed = ["per_page", "page", "category", "on_sale", "featured", "orderby", "search", "slug"];
  allowed.forEach((key) => {
    const val = searchParams.get(key);
    if (val) url.searchParams.set(key, val);
  });

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  const data = await res.json();

  return NextResponse.json(data);
}
