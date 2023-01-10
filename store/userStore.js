import { defineStore } from 'pinia'
import User from '@/models/User'
import Todo from '@/models/Todo'
import { useRepo } from 'pinia-orm'

export const userStore = defineStore('userStore', {
    state: () => {
        return {
            editableUserValue: null,
        }
    },
    getters: {
        editableUser: state => state.editableUserValue,
    },
    actions: {
        setEditableUser(user) {
            this.editableUserValue = user
        },

        saveUser: async name => {
            const user = await useRepo(User).save({ name: name })
            return Promise.resolve(user)
        },

        updateUser: async user => {
            const updatedUser = await useRepo(User)
                .where('id', user.id)
                .update({
                    name: user.name,
                })
            return Promise.resolve(updatedUser)
        },

        deleteUser: async id => {
            const deletedUser = await useRepo(User).destroy(id)
            if (deletedUser) {
                await useRepo(Todo).where('userId', id).delete()
            }
            return Promise.resolve(deletedUser)
        },
    },
})
