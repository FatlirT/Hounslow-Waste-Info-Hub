import type { NextApiRequest, NextApiResponse } from "next";

export default async function postContent(
  method: string, category: string, id: string, content: string, authToken: string
) {
  // construct url
  const categorys = category !== undefined ? category : "";
  if(categorys === ""){return undefined}
  const ids = id !== undefined ? id : "";
  const url =
    `/api/${category}` + `${id !== "" ? `/${id}` : ""}`;
  const token =
    authToken !== undefined ? authToken : "";

  // construct headers
  const headers = {
    "content-type": "application/json",
    Authorization: token,
  };

  // handle requests
  if (method === "DELETE") {
    const resapi = await fetch(url, {
      method: method,
      mode: "cors",
      headers: headers,
    });
  } else if (method === "POST") {
    const resapi = await fetch(url, {
      method: method,
      mode: "cors",
      body: content,
      headers: headers,
    });
  }
}
