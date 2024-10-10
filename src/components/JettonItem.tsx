import { JettonBalance } from "@ton-api/client";
import { toDecimals } from "../utils/decimals";

interface JettonItemProps {
  jettonBalance: JettonBalance;
  onSendClick: (jetton: JettonBalance) => void;
}

export const JettonItem = ({ jettonBalance, onSendClick }: JettonItemProps) => {
  const { jetton, balance, jetton: { decimals } } = jettonBalance;

  return (
    <div className="jetton-item">
      <img src={jetton.image} alt={jetton.name} className="jetton-image" />
      <div className="jetton-details">
        <p>{jetton.name} ({jetton.symbol}): {toDecimals(balance, decimals)}</p>
      </div>
      <button onClick={() => onSendClick(jettonBalance)}>Send</button>
    </div>
  );
};