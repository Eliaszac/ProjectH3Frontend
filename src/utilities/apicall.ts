import { toast } from "react-hot-toast";
export interface IApiCallProps {
  url: string;
  type?: ApiCallType;
  body?: any;
  token?: string;
  setToken?: (token: any) => void;
  setLoggedInUser?: (user: any) => void;
}

export const baseurl = "https://localhost:7008";

export async function ApiCall(props: IApiCallProps) {
  const { url, body, type, token, setToken, setLoggedInUser } = props;
  const response = await fetch(baseurl + url, {
    method: type,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        token
          ? token
          : localStorage.getItem("token")
          ? localStorage.getItem("token")
          : ""
      }`,
    },
    body: JSON.stringify(body),
  });

  if (response.status !== 200) {
    toast.error("Something went wrong");
    throw new Error(`something went wrong`);
  }

  const e = await response.json();
  if (e.data.token && setToken) setToken(e.data.token);

  if (e.data.uuid && setLoggedInUser) {
    setLoggedInUser(e.data.uuid);
  }

  return e.data;
}

export enum ApiCallType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
