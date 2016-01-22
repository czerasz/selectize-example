var fs        = require('fs');
var CSVtoJSON = require('csvtojson');
var _         = require('lodash');

// Converter Class
var Converter = CSVtoJSON.Converter;
var converter = new Converter({
  checkType: false // Turn off auto type check to increase performance
});

module.exports = {
  load: function (source_file, callback) {
    // End_parsed will be emitted once parsing finished
    converter.on('end_parsed', function (jsonArray) {
      var names = [];

      jsonArray.forEach(function (item) {
        var fullName  = item.name;
        var shortName = fullName.split('(')[0].trim();

        names.push(shortName);
      });

      names = names.sort();
      names = _.unique(names);

      // Remove the last 3 items which were wrongly parsed
      names.splice(-3, 3);

      callback(names);
    });

    // Read from file
    fs.createReadStream(source_file).pipe(converter);
  }
}
