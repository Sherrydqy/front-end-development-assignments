window.onload = function(){
  var flag = 0;
  var alternativeFlag = 1;
  var generatedNumber = new Array();
  var guessNumber = Math.floor(Math.random()*100)+1;
  var number = {
    value: guessNumber,
    guessTimes: 0
  }
  var currentIndex = 0;
  var existIndex = -1;
  generatedNumber.push(number);
  currentIndex = generatedNumber.length-1;
  var svg = document.getElementById("number-fg");
  var answer = document.getElementById("p_answer");
  var svgPaths =document.querySelectorAll("path");
  var h1 = document.getElementsByTagName("h1");
  var feedbackField =document.getElementById("p_feedback1");
  var inputField = document.getElementById("userInput");
  var checkBtn = document.getElementById("submitBtn");
  var mockField = document.getElementById("p_mock");
  var hintField = document.getElementById("p_hint");
  console.log("ANSWER:"+guessNumber);
  var redIncreasement = -77/99;
  var blueIncreasement = 198/99;
  var greenIncreasement = -204/99;
  console.log(redIncreasement+","+greenIncreasement+","+blueIncreasement);
  var reg = /^\d+$/;

  checkBtn.onclick = function(){
    if(checkBtn.value == "CHECK"){
      feedbackField.style.color = "white";
      feedbackField.textContent = "";
      if(alternativeFlag == 1){
          feedbackField = document.getElementById("p_feedback1");
      }else{
          feedbackField = document.getElementById("p_feedback2");
      }
      alternativeFlag = alternativeFlag*(-1);
      console.log(generatedNumber);
      if(inputField.value){
        var userInput = inputField.value;
        if(reg.test(userInput)){
          var inputNumber = parseInt(userInput);
          if(inputNumber > 0 && inputNumber < 101){
            generatedNumber[currentIndex].guessTimes++;
            var proximity = Math.abs(inputNumber-guessNumber);
            svgPaths.forEach(function(e){
              var red = 151+redIncreasement*proximity;
              var green = 204+greenIncreasement*proximity;
              var blue = 4+blueIncreasement*proximity;
              e.style.fill= "rgb("+red+","+green+","+blue+")";
              console.log(red+","+green+","+blue);
            })

            var distance = inputNumber-guessNumber;

            if(generatedNumber[currentIndex].guessTimes < 5 && generatedNumber[currentIndex].guessTimes > -1){
              mockField.textContent = "";
            } else if(generatedNumber[currentIndex].guessTimes < 10 && generatedNumber[currentIndex].guessTimes > 4){
              mockField.textContent = "Keep going! I know you can do it!";
            } else if(generatedNumber[currentIndex].guessTimes < 20 && generatedNumber[currentIndex].guessTimes >=10){
              mockField.textContent = "Come on! Try harder!\n";
            } else{
              mockField.textContent = "Are you ever going to get this?\n";
            }
            feedbackField.style.color = "black";
            if(proximity<10 && proximity>0){
              if(distance > 0){
                feedbackField.textContent = "A bit large, but close. Try again.";
              }else if (distance < 0){
                feedbackField.textContent = "A bit small, but close. Try again.";
              }
            }else if(proximity<30 && proximity>=10){
              if(distance > 0){
                feedbackField.textContent = "Somewhat large. Try again.";
              }else if (distance < 0){
                feedbackField.textContent = "Somewhat small. Try again.";
              }
            }else if(proximity<100 && proximity>=30){
              if(distance > 0){
                feedbackField.textContent = "Too large! Try again.";
              }else if (distance < 0){
                feedbackField.textContent = "Too small! Try again.";
              }
            }else if(proximity == 0) {
              flag = 1;
              answer.style.display = "inline-block";
              answer.style.opacity = "1";
              feedbackField.textContent = "CORRECT! Congratulations!";
              mockField.textContent = "";
              answer.textContent = guessNumber;
              svg.style.display = "none";
              inputField.disabled = true;
              checkBtn.value = "NEXT";
            }
          }else{
            svgPaths.forEach(function(e){
              e.style.fill= "rgb(74, 0, 202)";
            })
            feedbackField.style.fontsize = "1.5rem";
            feedbackField.style.color = "red";
            feedbackField.textContent = "Don't go crazy! Let's only focus on numbers from 1 to 100 :-).";
          }
        } else{
          svgPaths.forEach(function(e){
            e.style.fill= "rgb(74, 0, 202)";
          })
          feedbackField.style.fontsize = "1.5rem";
          feedbackField.style.color = "red";
          feedbackField.textContent = "Please enter an integer number between 1 and 100!";
        }
      }else{
        svgPaths.forEach(function(e){
          e.style.fill= "rgb(74, 0, 202)";
        })
        feedbackField.style.fontsize = "1.5rem";
        feedbackField.style.color = "red";
        feedbackField.textContent = "You haven't entered anything!"
      }
    }else if(checkBtn.value == "NEXT"){
      feedbackField.textContent = "";
      flag = 0;
      guessNumber = Math.floor(Math.random()*100)+1;
      generatedNumber.forEach(function(e,i){
        if(e.value == guessNumber){
          console.log("找到了");
          existIndex = i;
        }
      })
      console.log("existIndex: "+existIndex);
      if(existIndex > -1){
        currentIndex = existIndex;
        existIndex = -1;
        hintField.textContent = "This number took you "+generatedNumber[currentIndex].guessTimes
        +" trials to hit it last time. See if you can do better this time!";
        console.log("猜过了: "+generatedNumber[currentIndex].value+", "+generatedNumber[currentIndex].guessTimes+"次");
        generatedNumber[currentIndex].guessTimes = 0;
      } else{
        hintField.textContent = "";
        var newNumber = {
          value: guessNumber,
          guessTimes: 0
        }
        generatedNumber.push(newNumber);
        currentIndex = generatedNumber.length-1;
      }
      console.log("ANSWER:"+guessNumber);
      answer.style.display = "none";
      answer.style.opacity = "0";
      answer.textContent = guessNumber;
      svg.style.display = "inline-block";
      inputField.disabled = false;
      checkBtn.value = "CHECK";
      inputField.value = "";
      svgPaths.forEach(function(e){
        e.style.fill= "rgb(74, 0, 202)";
      })
    }
  }
}
