import web3 from './web3';
import CampaignFactory from './build_registryofficer/RegistryofficerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xA4E7f7dc42Bf89565b454399F414325B24C2dE11'
);

export default instance;
