let themeButton;
let lightMode;
let darkMode;
let translations;
let languageSelect;

window.addEventListener('DOMContentLoaded', function() {
    themeButton = document.querySelector('#theme-toggle');
    lightMode = document.querySelector('#mode-light');
    darkMode = document.querySelector('#mode-dark');
    languageSelect = document.querySelector('#language-select');

    checkDarkMode();
    themeButton.addEventListener('click', () => {
        const darkModeStatus = getFromLocalStorage('darkMode') === 'true';
    
        saveIntoLocalStorage('darkMode', !darkModeStatus);
        switchDarkModeButton(!darkModeStatus);    
    })

    fetch('./lang.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            checkLanguage();
        })
        .catch(error => console.error("Error loading translations:", error));

    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        saveIntoLocalStorage('language', selectedLanguage);
        applyTranslations(selectedLanguage);
    });
});

function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}

function saveIntoLocalStorage(key, value) {
    return localStorage.setItem(key, value);
}

function checkDarkMode() {
    const darkModeStatus = getFromLocalStorage('darkMode') === 'true';
    switchDarkModeButton(darkModeStatus);
}

function checkLanguage() {
    const savedLanguage = getFromLocalStorage('language') || 'en';
    languageSelect.value = savedLanguage;
    applyTranslations(savedLanguage);
}

function switchDarkModeButton(darkModeStatus) {
    if (!darkModeStatus) {
        document.body.classList.remove('dark-mode');
        darkMode.style['display'] = 'none';
        lightMode.style['display'] = 'inline';

        return;
    }

    document.body.classList.add('dark-mode');
    lightMode.style['display'] = 'none';
    darkMode.style['display'] = 'inline';
}

function applyTranslations(lang) {
    if (!translations[lang]) {
        console.error("Missing translations for language:", lang);
        return;
    }

    updateTextContent('title', translations[lang].title);
    updateTextContent('h1', translations[lang].title);
    updateTextContent('#nav-home', translations[lang].home);
    updateTextContent('#nav-products', translations[lang].products);
    updateTextContent('#nav-about', translations[lang].about);
    updateTextContent('.hero h2', translations[lang].welcomeMessage);
    updateTextContent('.hero .btn', translations[lang].shopNow);
    updateTextContent('.about h2', translations[lang].aboutUsTitle);
    updateTextContent('.about p', translations[lang].aboutUsText);
    updateTextContent('.filters h2', translations[lang].filters);
    updateTextContent('#price-sort option[value="price-low"]', translations[lang].priceLow);
    updateTextContent('#price-sort option[value="price-high"]', translations[lang].priceHigh);
    updateTextContent('footer p', translations[lang].footerText);
}

function updateTextContent(selector, text) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = text;
    }
}
