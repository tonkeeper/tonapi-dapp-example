import { JettonBalance } from "@ton-api/client";
import { beginCell, Address, toNano } from "@ton/core";
import { SendTransactionRequest } from "@tonconnect/ui-react";
import { fromDecimals } from "./decimals";
import { isValidAddress } from "./address";

export const getJettonTransaction = (
  jetton: JettonBalance,
  amountStr: string,
  recipientAddressStr: string,
  senderAddress: Address
): SendTransactionRequest => {
  const amount = fromDecimals(amountStr, jetton.jetton.decimals);

  if (!isValidAddress(recipientAddressStr)) {
    throw new Error("Invalid recipient address");
  }

  if (amount <= 0n) {
    throw new Error("Amount must be greater than zero");
  }

  if (amount > jetton.balance) {
    throw new Error("Amount exceeds balance");
  }

  const recipient = Address.parse(recipientAddressStr);

  const body = beginCell()
    .storeUint(0xf8a7ea5, 32) // operation type (jetton transfer)
    .storeUint(0, 64) // query ID
    .storeCoins(amount) // jetton amount
    .storeAddress(recipient) // recipient address
    .storeAddress(senderAddress) // sender address
    .storeUint(0, 1) // forward payload (empty)
    .storeCoins(1n) // forward TON amount (for fees)
    .storeUint(0, 1) // custom payload (empty)
    .endCell();

  return {
    validUntil: Math.floor(Date.now() / 1000) + 360, // transaction valid for 6 minutes
    messages: [
      {
        address: jetton.walletAddress.address.toRawString(), // sender's jetton wallet
        amount: toNano("0.05").toString(), // estimated fee in nanoton
        payload: body.toBoc().toString("base64"), // encoded payload for the transfer
      },
    ],
  };
};