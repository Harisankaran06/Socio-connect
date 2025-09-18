import React, { useState } from "react";

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Segoe UI", sans-serif;
  }
   
  /* ...existing code... */
body::before,
body::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: rgba(174, 144, 255, 0.2);
  z-index: 0;
}
body::before {
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
}
body::after {
  width: 300px;
  height: 300px;
  bottom: -80px;
  right: -80px;
}
/* ...existing code... */body {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #e8ebff, #f8f5ff);
    overflow: hidden;
  }
  .login-wrapper {
    display: flex;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    overflow: hidden;
    width: 90%;
    max-width: 950px;
    z-index: 1;
    margin: 40px auto;
  }
  .login-left {
    flex: 1;
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .logo {
    text-align: center;
    margin-bottom: 20px;
  }
  .logo img {
    width: 150px;
  }
  .login-left h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .form-group {
    margin-bottom: 20px;
  }
  .form-group input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    font-size: 14px;
    background: #f9f9f9;
    transition: border 0.3s, background 0.3s;
  }
  .form-group input:focus {
    border-color: #9b5cf1;
    background: #fff;
    outline: none;
  }
  .forgot {
    text-align: right;
    margin-bottom: 20px;
  }
  .forgot a {
    font-size: 13px;
    text-decoration: none;
    color: #888;
    transition: color 0.3s;
  }
  .forgot a:hover {
    color: #9b5cf1;
  }
  .btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    background: linear-gradient(to right, #9b5cf1, #6a7dff);
    color: #fff;
    transition: transform 0.2s, box-shadow 0.3s;
  }
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(155, 92, 241, 0.3);
  }
  .login-right {
    flex: 1;
    background: #f8faff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
  }
  .login-right img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
  @media (max-width: 768px) {
    .login-wrapper {
      flex-direction: column;
    }
    .login-right {
      display: none;
    }
  }
`;

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "TamilNadu" && password === "033") {
      onLogin("/nltn");
    } else if (username === "Jharkand" && password === "028") {
      onLogin("/nljk");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-wrapper">
        <div className="login-left">
          <div className="logo">
                 <img src="/images/logo.png" alt="Socio Connect Logo" />
          </div>
          <h2>Admin Login</h2>
          <form id="loginForm" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="forgot">
              <a href="#">Password forgot?</a>
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
            <button type="submit" className="btn">Login</button>
          </form>
        </div>
        <div className="login-right">
          <img src="/images/soo.jpg" alt="Admin Illustration" />
        </div>
      </div>
    </>
  );
}

export default LoginPage;