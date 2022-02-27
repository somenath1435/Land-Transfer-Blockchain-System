import web3 from './web3';
import Campaign from './build_superAdmin/Super_Admin.json';
export default address => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};