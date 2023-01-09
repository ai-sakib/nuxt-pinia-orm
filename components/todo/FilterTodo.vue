<template>
    <div>
        <div class="flex gap-2">
            <span>Sort By Book:</span>
            <button
                @click.prevent="sort"
                class="w-16 px-2 py-.5 rounded-sm bg-cyan-500 text-white"
            >
                <span v-if="currentSort === 'asc'">DESC</span>
                <span v-else>ASC</span>
            </button>
        </div>
    </div>
</template>
<script setup>
import { todoStore } from '@/store/todoStore'
const store = todoStore()
const currentSort = computed(() => store.sortBy)

const sort = () => {
    store.setSortBy()
}
</script>
