#

#asset-manager

A [node.js](http://nodejs.org) module for NodeJS Avanscoperta. This module insert in a mongodb istance a Asset.

	npm install marcoleo/asset-manager


## Usage


``` js
var asset_manager = require('asset-manager')(dbname,collectionname)
asset_manager.put({name: 'prova', status: 'status'}, function (err, result) {
      console.log(result)
      });
```
