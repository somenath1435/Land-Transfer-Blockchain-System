import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x0C2FBC90DB0ddd5860Cb0C14a6005B0565D044f8'
);

export default instance;
