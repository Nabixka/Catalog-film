<script setup>
import Navbar from '../components/Navbar.vue';
</script>

<template>
    <Navbar />

    <div class="min-h-screen bg-black">
        <div
            class="bg-gradient-to-r from-[#020617] via-[#0f172a] to-orange-600 h-[35vh] flex justify-center pl-6 flex-col gap-3 pt-15">
            <h2 class="text-white text-3xl font-bold">Daftar <span class="text-orange-400">Film</span></h2>
            <h5 class="w-1/3 text-gray-300">Jelajahi seluruh koleksi film kami dair berbagai genre dan temukan film
                favorit anda</h5>
        </div>
        <div class="bg-gradient-to-b from-[#020617] via-[#0f172a] to-black pl-10 pr-10 pt-5">
            <div class="grid grid-cols-2 lg:grid-cols-6 gap-5 ">
                <div v-for="n in 25"
                    class="bg-white/5 border border-white/10 h-75 rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-orange-500/20 hover:shadow-2xl duration-300 group">

                    <!-- Image -->
                    <div class="overflow-hidden">
                        <img src="/src/assets/aadc.jpg"
                            class="h-50 w-full object-cover group-hover:scale-110 duration-500">
                    </div>

                    <!-- Detail -->
                    <div class="p-3 flex flex-col gap-1">
                        <h3 class="font-semibold text-white truncate text-lg">
                            Title
                        </h3>
                        <h3 class="text-orange-400 truncate text-sm font-medium">
                            Genre
                        </h3>
                        <h3 class="text-gray-400 text-sm">
                            2008
                        </h3>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>