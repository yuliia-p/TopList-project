/* eslint-disable no-unused-vars */
var divMoviesList = document.querySelector('.all-movies-list');
var viewElements = document.querySelectorAll('.view'); // my views
var divMoreDetails = document.querySelector('.more-details');

function getMovies() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/Top250Movies/k_f5vumxre');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.items.length; i++) {
      var movieListItem = moviesList(xhr.response.items[i]);
      divMoviesList.appendChild(movieListItem);
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
  divColTwoThirds.appendChild(pRating);
  var spanRating = document.createElement('span');
  spanRating.className = 'rating';
  spanRating.textContent = movie.imDbRating;
  pRating.appendChild(spanRating);

  var pYear = document.createElement('p');
  pYear.className = 'year';
  pYear.textContent = 'Release year ';
  divColTwoThirds.appendChild(pYear);
  var spanYear = document.createElement('span');
  spanYear.className = 'year';
  spanYear.textContent = movie.year;
  pYear.appendChild(spanYear);

  var pCrew = document.createElement('p');
  pCrew.className = 'crew';
  pCrew.textContent = 'Crew ';
  divColTwoThirds.appendChild(pCrew);
  var spanCrew = document.createElement('span');
  spanCrew.className = 'crew';
  spanCrew.textContent = movie.crew;
  pCrew.appendChild(spanCrew);

  var pRank = document.createElement('p');
  pRank.className = 'rank';
  pRank.textContent = 'Rank ';
  divColTwoThirds.appendChild(pRank);
  var spanRank = document.createElement('span');
  spanRank.className = 'rank';
  spanRank.textContent = movie.rank;
  pRank.appendChild(spanRank);
  // add id

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
      viewElements[x].classList.remove('hidden'); // remove hidden
    } else {
      viewElements[x].classList.add('hidden'); // add hidden
    }
  }
}

function viewMoreDetails(event) {
  if (event.target.tagName === 'BUTTON') {
    switchView('more-details');
    var closestDiv = event.target.closest('.content-holder');
    var movieID = closestDiv.getAttribute('data-movie-id');
    getInfo(movieID);
  }
  function getInfo(movieID) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'http://www.omdbapi.com/?' + 'i=' + movieID + '&apikey=b1862476&' + '&plot=full');
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', function () {
      var detaliedMovie = singleMovieInfo(xhr2.response);
      divMoreDetails.appendChild(detaliedMovie);
    });
    xhr2.send();
  }
  divMoreDetails.replaceChildren();
}

var buttonAllMovies = document.querySelector('#movies-list');
buttonAllMovies.addEventListener('click', viewAllMovies);

function viewAllMovies(event) {
  if (event.target.matches('#movies-list')) {
    switchView('all-movies-list');
  }
}

function singleMovieInfo(movie) { // ?
  var divMoreInfo = document.createElement('div');
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

  var pDirector = document.createElement('p');
  pDirector.className = 'director margin-line-spacing';
  pDirector.textContent = 'Director ';
  divColTwoThirdsDesk.appendChild(pDirector);
  var spanDirector = document.createElement('span');
  spanDirector.className = 'director';
  spanDirector.textContent = movie.Director; // ?
  pDirector.appendChild(spanDirector);

  var pGenre = document.createElement('p');
  pGenre.className = 'genre margin-line-spacing';
  pGenre.textContent = 'Genre ';
  divColTwoThirdsDesk.appendChild(pGenre);
  var spanGenre = document.createElement('span');
  spanGenre.className = 'genre';
  spanGenre.textContent = movie.Genre;
  pGenre.appendChild(spanGenre);

  var pCast = document.createElement('p');
  pCast.className = 'cast margin-line-spacing';
  pCast.textContent = 'Top Cast ';
  divColTwoThirdsDesk.appendChild(pCast);
  var spanCast = document.createElement('span');
  spanCast.className = 'cast';
  spanCast.textContent = movie.Actors;
  pCast.appendChild(spanCast);

  var pWriter = document.createElement('p');
  pWriter.className = 'writer margin-line-spacing';
  pWriter.textContent = 'Writer ';
  divColTwoThirdsDesk.appendChild(pWriter);
  var spanWriter = document.createElement('span');
  spanWriter.className = 'writer';
  spanWriter.textContent = movie.Writer;
  pWriter.appendChild(spanWriter);

  var pLanguage = document.createElement('p');
  pLanguage.className = 'language margin-line-spacing';
  pLanguage.textContent = 'Language ';
  divColTwoThirdsDesk.appendChild(pLanguage);
  var spanLanguage = document.createElement('span');
  spanLanguage.className = 'writer';
  spanLanguage.textContent = movie.Language; // ?
  pLanguage.appendChild(spanLanguage);

  var pCountry = document.createElement('p');
  pCountry.className = 'country margin-line-spacing';
  pCountry.textContent = 'Country ';
  divColTwoThirdsDesk.appendChild(pCountry);
  var spanCountry = document.createElement('span');
  spanCountry.className = 'country';
  spanCountry.textContent = movie.Country; // ?
  pCountry.appendChild(spanCountry);

  var pRated = document.createElement('p');
  pRated.className = 'rated margin-line-spacing';
  pRated.textContent = 'Rated ';
  divColTwoThirdsDesk.appendChild(pRated);
  var spanRated = document.createElement('span');
  spanRated.className = 'rated';
  spanRated.textContent = movie.Rated; // ?
  pRated.appendChild(spanRated);

  var pRelease = document.createElement('p');
  pRelease.className = 'release margin-line-spacing';
  pRelease.textContent = 'Release date ';
  divColTwoThirdsDesk.appendChild(pRelease);
  var spanRelease = document.createElement('span');
  spanRelease.className = 'release';
  spanRelease.textContent = movie.Rated; // ?
  pRelease.appendChild(spanRelease);

  var divRow2 = document.createElement('div');
  divRow.className = 'row';
  divBackColor.appendChild(divRow2);

  var divColFull = document.createElement('div');
  divColFull.className = 'column-full padding';
  divRow2.appendChild(divColFull);

  var h3Titile = document.createElement('h3');
  h3Titile.className = 'movie-title';
  h3Titile.textContent = movie.Title;
  divColFull.appendChild(h3Titile);

  var pYear = document.createElement('p');
  pYear.className = 'year';
  pYear.textContent = movie.Year;
  divColFull.appendChild(pYear);

  var pStory = document.createElement('p');
  pStory.className = 'storyline';
  pStory.textContent = 'Storyline';
  divColFull.appendChild(pStory);

  var pPlot = document.createElement('p');
  pPlot.className = 'plot';
  divColFull.appendChild(pPlot);
  var spanPlot = document.createElement('span');
  spanPlot.className = 'plot';
  spanPlot.textContent = movie.Plot;
  pPlot.appendChild(spanPlot);

  return divMoreInfo;
}
