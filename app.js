const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

// async IIFE
(async () => {
    // Sync 'Movies' table. model with database 
    //await Movie.sync();

    // Sync all tables
    await db.sequelize.sync({ force: true });
    try {
        //using promisse.all
        const movieInstances = await Promise.all([
            Movie.create({
              title: 'Toy Story',
              runtime: 81,
              releaseDate: '1995-11-22',
              isAvailableOnVHS: true,
            }),
            Movie.create({
              title: 'The Incredibles',
              runtime: 113,
              releaseDate: '2004-04-14',
              isAvailableOnVHS: true,
            }),
            Movie.create({
                title: 'SALT',
                runtime: 122,
                releaseDate: '2012-06-19',
                isAvailableOnVHS: false,
            }),
            Movie.create({
              title: 'Don\'t look up',
              runtime: 162,
              releaseDate: '2021-12-19',
              isAvailableOnVHS: false,
          }),
            Person.create({
              firstName: 'Lara',
              lastName: 'Santos',
            }),
            Person.create({
              firstName: 'Maria',
              lastName: 'Silvia',
            }),
            Person.create({
              firstName: 'Joao',
              lastName: 'Cardoso',
            }),
            Person.create({
              firstName: 'Pedro',
              lastName: 'Porto',
            }),
          ]);
        const moviesJSON = movieInstances.map(movie => movie.toJSON());
        console.log(moviesJSON);
        
        //TO CREATE
        //New instance of movie using build() method
        const movie4 = await Movie.build({
          title: 'Toy Story 3',
          runtime: 116,
          releaseDate: '2010-06-18',
          isAvailableOnVHS: false,
        });
        await movie4.save(); //save the record
        console.log(movie4.toJSON);
        
        //methods TO READ
        const movieById = await Movie.findByPk(3);
        console.log(movieById.toJSON());

        const movieByRuntime = await Movie.findOne({ where: { runtime: 116 } }); //pega o primeito match
        console.log(movieByRuntime.toJSON());

        //com findAll podemos usar condicao where para buscas mais especificas, caso contrario ele retorna um [] com todos os matches.
        const moviesfindAll = await Movie.findAll({
          where: {
            runtime: 115,
            isAvailableOnVHS: true,
          }
        });
        console.log( moviesfindAll.map(movie => movie.toJSON()));

        //Return a Subset (conjunto) of Data with Attributes. Let's return only IDs and titles from the 'Movies' table.
        const moviesFindByAttibutes = await Movie.findAll({
          attributes: ['id', 'title'], // return only id and title. No SQL msma coisa qdo escolho as colunas q quero mostrar
          where: {
            releaseDate: {
              [Op.gte]: '2004-01-01' //operator greater than or equal to the date. operator property (Op) followed by the operator you want to use inside brackets.
            },
            runtime: {
              [Op.gt]: 115, //greater than 115
            },
            /*title: {
              [Op.endsWith]: 'Story 3',
            },*/
            runtime: {
              [Op.between]: [114, 124]
            }
          },
          //order: [['id', 'DESC']] // IDs in descending order. P/ crescente order = ASC
          order: [['releaseDate', 'ASC']], // dates in ascending order
        });
        console.log(moviesFindByAttibutes.map(movie => movie.toJSON()));

        //TO UPDATE
        const toyStory3 = await Movie.findByPk(5);
        toyStory3.isAvailableOnVHS = true;
        await toyStory3.save();
        console.log( toyStory3.get({ plain: true }) );

        const salt = await Movie.findByPk(3);
        await salt.update({
          title: 'Trinket Tale 3', //essa atualizacao vai ser ignorada pq n foi chamada dentro da prop. fields. So oq está dentro será atualizado.
          isAvailableOnVHS: true,
        }, {fields: ['isAvailableOnVHS']}); 
        console.log( salt.get({ plain: true }) );

        //TO DELETEsequelize
        const dontLookUp = await Movie.findByPk(4);
        await dontLookUp.destroy(); //o id 4 fica ausente na tabela
        


        /* Instance of the Movie class represents a database row
        const movie = await Movie.create({
            title: 'Toy Story',
            year_released: 2021
          });
        console.log(movie.toJSON());

        // New entry
        const movie2 = await Movie.create({
            title: 'The Incredibles',
            year_released: 2010
        });  
        console.log(movie2.toJSON());

        const movie3 = await Movie.create({
            title: 'SALT',
            year_released: 2012
        });  
        console.log(movie3.toJSON());*/

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(err => err.message);
        console.error('Validation errors: ', errors);
      } else {
        throw error;
      }  
    }
})();