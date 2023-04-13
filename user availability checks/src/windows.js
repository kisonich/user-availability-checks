const iconv = require('iconv-lite');
const { exec } = require('child_process');

const getUsers = (cb) => {
  exec('net user', { encoding: 'buffer' }, (error, stdout, stderr) => {
    if (error) {
      cb(stderr, null);
    } else {
      const decodedOutput = iconv.decode(stdout, 'CP866');
      const users = decodedOutput
        .slice(decodedOutput.lastIndexOf('-') + 1)
        .match(/([A-Za-zА-Яа-я0-9_]+)/g);
      cb(null, users);
    }
  });
};

const getUsersTable = (callback) => {
  getUsers((err, users) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      callback(users);
    }
  });
};

module.exports = getUsersTable;

