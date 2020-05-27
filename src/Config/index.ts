export default 
{
    port: process.env.PORT || 3000,
    database: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/api-ts',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
      },
    SECRET_TOKEN: "KeyApiTypeScript"

}