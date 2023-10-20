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

    fioWrapper.querySelector('.input-wrapper__label').classList.remove('invalid');
    emailWrapper.querySelector('.input-wrapper__label').classList.remove('invalid');

    let isAllFields = true;

    if (fioValue.length < 10){
        fioWrapper.querySelector('.input-wrapper__label').classList.add('invalid');
        isAllFields = false;
    }
    if (!validateEmail(emailValue)){
        emailWrapper.querySelector('.input-wrapper__label').classList.add('invalid');
        isAllFields = false;
    }

    if (isAllFields){
        document.querySelector('#modal-check').classList.add('show');
    }
})

//open pay modal
document.querySelector('#payment-btn').addEventListener('click', () => {
    document.querySelector('#modal-check').classList.remove('show');
    document.querySelector('#modal-pay').classList.add('show');
})

//open contacts modal
document.querySelectorAll('.open-contacts-modal').forEach(el => {
    el.addEventListener('click', () => {
        document.querySelector('#modal-contact').classList.add('show');
    })
})



//close modals
document.querySelectorAll('.modal').forEach(el => {
    el.addEventListener('click', () => {
        el.classList.remove('show');
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