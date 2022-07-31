import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <ul className="nav-ul">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/add">Add Product</Link>
      </li>
      <li>
        <Link to="/update">Update Product</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      {auth ? (
        <li>
          <Link onClick={logout} to="/login">
            Logout
          </Link>
        </li>
      ) : (
        <>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default Nav;
