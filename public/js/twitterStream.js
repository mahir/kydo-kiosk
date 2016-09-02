function initialize() {

  var ctas = ["We all are Kydo",
"Talk to me",
"I am telling the truth",
"Who is Kydo",
"What is Kydo",
"Meet me",
"Provoke me",
"Explain yourself to me",
"Let me be your friend",
"Let's talk about art",
"Let's talk about you",
"I can dream"]




  var streamSwitch = 0;
  var timer = [10000, 3000, 5000];
  var timerTotal = timer[0]+timer[1]+timer[2];
  var lights=$('#first, #second, #third');
  $('#first, #second, #third').hide();




  var doStuff = function () {

    // Start
    console.log("start")
    $('#first, #second, #third').hide();
    $("#quote, #quote2").fadeIn()
    $('#first').fadeIn();

    // Transition
    setTimeout(function () {  
      console.log("second");
      $('#first, #second, #third').hide();
      $("#quote, #quote2").hide()
      $('#second').fadeIn();
      }, timer[0]);

    // CTA
    setTimeout(function () {  
      console.log("last")
      $('#first, #second, #third').hide();
      $("#quote, #quote2").hide()
      $("#cta").text(ctas[Math.floor(Math.random()*ctas.length)])
      $('#third').fadeIn();
      ;}, timer[0]+timer[1]);
  

    // jQuery.each(lights, function(i) { 
    //     var el=$(this);
    //     setTimeout(function() { 
    //       console.log(i,timer[i])
    //         $('#first, #second, #third').hide();
    //         $("#quote").hide()

    //         // turn on if it's the tweet page
    //         if(i==0) {$("#quote").show()};
    //         el.fadeIn()
    //     }, timer[i]); 
    // });

    setTimeout(doStuff, timerTotal);
};
doStuff();

// console.log(timerTotal)


  // removeListener = function('twitter-stream', data)
  // removeAllListeners = function('twitter-stream')


  if(io !== undefined) {
    // Storage for WebSocket connections
    var socket = io.connect('/');

    var slot = 0;

    // This listens on the "twitter-steam" channel and data is 
    // received everytime a new tweet is receieved.
    socket.on('twitter-stream', function (data) {
      console.log(data.text)
      console.log(data)
      // to do: cut the img + http links


      if(slot == 1) {
        $("#quote2").html("")
        $("#quote2").html("<span class='border-center'></span><span>"+data.text+"</span")
        // $("#quote2").fadeIn();

        slot=0;

      }

      else {

        $("#quote").html("")
        $("#quote").html("<span class='border-center'></span><span>"+data.text+"</span")
        // $("#quote").fadeIn();
        
        slot=1;

      }

      // $("#quote").textillate({ in: { effect: 'flipInY' }});

      // $("#quote").append( "<div class="+data.id+">"+data.text+"</div>" )

      // $("."+data.id)
      // .fitText(0.5)
      // .textillate({ in: { effect: 'flipInY' }});

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

