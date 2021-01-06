import web3 from './web3';
import CampaignFactory from './build_blro/Blro.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x91986E6C88C360004107892C69c8D40c2fAA821A'
);

export default instance;