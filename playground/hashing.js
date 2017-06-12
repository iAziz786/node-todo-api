const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashPassword = '$2a$10$pPTsjFZ1.HI/XgfJH0MRl.vAa7W6dDp9JHYurKP76IccDOrrSu2ZG';
bcrypt.compare('password', hashPassword, (res, err) => {
  console.log(err);
})


// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123abcd')
// console.log(token);
//
// var decoded = jwt.verify(token, '123abcd');
// console.log(decoded);

// const {SHA256} = require('crypto-js');

// var message = 'This is user number 4';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not save it.');
// }
