<template>
    <li class="flex justify-start items-center gap-2">
        <div
            @click.prevent="deleteItem"
            class="cursor-pointer px-.5 py-.5 rounded-full bg-red-500 text-white hover:scale-110 duration-500"
        >
            <DeleteIcon width="16" />
        </div>
        <div
            @click.prevent="editItem"
            class="cursor-pointer px-.5 py-.5 text-blue-500 hover:scale-110 duration-500"
        >
            <EditIcon width="16" />
        </div>

        <span class="select-none">{{ user.name }}</span>
    </li>
</template>
<script setup>
import User from '@/models/User'
import { useRepo } from 'pinia-orm'
import { userStore } from '@/store/userStore'

import DeleteIcon from '~~/utils/icons/DeleteIcon.vue'
import EditIcon from '~~/utils/icons/EditIcon.vue'

const store = userStore()

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
})

const deleteItem = async () => {
    await store.deleteUser(props.user.id)
}

const editItem = () => {
    store.setEditableUser(props.user)
}
</script>
