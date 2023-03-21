import {models} from "~/framework/database/Orm";

export function apply_foreign_keys() {
    models.ticket.hasMany(models.assign, {
        foreignKey: {
            name: 'ticket_id',
            primaryKey: true,
            validate: {
                isNumeric: true
            }
        }
    })

    models.ticket.hasMany(models.admin, {
        foreignKey: {
            name: 'ticket_id',
            primaryKey: true,
            validate: {
                isNumeric: true
            }
        }
    })
}
