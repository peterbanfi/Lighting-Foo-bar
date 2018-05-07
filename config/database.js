/*
use DBNAME
db.createUser(
   {
     user: "USERNAME",
     pwd: "USERPASSWORD",
     roles:
       [
         { role: "readWrite", db: "DBNAME" }
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
    connectTimeoutMS: 2000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    useMongoClient: true,
  },
};
