export default function PropertyItem(props: any) {
  const { property } = props;
  const { Address, Zipcode, City, Name, Size, isRented } = property;
  return (
    <div>
      <p>Address: {Address}</p>
      <p>Zipcode: {Zipcode}</p>
      <p>City: {City}</p>
      <p>Name: {Name}</p>
      <p>Size: {Size}</p>
      <p>isRented: {isRented}</p>
    </div>
  );
}
