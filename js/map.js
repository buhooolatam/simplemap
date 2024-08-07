let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: -17.7333, lng: -63.1333 } // Centro predeterminado
    });

    // Cargar marcadores desde un archivo JSON
    fetch('coor1.json')
        .then(response => response.json())
        .then(data => {
            data.coordinates.forEach((coord, index) => {
                // Verificar si el marcador ha sido registrado previamente
                const isRegistered = localStorage.getItem(`marker_${index}`) === 'true';
                const marker = new google.maps.Marker({
                    position: { lat: coord[1], lng: coord[0] },
                    map: map,
                    icon: getMarkerIcon(isRegistered) // Obtener el ícono según el estado
                });

                // Infowindow con botón de registro
                const infowindow = new google.maps.InfoWindow({
                    content: `<div style="text-align: center;"><button onclick="registerMarker(${index}, marker)">Registrar</button></div>`
                });

                // Evento para mostrar el infowindow al hacer clic
                marker.addListener('click', () => {
                    infowindow.open(map, marker);
                });
            });
        })
        .catch(error => console.error('Error al cargar las coordenadas:', error));
}

// Función para cambiar el icono del marcador
function getMarkerIcon(isRegistered) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: isRegistered ? '#FF0000' : '#008000', // Rojo si está registrado, verde de lo contrario
        fillOpacity: 1,
        scale: 6,
        strokeColor: '#000000',
        strokeWeight: 1
    };
}

// Función para registrar el marcador y cambiar su color
function registerMarker(index, marker) {
    localStorage.setItem(`marker_${index}`, 'true'); // Guardar estado en localStorage
    marker.setIcon(getMarkerIcon(true)); // Actualizar el ícono a registrado
    redirectToGoogle(); // Redireccionar a Google
}

// Redireccionar a Google
function redirectToGoogle() {
    window.location.href = "https://www.google.com"; // Cambiar la URL a Google
}

// Placeholder para funciones de botones
function goBack() {
    console.log("Atrás presionado");
}

function resetMap() {
    console.log("Resetear presionado");
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith("marker_")) {
            localStorage.removeItem(key); // Limpiar localStorage
        }
    });
    window.location.reload(); // Recargar la página para restablecer los marcadores
}
