import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x326a83c15BeaF18795e2E154b6685291B8D6e3d9'
);

export default instance;
