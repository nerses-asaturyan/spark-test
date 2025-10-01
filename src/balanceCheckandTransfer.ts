import dotenv from "dotenv";
dotenv.config();
import { SparkWallet, type TransferParams } from "@buildonspark/spark-sdk";

const { wallet } = await SparkWallet.initialize({
  mnemonicOrSeed: process.env.MNEMONIC!,
  accountNumber: 1,
  options: {
      network: "REGTEST"
  }
});

const { wallet: wallet2 } = await SparkWallet.initialize({
  mnemonicOrSeed: process.env.MNEMONIC!,
  accountNumber: 2,
  options: {
      network: "REGTEST"
  }
});

const walletBalanceBefore = await wallet.getBalance();
console.log("wallet balance before transfer: ",walletBalanceBefore);
const wallet2BalanceBefore = await wallet2.getBalance();
console.log("wallet2 balance before transfer: ",wallet2BalanceBefore);

const receiver = await wallet2.getSparkAddress();
const transferParams: TransferParams = {
    amountSats: Number(walletBalanceBefore.balance/10n),
    receiverSparkAddress: receiver,
};

const transfer = await wallet.transfer(transferParams);

console.log("transfer result: ",transfer);

const walletBalanceAfter = await wallet.getBalance();
console.log("wallet balance after transfer: ",walletBalanceAfter);
const wallet2BalanceAfter = await wallet2.getBalance();
console.log("wallet2 balance after transfer: ",wallet2BalanceAfter);





