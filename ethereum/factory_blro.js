import web3 from './web3';
import CampaignFactory from './build_blro/BlroManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xfd85651EBd0D067a77fCBFB23a0F933b3E6178Cc'
);

export default instance;