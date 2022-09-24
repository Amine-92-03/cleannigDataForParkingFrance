import express from 'express'
import bodyParser from "body-parser"
import fetch from 'node-fetch'
import fs, { WriteStream } from 'fs';

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./FrontEnd/'));

async function getDataCommunes(){
    let url = 'https://www.data.gouv.fr/fr/datasets/r/dbe8a621-a9c4-4bc3-9cae-be1699c5ff25'
    let data = await fetch(url)
    let text = await data.text()
    const writeStream = fs.createWriteStream("data/communesFrance.csv");
    text.split('\n').forEach(async elm =>{
        let res = writeStream.write(elm+'1\n')})
    writeStream.end()
}

getDataCommunes()

