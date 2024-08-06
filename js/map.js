function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: -17.7333, lng: -63.1333 } // Centro predeterminado
    });

    fetch('coor1.json')
        .then(response => response.json())
        .then(data => {
            data.coordinates.forEach((coord, index) => {
                const marker = new google.maps.Marker({
                    position: { lat: coord[1], lng: coord[0] },
                    map: map,
                    icon: getCustomIcon() // Usamos una función para obtener el ícono
                });

                const infowindow = new google.maps.InfoWindow({
                    content: `<div id="info${index}">
                                <button id="registerBtn${index}">Registrar</button>
                              </div>`
                });

                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                    google.maps.event.addListenerOnce(infowindow, 'domready', () => {
                        document.getElementById(`registerBtn${index}`).addEventListener('click', function() {
                            const coords = `${marker.getPosition().lat()}, ${marker.getPosition().lng()}`;
                            console.log('Coordenadas capturadas:', coords);
                            // Lógica para abrir la página con coordenadas
                            window.open(`https://google.com/?coords=${encodeURIComponent(coords)}`, '_blank');
                        });
                    });
                });
            });
        })
        .catch(error => console.error('Error al cargar las coordenadas:', error));
}

function getCustomIcon() {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#D3D3D3',
        fillOpacity: 1,
        scale: 6,
        strokeColor: '#A0A0A0',
        strokeWeight: 1
    };
}
