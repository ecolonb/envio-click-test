export default async function getUsersByPage(page) {
    const url = `https://reqres.in/api/users?page=${page}&delay=4`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}