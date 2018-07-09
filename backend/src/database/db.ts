import { Sequelize } from 'sequelize-typescript';
import * as config from '../config/config';


const sequelize = new Sequelize({
    dialect: 'postgres',
    host: config.POSTGRESQL_HOST,
    database: config.POSTGRESQL_DATABASE,
    username: config.POSTGRESQL_USER,
    password: config.POSTGRESQL_PASSWORD,
    logging: true,
    define: {
        underscored: true
    },
    modelPaths: [__dirname + '/models']
});

export default sequelize;