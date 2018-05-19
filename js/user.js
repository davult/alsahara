function Player(_login, _class) {
    this.login = _login;
    this.class = _class;

    if (this.class === 'sorcerer') {
        this.damage_power = 2;
        this.magic_power = 5;
        this.magic_def = 3;
        this.damage_def = 2;
        this.agility = 3;
    }

    if (this.class === 'assassin') {
        this.damage_power = 3;
        this.magic_power = 2;
        this.magic_def = 2;
        this.damage_def = 2;
        this.agility = 5;
    }

    if (this.class === 'mercenary') {
        this.damage_power = 5;
        this.magic_power = 2;
        this.magic_def = 2;
        this.damage_def = 3;
        this.agility = 2;
    }

    this.hp = 20;
}
var data = window.location.href.split('#')[1];
var player = new Player(data.split('%')[0], data.split('%')[1]);
console.log(player);
