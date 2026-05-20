<script setup>
import { computed, onMounted, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import { api } from '../utils/utils';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

const detail = ref({})
const isLoading = ref(true)
const { state } = history
const id = state?.id
const API_URL = import.meta.env.VITE_API_URL
const film = computed(() => detail.value?.film || [])
const router = useRouter()

const formatDate = (tanggal) => {
    return new Date(tanggal).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })
}

const handleNavigate = (event, id) => {
    if(event === "film"){
        router.push({
            name: "FilmDetail",
            state: {id: id}
        })
    }
    else{
        router.back()
    }
}


const getDetail = async () => {
    try {
        const res = await api.get(`/pemeran/${id}`)
        detail.value = res.data.data
    }
    catch (err) {
        console.log
    }
    finally {
        isLoading.value = false
    }
}

onMounted(() => {
    getDetail()
})

</script>

<template>
    <Navbar />
    <div class="min-h-screen bg-black">
        <div class="relative overflow-hidden bg-gradient-to-r from-[#020617] via-[#0f172a] to-orange-700 pt-[13vh] pb-12 px-8">
            <div class="flex lg:flex-row flex-col items-center gap-10">
                <div>
                    <button @click="handleNavigate()" class="flex items-center gap-2 text-gray-300 hover:text-orange-400 duration-300 text-sm">
                        <img src="/src/assets/lets-icons--back.svg">Kembali
                    </button>
                    <div class="w-full pt-5">
                        <div class="relative overflow-hidden hover:shadow hover:shadow-orange-500 hover:scale-105">
                            <img class="h-80 rounded" :src="`${API_URL}${detail.image}`">
                            <div
                                class="absolute w-full bottom-0 h-1/2 bg-linear-to-t from-black/80 via-gray-900/90 to-transparent">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-4 items-center lg:items-start">
                    <h3 class="text-lg font-semibold text-orange-500">Pemain</h3>
                    <h1 class="text-3xl lg:w-1/3 font-bold text-white border-b-2 border-orange-500 pb-1">{{ detail.name }}</h1>
                    <h5 class="text-center lg:text-start lg:w-1/3 text-gray-400">{{ detail.description }}</h5>
                    <div class="flex gap-3">
                        <div class="flex gap-1 items-center">
                            <Icon width="45" color="#cc4312" icon="uim:schedule" />
                            <div class="text-gray-300">
                                <h3 class="text-sm">Tanggal Lahir</h3>
                                <h3 class="text-sm">{{ formatDate(detail.tanggal_lahir) }}</h3>
                            </div>
                        </div>
                        <div class="flex gap-1 items-center">
                            <Icon width="45" color="#cc4312" icon="mdi:map-marker"/>
                            <div class="text-gray-300">
                                <h3 class="text-sm">Tempat Asal</h3>
                                <h3 class="text-sm">{{ detail.tempat_asal }}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gradient-to-b from-[#020617] via-[#0f172a] to-black p-6 text-white">
            <h3 class="text-2xl font-semibold border-b border-orange-500 pb-3  lg:w-1/5">Film Yang Dimainkan</h3>
            <div v-if="film.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-5" >

                <button
                    @click="handleNavigate('film', f.film_id)"
                    v-for="f in detail.film"
                    class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-orange-500/20 hover:shadow-2xl duration-300 group" >

                    <!-- Image -->
                    <div class="overflow-hidden relative">

                        <img :src="`${API_URL}${f.film_image}`" class="h-72 w-full object-cover group-hover:scale-110 duration-500" >

                        <!-- Overlay -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70">
                        </div>

                        <!-- Year -->
                        <!-- <div class="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs text-orange-400 font-semibold border border-orange-500/30" >
                            {{ new Date(f.tanggal_rilis).getFullYear() }}
                        </div> -->
                    </div>

                    <!-- Detail -->
                    <div class="p-4 flex flex-col gap-2 text-left">

                        <h3 class="font-bold text-white truncate text-lg">
                            {{ f.film_title }}
                        </h3>

                        <div class="flex items-center gap-2 text-gray-400 text-sm mt-1">

                            <span class="w-2 h-2 rounded-full bg-orange-500"></span>
                            <span>
                                Film Populer
                            </span>
                        </div>
                    </div>
                </button>
            </div>

            <div v-else class="bg-white/5 mt-5 border border-white/10 rounded-2xl p-14 text-center flex flex-col gap-4" >
                <h3 class="text-4xl font-bold text-gray-400">
                    Film Tidak Ditemukan
                </h3>
            </div>
        </div>
    </div>
</template>