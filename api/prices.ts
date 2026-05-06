export const config = { runtime: "edge" };

const TICKERS = ["META", "MSFT", "GOOGL", "AMZN", "AAPL"] as const;

export default async function handler(): Promise<Response> {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "FINNHUB_API_KEY not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const results = await Promise.all(
      TICKERS.map(async (ticker) => {
        const r = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`
        );
        if (!r.ok) throw new Error(`Finnhub ${ticker}: ${r.status}`);
        const q = (await r.json()) as {
          c: number;
          d: number;
          dp: number;
          h: number;
          l: number;
          pc: number;
        };
        return [
          ticker,
          {
            price: q.c,
            change: q.d,
            percentChange: q.dp,
            previousClose: q.pc,
          },
        ] as const;
      })
    );

    return new Response(JSON.stringify(Object.fromEntries(results)), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: String(e) }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
