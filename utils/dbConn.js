import dotenv from 'dotenv'
dotenv.config()

const dbConfig = {
    server: process.env.SERVER,
    database: process.env.DATABASE,
   //user: process.env.USER,
    user: process.env.USER_NAME,	
    password: process.env.PASSWORD,
    requestTimeout: 300000,
    port: 1433,
    // pool: {
    //     max: 10,
    //     min: 0,
    //     idleTimeoutMillis: 30000
    // },
    options: {
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        },
        encrypt: true,
        trustServerCertificate: true
    }
}

export default dbConfig
