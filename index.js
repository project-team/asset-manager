var mongojs = require('mongojs')
var Joi = require('joi')

module.exports = function(dbname, collection){

	var db = mongojs(dbname)
	var asset = db.collection(collection)

	var schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    status: Joi.string().alphanum().required(),
	});


	return {
		put: function(obj, cb){


			var result = Joi.validate(obj, schema)

			if(result.err != null)
				return cb(result.err,null);



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


			if(query == null || query === undefined)
				return cb({error:"Must Provide a query"},null);


			asset.findOne(query,cb);

		},
		close: function(){
			db.close();
		}

	}
}
