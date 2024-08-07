let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: -17.7333, lng: -63.1333 }
    });

    fetch('coor1.json').then(response => response.json()).then(data => {
        data.coordinates.forEach((coord, index) => {
            const marker = new google.maps.Marker({
                position: { lat: coord[1], lng: coord[0] },
                map: map
            });

            const infowindow = new google.maps.InfoWindow({
                content: `<div style="text-align: center;"><button onclick="redirectToGoogle()">Registrar</button></div>`
            });

            marker.addListener('click', () => {
                infowindow.open(map, marker);
            });
        });
    }).catch(error => console.error('Error al cargar las coordenadas:', error));
}

function redirectToGoogle() {
    window.location.href = "https://www.google.com";
}

function goBack() {
    console.log("Atrás presionado");
}

function resetMap() {
    console.log("Resetear presionado");
}
