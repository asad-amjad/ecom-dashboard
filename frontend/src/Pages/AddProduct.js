import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    if (!name || !category || !price || !company) {
      setError(true);
    } else {
      setError(false);
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      let result = await fetch("http://localhost:5000/add_product", {
        method: "post",
        body: JSON.stringify({ name, category, price, company, userId }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
    }
  };

  return (
    <div className="login">
      <h4>Add Product</h4>
      <input
        className="inputBox"
        type="name"
        value={name}
        placeholder="Enter Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && <p className="invalid-message">Enter a valid name</p>}

      <input
        className="inputBox"
        type="text"
        value={category}
        placeholder="Enter category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <p className="invalid-message">Enter a valid category</p>
      )}

      <input
        className="inputBox"
        type="text"
        value={price}
        placeholder="Enter Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <p className="invalid-message">Enter a valid price</p>
      )}

      <input
        className="inputBox"
        type="text"
        value={company}
        placeholder="Enter Company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      {error && !company && (
        <p className="invalid-message">Enter a valid company</p>
      )}

      <button
        className="saveButton"
        type="button"
        onClick={() => {
          submit();
        }}
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
