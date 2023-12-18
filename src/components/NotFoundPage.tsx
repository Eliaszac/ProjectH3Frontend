import React from "react";

export function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
    </div>
  );
}

export default NotFoundPage;
