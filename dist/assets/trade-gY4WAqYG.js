import{V as n}from"./index-QtLq0vnv.js";const o={async GoldPrice(){return(await n.get("/goldPrice")).data}},r={async createInvoice(s){const t=JSON.stringify(s);return(await n.post("/createTransaction",t)).data},async complateTransaction(s){const t=JSON.stringify(s);return(await n.post("/completeBuy",t)).data},async GoldBoxBuyTransactions(s){const t=JSON.stringify(s);return(await n.post("/buytransactions",t)).data},async GoldBoxSellTransactions(s){const t=JSON.stringify(s);return(await n.post("/selltransactions",t)).data},async CreateCart(){return JSON.stringify(),(await n.post("/createCart")).data},async VerifyTransaction(s){const t=JSON.stringify(s);return(await n.post("/VerifyTransaction",t)).data},async createSellInvoice(s){const t=JSON.stringify(s);return(await n.post("/createTransaction",t)).data},async complateSellTransaction(s){const t=JSON.stringify(s);return(await n.post("/completeSell",t)).data},async DepositWallet(s){const t=JSON.stringify({amount:s});return(await n.post("/deposit",t)).data},async VerifyDepositWallet(s){const t=JSON.stringify(s);return(await n.post("/VerifyDeposit",t)).data},async WithdrawWallet(s){const t=JSON.stringify({amount:s});return(await n.post("/withdraw",t)).data},async WalletTransaction(s){const t=JSON.stringify(s);return(await n.post("/WalletTransactions",t)).data}};export{o as P,r as T};
