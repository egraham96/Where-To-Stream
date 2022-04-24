let deletebuttons=document.querySelectorAll(".deletebutton")
let infobuttons=document.querySelectorAll(".infobutton")
let delete_reviewbtns=document.querySelectorAll(".deletereview")
let edit_reviewbtns=document.querySelectorAll(".editreview")
let submit_editbtns=document.querySelectorAll(".editsubmit")
let add_reviewbtns=document.querySelectorAll(".addreviewsubmit")
let subServiceList=[]

//Takes query and media type submitted by user and returns Watchmode API id & IMDB id for query (if found)
function getIdNums(id, query, type, watchmodeId) {
    fetch(
            `https://watchmode.p.rapidapi.com/search/?search_field=name&search_value=${query}&types=${type}`, {
                method: "GET",
                headers: {
                    "x-rapidapi-key": `${process.ENV.RAPIDAPI_KEY1}`,//"be9a60e677msh27b9eb97af299e8p1c5a0djsnb9ba03ed5bd6",
                    "x-rapidapi-host": "watchmode.p.rapidapi.com",
                },
            }
        )
        .then(response => response.json())
        .then((data) => {
            if (data.title_results.length != 0) {
                getStreamingData(id, watchmodeId)
                  
            } else throw Error('No movie found by that name');
        })
        .catch((err) => {
            console.error(err);
        });
  }
  
  //Returns all streaming data from Watchmode API for inputted movie or tv show (if found on Watchmode in getIdNums function)
  function getStreamingData(id, watchmodeId) {
      console.log("getStreamingData", id)
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
            if (data.length != 0) {
                console.log("Streaming Data")
                console.log(data)
                getSubData(id, data)
                getRentData(id, data)
                getBuyData(id, data)
            } else {console.log("error in getStreamingData function") }
        })
        .catch(err => {
            console.error(err);
        }); 
  }
  
  
  //Returns links to subscription streaming services where inputted movie or tv show can be watched (if found)
  function getSubData(id, data) {
    console.log("getSubData", id)
      var subscriptionoptions = data
          .filter(option => {
              if (option.region == "US" && option.type == "sub" && option.web_url != undefined) { return true; }
          })
          console.log("Subscription Options Array:")
          console.log(subscriptionoptions)
      if (subscriptionoptions.length != 0) {
          if (subscriptionoptions.length < 10) {
              subscriptionoptions.forEach(value => {
                  const obj={
                      media_id: id,
                      type: "subscription",
                      link: value.web_url
                  }
                  subServiceList.push(obj)
              })
          }
          if (subscriptionoptions.length >= 11) {
              const newArray = subscriptionoptions.slice(0, 5)
              newArray.forEach(value => {
                  const obj={
                      media_id: id,
                      type: "subscription",
                      link: value.web_url
                  }
                  subServiceList.push(obj)
                  
              });
          }
      } else {
          console.log("error in getSubData function")
      }
  }
  
  //Returns links to websites where inputted movie or tv show can be rented & streamed (if found)
  function getRentData(id, data) {
      console.log("getRentData", id)
      var rentaloptions = data
          .filter(option => {
              if (option.region == "US" && option.type == "rent" && option.web_url != undefined) { return true; }
          })
    console.log("Rental Options Array:")
    console.log(rentaloptions)
    if (rentaloptions.length != 0) {
        if (rentaloptions.length < 10) {
            rentaloptions.forEach(value => {
                const obj={
                    media_id: id,
                    type: "rental",
                    link: value.web_url
                }
                subServiceList.push(obj)
            })
        }
        if (rentaloptions.length >= 11) {
            const newArray = rentaloptions.slice(0, 5)
            newArray.forEach(value => {
                const obj={
                    media_id: id,
                    type: "rental",
                    link: value.web_url
                }
                subServiceList.push(obj)
                
            });
        }
    } else {
        console.log("error in getRentData function")
    }
}

  
  //Returns links to websites where inputted movie or tv show can be purchased & streamed (if found)
  function getBuyData(id, data) {
    console.log("getBuyData", id)
      var buyingoptions = data
          .filter(option => {
              if (option.region == "US" && option.type == "buy" && option.web_url != undefined) { return true; }
          })
          console.log("Purchase Options Array:")
          console.log(buyingoptions)
      if (buyingoptions.length != 0) {
          if (buyingoptions.length < 10) {
              buyingoptions.forEach(value => {
                  const obj={
                      media_id: id,
                      type: "purchase",
                      link: value.web_url
                  }
                  subServiceList.push(obj)
                  createStreamingList(id, subServiceList)
              })
          }
          if (buyingoptions.length >= 11) {
              const newArray = buyingoptions.slice(0, 5)
              newArray.forEach(value => {
                  const obj={
                      media_id: id,
                      type: "purchase",
                      link: value.web_url
                  }
                  subServiceList.push(obj)
                  createStreamingList(id, subServiceList)
              });
          }
      } else {
        console.log("error in getBuyData function")
      }
  }
  


//Allows users to delete a tv show or movie from their Watchlist
const deletefromWatchlist= async (deleteId) => {
    console.log("inside deletefromWatchlist function");

    const response = await fetch(`/api/mylist/${deleteId}`, {
        method: 'DELETE',
    });

    if (response.status=200) {
        console.log("success")
        document.location.replace('/')
    } else {
        alert(`response not ok ${response.statusText}`)
    }
};

const getMediaData= async (detailId) => {
    console.log("inside getMediaData function")

    await fetch(`/api/mylist/${detailId}`, {
        method: 'GET'
    })
    .then(response => response.json())
        .then((data) => {
            const id=data.id
            const query=data.title
            const type=data.type
            const watchmodeId=data.watchmode_id
            getIdNums(id, query, type, watchmodeId)
        })
        .catch((err) => {
            console.error(err);
        });
}

//Allows users to create a StreamingList model for any tv show or movie on their watchlist
const createStreamingList= async (id, subServiceList) => {
    console.log("inside createStreamingList function");
    console.log(subServiceList)
    const response = await fetch(`/api/stream/${id}`, {
    method: 'POST',
    body: JSON.stringify({subServiceList}),
    headers: { 'Content-Type': 'application/json' }
});
if (response.status=200) {
    console.log("success")
    document.location.assign(`stream/${id}`)
} else {
    alert(`response not ok ${response.statusText}`)
}
}

const add_reviewHandler = async (event, id) => { 
    event.preventDefault();
    console.log( "inside add_reviewHandler function")

    // Collect values 
    const addreview = document.querySelector(`[type='text'][data-id="${id}"][class='addreviewinput']`).value.trim();

    if (addreview) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/mylist/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ addreview}),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.status=200) {
        // If successful, redirect the browser to the profile page
        document.location.replace(`/api/mylist`);
      } else {
        alert(response.statusText);
    }
  }
};

const edit_reviewHandler = async (event, id) => { 
    event.preventDefault();
    console.log( "inside edit_reviewHandler function")

    // Collect values 
    const editreview = document.querySelector(`[type='text'][data-id="${id}"][class='editinput']`).value.trim();
    if (editreview) {
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/mylist/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ editreview}),
          headers: { 'Content-Type': 'application/json' },
        })
    
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace(`/api/mylist`);
      } else {
        alert(response.statusText);
    }
  }
};


const delete_reviewHandler = async (event, id) => { 
    event.preventDefault();
    console.log( "inside delete_reviewHandler function")

      // Send a POST request to the API endpoint
      const response = await fetch(`/api/mylist/${id}`, {
        method: 'PUT',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace(`/api/mylist`);
      } else {
        alert(response.statusText);
    }
  }



//Adds an event listener to each movie or tv show's "Delete {{media.type}} from Watchlist" button on a user's watchlist (gathered from db)
for (i of deletebuttons){
i.addEventListener('click', function(event) {
     const deleteId=event.target.getAttribute("data-id")
      deletefromWatchlist(deleteId);
    });
}
  

//Adds an event listener to each movie or tv show's "Get Streaming Options" button on a user's watchlist (gathered from db)
for (i of infobuttons) {
    i.addEventListener('click', function(event) {
     const detailId=event.target.getAttribute("data-id")
     getMediaData(detailId)
    });
  }

//Adds an event listener to each movie or tv show's "Delete Review" button on a user's watchlist
for (i of delete_reviewbtns) {
    i.addEventListener('click', function(event) {
     const delete_reviewId=event.target.getAttribute("data-id")
     delete_reviewHandler(event, delete_reviewId)
    });
  }

//Adds an event listener to each movie or tv show's "Edit Review" button on a user's watchlist
  for (i of edit_reviewbtns) {
    i.addEventListener('click', function(event) {
     const edit_reviewId=event.target.getAttribute("data-id")
     const form =document.querySelector(`[data-id="${edit_reviewId}"][class='editform']`)
     form.removeAttribute("style", "display:none");
    });
  }

//Adds an event listener to each movie or tv show's "Submit Review" button on a user's watchlist
  for (i of submit_editbtns) {
    i.addEventListener('click', function(event) {
     const submit_editId=event.target.getAttribute("data-id")
     edit_reviewHandler(event, submit_editId)
    });
  }

//Adds an event listener to each movie or tv show's "Add Review" button on a user's watchlist
  for (i of add_reviewbtns) {
    i.addEventListener('click', function(event) {
     const add_reviewId=event.target.getAttribute("data-id")
     add_reviewHandler(event, add_reviewId)
    });
}





