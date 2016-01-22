var path        = require('path');
var express     = require('express');
var cors        = require('cors');
var NamesLoader = require('./server/lib/NamesLoader');

var SOURCE_FILE = path.resolve(path.join(__dirname,
                                         'data',
                                         'marvel-wikia-data.csv'
                                        ));

var app = express();

app.use(cors());

NamesLoader.load(SOURCE_FILE, function (namesArray) {
  app.get('/search', function (req, res) {
    var query   = req.query.q.toLowerCase();
    var results = [];

    namesArray.forEach(function (item) {
      if ( item.toLowerCase().indexOf(query) !== -1 ) {
        results.push({text: item});
      }
    });

    res.json({results: results});
  });

  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
});
