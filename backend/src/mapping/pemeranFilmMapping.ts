export function pemeranFilmMapping(data: any) {
    return {
        pemeran_id: data.pemeran_id,
        name: data.pemeran_name,
        pemeran_image: data.pemeran_image
    }
}