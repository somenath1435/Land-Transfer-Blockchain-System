import web3 from './web3';
import CampaignFactory from './build_registryofficer/RegistryofficerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x2E0e555e65586E3a45A88a2438Ea7ea60d817637'
);

export default instance;
