import express from 'express'
import bodyParser from "body-parser"
import fetch from 'node-fetch'
import dbConfig from './utils/dbConn.js'
import sql from 'mssql'
import {sqlInsert, sqlDelete, sqlCount} from './models/TsqlParkingsFrance.js'
import http from 'http'

import fastcsv from 'fast-csv';
import fs, { WriteStream } from 'fs';

const app = express()
var pool = await sql.connect(dbConfig)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./FrontEnd/'));


async function getDataCommunes(){
    let url = 'https://www.data.gouv.fr/fr/datasets/r/dbe8a621-a9c4-4bc3-9cae-be1699c5ff25'
    let data = await fetch(url)
    let text = await data.text()
    let nombreTotalLignes= text.split('\n').length
    let header = text.split('\n')[0].split(',')
    let nombreChapms = header.length
    // console.log(header.length)
    // console.log(nombreTotalLignes);
    const writeStream = fs.createWriteStream("out.csv");
    text.split('\n').forEach(async elm =>{
        let res = writeStream.write(elm+'1\n')})
    writeStream.end()
}

getDataCommunes()

