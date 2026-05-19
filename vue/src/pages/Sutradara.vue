<script setup>
    import Navbar from '../components/Navbar.vue';
    import { ref, onMounted, computed } from 'vue';
    import { api } from '../utils/utils';
    
    const API_URL = import.meta.env.VITE_API_URL
    const sutradaras = ref([])
    const search = ref("")

    const isLoading = ref(true)

    const getSutradara = async () => {
        try{
            const res = await api.get('/sutradara')
            sutradaras.value = res.data.data
        }
        catch(err){
            console.log(err)
        }
        finally{
            isLoading.value = false
        }
    }

    const filteredSutradara = computed(() => {
        return sutradaras.value.filter(s => {
            const matchSearch = !search.value.trim() || s.name?.toLowerCase().includes(search.value.trim().toLowerCase())

            return matchSearch
        })
    })

    onMounted(() => {
        getSutradara()
    })

</script>

<template>
    <Navbar />
    <div class="min-h-screen bg-black">
        <div
            class="relative overflow-hidden bg-gradient-to-r from-[#020617] via-[#0f172a] to-orange-700 h-[38vh] flex justify-center pl-8 flex-col gap-4 pt-16">

            <!-- Overlay -->
            <div class="absolute inset-0 bg-black/40"></div>

            <!-- Blur -->
            <div
                class="absolute right-[-100px] top-[-100px] w-[350px] h-[350px] bg-orange-500/20 rounded-full blur-3xl">
            </div>

            <!-- Content -->
            <div class="relative z-10 flex flex-col gap-3">

                <h2 class="text-white text-5xl font-extrabold tracking-wide">
                    Sutradara <span class="text-orange-400">Terbaik</span>
                </h2>

                <h5 class="w-1/2 pb-3 text-gray-300 text-lg leading-relaxed">
                    Temukan para sutradara berbakat dibalik film-film terbaik yang menginspirasi dunia
                </h5>
            </div>
        </div>

        <div class="w-full bg-gradient-to-b from-[#020617] via-[#0f172a] to-black px-10 pt-6 pb-12">
            <input v-model="search" class="w-full lg:w-1/3 text-gray-200 border border-gray-400 rounded p-2 mb-5" type="text" placeholder="cari sutradara">

            <h5 class="text-white text-md border-t border-gray-400 font-semibold pt-5">Menampilkan <span class="text-orange-400 font-bold">{{ sutradaras.length }}</span> Sutradara</h5>
            <div class="text-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 pt-7">
                <button v-for="s in filteredSutradara"" class="h-72 rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-3 hover:scale-102 shadow shadow-orange-500 relative">
                    <img class="object-cover h-full w-full" :src="`${API_URL}${s.image}`">
                    <div class="absolute bottom-0 bg-gradient-to-t from-black via-gray-950 to-transparent opacity-90 w-full h-1/2"></div>
                    <div class="absolute pl-3 pr-3 bottom-5 w-full flex flex-col gap-3">
                        <h4 class="font-semibold">{{ s.name }}</h4>
                        <button class="border border-orange-500 text-orange-500 p-2 w-full rounded-lg">Lihat Detail</button>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>