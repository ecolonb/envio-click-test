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

export async function findPhotosByAlbumId(allPhotos, id) {
    if (!allPhotos) {
        return false;
    }
    const photoAlbums = await allPhotos.filter(
        album => Number(album.albumId) === Number(id)
    );
    return photoAlbums;
}