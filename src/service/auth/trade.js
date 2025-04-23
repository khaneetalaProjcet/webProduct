import VerifyTemplate from "./api";
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

    async DepositWallet(depositDetail , cartId) {
        const body = JSON.stringify({
            "amount": depositDetail,
            "cartId": cartId
        });
        const response = await TradeTemplate.post("/deposit", body);
        return response.data;
    },


    async VerifyDepositWallet(zarinpal) {
        const body = JSON.stringify(zarinpal);
        const response = await TradeTemplate.post(`/VerifyDeposit`, body);
        return response.data;
    },

    async WithdrawWallet(withdrawDetail) {
        const body = JSON.stringify({
            "amount": withdrawDetail
        });
        const response = await TradeTemplate.post("/withdraw", body);
        return response.data;
    },

    async WalletTransaction(filterTransactions) {
        const body = JSON.stringify(filterTransactions);
        const response = await QueryTemplate.post(`/WalletTransactions`, body);
        return response.data;
    }

}


export default TradeService