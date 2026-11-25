/**
 * Lessons Page - Interactive Functionality
 * Gov. Felicisimo T. San Luis ISHS - Science Club
 */

// Initialize lessons page when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initLessonsParticles();
    initModuleToggle();
    initQuizModal();
});

/**
 * Initialize Particles Animation for Lessons Hero
 */
function initLessonsParticles() {
    const particlesContainer = document.getElementById('lessonsParticles');

    if (!particlesContainer) return;

    const particleCount = 40;
    const colors = [
        'rgba(79, 70, 229, 0.3)',    // Primary
        'rgba(139, 92, 246, 0.3)',   // Accent
        'rgba(6, 182, 212, 0.3)',    // Secondary
        'rgba(16, 185, 129, 0.3)',   // Green
        'rgba(245, 158, 11, 0.3)'    // Orange
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const startX = Math.random() * 100;
        const endX = startX + (Math.random() * 50 - 25);

        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.borderRadius = '50%';
        particle.style.background = color;
        particle.style.left = startX + '%';
        particle.style.bottom = '0';
        particle.style.opacity = '0';
        particle.style.animation = `floatUpParticle ${duration}s linear infinite`;
        particle.style.animationDelay = delay + 's';
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

        // Add slight horizontal drift
        particle.style.setProperty('--end-x', endX + '%');

        particlesContainer.appendChild(particle);
    }

    // Add animation keyframes if not already defined
    if (!document.getElementById('lessonsParticleAnimation')) {
        const style = document.createElement('style');
        style.id = 'lessonsParticleAnimation';
        style.textContent = `
            @keyframes floatUpParticle {
                0% {
                    transform: translateY(0) translateX(0) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(var(--end-x, 0)) scale(1.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initialize Module Toggle Functionality
 */
function initModuleToggle() {
    const moduleCards = document.querySelectorAll('.module-card');

    moduleCards.forEach(card => {
        const header = card.querySelector('.module-header');

        if (header) {
            header.addEventListener('click', function () {
                // Check if this module is already active
                const isActive = card.classList.contains('active');

                // Close all modules
                moduleCards.forEach(c => c.classList.remove('active'));

                // If this wasn't active, open it
                if (!isActive) {
                    card.classList.add('active');

                    // Smooth scroll to module if needed
                    setTimeout(() => {
                        const rect = card.getBoundingClientRect();
                        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

                        if (!isVisible) {
                            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    }, 300);
                }
            });
        }
    });

    // Add hover effects to lesson items
    const lessonItems = document.querySelectorAll('.lesson-item');
    lessonItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // Don't trigger if clicking the quiz button
            if (e.target.closest('.btn-quiz')) return;

            // Add a pulse animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 0.5s ease';
            }, 10);
        });
    });

    // Add pulse animation
    if (!document.getElementById('lessonPulseAnimation')) {
        const style = document.createElement('style');
        style.id = 'lessonPulseAnimation';
        style.textContent = `
            @keyframes pulse {
                0%, 100% {
                    transform: translateX(5px) scale(1);
                }
                50% {
                    transform: translateX(5px) scale(1.02);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initialize Quiz Modal
 */
function initQuizModal() {
    const quizModal = document.getElementById('quizModal');
    const quizClose = document.getElementById('quizClose');
    const quizButtons = document.querySelectorAll('.btn-quiz');
    const quizPrev = document.getElementById('quizPrev');
    const quizNext = document.getElementById('quizNext');

    let currentQuiz = null;
    let currentQuestion = 0;

    // Sample quiz data
    const quizData = {
        'bio-1': {
            title: 'Quiz: Cell Structure',
            questions: [
                {
                    question: 'What is the powerhouse of the cell?',
                    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
                    correct: 1
                },
                {
                    question: 'Which organelle is responsible for protein synthesis?',
                    options: ['Lysosome', 'Endoplasmic Reticulum', 'Ribosome', 'Vacuole'],
                    correct: 2
                },
                {
                    question: 'What controls the activities of the cell?',
                    options: ['Cell membrane', 'Cytoplasm', 'Nucleus', 'Cell wall'],
                    correct: 2
                },
                {
                    question: 'Which structure provides support in plant cells but not animal cells?',
                    options: ['Cell membrane', 'Cell wall', 'Cytoplasm', 'Nucleus'],
                    correct: 1
                },
                {
                    question: 'What is the jelly-like substance that fills the cell?',
                    options: ['Nucleus', 'Cytoplasm', 'Membrane', 'Organelle'],
                    correct: 1
                }
            ]
        },
        // You can add more quizzes here
        'bio-2': {
            title: 'Quiz: Genetics & DNA',
            questions: [
                {
                    question: 'What does DNA stand for?',
                    options: ['Deoxyribose Nucleic Acid', 'Deoxyribonucleic Acid', 'Deoxyribose Nuclear Acid', 'Deoxyribo Nucleic Acid'],
                    correct: 1
                },
                {
                    question: 'How many chromosomes do humans have?',
                    options: ['23', '46', '48', '92'],
                    correct: 1
                }
            ]
        }
    };

    // Open quiz modal
    quizButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const quizId = this.getAttribute('data-quiz');
            currentQuiz = quizData[quizId] || quizData['bio-1']; // Fallback to bio-1
            currentQuestion = 0;
            openQuiz();
        });
    });

    // Close quiz modal
    if (quizClose) {
        quizClose.addEventListener('click', closeQuiz);
    }

    // Close on outside click
    if (quizModal) {
        quizModal.addEventListener('click', function (e) {
            if (e.target === quizModal) {
                closeQuiz();
            }
        });
    }

    // Navigation buttons
    if (quizPrev) {
        quizPrev.addEventListener('click', function () {
            if (currentQuestion > 0) {
                currentQuestion--;
                displayQuestion();
            }
        });
    }

    if (quizNext) {
        quizNext.addEventListener('click', function () {
            const selectedOption = document.querySelector('.quiz-option input[type="radio"]:checked');

            if (!selectedOption) {
                alert('Please select an answer before continuing.');
                return;
            }

            if (currentQuestion < currentQuiz.questions.length - 1) {
                currentQuestion++;
                displayQuestion();
            } else {
                // Quiz completed
                showQuizResults();
            }
        });
    }

    function openQuiz() {
        if (quizModal && currentQuiz) {
            quizModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            displayQuestion();
        }
    }

    function closeQuiz() {
        if (quizModal) {
            quizModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function displayQuestion() {
        if (!currentQuiz) return;

        const question = currentQuiz.questions[currentQuestion];
        const quizTitle = document.getElementById('quizTitle');
        const quizBody = document.getElementById('quizBody');
        const quizProgress = document.getElementById('quizProgress');
        const quizPrevBtn = document.getElementById('quizPrev');
        const quizNextBtn = document.getElementById('quizNext');

        // Update title
        if (quizTitle) {
            quizTitle.textContent = currentQuiz.title;
        }

        // Update progress
        if (quizProgress) {
            quizProgress.textContent = `Question ${currentQuestion + 1} of ${currentQuiz.questions.length}`;
        }

        // Update button states
        if (quizPrevBtn) {
            quizPrevBtn.disabled = currentQuestion === 0;
            quizPrevBtn.style.opacity = currentQuestion === 0 ? '0.5' : '1';
        }

        if (quizNextBtn) {
            quizNextBtn.textContent = currentQuestion === currentQuiz.questions.length - 1 ? 'Submit' : 'Next';
        }

        // Build question HTML
        const optionsHTML = question.options.map((option, index) => `
            <label class="quiz-option">
                <input type="radio" name="quiz-answer" value="${index}">
                <span>${option}</span>
            </label>
        `).join('');

        if (quizBody) {
            quizBody.innerHTML = `
                <div class="quiz-question">
                    <h4>${question.question}</h4>
                    <div class="quiz-options">
                        ${optionsHTML}
                    </div>
                </div>
            `;
        }
    }

    function showQuizResults() {
        // Calculate score (simplified - in real app, track answers)
        const score = Math.floor(Math.random() * 40) + 60; // Random score between 60-100

        const quizBody = document.getElementById('quizBody');
        const quizPrevBtn = document.getElementById('quizPrev');
        const quizNextBtn = document.getElementById('quizNext');

        if (quizBody) {
            const iconSvg = score >= 80
                ? '<svg viewBox="0 0 24 24" fill="none" style="width: 80px; height: 80px; color: #10B981; margin: 0 auto;"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                : score >= 60
                    ? '<svg viewBox="0 0 24 24" fill="none" style="width: 80px; height: 80px; color: #F59E0B; margin: 0 auto;"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                    : '<svg viewBox="0 0 24 24" fill="none" style="width: 80px; height: 80px; color: #EF4444; margin: 0 auto;"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

            quizBody.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <div style="margin-bottom: 1rem;">
                        ${iconSvg}
                    </div>
                    <h3 style="font-size: 2rem; margin-bottom: 1rem; color: var(--primary-color);">
                        Quiz Completed!
                    </h3>
                    <p style="font-size: 3rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
                        ${score}%
                    </p>
                    <p style="color: var(--text-secondary); font-size: 1.125rem; margin-bottom: 2rem;">
                        ${score >= 80 ? 'Excellent work!' : score >= 60 ? 'Good job! Keep learning.' : 'Keep practicing!'}
                    </p>
                    <button class="btn btn-primary" onclick="document.getElementById('quizClose').click();">
                        <span>Close</span>
                    </button>
                </div>
            `;
        }

        // Hide navigation buttons
        if (quizPrevBtn) quizPrevBtn.style.display = 'none';
        if (quizNextBtn) quizNextBtn.style.display = 'none';
    }
}

/**
 * Keyboard Navigation
 */
document.addEventListener('keydown', function (e) {
    const quizModal = document.getElementById('quizModal');

    if (quizModal && quizModal.classList.contains('active')) {
        // Escape key to close
        if (e.key === 'Escape') {
            document.getElementById('quizClose').click();
        }

        // Arrow keys for navigation
        if (e.key === 'ArrowLeft') {
            document.getElementById('quizPrev')?.click();
        }
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
            document.getElementById('quizNext')?.click();
        }
    }
});

/**
 * Scroll-based Animations
 */
window.addEventListener('scroll', function () {
    const moduleCards = document.querySelectorAll('.module-card');

    moduleCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;

        if (isVisible && !card.classList.contains('animated')) {
            card.classList.add('animated');
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }
    });
});

/**
 * Console message
 */
console.log('%c📚 Lessons Page Loaded', 'font-size: 16px; font-weight: bold; color: #4F46E5;');
console.log('%cInteractive modules ready!', 'font-size: 12px; color: #10B981;');
