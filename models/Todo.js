import { Model } from 'pinia-orm'
import User from './User'

export default class Todo extends Model {
    static entity = 'todos'

    static fields() {
        return {
            id: this.uid(),
            title: this.string(''),
            completed: this.boolean(false),
            userId: this.attr(null),
            user: this.belongsTo(User, 'userId'),
        }
    }
}
