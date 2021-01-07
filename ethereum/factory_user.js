import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x557A1d596f9a9bB29EF37bB35Ecb41871952ed7c'
);

export default instance;
