function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
  
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('panel'));
  
    var dTime = new Date();
    dTime.setDate(dTime.getDate() + ((7 - dTime.getDay()) % 7 + 1) % 7 + 1);
    dTime.setHours(14);
    // dTime.setHours(8);
    dTime.setMinutes(0);
    dTime.setSeconds(0);
    console.log("Departure Time:", dTime)
  
    var request = {
      origin: 'Playa Vista, CA',
      destination: 'Manhattan Beach, CA',
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
      drivingOptions: {
        departureTime: dTime,
        trafficModel: google.maps.TrafficModel.PESSIMISTIC
      },
    };
  
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        document.getElementById('duration').innerHTML = "Duration of first leg is " +
          response.routes[0].legs[0].duration.text;
        if (response.routes[0].legs[0].duration_in_traffic)
          document.getElementById('duration').innerHTML += "<br>Duration of first leg in traffic is " + response.routes[0].legs[0].duration_in_traffic.text + " (departing at " + dTime + ")";
  
        directionsDisplay.setDirections(response);
      }
    });
  }
  google.maps.event.addDomListener(window, "load", initMap);
  