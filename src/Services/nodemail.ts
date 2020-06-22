import nodemailer from "nodemailer"
import ejs from 'ejs'
import config from '../Config'


class Mail {
    

    constructor() {}


    public async SendMail(para:string,asunto:string,data:ejs.Data,template:string):Promise<boolean> {


     let plantilla:string = "";

      ejs.renderFile(__dirname + '/Templates/'+template+'.ejs',data, function(err, data)  {
        if (err) 
        {
            console.log('Error en la creacion de la plantilla');
            // console.log(err.message)
           plantilla = "error"
        }
        else
        {
            plantilla = data
        }
        
    })


    let transporter = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        secure: false,
        auth: {
            user: config.mail.user,
            pass: config.mail.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let optionmail = {
        from: config.tienda.nombre+' <no-reply@franciscojavier.xyz>', // sender address,
        to: para,
        subject: asunto,
        html: plantilla

    }
    if(plantilla != "error"){
        let info = await transporter.sendMail(optionmail,(error, info) => {
            if (error) 
            {
                console.log('Error al enviar el mensaje');
                console.log(error.message);
            }
    
            console.log('Mensaje Enviado!');
            transporter.close();
        });
        return true
    }
    else
    {
        return false
    }


    }

   


}

export default new Mail();

