import axios from 'axios';

export default async function getUsersByPage(page) {
    const url = `https://reqres.in/api/users?page=${page}&delay=4`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export async function getUsersWithAlbums() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const usersWithAlbum = await axios.get(url);
    console.log('usersWithAlbum: ', usersWithAlbum);
    return usersWithAlbum;
}