const axios = require("axios");

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://api.upstox.com/v2/login/authorization/token",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
};

const data = await axios.post(
  "https://api.upstox.com/v2/login/authorization/token",
  {
    code: "mainak",
    client_id: "",
    client_secret: "",
    redirect_uri: "",
    grant_type: "",
  },
  config
);
