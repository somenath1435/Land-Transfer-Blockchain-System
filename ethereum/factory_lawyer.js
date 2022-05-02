import web3 from './web3';
import CampaignFactory from './build_lawyer/LawyerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x60F6c52102C75471AE84541C3BB491f4ca08edA2'
);

export default instance;
