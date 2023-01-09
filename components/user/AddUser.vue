<template>
    <div class="flex gap-2">
        <input
            type="text"
            class="px-1 border rounded-sm border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            v-model="newUser"
            ref="userInputRef"
            @keyup.enter="addOrEditUser"
        />
        <button
            class="rounded-sm px-2 py-1 w-24 text-white hover:scale-105 hover:bg-current-600 hover:duration-500"
            :class="{
                'bg-blue-500': editableUser,
                'bg-emerald-500': !editableUser,
            }"
            @click="addOrEditUser"
        >
            <FlexOne v-if="!editableUser">
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
import { ref, onMounted, computed, watchEffect } from 'vue'
import User from '@/models/User'
import { useRepo } from 'pinia-orm'

import PlusIcon from '~~/utils/icons/PlusIcon.vue'
import SendIcon from '~~/utils/icons/SendIcon.vue'
import FlexOne from '../layouts/FlexOne.vue'

import { userStore } from '@/store/userStore'
const store = userStore()

const editableUser = computed(() => store.editableUser)
const newUser = ref('')
const userInputRef = ref(null)

const resetProperties = () => {
    newUser.value = ''
    store.setEditableUser(null)
}

watchEffect(() => {
    if (editableUser.value) {
        userInputRef.value?.focus()
        newUser.value = store.editableUser?.name
    }
})

const addOrEditUser = e => {
    e.preventDefault()
    return editableUser.value ? editUser(e) : addUser(e)
}

const addUser = async e => {
    if (!newUser.value) return
    const isSavedSuccessfully = await store.saveUser(newUser.value)
    if (isSavedSuccessfully) {
        return resetProperties()
    }
}

const editUser = async e => {
    const user = {
        id: editableUser.value.id,
        name: newUser.value,
    }
    const updatedUser = await store.updateUser(user)
    if (updatedUser) {
        return resetProperties()
    }
}

onMounted(() => {
    resetProperties()
})
</script>
