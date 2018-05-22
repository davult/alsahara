var enemy_life = document.querySelector('#enemy_life');
var player_life = document.querySelector('#player_life');
var player_local = document.querySelector('#player_local');
var atk1 = document.querySelector('#atk1');

player_img = document.createElement('img');
player_img.src = `img/${player.class}.png`;
player_local.appendChild(player_img);

var en = new Player('Ghost', 'mercenary');
var data = window.location.href.split('#')[1];
var eni_id = data.split('%')[2];

atk1.addEventListener('click', function () {
    var dmg = 0;

    if (player.class === 'sorcerer') {
        dmg = (player.magic_power + player.agility) - en.magic_def;
        en.hp -= dmg;
        enemy_life.textContent = `${en.hp}/20`;
        enemy_life.style.width = (en.hp / 20) * 100;
        dmg = 0;
        dmg = (en.damage_power) - player.damage_def;
        player.hp -= dmg;
        player_life.textContent = `${player.hp}/20`;
        player_life.style.width = (player.hp / 20) * 100;
    }

    if (player.class === 'mercenary') {
        dmg = (player.damage_power + player.damage_def) - en.damage_def;
        en.hp -= dmg;
        enemy_life.textContent = `${en.hp}/20`;
        enemy_life.style.width = (en.hp / 20) * 100;
        dmg = 0;
        dmg = (en.damage_power) - player.damage_def;
        player.hp -= dmg;
        player_life.textContent = `${player.hp}/20`;
        player_life.style.width = (player.hp / 20) * 100;
    }

    if (player.class === 'assassin') {
        dmg = (player.damage_power + player.agility) - en.damage_def;
        en.hp -= dmg;
        enemy_life.textContent = `${en.hp}/20`;
        enemy_life.style.width = (en.hp / 20) * 100;
        dmg = 0;
        dmg = (en.damage_power) - player.damage_def;
        player.hp -= dmg;
        player_life.textContent = `${player.hp}/20`;
        player_life.style.width = (player.hp / 20) * 100;
    }

    if (en.hp <= 0) {
        enemy_life.style.color = 'red';
        enemy_life.textContent = 'Morreu, acabou!';
        atk1.value = 'Voltar ao mapa';
        atk1.addEventListener('click', function () {
            window.location = `map.html#${player.login}%${player.class}`;
        });
    }
    
    if (player.hp <= 0) {
        enemy_life.style.color = 'red';
        enemy_life.textContent = 'Tu morreu, já era!';
        atk1.value = 'Voltar ao menu principal';
        atk1.addEventListener('click', function () {
            window.location = `sign_in.html`;
        });
    }
});
