
const themeToggle = document.getElementById('themeToggle');
const inputElement = document.getElementById('myInput');

themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('light-theme');
        document.querySelector(".header").classList.add('header-light');
        document.querySelector(".container").classList.add('container-light');
        document.querySelector("#to-do").style.backgroundColor = '#FFF';
        inputElement.style.backgroundColor = '#000'; 
    } else {
        document.body.classList.remove('light-theme');
        document.querySelector(".header").classList.remove('header-light');
        document.querySelector(".container").classList.remove('container-light');
        document.querySelector("#to-do").style.backgroundColor = '#282a2c';
        inputElement.style.backgroundColor = '#fff';
    }
});


