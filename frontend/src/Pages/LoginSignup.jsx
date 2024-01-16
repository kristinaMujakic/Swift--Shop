import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from '../Extra/authUtils';
import "./CSS/LoginSignup.css";


export const LoginSignup = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    your_name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const checkTokenValidity = async () => {
      const isValid = await validateToken();
      if (isValid) {
        navigate('/');
      } else {
        console.log("Not online");
      }
    };

    checkTokenValidity();
  }, [navigate]);




  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const login = async () => {
    let dataObj;
    await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;



      });
    console.log("DataObj: ", dataObj);
    if (dataObj.success) {
      localStorage.setItem("auth-token", dataObj.token);
      localStorage.setItem("userID", dataObj.userID);
      window.location.replace("/");
    } else {
      console.log(dataObj.error);
      setErrorMessage(dataObj.error);
    }
  };

  const signup = async () => {
    console.log("Trying to signup");

    try {
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          setErrorMessage(data.error);
        } catch (e) {
          // If the response is not JSON, try to parse the HTML
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = text;
          const preTag = tempDiv.querySelector("pre");
          if (preTag) {
            console.error("Signup error: LOL ", preTag.textContent);
            setErrorMessage(preTag.textContent);
          } else {
            console.error(
              "Signup error: Received an unexpected response from the server."
            );
          }
        }
        return;
      }

      const dataObj = await response.json();

      if (dataObj.success) {
        localStorage.setItem("auth-token", dataObj.token);
        window.location.replace("/");
      } else {
        console.error("Signup error:", dataObj.errors);
      }
    } catch (error) {
      console.error("Network error during signup:", error.message);
      setErrorMessage("Network error during signup");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your name"
              name="your_name"
              value={formData.username}
              onChange={changeHandler}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        {errorMessage && (
          <p style={{ color: "red", textAlign: "right" }}>{errorMessage}</p>
        )}
        {state === "Login" ? (
          <button
            onClick={() => {
              login();
            }}
          >
            Continue
          </button>
        ) : (
          <button
            onClick={() => {
              signup();
            }}
          >
            Continue
          </button>
        )}

        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};
