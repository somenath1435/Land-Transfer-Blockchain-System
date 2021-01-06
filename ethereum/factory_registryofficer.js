import web3 from './web3';
import CampaignFactory from './build_registryofficer/RegistryofficerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x55c4bda807e6aB6Ae45D47EdAF34e86B7B1EeC90'
);

export default instance;
