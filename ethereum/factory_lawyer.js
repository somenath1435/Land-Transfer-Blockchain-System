import web3 from './web3';
import CampaignFactory from './build_lawyer/LawyerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x6248E4b9C11F860Ec41444add8cD2f2DcFC65971'
);

export default instance;
