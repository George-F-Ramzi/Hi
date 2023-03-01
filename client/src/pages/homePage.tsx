import React from "react";
import MainBar from "../components/mainBar";
import RequestsBar from "../components/requestsBar";

function HomePage() {
  return (
    <div className="flex">
      <MainBar />
      HomePage
      <RequestsBar />
    </div>
  );
}

export default HomePage;
