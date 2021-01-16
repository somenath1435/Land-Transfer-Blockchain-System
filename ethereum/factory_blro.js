import web3 from './web3';
import CampaignFactory from './build_blro/BlroManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xF1b1aE81AE02b00DDcde3B6206714837CBf8077e'
);

export default instance;