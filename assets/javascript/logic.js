$(document).ready(function () {

    // Year Array

    var topics = ["1920's", "1930's", "1940's", "1950's", "1960's", "1970's", "1980's", "1990's", "2000's"];

    // Call API

    function displayInfo() {
        var year = $(this).attr("year-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + year + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            $("#years").empty();

            var results = response.data;

            // Gif Attributes

            for (var i = 0; i < results.length; i++) {
                var yearDiv = $("<div class='year-info'>");

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;

                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

                yearDiv.append(gif);
                yearDiv.append(pRate);

                $("#years").append(yearDiv);
            }

            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }

    // Add Years

    function newButtons() {

        $("#yearButtons").empty();


        for (var i = 0; i < topics.length; i++) {

            var yearnew = $("<button>");



            yearnew.addClass("year");
            yearnew.attr("year-name", topics[i]);
            yearnew.text(topics[i]);
            $("#yearButtons").append(yearnew);
        }
    }

    $("#addyear").on("click", function (event) {
        event.preventDefault();
        var year = $("#year-input").val().trim();


        topics.push(year);
        $("#year-input").val(" ");
        newButtons();
    });

    $(document).on("click", ".year", displayInfo);

    newButtons();

});
