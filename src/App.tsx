import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import onUrlChange from "./onUrlChange";
import { useLoggedInUserStore, useDataStore } from "./Stores";
import { LoginPage, Routing } from "./components";
import { Toaster } from "react-hot-toast";

function App() {
  const { token } = useLoggedInUserStore();
  const { setData, data } = useDataStore();
  const { url, page, uuid } = useParams();

  useEffect(() => {
    //onUrlChange({ uuid, page, setData, data });
  }, [url, page, uuid]);

  if (!token) {
    return (
      <div>
        <LoginPage />
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    );
  }

  return (
    <div>
      <Routing />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
