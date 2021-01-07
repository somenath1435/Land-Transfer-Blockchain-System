import web3 from './web3';
import CampaignFactory from './build_registryofficer/RegistryofficerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x4cEe3050913b49828ff3b4AfE962078AcaBDBcED'
);

export default instance;
