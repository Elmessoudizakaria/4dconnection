const fourd = require("./node-4d");
const settings = { host: 'localhost', port: 19812, user: 'Super_Utilisateur', password: '' };
const connection = fourd.createConnection( settings );

const queryExecuter = (query,cb)=>{
    connection.connect( function( error ) {
        if( error ){
            console.log( "Cannot connect to database: " + error );
            return;
        }else{
            connection.query( query, 1101, function( error, result, fields ) {
                if( error ) {
                    console.log(error);
                    console.log( "Failed to run query: " + error );
                    return;
                } else {
                    console.log( "Row count: " + result.rowCount );
                    console.log( "Column count: " + result.columnCount );
                    result.rows.forEach( function( row ) {
                        console.log( row );
                    });
                    cb(result.rows);
                }
            });
        }
    });
}

module.exports = {
    queryExecuter
}
