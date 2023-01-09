<template>
    <TransitionGroup name="list" tag="ul" class="flex flex-col">
        <li class="mt-1" v-for="user in users" :key="user.id">
            <UserItem :user="user" />
        </li>
    </TransitionGroup>
</template>

<script setup>
import { computed } from 'vue'
import User from '@/models/User'
import UserItem from './UserItem.vue'
import { useRepo } from 'pinia-orm'

const userRepo = useRepo(User)

const users = computed(() => {
    return userRepo.all()
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
