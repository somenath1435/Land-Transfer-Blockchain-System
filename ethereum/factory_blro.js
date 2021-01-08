import web3 from './web3';
import CampaignFactory from './build_blro/BlroManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x300CE56D0a48C99deE1ef7bcd383C927996ea430'
);

export default instance;