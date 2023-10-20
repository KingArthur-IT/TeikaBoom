//dropdowns
const dropdownsArr = ['park', 'tariff']

dropdownsArr.forEach(el => {
    document.querySelector(`#${el}`).addEventListener('click', () => {
        document.querySelector(`#${el}`).classList.toggle('open');
    });

    document.querySelectorAll(`#${el} .dropdown__item`).forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector(`#${el} .dropdown__value`).innerHTML = item.innerHTML;
        })
    })
    
})

//open info modal
document.querySelector('#open-info-modal').addEventListener('click', () => {
    document.querySelector('#modal-info').classList.add('show');
})

//open buy ticket modal
document.querySelector('#buy-ticket-btn').addEventListener('click', () => {
    document.querySelector('#modal-check').classList.add('show');
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