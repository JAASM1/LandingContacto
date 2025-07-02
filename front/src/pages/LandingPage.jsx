import { useState, useRef } from "react";
import "../styles/Landing.css";
import LogoRT from "../images/LogoRT.png";
import Modal from "react-modal";
import ReCAPTCHA from "react-google-recaptcha";

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
      const response = await fetch("http://localhost:3000/api/contact", {
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
            <a href="#home">Home</a>
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
        <button className="book-btn">Book Now</button>
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

              <div className="captcha-container">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LdZaGsrAAAAAKMT5MqIiixptdWd78pzNd2I8uMq"
                  onChange={handleCaptchaChange}
                  theme="light" // o "dark"
                  size="normal" // o "compact"
                />
              </div>

              <Modal
                isOpen={modalAbierto}
                onRequestClose={() => setModalAbierto(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
              >
                <div className="modal-inner">
                  <h2 className="section-title">Términos y Condiciones</h2>
                  <p className="modal-text">
                    Bienvenido a nuestro sitio web de recomendaciones
                    turísticas. Al utilizar esta página, aceptas los siguientes
                    términos y condiciones:
                  </p>
                  <ul className="modal-list">
                    <li>
                      <strong>Uso del sitio:</strong> Este sitio proporciona
                      información sobre lugares turísticos con fines
                      informativos y de planificación personal. No somos
                      responsables por cambios en horarios, precios u otra
                      información publicada.
                    </li>
                    <li>
                      <strong>Contenido:</strong> Todo el contenido es propiedad
                      del sitio o de sus respectivos autores. No se permite
                      copiar, distribuir o modificar el contenido sin
                      autorización previa.
                    </li>
                    <li>
                      <strong>Reservas y servicios externos:</strong> No
                      gestionamos reservas ni somos responsables de servicios
                      ofrecidos por terceros, como hoteles, agencias o guías
                      turísticos.
                    </li>
                    <li>
                      <strong>Privacidad:</strong> No recopilamos información
                      personal sin tu consentimiento. Cualquier dato
                      proporcionado se manejará conforme a nuestra política de
                      privacidad.
                    </li>
                    <li>
                      <strong>Modificaciones:</strong> Nos reservamos el derecho
                      de modificar estos términos en cualquier momento. El uso
                      continuado del sitio implica la aceptación de dichos
                      cambios.
                    </li>
                  </ul>
                  <p className="modal-text">
                    Si no estás de acuerdo con alguno de estos términos, por
                    favor, no utilices el sitio. ¡Gracias por visitarnos y feliz
                    viaje!
                  </p>
                  <button
                    className="submit-btn"
                    onClick={() => setModalAbierto(false)}
                  >
                    Cerrar
                  </button>
                </div>
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
