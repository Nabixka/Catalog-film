<script setup>
    import Navbar from '../components/Navbar.vue';
    import { ref, onMounted } from 'vue';
    import { api } from '../utils/utils';
    
    const films = ref([])
    const isLoading = ref(true)
    const API_URL = import.meta.env.VITE_API_URL

    const genre = (film) => {
        return film.genre.map(g => g.name).join(", ")
    }
    
    const getFilm = async () => {
        try{
            const res = await api.get("/film")
            films.value = res.data.data
        }
        catch(err){
            if(err.status === 500){
                console.log("500")
            }
        }
        finally{
            isLoading.value = false
        }
    }
    
    onMounted(() => {
        getFilm()
    })
</script>

<template>
    <Navbar />

    <div class="min-h-screen bg-black">
        
        <!-- Hero -->
        <div
            class="relative overflow-hidden bg-gradient-to-r from-[#020617] via-[#0f172a] to-orange-600 h-[55vh] flex flex-col justify-center pl-6 lg:pl-10 pr-2">

            <!-- Overlay -->
            <div class="absolute inset-0 bg-black/40"></div>

            <!-- Content -->
            <div class="relative z-10 flex flex-col gap-5">
                <div class="pt-15">
                    <h1 class="text-5xl font-extrabold text-white tracking-wide">
                        Temukan Film
                    </h1>

                    <h1 class="text-5xl font-extrabold text-orange-400 drop-shadow-lg">
                        Terbaik Untuk Ditonton
                    </h1>
                </div>

                <h5 class="text-gray-300 text-lg leading-relaxed">
                    Jelajahi koleksi film dari berbagai genre,
                    <br>
                    temukan cerita yang akan menginspirasi Anda
                </h5>
                <router-link to="/film" class="lg:w-1/4 w-1/2  mt-2 bg-orange-500 hover:bg-orange-600 duration-300 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-orange-500/30">
                    Jelajahi Film
                </router-link>
            </div>

            <!-- Decoration -->
            <div class="absolute right-[-100px] bottom-[-100px] w-[400px] h-[400px] bg-orange-500/20 blur-3xl rounded-full"></div>
        </div>

        <!-- Film Section -->
        <div class="bg-gradient-to-b from-[#020617] via-[#0f172a] to-black p-6">

            <div class="bg-white/5 backdrop-blur-md border border-white/10 p-6 pl-8 pr-8 rounded-2xl flex flex-col gap-6 shadow-2xl">

                <!-- Header -->
                <div class="lg:flex lg:justify-between grid grid-cols-2 gap-4 lg:gap-2 items-center">
                    <h3 class="col-span-2 border-l-4 pl-4 text-2xl text-white font-bold border-orange-500">
                        Jelajahi Film
                    </h3>

                    <router-link to="/film" class="rounded-xl px-1 py-1 lg:px-4 lg:py-2 font-semibold border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white duration-300">
                        Lihat Semua →
                    </router-link>
                </div>

                <!-- Film Grid -->
                <div class="grid grid-cols-2 lg:grid-cols-6  gap-5">
                    <div
                        v-for="f in films.slice(0, 6)"
                        :key="f.id"
                        class="bg-white/5 border border-white/10 h-75 rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-orange-500/20 hover:shadow-2xl duration-300 group">

                        <!-- Image -->
                        <div class="overflow-hidden">
                            <img
                                :src="`${API_URL}${f.image}`"
                                class="h-50 w-full object-cover group-hover:scale-110 duration-500">
                        </div>

                        <!-- Detail -->
                        <div class="p-3 flex flex-col gap-1">
                            <h3 class="font-semibold text-white truncate text-lg">
                                {{ f.title }}
                            </h3>
                            <h3 class="text-orange-400 truncate text-sm font-medium">
                                {{ genre(f) }}
                            </h3>
                            <h3 class="text-gray-400 text-sm">
                                {{ new Date(f.tanggal_rilis).getFullYear() }}
                            </h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>