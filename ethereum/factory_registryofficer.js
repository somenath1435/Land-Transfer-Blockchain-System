import web3 from './web3';
import CampaignFactory from './build_registryofficer/RegistryofficerManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x00685b055F9e867031E2d85a7C6C4D3E0F0f696c'
);

export default instance;
