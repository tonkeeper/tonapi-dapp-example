import { TonApiClient } from "@ton-api/client";

const ta = new TonApiClient({
  baseUrl: "https://tonapi.io",
  apiKey: import.meta.env.VITE_TONAPI_KEY || undefined,
});

export default ta;