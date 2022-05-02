import web3 from './web3';
import CampaignFactory from './build_blro/BlroManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x7ce9Be5bb6963033F7F06d286383a608fe510747'
);

export default instance;