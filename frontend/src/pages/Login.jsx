import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-icon">✚</div>
          <strong>CareFlow</strong>
        </div>

        <div className="login-intro">
          <span>SMARTER HEALTHCARE</span>

          <h1>
            Healthcare that
            <br />
            works <em>for you.</em>
          </h1>

          <p>
            Manage appointments, doctors and your healthcare journey
            from one simple platform.
          </p>
        </div>
      </div>

      <div className="login-right">
        <form className="login-card" onSubmit={handleLogin}>
          <span className="section-label">WELCOME BACK</span>

          <h2>Sign in</h2>

          <p className="login-subtitle">
            Enter your details to access your hospital portal.
          </p>

          <label>Email address</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button className="login-button" type="submit">
            Sign in →
          </button>

          <p className="demo-text">
            Demo login — any valid email and password will work.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;