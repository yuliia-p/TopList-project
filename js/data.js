/* exported data */
var data = {
  savedMovies: [],
  allMovies: [],
  currentMovie: {}
};

var moviesJSON = localStorage.getItem('saved-movies-local-storage');
if (moviesJSON !== null) {
  data = JSON.parse(moviesJSON);
}
window.addEventListener('beforeunload', beforeUnFun);
function beforeUnFun(event) {
  var savedMovieJSON = JSON.stringify(data);
  localStorage.setItem('saved-movies-local-storage', savedMovieJSON);
}
