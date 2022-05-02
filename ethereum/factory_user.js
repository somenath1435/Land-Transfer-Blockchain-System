import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x70089ad84eD8b3E1deaB6507FEaC691fA9D6af5B'
);

export default instance;
