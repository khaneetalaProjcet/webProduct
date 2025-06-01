import VerifyTemplate from "./api";
import BranchTemplate from "./branch";
import QueryTemplate from "./queryTemplate";
import TradeTemplate from "./tradeApi";

const TradeService = {
  async createInvoice(buyInfo) {
    const body = JSON.stringify(buyInfo);
    const response = await TradeTemplate.post("/createTransaction", body);
    return response.data;
  },

  async complateTransaction(paymentInfo) {
    const body = JSON.stringify(paymentInfo);
    const response = await TradeTemplate.post("/completeBuy", body);
    return response.data;
  },

  async complateBehpardakhtTransaction(paymentInfo) {
    console.log('test')
    const body = JSON.stringify(paymentInfo);
    const response = await TradeTemplate.post("/buy/behpardakht", body);
    return response.data;
  },

  async GoldBoxBuyTransactions(filterTransactions) {
    const body = JSON.stringify(filterTransactions);
    const response = await QueryTemplate.post("/buytransactions", body);
    return response.data;
  },

  async GoldBoxSellTransactions(filterTransactions) {
    const body = JSON.stringify(filterTransactions);
    const response = await VerifyTemplate.post("/selltransactions", body);
    return response.data;
  },

  async GoldBoxTransferTransactions(filterTransactions) {
    const response = await QueryTemplate.get(`/user/transports?status=${filterTransactions.status}`);
    return response.data;
  },

    async UseGoldTransferTransactions(filterTransactions) {
    const response = await BranchTemplate.get(`/branch/user/transactions?status=${filterTransactions.status}`);
    return response.data;
  },

  async CreateCart() {
    const body = JSON.stringify();
    const response = await QueryTemplate.post(`/createCart`);
    return response.data;
  },

  async VerifyTransaction(zarinpal) {
    const body = JSON.stringify(zarinpal);
    const response = await TradeTemplate.post(`/VerifyTransaction`, body);
    return response.data;
  },

  async createSellInvoice(sellInfo) {
    const body = JSON.stringify(sellInfo);
    const response = await TradeTemplate.post("/createTransaction", body);
    return response.data;
  },

  async complateSellTransaction(SellPaymentInfo) {
    const body = JSON.stringify(SellPaymentInfo);
    const response = await TradeTemplate.post("/completeSell", body);
    return response.data;
  },

  async DepositWallet(depositDetail, cartId) {
    const body = JSON.stringify({
      amount: depositDetail,
      cartId: cartId,
    });
    const response = await TradeTemplate.post("/deposit", body);
    return response.data;
  },

  async DepositWalletBehpardakht(depositDetail, cartId) {
    const body = JSON.stringify({
      amount: depositDetail,
      cartId: cartId,
    });
    const response = await TradeTemplate.post("/deposit/behpardakht", body);
    return response.data;
  },

  async VerifyDepositWallet(zarinpal) {
    const body = JSON.stringify(zarinpal);
    const response = await TradeTemplate.post(`/VerifyDeposit`, body);
    return response.data;
  },

  async WithdrawWallet(withdrawDetail, cartId) {
    const body = JSON.stringify({
      amount: withdrawDetail,
      cartId: cartId
    });
    const response = await TradeTemplate.post("/withdraw", body);
    return response.data;
  },

  async WalletTransaction(filterTransactions) {
    const body = JSON.stringify(filterTransactions);
    const response = await QueryTemplate.post(`/WalletTransactions`, body);
    return response.data;
  },

  async CreateTransfer(info) {
    const body = JSON.stringify(info);
    const response = await TradeTemplate.post(`/transPort`, body);
    return response.data;
  },

  async TransferOtp(id) {
    const body = JSON.stringify({
      transPortId: id,
    });
    const response = await TradeTemplate.post(`/transPort/otp`, body);
    return response.data;
  },

  async VerifyTransferOtp(otp, id) {
    const body = JSON.stringify({
      otp: otp,
      transPortId: id,
    });
    const response = await TradeTemplate.post(`/transPort/verifyotp`, body);
    return response.data;
  },

  async GetBranches() {
    const response = await BranchTemplate.get(`/branch/all`);
    return response.data;
  },

  async GetSellers(id) {
    const response = await BranchTemplate.get(`/branch/seller/all/${id}`);
    return response.data;
  },

  async CreateUseGold(useGold) {
    const body = JSON.stringify(useGold);
    const response = await BranchTemplate.post(
      `/branch/transAction/create`,
      body
    );
    return response.data;
  },

  async UseGoldOtp(id) {
    const body = JSON.stringify({
      transActionId: id,
    });
    const response = await BranchTemplate.post(`/branch/transAction/otp`, body);
    return response.data;
  },

  async VerifyUseGold(otp, id) {
    const body = JSON.stringify({
      otp: otp,
      transActionId: id,
    });
    const response = await BranchTemplate.post(
      `branch/transAction/otp/verify`,
      body
    );
    return response.data;
  },
};

export default TradeService;
