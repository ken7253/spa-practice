import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async (event) => {
  const API_KEY = process.env.API_KEY ?? "";
  const API_ENDPOINT = "https://opendata.resas-portal.go.jp" as const;
  const API_VERSION = "v1" as const;

  const { prefCode } = event.queryStringParameters;
  const requestURL = `${API_ENDPOINT}/api/${API_VERSION}/population/composition/perYear?prefCode=${prefCode}`;

  if (!prefCode) {
    // 必要なクエリが定義されていない場合はエラーを返す
    return {
      statusCode: 400,
      body: 'query parameter "prefCode" is undefined.',
    };
  }

  const data = await fetch(requestURL, {
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
    body: JSON.stringify(await data.json()),
  };
};
