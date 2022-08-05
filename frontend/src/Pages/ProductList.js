import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="product-list">
      <h4>Product</h4>
      <ul>
        <li>Name</li>
        <li>Category</li>
        <li>Price</li>
        <li>Company</li>
      </ul>
      {products.map((product, i) => {
        return (
          <ul key={i}>
            <li>{product.name}</li>
            <li>{product.category}</li>
            <li>$ {product.price}</li>
            <li>{product.company}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default ProductList;
