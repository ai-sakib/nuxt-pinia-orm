<template>
    <div class="flex justify-center text-2xl font-bold my-4">
        <Head>
            <Title>Nuxt Pinia: {{ title }}</Title>
            <Meta name="description" :content="title" />
            <!-- <Link rel="icon" type="image/x-icon" href="/images/nuxt.png"></Link> -->
        </Head>
        <slot />
    </div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
})
</script>
