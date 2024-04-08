(function() {

    const lat = document.querySelector('#lat').textContent
    const lng = document.querySelector('#lng').textContent
    const address = document.querySelector('#address').textContent

    const mapa = L.map('Map').setView([lat, lng ], 16);
    let marker;

    //Utilizar provider y el geocoder
    //const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    console.log("longitudes",lat,lng)

    //Icono
    var myIcon = L.icon({
        iconUrl: 'https://brsantander.com.co/wp-content/uploads/2023/04/pin-brsantander.png',
        iconSize: [48, 48],  // Ajusta el tamaño del ícono (ancho, altura)
        iconAnchor: [24, 48],  // Ajusta el punto de anclaje del ícono (horizontal, vertical)
        popupAnchor: [0, -48],  // Ajusta el punto de anclaje del popup (horizontal, vertical)
        shadowUrl: 'https://brsantander.com.co/wp-content/uploads/2023/04/pin-brsantander.png',
        shadowSize: [50, 50],  // Ajusta el tamaño de la sombra (ancho, altura)
        shadowAnchor: [24, 48]  // Ajusta el punto de anclaje de la sombra (horizontal, vertical)
    });





  // El Pin
marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true,
    icon: myIcon // Esta línea se ha movido dentro de las opciones del marcador
}).addTo(mapa).bindPopup(address);


 


    // // detectar el movimiento
    // marker.on('moveend', function(event){
    //     marker = event.target
    //     const posicion = marker.getLatLng()
    //     // console.log(marker);
    //     mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))

    //     //Obtener la información de las calles
    //     geocodeService.reverse().latlng(posicion, 13).run(function(error, resultado){
    //         console.log("Movieron el pin" , resultado)


    //         // Crear contenido HTML personalizado para la burbuja emergente
    //         var popupContent = `
    //             <div>
    //                 <h3><strong style="color: #f4a21b;">BIENES RAICES SANTANDER</strong></h3>
    //                 <p>${resultado.address.LongLabel}</p>
    //                 <p>País: ${resultado.address.CntryName}</p>
    //                 <p>Regiòn: ${resultado.address.Region}  ${resultado.address.City}</p>
    //                 <p>Dirección: ${resultado.address.Address}</p>
    //             </div>
    //         `;

    //         marker.bindPopup(popupContent, {
    //             closeButton: false,  // Opcional: Si deseas mostrar un botón de cierre en la burbuja emergente
    //             minWidth: 300  // Opcional: Establecer el ancho mínimo de la burbuja emergente en píxeles
    //         });
    //         // marker.bindPopup("hol" +  resultado.address.LongLabel)

    //         //mostrar la dirección
    //         document.querySelector('.calle').textContent = resultado.address.Address ?? ''

    //         //llenar los campos
    //         document.querySelector('#address').value = resultado?.address?.Address ?? ''
    //         document.querySelector('#lat').value = resultado?.latlng?.lat
    //         document.querySelector('#lng').value = resultado?.latlng?.lng

    //     })
    // })

})()