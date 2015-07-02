var assert = require('assert');
var clean = require('mongo-clean')
var mongodb = require('mongodb')
var asset_manager = require('./')('corsonode','asset')

describe("asset-manager", function(){  
  beforeEach(function(done){
    clean('mongodb://localhost:27017/corsonode', function(err, db){
      if (db)
        db.close()
      done(err)
    })
  })

  it("save in db", function(done){    
    asset_manager.put({name: 'prova222', status: 'status'}, function (err, result) {
      console.log(result)
      if (err) return done(err)
       asset_manager.get({name: result.name, status: result.status}, function (err, result2) {
        if (err) return done(err)
         assert.deepEqual(result, result2)
         done()
       })
    });  
  });
});
