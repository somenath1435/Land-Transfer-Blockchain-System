import web3 from './web3';
import CampaignFactory from './build_lawyer/LawyerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xc50a1fc55A533d69b4b5390b79097Fa6D613504E'
);

export default instance;
