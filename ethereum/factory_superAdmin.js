import web3 from './web3';
import CampaignFactory from './build_superAdmin/super_AdminManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  'Add here the deployed address'
);

export default instance;
