let map;

function initMap() {
    const mapOptions = {
        center: { lat: -17.713042, lng: -63.180106 },
        zoom: 13
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    fetch('coor1.json')
        .then(response => response.json())
        .then(data => {
            applyFilter(data.coordinates); // Llama a la función de aplicar filtro
        })
        .catch(error => console.error('Error al cargar las coordenadas:', error));
}

function applyFilter(coordinates) {
    const filtro = document.getElementById('filtroTiendas').value;
    const filteredCoordinates = coordinates.filter(coord => {
        if (filtro === 'todos') return true;
        if (filtro === 'conEquipo' && coord.tag === 'conEquipo') return true;
        if (filtro === 'sinProducto' && coord.tag === 'sinProducto') return true;
        return false;
    });

    filteredCoordinates.forEach((coord, index) => {
        const isRegistered = localStorage.getItem(`marker_${index}`) === 'true';
        const marker = new google.maps.Marker({
            position: { lat: coord.lat, lng: coord.lng },
            map: map,
            icon: getMarkerIcon(isRegistered)
        });
        marker.addListener('click', () => {
            openInfoWindow(marker, index);
        });
        markers.push(marker);
    });
}

// Actualiza los marcadores cuando cambia el filtro
document.getElementById('filtroTiendas').addEventListener('change', () => {
    resetMap(); // Limpia los marcadores existentes
    initMap(); // Recarga el mapa con el nuevo filtro
});


function openInfoWindow(marker, index) {
    const infowindow = new google.maps.InfoWindow({
        content: '<div style="text-align: center;"><button id="registerBtn">Registrar</button></div>'
    });

    infowindow.open(map, marker);

    google.maps.event.addListenerOnce(infowindow, 'domready', () => {
        document.getElementById('registerBtn').onclick = function() {
            registerMarker(index, marker);
        };
    });
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
