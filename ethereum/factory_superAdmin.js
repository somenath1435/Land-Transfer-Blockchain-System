import web3 from './web3';
import CampaignFactory from './build_superAdmin/Super_AdminManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x02B3f4705A085DdcA5912cC7c39B24325f6D0f76'
);

export default instance;
