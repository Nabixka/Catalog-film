<script setup>
    import Navbar from '../components/Navbar.vue';
    import { onMounted, ref } from 'vue';
    import { api } from '../utils/utils';
    import { Icon } from '@iconify/vue' 

    const { state } = history   

    const id = state.id
    const film = ref({})
    const API_URL = import.meta.env.VITE_API_URL    

    const isSutradaraOrPemeran = ref("sutradara")   

    const getGenre = (ge) => {
        return ge.genre?.map(g => g.name).join(", ") || "Tidak Ada Genre"
    }   

    const getDetail = async () => {
        try {
            const res = await api.get(`/film/${id}`)
            film.value = res.data.data
        }
        catch (err) {
            console.log(err)
        }
    }   

    const formatDate = (date) => {
        const newDate = new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })  

        return newDate
    }   

    const buttonColor = (event) => {
        return [
            "pb-2 duration-300 border-b-2",
            isSutradaraOrPemeran.value == event
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-gray-400 hover:text-white"
        ]
    }   

    onMounted(() => {
        getDetail()
    })
</script>

<template>
    <Navbar />

    <div class="min-h-screen bg-black">

        <!-- HERO -->
        <div
            class="relative overflow-hidden bg-gradient-to-r from-[#020617] via-[#0f172a] to-orange-700 pt-[13vh] pb-12 px-8">

            <!-- Overlay -->
            <div class="absolute inset-0 bg-black/40"></div>

            <!-- Blur Circle -->
            <div
                class="absolute right-[-100px] top-[-50px] w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-3xl">
            </div>

            <div class="relative z-10 flex gap-10 items-center">

                <!-- Poster -->
                <div class="flex flex-col gap-4">

                    <button class="flex items-center gap-2 text-gray-300 hover:text-orange-400 duration-300 text-sm">
                        <img src="/src/assets/lets-icons--back.svg">
                        Kembali ke daftar Film
                    </button>

                    <img class="shadow-2xl shadow-orange-900/40 rounded-2xl w-80 h-[450px] object-cover border border-white/10"
                        :src="`${API_URL}${film.image}`">
                </div>

                <!-- Detail -->
                <div class="flex flex-col gap-5 text-white w-2/3">

                    <div class="flex flex-col gap-3">

                        <h1 class="text-6xl font-extrabold tracking-wide">
                            {{ film.title }}
                        </h1>

                        <div class="flex items-center gap-4 text-gray-300">

                            <h5>{{ formatDate(film.tanggal_rilis) }}</h5>

                            <span class="text-orange-500 text-xs">●</span>

                            <h5 class="text-orange-400">
                                {{ getGenre(film) }}
                            </h5>
                        </div>
                    </div>

                    <p class="text-gray-300 leading-relaxed text-lg w-4/5">
                        {{ film.description }}
                    </p>

                    <!-- Button -->
                    <div class="flex gap-4 mt-2">

                        <button class="bg-orange-500 hover:bg-orange-600 duration-300 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-orange-500/30">
                            Tonton Sekarang
                        </button>

                        <button class="border border-white/20 hover:border-orange-500 hover:text-orange-400 duration-300 px-6 py-3 rounded-xl font-semibold backdrop-blur-md">
                            Simpan Favorit
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <!-- CONTENT -->
        <div class="bg-gradient-to-b from-[#020617] via-[#0f172a] to-black p-6 text-white">

            <div class="grid grid-cols-3 gap-6">

                <!-- LEFT -->
                <div class="col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl">

                    <div class="flex flex-col gap-6">

                        <!-- Tabs -->
                        <div class="flex gap-8 border-b border-white/10 pb-3">
                            <button class="text-orange-400 border-b-2 border-orange-500 pb-2">
                                Sinopsis
                            </button>

                            <button class="text-gray-400 hover:text-white duration-300">
                                Detail
                            </button>
                        </div>

                        <!-- Description -->
                        <p class="text-gray-300 leading-relaxed">
                            {{ film.description }}
                        </p>

                        <!-- Switch -->
                        <div class="flex gap-10">

                            <button @click="isSutradaraOrPemeran = 'sutradara'"
                                :class="buttonColor('sutradara')">
                                Sutradara
                            </button>

                            <button @click="isSutradaraOrPemeran = 'pemeran'"
                                :class="buttonColor('pemeran')">
                                Pemeran
                            </button>
                        </div>

                        <!-- Sutradara -->
                        <div v-if="isSutradaraOrPemeran == 'sutradara'">

                            <div v-if="film.sutradara?.length" class="grid grid-cols-4 gap-6">

                                <div v-for="p in film.sutradara"
                                    class="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 hover:-translate-y-2 duration-300">

                                    <img class="object-cover w-28 h-28 rounded-full border-2 border-orange-500 shadow-lg shadow-orange-500/20"
                                        :src="`${API_URL}${p.image}`">

                                    <h3 class="font-semibold text-center">
                                        {{ p.name }}
                                    </h3>

                                    <h5 class="text-sm text-orange-400">
                                        Sutradara
                                    </h5>
                                </div>
                            </div>

                            <div class="border-t border-white/10 pt-4 text-gray-400" v-else>
                                Tidak Ada Data Sutradara
                            </div>
                        </div>

                        <!-- Pemeran -->
                        <div v-else-if="isSutradaraOrPemeran == 'pemeran'">

                            <div v-if="film.pemeran?.length" class="grid grid-cols-4 gap-6">

                                <div v-for="p in film.pemeran"
                                    class="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 hover:-translate-y-2 duration-300">

                                    <img class="object-cover w-28 h-28 rounded-full border-2 border-orange-500 shadow-lg shadow-orange-500/20"
                                        :src="`${API_URL}${p.image}`">

                                    <h3 class="font-semibold text-center">
                                        {{ p.name }}
                                    </h3>

                                    <h5 class="text-sm text-orange-400">
                                        Pemeran
                                    </h5>
                                </div>
                            </div>

                            <div class="border-t border-white/10 pt-4 text-gray-400" v-else>
                                Tidak Ada Data Pemain
                            </div>
                        </div>

                    </div>
                </div>

                <!-- RIGHT -->
                <div class="flex flex-col gap-5">

                    <!-- Info -->
                    <div class="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col gap-5">

                        <h3 class="text-xl font-bold border-l-4 border-orange-500 pl-3">
                            Informasi Film
                        </h3>

                        <div class="flex flex-col gap-4 text-sm">

                            <div>
                                <h5 class="text-gray-400">Tanggal Rilis</h5>
                                <h4 class="font-semibold">
                                    {{ formatDate(film.tanggal_rilis) }}
                                </h4>
                            </div>

                            <div>
                                <h5 class="text-gray-400">Genre</h5>
                                <h4 class="font-semibold text-orange-400">
                                    {{ getGenre(film) }}
                                </h4>
                            </div>

                            <div>
                                <h5 class="text-gray-400">Jumlah Pemeran</h5>
                                <h4 class="font-semibold">
                                    {{ film.pemeran?.length || 0 }} Pemeran
                                </h4>
                            </div>

                            <div>
                                <h5 class="text-gray-400">Jumlah Sutradara</h5>
                                <h4 class="font-semibold">
                                    {{ film.sutradara?.length || 0 }} Sutradara
                                </h4>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>