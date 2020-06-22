export default 
{
    port: process.env.PORT || 3000,
    database: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/api-ts',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
      },
    SECRET_TOKEN: "KeyApiTypeScript",
    Password_Salt: 10,
    mail:{
      host: 'mail.franciscojavier.xyz',
      port: 587,
      user: 'prueba@franciscojavier.xyz',
      pass: 'A193756842'
    },
    tienda:{
      nombre:' Lenceria pruebaa',
      dominio: 'http://www.Tienda.cl'
    }

}