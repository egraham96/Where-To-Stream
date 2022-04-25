
const popularM=document.getElementById("popularmovies")
const popularT=document.getElementById("populartv")


const popularMovies = async() => {
    apiKey="a5c09845f2af6ed970ae332ca8d551ec"
    await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US&page=1`)
    .then(response => response.json())
    .then((data) => {console.log(data.results);
    printmovieData(data.results)})
.catch(err => {
    console.error(err);
});}

const popularTV = async() => {
    apiKey="a5c09845f2af6ed970ae332ca8d551ec"
    await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=en-US&page=1`)
    .then(response => response.json())
    .then((data) => {console.log(data.results);
    printTVData(data.results)})
.catch(err => {
    console.error(err);
});}

function printmovieData(data){
    var trendingMovies=data
    .filter(movie => {
        if (movie.title != undefined) { return true; }
    })
    if (trendingMovies.length != 0) {
        trendingMovies.length=5;
  trendingMovies.forEach(value => {
      var div=document.createElement("div");
      div.setAttribute("class", "posterpic");
        var listEl=document.createElement("ul");
        var paraEl=document.createElement("p")
        var para=document.createElement("p")
        para.textContent=value.title
        paraEl.textContent="Average user rating: " + value.vote_average + "/10"
        var pic = document.createElement("img");
        var path= value.poster_path;
        var imagelink= "https://image.tmdb.org/t/p/w200"+ path;
        pic.src = imagelink
        listEl.appendChild(div);
        div.appendChild(para)
        div.appendChild(pic);
        div.appendChild(paraEl)
        popularM.appendChild(listEl);
    })}else {popularM.textContent="No Popular Movies available"}}

function printTVData(data){
        var trendingTV=data.filter(tv => {
            if (tv.name != undefined) { return true; }
        })
        if (trendingTV.length != 0) {
            trendingTV.length=5;
      trendingTV.forEach(value => {
          var div=document.createElement("div");
          div.setAttribute("class", "posterpic");
            var listEl=document.createElement("ul");
            var paraEl=document.createElement("p")
            var para=document.createElement("p")
            para.textContent=value.name
            paraEl.textContent="Average user rating: " + value.vote_average + "/10"
            var pic = document.createElement("img");
            var path= value.poster_path;
            var imagelink= "https://image.tmdb.org/t/p/w200"+ path;
            pic.src = imagelink
            listEl.appendChild(div);
            div.appendChild(para)
            div.appendChild(pic);
            div.appendChild(paraEl)
            popularT.appendChild(listEl);
        })}else {popularT.textContent="No Popular TV Shows available"}}

popularMovies()
popularTV()