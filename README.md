# Whatsapp
WhatsApp Clone with MERN stack

## Build Process

- Git Clone or Download the project.
- Install all the dependencies.
- Configure MongoDB's Password and Pusher's in whatsapp-backend/server.js
- Run whatsapp-backend and whatsapp-mern individually and simultaneously.

## Configuration

Change the "secret" key and put your value obtained from the Pusher website.

    const pusher = new Pusher({
        appId: "1129385",
        key: "2e3afc761ec73465655d",
        secret: "secret-key",
        cluster: "us2",
        useTLS: true
      });

Change the mongo admin password.

    const connection_url = 'mongodb+srv://admin:<Password>@cluster0.xzplx.mongodb.net/<whatsappdb>?retryWrites=true&w=majority'
   
    

