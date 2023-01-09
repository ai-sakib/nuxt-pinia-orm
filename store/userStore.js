import { defineStore } from 'pinia'
import User from '@/models/User'
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
            const user = useRepo(User).save({ name: name })
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
            const deletedUser = useRepo(User).destroy(id)
            return Promise.resolve(deletedUser)
        },
    },
})
