import web3 from './web3';
import CampaignFactory from './build_lawyer/LawyerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xb2fdbEE75fA84060C9871427c82fb1F994218673'
);

export default instance;
