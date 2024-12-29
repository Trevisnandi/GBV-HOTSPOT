// import
const mysql = require('mysql2');

// create a connection
const connect = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '28modeLLo',
    database: 'gbv_reports'
})

//connect to the database
connect.connect( (error) => {
    if(error){
        console.log('An error occured:', error.stack)
        return;
    }

    console.log('DB connected!');
});

    

module.exports =connect