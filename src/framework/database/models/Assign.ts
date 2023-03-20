import {DataTypes, Sequelize} from "sequelize";

module.exports = (orm: Sequelize) => {
    return orm.define("assign", {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            validate: {
                isNumeric: true
            }
        }
    }, {
        timestamps: false
    })
}
