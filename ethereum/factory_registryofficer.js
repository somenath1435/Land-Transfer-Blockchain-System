import web3 from './web3';
import CampaignFactory from './build_registryofficer/RegistryofficerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x880BD1479C9117609dE3FCBb5FF9D227E52Cf604'
);

export default instance;
