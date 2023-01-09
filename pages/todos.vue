<template>
    <div>
        <Heading title="Todo">Book List</Heading>
        <div class="flex justify-center">
            <div class="flex flex-col gap-3">
                <AddTodo />
                <FilterTodo />
                <TodoList />
            </div>
        </div>
    </div>
</template>
<script setup>
import AddTodo from '~~/components/todo/AddTodo.vue'
import FilterTodo from '~~/components/todo/FilterTodo.vue'
import TodoList from '~~/components/todo/TodoList.vue'
</script>
