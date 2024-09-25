let searchQuery="";

let moviesData=[];


//Cargar datos de archivo JSON

let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;

          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;

        return result;
    });
}

//Guardar los géneros contenidos en un array en un string, separados por una coma


function listMovieGenres(movieGenresArray){

  let movieGenres="";
  
  for (i=0; i<movieGenresArray.length;i++){
    if (i<movieGenresArray.length-1){
      movieGenres+= movieGenresArray[i].name + ", ";
    }
    else {
      movieGenres+= movieGenresArray[i].name;
          }
        }
  
  return (movieGenres);
}


//Guardar los IDs de las películas que coinciden con el criterio de búsqueda en un array


  function getMovieIds(filteredMovieArray){
    movieIds=[];
    for (movie in filteredMovieArray){
      movieIds.push(movie.id);
    }
    return (movieIds);
  }

//Muestra el puntaje en estrellas en el documento HTML


  function showStarRating(rating){
    let starRatingContent="";
    for (i=0; i<5; i++){
        if (i<=rating-1){
            starRatingContent+=`<span class="fa fa-star checked float-end"></span>`;
        }
        else{
            starRatingContent+=`<span class="fa fa-star float-end"></span>`
        }
    }
    return (starRatingContent);

  }

  // Muestra la información de películas contenidas en un array en el documento HTML.

function showMovieInfo(movieArray){
  
    let movieContainer = document.getElementById("lista");
    movieContainer.innerHTML= "";
    starRatingContent="";
    
    for (const item of movieArray){

        let movieGenres= listMovieGenres(item.genres);
        let starRating= Math.floor((item.vote_average/10)*5);
        let starRatingContent=showStarRating(starRating);
  
        movieContainer.innerHTML+=`
        <li id=${item.id}>
        <div class="row">
        <div class="col-10">
            <h5 class="list-title movie-title" id="movie-title">${item.title}</h5>
            <p class="list-text movie-tagline">${item.tagline}</p>
        </div>
        <div class="col-2">${starRatingContent}
                <button class="btn btn-outline-light float-end" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Información</button>
        <div class="offcanvas offcanvas-top bg-dark" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header">
          <h2 class="offcanvas-title" id="offcanvasTopLabel">${item.title}</h2>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <hr>
        <div class="offcanvas-body">
          <h3></h3>
          <p>${item.overview}</p>
          <div class="row">
          <p class="font-weight-bold">Genres: ${movieGenres}</p>

          
          </div>

          
        </div>
                  <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              More
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Year: ${item.release_date.slice(0,4)}</a></li>
              <li><a class="dropdown-item" href="#">Runtime: ${item.runtime} mins</a></li>
              <li><a class="dropdown-item" href="#">Budget: $${item.budget}</a></li>
              <li><a class="dropdown-item" href="#">Revenue: $${item.revenue}</a></li>
            </ul>
          </div>
        </div>

        </div>`

       
      
        }
         movieContainer.innerHTML+=`</div>`       ;
  }


//Filtra las películas según el criterio de búsqueda

function filterMovies(movieArray){
    let filteredMovies= movieArray.filter(
        (movie) => {
            let movieTitle = movie.title.toUpperCase();
            let movieTagline = movie.tagline.toUpperCase();
            let movieOverview = movie.overview.toUpperCase();
            let genreList= movie.genres;
            let movieGenres="";
            for (i=0; i<genreList.length; i++){
                movieGenres+=genreList[i].name.toUpperCase() + " ";
            }
            let query= searchQuery.toUpperCase();


            return (movieTitle.includes(query) || movieTagline.includes(query) || movieOverview.includes(query) || movieGenres.includes(query)
            )
        }


    )
    showMovieInfo(filteredMovies);
}



getJSONData("https://japceibal.github.io/japflix_api/movies-data.json").then(function (resultObj) {
    if (resultObj.status === "ok") {
      moviesData = resultObj.data;

    }
  });

const searchInput = document.querySelector('.form-control');


searchInput.addEventListener('input', function () {
  onSearchQueryChange(this.value);
});


function onSearchQueryChange(query) {
  searchQuery = query;
  filterMovies(moviesData);
  

}




