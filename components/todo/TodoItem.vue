<template>
    <div class="flex justify-center items-center gap-2">
        <input
            type="checkbox"
            :title="todo.completed ? 'Completed' : 'Not completed yet !'"
            class="cursor-pointer hover:scale-110 duration-500"
            :class="todo.completed ? 'scale-110' : ''"
            :checked="todo.completed"
            @change="checkItem"
        />
        <div
            @click.prevent="deleteItem"
            title="Delete"
            class="cursor-pointer px-.5 py-.5 rounded-full bg-red-500 text-white hover:scale-110 duration-500"
        >
            <DeleteIcon width="16" />
        </div>

        <div
            @click.prevent="editItem"
            title="Edit"
            class="cursor-pointer px-.5 py-.5 text-blue-500 hover:scale-110 duration-500"
        >
            <EditIcon width="16" />
        </div>
    </div>
</template>
<script setup>
import Todo from '@/models/Todo'
import { useRepo } from 'pinia-orm'
import { todoStore } from '@/store/todoStore'

import DeleteIcon from '~~/utils/icons/DeleteIcon.vue'
import EditIcon from '~~/utils/icons/EditIcon.vue'

const store = todoStore()

const props = defineProps({
    todo: {
        type: Object,
        required: true,
    },
})

const deleteItem = async () => {
    await store.deleteItem(props.todo.id)
}

const editItem = () => {
    store.setEditableItem(props.todo)
}

const checkItem = async e => {
    e.preventDefault()
    const todo = {
        id: props.todo.id,
        isCompleted: props.todo.completed,
    }
    const isCompleted = await store.completeItem(todo)
}
</script>
