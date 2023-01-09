<template>
    <div class="mt-4">
        <table class="w-full">
            <thead>
                <tr
                    class="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-white font-semibold"
                >
                    <td :class="tdClass">SL</td>
                    <td :class="tdClass">Author</td>
                    <td :class="tdClass">Book Name</td>
                    <td :class="tdClass" class="text-center">Action</td>
                </tr>
            </thead>
            <TransitionGroup name="list" tag="tbody">
                <tr v-for="(todo, index) in todos" :key="todo.id">
                    <td :class="tdClass">{{ index + 1 }}</td>
                    <td :class="tdClass">
                        {{ todo.user?.name || 'Unknown' }}
                    </td>
                    <td :class="tdClass">{{ todo.title }}</td>
                    <td :class="tdClass"><TodoItem :todo="todo" /></td>
                </tr>
            </TransitionGroup>
        </table>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import Todo from '@/models/Todo'
import TodoItem from './TodoItem.vue'
import { useRepo } from 'pinia-orm'

const tdClass = 'border px-2 py-1'

const todoRepo = useRepo(Todo)

const todos = computed(() => {
    return todoRepo.with('user').get()
})
</script>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
