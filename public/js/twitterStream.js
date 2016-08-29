function initialize() {

  if(io !== undefined) {
    // Storage for WebSocket connections
    var socket = io.connect('/');

    // This listens on the "twitter-steam" channel and data is 
    // received everytime a new tweet is receieved.
    socket.on('twitter-stream', function (data) {
      console.log(data.text)
      console.log(data)

      $("#quote").append()

      $( "#quote" ).append( "<div class="+data.id+">"+data.text+"</div>" )

      $("."+data.id)
      // .fitText(0.5)
      .textillate({ in: { effect: 'flipInY' }});

      // //Add tweet to the heat map array.
      // var tweetLocation = new google.maps.LatLng(data.lng,data.lat);
      // liveTweets.push(tweetLocation);

      // //Flash a dot onto the map quickly
      // var image = "css/small-dot-icon.png";
      // var marker = new google.maps.Marker({
      //   position: tweetLocation,
      //   map: map,
      //   icon: image
      // });
      // setTimeout(function(){
      //   marker.setMap(null);
      // },600);

    });

    // Listens for a success response from the server to 
    // say the connection was successful.
    socket.on("connected", function(r) {

      //Now that we are connected to the server let's tell 
      //the server we are ready to start receiving tweets.
      socket.emit("start tweets");
    });
  }
}