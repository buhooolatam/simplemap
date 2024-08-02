// Arreglo de coordenadas de ejemplo
const coordinates = [
    { lat: -17.7333, lng: -63.1333 },
    { lat: -17.7344, lng: -63.1344 },
    { lat: -17.7355, lng: -63.1355 }
];

// Función de inicialización del mapa
function initMap() {
    // Inicializa el mapa centrado en la primera coordenada
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: coordinates[0]
    });

    // Itera sobre cada coordenada y crea un marcador
    coordinates.forEach(coord => {
        const marker = new google.maps.Marker({
            position: coord,
            map: map
        });

        // Agrega un evento de clic a cada marcador
        marker.addListener('click', function() {
            const markerPosition = marker.getPosition();
            const coords = `${markerPosition.lat()}, ${markerPosition.lng()}`;
            console.log('Coordenadas capturadas:', coords);
            // Puedes llamar a cualquier función aquí para manejar las coordenadas
        });
    });
}
