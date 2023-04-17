import Web3 from "web3";
let paymentSucess;
const etherscanApiUrl = "https://api.etherscan.io/api";
const apiKey = "XR842H61S6EMJR9IDPQVKQ34E6XZZA9XP7";

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

that.getTransactionStatus = async function (tHex) {
  try {
    const status = await fetch(
      `${etherscanApiUrl}?module=transaction&action=gettxreceiptstatus&txhash=${tHex}&apikey=${apiKey}`
    );
    console.log("status fired");

    if (status) return true;
    if (status === 0) throw "transaction failed";
    return that.getTransactionStatus(tHex);
  } catch (err) {
    throw err.message || err;
  }
};

that.manageTransactionFlow = async function (e) {
  try {
    paymentSucess = true;
    const { fromAccount, toAccount, price, id, type } =
      await that.getPaymentDetails(e);
    const tHex = await that.sendTransaction(fromAccount, toAccount, price);
    await that.getTransactionStatus(tHex);
    console.log("transaction successfull");
    paymentSucess = false;
    await fetch(
      `https://www.fundingportal.site/payments/send/${id}?type=${type}`,
      {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("user-details"),
        },
      }
    );
  } catch (err) {
    paymentSucess = false;
    console.log(err);
  }
};
export { paymentSucess };
export default that;
