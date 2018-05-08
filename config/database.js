/*
use blog
db.createUser(
   {
     user: "root",
     pwd: "toor",
     roles:
       [
         { role: "readWrite", db: "blog" }
       ]
   }
)
*/

const host = 'localhost';
const port = 27017;
const user = 'USERFORTESTDB';
const password = 'USERPASSWORD';
const database = 'TESTDB';

module.exports = {
//uri:  'mongodb://root:toor@localhost:27017/blog'
  uri: `mongodb://${user}:${password}@${host}:${port}/${database}`,
  options: {
    connectTimeoutMS: 5000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500
  },
};
