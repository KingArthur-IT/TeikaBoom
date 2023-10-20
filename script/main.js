//dropdowns
const dropdownsArr = ['park', 'tariff']

dropdownsArr.forEach(el => {
    document.querySelector(`#${el}`).addEventListener('click', () => {
        document.querySelector(`#${el}`).classList.toggle('open');
    });

    document.querySelectorAll(`#${el} .dropdown__item`).forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector(`#${el} .dropdown__value`).innerHTML = item.innerHTML;
            document.querySelector(`#${el}-value`).innerHTML = item.innerHTML;
            document.querySelector(`#${el}-value`).classList.add('filled');
            document.querySelector(`#${el}-measure`).classList.add('d-none');
            document.querySelector(`#${el}-value-check`).innerHTML = item.innerHTML;
            calculateSumm();
        })
    })
})

//open info modal
document.querySelector('#open-info-modal').addEventListener('click', () => {
    document.querySelector('#modal-info').classList.add('show');
})

//open buy ticket modal
document.querySelector('#buy-ticket-btn').addEventListener('click', () => {
    const fioWrapper = document.querySelector('#fio');
    const fioValue = fioWrapper.querySelector('input').value;

    const emailWrapper = document.querySelector('#email');
    const emailValue = emailWrapper.querySelector('input').value;

    const phoneWrapper = document.querySelector('#phone');
    const phoneValue = phoneWrapper.querySelector('input').value;

    fioWrapper.querySelector('.input-wrapper__label').classList.remove('invalid');
    emailWrapper.querySelector('.input-wrapper__label').classList.remove('invalid');
    phoneWrapper.querySelector('.input-wrapper__label').classList.remove('invalid');

    let isAllFields = true;

    if (fioValue.length < 10){
        fioWrapper.querySelector('.input-wrapper__label').classList.add('invalid');
        isAllFields = false;
    }
    if (!validateEmail(emailValue)){
        emailWrapper.querySelector('.input-wrapper__label').classList.add('invalid');
        isAllFields = false;
    }
    if (phoneValue.length !== 16){
        phoneWrapper.querySelector('.input-wrapper__label').classList.add('invalid');
        isAllFields = false;
    }

    if (isAllFields){
        document.querySelector('#modal-check').classList.add('show');
        document.querySelector('body').classList.add('no-scroll');
    }
})

//open pay modal
document.querySelector('#payment-btn').addEventListener('click', () => {
    document.querySelector('#modal-check').classList.remove('show');
    document.querySelector('#modal-pay').classList.add('show');
    document.querySelector('body').classList.add('no-scroll');
})

//open contacts modal
document.querySelectorAll('.open-contacts-modal').forEach(el => {
    el.addEventListener('click', () => {
        document.querySelector('#modal-contact').classList.add('show');
        document.querySelector('body').classList.add('no-scroll');
    })
})


//close modals
document.querySelectorAll('.modal').forEach(el => {
    el.addEventListener('click', () => {
        el.classList.remove('show');
        document.querySelector('body').classList.remove('no-scroll');
    })
})
document.querySelectorAll('.modal__hero').forEach(el => {
    el.addEventListener('click', (e) => e.stopPropagation());
})

//tickes count
const ticketsCountInput = document.querySelector('#tickets-count input');
ticketsCountInput.addEventListener('input', () => {
    const newVal = ticketsCountInput.value;
    if (!newVal || newVal < 1 || newVal > 50){
        document.querySelector('#tickets-count .input-wrapper__label').classList.add('invalid');
        document.querySelector('#tickets-count-value').classList.remove('filled');
        document.querySelector('#tickets-count-value').innerHTML = '';
        calculateSumm();
    } else {
        document.querySelector('#tickets-count-value').innerHTML = newVal;
        document.querySelector('#tickets-count-value').classList.add('filled');
        document.querySelector('#tickets-count .input-wrapper__label').classList.remove('invalid');
        calculateSumm();
        document.querySelector('#ticket-value-check').innerHTML = newVal + 'шт.'
    }
})

//phone
const phoneInput = document.querySelector('#phone input');
phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneMask(phoneInput.value);
    document.querySelector('#phone-value-check').innerHTML = phoneInput.value;
})

function calculateSumm(){
    const count = document.querySelector('#tickets-count input').value;
    const tariffHtml = document.querySelector('#tariff-value').innerHTML;
    const park = document.querySelector('#park-value').innerHTML;

    let tariff = 0;
    if (String(tariffHtml).includes('1100'))
        tariff = 1100;
    if (String(tariffHtml).includes('1200'))
        tariff = 1200;
    if (String(tariffHtml).includes('1700'))
        tariff = 1700;
    if (String(tariffHtml).includes('2350'))
        tariff = 2350;

    if (tariff !== 0 && park !== '' && count && count >=1 && count <= 50){
        document.querySelector('#payment-total').innerHTML = tariff * count;
        document.querySelector('#payment-total').classList.add('filled');
        document.querySelector('#buy-ticket-btn').classList.remove('d-none');
        document.querySelector('.order-form__confirm').classList.remove('d-none');
        document.querySelector('#total-pay-summ').innerHTML = tariff * count + 'р.';
        document.querySelector('#total-pay-summ-btn span').innerHTML = tariff * count;
    } else {
        document.querySelector('#payment-total').innerHTML = '';
        document.querySelector('#payment-total').classList.remove('filled');
        document.querySelector('#buy-ticket-btn').classList.add('d-none');
        document.querySelector('.order-form__confirm').classList.add('d-none');
    }
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

function phoneMask(phone) {
    return '+7' + phone
            .replace('+7', '')
            .replace(/\D/g, '')
            .replace(/^(\d)/, '($1')
            .replace(/^(\(\d{3})(\d)/, '$1) $2')
            .replace(/(\d{3})(\d{1,5})/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
}


//payment modal
const cardNumInput = document.querySelector('#card-num');
const cardDateInput = document.querySelector('#card-date');
const cardCvvInput = document.querySelector('#card-cvv');

cardNumInput.addEventListener('input', () => {
    cardNumInput.value = formatCreditCardNumber(cardNumInput.value);
})
cardDateInput.addEventListener('input', () => {
    cardDateInput.value = formatExpiryDate(cardDateInput.value);
})
cardCvvInput.addEventListener('input', () => {
    cardCvvInput.value = formatCvvCode(cardCvvInput.value);
})

function formatCreditCardNumber(cardNumber) {
    return cardNumber
        .replace(/\D/g, '') // Удаляем все символы, кроме цифр
        .replace(/(\d{4})/g, '$1 ') // Разбиваем на группы по 4 цифры
        .slice(0, 19)
}

function formatExpiryDate(dateValue) {
    const input = dateValue.replace(/\D/g, ""); // Удаляем все символы, кроме цифр
    let formattedValue = "";

    if (input.length > 0) {
        const month = input.slice(0, 2); // Получаем первые две цифры (месяц)
        if (month <= 12){
            formattedValue = month; 
        } else return formattedValue;

        if (input.length > 2) {
            formattedValue += "/" + input.slice(2, 4); // Добавляем разделитель и следующие две цифры (год)
        }
    }

    return formattedValue;
}

function formatCvvCode(value){
    return value.replace(/\D/g, '').slice(0, 3)
}

//contact modal
const contactPhoneInput = document.querySelector('#contact-phone');
const contactCheckbox = document.querySelector('#contact-confirm');

contactPhoneInput.addEventListener('input', () => {
    contactPhoneInput.value = phoneMask(contactPhoneInput.value);
})

document.querySelector('#booking-btn').addEventListener('click', () => {
    contactPhoneInput.classList.remove('invalid');
    document.querySelector('#contact-confirm-text').classList.remove('invalid');

    if (contactPhoneInput.value.length !== 16){
        contactPhoneInput.classList.add('invalid');
    }
    if(!contactCheckbox.checked){
        document.querySelector('#contact-confirm-text').classList.add('invalid');
    }
})

//sunscribe section
document.querySelector('#subscribe-btn').addEventListener('click', () => {
    const subsribeName = document.querySelector('#subscribe-name');
    const subsribeEmail = document.querySelector('#subscribe-email');

    subsribeName.classList.remove('invalid');
    subsribeEmail.classList.remove('invalid');

    if (subsribeName.value.length < 8){
        subsribeName.classList.add('invalid');
    }
    if (!validateEmail(subsribeEmail.value)){
        subsribeEmail.classList.add('invalid');
    }
})
id="subscribe-email"