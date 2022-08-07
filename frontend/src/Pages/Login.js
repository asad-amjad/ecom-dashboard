import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async () => {
    let result = await fetch("http://localhost:5000/user/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.userDetails) {
      localStorage.setItem("user", JSON.stringify(result.userDetails));
      localStorage.setItem("accessToken", JSON.stringify(result.accessToken));
      navigate("/");
    }

    // if (result.auth) {
    //   localStorage.setItem("user", JSON.stringify(result.user));
    //   navigate("/");
    // } else {
    //   console.log("nnnnnn");
    //   alert("Please Enter correct information");
    // }
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  return (
    <div className="login">
      <h4>Login</h4>
      <input
        className="inputBox"
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="saveButton"
        type="button"
        onClick={() => {
          submit();
        }}
      >
        Sign in
      </button>
    </div>
  );
};

export default Login;
