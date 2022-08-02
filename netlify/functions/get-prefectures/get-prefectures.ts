import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async () => {
  const API_KEY = process.env.API_KEY ?? "";
  const API_ENDPOINT = "https://opendata.resas-portal.go.jp" as const;
  const API_VERSION = "v1";

  const resp = await fetch(`${API_ENDPOINT}/api/${API_VERSION}/prefectures/`, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  const responseHeaderSetting = {
    "Access-Control-Allow-Origin": "*",
  };

  return {
    statusCode: 200,
    headers: responseHeaderSetting,
    body: JSON.stringify(await resp.json()),
  };
};
