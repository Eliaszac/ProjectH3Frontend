import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import NotFoundPage from "./NotFoundPage";
import { HomePage } from "./Homepage";
import { Item } from "./Item";

export function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/:page/:uuid"
          element={
            <Layout>
              <Item />
            </Layout>
          }
        />
        <Route
          path={"*"}
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
