/* eslint-disable no-unused-vars */

var divMoviesList = document.querySelector('.all-movies-list');

function getMovies() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/Top250Movies/k_56r9dfn2');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.items.length; i++) {
      var movieListItem = singleMovie(xhr.response.items[i]);
      divMoviesList.appendChild(movieListItem);
    }
  });
  xhr.send();
}
getMovies();

function singleMovie(movie) {
  var divContent = document.createElement('div');
  divContent.className = 'column-half content-holder margin';

  var divRow = document.createElement('div');
  divRow.className = 'row row-content';
  divContent.appendChild(divRow);

  var divColThird = document.createElement('div');
  divColThird.className = 'column-third';
  divRow.appendChild(divColThird);

  var posterImg = document.createElement('img');
  posterImg.className = 'margin-rigth';
  posterImg.setAttribute('src', movie.image);
  divColThird.appendChild(posterImg);

  var divColTwoThirds = document.createElement('div');
  divColTwoThirds.className = 'column-two-thirds';
  divRow.appendChild(divColTwoThirds);

  var titleH4 = document.createElement('h4');
  titleH4.className = 'movie-title';
  titleH4.textContent = movie.fullTitle;
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

  return divContent;
}
