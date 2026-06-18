// Kariyer Krizi Simülatörü

const title = document.getElementById("title");
const question = document.getElementById("question");
const startButton = document.getElementById("startButton");
const answers = document.getElementById("answers");
const progressFill = document.getElementById("progress-fill");

let currentQuestion = 0;
let score = 0;
let userAnswers = [];


startButton.addEventListener("click", startQuiz);

function startQuiz() {

    startButton.style.display = "none";

    showQuestion();
}

function showQuestion() {

    const progress =
        (currentQuestion / questions.length) * 100;

    progressFill.style.width =
        progress + "%";

    title.textContent =
        `Soru ${currentQuestion + 1} / ${questions.length}`;

    question.textContent =
        questions[currentQuestion].question;

    answers.innerHTML = "";

    questions[currentQuestion].answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.classList.add("answer-btn");

        button.textContent = answer.text;

        button.addEventListener("click", () => {

            score += answer.score;
            userAnswers.push(answer.text);
            currentQuestion++;

            if (currentQuestion < questions.length) {

                showQuestion();

            } else {

                showResult();

            }

        });

        answers.appendChild(button);

    });

}

function showResult() {

    progressFill.style.width = "100%";

    let resultTitle = "";
    let resultText = "";

    if (score <= 4) {

    resultTitle = "☠️ LinkedIn Hayaleti";
    resultText = "İş bulma ihtimali: %12";

    }
    else if (score <= 8) {

    resultTitle = "🤡 Kariyer Piyangosu Oyuncusu";
    resultText = "İş bulma ihtimali: %43";

    }
    else if (score <= 12) {

    resultTitle = "🙂 Umut Vadeden Yeni Mezun";
    resultText = "İş bulma ihtimali: %71";

    }
    else {

    resultTitle = "🚀 Recruiter Avcısı";
    resultText = "İş bulma ihtimali: %92";

    }

    title.textContent = "Sonuç";

    question.textContent = "";

    answers.innerHTML = `
        <div class="result-card">

             <h2>${resultTitle}</h2>

             <div class="result-score">
                 ${resultText}
             </div>

             <div class="score-bar">
                 <div
                     class="score-fill"
                     style="width:${(score/15)*100}%">
                 </div>
             </div>
             <p>
                 Toplam Puan: ${score} / 15
             </p>
             <p>
                Verdiğin cevaplar:
                ${userAnswers.join(", ")}
             </p>
             <p class="result-tip">
                Kariyer uzmanlarımız bu sonucu
                tamamen bilimsel olmayan yöntemlerle
                hesapladı.
             </p>

        </div>
    `;

    const restartButton =
        document.createElement("button");

    restartButton.textContent =
        "🔄 Yeniden Dene";

    restartButton.classList.add("answer-btn");

    restartButton.addEventListener("click", () => {

        currentQuestion = 0;
        score = 0;
        userAnswers = [];

        progressFill.style.width = "0%";

        showQuestion();

    });

    answers.appendChild(restartButton);

}