import web3 from './web3';
import CampaignFactory from './build_user/UserManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x447789E30947d72E69AcB82681A2591695CD9442'
);

export default instance;
