// Función de inicialización del mapa
function initMap() {
    console.log("Iniciando mapa...");
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: -17.7333, lng: -63.1333 } // Centro predeterminado
    });

    // Cargar coordenadas desde el archivo JSON
    fetch('coor1.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            data.coordinates.forEach((coord, index) => {
                const latLng = new google.maps.LatLng(coord[1], coord[0]);
                const marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: "#B0B0B0",
                        fillOpacity: 1,
                        strokeWeight: 0
                    }
                });

                marker.addListener('click', () => {
                    console.log("Marcador clickeado:", latLng.toString());
                    handleMarkerClick(latLng);
                });
            });
        })
        .catch(error => console.error('Error al cargar las coordenadas:', error));
}

function handleMarkerClick(latLng) {
    const coords = `${latLng.lat()},${latLng.lng()}`;
    console.log('Coordenadas capturadas al hacer clic en el marcador:', coords);
    // Aquí puedes agregar más lógica si necesitas manejar las coordenadas de manera específica
}
