import app from './app'
    console.log('Conectando el Servidor.....')
app.listen(app.get('port'), () => 

    console.log('Corriendo la aplicacion en el puerto: ' + app.get('port'))

)