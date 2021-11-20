import web3 from './web3';
import CampaignFactory from './build_lawyer/LawyerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x094C87609701bA11ca4aDd235eD3b98b8b1df951'
);

export default instance;
