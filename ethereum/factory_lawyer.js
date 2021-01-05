import web3 from './web3';
import CampaignFactory from './build_lawyer/LawyerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x06c79cDD5dc35ff6552F8f60F1eBce582f265b19'
);

export default instance;
