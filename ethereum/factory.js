import web3 from './web3';
import CampaignFactory from './build/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xf206606a275FBab7A5e32f3Aee5c1237dc592dCa'
);

export default instance;
