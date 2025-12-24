const jwt = require("jsonwebtoken");

const checkJwtToken = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Role check (agar roles pass kiye gaye hain)
      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      req.auth = decoded; // 🔥 user OR admin
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

module.exports = checkJwtToken;
