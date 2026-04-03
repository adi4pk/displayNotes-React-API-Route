import { use, useEffect, useState } from "react";
import { login } from "../services/notesService";
import type { UserLogin } from "../models/User";
import type { ApiRequestError } from "../services/notesService";
import { useNavigate } from "react-router-dom";

function Login() {
  useEffect(() => {
   
      // handleLogin();     -- use in useEffect for auto-Login
  }, []);

  const navigate = useNavigate();


  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    // try {
    //   // const data = await login({email: "admin@notecloud.local", password: "Admin123!" });
    //   const data = await login({email: user, password: pass});

    //   console.log(data);

    // } catch (err) {
    //     let d= err as ApiRequestError;
    //     alert(d.message);
    // }

    let textResponse = "";

    try{
      const data = await login({email: user, password: pass});
      if(data){
        goToNotes();
      }
    } catch (err){
      console.log(err);
      goToNotes();
    }
    

  };

  let goToNotes = () =>{
    navigate("/main");
  }

  return (
    <div
      className="login-container"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>Username</p>
      <input
        type="text"
        placeholder="username"
        className="user-field"
        style={{
          border: "2px solid salmon",
          height: "30px",
          borderRadius: "5px",
        }}
        onChange={(event) => setUser(event.target.value)}
      ></input>

      <p>Password</p>
      <input
        type="password"
        placeholder="****"
        className="pass-field"
        style={{
          border: "2px solid salmon",
          height: "30px",
          borderRadius: "5px",
        }}
        onChange={(event) => setPass(event.target.value)}
      ></input>

      <button
      className="btn"
      type="button"
      style={{
        border: "2px solid salmon",
        height: "40px",
        borderRadius: "5px",
        marginTop: "20px",
      }}
      onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
