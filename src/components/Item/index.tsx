import { useParams } from "react-router-dom";
import UserItem from "./UserItem";
import PropertyItem from "./PropertyItem";

export function Item() {
  const { page } = useParams();

  if (page === "user") {
    return <UserItem />;
  }

  if (page === "property") {
    return <PropertyItem />;
  }

  return <div>404</div>;
}
