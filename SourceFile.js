

javascript:(function(){    
    function IDKCycle() {
        thisInterval = setInterval(function () {
            console.log("Is Running");
            const confidenceElement = document.getElementsByClassName("confidenceFeedback")[0];
            if (confidenceElement && confidenceElement.innerText !== "You answered") {
                console.log("Stopped Running");
                learnCycle();  
                clearInterval(thisInterval); 
            } else {
                const answerElements = document.getElementsByClassName("answer");
                const submitButton = document.getElementById("submit-button");

                if (answerElements[4] && submitButton) {
                    answerElements[4].click();

                    setTimeout(function () {
                        submitButton.click();
                    }, 1000);
                } else {
                    console.log("Required elements not found. Stopping.");
                    clearInterval(thisInterval); 
                }
            }
        }, 1000);
    }

    function learnCycle() {
        document.getElementById("next-question-button").click();

        const interval = setInterval(function () {
            try {
                const ElementValues = document.getElementsByClassName("answerContent");
                let foundCorrectAnswer = false;
                for (let i = 0; i < ElementValues.length; i++) {
                    let thisElem = document.getElementsByClassName("answer")[i].querySelector(".gwt-Image").alt;
                    
                    if (thisElem == "Incorrect"){
                        answersArrHere = [];
                        document.getElementsByClassName("btn arrowRight pullRight")[0].click();
                        learningInterval = setInterval(checkLearning,1700);
                        clearInterval(interval); 
                        return;
                    }

                    let currentValue = ElementValues[i].querySelector("p").innerText;     
                    if (currentValue === "THE CORRECT ANSWER") {
                        let actualText = ElementValues[i].querySelector("p:nth-of-type(2)").innerText;
                        answersArrHere.push(actualText);
                        foundCorrectAnswer = true; 
                    }
                }
                console.log(answersArrHere);
                const nextButton = document.getElementsByClassName("btn arrowRight pullRight")[0];
                if (foundCorrectAnswer) {
                    if (nextButton) {
                        nextButton.click();
                    } else {
                        console.warn("Next button not found. Exiting interval.");
                        clearInterval(interval);
                    }
                }
            } catch (error) {
                console.error("Cycle Completed",error);
                learningInterval = setInterval(checkLearning,1700);
                clearInterval(interval); 
                return;
            }
        }, 1500);
    }

    function checkLearning() {
        const reviewHeading = document.getElementsByClassName("reviewHeading")[0];
        const learnElement = document.getElementById("next-question-button");
        const StartElem = document.getElementsByClassName("start");

        if ((reviewHeading && reviewHeading.innerText === "WHAT YOU NEED TO KNOW") || 
            (learnElement && learnElement.innerText === "learn")) {
            console.log("Stopped Checking Learning");
            learnCycle();
            clearInterval(learningInterval);
            return;  
        }
        if (StartElem.length > 0 && StartElem[0].innerText == "Congratulations, you successfully mastered this module!\n\nCongratulations, you successfully mastered this module!\n\ncontinue"){
            console.log("Full Task completed!");

            clearInterval(learningInterval);
            return;  
        }

        PossibleAnswers = [];
        for (let i = 0; i < 4; i++) {PossibleAnswers.push(document.getElementsByClassName("answerContent")[i].innerText);}
        let answer = checkArrays(answersArrHere, PossibleAnswers);
        console.log(answer);

        if (answer == "Nothing Found"){
            document.getElementsByClassName("answer")[4].click();    
            setTimeout(function () {
                document.getElementById("submit-button").click();
            }, 1000);   
        
        } 
        else {
            document.getElementsByClassName("answerContent")[answer].click();
            setTimeout(function () {
                document.getElementsByClassName("answerContent")[answer].click();
            }, 200);
            setTimeout(function () {
                document.getElementById("submit-button").click();
            }, 600);
            setTimeout(function () {
                document.getElementById("next-question-button").click();
            }, 1000);
        }
        console.log("Still going");
    }

    function checkArrays(arr1,arr2){
        for (let i = 0; i < arr1.length; i++) {
            for (let q = 0; q < arr2.length; q++) {
                if (arr1[i] === arr2[q]){
                    return q;
                }
            }
        }
        return "Nothing Found";
    }

    answersArrHere = [];
    let thisInterval;
    let learningInterval;
    IDKCycle();
})();

