var style = MAP_STYLE;

function CenterControl(controlDiv, map) {
    // CSS para a borda do controlador.
    var controlUI = document.createElement('div');
    this.control_ui = controlUI;

    controlUI.style.backgroundColor = '#5a4899';
    controlUI.style.border = '2px solid #5a4899';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'AAA';
    controlDiv.appendChild(controlUI);

    // CSS para o interior do controlador.
    var controlText = document.createElement('div');
    this.control_text = controlText;

    controlText.style.color = '#facc6c';
    controlText.style.fontFamily = "Roboto, 'Open Sans', sans-serif";
    controlText.style.fontSize = '17px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'aaaaa';
    controlUI.appendChild(controlText);
    // Para adicionar eventos:
    //controlUI.addEventListener('click', function () {});
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 18,
        styles: style,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    });

    let circulo = new google.maps.Circle({
        strokeColor: '#8800FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#8800FF',
        fillOpacity: 0.35,
        map: map,
        radius: 50,
    });

    let player_marker = new google.maps.Marker({
        map: map,
        title: player.login,
        icon: `img/${player.class}.png`
    });

    //Inimigos:

    let enemy = new google.maps.Marker({
        map: map,
        title: 'Inimigo',
        icon: `img/enemy.png`,
        id: 1
    });

    let enemy_2 = new google.maps.Marker({
        map: map,
        title: 'Inimigo 2',
        icon: `img/enemy.png`, 
        id: 2
    });

    // Controladores

    var infoWindow = new google.maps.InfoWindow({ map: map });
    var logoutControlDiv = document.createElement('div');
    var logoutButton = new CenterControl(logoutControlDiv, map);

    logoutButton.control_text.innerHTML = 'Log out';
    logoutButton.control_ui.addEventListener('click', function () {
        window.location = 'index.html';
    });

    logoutControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(logoutControlDiv);

    // Geonavegacao:
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            map.setCenter(pos);

            player_marker.setPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });

            circulo.setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });

            map.setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });

            //Inimigos:

            enemy.setPosition({
                lat: position.coords.latitude+0.0004,
                lng: position.coords.longitude+0.0004
            });

            enemy_2.setPosition({
                lat: position.coords.latitude+0.0002,
                lng: position.coords.longitude+0.0002
            });

            enemy.addListener('click', function(){
                if (circulo.getBounds().contains(enemy.position)) {
                    var div = `<style>a {text-decoration: none; font-color: #000;}</style><a href="battle.html#${player.login}%${player.class}%${enemy.id}">Click here to battle!</a>`; 
                    infoWindow.setContent(div);
                    infoWindow.setPosition(enemy.position);                    
                    infoWindow.open(map);
                    enemy.setPosition(null);
                } else {
                    infoWindow.setContent('Enemy out of range!');
                    infoWindow.setPosition(enemy.position);                    
                    infoWindow.open(map);
                }
            });

            enemy_2.addListener('click', function(){
                if (circulo.getBounds().contains(enemy_2.position)) {
                    var div = `<style>a {text-decoration: none; font-color: #000;}</style><a href="battle.html#${player.login}%${player.class}%${enemy_2.id}">Click here to battle!</a>`; 
                    infoWindow.setContent(div);
                    infoWindow.setPosition(enemy_2.position);                    
                    infoWindow.open(map);
                    enemy_2.setPosition(null);
                } else {
                    infoWindow.setContent('Enemy out of range!');
                    infoWindow.setPosition(enemy_2.position);                    
                    infoWindow.open(map);
                }
            });

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });

        navigator.geolocation.watchPosition(function (position) {  
            circulo.setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            
            player_marker.setPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            
            map.setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Erro: O serviço de geolocalização falhou.' :
        'Erro: Seu navegador não suporta o serviço de geolocalização.');
}
/*
https://maps.googleapis.com/maps/api/staticmap?key=YOUR_API_KEY&center=-23.694143362691115,-46.76815936565402&zoom=11&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x221a3c&style=element:labels%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x8ec3b9&style=element:labels.text.stroke%7Ccolor:0x1a3646&style=feature:administrative%7Celement:geometry%7Ccolor:0xfbcc6c%7Cvisibility:off&style=feature:administrative.land_parcel%7Ccolor:0x64779e%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:geometry%7Ccolor:0xfbcc6c&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64779e&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0x2f254c&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0x283d6a&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x6f9ba5&style=feature:poi%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x023e58&style=feature:road%7Celement:geometry%7Ccolor:0x304a7d&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:road.highway%7Celement:geometry%7Ccolor:0xfbcc6c&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xfbcc6c&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0x023e58&style=feature:transit%7Cvisibility:off&style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0xfbcc6c&style=feature:water%7Celement:geometry%7Ccolor:0x0e1626&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70&size=480x360
*/
