var ButtonColors=["red","blue","yellow","green"];
var GamePattern=[];
var UserClickPattern=[];


 
var Started=false;

//Creating the variable Level
var Level=0;

$(document).keypress(function(){
    if(!Started) {

        $("#level-title").text("Level" + Level);
        nextSequence();
        Started=true;



    }
});





$(".btn").click(function(){
    var UserChosenColor=$(this).attr("id");
    
    UserClickPattern.push(UserChosenColor);
    //.In the same way we played sound in nextSequence() , when the user clicks on a button, the corresponding sound should be played.
    PlaySound(UserChosenColor);
    Animate(UserChosenColor);
    CheckAnswer(UserClickPattern.length-1);



});


function CheckAnswer(CurrentLevel)  //CHECKS THE ANSWER OF THE USER.
{   
    if (GamePattern[CurrentLevel]===UserClickPattern[CurrentLevel])
    {
        console.log("Success!");
    

         if(GamePattern.length===UserClickPattern.length){   ///If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.

            setTimeout(function () {    //Setting 1000 millisecond delay
              nextSequence();
            }, 1000);
            }

    } else {  ///IF USER IS WRONG!
        console.log("Wrong");
        PlaySound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");

        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        StartOver();

    }
    
    


}


// THE NEXT SEQUENCE IS GENERATED.

function nextSequence(){
    UserClickPattern=[];
 var RandomNumber=(Math.floor(Math.random()*4));
    var RandomChosenColor=ButtonColors[RandomNumber];
    GamePattern.push(RandomChosenColor);

    //Increase the level 
    Level++;
    //Show the increase in level
 $("#level-title").text("Level " + Level);

$("#" + RandomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

// Adding sound to the random chosen color button
PlaySound(RandomChosenColor);

}


function PlaySound(name) {
  
    var audio= new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function Animate(CurrentColor)
{
    $("#"+ CurrentColor).addClass("pressed");

    //to remove the pressed class after a 100 milliseconds.

  
    setTimeout(function(){
        $("#" + CurrentColor).removeClass("pressed");

    },100);

}

//In case the user gets the sequence wrong and he chooses to start over.

function StartOver(){
    Level=0;
    GamePattern=[];
    Started=false;
}



