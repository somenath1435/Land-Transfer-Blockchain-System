import web3 from './web3';
import CampaignFactory from './build_lawyer/LawyerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x8E0a906664e9A72B989cd89789aC6A6dfC6FB9f9'
);

export default instance;
