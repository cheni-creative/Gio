const quiz = [
  // All 65 MCQs with sections (example format)
  {section:1,q:"What does the term 'myco' in Mycobacterium refer to?",options:["Fungus-like","Acid-loving","Waxy","Rod-shaped"],answer:2},
  {section:1,q:"What is the primary function of the thick, waxy cell wall of Mycobacterium?",options:["Rapid reproduction","Exotoxin production","Airborne survival","Resist all antibiotics"],answer:2},
  {section:1,q:"Which of the following is NOT part of the M. tuberculosis complex?",options:["M. kansasii","M. tuberculosis","M. bovis","M. leprae"],answer:0},
  {section:1,q:"Which species causes leprosy (Hansen's Disease)?",options:["M. tuberculosis","M. bovis","M. leprae","M. avium-intracellulare"],answer:2},
  {section:1,q:"Nontuberculosis mycobacteria (NTM) are best described as:",options:["More virulent than M. tuberculosis","Opportunistic pathogens in humans","Only transmitted through water","Easily treated with first-line TB drugs"],answer:1},

  // Add remaining 60 MCQs here following the same structure...
  // section numbers should match as in previous code
];

let current=0;
let score=0;
let wrongAnswers=[];
let quizSubset=[...quiz];

const question = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const scoreBox = document.getElementById("score");
const endSummary = document.getElementById("endSummary");
const finalScore = document.getElementById("finalScore");
const wrongList = document.getElementById("wrongList");

loadQuestion();

function loadQuestion(){
  feedback.innerText="";
  optionsDiv.innerHTML="";
  if(current>=quizSubset.length){
    showSummary();
    return;
  }

  question.innerText = quizSubset[current].q;
  quizSubset[current].options.forEach((opt,index)=>{
    const btn=document.createElement("button");
    btn.innerText=opt;
    btn.className="option";
    btn.onclick=()=>checkAnswer(index,btn);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(index,btn){
  if(index===quizSubset[current].answer){
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    wrongAnswers.push(quizSubset[current]);
  }
  scoreBox.innerText=`Score: ${score} / ${quizSubset.length}`;
  current++;
  setTimeout(loadQuestion, 600); // auto-next after 0.6s
}

function showSummary(){
  question.style.display="none";
  optionsDiv.style.display="none";
  feedback.style.display="none";
  endSummary.style.display="block";
  finalScore.innerText=`Your Score: ${score} / ${quizSubset.length}`;

  wrongList.innerHTML="";
  wrongAnswers.forEach((q)=>{
    const li=document.createElement("li");
    li.innerText=q.q;
    wrongList.appendChild(li);
  });
}

function retryWrong(){
  if(wrongAnswers.length===0) return;
  quizSubset=[...wrongAnswers];
  wrongAnswers=[];
  current=0;

  question.style.display="block";
  optionsDiv.style.display="block";
  feedback.style.display="block";
  endSummary.style.display="none";
  score=0;
  scoreBox.innerText="";
  loadQuestion();
}

function goToSection(sec){
  quizSubset=quiz.filter(q=>q.section===sec);
  wrongAnswers=[];
  current=0;
  score=0;
  question.style.display="block";
  optionsDiv.style.display="block";
  feedback.style.display="block";
  endSummary.style.display="none";
  scoreBox.innerText="";
  loadQuestion();
}