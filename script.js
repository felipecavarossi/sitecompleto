document.querySelector('form').addEventListener('submit', function(e) {
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    if (nome === "" || email === "") {
        e.preventDefault();
        alert("Por favor, preencha todos os campos!");
    }
});
let questions = [
    {
        question: "Qual é o principal produto da empresa?",
        answers: ["Produto A", "Produto B", "Produto C", "Produto D"],
        correct: 1
    },
    // Adicione mais perguntas aqui
];

let currentQuestion = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    
    document.getElementById('submit-button').addEventListener('click', submitAnswers);
    document.getElementById('play-again-button').addEventListener('click', playAgain);
});

function loadQuestion() {
    const questionData = questions[currentQuestion];
    const quizContainer = document.getElementById('quiz-container');
    
    let html = `<div class="question">${questionData.question}</div>`;
    questionData.answers.forEach((answer, index) => {
        html += `<div class="answer" data-answer="${index}">${answer}</div>`;
    });
    
    quizContainer.innerHTML = html;
    
    document.querySelectorAll('.answer').forEach(answer => {
        answer.addEventListener('click', () => {
            document.getElementById('select-sound').play();
            document.querySelectorAll('.answer').forEach(a => a.classList.remove('selected'));
            answer.classList.add('selected');
        });
    });
}

function submitAnswers() {
    let selectedAnswer = document.querySelector('.answer.selected');
    if (!selectedAnswer) return;
    
    let answerIndex = parseInt(selectedAnswer.getAttribute('data-answer'));
    if (answerIndex === questions[currentQuestion].correct) {
        document.getElementById('correct-sound').play();
        score++;
    } else {
        document.getElementById('wrong-sound').play();
    }

    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
    
    document.getElementById('submit-button').disabled = true;
    document.getElementById('play-again-button').style.display = 'inline-block';
}

function showResults() {
    let result = document.getElementById('result');
    result.innerHTML = `Você acertou ${score} de ${questions.length} perguntas.`;
}

function playAgain() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    document.getElementById('submit-button').disabled = false;
    document.getElementById('play-again-button').style.display = 'none';
    document.getElementById('result').innerHTML = '';
}
function disableOptions(questionName) {
    let options = document.getElementsByName(questionName);
    options.forEach(option => {
        if (!option.checked) {
            option.disabled = true;
        }
    });
}

function playSound() {
    let clickSound = document.getElementById('selecionasom');
    clickSound.play();
}

function submitQuiz() {
    let correctAnswers = {
        q1: "d",
        q2: "b",
        q3: "b",
        q4: "B",
        q5: "B",
        q6: "b",
        q7: "d",
        q8: "B",
        q9: "d",
        q10: "b",
    };

    let form = document.getElementById('quiz-form');
    let score = 0;

    for (let key in correctAnswers) {
        let userAnswer = form.elements[key].value;
        if (userAnswer === correctAnswers[key]) {
            score++;
        }
    }

    let result = document.getElementById('result');
    result.innerHTML = `Você acertou ${score} de 10 perguntas.`;

    // Tocar som dependendo da pontuação
    if (score === 7) {
        let successSound = document.getElementById('venceusom');
        successSound.play();
    } else {
        let failureSound = document.getElementById('perdeusom');
        failureSound.play();
    }

    // Mostrar o botão "Responder Novamente"
    document.getElementById("resetButton").style.display = "inline-block";
}

function resetQuiz() {
    let form = document.getElementById('quiz-form');
    form.reset(); // Reseta todas as respostas do formulário

    // Habilitar todas as opções de resposta
    let options = form.querySelectorAll('input[type="radio"]');
    options.forEach(option => {
        option.disabled = false;
    });

    // Limpar o resultado exibido
    document.getElementById('result').innerHTML = "";

    // Esconder o botão de reset novamente
    document.getElementById("resetButton").style.display = "none";
}