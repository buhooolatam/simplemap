function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: -17.7333, lng: -63.1333 }
    });

    fetch('coor1.json')
        .then(response => response.json())
        .then(data => {
            data.coordinates.forEach((coord, index) => {
                const marker = new google.maps.Marker({
                    position: { lat: coord[1], lng: coord[0] },
                    map: map,
                    icon: getCustomIcon()
                });

                marker.addListener('click', () => {
                    const infowindow = new google.maps.InfoWindow({
                        content: `<div>
                                    <button onclick="registerAndRedirect(${coord[1]}, ${coord[0]})">Registrar</button>
                                  </div>`
                    });

                    infowindow.open(map, marker);
                });
            });
        })
        .catch(error => console.error('Error al cargar las coordenadas:', error));
}

function registerAndRedirect(lat, lng) {
    console.log('Registro y redirección con coordenadas:', lat, lng);
    // Aquí puedes cambiar el color del marcador si es necesario
    // Redirigir a Google.com o a cualquier URL necesaria
    window.location.href = `https://google.com/?coords=${encodeURIComponent(lat + ',' + lng)}`;
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
