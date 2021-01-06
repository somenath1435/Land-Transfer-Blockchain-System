import web3 from './web3';
import CampaignFactory from './build_blro/BlroManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x374DCBBeBd2d6A9430EddE3b8a111F17Ec4a35E1'
);

export default instance;