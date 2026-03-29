/**
 * Quiz modal for phase comprehension check
 * Displays after each phase completion
 */

export class Quiz {
  constructor() {
    this.overlay = document.getElementById('quiz-overlay');
    this.questionEl = document.getElementById('quiz-question');
    this.optionsEl = document.getElementById('quiz-options');
    this.feedbackEl = document.getElementById('quiz-feedback');
    this.continueBtn = document.getElementById('quiz-continue');

    this.onContinue = null;
    this.selectedAnswer = null;
    this.correctAnswer = null;

    this.bindEvents();
  }

  bindEvents() {
    this.continueBtn.addEventListener('click', () => {
      this.hide();
      if (this.onContinue) this.onContinue();
    });
  }

  /**
   * Shows the quiz modal with a question
   * @param {object} questionData - { question, options[], correct }
   * @param {function} onContinue - Callback after answering
   */
  show(questionData, onContinue) {
    if (!questionData) {
      if (onContinue) onContinue();
      return;
    }

    this.onContinue = onContinue;
    this.selectedAnswer = null;
    this.correctAnswer = questionData.correct;

    this.questionEl.textContent = questionData.question;
    this.feedbackEl.className = 'quiz-modal__feedback';
    this.feedbackEl.textContent = '';
    this.continueBtn.classList.remove('quiz-modal__continue--visible');

    // Build options
    this.optionsEl.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    questionData.options.forEach((option, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-modal__option';
      btn.innerHTML = `
        <span class="quiz-modal__option-letter">${letters[i]}</span>
        <span>${option}</span>
      `;

      btn.addEventListener('click', () => this.selectAnswer(i, btn));
      this.optionsEl.appendChild(btn);
    });

    this.overlay.classList.add('quiz-overlay--visible');
  }

  selectAnswer(index, button) {
    if (this.selectedAnswer !== null) return;
    this.selectedAnswer = index;

    const isCorrect = index === this.correctAnswer;

    if (isCorrect) {
      button.classList.add('quiz-modal__option--correct');
      this.feedbackEl.className = 'quiz-modal__feedback quiz-modal__feedback--correct';
      this.feedbackEl.textContent = 'Correto! Muito bem!';
    } else {
      button.classList.add('quiz-modal__option--wrong');
      // Highlight correct answer
      const options = this.optionsEl.querySelectorAll('.quiz-modal__option');
      options[this.correctAnswer].classList.add('quiz-modal__option--correct');

      this.feedbackEl.className = 'quiz-modal__feedback quiz-modal__feedback--wrong';
      this.feedbackEl.textContent = 'Incorreto. A resposta correta esta destacada.';
    }

    this.continueBtn.classList.add('quiz-modal__continue--visible');
  }

  hide() {
    this.overlay.classList.remove('quiz-overlay--visible');
  }
}
