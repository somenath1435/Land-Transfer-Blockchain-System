import web3 from './web3';
import CampaignFactory from './build_lawyer/LawyerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x5F805a4e596f322777b8Bb6529018a48C49A5d2e'
);

export default instance;
