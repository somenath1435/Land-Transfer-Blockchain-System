import web3 from './web3';
import CampaignFactory from './build_registryofficer/RegistryofficerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x52B7FF1ecA9Bee0758368Def450f85F16056d950'
);

export default instance;
