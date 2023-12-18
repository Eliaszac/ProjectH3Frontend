import { Button, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export function Layout(props: any) {
  const { children } = props;

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "98vh",
      }}
    >
      <div
        style={{
          width: "100%",
          justifyContent: "flex-end",
          height: "5%",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "right",
          backgroundColor: "#468966",
          borderRadius: "25px",
        }}
      >
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={() => (window.location.href = "/")} sx={aStyle}>
            Home
          </Button>
          <IconButton sx={aStyle}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton sx={aStyle}>
            <NotificationsIcon />
          </IconButton>
          <Button onClick={handleLogout} sx={aStyle}>
            Logout
          </Button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}

const aStyle = {
  marginRight: "12px",
  textDecoration: "none",
  borderRadius: "25px",
  color: "#FFF",
};
