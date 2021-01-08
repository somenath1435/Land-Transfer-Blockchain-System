import web3 from './web3';
import CampaignFactory from './build_registryofficer/RegistryofficerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x1886D453024576DD4eBC0B5F8E17Cb5C692FFe1a'
);

export default instance;
