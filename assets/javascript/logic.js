$(document).ready(function(){

  var planetViews = ["wild", "ocean"];
  
  //create buttons (preset)
  function createButtons(){
    $('#views-button').empty();
    for (var i = 0; i < planetViews.length; i++){
      var renderBtns = $('<button>');
      renderBtns.text(planetViews[i]).attr('data-name', planetViews[i]).addClass('planetviewBtn');
      $('#views-button').append(renderBtns);
    }
  }
  // create buttons (user generated)
  
  $('#add-views-button').click(function(){
    event.preventDefault();
    var userInput = $('#views-input').val().trim();
    planetViews.push(userInput);
    createButtons();
  });
  
  function displayGifs(){
    $('#planet-view').empty();
    var planet = $(this).attr('data-name');
    console.log(planet);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q" + planet + "&limit=10&api_key=I5uBD2vez782fvidks1MmN7L68YmekPy";
  
    $.ajax({
      url: queryURL, 
      method: 'GET'
    }) .done(function(response){
        var result = response.data;
  
        for (var i = 0; i < result.length; i++){
          var planetDiv = $('<div class="search-item">');
          var rating = result[i].rating;
          var p = $('<p>').text('Rating: ' + rating);
          var animated = result[i].images.fixed_height.url;
          var still = result[i].images.fixed_height_still.url;
          var image = $('<img>');
          image.attr('src', still);
          image.attr('data-state', 'still');
          image.attr('data-animated', animate);
          image.attr('data-still', still);
          image.addClass("searchImage");
          planetDiv.append(p);
          planetDiv.append(image);
          $('#planet-view').prepend(planetDiv);
        }
      });
  }
  
  function checkState() {
     var state = $(this).attr('data-state');
     console.log(state);
  
    if (state === 'still'){
      var animateURL = $(this).attr('data-animate');
      $(this).attr('src', animateURL);
      $(this).attr('data-state', 'animate');
    } else {
      var stillURL = $(this).attr('data-still');
      $(this).attr('src', stillURL);
      $(this).attr('data-state', 'still');
    }
  }
  
  
  $(document).on("click", ".gif", checkState);
  $(document).on("click", ".planetviewBtn", displayGifs);
  createButtons();
  });