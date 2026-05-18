<script setup>
import { ref } from 'vue';

const isOpen = ref(false)
</script>

<template>
    <div class="fixed right-0 z-20 top-0 left-0">
        <div class="flex justify-between bg-black items-center p-3">
            <!-- Logo -->
            <div class="flex gap-3">
                <img class="w-10" src="/src/assets/mdi--movie-roll.svg">
                <div>
                    <h2 class="text-lg font-extrabold text-white">FILM<span class="text-orange-600/90">KATALOG</span>
                    </h2>
                    <h4 class="text-sm text-gray-400">Koleksi Film Terbaik</h4>
                </div>
            </div>

            <!-- Nav -->
            <div class="block text-white lg:hidden ">
                <button @click="isOpen = !isOpen" class="text-4xl">=</button>
            </div>
            <div class="lg:flex hidden gap-5 text-white font-semibold">
                <router-link active-class="text-orange-500 border-b pb-1" to="/">Beranda</router-link>
                <router-link active-class="text-orange-500 border-b pb-1" to="/film">Film</router-link>
                <router-link active-class="text-orange-500 border-b pb-1" to="/sutradara">Sutradara</router-link>
                <router-link active-class="text-orange-500 border-b pb-1" to="/aktor">Aktor</router-link>
            </div>
        </div>
        <div v-if="isOpen" class="bg-gray-950 text-white flex flex-col gap-2 pb-5 pt-2 text-center">
            <router-link to="/" active-class="bg-gray-900 p-2 ml-10 mr-10 rounded-lg">Beranda</router-link>
            <router-link to="/film" active-class="bg-gray-900 p-2 ml-10 mr-10 rounded-lg">Film</router-link>
            <router-link to="/sutradara" active-class="bg-gray-900 p-2 ml-10 mr-10 rounded-lg">Sutradara</router-link>
            <router-link to="/aktor" active-class="bg-gray-900 p-2 ml-10 mr-10 rounded-lg">Aktor</router-link>
        </div>
    </div>
</template>