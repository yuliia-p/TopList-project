/* eslint-disable no-unused-vars */
// movie = {
// crew: "Frank Darabont (dir.), Tim Robbins, Morgan Freeman"
// fullTitle: "The Shawshank Redemption (1994)"
// id: "tt0111161"
// imDbRating: "9.2"
// imDbRatingCount: "2618130"
// image: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX128_CR0,12,128,176_AL_.jpg"
// rank: "1"
// title: "The Shawshank Redemption"
// year: "1994"
// }
var divMoviesList = document.querySelector('.all-movies-list');

function getMovies() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/Top250Movies/k_56r9dfn2');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log('xhr.response: ', xhr.response);
    // console.log('xhr.response.items: ', xhr.response.items);
    // console.log('xhr.response.items[0]: ', xhr.response.items[0]);
    // console.log('xhr.response.items[0].crew: ', xhr.response.items[0].crew);
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
  divRow.className = 'row';
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

  return divContent;
}

// document.addEventListener('DOMContentLoaded', appendData);

// function appendData() {
//   for (var i = 0; i < xhr.response.items.length; i++) {
//     var movieListItem = singleMovie(xhr.response.items[i]);
//     divMoviesList.appendChild(movieListItem);
//   }
// }
