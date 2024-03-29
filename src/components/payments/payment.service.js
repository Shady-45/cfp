import { loadingFun } from "../../loading";
import Web3 from "web3";
let paymentSucess;

const that = {};

that.getEthereumAcccount = async function () {
  try {
    if (!window.ethereum?.isMetaMask) throw "metamask not installed";

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } catch (err) {
    throw err.message || err;
  }
};

that.sendTransaction = async function (fromAccount, toAccount, price) {
  try {
    const transactionParameters = {
      from: fromAccount,
      to: toAccount,
      value:
        "0x" +
        Web3.utils.toBN(Web3.utils.toWei(String(price), "ether")).toString(16),
    };

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return txHash;
  } catch (err) {
    throw err.message || err;
  }
};

that.getPaymentDetails = async function (e) {
  try {
    const parentComponent = e.target.closest(".payment");
    const { account: toAccount, price, id, type } = parentComponent.dataset;
    const fromAccount = await that.getEthereumAcccount();
    return { fromAccount, toAccount, price, id, type };
  } catch (err) {
    throw err.message || err;
  }
};

that.manageTransactionFlow = async function (e) {
  try {
    loadingFun(true);
    paymentSucess = true;
    const { fromAccount, toAccount, price, id, type } =
      await that.getPaymentDetails(e);
    const tHex = await that.sendTransaction(fromAccount, toAccount, price);
    await fetch(
      `https://api.indiecrypt.site/payments/send/${id}?type=${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("user-details"),
        },
        body: JSON.stringify({
          tHex: tHex,
        }),
      }
    );
    console.log("transaction successfull");
    paymentSucess = false;
    loadingFun(false);
  } catch (err) {
    loadingFun(false);
    paymentSucess = false;
    console.log(err);
  }
};
export { paymentSucess };
export default that;
