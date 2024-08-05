// Función de inicialización del mapa
function initMap() {
    // Inicializa el mapa centrado en la primera coordenada
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: -17.7333, lng: -63.1333 } // Un centro predeterminado
    });

    // Cargar coordenadas desde el archivo JSON
    fetch('coor1.json')
        .then(response => response.json())
        .then(data => {
            const coordinates = data.coordinates.map(coord => ({
                lat: coord[1],
                lng: coord[0]
            }));

            // Ajustar el centro del mapa a la primera coordenada
            if (coordinates.length > 0) {
                map.setCenter(coordinates[0]);
            }

            // Itera sobre cada coordenada y crea un marcador
            coordinates.forEach(coord => {
                const marker = new google.maps.Marker({
                    position: coord,
                    map: map,
                    icon: {
                        path: "M12 2C8.13 2 5 5.13 5 9c0 3.25 2.6 5.89 6.24 8.85.37.32.85.32 1.22 0C16.4 14.89 19 12.25 19 9c0-3.87-3.13-7-7-7zm0 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z",
                        fillColor: "#B0B0B0", // Color plomo
                        fillOpacity: 1,
                        scale: 1.5, // Escala más pequeña
                        strokeWeight: 0,
                        anchor: new google.maps.Point(12, 24)
                    }
                });

                // Crear infowindow para cada marcador
                const infowindow = new google.maps.InfoWindow({
                    content: '<div style="text-align: center;">' +
                             '<button id="registerBtn">Registrar</button>' +
                             '</div>',
                });

                // Agrega un evento de clic a cada marcador para mostrar el infowindow
                marker.addListener('click', function() {
                    infowindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });

                    // Evento de clic para el botón "Registrar"
                    google.maps.event.addListenerOnce(infowindow, 'domready', () => {
                        document.getElementById('registerBtn').addEventListener('click', function() {
                            const markerPosition = marker.getPosition();
                            const coords = `${markerPosition.lat()},${markerPosition.lng()}`;
                            console.log('Coordenadas capturadas:', coords);

                            // Abrir el formulario en Vercel con las coordenadas capturadas
                            window.open(`https://form1-orpin.vercel.app/?coords=${encodeURIComponent(coords)}`, '_blank');

                            // Cambiar el color del marcador a rojo
                            marker.setIcon({
                                path: "M12 2C8.13 2 5 5.13 5 9c0 3.25 2.6 5.89 6.24 8.85.37.32.85.32 1.22 0C16.4 14.89 19 12.25 19 9c0-3.87-3.13-7-7-7zm0 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z",
                                fillColor: "#FF0000", // Cambiar color a rojo
                                fillOpacity: 1,
                                scale: 1.5,
                                strokeWeight: 0,
                                anchor: new google.maps.Point(12, 24)
                            });
                        });
                    });
                });
            });
        })
        .catch(error => console.error('Error al cargar las coordenadas:', error));
}
