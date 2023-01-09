<template>
    <div class="mt-4">
        <nav class="flex flex-row justify-center gap-2">
            <ul class="flex gap-2">
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><NuxtLink to="/about">About</NuxtLink></li>
                <li><NuxtLink to="/users">Authors</NuxtLink></li>
                <li><NuxtLink to="/todos">Books</NuxtLink></li>
            </ul>
        </nav>

        <div>
            <slot />
        </div>
    </div>
</template>

<style>
.router-link-active {
    @apply px-2 py-1 bg-cyan-500 text-white;
}
.page-enter-active,
.page-leave-active {
    transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
    transition: all 0.2s;
}
.layout-enter-from,
.layout-leave-to {
    filter: grayscale(1);
}
</style>
