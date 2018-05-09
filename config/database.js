/*
use TESTDB
db.createUser(
   {
     user: "USERFORTESTDB",
     pwd: "USERPASSWORD",
     roles:
       [
         { role: "readWrite", db: "TESTDB" }
       ]
   }
)
*/

const host = 'localhost';
const port = 27017;
const user = 'root';
const password = 'toor';
const database = 'blog';

module.exports = {
  uri: `mongodb://${user}:${password}@${host}:${port}/${database}`,
  options: {
    connectTimeoutMS: 5000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    useMongoClient: true,
  },
};
