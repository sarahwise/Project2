$(document).ready(function () {

  //Variables established for corresponding search fields
  var inputCountry = "";
  var searchSel = "";


  //function corresponding with that search 

  $("button#Canada").on("click", function (event) {
    event.preventDefault();
    seachSel = "Canada";
    countrySel = "Canada";
    console.log("Canada selected");

  })

  $("button#UnitedStates").on("click", function (event) {
    event.preventDefault();
    searchSel = "United States";
    countrySel = "United States";
    console.log("United States selected");

  })

  $("#submitBtn").on("click", function (event) {
    event.preventDefault();
    $(".universities").empty();
    $("#university-info").empty();
    console.log("Submit button clicked");
    searchVal();

  })

  function searchVal() {
    if (searchSel == "United States" || searchSel == "Canada") {
      searchFunc(searchSel);
    }
    return;
  }


  const endpoints = {
    search: "",
    country: "country",
  };

  //lookup how to filter search
  function searchFunc(searchSel) {
    $.ajax({
      url: "http://universities.hipolabs.com/search?" + countrySel,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      $("<h3>").text("Interested in learning more about " + searchSel + "?").appendTo("#university-info");
      
      for (var i = 0; i < response.length; i++) {
        if(searchSel==response[i].country){
        //var counter
          console.log(response[i]); 
        
          var card = $("<div>").addClass("card col-lg-6 col-sm-4 col-xs-6");
          var cardBody = $("<div>").addClass("card-body d-flex flex-column justify-content-start align-items-stretch");
          // var thumbnail = $("<img>").addClass("card-img-top").attr("src", response.items[i].volumeInfo.imageLinks.thumbnail);
          var name = $("<h5>").addClass("card-title").text(response[i].name);
          var state = $("<h6>").addClass("card-title").text(response[i]["alpha_two_code"]);
          var country = $("<h7>").addClass("card-title").text(response[i].country);

          var preview = $("<h8>").addClass("card-text").text("Website");
          $(preview).attr({"href": response[i]["web_pages"][0], "target": "_blank"});
  
          $(cardBody).append(name, state, country, preview);
          $(card).append(cardBody);
          $("#university-info").append(card);
        }
      }

    })

  }

});