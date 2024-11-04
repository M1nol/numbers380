document.getElementById('generateButton').addEventListener('click', () => {
    const operator = document.getElementById('operator').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const numberList = document.getElementById('numberList');
    const spinner = document.getElementById('spinner');

    // Ограничим количество номеров для стабильной работы
    if (quantity < 10 || quantity > 1000) {
        alert('Пожалуйста, выберите количество номеров от 10 до 1000.');
        return;
    }

    // Очистка старого списка и показ спиннера
    numberList.innerHTML = '';
    spinner.classList.remove('hidden');

    // Задержка для имитации загрузки
    setTimeout(() => {
        const generatedNumbers = generatePhoneNumbers(operator, quantity);

        // Генерация HTML разметки одним блоком для оптимизации
        const fragment = document.createDocumentFragment();
        
        generatedNumbers.forEach(number => {
            const numberItem = document.createElement('div');
            numberItem.className = 'number-item';
            
            const numberText = document.createElement('span');
            numberText.innerText = number;
            
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-btn';
            copyButton.innerText = 'Копировать';
            copyButton.onclick = () => copyToClipboard(number);

            numberItem.appendChild(numberText);
            numberItem.appendChild(copyButton);
            fragment.appendChild(numberItem);
        });

        // Добавляем весь список номеров за один раз
        numberList.appendChild(fragment);

        // Скрываем спиннер
        spinner.classList.add('hidden');
    }, 1000);
});

// Функция для генерации номеров
function generatePhoneNumbers(operator, quantity) {
    const prefixes = {
        'Kyivstar': '096',
        'Vodafone': '050',
        'Lifecell': '063'
    };

    const numbers = new Set();
    while (numbers.size < quantity) {
        const number = prefixes[operator] + getRandomInt(1000000, 9999999);
        numbers.add(number);
    }
    return Array.from(numbers);
}

// Функция для копирования номера
function copyToClipboard(number) {
    navigator.clipboard.writeText(number).then(() => {
        alert(`Номер ${number} скопирован!`);
    });
}

// Вспомогательная функция для генерации случайного числа
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
