// Отримуємо наше зображення
const image = document.getElementById('image-target');

// Отримуємо елементи форми
const form = document.getElementById('imgPropertiesForm');
const heightInput = document.getElementById('imgHeight');
const widthInput = document.getElementById('imgWidth');
const borderWidthInput = document.getElementById('imgBorderWidth');
const borderColorInput = document.getElementById('imgBorderColor');
const altInput = document.getElementById('imgAlt');

// Змінні початкових значень
const height = image.height;
const width = image.width;
const borderWidth = getComputedStyle(image).borderWidth.replace('px','');
const borderColor = getComputedStyle(image).borderColor;
const alt = image.alt;

// Записуємо в інпути початкові значення
heightInput.value = height;
widthInput.value = width;
borderWidthInput.value = borderWidth;
borderColorInput.value = borderColor;
altInput.value = alt;

image.style.width = width + 'px';
image.style.height = height + 'px';
image.style.borderWidth = borderWidth + 'px';
image.style.borderColor = borderColor;

const errorDiv = document.getElementById('errorInfo');

form.addEventListener('submit', changeImageProperties);

function changeImageProperties(event) {
    event.preventDefault();
    //console.log(event);

    const inputs = Array.from(form.elements).filter(el => el.nodeName == 'INPUT');
    console.log(inputs);

    let isValid = true;

    // Перевірка на пустий рядок
    inputs.forEach(input => {
        const val = input.value.trim();

        if (val.length == 0) {
            input.classList.add('input-error');
            errorDiv.textContent = 'Ви повинні заповнити всі поля!';
            errorDiv.classList.add('visible');
            isValid = false;
            return;
        }

        input.classList.remove('input-error');
    });
    if (!isValid) return;

    // Перевірка числових інпутів
    inputs.forEach(input => {
        if ( [heightInput, widthInput, borderWidthInput].includes(input) ) {
            const val = input.value.trim();
            const parsedVal = Number.parseFloat(val);

            if ( Number.isNaN(parsedVal) || parsedVal <= 0 ) {
                input.classList.add('input-error');
                errorDiv.textContent = 'Значення ширини, висоти та товщини рамки' +
                   ' мають бути числовими та більшими за нуль!';
                errorDiv.classList.add('visible');
                isValid = false;
                return;
            }

            input.value = parsedVal;
            input.classList.remove('input-error');
        }
    });
    if (!isValid) return;

    // Перевірка альтернативного текста
    const val = altInput.value.trim();
    if ( !/^[a-zA-Z\s]+$/.test(val) ) {
        altInput.classList.add('input-error');
        errorDiv.textContent = 'В поле “Альтернативний текст”, можна вводити' +
            ' тільки латинські символи!';
        errorDiv.classList.add('visible');
        isValid = false;
    } else {
        altInput.value = val;
        altInput.classList.remove('input-error');
    }
    if (!isValid) return;

    errorDiv.classList.remove('visible');

    image.style.width = widthInput.value + 'px';
    image.style.height = heightInput.value + 'px';
    image.style.borderWidth = borderWidthInput.value + 'px';
    image.style.borderColor = borderColorInput.value;
    image.alt = altInput.value;
}