//Funció para Filtrar los albums del usuario

export default async function findByIdAlbums(allAlbums, id) {
    if (!allAlbums) {
        return false;
    }
    const userAlbums = await allAlbums.filter(
        album => Number(album.userId) === Number(id)
    );
    return userAlbums;
}