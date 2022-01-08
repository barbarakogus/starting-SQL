const Sequelize = require('sequelize'); //trazendo sequeliza do node para o meu proj.

module.exports = (sequelize) => {
    class Movie extends Sequelize.Model {}
    Movie.init({
        // Attributes object
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true, //elemento indispensável dentro desse obj.
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING, //Sequelize.STRING(500) p/ especificar qtos caracteres. padrao=255
            allowNull: false, // disallow null
            validate: {
                notNull: {
                    msg: 'Please provide a value for "title"',
                },
                notEmpty: {
                    // custom error message
                    msg: 'Please provide a value for "title"',
                }
            },
        },
        runtime: {
            type: Sequelize.INTEGER,
            allowNull: false, 
            validate: { 
                notNull: {
                    msg: 'Please provide a value for "title"',
                },
                min: { 
                    args: 1,
                    msg: 'Please provide a value greater than "0" for "runtime"',
                },
            },
        },
        releaseDate: {
            type: Sequelize.DATEONLY, //format yyyy-mm-dd
            allowNull: false, 
            validate: {
                notNull: {
                    msg: 'Please provide a value for "title"',
                },
                isAfter: {
                    args: '1895-12-27',
                    msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"',
                },
             },
        },
        isAvailableOnVHS: {
            type: Sequelize.BOOLEAN,
            allowNull: false, 
            defaultValue: false, //set default value. se o valor n for atribuido ele vai assumir false por padrao
        },
    },
    // Model options object
    { 
        //freezeTableName: true, //disable plural table names. o rerto é deixar plural
        timestamps: true, // disable timestamps. isso removeu updateAt and createdAt   
        //modelName: 'movie', // set model name to 'movie' 
        tableName: 'my_movies_table', // table name change
        paranoid: true, //enable "soft" deletes. nao deleta fisicamente, marca a linha como deletada, add uma coluna deleteAt. porem n esta linha n vai ser retornada em futures queries.
        //para a coluna do delete soft (deleteAt) aparecer na tabela o timestamps tem q estra TRUE.  
        sequelize //same as { sequelize: sequelize }
    }); 
  
    return Movie;
};