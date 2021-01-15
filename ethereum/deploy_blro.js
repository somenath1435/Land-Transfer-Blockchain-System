const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build_blro/BlroManager.json');

const provider = new HDWalletProvider(
  'model basic scene left push agree summer fuel corn daughter boy inflict',
  'https://rinkeby.infura.io/v3/74654fe0e2bf4e7c9fad25f8f417fdb4'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '4000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();