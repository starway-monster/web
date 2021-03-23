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
      // const cosmJS = new SigningCosmosClient(
      //   // "https://lcd-cosmoshub.keplr.app",
      //   'https://lcd.musselnet.cosmwasm.com',
      //   accounts[0].address,
      //   offlineSigner,
      // );
      alert('Addresses count: ' + Object.keys(accounts).length + '\n' + accounts[0].address);
      const client = await SigningStargateClient.connectWithSigner(
        'https://lcd.musselnet.cosmwasm.com',
        offlineSigner
      );

      alert('Addresses count: ' + Object.keys(accounts).length + '\n' + accounts[0].address);

      // const result = await cosmJS.sendTokens(recipient, [{
      //   denom: "uatom",
      //   amount: amount.toString(),
      // }]);
    }
  }

  onInterchainPath() {
  }

  onUnescrowToken() {
  }

  onChannels() {
  }
}
