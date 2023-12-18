export default function UserItem(props: any) {
  const { user } = props;
  const { name, number, email, address } = user;

  return (
    <div>
      <p>Name: {name}</p>
      <p>Number: {number}</p>
      <p>Email: {email}</p>
      <p>Address: {address}</p>
    </div>
  );
}
