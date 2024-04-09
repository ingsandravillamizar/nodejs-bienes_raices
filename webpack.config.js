import path from 'path'

export default {
    mode: 'development',
    entry:{
        map    : './src/js/configMap.js',
        addImage: './src/js/addImage.js',
        showMap: './src/js/showMap.js',
        homeMap: './src/js/homeMap.js'
    },
    output:{
        filename : '[name].js',
        path: path.resolve('public/js')
    }
}

//El mode se debe cambiar a produccion  y se configuran dos objetos:  archivo de entrada y archivo de salida