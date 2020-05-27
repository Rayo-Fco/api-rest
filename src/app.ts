import express from 'express'
import passport from 'passport'
import cors from 'cors';
import morgan from 'morgan';
import passport_Middleware from './Middlewares/passport';
import config from './Config'
import api from './Routes'

const app = express();

// Puerto 
app.set('port', config.port);


// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passport_Middleware);

app.get('/', (req, res) => {
    return res.send("Bienvenido a mi Aplicacion TS-2020");
  })
  
app.use(api)
  
  export default app;