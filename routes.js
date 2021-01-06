const routes = require('next-routes')();

routes
  .add('/home', '/')
  .add('/user/:address','/user/details')
  .add('/user/:address/showlawyers','/user/showlawyers')
  .add('/user/:address/newrequest','/user/newrequest')
  .add('/user/:address/allrequest','/user/allrequest')
  .add('/lawyer/:address','/lawyer/details')
  .add('/lawyer/:address/showregoff','/lawyer/showregoff')
  .add('/lawyer/:address/newrequest','/lawyer/newrequest')
  .add('/lawyer/:address/allrequest','/lawyer/allrequest')
  .add('/lawyer/:address/requests','/lawyer/requests')
  .add('/register', '/register')
  .add('/login','/login');

module.exports = routes;
