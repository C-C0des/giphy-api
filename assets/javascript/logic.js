$(document).ready(function(){

  var planetViews = ["Ocean", "Forest", "Desert"];
  
  function renderButtons(){
    $('#button-view').empty();
    for (var i = 0; i < planetViews.length; i++){
      var renderBtns = $('<button>');
      renderBtns.text(planetViews[i]);
      renderBtns.attr('data-name', planetViews[i]);
      renderBtns.addClass('viewBtn');
      $('#button-view').append(renderBtns);
    }
  }
  
  $('#add-view').click(function(){
    event.preventDefault();
    var userInput = $('#view-input').val().trim();
    planetViews.push(userInput);
    renderButtons();
  });
  
  function displayGifs(){
    $('#planet-view').empty();
  
    var view = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + view + "&api_key=mO2dCM46HESUzmhnGfAIXRWHF9ra1UNs";
  
    $.ajax({
      url: queryURL, 
      method: 'GET'
    })
      .done(function(response){
        
        var result = response.data;
        console.log(result);
  
        for (var i = 0; i < result.length; i++){
          var gifDiv = $('<div class="item">');
          var rating = result[i].rating;
          var p = $('<p>').text('Rating: ' + rating);
          var image = $('<img>');
          image.attr('src', result[i].images.fixed_height_still.url);
          image.addClass('gif');
          image.attr('data-state', 'still');
          image.attr('data-animate', result[i].images.fixed_height.url);
          image.attr('data-still', result[i].images.fixed_height_still.url);
          
          gifDiv.prepend(p);
          gifDiv.prepend(image);
  
          $('#planet-view').prepend(gifDiv);
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
  $(document).on("click", ".viewBtn", displayGifs);
  renderButtons();
  });