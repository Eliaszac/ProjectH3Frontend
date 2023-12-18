import { ApiCall, ApiCallType } from "./utilities";

export default async function onUrlChange(props: any) {
  const { page, uuid, setData, data } = props;

  if (!page) {
    const v = await ApiCall({ url: `/user`, type: ApiCallType.GET });
    setData({ ...data, users: v });
    const j = await ApiCall({ url: `/properties`, type: ApiCallType.GET });
    setData({ ...data, properties: j });
  }

  if (page === "user") {
    if (uuid) {
      const e = await ApiCall({ url: `/user/${uuid}`, type: ApiCallType.GET });
      setData({ ...data, users: e });
    } else {
      const f = await ApiCall({ url: `/user`, type: ApiCallType.GET });
      setData({ ...data, user: f });
    }
  }

  if (page === "property") {
    if (uuid) {
      const d = await ApiCall({
        url: `/properties/${uuid}`,
        type: ApiCallType.GET,
      });
      setData({ ...data, properties: d });
    } else {
      const c = await ApiCall({ url: `/properties`, type: ApiCallType.GET });
      setData({ ...data, properties: c });
    }
  }
}
