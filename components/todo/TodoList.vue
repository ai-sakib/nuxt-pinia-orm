<template>
    <div>
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
            <!-- {{
                authors[1].todos
            }} -->
            <!-- <TransitionGroup name="list" tag="tbody">
                <tr v-for="(todo, index) in todos" :key="todo.id">
                    <td :class="tdClass">{{ index + 1 }}</td>
                    <td :class="tdClass">
                        {{ todo.author || 'Unknown' }}
                    </td>
                    <td :class="tdClass">{{ todo.title }}</td>
                    <td :class="tdClass"><TodoItem :todo="todo" /></td>
                </tr>
            </TransitionGroup> -->
            <TransitionGroup name="list" tag="tbody">
                <template v-for="author in authors" :key="author.id">
                    <tr v-for="(todo, index) in author.todos" :key="todo.id">
                        <td :class="tdClass">{{ index + 1 }}</td>
                        <td :class="tdClass">
                            {{ author.name || 'Unknown' }}
                        </td>
                        <td :class="tdClass">{{ todo.title }}</td>
                        <td :class="tdClass"><TodoItem :todo="todo" /></td>
                    </tr>
                </template>
            </TransitionGroup>
        </table>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import Todo from '@/models/Todo'
import User from '@/models/User'
import TodoItem from './TodoItem.vue'
import { useRepo } from 'pinia-orm'
import { todoStore } from '~~/store/todoStore'
const store = todoStore()
const sortBy = computed(() => store.sortBy)

const tdClass = 'border border-gray-300 px-2 py-1'

const todoRepo = useRepo(Todo)

const todos = computed(() => {
    return useRepo(Todo).with('user').orderBy('title', sortBy.value).get()
})

const authors = computed(() =>
    useRepo(User)
        .with('todos', query => {
            query.orderBy('title', sortBy.value)
        })
        .orderBy('name', sortBy.value)
        .get()
)
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
