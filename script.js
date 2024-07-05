// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const authForm = document.getElementById('auth-form');
    const quizSection = document.getElementById('quiz-section');
    const authSection = document.getElementById('auth-section');
    const questionContainer = document.getElementById('question-container');
    const nextButton = document.getElementById('next-button');
    const scoreSection = document.getElementById('score-section');
    const resultMessage = document.getElementById('result-message');
    const restartButton = document.getElementById('restart-button');
    const questionNumber = document.getElementById('question-number');

    // Initialize variables
    let nickname = '';
    let currentQuestionIndex = 0;
    let score = 0;

    // Define quiz questions
    const questions = [
        {
            question: 'What is the capital of France?',
            answers: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
            correct: 2
        },
        // ... other questions can be placed here...
    ];

    // Event listener for form submission
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        nickname = document.getElementById('nickname').value;
        authSection.style.display = 'none';
        quizSection.style.display = 'block';
        showQuestion();
    });

    // Function to display the current question
    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionNumber.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
        questionContainer.innerHTML = `
            <h3>${question.question}</h3>
            ${question.answers.map((answer, index) => `
                <button class="answer-button" data-index="${index}">${answer}</button>
            `).join('')}
        `;

        // Add event listeners to answer buttons
        document.querySelectorAll('.answer-button').forEach(button => {
            button.addEventListener('click', checkAnswer);
        });
    }

    // Function to check the selected answer
    function checkAnswer(e) {
        const selectedAnswerIndex = parseInt(e.target.getAttribute('data-index'));
        const correctAnswerIndex = questions[currentQuestionIndex].correct;

        // Disable all buttons and highlight the correct answer
        document.querySelectorAll('.answer-button').forEach(button => {
            button.disabled = true;
            if (parseInt(button.getAttribute('data-index')) === correctAnswerIndex) {
                button.classList.add('correct');
            }
        });

        // Update score and highlight incorrect answer if necessary
        if (selectedAnswerIndex === correctAnswerIndex) {
            score++;
        } else {
            e.target.classList.add('incorrect');
        }

        nextButton.style.display = 'block';
    }

    // Event listener for the next button
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
            nextButton.style.display = 'none';
        } else {
            showScore();
        }
    });

    // Function to display the final score
    function showScore() {
        quizSection.style.display = 'none';
        scoreSection.style.display = 'block';

        const totalQuestions = questions.length;
        const percentageScore = (score / totalQuestions) * 100;
        const passed = percentageScore >= 50;

        // Display appropriate message based on pass/fail
        if (passed) {
            resultMessage.textContent = `Congratulations ${nickname}!! You've passed!`;
            scoreSection.style.backgroundColor = '#d4edda';
            scoreSection.style.color = '#155724';
        } else {
            resultMessage.textContent = `OUPS ${nickname}, you've failed. Try again!`;
            scoreSection.style.backgroundColor = '#f8d7da';
            scoreSection.style.color = '#721c24';
        }

        resultMessage.textContent += ` Your score is ${score} / ${totalQuestions}.`;
    }

    // Event listener for the restart button
    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        scoreSection.style.display = 'none';
        authSection.style.display = 'block';
        document.getElementById('nickname').value = '';
    });
});