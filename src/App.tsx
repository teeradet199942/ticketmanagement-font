import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar";
import Create from "./components/create_ticket/create";
import Table from "./components/table_ticket/table";
import axios, { AxiosResponse } from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getDataList();
  }, []);
  const getDataList = () => {
    axios
      .get("http://localhost:3000/user/gettickeet_detail")
      .then((response: AxiosResponse) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Create getDataList={() => getDataList()} />}
          />
          <Route
            path="/management"
            element={
              <Table getDataList={() => getDataList()} data={data as []} />
            }
          />
        </Routes>
    </div>
  );
}

export default App;
