import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  web3 = new Web3(window.web3.currentProvider);
  console.log("metamask working");
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/74654fe0e2bf4e7c9fad25f8f417fdb4'
  );
  console.log("metamsk not working");
  web3 = new Web3(provider);
}

export default web3;
