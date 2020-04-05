
// ===========================================
//  PUERTO
// ===========================================

process.env.PORT = process.env.PORT || 3000;



// ===========================================
//  ENTORNO
// ===========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



// ===========================================
//  DATA BASE
// ===========================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';
}else{

    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//mongodb://localhost:27017/cafe

//mongodb://mongodb+srv://admin_data_base:BWeODBB6RD9tNTR7@cluster0-1am12.mongodb.net/cafe