<script setup>
    import { computed, onMounted, ref } from 'vue';
    import Navbar from '../components/Navbar.vue';
    import { api } from '../utils/utils';
    import { useRouter } from 'vue-router';

    const API_URL = import.meta.env.VITE_API_URL
    const router = useRouter()

    const films = ref([])
    const message = ref("")
    const isLoading = ref(true)
    const genres = ref([])

    const search = ref("")
    const selectedGenre = ref("")
    const selectedTahun = ref("")
    const urutan = ref("terbaru")


    const years = []

    for (let tahun = 2026; tahun >= 1999; tahun--) {
        years.push(tahun)
    }

    const getGenre = (item) => {
        return item.genre.map(i => i.name).join(", ") || "-"
    }

    const getFilms = async () => {
        try {
            const res = await api.get("/film")
            films.value = res.data.data
        }
        catch (err) {
            if (err.status === 500) {
                message.value = "Tidak Dapat Terhubung Ke Server"
            }
        }
        finally {
            isLoading.value = false
        }
    }

    const getFilmGenres = async () => {
        try {
            const res = await api.get("/genre")
            genres.value = res.data.data
        }
        catch (err) {
            if (err.status === 500) {
                message.value = "Tidak Dapat Terhubung Ke Server"
            }
        }
    }

    const filteredFilm = computed(() => {
        return films.value.filter(film => {

            // Filter Search
            const matchSearch = !search.value.trim() ||
                film.title?.toLowerCase().includes(search.value.trim().toLowerCase())

            // Filter Genre
            const matchGenre = !selectedGenre.value ||
                film.genre?.some(g => g.name === selectedGenre.value
            )

            // Filter Tahun
            const date = new Date(film.tanggal_rilis).getFullYear()
            const matchTahun = !selectedTahun.value ||
                date === Number(selectedTahun.value)

            // Filter Berdasarkan Urutan
            return matchSearch && matchGenre && matchTahun
        })
        .sort((a, b) => {
            const dateA = new Date(a.tanggal_rilis)
            const dateB = new Date(b.tanggal_rilis)
            if(urutan.value === "terbaru"){
                return dateB - dateA
            }
            return dateA - dateB
        })

    })

    const handleNavigate = (id) => {
        router.push({
            name: "FilmDetail",
            state: {id: id}
        })
    }

    onMounted(() => {
        getFilms()
        getFilmGenres()
    })
</script>

<template>
    <Navbar />

    <div class="min-h-screen bg-black">

        <!-- HERO -->
        <div
            class="relative overflow-hidden bg-gradient-to-r from-[#020617] via-[#0f172a] to-orange-700 h-[35vh] flex justify-center pl-8 flex-col gap-4 pt-16">

            <!-- Overlay -->
            <div class="absolute inset-0 bg-black/40"></div>

            <!-- Blur -->
            <div
                class="absolute right-[-100px] top-[-100px] w-[350px] h-[350px] bg-orange-500/20 rounded-full blur-3xl">
            </div>

            <!-- Content -->
            <div class="relative z-10 flex flex-col gap-3">

                <h2 class="text-white text-5xl font-extrabold tracking-wide">
                    Daftar <span class="text-orange-400">Film</span>
                </h2>

                <h5 class="w-1/2 lg:w-1/3 text-gray-300 text-lg leading-relaxed">
                    Jelajahi seluruh koleksi film kami dari berbagai genre
                    dan temukan film favorit Anda.
                </h5>
            </div>
        </div>

        <!-- CONTENT -->
        <div class="bg-gradient-to-b from-[#020617] via-[#0f172a] to-black px-10 pt-6 pb-12">

            <!-- FILTER -->
            <div
                class="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 shadow-2xl mb-8">

                <div class="flex flex-col lg:flex-row lg:justify-between gap-5 text-white">

                    <!-- Left -->
                    <div class="flex flex-wrap gap-4">

                        <!-- Search -->
                        <input
                            v-model="search"
                            type="text"
                            class="bg-gray-800 border border-white/10 focus:border-orange-500 outline-none rounded-xl px-4 py-3 w-64 text-gray-300 placeholder:text-gray-500 duration-300"
                            placeholder="Cari Film..." 
                        >

                        <!-- Genre -->
                        <select v-model="selectedGenre" class="bg-gray-800 border border-white/10 focus:border-orange-500 outline-none rounded-xl px-4 py-3 text-gray-300 duration-300">
                            <option value="">Semua Genre</option>

                            <option :value="g.name" v-for="g in genres" >
                                {{ g.name }}
                            </option>
                        </select>

                        <!-- Tahun -->
                        <select v-model="selectedTahun" class="bg-gray-800 border border-white/10 focus:border-orange-500 outline-none rounded-xl px-4 py-3 text-gray-300 duration-300">
                            <option value="">Semua Tahun</option>

                            <option :value="y" v-for="y in years">
                                {{ y }}
                            </option>
                        </select>
                    </div>

                    <!-- Right -->
                    <div>

                        <select v-model="urutan" class="bg-gray-800 border border-white/10 focus:border-orange-500 outline-none rounded-xl px-4 py-3 text-orange-400 duration-300" >
                            <option value="terbaru">Terbaru</option>
                            <option value="terlama">Terlama</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- INFO -->
            <div class="flex justify-between items-center mb-6">

                <h3 class="text-gray-300 text-lg">
                    Menampilkan
                    <span class="text-orange-400 font-bold">
                        {{ filteredFilm.length }}
                    </span>
                    Film
                </h3>
            </div>

            <!-- FILM -->
            <div v-if="filteredFilm.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" >

                <button
                    @click="handleNavigate(f.id)"
                    v-for="f in filteredFilm"
                    class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-orange-500/20 hover:shadow-2xl duration-300 group" >

                    <!-- Image -->
                    <div class="overflow-hidden relative">

                        <img :src="`${API_URL}${f.image}`" class="h-72 w-full object-cover group-hover:scale-110 duration-500" >

                        <!-- Overlay -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70">
                        </div>

                        <!-- Year -->
                        <div class="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs text-orange-400 font-semibold border border-orange-500/30" >
                            {{ new Date(f.tanggal_rilis).getFullYear() }}
                        </div>
                    </div>

                    <!-- Detail -->
                    <div class="p-4 flex flex-col gap-2 text-left">

                        <h3 class="font-bold text-white truncate text-lg">
                            {{ f.title }}
                        </h3>

                        <h3 class="text-orange-400 truncate text-sm font-medium">
                            {{ getGenre(f) }}
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

            <!-- EMPTY -->
            <div v-else class="bg-white/5 border border-white/10 rounded-2xl p-14 text-center flex flex-col gap-4" >
                <h3 class="text-4xl font-bold text-gray-400">
                    Film Tidak Ditemukan
                </h3>

                <h5 class="text-gray-500 text-lg">
                    Coba gunakan kata kunci atau filter lainnya.
                </h5>
            </div>

        </div>
    </div>
</template>