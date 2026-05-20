<script setup>
    import { onMounted, ref } from 'vue';
    import Navbar from '../components/Navbar.vue';
    import { api } from '../utils/utils';

    const detail = ref({})
    const isLoading = ref(true)
    const { state } = history
    const id = state?.id
    const API_URL = import.meta.env.VITE_API_URL

    const getDetail = async () => {
        try{
            const res = await api.get(`/sutradara/${id}`)
            detail.value = res.data.data
        }
        catch(err){
            console.log
        }
        finally{
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
            <h1 class="text-3xl text-white font-bold">Sutradara</h1>
            <div class="w-75 pt-5">
                <div class="relative overflow-hidden shadow shadow-orange-400 hover:shadow-orange-500 hover:scale-105">
                    <img class="h-80 rounded" :src="`${API_URL}${detail.image}`">
                    <div class="absolute w-full bottom-0 h-1/2 bg-linear-to-t from-black/80 via-gray-900/90 to-transparent"></div>
                </div>
            </div>
        </div>
    </div>
</template>