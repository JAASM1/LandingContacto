import { useState } from "react";
import { useNavigate, Link } from "react-router";
import "../styles/Login.css";
import GoogleIcon from "../images/google-icon.png";
import TravelSideImage from "../images/side-login.jpg"; // Imagen de viaje para el lado izquierdo
import BackgroundImage from "../images/fondolanding.png"; // Imagen de fondo
import Logo from "../images/LogoRT.png"

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al registrar");
      }

      navigate("/login");


    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className="login-container">
        <div className="travel-side">
          <img src={TravelSideImage} alt="Travel Experience" />
          <div className="travel-overlay">
            <h2>Explora la Riviera Maya</h2>
            <p>Descubre experiencias únicas con nosotros</p>
          </div>
        </div>

        <div className="login-card">
          <div className="logo-container">
            <img src={Logo} alt="logotravel" className="login-logo" />
          </div>
          <h1>Registrate con nosotros</h1>

          {/* <button className="google-btn">
            <img src={GoogleIcon} alt="Google" />
            Iniciar sesión con Google
          </button>

          <div className="divider">
            <span>o</span>
          </div> */}

          {error && <div className="alert error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Iniciando registro...
                </>
              ) : (
                "Registrarme"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}