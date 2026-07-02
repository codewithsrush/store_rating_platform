const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// =======================
// SIGNUP
// =======================
const signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // Check required fields
    if (!name || !email || !password || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Name validation
    if (name.length < 20 || name.length > 60) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 20 and 60 characters",
      });
    }

    // Address validation
    if (address.length > 400) {
      return res.status(400).json({
        success: false,
        message: "Address cannot exceed 400 characters",
      });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-16 characters and contain one uppercase letter and one special character",
      });
    }

    // Check existing user
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        if (result.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email already exists",
          });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        db.query(
          "INSERT INTO users(name,email,password,address,role) VALUES(?,?,?,?,?)",
          [name, email, hashedPassword, address, "user"],
          (err) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message,
              });
            }

            return res.status(201).json({
              success: true,
              message: "User registered successfully",
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// LOGIN
// =======================
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
};



module.exports = {
  signup,
  login,
};