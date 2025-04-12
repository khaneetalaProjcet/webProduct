import VerifyTemplate from "./api";
import AuthTemplate from "./authApi";
import QueryTemplate from "./queryTemplate";

const AuthService = {
  async Login(phoneNumber) {
    const body = JSON.stringify({
      phoneNumber: phoneNumber,
    });
    localStorage.setItem("phoneNumber", JSON.stringify(phoneNumber));
    localStorage.setItem("loginTime", JSON.stringify(Date.now()));
    const response = await AuthTemplate.post("/otp", body);
    return response.data;
  },

  async VerifyOTP(otp) {
    const body = JSON.stringify({
      otp: otp,
      phoneNumber: JSON.parse(localStorage.getItem("phoneNumber")),
    });
    const response = await AuthTemplate.post("/verifyOtp", body);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
  },

  async VerifyIdentity(identity) {
    const body = JSON.stringify(identity);
    const response = await AuthTemplate.post("/identify", body);
    if (response.data.token) {
      const token = response.data.token;
      localStorage.setItem("token", token);
    }
    return response.data;
  },

  async Profile() {
    const response = await QueryTemplate.get("/profile");
    return response.data;
  },

  async Wallet() {
    const response = await QueryTemplate.get("/wallet");
    return response.data;
  },

  async BankCart(cardNumber) {
    const body = JSON.stringify({
      cardNumber: cardNumber,
    });
    const response = await VerifyTemplate.post("/createCart", body);
    return response.data;
  },

  async LogOut() {
    const response = await VerifyTemplate.post("/logout");
    return response.data;
  },
};

export default AuthService;
