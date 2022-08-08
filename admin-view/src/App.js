import { BrowserRouter, Route, Routes } from "react-router-dom";

import Nav from "./Layout/Nav";
import Footer from "./Layout/Footer";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./Utils/PrivateRoute";
import Login from "./Pages/Login";
import "./App.css";
import AddProduct from "./Pages/AddProduct";
import ProductList from "./Pages/ProductList";
import UpdateProduct from "./Pages/UpdateProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
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
