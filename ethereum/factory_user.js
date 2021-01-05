import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x33f9Fbe5692E0c641065a60846ce7200bDB06Dde'
);

export default instance;
