var mongojs = require('mongojs')
var Joi = require('joi')

module.exports = function(dbname, collection){

	var db = mongojs(dbname)
	var asset = db.collection(collection)

	var schema = {
		id: Joi.string().alphanum(),
		name: Joi.string().required(),
   		status: Joi.string().alphanum().required(),
	};

	return {
		JoiSchema: function(){
			return schema;
		},
		put: function(obj, cb){

			var result = Joi.validate(obj, schema)

			if(result.error != null)
				return cb(result.error,null);

			if(!obj.id){
				asset.insert(obj, function(err, doc, lastErrorObject) {
				    cb(err,doc);
				});
			} else {
				asset.update({_id: mongojs.ObjectId(obj.id)}, {$set: {name: obj.name, status: obj.status}}, function(err, doc, lastErrorObject) {
					asset.findOne({_id: mongojs.ObjectId(obj.id)},cb);
				});
			}

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
