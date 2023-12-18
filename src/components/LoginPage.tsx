import React, { useEffect, useState } from "react";
import { useLoggedInUserStore } from "../Stores";
import { ApiCall, ApiCallType } from "../utilities";
import { Button, TextField, Box } from "@mui/material";
import { toast } from "react-hot-toast";

export function LoginPage() {
  const { token, setToken, setLoggedInUser } = useLoggedInUserStore();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (name && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [name, password]);

  function handleClick() {
    toast.promise(login(), {
      loading: "Loading...",
      success: <b>Logged In!</b>,
      error: <b>Login failed!</b>,
    });
  }

  async function login() {
    await ApiCall({
      url: "/login",
      setToken,
      token,
      type: ApiCallType.POST,
      body: { name, password },
      setLoggedInUser,
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      <h3>Login</h3>
      <TextField
        value={name}
        label={"Name"}
        required
        onChange={(e) => setName(e.target.value)}
        autoComplete="off"
      />
      <TextField
        value={password}
        label={"Password"}
        required
        onChange={(e) => setPassword(e.target.value)}
        type={"password"}
        autoComplete="off"
      />
      <Button onClick={handleClick} disabled={buttonDisabled}>
        Login
      </Button>
    </Box>
  );
}
