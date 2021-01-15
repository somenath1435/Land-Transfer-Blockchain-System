import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xbc43BBDd16290EfaC88B043e98C3281554Ab52ed'
);

export default instance;
