<template>
    <div>
        <Heading title="Todo">Authors</Heading>
        <div class="flex justify-center">
            <div>
                <AddUser />
                <UserList />
            </div>
        </div>
    </div>
</template>
<script setup>
import AddUser from '~~/components/user/AddUser.vue'
import UserList from '~~/components/user/UserList.vue'
</script>
