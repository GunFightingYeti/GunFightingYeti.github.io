// <!-- api key = 2f15bd51838d45008f587029ef9089f5 -->

// .container
// header - New York Times Search

// #parameters (div) - Search Parameters (Search ico)
//     #term (input) - Search Term:
//     #records (input) - Number of Records to Retrieve: (Only three options: 1, 5, 10)
//     #startYear (input) - Start Year (Optional):    
// #endYear (input) - End Year (Optional:
// #search - Search (Mag glass ico)
// #clear - Clear Results (trash ico)

// #articles - Top Articles (calendar ico)
// <hr>
// footer - Made with lots and lots of (heart ico)

$("#search").on("click", function (event) {
    event.preventDefault();

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var searchTerm = $("#term").val();
    var recordsNum = $("#records").val();
    var startYear = $("#startYear").val();
    var endYear = $("#endYear").val();

    $.ajax({
            url: queryURL,
            method: "GET",
            data: {
                apikey: "2f15bd51838d45008f587029ef9089f5",
                q: searchTerm,
                begin_date: startYear,
                end_date: endYear,
            }
        })
        .then(function (response) {

            var results = response.response.docs;
            console.log(results);



            var title = $("<p>").text(results[0].headline.main);
            var date = $("<p>").text(results[0].pub_date);
            var author = $("<p>").text(results[0].byline.original);
            var url = $("<p>").text(results[0].web_url);

            if (recordsNum == 5) {
                for (var i = 0; i < 5; i++) {
                    $("#articles").append(title);
                    $("#articles").append(date);
                    $("#articles").append(author);
                    $("#articles").append(url);
                }
            } else if (recordsNum == 1) {
                $("#articles").append(title);
                $("#articles").append(date);
                $("#articles").append(author);
                $("#articles").append(url);
                console.log(title);
            } else {
                $("#articles").append(title);
                $("#articles").append(date);
                $("#articles").append(author);
                $("#articles").append(url);
            }
        });

    $("#clear").on("click", function () {
        $("#articles").empty();
    });

});
