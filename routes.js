const routes = require('next-routes')();

routes
  .add('/home', '/')
  .add('/user/:address','/user/details')
  .add('/user/:address/showusers','/user/showusers')
  .add('/user/:address/showlawyers','/user/showlawyers')
  .add('/user/:address/showregoff','/user/showregoff')
  .add('/user/:address/showblro','/user/showblro')
  .add('/user/:address/newrequest','/user/newrequest')
  .add('/user/:address/newpartialrequest','/user/newpartialrequest')
  .add('/user/:address/allrequest','/user/allrequest')
  .add('/user/:address/alllands','/user/alllands')
  .add('/user/:address/searchlands','/user/searchlands')
  .add('/user/:address/mylands','/user/mylands')
  .add('/user/:address/alllands/:id','/user/landdetails')
  .add('/user/:address/alllands/:id/landowners','/user/landowners')
  .add('/user/:address/alllands/:id/splithistory','/user/splithistory')
  .add('/lawyer/:address','/lawyer/details')
  .add('/lawyer/:address/showusers','/lawyer/showusers')
  .add('/lawyer/:address/showregoff','/lawyer/showregoff')
  .add('/lawyer/:address/showblro','/lawyer/showblro')
  .add('/lawyer/:address/allrequest','/lawyer/allrequest')
  .add('/lawyer/:address/pendingrequest','/lawyer/pendingrequest')
  .add('/lawyer/:address/allrequest/:id','/lawyer/requestdetails')
  .add('/regoff/:address','/regoff/details')
  .add('/regoff/:address/showusers','/regoff/showusers')
  .add('/regoff/:address/showblro','/regoff/showblro')
  .add('/regoff/:address/allrequest','/regoff/allrequest')
  .add('/regoff/:address/pendingrequest','/regoff/pendingrequest')
  .add('/regoff/:address/allrequest/:id','/regoff/requestdetails')
  .add('/blro/:address','/blro/details')
  .add('/blro/:address/showusers','/blro/showusers')
  .add('/blro/:address/allrequest','/blro/allrequest')
  .add('/blro/:address/pendingrequest','/blro/pendingrequest')
  .add('/blro/:address/allrequest/:id','/blro/requestdetails')
  .add('/blro/:address/registerland','/blro/registerland')
  .add('/admin/:address','/admin/details')
  .add('/admin/:address/searchlands','/admin/searchlands')
  .add('/admin/:address/searchuser','/admin/searchuser')
  .add('/register', '/register')
  .add('/login','/login');

module.exports = routes;
