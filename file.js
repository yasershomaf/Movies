var pagesTotal;
var curentPage;
function searchFunction(searchWord, pageIndex) {
    function creatMovieSection(movieObject) {
        var movieSection = document.createElement("section");
        var movieTitle = document.createElement("h3");
        var titleText = document.createTextNode(movieObject.Title);
        movieTitle.appendChild(titleText);
        movieSection.appendChild(movieTitle);
        var movieLink = document.createElement("a");
        movieLink.setAttribute("href", "http://www.imdb.com/title/" + movieObject.imdbID);
        movieLink.setAttribute("target", "_blank");
        movieSection.appendChild(movieLink);
        var moviePoster = document.createElement("img");
        moviePoster.setAttribute("alt", "Poster of " + movieObject.Title + " movie.");
        moviePoster.setAttribute("src", movieObject.Poster);
        movieLink.appendChild(moviePoster);
        var moviedetailes = document.createElement("h4");
        titleText = document.createTextNode("Type: " + movieObject.Type + ", Year: " + movieObject.Year + ".");
        moviedetailes.appendChild(titleText);
        movieSection.appendChild(moviedetailes);
        return movieSection;
    }
    function processRequest() {
        if (xhr.readyState === 4) {
            var searchResult = JSON.parse(xhr.response);
            if (searchResult.Response == "True") {
                document.getElementById("mainContainer").innerHTML="";
                for (var i=0; i<searchResult.Search.length; i++) {
                    document.getElementById("mainContainer").appendChild(creatMovieSection(searchResult.Search[i]));
                }
                pagesTotal = Math.ceil(searchResult.totalResults / 10);
                document.getElementById("footer").style.display = "flex";
                document.getElementById("totalText").innerHTML = pageIndex + " / " + pagesTotal;
                curentPage = pageIndex;
            }
            else
                waitH2.innerHTML = "No movies containing the word '" + searchWord + "' in their titles were found!";
        }
    }
    
    if (searchWord==="")
        alert("Please type the word to search for");
    else {
        document.getElementById("footer").style.display = "none";
        document.getElementById("mainContainer").innerHTML = "";
        var waitH2 = document.createElement("h2");
        var waitText = document.createTextNode("Searching... Please wait");
        waitH2.appendChild(waitText);
        document.getElementById("mainContainer").appendChild(waitH2);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://www.omdbapi.com/?s=" + searchWord + "&page=" + pageIndex, true);
        xhr.send();
        xhr.onreadystatechange = processRequest;
    }
}
function nextPage(index){
    curentPage = Math.max(Math.min(curentPage + index, pagesTotal), 1);
    searchFunction(document.getElementById("searchWord").value, curentPage);
}