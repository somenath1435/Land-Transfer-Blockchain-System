import web3 from './web3';
import CampaignFactory from './build_lawyer/LawyerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x50c8c82f049Da69A50Fc1c9c0604316b9B53e1Bb'
);

export default instance;
