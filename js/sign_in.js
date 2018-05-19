var userName = document.querySelector('#username');
var userClass = document.querySelector('#classes');
var enter = document.querySelector('#enter');

enter.addEventListener('click', function () {
    window.location = `map.html#${userName.value}%${userClass.value}`;
});
