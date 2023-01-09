import { Model } from 'pinia-orm'
import Todo from './Todo'

export default class User extends Model {
    static entity = 'users'

    static fields() {
        return {
            id: this.uid(),
            name: this.string(''),
            todos: this.hasMany(Todo, 'userId'),
        }
    }
}
