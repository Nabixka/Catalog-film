export function filmMapping(data: any){
    return{
        id: data.id,
        title: data.title,
        image: data.image,
        description: data.description,
        sutradara: data.sutradara,
        tanggal_rilis: data.tanggal_rilis
    }
}