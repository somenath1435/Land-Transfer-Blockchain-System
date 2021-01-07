import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x5749e68a011C979EAA2597Fe4D1EEb28d2496462'
);

export default instance;
