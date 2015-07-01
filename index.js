var mongojs = require('mongojs')


module.exports = function(dbname, collection){

	var db = mongojs(dbname)
	var asset = db.collection(collection)

	return {
		put: function(obj, cb){


			asset.findAndModify({
			    query: obj ,
			    update: { $set: obj },
			    new: true,
					upsert:true
			}, function(err, doc, lastErrorObject) {
			    cb(err,doc);
			});

		},
		get: function(query,cb){
			asset.findOne(query,cb);
		},
		close: function(){
			db.close();
		}

	}
}
