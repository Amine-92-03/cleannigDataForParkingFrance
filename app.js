import express from 'express'
import bodyParser from "body-parser"
import fetch from 'node-fetch'
import dbConfig from './utils/dbConn.js'
import sql from 'mssql'
import {sqlInsert, sqlDelete} from './models/Tsql.js'
const app = express()
var pool = await sql.connect(dbConfig)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./FrontEnd/'));
getParkingListData()
.finally(process.exit(1))

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
    }catch(err){
        console.log('error app.js => intergrateDataToDB() !');
    }
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

export default app