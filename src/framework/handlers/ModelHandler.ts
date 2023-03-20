import {Sequelize} from "sequelize";

module.exports = function handle(orm: Sequelize): {} | undefined {
    const map: any = {}
    const models = require('./FileHandler')('./src/framework/database/models/', true)

    if (models.length === 0) return undefined

    models.forEach((path: string) => {
        const model = require(`~/framework/database/models/${path}`)(orm)
        map[model.name] = model
    })

    return map
}
