function initialize() {
var ctaDisplay = 0;
var ctas = ["We all are Kydo.",
"Talk to me.",
"I am telling the truth.",
"Who is Kydo?",
"What is Kydo?",
"Meet me.",
"Provoke me.",
"Explain yourself to me.",
"Let me be your friend.",
"Let's talk about art.",
"Let's talk about you.",
"True or False?"]

var videos = ["Kydo-Transition-01.mp4",
"Kydo-Transition-02.mp4",
"Kydo-Transition-03.mp4",
"Kydo-Transition-04.mp4",
"Kydo-Transition-05.mp4",
"Kydo-Transition-06.mp4"]


function urlRemove(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}


  var streamSwitch = 0;
  var timer = [10000, 2000, 5000];
  var timerTotal = timer[0]+timer[1]+timer[2];

  var kydoId= 772181462066012200;
  
  $('#first, #second, #third').hide();




  var startScreens = function () {
    // Start
    console.log("start")
    $('#first, #second, #third').hide();
    $('#first').fadeIn();
  };
  
  startScreens();

function showVideo() {  
      

      if (ctaDisplay == 0) {
        console.log("video is on");
        $('#first, #second, #third').hide();

        $('#second').html('<video playsinline autoplay muted loop poster="" id="bgvid"><source src="video/'+videos[Math.floor(Math.random()*videos.length)]+'" type="video/mp4">')
        $('#second').fadeIn();

        function removeVideo() {
          console.log("video is off");

          $('#first, #second, #third').fadeOut();
          $('#first').fadeIn();

        }

        setTimeout(removeVideo, 1500);
      }

      else {
        console.log("video is bypassed")
      }

      
}


(function loop() {
    var rand = Math.floor(Math.random() * 50000) + 40000;
    setTimeout(function() {
            console.log()
            showVideo();
            loop();  
    }, rand);
}());

function showCTA() {  
      console.log("CTA is on");
      ctaDisplay = 1;
      $('#first, #second, #third').hide();

      $("#cta").text(ctas[Math.floor(Math.random()*ctas.length)])
      $('#third').fadeIn();

      
      function removeCTA() {
        console.log("CTA is off");

        $('#first, #second, #third').fadeOut();
        $('#first').fadeIn();

        ctaDisplay = 0;

      }

      setTimeout(removeCTA, 10000);

      
}

(function loop2() {
    var rand = 150000;
    setTimeout(function() {
            showCTA();
            loop2();  
    }, rand);
}());


  if(io !== undefined) {
    // Storage for WebSocket connections
    var socket = io.connect('/');

    var slot = 1;

    // This listens on the "twitter-steam" channel and data is 
    // received everytime a new tweet is receieved.
    socket.on('twitter-stream', function (data) {
      // console.log(data.text)
      // console.log(data)

      // if(data.in_reply_to_status_id_str) {
      //   console.log(data.in_reply_to_status_id_str)
      // }
      
      var tweet = urlRemove(data.text);
      var tDate = new Date(data.created_at);
      // console.log(tweet);

      function toTimeZone(time, zone) {
        var format = 'DD/MM/YYYY HH:mm:ss';
        return moment(time, format).tz(zone).format(format);
      }

      
      

      

      // console.log(toTimeZone(data.created_at, "America/Los_Angeles"))
      // console.log(moment().tz("America/Los_Angeles").format());


      if(data.user.id == kydoId) {
        // clean
        $("#quote2, #tweeter2").hide();
        $("#quote2, #tweeter2").html("")
        // load
        $("#quote2").html("<span class='border-center'></span><span>"+tweet+"</span")
        $("#tweeter2").html("<div class='profileImg'><img src='"+data.user.profile_image_url+"' width=48></div><span>"+data.user.screen_name+" &mdash; "+tDate.format("dd.mm.yy HH:MM:ss")+"</span")
        // fade
        $("#quote2, #tweeter2").fadeIn();

        

        if(data.in_reply_to_status_id_str === null){
          $("#quote").html("")
          $("#tweeter").html("")
        }

        // slot=0;

      }

      else {
        //clean
        $("#quote, tweeter").hide();
        $("#quote, tweeter").html("")
        //load
        $("#quote").html("<span class='border-center'></span><span>"+tweet+"</span")
        $("#tweeter").html("<div class='profileImg'><img src='"+data.user.profile_image_url+"' width=48></div><span>"+data.user.screen_name+" &mdash; "+tDate.format("dd.mm.yy HH:MM:ss")+"</span")
        //fade
        $("#quote, tweeter").fadeIn();

        //clean 2nd slot 
        $("#quote2").html("")
        $("#tweeter2").html("")
        
        // slot=1;

      }

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

