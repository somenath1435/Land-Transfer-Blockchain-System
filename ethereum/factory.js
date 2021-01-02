import web3 from './web3';
import CampaignFactory from './build/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x5b70441Cfa8a867aD01C7C6060fF8c53a501Eaca'
);

export default instance;
