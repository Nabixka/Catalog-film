<script setup>
    import { computed, onMounted, ref } from 'vue';
    import Navbar from '../components/Navbar.vue';
    import { api } from '../utils/utils';

    const films = ref([])
    const API_URL = import.meta.env.VITE_API_URL
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

    onMounted(() => {
        getFilms()
        getFilmGenres()
    })
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
        <div class="bg-gradient-to-b from-[#020617] via-[#0f172a] to-black pl-10 pr-10 pt-5 pb-10">

            <div class="flex justify-between text-white pb-5">
                <div class="flex gap-3">
                    <input v-model="search" type="text"
                        class="border border-gray-500 rounded-md p-1 pl-2 w-50 text-gray-400" placeholder="Cari Film">
                    <select v-model="selectedGenre" class="border border-gray-500 p-2 rounded-md">
                        <option value="">Semua Genre</option>
                        <option :value="g.name" v-for="g in genres">{{ g.name }}</option>
                    </select>
                    <select v-model="selectedTahun" class="border border-gray-500 p-2 rounded-md">
                        <option default value="">Semua Tahun</option>
                        <option :value="y" v-for="y in years">{{ y }}</option>
                    </select>
                </div>
                <div>
                    <select v-model="urutan" class="border border-gray-500 p-2 rounded-md text-orange-500">
                        <option value="terbaru">Terbaru</option>
                        <option value="terlama">Terlama</option>
                    </select>
                </div>
            </div>

            <!-- Film -->
            <div v-if="filteredFilm.length" class="grid grid-cols-2 lg:grid-cols-6 gap-5 border-t border-gray-500 pt-5">
                <div v-for="f in filteredFilm"
                    class="bg-white/5 border-t border-white/10 h-75 rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-orange-500/20 hover:shadow-2xl duration-300 group">

                    <!-- Image -->
                    <div class="overflow-hidden">
                        <img :src="`${API_URL}${f.image}`"
                            class="h-50 w-full object-cover group-hover:scale-110 duration-500">
                    </div>

                    <!-- Detail -->
                    <div class="p-3 flex flex-col gap-1">
                        <h3 class="font-semibold text-white truncate text-lg">
                            {{ f.title }}
                        </h3>
                        <h3 class="text-orange-400 truncate text-sm font-medium">
                            {{ getGenre(f) }}
                        </h3>
                        <h3 class="text-gray-400 text-sm">
                            {{ new Date(f.tanggal_rilis).getFullYear() }}
                        </h3>
                    </div>
                </div>
            </div>

            <div v-else class="w-full">
                <h3 class="text-4xl text-gray-500 border-t border-b border-gray-500 text-center pt-10 pb-10">Tidak Ada Film Yang Ditemukan</h3>
            </div>
        </div>
    </div>
</template>