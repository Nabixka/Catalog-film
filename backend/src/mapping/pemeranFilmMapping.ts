export function pemeranFilmMapping(data: any){
    return {
        id: data.id,
        pemeran: {
            pemeran_id: data.pemeran_id,
            name: data.pemeran_name
        },
        film: {
            film_id: data.film_id,
            title: data.film_title
        }
    }
}