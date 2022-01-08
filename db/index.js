const Sequelize = require('sequelize'); //trazendo a biblioteca, objeto.

const sequelize = new Sequelize({ //intanciando apartir do obj princiapal
  dialect: 'sqlite',
  storage: 'movies.db',
  //logging: false //to disable logging. This will prevent Sequelize from outputting SQL to the console.
  // global options
  /*define: {
    freezeTableName: true,
    timestamps: false,
  },*/
}); //model options can be set globally by passing the define options object to the Sequelize constructor

const db = {
  sequelize,
  Sequelize,
  models: {},
};

db.models.Movie = require('./models/movie.js')(sequelize);
// import new model
db.models.Person = require('./models/person.js')(sequelize);

module.exports = db;