$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    var id = $('#omdb').val() ;
    console.log(id);
    ajaxCall(id);
    //  $('#output').append('');
  });
  ajaxCall('grease');
});

function ajaxCall(id) {
  $.ajax({
    method: 'GET',
    url: 'http://www.omdbapi.com/?t=' + id
  }).done(function(OMDBresults) {
    console.log(OMDBresults);
  });
}
