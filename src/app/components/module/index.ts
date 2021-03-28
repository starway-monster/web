/* eslint-disable */
/* tslint:disable */

import { StdFee } from "@cosmjs/launchpad";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgTransfer } from "./types/ibc/applications/transfer/v1/tx";


const types = [
  ["/ibc.applications.transfer.v1.MsgTransfer", MsgTransfer],

];
export const MissingWalletError = new Error("wallet is required");

const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async  (endpoint: string, signer: OfflineSigner, address: string) => {
  // async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  // if (!wallet) throw MissingWalletError;

  const client = await SigningCosmWasmClient.connectWithSigner(endpoint, signer, { registry });

  // const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  // const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgTransfer: (data: MsgTransfer): EncodeObject => ({ typeUrl: "/ibc.applications.transfer.v1.MsgTransfer", value: data }),
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
