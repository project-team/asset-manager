var assert = require('assert');
var asset_manager = require('./')('corsonode','asset')

describe("asset-manager", function(){  
  it("save in db", function(done){    
    asset_manager.put({name: 'prova', status: 1}, function (err, result) {
      if (err) return done(err)
       asset_manager.get({name: result.name, status: result.status}, function (err, result2) {
        if (err) return done(err)
         assert.deepEqual(result, result2)
         done()
       })
    });  
  });
});
