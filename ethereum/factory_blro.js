import web3 from './web3';
import CampaignFactory from './build_blro/BlroManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xb41a9Ab0F6dB983c769E13498B3F40786059117C'
);

export default instance;