import {DataTypes, Sequelize} from "sequelize";
import {TicketType} from "~/framework/database/enums/TicketType";

module.exports = (orm: Sequelize) => {
    return orm.define("ticket", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.ENUM,
            values: Object.values(TicketType)
        },
        channel_id: {
            type: DataTypes.STRING,
            validate: {
                isNumeric: true
            }
        },
        creator_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
        deletedAt: false
    })
}
