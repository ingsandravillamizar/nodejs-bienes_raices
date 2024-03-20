import path from 'path'

export default {
    mode: 'development',
    entry:{
        map : './src/js/configMap.js',
    },
    output:{
        filename : '[name].js',
        path: path.resolve('public/js')
    }
}

//El mode se debe cambiar a produccion  y se configuran dos objetos:  archivo de entrada y archivo de salida