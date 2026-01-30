// ... (начало кода с уровнями оставляем прежним)

function initLevel() {
    const level = levels[currentLevelIndex];
    document.getElementById('target-text').textContent = level.target;
    optionsGrid.innerHTML = '';
    answerSlots.innerHTML = '';
    userSelection = [];
    footer.className = '';
    actionBtn.textContent = "Проверить";
    actionBtn.style.backgroundColor = "#58cc02";
    
    // Перемешиваем варианты
    level.options.forEach((word, index) => {
        const btn = document.createElement('button');
        btn.className = 'word-card';
        btn.textContent = word;
        btn.id = `word-${index}`; // Даем ID каждой кнопке
        btn.onclick = () => toggleWord(word, btn);
        optionsGrid.appendChild(btn);
    });
    
    updateProgress();
}

function toggleWord(word, btn) {
    if (footer.classList.contains('correct') || footer.classList.contains('wrong')) return;

    if (!btn.classList.contains('hidden')) {
        // Добавляем в ответ
        userSelection.push(word);
        btn.classList.add('hidden'); // Скрываем внизу
        
        const slot = document.createElement('button');
        slot.className = 'word-card';
        slot.textContent = word;
        slot.dataset.originId = btn.id; // Запоминаем, откуда пришло слово
        
        // Клик по слову в ответе возвращает его назад
        slot.onclick = () => {
            userSelection = userSelection.filter(w => w !== word);
            document.getElementById(slot.dataset.originId).classList.remove('hidden');
            slot.remove();
        };
        
        answerSlots.appendChild(slot);
    }
}

function updateProgress() {
    const percentage = (currentLevelIndex / levels.length) * 100;
    progress.style.width = percentage + "%";
}

// ... (остальной код проверки оставляем)

const levels = [
    {
        target: "I love coding",
        options: ["Я", "люблю", "программировать", "кофе", "яблоко"],
        answer: ["Я", "люблю", "программировать"]
    },
    {
        target: "The cat is green",
        options: ["Кот", "собака", "зеленый", "есть", "этот"],
        answer: ["Этот", "кот", "зеленый"] // Упростим для примера
    },
    {
        target: "Milk and bread",
        options: ["Молоко", "и", "хлеб", "вода", "чай"],
        answer: ["Молоко", "и", "хлеб"]
    }
];

let currentLevelIndex = 0;
let userSelection = [];

const optionsGrid = document.getElementById('options-grid');
const answerSlots = document.getElementById('answer-slots');
const actionBtn = document.getElementById('action-btn');
const progress = document.getElementById('progress');
const footer = document.getElementById('footer');

function initLevel() {
    const level = levels[currentLevelIndex];
    document.getElementById('target-text').textContent = level.target;
    optionsGrid.innerHTML = '';
    answerSlots.innerHTML = '';
    userSelection = [];
    footer.className = '';
    actionBtn.textContent = "Проверить";
    actionBtn.style.backgroundColor = "#58cc02";
    
    // Перемешиваем варианты
    const shuffled = [...level.options].sort(() => Math.random() - 0.5);

    shuffled.forEach(word => {
        const btn = document.createElement('button');
        btn.className = 'word-card';
        btn.textContent = word;
        btn.onclick = () => selectWord(word, btn);
        optionsGrid.appendChild(btn);
    });
    
    progress.style.width = `${(currentLevelIndex / levels.length) * 100}%`;
}

function selectWord(word, btn) {
    if (footer.classList.contains('correct')) return; // Блок кликов после проверки
    
    userSelection.push(word);
    const wordBadge = document.createElement('span');
    wordBadge.className = 'word-card';
    wordBadge.textContent = word;
    answerSlots.appendChild(wordBadge);
    btn.classList.add('hidden');
}

actionBtn.onclick = () => {
    if (actionBtn.textContent === "Продолжить") {
        currentLevelIndex++;
        if (currentLevelIndex < levels.length) {
            initLevel();
        } else {
            alert("Курс пройден! Ты легенда!");
            currentLevelIndex = 0;
            initLevel();
        }
        return;
    }

    const level = levels[currentLevelIndex];
    const isCorrect = JSON.stringify(userSelection) === JSON.stringify(level.answer);

    if (isCorrect) {
        footer.classList.add('correct');
        document.getElementById('status-message').textContent = "Правильно!";
        actionBtn.textContent = "Продолжить";
    } else {
        footer.classList.add('wrong');
        document.getElementById('status-message').textContent = `Ошибка! Правильно: ${level.answer.join(' ')}`;
        actionBtn.textContent = "Продолжить";
        actionBtn.style.backgroundColor = "#ff4b4b";
    }
};

// Запуск первого уровня
initLevel();