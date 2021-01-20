import web3 from './web3';
import CampaignFactory from './build_blro/BlroManager.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x9F47ebBBE6ACc44ACB0D98326FbFfC5b82cddD14'
);

export default instance;