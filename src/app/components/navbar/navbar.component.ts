import { Component, OnInit } from '@angular/core';
import { SigningStargateClient } from '@cosmjs/stargate';

@Component({
  selector: 'sm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async onConnectWallet() {
    if (!(window as any).getOfflineSigner || !(window as any).keplr) {
      alert('Please install keplr extension');
    } else {
      // const chainId = 'cosmoshub-4';
      // const chainId = 'bostromdev-1';
      // const chainId = 'euler-6';
      const chainId = 'musselnet-4';

      // Enabling before using the Keplr is recommended.
      // This method will ask the user whether or not to allow access if they haven't visited this website.
      // Also, it will request user to unlock the wallet if the wallet is locked.
      await (window as any).keplr.enable(chainId);

      const offlineSigner = (window as any).getOfflineSigner(chainId);

      // You can get the address/public keys by `getAccounts` method.
      // It can return the array of address/public key.
      // But, currently, Keplr extension manages only one address/public key pair.
      // XXX: This line is needed to set the sender address for SigningCosmosClient.
      const accounts = await offlineSigner.getAccounts();

      // Initialize the gaia api with the offline signer that is injected by Keplr extension.
      alert('Addresses count: ' + Object.keys(accounts).length + '\n' + accounts[0].address);
      const client = await SigningStargateClient.connectWithSigner(
        'https://rpc.musselnet.cosmwasm.com',
        offlineSigner
      );

      alert('Addresses count: ' + Object.keys(accounts).length + '\n' + accounts[0].denom);

      const result = await client.sendTokens(accounts[0].address, 'wasm1z9l5m7ctfvq4swtx0evy6cr9n739xtfhlvt29z', [{
        denom: 'umayo',
        amount: '1',
      }]);
    }
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
