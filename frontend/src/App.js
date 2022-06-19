import { BrowserRouter, Route, Routes } from "react-router-dom";

import Nav from "./Layout/Nav";
import Footer from "./Layout/Footer";
import SignUp from "./SignUp";


import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Product List</h1>} />
          <Route path="/add" element={<h1>Add Product</h1>} />
          <Route path="/update" element={<h1>Update</h1>} />
          <Route path="/logout" element={<h1>Logout</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
