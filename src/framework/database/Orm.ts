import {Sequelize} from "sequelize";
import {apply_foreign_keys} from "~/framework/functions/Models";

const orm: Sequelize = new Sequelize({
    storage: 'database.db',
    dialect: 'sqlite',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: false
})

export const models = require('~/framework/handlers/ModelHandler')(orm)
apply_foreign_keys()

export function initDatabase(force?: boolean) {
    orm.sync({ force })
        .then(_ => {
            console.log(`Database synchronized.`)
        })
        .catch((error: Error) => console.log(error))
}
