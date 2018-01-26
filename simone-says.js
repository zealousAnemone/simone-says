$(document).ready(function() {
  //Default mode is regular, not strict
  var strict = false;
  //All of the sounds
  var wrong = document.getElementById("wrong");
  var greenSound = document.getElementById("green-sound");
  var redSound = document.getElementById("red-sound");
  var yellowSound = document.getElementById("yellow-sound");
  var blueSound = document.getElementById("blue-sound");
  //To store user moves for each turn
  var userMoves = [];
  //To store entire sequence of moves to match
  var movesToMatch = [];

  //Toggles between strict and regular modes, color of button indicates which mode
  $("#strict").click(function() {
    if (!strict) {
      $(this).addClass("btn-danger");
      $(this).text("Strict");
      strict = true;
    }
    else {
      $(this).removeClass("btn-danger");
      $(this).addClass("btn-primary");
      $(this).text("Regular");
      strict = false;
    }
    
  });
  
  $("#start").click(function() {
    reset();
    compTurn();
  })
  
  $("#reset").click(function() {
    reset();
    $("#message").empty();
  })
  
  $(".color-btn").click(function() {
    //Processes color button presses
    var tempVal = parseInt($(this).val());
    userInput(tempVal);
  })
  
//Empties out both user moves & resets sequence of moves to match
function reset() {
  userMoves = [];
  movesToMatch = [];
}
  
function userInput(val) {
  //Pushes newest button press to sequence of current moves
  userMoves.push(val);
  var newIndex = userMoves.length-1;
  //Checks if current move is correct
  checkSame(userMoves[newIndex], movesToMatch[newIndex]);
  //light up appropriate button
  lightUp(val);
  if (userMoves.length == 20) {
    $("#message").html("<h3>You Won!</h3>");
    reset();
  }
  //When the user has entered enough moves and all the moves are correct, wait a moment, then start next round (compTurn) 
  else if (userMoves.length == movesToMatch.length) {
    setTimeout(function(){
      compTurn();
      }, 900);
 
    
  }
}

function compTurn() {
  //Each round, generate a random number & push to the moves array
  var randomNum = Math.floor(Math.random()* 4) + 1;
  movesToMatch.push(randomNum);
  //Display entire sequence to user
  playCurrent();
  //empty user moves since they are starting over from the beginning every time anyway
  userMoves = [];
}

function playCurrent() {
  //Displays # of moves currently
  $("#message").html("<h3>Counter: " + movesToMatch.length + "</h3>");
  var x = 0;
  var moves = setInterval(function() {
    if (x > movesToMatch.length) {
      //Stop lighting things up if you've reached the end of the moves array
      clearInterval(moves);
      }
    else {
      //light up each move, one by one
      lightUp(movesToMatch[x]);
      x++;
      }
  }, 600);
}
  
function lightUp(num) {
  //Translates button/move value to colored button, 1 is green and so on
  switch (num) {
    case 1:
      greenSound.play();
      //Switch to brighter color (makes it look "lit up"),
      $("#green").css("background-color", "#00FF00");
      setTimeout(function() {
        //then switch back
        $("#green").css({"background-color": "#00AA00"});
      }, 300);    
      break;
      
      case 2:
      redSound.play();
      $("#red").css("background-color", "#FF0000");
      setTimeout(function() {
        $("#red").css({"background-color": "#AA0000"});
      }, 300);  
      break; 
      
      case 3:
      yellowSound.play();
      $("#yellow").css("background-color", "#FFFF00");
      setTimeout(function() {
        $("#yellow").css({"background-color": "#AAAA00"});
      }, 300);  
      break;
      
    case 4:
      blueSound.play();
      $("#blue").css("background-color", "#0000FF");
      setTimeout(function() {
        $("#blue").css({"background-color": "#0000AA"});
      }, 300);  
      break;
  }
}

function checkSame(val1, val2) {
  //This runs for every button user presses, if it matches cooresponding value in moves array, do nothing, but....
    if (val1 != val2) {
        //play scary WRONG sound, empty out user moves
        wrong.play();
        userMoves = [];
        //If NOT in strict mode, give them another shot
        if (!strict) {
        $("#message").html("<h3>Wrong! Try Again!</h3>");
        setTimeout(function() {
          //Play most recent sequence again
          playCurrent();  
          }, 1000);
        }
        else {
          //If strict, that's it, too bad, so sad. You lose!
          $("#message").html("<h3>Too Bad - You lose!</h3>");
          reset();
        }
    }
}
})