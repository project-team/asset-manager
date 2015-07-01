module.exports = function getDbCollection(dbname, collection){

	//TODO gestire errori
	var db = mongojs(dbname);
	var mycollection = db.collection(collection);

	return collection;
}