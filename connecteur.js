const fourd = require("./node-4d");
const settings = {
    host: 'localhost',
    port: 19812,
    user: 'Super_Utilisateur',
    password: '',
    database: 'sync-test'
};
/*
const createConnection = () => {
    connection.connect(function (error) {
        if (error) {
            console.log("Cannot connect to database: " + error);
            return;
        } else {
            console.log('CONNECTION SUCCESS')
        }
    });
}
*/
const queryExecuter = (query, cb) => {
    const connection = fourd.createConnection(settings);
    console.log('connected : ', connection.connected)
    connection.connect(function (error) {
        if (error) {
            console.log("Cannot connect to database: " + error);
        } else {

            if (connection.connected) {
                connection.query(query, 1101, function (error, result, fields) {
                    if (error) {
                        return cb(error, null);
                    } else {
                        if (!result) {
                            console.log('NO ERRORS')
                        }
                        cb(null, result.rows);
                        connection.end();
                    }
                });
            } else {
                console.log('CONNECTION RETRY !!')
            }
        }
    });
}

module.exports = {
    queryExecuter
}