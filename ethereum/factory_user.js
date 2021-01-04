import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xed57f1D26992D786122a282966dd37a4Fa411220'
);

export default instance;
