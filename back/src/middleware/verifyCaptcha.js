import fetch from "node-fetch";

const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Asegúrate de tenerlo en tu .env

export const verifyCaptcha = async (req, res, next) => {
  const token = req.body.tokenCaptcha;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Falta el token del captcha",
    });
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha inválido. Por favor verifica que no eres un robot.",
      });
    }

    next(); // captcha válido → sigue al siguiente middleware
  } catch (error) {
    console.error("Error al verificar captcha:", error);
    return res.status(500).json({
      success: false,
      message: "Error al verificar captcha",
    });
  }
};
