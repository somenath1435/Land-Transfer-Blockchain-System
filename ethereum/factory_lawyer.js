import web3 from './web3';
import CampaignFactory from './build_lawyer/LawyerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x62A841Bb1Be2F02F8Ee0dB5D435d6a377783c843'
);

export default instance;
