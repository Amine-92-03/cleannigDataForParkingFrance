import express from 'express'
import bodyParser from "body-parser"
import fetch from 'node-fetch'
import dbConfig from './utils/dbConn.js'
import sql from 'mssql'
import {sqlInsert, sqlDelete, sqlCount} from './models/TsqlParkingsFrance.js'
import http from 'http'
// import app from './app.js'
// require('./utils/dbConnexion')

const app = express()
var pool = await sql.connect(dbConfig)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./FrontEnd/'));

getParkingListData()
// getDataCommunes()

async function getParkingListData(){
    console.log('');
    console.log('______________Début intégration____________________\n');
    let url = 'https://www.data.gouv.fr/fr/datasets/r/e32f7675-913b-4e01-b8c8-0a29733e4407'
    let data = await fetch(url)
    let text = await data.text()
    let count = 0
    let nombreTotalParking = text.split('\n').length
    let header = text.split('\n')[0].split(';')
    if(nombreTotalParking !==0){
        DataQueryToDB(sqlDelete()) 
        text.split('\r').forEach((elm,i)=>{
            if(i !== nombreTotalParking -1 && i !== 0){
                let array = elm.split(';')
                let cleanLineData = []
                array.forEach((elm, idx ) => {
                    if(idx<= header.length ){
                        cleanLineData.push(enleveAppost(elm))  
                    }
                }) 
                DataQueryToDB(sqlInsert(cleanLineData)) 
            count++
        }
        })
        console.log('nombre de lignes initiales : ', nombreTotalParking);
        console.log('nombre de lignes initiales : ', count);
        console.log('');
        console.log('________________Fin intégration____________________\n');
        checkIntegration(count)
        return 1
    }else{
        console.log('No data found in open data');
        console.log('');
        console.log('________________Fin intégration____________________\n');
        }
    return 1
}

async function DataQueryToDB(T_sql){
    try{
        let res = await pool.request().query(T_sql)
        return res
    }catch(err){
        console.log('error app.js => intergrateDataToDB() !');
    }
}

async function checkIntegration(nbreDataInt){
    let res = await DataQueryToDB(sqlCount())
    console.log();
    if(res.recordset[0].nbreRecords === nbreDataInt ){
        console.log('Données intégrées avec succès');
        process.exit(1)
    }
    console.log('Perte de données');
    process.exit(0)
}

function enleveAppost(mot){
    let res = false
    let nouveauMot = ''
    for (let i = 0; i < mot.length; i++) {
        if(mot[i] == `'`){
            nouveauMot += '"'
           continue
        }
        nouveauMot += mot[i]
        
    }
    return nouveauMot
}

const server = http.createServer(app)

// export default app