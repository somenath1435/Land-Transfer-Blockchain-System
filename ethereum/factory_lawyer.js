import web3 from './web3';
import CampaignFactory from './build_lawyer/LawyerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xBC5612c34AF12D6cFb67072dCED1e7438a897A92'
);

export default instance;
