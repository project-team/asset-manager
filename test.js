var assert = require('assert');
var asset_manager = require('./')('test','asset')

describe("asset-manager", function(){  
  it("save in db", function(){    
    asset_manager.insert({id: 1, status: 1});  
  });
});