import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const res = await fetch(url, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);

        navigate("/notes");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);

      alert("Server Error");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{isLogin ? "Login" : "Register"}</h1>

      {!isLogin && (
        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
      )}

      <br />
      <br />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <br />
      <br />

      <button onClick={submit}>
        {isLogin ? "Login" : "Register"}
      </button>

      <br />
      <br />

      <button onClick={() => setIsLogin(!isLogin)}>
        Switch
      </button>
    </div>
  );
}

export default Login;