import mongoose, { ConnectionOptions} from 'mongoose';
import config from './Config';

const DB_Options: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  user: config.database.USER,
  pass: config.database.PASSWORD,
  useFindAndModify: false 
};

mongoose.connect(config.database.URI, DB_Options);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Conectado a Mongodb.....');
});

connection.on('error', (err) => {
  console.log('Mongodb Tiene Error:', err);
  process.exit();
});