$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    var id = $('#omdb').val();
    findMovie(id);
  });
});

function findMovie(id) {
  return new Promise(function(resolve, reject) {
    resolve(ajaxCall(id));
  }).then(function(OMDBObj) {
    console.log(OMDBObj);
    $('#output').append('<image src="' + OMDBObj.Poster + '">');

    var genreArray = getGenre(OMDBObj.Genre);

    addToGenreList(genreArray);
    sort_unique();

  }).catch(function(err) {
    return err;
  });
}

function ajaxCall(id) {
  return ($.ajax({
    method: 'GET',
    url: 'http://www.omdbapi.com/?t=' + id
  }));
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
    }
    else {
      listItems[this.text] = this.value;
    }
  });
}
