import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

interface Response {
  message: null;
  result: {
    boundaryYear: number;
    data: History[];
  };
}

interface History {
  label: string;
  data: {
    year: number;
    value: number;
  };
}

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

  const resp = await fetch(requestURL, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  const toJSON = (await resp.json()) as Record<keyof Response, unknown>;
  const result = toJSON.result as Record<keyof History, unknown>;
  const data = result.data;

  const responseHeaderSetting = {
    "Access-Control-Allow-Origin": "*",
  };

  if (!Array.isArray(data)) {
    throw new Error('"data" type ERROR');
  }

  return {
    statusCode: 200,
    headers: responseHeaderSetting,
    body: JSON.stringify(data[0]),
  };
};
