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