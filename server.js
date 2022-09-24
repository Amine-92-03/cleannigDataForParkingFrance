import http from 'http'
import app from './app.js'
// require('./utils/dbConnexion')
const server = http.createServer(app)

// app.set('port', process.env.PORT || 4001)
// server.listen(process.env.PORT || 4001, (err)=>{
//     if(!err){
//         console.log('Listen to port:', 4001);
//     }
//     else {
//         console.log('Dont listen to any port');
//     }
// })