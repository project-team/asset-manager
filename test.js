var assert = require('assert');
var clean = require('mongo-clean')
var mongodb = require('mongodb')
var asset_manager = require('./')('corsonode','asset')

clean('mongodb://localhost:27017/corsonode', function(err, db){
  db.close()
})

describe("asset-manager", function(){  
  it("save in db", function(done){    
    asset_manager.put({name: 'prova', status: 'status'}, function (err, result) {
      console.log(result)
      if (err) return done(err)
       asset_manager.get({name: result.name, status: result.status}, function (err, result2) {
        if (err) return done(err)
         assert.deepEqual(result, result2)
         done()
       })
    });  
  });

  it("change status", function(done){    
    asset_manager.put({name: 'prova', status: 'newstatus'}, function (err, result) {
      console.log(result)
      if (err) return done(err)
       asset_manager.get({name: result.name}, function (err, result2) {
        if (err) return done(err)
         assert.deepEqual(result2.status, 'newstatus')
         done()
       })
    });  
  });
});
