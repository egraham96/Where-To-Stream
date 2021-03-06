
//const clearbutton = document.getElementById("clearbutton");
const cbutton=document.querySelector(".button-c")
const movie = document.getElementById("moviecheck")
const tvshow = document.getElementById("tvcheck")
const errormessage = document.getElementById("errormessage");
const searchbutton = document.getElementById("searchbutton");
const resultsbox = document.getElementById("resultsbox");
const mediatitle=document.getElementById("mediatitle")
const imagebox = document.getElementById("imagebox")
const rating= document.getElementById("rating")
const addbutton=document.getElementById("addbutton")
const suboptions = document.getElementById("suboptions");
const subheading = document.getElementById("subheading");
const suberror = document.getElementById("suberror");
const rentoptions = document.getElementById("rentoptions");
const rentheading = document.getElementById("rentheading");
const renterror = document.getElementById("renterror");
const buyoptions = document.getElementById("buyoptions");
const buyheading = document.getElementById("buyheading");
const buyerror = document.getElementById("buyerror");
let tvorMovie=""
let query=""
let imagelink = ""
let ratingnum= ""
let watchmodeId=""
let imdbId=""




//Takes query and media type submitted by user and returns Watchmode API id & IMDB id for query (if found)
function getIDs(query, type) {
    console.log("inside getIDS function on search.js")

    fetch(
            `https://watchmode.p.rapidapi.com/search/?search_field=name&search_value=${query}&types=${type}`, {
                method: "GET",
                headers: {
                    "x-rapidapi-key": "c07f23f016msh8cfc8ae8ebdfde7p1b8ec0jsna993d191f8f9",
                    "x-rapidapi-host": "watchmode.p.rapidapi.com",
                },
            }
        )
        .then(response => response.json())
        .then((data) => {
            if (data.title_results.length != 0) {
                watchmodeId = data.title_results[0].id;
                imdbId = data.title_results[0].imdb_id;
                getStreaming(watchmodeId, query, type)
                getPicandRating(query, imdbId, type)
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
function getStreaming(watchmodeId, query, type) {
    console.log("inside getStreaming function on search.js")
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
            //Checks to make sure the Watchmode API has any streaming options available for the chosen movie in its database
            //For example, Watchmode has the movie Neo Ned in its database, has an ID for it, but has no streaming links for it available (no subscription, rental or buying options)
            if (data.length != 0) {
                addbutton.removeAttribute("style", "display:none")
                renderSubData(data, query, type)
                renderRentData(data, query, type)
                renderBuyData(data, query, type)
            } else { errormessage.textContent = "No Streaming Options Found! Please try searching for a different movie or TV show." }
        })
        .catch(err => {
            console.error(err);
        }); 
}



//Returns links to subscription streaming services where inputted movie or tv show can be watched (if found)
function renderSubData(data, query, type) {
    console.log("inside renderSubData function on search.js")
    var subscriptionoptions = data
        .filter(option => {
            if (option.region == "US" && option.type == "sub" && option.web_url != undefined) { return true; }
        })
    console.log(subscriptionoptions)
        //Checks to make sure the Watchmode API has any SUBSCRIPTION streaming options available for the chosen movie in its database//
        //For example, Watchmode has the movie SpiceGirls in its database, has an ID for it, you can buy or rent movie, but no subscription streaming links available//
    if (subscriptionoptions.length != 0) {
        if (subscriptionoptions.length < 10) {
            subscriptionoptions.forEach(value => {
                var list = document.createElement("ul");
                var link = document.createElement("li");
                hyperlink = document.createElement("a")
                hyperlink.href = `${value.web_url}`
                hyperlink.textContent = `${value.name}`
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
                hyperlink.textContent = `${value.name}`
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
function renderRentData(data, query, type) {
    console.log("inside renderRentData function on search.js")
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
                hyperlink2.textContent = `${value.name}`
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
                hyperlink2.textContent = `${value.name}`
                list2.appendChild(link2)
                link2.appendChild(hyperlink2)
                rentoptions.appendChild(list2);
                rentheading.textContent = `${query} can be rented and streamed here: `
            });
        }
    } else {
        renterror.textContent = `${query} is unavailable on any rental streaming services at this time.`
    }
}

//Returns links to websites where inputted movie or tv show can be purchased & streamed (if found)
function renderBuyData(data, query, type) {
    console.log("inside renderBuyData function on search.js")
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
                hyperlink3.textContent = `${value.name}`
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
                hyperlink3.textContent = `${value.name}`
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
function getPicandRating(query, imdbId, type) {
    console.log("inside getPicandRating function on search.js")
    apikey2 = "a5c09845f2af6ed970ae332ca8d551ec"
    fetch(
            `https://api.themoviedb.org/3/find/${imdbId}?api_key=${apikey2}&language=en-US&external_source=imdb_id`)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            printPicandRating(query, data, type)
        })
        .catch(err => {
            console.error(err);
        });
        return query, imdbId;
}

//If found, appends the one pic from inputted movie or tv show to page,  as well as its average rating
function printPicandRating(query, data, type) {
    console.log("inside printPicandRating function on search.js")
    tvshow.checked = false;
    movie.checked = false;
    var pic = document.createElement("img");
    if (type === "movie") {
        let path = data.movie_results[0].poster_path;
        imagelink = "https://image.tmdb.org/t/p/w200" + path;
        pic.src = imagelink;
        pic.setAttribute("class", "searchimage")
        mediatitle.textContent=query
        imagebox.appendChild(pic)
        ratingnum= data.movie_results[0].vote_average
        rating.textContent=`Average User Rating: ${data.movie_results[0].vote_average}/10`
        document.getElementById('userinput').value = ""
        return imagelink, ratingnum, query
    } else {
        let path = data.tv_results[0].poster_path;
        imagelink = "https://image.tmdb.org/t/p/w200" + path;
        pic.src = imagelink;
        pic.setAttribute("class", "searchimage");
        mediatitle.textContent=query
        imagebox.appendChild(pic)
        ratingnum=data.tv_results[0].vote_average
        rating.textContent=`Average User Rating: ${data.tv_results[0].vote_average}/10`
        document.getElementById('userinput').value = ""
        return imagelink, ratingnum, query
    }
}


//Allows users to add a title they searched for to their Watchlist
const addtoWatchlist = async(event) => {
    console.log("inside addtoWatchlist function on search.js")
    event.preventDefault()
    let title = mediatitle.textContent
    let type= tvorMovie
    let image_link = imagelink;
    let rating= ratingnum;
    let watchmode_id=watchmodeId
    let imdb_id=imdbId

    const response = await fetch('/api/mylist', {
        method: 'POST',
        body: JSON.stringify({ title, type, image_link, rating, watchmode_id, imdb_id }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.status=200) {
        console.log("success")
        document.location.replace('api/mylist')
    } else {
        alert(`response not ok ${response.statusText}`)
    }
};

//Allows users to add a query they searched for to their Watchlist, provided results were found for query
addbutton.addEventListener("click", addtoWatchlist)



//Grabs the query and media type submitted by the user via search button and gives it to getIds function. 
searchbutton.addEventListener('click', streamSearch) 


function streamSearch(event){
    console.log("inside streamSearch function on search.js")
    event.preventDefault();
    errormessage.textContent = "";
    const userinput = document.getElementById('userinput').value
    if (movie.checked && (!(userinput.value==""))) {
        tvorMovie = "movie";
    } else if (tvshow.checked && (!(userinput.value==""))) {
        tvorMovie = "tv";
    } else {
        alert("Please enter the name of a TV show or movie and use the checkboxes!")
        document.getElementById('userinput').value = ""
        return;
    }
    getIDs(userinput, tvorMovie)
}

//Clears results and data from previous search
cbutton.addEventListener('click', clearData)


function clearData() {
    console.log("inside clearData function in search.js")
    document.getElementById('userinput').value = ""
    tvshow.checked = false;
    movie.checked = false;
    errormessage.innerHTML = "";
    //resultsbox.innerHTML = "";
    console.clear()
    location.reload();

}