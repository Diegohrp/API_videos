const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

//URL de la base remota, para conectarse con ésta.
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    //Creamos un nuevo cliente de mongo haciendo uso de la lib oficial de mongo
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //nombre de la base remota.
    this.dbName = DB_NAME;
  }
  connect() {
    /*Se utiliza el patron singleton, se requiere una sóla instancia de la clase para no saturar de conexiones
    connection es una atributo de tipo Instance, de la clase MongoLib, se trata de una instancia.
    Se realiza un condicional para saber si la instancia existe, si no existe se crea la insrancia.*/
    if (!MongoLib.connection) {
      //Se realiza la instancia
      MongoLib.connection = new Promise((resolve, reject) => {
        //Se realiza la conexión con el cliente de MongoDB, puede haber un error o una conexión existosa
        this.client.connect((err) => {
          //Error first, si hay un error, la promesa se rechaza.
          if (err) {
            reject(err);
          } else {
            /*No hay error, la promesa se resuelve con la ceación de una nueva instancia DB, recibe como parámetro 
            el nombre de la base de datos.*/
            console.log('Connected');
            resolve(this.client.db(this.dbName));
          }
        });
      });
    }
    /*Se retorna la conexión, Ya sea la instancia DB mongo o un error, 
    dependiendo de si se resolvió o rechazó la promesa.*/
    return MongoLib.connection;
  }

  //Definimos los métodos que hacen el CRUD en nuestra base.
  /*Todos los métodos reciben el parámetro collection, que es el nombre 
  de la colección en la base, para este caso "movies" */

  //Obtiene todos los datos (peliculas)
  getAll(collection, query) {
    //Cuando se ejecuta este método, se devuelve la instancia (MongoLib.connection)
    //Se ejecuta de manera asíncrona y se devuelve una promesa resuelta o rechazada
    //con .then() se accede al valor de la promesa.
    //dbInstance el el valor de la promesa
    //Con dbInstance se realiza la búsqueda de la información en la base de datos
    //Un query que es una expresión que indica qué datos obtener, para este caso TODOS.
    //Como son varios datos, los pasamos a un Array.
    //Se retorna toda esa info.
    return this.connect().then((dbInstance) => {
      return dbInstance.collection(collection).find(query).toArray();
    });
  }
  //Obtiene solo uno (una película)
  getOne(collection, id) {
    return this.connect().then((dbInstance) => {
      return (
        dbInstance
          .collection(collection)
          //Aquí la instrucción de búsqueda en la base es que encuentre sólo 1
          //Cuyo atributo _id sea el id que se le ha pasado.
          //ObjectId es una clase de la librería oficial de Mongo, la cual nos permite crear Id's
          //En este caso se está indicando que el id pasado como parámetro es un ObjectId.
          .findOne({ _id: ObjectId(id) })
      );
    });
  }
  //Crea uno nuevo (una nueva película)
  create(collection, data) {
    return (
      this.connect()
        .then((dbInstance) => {
          //Se inserta una nueva película con los datos especificados en data
          return dbInstance.collection(collection).insertOne(data);
        })
        //Lo que se devuelve es el id de los datos insertados
        //Se accede a este con result.insertedId
        .then((result) => result.insertedId)
    );
  }

  //Actualiza la información (de una película)
  update(collection, id, data) {
    return this.connect()
      .then((dbInstance) => {
        return (
          dbInstance
            .collection(collection)
            //Actualiza uno, cuyo _id sea el id que se pasó como parámetro
            //Recuerda utilizar ObjectId para realizar la búsqueda
            //$set: data es para insertar la información por ejemplo {"title":"venom"}
            //$set se encargará de actualizar la información donde corresponde de acuerdo
            //Con la clave-valor del JSON.
            //upsert es para indicar que alcualice la info, y si esa info no existia previamente
            //Entonces que la inserte como nueva info.
            .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
        );
      })
      .then((result) => result.upsertedId || id);
  }
  //Elimina una (una película)
  delete(collection, id) {
    return this.connect()
      .then((dbInstance) => {
        return (
          dbInstance
            .collection(collection)
            //Eliminar la info cuyo _id es el que se pasó como parámetro.
            .deleteOne({ _id: ObjectId(id) })
        );
      })
      .then(() => id);
  }
}
//Se exporta la librería.
module.exports = MongoLib;
