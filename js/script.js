let searchQuery="";



let moviesData=[];

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






function showMovieInfo(movieArray){
    let movieContainer = document.getElementById("lista");
    movieContainer.innerHTML= "";
    starRatingContent="";
    
    for (const item of movieArray){
        let starRating= Math.floor((item.vote_average/10)*5);
        console.log(starRating)
        let starRatingContent="";
        for (i=0; i<5; i++){
            if (i<=starRating-1){
                starRatingContent+=`<span class="fa fa-star checked"></span>`;
            }
            else{
                starRatingContent+=`<span class="fa fa-star"></span>`
            }
        }
        movieContainer.innerHTML+=`
        <li>
        <div class="row">
        <div class="col-10">
            <h5 class="list-title movie-title" id="movie-title">${item.title}</h5>
            <p class="list-text movie-tagline">${item.tagline}</p>
        </div>
        <div class="col-2">${starRatingContent}
        </div>`

       
      
        }
         movieContainer.innerHTML+=`</div>`       ;
  }


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
    console.log(filteredMovies);
    showMovieInfo(filteredMovies);
}



getJSONData("https://japceibal.github.io/japflix_api/movies-data.json").then(function (resultObj) {
    if (resultObj.status === "ok") {
      moviesData = resultObj.data;
      console.log(moviesData);

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




