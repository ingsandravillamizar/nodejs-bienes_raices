import { Dropzone } from 'dropzone'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')


Dropzone.options.showImagen = {
    dictDefaultMessage: 'Arrastra aqui tu imagen',
    acceptedFiles: '.png, .jpg, .jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,   //esto es lo que hace que en automatico suba la imagenes a upload, lo dejamos en falso para que funcione al dar click en el boton
    addRemoveLinks: true,
    dictRemoveFile: 'Eliminar imagen',
    dictMaxFilesExceeded: 'El limite de carga es una imagen',
    method: 'post',
    headers: {
        'X-CSRF-TOKEN':token,      
    },
    paramName: 'image',
    init: function(){
        const dropzone = this
        const btnPublicar = document.querySelector('#publicar')
        btnPublicar.addEventListener('click', function(){
            dropzone.processQueue()
        })

        // si la carga se hizo de forma correcta que me redirija a mis propiedades
        dropzone.on('queuecomplete', function(){
            window.location.href ='/mis-propiedades'
        })
    }
}

 //En el formulalario el boton no puede ser de tipo submit sino button