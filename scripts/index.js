
var markerTest;
function readQuote(){
  db.collection("readTests").doc("testId")
  .onSnapshot(function(snap){
      console.log(snap.data());   //print the document fields of "01"
      console.log(snap.data().fuckingTest);
      document.getElementById("readTest").innerText = snap.data().gPlaceId;
      markerTest = snap.data().gPlaceId;
  })
}

readQuote();


//map init
function initMap() {
  // my code
  $('#overlay').hide();
  // end of my code
  const map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    center: {
      lat: 49.2827,
      lng: -123.1207
    },
    zoom: 13,
  });

  //marker testing
  const myLatLng = {
    lat: -25.363,
    lng: 131.044
  };
  const myLat = {
    lat: +25.363,
    lng: -131.044
  };


  const input = document.getElementById("pac-input");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);
  // Specify just the place data fields that you need.
  autocomplete.setFields(["place_id", "geometry", "name"]);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");

  var testPlaceId = "ChIJ5f5T_SF3hlQRnRB6ZAeyWjU";
  // adding markers from firestore;

  // marker test

  var service = new google.maps.places.PlacesService(map);
  service.getDetails({
    placeId: testPlaceId,
  }, function (result, status) {
    var marker = new google.maps.Marker({
      map: map,
      place: {
        placeId: testPlaceId,
        location: result.geometry.location
      }
    });
  });



  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });

  new google.maps.Marker({
    position: myLat,
    map,
    title: "Another",
  });

  infowindow.setContent(infowindowContent);



  const marker = new google.maps.Marker({
    map: map
  });


  marker.addListener("click", () => {
    $("#overlay").show(1000);

    infowindow.open(map, marker);
  });
  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location,
    });
    marker.setVisible(true);
    $("#locationName").text(place.name);
    $("#googlePlaceID").text(place.place_id);
    infowindowContent.children.namedItem("place-name").textContent = place.name;
    infowindowContent.children.namedItem("place-id").textContent =
      place.place_id;
    infowindowContent.children.namedItem("place-address").textContent =
      place.formatted_address;
    infowindow.open(map, marker);




  });
}




//end of map stuff

