$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    var id = $('#omdb').val();
    findMovie(id);
    $('#omdb').val('');
  });
});

function findMovie(id) {
  return new Promise(function(resolve, reject) {

    var movie = OMDBCall(id);
    resolve(movie);
    reject(movie);
  }).then(function(OMDBresults) {
    if (OMDBresults.Response === 'True') {
      $('#output').append('<div style="height:550px" class="container col-xs-4 text-center"><img src="' + OMDBresults.Poster + '"><h1>' + OMDBresults.Title + '</h1></div>');
      var genreArray = getGenre(OMDBresults.Genre);
      addToGenreList(genreArray);
      sort_unique();
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

function getGenre(genreString) {
  var array = genreString.split(',');
  return array;
}

function addToGenreList(array) {
  for (var i = 0; i < array.length; i++) {
    $('#genre').append('<option value="' + array[i] + '">' + array[i] + '</option>');
  }
}

function sort_unique() {
  var listItems = {};
  $('#genre option').each(function() {
    if (listItems[this.text]) {
      $(this).remove();
    } else {
      listItems[this.text] = this.value;
    }
  });
}
