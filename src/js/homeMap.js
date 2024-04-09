(function() {

    const lat =   6.9673419
    const lng = -73.7232909 

    const mapa = L.map('home-map').setView([lat, lng ], 8);
   




    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //console.log("longitudes",lat,lng)

    



    // Icono
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
let marker = new L.marker([lat, lng], {
     draggable: true,
     autoPan: true,
     icon: myIcon // Esta línea se ha movido dentro de las opciones del marcador
  }).addTo(mapa);  //.bindPopup(address);


  




 let markers = new L.FeatureGroup().addTo(mapa);


const consultaPropiedades = async () => {
    try {
        const url = '/api/propiedades'
        const respuesta = await fetch(url)
        const propiedades = await respuesta.json()
        console.log(propiedades);

   
     
         mostrarPropiedades(propiedades)
    } catch(error) {
        console.log(error);
    }
};

const mostrarPropiedades = propiedades =>{
    
    propiedades.forEach(propiedad => {
        const mark = new L.marker([propiedad?.lat , propiedad?.lng], {
            autoPan: true,
            // icon: myIcon // Esta línea se ha movido dentro de las opciones del marcador
        }).addTo(mapa).bindPopup(`
        <div  style="  max-width: 200px; padding: 5px; ">
        <h1   style="font-size: 15px; font-weight: bold; margin-bottom: 10px;">${propiedad.category.name}</h1>
        <div  style="margin-bottom: 5px;">
            <img src="/uploads/${propiedad.image}" alt="${propiedad.image}" style="max-width: 150px; height: auto;">
        </div>
        <div style="margin-bottom: 5px;">${propiedad.title}</div>
        <div style="margin-bottom: 5px; color: #4338ca;"> ${propiedad.price.name}

    </div>`);
        markers.addLayer(mark)
    });
    
};
consultaPropiedades()



})()