import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async (event) => {
  const API_KEY = process.env.API_KEY ?? "";
  const API_ENDPOINT = "https://opendata.resas-portal.go.jp" as const;
  const API_VERSION = "v1" as const;

  const query = event.queryStringParameters?.prefCode;

  if (query === undefined) {
    // 必要なクエリが指定されていない場合リクエストを行わない
    return {
      statusCode: 400,
      body: 'query parameter "prefCode" is undefined.',
    };
  }

  const resp = await fetch(
    `${API_ENDPOINT}/api/${API_VERSION}/population/composition/perYear?prefCode=${query}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );

  const responseHeaderSetting = {
    "Access-Control-Allow-Origin": "*",
  };

  return {
    statusCode: 200,
    headers: responseHeaderSetting,
    body: JSON.stringify(await resp.json()),
  };
};
