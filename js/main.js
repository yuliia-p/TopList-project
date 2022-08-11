/* eslint-disable no-unused-vars */
var divMoviesList = document.querySelector('.all-movies-list');
var viewElements = document.querySelectorAll('.view');
var divMoreDetails = document.querySelector('.more-details');
var divWatchList = document.querySelector('.watchlist');
var buttonAllMovies = document.querySelector('#movies-list');
var aWatchlist = document.querySelector('#watchlist');
var modal = document.querySelector('.modal');

buttonAllMovies.addEventListener('click', viewAllMovies);
aWatchlist.addEventListener('click', viewWatchlist);

function getMovies() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/Top250Movies/k_f5vumxre');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.items.length; i++) {
      var movieListItem = moviesList(xhr.response.items[i]);
      divMoviesList.appendChild(movieListItem);
      data.allMovies = xhr.response.items;
    }
  });
  xhr.send();
}
getMovies();

function moviesList(movie) {
  var divContent = document.createElement('div');
  divContent.className = 'column-half content-holder margin';
  divContent.setAttribute('data-movie-id', movie.id);

  var divRow = document.createElement('div');
  divRow.className = 'row row-content';
  divContent.appendChild(divRow);

  var divColThird = document.createElement('div');
  divColThird.className = 'column-third';
  divRow.appendChild(divColThird);

  var posterImg = document.createElement('img');
  posterImg.className = 'margin-right';
  posterImg.setAttribute('src', movie.image);
  divColThird.appendChild(posterImg);

  var divColTwoThirds = document.createElement('div');
  divColTwoThirds.className = 'column-two-thirds padding-left';
  divRow.appendChild(divColTwoThirds);

  var titleH4 = document.createElement('h4');
  titleH4.className = 'movie-title';
  titleH4.textContent = movie.title;
  divColTwoThirds.appendChild(titleH4);

  var pRating = document.createElement('p');
  pRating.className = 'rating';
  pRating.textContent = 'IMDb rating ';
  pRating.style.color = '#FE5F55';
  divColTwoThirds.appendChild(pRating);
  var spanRating = document.createElement('span');
  spanRating.className = 'rating font-weight-100';
  spanRating.style.color = '#FE5F55';
  spanRating.textContent = movie.imDbRating;
  pRating.appendChild(spanRating);

  var pYear = document.createElement('p');
  pYear.className = 'year';
  pYear.textContent = 'Release year ';
  divColTwoThirds.appendChild(pYear);
  var spanYear = document.createElement('span');
  spanYear.className = 'year font-weight-100';
  spanYear.textContent = movie.year;
  pYear.appendChild(spanYear);

  var pCrew = document.createElement('p');
  pCrew.className = 'crew';
  pCrew.textContent = 'Crew ';
  divColTwoThirds.appendChild(pCrew);
  var spanCrew = document.createElement('span');
  spanCrew.className = 'crew font-weight-100';
  spanCrew.textContent = movie.crew;
  pCrew.appendChild(spanCrew);

  var pRank = document.createElement('p');
  pRank.className = 'rank';
  pRank.textContent = 'Rank ';
  divColTwoThirds.appendChild(pRank);
  var spanRank = document.createElement('span');
  spanRank.className = 'rank font-weight-100';
  spanRank.textContent = movie.rank;
  pRank.appendChild(spanRank);

  var divButton = document.createElement('div');
  divButton.className = 'more-button';
  divColTwoThirds.appendChild(divButton);
  var buttonMore = document.createElement('button');
  buttonMore.setAttribute('type', 'button');
  buttonMore.className = 'more-details-button';
  buttonMore.textContent = 'More Details';
  divButton.appendChild(buttonMore);
  buttonMore.addEventListener('click', viewMoreDetails);
  return divContent;
}

function switchView(viewName) {
  for (var x = 0; x < viewElements.length; x++) {
    if (viewElements[x].getAttribute('data-view') === viewName) {
      viewElements[x].classList.remove('hidden');
    } else {
      viewElements[x].classList.add('hidden');
    }
  }
}

function viewMoreDetails(event) {
  buttonAllMovies.classList.remove('selected');

  if (event.target.tagName === 'BUTTON') {
    switchView('more-details');
    var closestDiv = event.target.closest('.content-holder');
    var movieID = closestDiv.getAttribute('data-movie-id');

    for (var i = 0; i < data.allMovies.length; i++) {
      if (data.allMovies[i].id === movieID) {
        data.currentMovie = data.allMovies[i];
      }
    }
    getInfo(movieID);
  }

  function getInfo(movieID) {
    // debugger;
    var loaderEl = document.querySelector('.loader');
    loaderEl.classList.remove('hidden');
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'https://www.omdbapi.com/?' + 'i=' + movieID + '&apikey=b1862476&' + '&plot=full');
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', function () {
      // loader
      loaderEl.classList.add('hidden');
      // setTimeout(showPage, 500);
      // function showPage() {
      // }

      var detaliedMovie = singleMovieInfo(xhr2.response);
      divMoreDetails.appendChild(detaliedMovie);
      for (var y = 0; y < data.savedMovies.length; y++) {
        if (data.savedMovies[y].id === movieID) {
          var addButton = document.querySelector('.watchlist-button');
          var removeButton = document.querySelector('.delete-button');

          addButton.classList.add('hidden');
          removeButton.classList.remove('hidden');
        }
      }
    });
    xhr2.send();
  }
  divMoreDetails.replaceChildren();
}

function viewAllMovies(event) {
  if (event.target.matches('#movies-list')) {
    switchView('all-movies-list');
    buttonAllMovies.classList.add('selected');
    aWatchlist.classList.remove('selected');
  }
}

function singleMovieInfo(movie) {
  var divMoreInfo = document.createElement('div');
  divMoreInfo.setAttribute('data-movie-id', movie.imdbID);
  divMoreInfo.className = 'column-full content-holder margin';

  var divBackColor = document.createElement('div');
  divBackColor.className = 'backgroung-color';
  divMoreInfo.appendChild(divBackColor);

  var divRow = document.createElement('div');
  divRow.className = 'row';
  divBackColor.appendChild(divRow);

  var divColTwoThirds = document.createElement('div');
  divColTwoThirds.className = 'column-two-thirds-mobile column-third';
  divRow.appendChild(divColTwoThirds);

  var singleMoviePoster = document.createElement('img');
  singleMoviePoster.setAttribute('src', movie.Poster);
  singleMoviePoster.setAttribute('alt', 'movie-poster');
  singleMoviePoster.className = 'single-movie-poster';
  divColTwoThirds.appendChild(singleMoviePoster);

  var divColTwoThirdsDesk = document.createElement('div');
  divColTwoThirdsDesk.className = 'column-two-thirds-desktop column-third';
  divRow.appendChild(divColTwoThirdsDesk);

  var pSingleRating = document.createElement('p');
  pSingleRating.className = 'single-rating';
  pSingleRating.textContent = 'IMDb rating ';
  divColTwoThirdsDesk.appendChild(pSingleRating);
  var spanSingleRating = document.createElement('span');
  spanSingleRating.className = 'single-rating';
  spanSingleRating.textContent = movie.Ratings[0].Value;
  pSingleRating.appendChild(spanSingleRating);

  var h2Titile = document.createElement('h2');
  h2Titile.className = 'movie-title desktop-view';
  h2Titile.textContent = movie.Title;
  divColTwoThirdsDesk.appendChild(h2Titile);

  var pYear2 = document.createElement('p');
  pYear2.className = 'year desktop-view';
  pYear2.textContent = '(' + movie.Year + ')';
  divColTwoThirdsDesk.appendChild(pYear2);

  var pDirector = document.createElement('p');
  pDirector.className = 'director margin-line-spacing';
  pDirector.textContent = 'Director ';
  divColTwoThirdsDesk.appendChild(pDirector);
  var spanDirector = document.createElement('span');
  spanDirector.className = 'director font-weight-100';
  spanDirector.textContent = movie.Director;
  pDirector.appendChild(spanDirector);

  var pGenre = document.createElement('p');
  pGenre.className = 'genre margin-line-spacing';
  pGenre.textContent = 'Genre ';
  divColTwoThirdsDesk.appendChild(pGenre);
  var spanGenre = document.createElement('span');
  spanGenre.className = 'genre font-weight-100';
  spanGenre.textContent = movie.Genre;
  pGenre.appendChild(spanGenre);

  var pCast = document.createElement('p');
  pCast.className = 'cast margin-line-spacing';
  pCast.textContent = 'Top Cast ';
  divColTwoThirdsDesk.appendChild(pCast);
  var spanCast = document.createElement('span');
  spanCast.className = 'cast font-weight-100';
  spanCast.textContent = movie.Actors;
  pCast.appendChild(spanCast);

  var pWriter = document.createElement('p');
  pWriter.className = 'writer margin-line-spacing';
  pWriter.textContent = 'Writer ';
  divColTwoThirdsDesk.appendChild(pWriter);
  var spanWriter = document.createElement('span');
  spanWriter.className = 'writer font-weight-100';
  spanWriter.textContent = movie.Writer;
  pWriter.appendChild(spanWriter);

  var pCountry = document.createElement('p');
  pCountry.className = 'country margin-line-spacing';
  pCountry.textContent = 'Country ';
  divColTwoThirdsDesk.appendChild(pCountry);
  var spanCountry = document.createElement('span');
  spanCountry.className = 'country font-weight-100';
  spanCountry.textContent = movie.Country;
  pCountry.appendChild(spanCountry);

  var pRated = document.createElement('p');
  pRated.className = 'rated margin-line-spacing';
  pRated.textContent = 'Rated ';
  divColTwoThirdsDesk.appendChild(pRated);
  var spanRated = document.createElement('span');
  spanRated.className = 'rated font-weight-100';
  spanRated.textContent = movie.Rated;
  pRated.appendChild(spanRated);

  var pRelease = document.createElement('p');
  pRelease.className = 'release margin-line-spacing';
  pRelease.textContent = 'Release date ';
  divColTwoThirdsDesk.appendChild(pRelease);
  var spanRelease = document.createElement('span');
  spanRelease.className = 'release font-weight-100';
  spanRelease.textContent = movie.Released;
  pRelease.appendChild(spanRelease);

  var pStoryDesk = document.createElement('p');
  pStoryDesk.className = 'storyline desktop-view';
  pStoryDesk.textContent = 'Storyline';
  divColTwoThirdsDesk.appendChild(pStoryDesk);

  var pPlotDesk = document.createElement('p');
  pPlotDesk.className = 'plot desktop-view';
  divColTwoThirdsDesk.appendChild(pPlotDesk);
  var spanPlotDesk = document.createElement('span');
  spanPlotDesk.className = 'plot font-weight-100 desktop-view';
  spanPlotDesk.textContent = movie.Plot;
  pPlotDesk.appendChild(spanPlotDesk);

  var divRow2 = document.createElement('div');
  divRow.className = 'row';
  divBackColor.appendChild(divRow2);

  var divColFull = document.createElement('div');
  divColFull.className = 'column-full padding';
  divRow2.appendChild(divColFull);

  var h3Titile = document.createElement('h3');
  h3Titile.className = 'movie-title mobile-view';
  h3Titile.textContent = movie.Title;
  divColFull.appendChild(h3Titile);

  var pYear = document.createElement('p');
  pYear.className = 'year mobile-view';
  pYear.textContent = '(' + movie.Year + ')';
  divColFull.appendChild(pYear);

  var pStory = document.createElement('p');
  pStory.className = 'storyline mobile-view';
  pStory.textContent = 'Storyline';
  divColFull.appendChild(pStory);

  var pPlot = document.createElement('p');
  pPlot.className = 'plot mobile-view';
  divColFull.appendChild(pPlot);
  var spanPlot = document.createElement('span');
  spanPlot.className = 'plot font-weight-100 mobile-view';
  spanPlot.textContent = movie.Plot;
  pPlot.appendChild(spanPlot);

  var divRow3 = document.createElement('div');
  divRow3.className = 'row';
  divBackColor.appendChild(divRow3);

  var divColFull2 = document.createElement('div');
  divColFull2.className = 'column-full padding';
  divRow3.appendChild(divColFull2);

  var divWatchList = document.createElement('div');
  divWatchList.className = 'watchlist-button';
  divColFull2.appendChild(divWatchList);

  var addButton = document.createElement('button');
  addButton.setAttribute('type', 'button');
  addButton.className = 'add-to-watchlist button-style';
  addButton.textContent = 'Add to Watchlist';
  divWatchList.appendChild(addButton);
  addButton.addEventListener('click', addMovie);

  var removeDiv = document.createElement('div');
  removeDiv.className = 'delete-button hidden';
  divColFull2.appendChild(removeDiv);

  var removeButton = document.createElement('button');
  removeButton.setAttribute('type', 'button');
  removeButton.className = 'delete-from-watchlist button-style';
  removeButton.textContent = 'Remove from Watchlist';
  removeDiv.appendChild(removeButton);
  removeButton.addEventListener('click', removeFromWatchlist);
  return divMoreInfo;
}

function addMovie(event) {
  if (event.target.matches('.add-to-watchlist')) {
    var movie = {};
    var closestDiv = event.target.closest('.content-holder');
    var movieID = closestDiv.getAttribute('data-movie-id');
    getInfo(movieID);
  }
  function getInfo(movieID) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'http://www.omdbapi.com/?' + 'i=' + movieID + '&apikey=b1862476&' + '&plot=full');
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', function () {
      movie = Object.assign(data.currentMovie, xhr2.response);
      data.savedMovies.push(movie);
      viewWatchlist();
    });
    xhr2.send();
  }
}

function viewWatchlist() {
  divWatchList.replaceChildren();
  buttonAllMovies.classList.remove('selected');
  aWatchlist.classList.add('selected');
  switchView('watchlist');
  for (var y = 0; y < data.savedMovies.length; y++) {
    var savedList = moviesList(data.savedMovies[y]);
    divWatchList.prepend(savedList);
  }

}

function removeFromWatchlist(event) {

  if (event.target.matches('.delete-from-watchlist')) {
    modal.classList.remove('hidden');
    var closestDiv = event.target.closest('.content-holder');
    var movieID = closestDiv.getAttribute('data-movie-id');

    var cancelButton = document.querySelector('.cancel-button');
    cancelButton.addEventListener('click', function () {
      modal.classList.add('hidden');
    });
    var deleteButton = document.querySelector('.confirm-button');
    deleteButton.addEventListener('click', function () {
      for (var y = 0; y < data.savedMovies.length; y++) {
        if (data.savedMovies[y].id === movieID) {
          data.savedMovies.splice(y, 1);
        }
      }
      modal.classList.add('hidden');
      viewWatchlist();
    });
  }
}
