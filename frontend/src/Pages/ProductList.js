import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchPrducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      method: "get",
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
    console.log(result);
    result = await result.json();
    if (result) {
      fetchPrducts();
    }
    // setProducts(result);
  };
  return (
    <div className="product-list">
      <h4>Product</h4>
      <ul>
        <li>Name</li>
        <li>Category</li>
        <li>Price</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.map((product, i) => {
        return (
          <ul key={i}>
            <li>{product.name}</li>
            <li>{product.category}</li>
            <li>$ {product.price}</li>
            <li>{product.company}</li>
            <li>
              <button onClick={() => deleteProduct(product._id)}>Remove</button>{" "}
              <Link to={`/update/${product._id}`}>Edit</Link>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default ProductList;
