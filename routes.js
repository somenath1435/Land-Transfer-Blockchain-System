const routes = require('next-routes')();

routes
  .add('/home', '/')
  .add('/user/:address','/user/details')
  .add('/lawyer/:address','/lawyer/details')
  .add('/lawyer/:address/requests','/lawyer/requests')
  .add('/register', '/register')
  .add('/login','/login');

module.exports = routes;
