import { performance } from "perf_hooks";

export async function checkUrl(url, region = "INDIA") {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  const start = performance.now();

  try {
    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
    });

    const end = performance.now();
    clearTimeout(timeout);

    return {
      url,
      status: response.ok ? "UP" : "DOWN",
      statusCode: response.status,
      responseTimeMs: Math.round(end - start),
      checkedAt: new Date().toISOString(),
      region,
    };
  } catch (error) {
    const end = performance.now();

    return {
      url,
      status: "DOWN",
      statusCode: null,
      responseTimeMs: Math.round(end - start),
      error: error.name === "AbortError" ? "Timeout" : error.message,
      checkedAt: new Date().toISOString(),
      region,
    };
  }
}
