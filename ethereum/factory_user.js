import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x5f6560b36dcaC41f3C48d8534d342B11CD0C24EA'
);

export default instance;
