import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xC1686632947da70f8111b14B75B45329dF65dd7E'
);

export default instance;
