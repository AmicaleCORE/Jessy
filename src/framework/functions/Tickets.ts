import {models} from "~/framework/database/Orm";

export function createTicket(channel_id: string, creator_id: string): Promise<any> {
    return models.ticket.create({
        type: null,
        channel_id,
        creator_id
    })
}
