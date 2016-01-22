$('#tag-input').selectize({
  separator: ',',
  create: true,
  options: [],
  valueField: 'text',
  labelField: 'text',
  searchField: 'text',
  load: function(query, callback) {
    if (!query.length) return callback();

    $.ajax({
      url: 'http://localhost:3000/search/',
      data: {
        q: encodeURIComponent(query)
      },
      type: 'GET',
      error: function() {
        callback();
      },
      success: function(res) {
        var items = res.results.slice(0, 10);

        callback(items);
      }
    });
  }
});
