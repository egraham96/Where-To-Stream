let buttons=document.querySelectorAll(".deletebutton")

//Allows users to delete a title from their Watchlist
const deletefromWatchlist= async (i) => {
    console.log("hi");
    const id= i.getAttribute('data-id')



    const response = await fetch(`/api/mylist/${id}`, {
        method: 'DELETE',
    });

    if (response.status=200) {
        console.log("success")
        document.location.replace('/')
    } else {
        alert(`response not ok ${response.statusText}`)
    }
};

//Delete button from watchlist.handlebars
for (i of buttons) {
    i.addEventListener('click', function() {
      deletefromWatchlist(i);
    });
  }



