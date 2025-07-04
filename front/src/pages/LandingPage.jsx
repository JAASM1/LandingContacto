import { useState, useRef } from "react";
import "../styles/Landing.css";
import LogoRT from "../images/LogoRT.png";
import Modal from "react-modal";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router";

function LandingPage() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [captchaValido, setCaptchaValido] = useState(null);

  const handleCaptchaChange = (token) => {
    setCaptchaValido(token); // guarda el token en vez de un booleano
  };

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const recaptchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: null });

    if (!aceptoTerminos) {
      setSubmitStatus({
        error: "Debes aceptar los términos y condiciones",
        loading: false,
      });
      return;
    }
    if (!captchaValido) {
      setSubmitStatus({
        error: "Por favor completa la verificación reCAPTCHA",
        loading: false,
      });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, tokenCaptcha: captchaValido }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setSubmitStatus({ success: true, loading: false });
      setFormData({
        nombreCompleto: "",
        correo: "",
        telefono: "",
        mensaje: "",
      });
      setAceptoTerminos(false);
      setCaptchaValido(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } catch (error) {
      console.error("Error completo:", error);
      setSubmitStatus({
        error: error.message || "Error al conectar con el servidor",
        loading: false,
      });
    }
  };

  return (
    <div className="landing-page">
      {/* Navbar Modernizado */}
      <nav className="navbar">
        <div className="logo-container">
          <img src={LogoRT} alt="Riviera Travel Logo" className="navbar-logo" />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" activeClassName="active-link">
              Home
            </Link>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#packages">Packages</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <Link to="/login" className="book-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon-login"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </Link>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          {/* <h1>Bienvenido</h1>
          <p className="hero-subtitle">Explora con Nosotros</p>
          <h2 className="hero-location">RIVIERA MAYA</h2> */}
          {/* <button className="cta-button">Descubre Más</button> */}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <h2 className="section-title">Sobre Riviera Travel</h2>
          <p className="section-text">
            Somos especialistas en crear experiencias de viaje inolvidables en
            la Riviera Maya. Con más de 10 años de experiencia, nos
            enorgullecemos de ofrecer servicios personalizados y atención al
            detalle para que tu viaje sea perfecto.
          </p>
          <div className="stats-container">
            <div className="stat-item">
              <h3>10+</h3>
              <p>Años de Experiencia</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Clientes Satisfechos</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Destinos Únicos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="packages-section">
        <div className="section-container">
          <h2 className="section-title">Nuestros Paquetes</h2>
          <p className="section-text">
            Descubre nuestras opciones de viaje cuidadosamente diseñadas
          </p>

          <div className="packages-grid">
            <div className="package-card">
              <div
                className="package-image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21')",
                }}
              ></div>
              <h3>Aventura en la Selva</h3>
              <p>
                Explora ruinas mayas y cenotes en este paquete lleno de
                aventura.
              </p>
              <div className="package-price">$899 USD</div>
              <button className="package-btn">Más Información</button>
            </div>

            <div className="package-card">
              <div
                className="package-image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6')",
                }}
              ></div>
              <h3>Relax en la Playa</h3>
              <p>
                Hoteles de lujo frente al mar con todo incluido para tu máximo
                relax.
              </p>
              <div className="package-price">$1,299 USD</div>
              <button className="package-btn">Más Información</button>
            </div>

            <div className="package-card">
              <div
                className="package-image"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1538964173425-93884d739596')",
                }}
              ></div>
              <h3>Cultural & Gastronómico</h3>
              <p>
                Descubre la rica cultura y gastronomía de la región con expertos
                locales.
              </p>
              <div className="package-price">$1,099 USD</div>
              <button className="package-btn">Más Información</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* Sección de Contacto con Diseño Elegante */}
      <section id="contact" className="contact-section">
        <div className="contact-background">
          <div className="contact-overlay"></div>
        </div>

        <div className="contact-container">
          <div className="contact-card">
            <div className="contact-header">
              <h2 className="section-title">Contáctanos</h2>
              <p className="section-subtitle">
                ¿Listo para tu próxima aventura? Escríbenos y te ayudaremos a
                planificarla.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-flex">
                <div className="form-group">
                  <input
                    type="text"
                    id="nombreCompleto"
                    name="nombreCompleto"
                    placeholder=" "
                    value={formData.nombreCompleto}
                    onChange={handleChange}
                    required
                    disabled={submitStatus.loading}
                    className="floating-input"
                  />
                  <label htmlFor="nombreCompleto" className="floating-label">
                    Nombre completo*
                  </label>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    placeholder=" "
                    value={formData.correo}
                    onChange={handleChange}
                    required
                    disabled={submitStatus.loading}
                    className="floating-input"
                  />
                  <label htmlFor="correo" className="floating-label">
                    Correo electrónico*
                  </label>
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    placeholder=" "
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    disabled={submitStatus.loading}
                    className="floating-input"
                  />
                  <label htmlFor="telefono" className="floating-label">
                    Teléfono*
                  </label>
                </div>

                <div className="form-group full-width">
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    placeholder=" "
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    disabled={submitStatus.loading}
                    className="floating-input"
                  ></textarea>
                  <label htmlFor="mensaje" className="floating-label">
                    Tu mensaje*
                  </label>
                </div>
              </div>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="acepto"
                  checked={aceptoTerminos}
                  onChange={() => setAceptoTerminos(!aceptoTerminos)}
                  className="styled-checkbox"
                />
                <label htmlFor="acepto" className="checkbox-label">
                  Acepto los{" "}
                  <button
                    type="button"
                    className="terms-link"
                    onClick={() => setModalAbierto(true)}
                  >
                    términos y condiciones
                  </button>
                </label>
              </div>

              <ReCAPTCHA
                sitekey="6Lc51HYrAAAAAEXZEuGkwagAxh0rZvNifI-AIJyQ"
                onChange={handleCaptchaChange}
              />

              {/* Modal */}
              <Modal
                isOpen={modalAbierto}
                onRequestClose={() => setModalAbierto(false)}
              >
                <h2>Términos y Condiciones</h2>
                <p>Aquí van tus términos y condiciones...</p>
                <button onClick={() => setModalAbierto(false)}>Cerrar</button>
              </Modal>

              <button
                type="submit"
                className="submit-btn"
                disabled={submitStatus.loading}
              >
                {submitStatus.loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Enviando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Enviar Mensaje
                  </>
                )}
              </button>

              {submitStatus.error && (
                <div className="alert error">
                  <i className="fas fa-exclamation-circle"></i>{" "}
                  {submitStatus.error}
                </div>
              )}
              {submitStatus.success && (
                <div className="alert success">
                  <i className="fas fa-check-circle"></i> ¡Mensaje enviado con
                  éxito!
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img
              src={LogoRT}
              alt="Riviera Travel Logo"
              className="footer-logo-img"
            />
            <p>Explora el mundo con nosotros.</p>
          </div>

          <div className="footer-links">
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#packages">Packages</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Contacto</h3>
            <p>info@rivieratravel.com</p>
            <p>+52 998 8658 267</p>
            <p>Av. Colosio, Cancún, México</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Riviera Travel. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
