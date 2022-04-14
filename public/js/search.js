const clearbutton = document.getElementById("clearbutton");
const movie = document.getElementById("moviecheck")
const tvshow = document.getElementById("tvcheck")
const errormessage = document.getElementById("errormessage");
const searchbutton = document.getElementById("searchbutton");
const resultsbox = document.getElementById("resultsbox");
const imagebox = document.getElementById("imagebox")
const titlebutton = document.getElementById("titlebutton")
const suboptions = document.getElementById("suboptions");
const subheading = document.getElementById("subheading");
const suberror = document.getElementById("suberror");
const rentoptions = document.getElementById("rentoptions");
const rentheading = document.getElementById("rentheading");
const renterror = document.getElementById("renterror");
const buyoptions = document.getElementById("buyoptions");
const buyheading = document.getElementById("buyheading");
const buyerror = document.getElementById("buyerror");
let imagelink = ""





//Takes query and media type submitted by user and returns Watchmode API id & IMDB id for query (if found)
function getIds(query, type) {
    fetch(
            `https://watchmode.p.rapidapi.com/search/?search_field=name&search_value=${query}&types=${type}`, {
                method: "GET",
                headers: {
                    "x-rapidapi-key": "be9a60e677msh27b9eb97af299e8p1c5a0djsnb9ba03ed5bd6",
                    "x-rapidapi-host": "watchmode.p.rapidapi.com",
                },
            }
        )
        .then(response => response.json())
        .then((data) => {
            if (data.title_results.length != 0) {
                let watchmodeId = data.title_results[0].id;
                let imdbId = data.title_results[0].imdb_id;
                getStreaminginfo(watchmodeId, query, type)
                getpicture(imdbId, type)
                    /*If Watchmode does not have the query title (and thus its ID) in its database, that means it does not have any streaming options. This throws an error telling user to pick a different movie or show*/
                    /*You can test this by inputting a movie or show that does not exist*/
            } else throw Error('No movie found by that name');
        })
        .catch((err) => {
            console.error(err);
            errormessage.textContent = "No results found by that name. Please try searching for a different movie or TV show. Also, please be sure to check the correct box."
        });
}

//Returns all streaming data from Watchmode API for inputted movie or tv show (if found on Watchmode in getIds function)
function getStreaminginfo(watchmodeId, query, type) {
    fetch("https://watchmode.p.rapidapi.com/title/" + watchmodeId + "/sources/", {
            "method": "GET",
            "headers": {
                "regions": "US",
                "x-rapidapi-host": "watchmode.p.rapidapi.com",
                "x-rapidapi-key": "c07f23f016msh8cfc8ae8ebdfde7p1b8ec0jsna993d191f8f9"
            },
        })
        .then(response => response.json())
        .then((data) => {
            /*Checks to make sure the Watchmode API has any streaming options available for the chosen movie in its database*/
            /*For example, Watchmode has the movie Neo Ned in its database, has an ID for it, but has no streaming links for it available (no subscription, rental or buying options)*/
            if (data.length != 0) {
                titlebutton.removeAttribute("style", "display:none")
                titlebutton.textContent = query
                rendersubdata(data, query, type)
                renderrentdata(data, query, type)
                renderbuydata(data, query, type)
            } else { errormessage.textContent = "No Streaming Options Found! Please try searching for a different movie or TV show." }
        })
        .catch(err => {
            console.error(err);
        });
}
//Returns links to subscription streaming services where inputted movie or tv show can be watched (if found)
function rendersubdata(data, query, type) {
    var subscriptionoptions = data
        .filter(option => {
            if (option.region == "US" && option.type == "sub" && option.web_url != undefined) { return true; }
        })
    console.log(subscriptionoptions)
        /*Checks to make sure the Watchmode API has any SUBSCRIPTION streaming options available for the chosen movie in its database*/
        /*For example, Watchmode has the movie SpiceGirls in its database, has an ID for it, you can buy or rent movie, but no subscription streaming links available*/
    if (subscriptionoptions.length != 0) {
        if (subscriptionoptions.length < 10) {
            subscriptionoptions.forEach(value => {
                var list = document.createElement("ul");
                var link = document.createElement("li");
                hyperlink = document.createElement("a")
                hyperlink.href = `${value.web_url}`
                hyperlink.innerHTML = `${value.web_url}`
                link.appendChild(hyperlink)
                list.appendChild(link)
                suboptions.appendChild(list);
                subheading.textContent = `${query} is available on these subscription streaming services: `
            })
        }
        if (subscriptionoptions.length >= 11) {
            const newArray = subscriptionoptions.slice(0, 5)
            newArray.forEach(value => {
                var list = document.createElement("ul");
                var link = document.createElement("li");
                hyperlink = document.createElement("a")
                hyperlink.href = `${value.web_url}`
                hyperlink.innerHTML = `${value.web_url}`
                link.appendChild(hyperlink)
                list.appendChild(link)
                suboptions.appendChild(list);
                subheading.textContent = `${query} is available on these subscription streaming services: `
            });
        }
    } else {
        suberror.textContent = `${query} is unavailable on any subscription streaming services at this time.`
    }
}

//Returns links to websites where inputted movie or tv show can be rented & streamed (if found)
function renderrentdata(data, query, type) {
    var rentaloptions = data
        .filter(option => {
            if (option.region == "US" && option.type == "rent" && option.web_url != undefined) { return true; }
        })
    console.log(rentaloptions)
        //Checks to make sure the Watchmode API has any RENTAL streaming options available for the chosen movie in its database//
        //For example, Watchmode has the movie Bamboozled in its database, has an ID for it, you can buy or rent movie, but no subscription streaming links available//
    if (rentaloptions.length != 0) {
        if (rentaloptions.length < 10) {
            rentaloptions.forEach(value => {
                var list2 = document.createElement("ul");
                var link2 = document.createElement("li");
                hyperlink2 = document.createElement("a")
                hyperlink2.href = `${value.web_url}`
                hyperlink2.innerHTML = `${value.web_url}`
                link2.appendChild(hyperlink2)
                list2.appendChild(link2)
                rentoptions.appendChild(list2);
                rentheading.textContent = `${query} can be rented and streamed here: `
            })
        }
        if (rentaloptions.length >= 11) {
            const newArray = rentaloptions.slice(0, 5)
            newArray.forEach(value => {
                var list2 = document.createElement("ul");
                var link2 = document.createElement("li");
                hyperlink2 = document.createElement("a")
                hyperlink2.href = `${value.web_url}`
                hyperlink2.innerHTML = `${value.web_url}`
                link2.appendChild(hyperlink2)
                list2.appendChild(link2)
                rentoptions.appendChild(list2);
                rentheading.textContent = `${query} can be rented and streamed here: `
            });
        }
    } else {
        renterror.textContent = `${query} is unavailable on any rental streaming services at this time.`
    }
}

//Returns links to websites where inputted movie or tv show can be purchased & streamed (if found)
function renderbuydata(data, query, type) {
    var buyingoptions = data
        .filter(option => {
            if (option.region == "US" && option.type == "buy" && option.web_url != undefined) { return true; }
        })
    console.log(buyingoptions)
        //Checks to make sure the Watchmode API has any BUYING streaming options available for the chosen movie in its database//
        //For example, Watchmode has the movie Bamboozled in its database, has an ID for it, you can buy or rent movie, but no subscription streaming links available//
    if (buyingoptions.length != 0) {
        if (buyingoptions.length < 10) {
            buyingoptions.forEach(value => {
                var list3 = document.createElement("ul");
                var link3 = document.createElement("li");
                hyperlink3 = document.createElement("a")
                hyperlink3.href = `${value.web_url}`
                hyperlink3.innerHTML = `${value.web_url}`
                link3.appendChild(hyperlink3)
                list3.appendChild(link3)
                buyoptions.appendChild(list3);
                buyheading.textContent = `${query} can be purchased and streamed here: `
            })
        }
        if (buyingoptions.length >= 11) {
            const newArray = buyingoptions.slice(0, 5)
            newArray.forEach(value => {
                var list3 = document.createElement("ul");
                var link3 = document.createElement("li");
                hyperlink3 = document.createElement("a")
                hyperlink3.href = `${value.web_url}`
                hyperlink3.innerHTML = `${value.web_url}`
                link3.appendChild(hyperlink3)
                list3.appendChild(link3)
                buyoptions.appendChild(list3);
                buyheading.textContent = `${query} can be purchased and streamed here: `
            });
        }
    } else {
        buyerror.textContent = `${query} is unavailable to be purchased and streamed at this time.`
    }
}


//Takes imdbId and media type from getIds function and uses TMDB API to find one picture of selected movie or tv show
function getpicture(imdbId, type) {
    apikey2 = "a5c09845f2af6ed970ae332ca8d551ec"
    fetch(
            `https://api.themoviedb.org/3/find/${imdbId}?api_key=${apikey2}&language=en-US&external_source=imdb_id`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            printpic(data, type)
        })
        .catch(err => {
            console.error(err);
        });

}

//If found, appends the one pic from inputted movie or tv show to page
function printpic(data, type) {
    var pic = document.createElement("img");
    if (type === "movie") {
        let path = data.movie_results[0].poster_path;
        imagelink = "https://image.tmdb.org/t/p/w200" + path;
        pic.src = imagelink;
        imagebox.appendChild(pic)
        return imagelink;
    } else {
        let path = data.tv_results[0].poster_path;
        imagelink = "https://image.tmdb.org/t/p/w200" + path;
        pic.src = imagelink;
        imagebox.appendChild(pic)
        return imagelink;
    }
}

//Allows users to add a title they searched for to their Watchlist
const addtoMovies = async(event) => {
    let title = event.target.textContent;
    let image_link = imagelink;

    const response = await fetch('/api/mylist', {
        method: 'POST',
        body: JSON.stringify({ title, image_link }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/api/mylist')
    } else {
        alert(`response not ok ${response.statusText}`)
    }
};


//Grabs the query and media type submitted by the user and gives it to getIds function. 
searchbutton.addEventListener('click', function(event) {
    event.preventDefault();
    errormessage.textContent = "";
    let tvorMovie;
    let userinput = document.getElementById('userinput').value
    if (movie.checked) {
        tvorMovie = "movie";
    } else if (tvshow.checked) {
        tvorMovie = "tv";
    } else {
        errormessage.textContent = "Please remember to check either the TV or Movie Box!"
        document.getElementById('userinput').value = ""
        return;
    }
    getIds(userinput, tvorMovie)
})

//Allows users to add a query they searched for to their Watchlist, provided results were found for query
titlebutton.addEventListener("click", addtoMovies)

//Clears results and data from previous search
clearbutton.addEventListener('click', function() {
    document.getElementById('userinput').value = ""
    tvshow.checked = false;
    movie.checked = false;
    errormessage.innerHTML = "";
    resultsbox.innerHTML = "";
    console.clear()
    location.reload();


})