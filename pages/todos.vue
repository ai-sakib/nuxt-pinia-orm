<template>
    <div>
        <Heading title="Todo">Book List</Heading>
        <div class="flex justify-center">
            <div>
                <AddTodo />
                <TodoList />
            </div>
        </div>
    </div>
</template>
<script setup>
import AddTodo from '~~/components/todo/AddTodo.vue'
import TodoList from '~~/components/todo/TodoList.vue'
</script>
