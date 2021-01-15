import web3 from './web3';
import CampaignFactory from './build_blro/BlroManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x669c043b31cC5e0EE994880590C577bcBfD53aC5'
);

export default instance;