import { beginCell, Cell, loadMessage, Message } from "@ton/core";
import ta from "../tonapi";
import { Transaction } from "@ton-api/client";
 
function normalizeHash(message: Message): Buffer {
    if (message.info.type !== 'external-in') {
        return message.body.hash();
    }
 
    const cell = beginCell()
        .storeUint(2, 2)    // external-in
        .storeUint(0, 2)    // addr_none
        .storeAddress(message.info.dest)
        .storeUint(0, 4)    // import_fee = 0
        .storeBit(false)    // no StateInit
        .storeBit(true)     // store body as reference
        .storeRef(message.body)
        .endCell();
 
    return cell.hash();
}
 
export async function trackTransaction(message: Message) {
    const hash = normalizeHash(message).toString('hex');
    console.log('Message hash:', hash);

    let attempts = 0;
    let transaction: null | Transaction = null;

    while (attempts++ < 10) {
        transaction = await ta.blockchain.getBlockchainTransactionByMessageHash(hash).catch(() => null);
        if (transaction) { break; }
        
        console.log('Not confirmed yet, retrying...');
        await new Promise(res => setTimeout(res, 5000));
    }

    console.log('Transaction:', transaction);
    return transaction;
}

export async function trackTransactionByBoc(boc: string) {
    console.log("Transaction sent successfully", boc);

    const slice = Cell.fromBase64(boc).beginParse();
    const message = loadMessage(slice);
    
    return trackTransaction(message);
}