var mongojs = require('mongojs')
var Joi = require('joi')

module.exports = function(dbname, collection){

	var db = mongojs(dbname)
	var asset = db.collection(collection)

	var schema = {
		name: Joi.string().alphanum().min(3).max(30).required(),
   		status: Joi.string().alphanum().required(),
	};

	return {
		JoiSchema: function(){
			return schema;
		},
		put: function(obj, cb){

			if(obj._id){
				obj._id = "";
			}


			var result = Joi.validate(obj, schema)

			if(result.error != null)
				return cb(result.error,null);



			asset.findAndModify({
			    query: mongojs.ObjectId(obj._id) ,
			    update: { $set: obj },
			    new: true,
					upsert:true
			}, function(err, doc, lastErrorObject) {
			    cb(err,doc);
			});

		},
		get: function(query,cb){


			if(query == null || query === undefined)
				return cb({error:"Must Provide a query"},null);


			asset.find(query,cb);

		},
		close: function(){
			db.close();
		}

	}
}
