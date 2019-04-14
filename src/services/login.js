export default async function Login(email, password) {
    const requestLoginData = { email, password }

    const url = 'https://reqres.in/api/login';
    const respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestLoginData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const json = await respuesta.json();
    return json;
}