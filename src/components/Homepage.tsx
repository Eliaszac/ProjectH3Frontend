import React, { useEffect } from "react";
import { Box, IconButton, Modal, Button, TextField } from "@mui/material";
import { ApiCall, ApiCallType } from "../utilities";
import { useLoggedInUserStore } from "../Stores";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import { toast } from "react-hot-toast";

export function HomePage() {
  const { loggedInUser } = useLoggedInUserStore();
  const [users, setUsers] = React.useState<any[]>([]);
  const [properties, setProperties] = React.useState<any[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<any>({
    id: 0,
    uuid: "",
    name: "",
    phonenumber: "",
    email: "",
    password: "",
  });
  const [selectedProperty, setSelectedProperty] = React.useState<any>({
    id: 0,
    uuid: "",
    address: "",
    zipcode: 0,
    city: "",
    size: 0,
    isRented: false,
  });
  const [edit, setEdit] = React.useState<boolean>(false);
  const [editProperty, setEditProperty] = React.useState<boolean>(false);
  const [newUser, setNewUser] = React.useState<any>({
    id: 0,
    uuid: "",
    name: "",
    phonenumber: "",
    email: "",
    password: "",
  });
  const [newProperty, setNewProperty] = React.useState<any>({
    id: 0,
    uuid: "",
    address: "",
    zipcode: 0,
    city: "",
    size: 0,
    isRented: false,
  });
  const [makingNewUser, setMakingNewUser] = React.useState<boolean>(false);
  const [makingNewProperty, setMakingNewProperty] =
    React.useState<boolean>(false);

  useEffect(() => {
    getUsers();
    getProperties();
  }, []);

  async function getUsers() {
    await ApiCall({ type: ApiCallType.GET, url: "/user" }).then((data) => {
      setUsers(data);
    });
  }

  async function addUser() {
    const b = { ...newUser };
    delete b.uuid;
    await ApiCall({ type: ApiCallType.POST, url: "/user", body: { ...b } });
    getUsers();
    setNewUser({ id: 0, uuid: "", name: "", phonenumber: "", email: "" });
    setMakingNewUser(false);
    toast.success("User created");
  }

  async function addProperty() {
    const b = { ...newProperty };
    delete b.uuid;
    await ApiCall({
      type: ApiCallType.POST,
      url: "/properties",
      body: { ...b },
    });
    getProperties();
    setNewProperty({
      id: 0,
      uuid: "",
      address: "",
      zipcode: 0,
      city: "",
      size: 0,
      isRented: false,
    });
    setMakingNewProperty(false);
    toast.success("Property created");
  }

  async function getProperties() {
    await ApiCall({ type: ApiCallType.GET, url: "/properties" }).then(
      (data) => {
        setProperties(data);
      }
    );
  }

  function deleteUser(uuid: string) {
    ApiCall({ type: ApiCallType.DELETE, url: "/api/User/user/" + uuid });
    getUsers();
    toast.success("User deleted");
  }

  function deleteProperty(uuid: string) {
    ApiCall({
      type: ApiCallType.DELETE,
      url: "/api/Property/properties/" + uuid,
    });
    getProperties();
    toast.success("Property deleted");
  }

  async function updateUser() {
    const b = { ...selectedUser };
    delete b.uuid;
    await ApiCall({
      type: ApiCallType.PUT,
      url: "/api/user/user/" + selectedUser.uuid,
      body: { ...b },
    });
    getUsers();
    setSelectedUser({
      id: 0,
      uuid: "",
      name: "",
      phonenumber: "",
      email: "",
      password: "",
    });
    setEdit(false);
    toast.success("User updated");
  }

  async function updateProperty() {
    const b = { ...selectedProperty };
    delete b.uuid;
    await ApiCall({
      type: ApiCallType.PUT,
      url: "/api/property/properties/" + selectedProperty.uuid,
      body: { ...b },
    });
    getProperties();
    setSelectedProperty({
      id: 0,
      uuid: "",
      address: "",
      zipcode: 0,
      city: "",
      size: 0,
      isRented: false,
    });
    setEditProperty(false);
    toast.success("Property updated");
  }

  const userColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      sortable: false,
    },
    {
      field: "phonenumber",
      headerName: "Phonenumber",
      width: 130,
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
      sortable: false,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          sx={{ color: "#b64926" }}
          onClick={() => deleteUser(params.row.uuid)}
        >
          <DeleteIcon />
        </IconButton>
      ),
      sortable: false,
    },
    {
      field: "update",
      headerName: "Update",
      width: 70,
      renderCell: (params) => (
        <IconButton
          aria-label="update"
          sx={{ color: "#468966" }}
          onClick={() => {
            setSelectedUser(params.row);
            setEdit(true);
          }}
        >
          <Edit />
        </IconButton>
      ),
      sortable: false,
    },
  ];

  const propertyColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60, sortable: false },
    { field: "address", headerName: "Address", width: 100, sortable: false },
    { field: "zipcode", headerName: "Zipcode", width: 100, sortable: false },
    { field: "city", headerName: "City", width: 100, sortable: false },
    { field: "size", headerName: "Size", width: 100, sortable: false },
    { field: "isRented", headerName: "isRented", width: 80, sortable: false },
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          sx={{ color: "#b64926" }}
          onClick={() => deleteProperty(params.row.uuid)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      field: "update",
      headerName: "Update",
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          sx={{ color: "#468966" }}
          aria-label="update"
          onClick={() => {
            setSelectedProperty(params.row);
            setEditProperty(true);
          }}
        >
          <Edit />
        </IconButton>
      ),
    },
  ];

  /*
  return (
    <Carousel>
      <Cardd
        title="Manage Users"
        description="Manage users and their roles"
        handleOnClick={() => {
          window.location.href = "/users";
        }}
      />
      <Cardd
        title="Manage Houses"
        description="Manage houses and their rooms"
        handleOnClick={() => {
          window.location.href = "/houses";
        }}
      />
      <Cardd
        title="Manage Bookings"
        description="Manage bookings and their statuses"
        handleOnClick={() => {
          window.location.href = "/bookings";
        }}
      />
    </Carousel>
  );*/

  const buttonStyle = {
    marginRight: "10px",
    borderRadius: "25px",
    backgroundColor: "#468966",
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          sx={buttonStyle}
          onClick={() => setMakingNewUser(true)}
        >
          Add user
        </Button>
        <Button
          variant="contained"
          sx={buttonStyle}
          onClick={() => setMakingNewProperty(true)}
        >
          Add property
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Box sx={{ height: "600px", width: "50%" }}>
          <DataGrid
            rows={users}
            columns={userColumns}
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnMenu
            autoPageSize
          />
        </Box>
        <Box sx={{ height: "600px", width: "50%" }}>
          <DataGrid
            rows={properties}
            columns={propertyColumns}
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnMenu
            autoPageSize
          />
        </Box>
        <UserModal
          open={makingNewUser ? true : edit}
          edit={makingNewUser ? false : edit}
          handleClose={() => {
            setEdit(false);
            setSelectedUser({
              id: 0,
              uuid: "",
              name: "",
              phonenumber: "",
              email: "",
              password: "",
            });
            setNewUser({
              id: 0,
              uuid: "",
              name: "",
              phonenumber: "",
              email: "",
              password: "",
            });
            setMakingNewUser(false);
          }}
          item={makingNewUser ? newUser : selectedUser}
          setItem={makingNewUser ? setNewUser : setSelectedUser}
          updateUser={makingNewUser ? addUser : updateUser}
        />
        <PropertyModal
          open={makingNewProperty ? true : editProperty}
          edit={makingNewProperty ? false : editProperty}
          handleClose={() => {
            setEditProperty(false);
            setMakingNewProperty(false);
            setNewProperty({
              id: 0,
              uuid: "",
              address: "",
              zipcode: 0,
              city: "",
              size: 0,
              isRented: false,
            });
            setSelectedProperty({
              id: 0,
              uuid: "",
              address: "",
              zipcode: 0,
              city: "",
              size: 0,
              isRented: false,
            });
          }}
          item={makingNewProperty ? newProperty : selectedProperty}
          setItem={makingNewProperty ? setNewProperty : setSelectedProperty}
          updateProperty={makingNewProperty ? addProperty : updateProperty}
        />
      </div>
    </div>
  );
}

const modalstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserModal(props: any) {
  const { open, handleClose, item, updateUser, setItem, edit } = props;
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalstyle}>
        <TextField
          label="Name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Phonenumber"
          value={item.phonenumber}
          onChange={(e) => setItem({ ...item, phonenumber: e.target.value })}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Email"
          value={item.email}
          onChange={(e) => setItem({ ...item, email: e.target.value })}
          sx={{ marginBottom: "10px" }}
        />
        {!edit && (
          <TextField
            label="Password"
            value={item.password}
            onChange={(e) => setItem({ ...item, password: e.target.value })}
            sx={{ marginBottom: "10px" }}
          />
        )}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={updateUser}>
            {edit ? "Update User" : "Create User"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

function PropertyModal(props: any) {
  const { open, handleClose, item, updateProperty, setItem, edit } = props;
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalstyle}>
        <TextField
          label="Address"
          value={item.address}
          onChange={(e) => setItem({ ...item, address: e.target.value })}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Zipcode"
          type="number"
          value={item.zipcode}
          onChange={(e) => setItem({ ...item, zipcode: e.target.value })}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="city"
          value={item.City}
          onChange={(e) => setItem({ ...item, city: e.target.value })}
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Size"
          type="number"
          value={item.size}
          onChange={(e) => setItem({ ...item, size: e.target.value })}
          sx={{ marginBottom: "10px" }}
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button onClick={handleClose}>Close Modal</Button>
          <Button onClick={updateProperty}>
            {edit ? "Update Property" : "Create Property"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

/*
function Cardd(props: any) {
  const { description, title, handleOnClick } = props;
  return (
    <Card>
      <CardActionArea onClick={handleOnClick}>
        <CardMedia
          component="img"
          height="140"
          image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fvestergaardhuse.dk%2Ft-hus%2F&psig=AOvVaw2HewQWQw7jzIV3CPV2n5Dy&ust=1702379742285000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjwv_2gh4MDFQAAAAAdAAAAABAI"
          alt="House"
        />
        <CardContent>
          <h2>{title}</h2>
          <p>{description}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
*/
export default HomePage;
