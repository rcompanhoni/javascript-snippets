import mongoose from 'mongoose'

require('./api/src/Model/Auth/Client')
require('./api/src/Model/Auth/Code')
require('./api/src/Model/Auth/Token')

require('./api/src/Model/user')
require('./api/src/Model/Conteudo')
require('./api/src/Model/Menor')
require('./api/src/Model/Interessado')
require('./api/src/Model/Interesse')

const db = 'mongodb://localhost:27017/test'

mongoose.connect(db)

mongoose.connection.on('connected', () => {  
  console.log('Mongoose default connection open to ' + db);
}); 

mongoose.connection.on('error', (error) => {  
  console.log('Mongoose default connection error: ' + error);
}); 

mongoose.connection.on('disconnected', () => {  
  console.log('Mongoose default connection disconnected'); 
});

process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});