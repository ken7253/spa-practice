import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

interface ReceiveData {
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
  }[];
}

export interface SendData {
  prefCode: number;
  data: number[];
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

  const toJSON = (await resp.json()) as ReceiveData; // 手動で型定義
  const result = toJSON.result;
  const categoryData = result.data;

  const formatData = (data: History[]): SendData => {
    if (!Array.isArray(data)) return;

    const totalPopulation = data[0];

    const prefNum = parseInt(prefCode, 10);
    if (isNaN(prefNum)) return;
    return {
      prefCode: prefNum,
      data: totalPopulation.data.map((item) => item.value),
    };
  };

  console.log(formatData(categoryData));

  const responseHeaderSetting = {
    "Access-Control-Allow-Origin": "*",
  };

  return {
    statusCode: 200,
    headers: responseHeaderSetting,
    body: JSON.stringify(formatData(categoryData)),
  };
};
