import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x7B04593408D7c6bAB3E42977Af50C0B9EFdBF43a'
);

export default instance;
