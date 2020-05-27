import app from './app'
import './database';

app.listen(app.get('port'), () => console.log('Corriendo aplicacion en el puerto: ' + app.get('port')))