import { BrowserRouter, Route, Routes } from "react-router-dom";

import Nav from "./Layout/Nav";
import Footer from "./Layout/Footer";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./Utils/PrivateRoute";
import Login from "./Pages/Login";
import "./App.css";
import AddProduct from "./Pages/AddProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<h1>Product List</h1>} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update" element={<h1>Update</h1>} />
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
