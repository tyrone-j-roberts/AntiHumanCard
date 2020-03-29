const axios = require('axios');

const homeEl = document.getElementById('home');

module.exports = () => {

    if (!homeEl) return;

    const optionsEl = homeEl.getElementsByClassName('options')[0];

    const setupBtnEls = optionsEl.getElementsByClassName('setup-btn');
    for (let i = 0; i < setupBtnEls.length; i++) {
        setupBtnEls[i].addEventListener('click', (e) => {
            e.preventDefault();
            let setupEl = document.getElementById(e.target.dataset.for);
            if (!setupEl) return;
            optionsEl.classList.add('hide');
            setupEl.classList.add('show');
        });
    }

    const backBtnEls = homeEl.getElementsByClassName('back-btn');
    for (let i = 0; i < backBtnEls.length; i++) {
        backBtnEls[i].addEventListener('click', (e) => {
            e.preventDefault();
            e.target.parentNode.classList.remove('show');
            optionsEl.classList.remove('hide');
        })
    }
};