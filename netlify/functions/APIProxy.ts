import { Handler } from "@netlify/functions";

const API_KEY = process.env.API_KEY ?? '';
const API_ENDPOINT = 'https://opendata.resas-portal.go.jp';
const API_VERSION = 'v1';

const handler:Handler = async (event, context) => {

  const resp = await fetch(`${API_ENDPOINT}/api/${API_VERSION}`, {
    headers: {
      'X-API-KEY': API_KEY,
    }
  })

  return {
    statusCode: 200,
    body: JSON.stringify(resp)
  }
}

export { handler };