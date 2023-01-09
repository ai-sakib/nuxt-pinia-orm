import { defineStore } from 'pinia'
import Todo from '@/models/Todo'
import { useRepo } from 'pinia-orm'

export const todoStore = defineStore('todoStore', {
    state: () => {
        return {
            editableItemValue: null,
            sortByValue: 'asc',
        }
    },
    getters: {
        editableItem: state => state.editableItemValue,
        sortBy: state => state.sortByValue,
    },
    actions: {
        setEditableItem(item) {
            this.editableItemValue = item
        },

        setSortBy() {
            this.sortByValue = this.sortByValue === 'asc' ? 'desc' : 'asc'
        },
        saveTodo: async todo => {
            const savedTodo = await useRepo(Todo).save({
                title: todo.title,
                userId: todo.userId,
            })
            return Promise.resolve(savedTodo)
        },

        updateTodo: async todo => {
            const updatedTodo = await useRepo(Todo)
                .where('id', todo.id)
                .update({
                    title: todo.title,
                    userId: todo.userId,
                })
            return Promise.resolve(updatedTodo)
        },

        completeItem: async todo => {
            const updatedCheckedStatus = await useRepo(Todo)
                .where('id', todo.id)
                .update({ completed: !todo.isCompleted })
            return Promise.resolve(updatedCheckedStatus)
        },

        deleteItem: async id => {
            const deletedItem = await useRepo(Todo).destroy(id)
            return Promise.resolve(deletedItem)
        },
    },
})
