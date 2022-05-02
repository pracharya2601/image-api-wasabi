const { MongoClient } = require('mongodb');
const connectionString = 'mongodb://apimanagementtestinguser:p!yd6cZVPB8Jw!P@12@SG-mongo-db-testing-50989.servers.mongodirector.com:27017?ssl=true';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("api-management-testing");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    if(!dbConnection) {
        this.connectToServer((err) => {
            if(err) {
                console.log('error')
            }
            else {
                console.log('error not happened. Connected')
            }
            
        })
    }
    return dbConnection;
  },
};