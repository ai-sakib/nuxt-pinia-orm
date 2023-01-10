<template>
    <div class="flex gap-2">
        <select
            class="px-2 border rounded-sm border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-600 focus:border-transparent"
            v-model="userId"
        >
            <option value="">--- Select Author ---</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }}
            </option>
        </select>
        <input
            type="text"
            class="px-2 border rounded-sm border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-600 focus:border-transparent"
            v-model="newTodo"
            ref="todoInputRef"
            @keyup.enter="addOrEditTodo"
            placeholder="Enter Book Name"
        />
        <button
            class="rounded-sm px-2 py-1 w-24 text-white hover:scale-105 hover:bg-current-600 hover:duration-500"
            :class="{
                'bg-blue-500': currentTodo,
                'bg-emerald-500': !currentTodo,
            }"
            @click="addOrEditTodo"
        >
            <FlexOne v-if="!currentTodo">
                <PlusIcon width="16" />
                <span>Add</span>
            </FlexOne>

            <FlexOne v-else>
                <SendIcon width="16" />
                <span>Update</span>
            </FlexOne>
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Todo from '@/models/Todo'
import User from '@/models/User'
import { useRepo } from 'pinia-orm'

import PlusIcon from '~~/utils/icons/PlusIcon.vue'
import SendIcon from '~~/utils/icons/SendIcon.vue'
import FlexOne from '../layouts/FlexOne.vue'

import { todoStore } from '@/store/todoStore'
import { userStore } from '@/store/userStore'
const store = todoStore()
const userModule = userStore()

const newTodo = ref('')
const userId = ref('')
const todoInputRef = ref(null)

const users = computed(() => useRepo(User).all())

const currentTodo = computed(() => store.editableItem)

const resetProperties = () => {
    newTodo.value = ''
    // userId.value = ''
    store.setEditableItem(null)
}

watchEffect(() => {
    if (currentTodo.value) {
        newTodo.value = currentTodo.value.title
        const currentUser = useRepo(User).find(currentTodo.value.userId)
        userId.value = currentUser ? currentUser.id : ''
        todoInputRef.value?.focus()
    }
})

const checkValidity = () =>
    userId.value.trim() === '' || newTodo.value.trim() === ''

const addOrEditTodo = async e => {
    e.preventDefault()
    const isNotValidated = checkValidity()
    if (isNotValidated) return

    const todo = {
        id: currentTodo.value?.id,
        title: newTodo.value,
        userId: userId.value,
    }
    return currentTodo.value ? await editTodo(todo) : await addTodo(todo)
}

const addTodo = async todo => {
    const savedTodo = await store.saveTodo(todo)
    if (!savedTodo) return
    return resetProperties()
}

const editTodo = async todo => {
    const updatedTodo = await store.updateTodo(todo)
    if (!updatedTodo) return
    return resetProperties()
}

onMounted(() => {
    resetProperties()
    if (currentTodo.value) {
        useRepo(Todo).where('editStatus', true).update({ editStatus: false })
    }
})
</script>
