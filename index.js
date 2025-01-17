// Create a Math question
// Math question will have a random generated
// Question Type Multiplication question  with random number range 1-10
// Answer will be the product of the random number range and the random number range
// User will have to answer question
// On submit  answer answer will be compared with random generated answer
// If answer will be correct than score will be incremented
// If answer will be wrong than score will be decremented

const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
const scoreEl = document.getElementById("score");
let storedAnswer;
let score = localStorage.getItem('score');

const randomNumber = (min,max) => {
    return Math.floor(Math.random() * (max-min+1)+min);
};


const generateQuestion = () => {
    const randomNumber1 = randomNumber(1,10);
    const randomNumber2 = randomNumber(1,10);
    const questionType = randomNumber(1,4);
    
    let firstNumber;
    let secondNumber;



    let question;
    let answer;

    if(randomNumber1 > randomNumber2 && questionType > 2){
        firstNumber = randomNumber1;
        secondNumber = randomNumber2;
    }else{
        firstNumber = randomNumber2;
        secondNumber = randomNumber1;
    }

    switch(questionType){
        case 1:
            question = `Q. What is ${firstNumber} multiply ${secondNumber}`;
            answer = firstNumber * secondNumber;
            break;
        case 2:
            question = `Q. What is ${firstNumber} Add To ${secondNumber}`;
            answer = firstNumber + secondNumber;
            break;
        case 3:
            question = `Q. What is ${firstNumber} Divided By ${secondNumber}`;
            answer = firstNumber / secondNumber;
            break;
        case 4:
            question = `Q. What is ${firstNumber} Substract from ${secondNumber}`;
            answer = firstNumber - secondNumber;
            break;
        default :
            console.log("Invalid Input")
            break;      
    }
    return {question,answer}
}

const showQuestion = () => {
    const {question,answer} = generateQuestion();
    questionEl.innerText = question;
    scoreEl.innerText = score;
    storedAnswer = answer;
}
showQuestion();

const checkAnswer = (event) => {
    event.preventDefault();
    const formData = new FormData(questionFormEl);
    const userAnswer = +(formData.get("answer"))
    
    if(userAnswer === storedAnswer){
        score += 1;
        Toastify({
            text: `Your are correct and your score is ${score}`,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
    }
    else{
        score-=1;
        Toastify({
            text: `Your are wrong and your score is ${score}`,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #e33217, #ff001e)",
            },
          }).showToast();
    }
    scoreEl.innerText = score;
    localStorage.setItem('score',score);
    event.target.reset();
    showQuestion();
    
}