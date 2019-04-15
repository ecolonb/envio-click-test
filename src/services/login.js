export default async function Login(email, password) {
    console.log('On login funtio-->>>>');
    const requestLoginData = { email, password };

    const url = 'https://reqres.in/api/login';
    const respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestLoginData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('respuesta: ', respuesta);
    const json = await respuesta.json();
    console.log('json: ', json);
    return json;
}