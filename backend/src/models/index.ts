const dbConfig = require("../config/db.config.ts");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var dbs : any = {};
dbs.mongoose = mongoose;
dbs.url = dbConfig.url;
dbs.monitorKits = require("./monitorKit.model.ts")(mongoose);

module.exports = dbs;
