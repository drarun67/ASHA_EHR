import { Model } from '@nozbe/watermelondb'
import { field, date, text, readonly } from '@nozbe/watermelondb/decorators'

export default class SyncQueue extends Model {
    static table = 'sync_queue'

    @text('table_name') tableName!: string
    @text('record_id') recordId!: string
    @text('operation') operation!: 'create' | 'update' | 'delete'
    @text('payload') payload!: string // JSON string of the change
    @field('processing_status') processingStatus!: 'pending' | 'syncing' | 'failed'
    @field('retry_count') retryCount!: number
    @text('error_log') errorLog!: string

    @readonly @date('created_at') createdAt!: Date
}
