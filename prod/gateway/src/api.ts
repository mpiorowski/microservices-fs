type Props = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body: string | null;
};
export const api = async ({ url, method, body }: Props) => {
  let headers = {};
  if (method === "POST" || method === "PUT") {
    headers = {
      "Content-Type": "application/json",
    };
  }
  const response = await fetch(url, { method, body, headers });
  if (response.ok) {
    return response.json();
  } else {
    throw Error(await response.text());
  }
};
