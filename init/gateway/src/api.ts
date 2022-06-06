type Props = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body: string | null;
};
export const api = async <T>({ url, method, body }: Props): Promise<T> => {
  let headers = {};
  if (method === 'POST' || method === 'PUT') {
    headers = {
      'Content-Type': 'application/json',
    };
  }
  const response = await fetch(url, { method, body, headers });
  if (response.ok) {
    return (await response.json()) as T;
  } else {
    throw Error(await response.text());
  }
};
