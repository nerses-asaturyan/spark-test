import dotenv from "dotenv";
dotenv.config();
import { SparkWallet } from "@buildonspark/spark-sdk";

const { wallet, mnemonic } = await SparkWallet.initialize({
  mnemonicOrSeed: process.env.MNEMONIC!,
  accountNumber: 1,
  options: {
      network: "REGTEST"
  }
});

const depositAddress = await wallet.getStaticDepositAddress();
console.log("staticDepositaddress: ", depositAddress);
// taking funds from faucet
// after it claim
const txId = process.env.TX_ID!;
const quote = await wallet.getClaimStaticDepositQuote(txId);
const claimResult = await wallet.claimStaticDeposit({
  transactionId: txId,
  creditAmountSats: quote.creditAmountSats,
  sspSignature: quote.signature,
});
console.log("claimResult: ",claimResult)