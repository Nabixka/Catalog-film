export function filmMapping(data: any){
    return{
        id: data.id,
        title: data.title,
        image: data.image,
        description: data.description,
        tanggal_rilis: data.tanggal_rilis
    }
}

export function filmMappingByPemain(data: any){
    return{
        id: data.id,
        film: {
            film_id: data.film_id,
            title: data.title,
            image: data.image,
            description: data.description,
            tanggal_rilis: data.tanggal_rilis 
        }
    }
}