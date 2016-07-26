$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    var id = $('#omdb').val() ;
    console.log(id);
    findMovie(id);
  });
});

function findMovie(id) {
  return new Promise(function(resolve, reject) {
    var movie = OMDBCall(id);
    resolve(movie);
    reject(movie);
  }).then(function(OMDBresults) {
    if (OMDBresults.Response === 'True') {
      $('#output').append('<div style="float:left;" class="col-xs-4"><img src="' + OMDBresults.Poster + '"><h1>' + OMDBresults.Title + '</h1>');
    } else {
      return console.log(OMDBresults.Error);
    }
  });
}

function OMDBCall(id) {
  return $.ajax({
    method: 'GET',
    url: 'http://www.omdbapi.com/?t=' + id
  });
}
