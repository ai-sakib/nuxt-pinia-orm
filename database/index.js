import { Database } from '@vuex-orm/core'

// Models
import User from '@/database/models/User'
import Todo from '~~/database/models/todos'

// Vuex store modules for each model
import * as todos from '@/database/todos.js'

// Register VuexORM databases
const database = new Database()
database.register(User)
database.register(Todo, todos)

export default database
