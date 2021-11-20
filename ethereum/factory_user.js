import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x42f85a32Ec3caaFB9eBE5305f647aAC5E28Fbdff'
);

export default instance;
