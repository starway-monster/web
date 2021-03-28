import {isBroadcastTxFailure, isBroadcastTxSuccess, SigningStargateClient} from '@cosmjs/stargate';
import {Component, OnInit} from '@angular/core';
import {txClient} from '../module';

import {MsgTransfer} from '../module/types/ibc/applications/transfer/v1/tx';

@Component({
  selector: 'sm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private static readonly chainId = 'musselnet-4';
  private static readonly chainId2 = 'euler-6';
  private static offlineSigner;
  private static offlineSigner2;

  constructor() {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async onConnectWallet() {
    alert('onConnectWallet');
    if (!(window as any).getOfflineSigner || !(window as any).keplr) {
      alert('Please install keplr extension');
    } else {
      // Enabling before using the Keplr is recommended.
      // This method will ask the user whether or not to allow access if they haven't visited this website.
      // Also, it will request user to unlock the wallet if the wallet is locked.
      await (window as any).keplr.enable(NavbarComponent.chainId);
      await (window as any).keplr.enable(NavbarComponent.chainId2);

      NavbarComponent.offlineSigner = (window as any).getOfflineSigner(NavbarComponent.chainId);
      NavbarComponent.offlineSigner2 = (window as any).getOfflineSigner(NavbarComponent.chainId2);
    }
  }

  // tslint:disable-next-line:typedef
  async onExecute() {
    // You can get the address/public keys by `getAccounts` method.
    // It can return the array of address/public key.
    // But, currently, Keplr extension manages only one address/public key pair.
    // XXX: This line is needed to set the sender address for SigningCosmosClient.
    const accounts = await NavbarComponent.offlineSigner.getAccounts();
    const accounts2 = await NavbarComponent.offlineSigner2.getAccounts();

    // Initialize the gaia api with the offline signer that is injected by Keplr extension.
    alert('Addresses count: ' + Object.keys(accounts).length + '\n' + accounts[0].address);
    alert('Addresses count: ' + Object.keys(accounts2).length + '\n' + accounts2[0].address);
    const client = await SigningStargateClient.connectWithSigner(
      'https://rpc.musselnet.cosmwasm.com',
      NavbarComponent.offlineSigner
    );

    alert('Addresses count: ' + Object.keys(accounts).length + '\n' + accounts[0].denom);

    const result = await client.sendTokens(accounts[0].address, 'wasm1z9l5m7ctfvq4swtx0evy6cr9n739xtfhlvt29z', [{
      denom: 'umayo',
      amount: '1',
    }]);
    alert('tx_hash: ' + result.transactionHash);
  }

  // tslint:disable-next-line:typedef
  async onExecuteSingle() {
    alert('start');
    const accounts = await NavbarComponent.offlineSigner.getAccounts();
    alert('Addresses count: ' + Object.keys(accounts).length + '\n' + accounts[0].address);
    // const accounts2 = await NavbarComponent.offlineSigner2.getAccounts();

    // const rpc = 'http://localhost:26657';
    // const mnemonic =
    //   'panther script topic village antenna penalty change artwork earth alone cotton reveal';

    // const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);

    const txc = await txClient('https://rpc.musselnet.cosmwasm.com', NavbarComponent.offlineSigner, accounts[0].address);
    // const txc = await SigningStargateClient.connectWithSigner(
    //   'https://rpc.musselnet.cosmwasm.com',
    //   NavbarComponent.offlineSigner
    // );
    let date = new Date('2021-03-28T10:03:10.941939701Z');
    const msgTransferData = await MsgTransfer.fromJSON({
      sourcePort: 'transfer',
      sourceChannel: 'channel-7',
      token: {
        denom: 'umayo',
        amount: '1',
      },
      sender: accounts[0].address,
      receiver: 'tcro1n0d8n44jyrvmymuqmyrnp0zm9fx8esmvzf8qwx',
      // timeoutHeight: {
      //   // revisionHeight: 12497931
      // }
      timeoutTimestamp: date.getTime() * 1000000
    });

    const an_encoded_transfer_message = txc.msgTransfer(msgTransferData);
    const result_of_broadcast = await txc.signAndBroadcast([an_encoded_transfer_message]);
    if (isBroadcastTxFailure(result_of_broadcast)) {
      console.log('code' + result_of_broadcast.code);
    }
    console.log('success' + isBroadcastTxSuccess(result_of_broadcast));
    console.log('fail' + isBroadcastTxFailure(result_of_broadcast));
    console.log('tx_hash: ' + result_of_broadcast.transactionHash);
    console.log('log:' + result_of_broadcast.rawLog);
  }

  // tslint:disable-next-line:typedef
  onInterchainPath() {
  }

  // tslint:disable-next-line:typedef
  onUnescrowToken() {
  }

  // tslint:disable-next-line:typedef
  onChannels() {
  }
}
