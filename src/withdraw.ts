import dotenv from "dotenv";
dotenv.config();
import { SparkWallet } from "@buildonspark/spark-sdk";

const { wallet } = await SparkWallet.initialize({
  mnemonicOrSeed: process.env.MNEMONIC!,
  accountNumber: 1,
  options: {
    network: "REGTEST"
  }
});

const l1Address = await wallet.getTokenL1Address();
console.log("L1 Address:", l1Address);

const balance = (await wallet.getBalance()).balance;
if (balance <= 10000) {
  throw new Error("Insufficient funds");
}

const withdrawal = await wallet.getWithdrawalFeeQuote({
  amountSats: Number(10001),
  withdrawalAddress: l1Address,
});
console.log("withdrawal: ", withdrawal);

type ExitSpeed = Parameters<typeof wallet.withdraw>[0]["exitSpeed"];

const withdrawResult = await wallet.withdraw({
  onchainAddress: l1Address,
  exitSpeed: "FAST" as ExitSpeed,
  amountSats: 10001,
  feeQuote: withdrawal!,
  deductFeeFromWithdrawalAmount: true,
});


console.log(withdrawResult);
