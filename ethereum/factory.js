import web3 from './web3';
import CampaignFactory from './build/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x94eFf5753C017b67Bb123755B284590e1D20d3dD'
);

export default instance;
