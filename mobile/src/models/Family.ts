import { Model } from '@nozbe/watermelondb'
import { field, date, text, readonly, children } from '@nozbe/watermelondb/decorators'

export default class Family extends Model {
    static table = 'families'

    @text('family_head_name') headName!: string
    @text('village_id') villageId!: string
    @text('house_no') houseNo!: string
    @text('ration_card_no') rationCardNo!: string

    @children('patients') members!: any

    @readonly @date('created_at') createdAt!: Date
    @readonly @date('updated_at') updatedAt!: Date
}
