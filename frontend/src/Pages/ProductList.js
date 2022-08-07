import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPrducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      method: "get",
      headers: { authorization: JSON.parse(localStorage.getItem("token")) },
    });
    result = await result.json();
    setProducts(result);
  };

  useEffect(() => {
    fetchPrducts();
  }, []);

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      fetchPrducts();
    }
  };

  const searchHandle = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      let result = await fetch(
        `http://localhost:5000/search/${e.target.value}`,
        {
          method: "get",
        }
      );

      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      fetchPrducts();
    }
  };

  return (
    <div className="product-list">
      <h4>Product</h4>
      <div style={{ display: "inline-flex" }}>
        <input
          value={search}
          className="inputBox"
          type="text"
          onChange={searchHandle}
          placeholder="Search Product"
        />
      </div>
      <ul>
        <li>Name</li>
        <li>Category</li>
        <li>Price</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((product, i) => {
          return (
            <ul key={i}>
              <li>{product.name}</li>
              <li>{product.category}</li>
              <li>$ {product.price}</li>
              <li>{product.company}</li>
              <li>
                <button onClick={() => deleteProduct(product._id)}>
                  Remove
                </button>{" "}
                <Link to={`/update/${product._id}`}>Edit</Link>
              </li>
            </ul>
          );
        })
      ) : (
        <h5>No product found</h5>
      )}
    </div>
  );
};

export default ProductList;
