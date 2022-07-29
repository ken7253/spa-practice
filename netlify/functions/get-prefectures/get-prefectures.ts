import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

export const handler: Handler = async (_event, _context) => {

  const API_KEY = process.env.API_KEY ?? '';
  const API_ENDPOINT = 'https://opendata.resas-portal.go.jp' as const;
  const API_VERSION = 'v1';
  
  const resp = await fetch(`${API_ENDPOINT}/api/${API_VERSION}/prefectures/`, {
    headers: {
      'X-API-KEY': API_KEY,
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(await resp.json()),
  };
}
