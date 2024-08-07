let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: -17.7333, lng: -63.1333 } // Centro predeterminado
    });

    fetch('coor1.json')
        .then(response => response.json())
        .then(data => {
            data.coordinates.forEach((coord, index) => {
                const isRegistered = localStorage.getItem(`marker_${index}`) === 'true';
                const marker = new google.maps.Marker({
                    position: { lat: coord[1], lng: coord[0] },
                    map: map,
                    icon: getMarkerIcon(isRegistered)
                });

                marker.addListener('click', () => {
                    openInfoWindow(marker, index);
                });

                // Si no existe, inicializa el array de marcadores en el mapa
                if (!map.markers) {
                    map.markers = [];
                }
                map.markers.push(marker);
            });
        })
        .catch(error => console.error('Error al cargar las coordenadas:', error));
}

function openInfoWindow(marker, index) {
    const infowindow = new google.maps.InfoWindow({
        content: `<div style="text-align: center;"><button onclick="registerMarker(${index}, marker)">Registrar</button></div>`
    });

    infowindow.open(map, marker);
}

function registerMarker(index, marker) {
    localStorage.setItem(`marker_${index}`, 'true');
    marker.setIcon(getMarkerIcon(true)); // Cambia el icono inmediatamente
    window.location.href = "https://www.google.com"; // Redirección
}

function getMarkerIcon(isRegistered) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: isRegistered ? '#FF0000' : '#D3D3D3',
        fillOpacity: 1,
        scale: 6,
        strokeColor: '#A0A0A0',
        strokeWeight: 1
    };
}

function resetMap() {
    localStorage.clear();
    map.markers.forEach(marker => {
        marker.setIcon(getMarkerIcon(false)); // Restablece los iconos
    });
}

function goBack() {
    window.history.back(); // Implementa funcionalidad real para "Atrás"
}
