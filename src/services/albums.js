// Se obtienen los albunes usando promesas
export default function getAllAlbums() {
    const promiseGetAllAlbums = new Promise((resolve, reject) => {
        const url = 'https://jsonplaceholder.typicode.com/albums';
        fetch(url)
            .then(response => {
                response
                    .json()
                    .then(result => {
                        resolve(result);
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
    return promiseGetAllAlbums;
}
// Se obtienen las fotos de un album usando promesas
export function getAllPhotos() {
    const promiseGetAllPhotos = new Promise((resolve, reject) => {
        const url = 'https://jsonplaceholder.typicode.com/photos/';
        fetch(url)
            .then(response => {
                response
                    .json()
                    .then(result => {
                        resolve(result);
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
    return promiseGetAllPhotos;
}