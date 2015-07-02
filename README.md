#

#asset-manager

A [node.js](http://nodejs.org) module for NodeJS Avanscoperta Course. This module handles the insert and update of an Asset in a mongodb istance.

	npm install marcoleo/asset-manager


## Usage


``` js
var asset_manager = require('asset-manager')(dbname,collectionname)
asset_manager.put({name: 'prova', status: 'status'}, function (err, result) {
      console.log(result)
      });
```

## Methods

### put

A method to insert an Asset in a Mongo database.

``` js
function(obj, cb){
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
	}
```

### get

A method to update an Asset in a Mongo database.

``` js
	function(query,cb){
		if(query == null || query === undefined)
			return cb({error:"Must Provide a query"},null);
		
		asset.findOne(query,cb);
	}
```

### close

A method to close the connection to Mongo database.

``` js
	function(){
		db.close();
	}
```

## Dependencies

Joi for validation<br>
mongojs for database connection<br>
mocha for testing
