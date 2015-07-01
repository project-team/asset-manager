var mongojs = require('mongojs')

module.exports = function(dbname, collection){

	return {
		insert: function(asset){
			var asset = getDbCollection(dbname, collection);

			asset.insert(asset);
		},
		changeStatus: function(id, status){

			var asset = getDbCollection(dbname, collection);

			asset.update({id:id}, {status : status}, {multi:true}, function() {
	    	// the update is complete
			});
		},
		getStatus: function(id){
			var asset = getDbCollection(dbname, collection);

			// find a document using a native ObjectId
			asset.findOne({
			    id:id
			}, function(err, doc) {
			    return doc.status;
			});


		}
	}

}

function getDbCollection(dbname, collection){

	//TODO gestire errori
	var db = mongojs(dbname);
	var mycollection = db.collection(collection);

	return collection;
}
