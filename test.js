
var asset_manager = require('./')('corsonode','asset')

asset_manager.put({name : "testttttt", status: 4},function(error,data){

  console.log(data.name);
  asset_manager.close();

});
