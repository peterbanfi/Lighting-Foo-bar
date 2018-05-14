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


const password = '12345678';
const user = 'foobar';

module.exports = {
  uri: `mongodb://${user}:${password}@ds217970.mlab.com:17970/lightining-foobar`,
  options: {
    connectTimeoutMS: 5000,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    useMongoClient: true,
  },
};
