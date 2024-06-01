const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || "W64JTQ2CIH";

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: "CORS preflight response" }),
    };
  }

  const { username, password } = JSON.parse(event.body);
  const grantType = "password";

  if (grantType !== "password") {
    return {
      statusCode: 400,
      headers: headers,
      body: JSON.stringify({ message: "Unsupported grant_type" }),
    };
  }

  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username: username }, secretKey, {
      expiresIn: "1h",
    });

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ access_token: token }),
    };
  } else {
    return {
      statusCode: 401,
      headers: headers,
      body: JSON.stringify({ message: "Unauthorized" }),
    };
  }
};
