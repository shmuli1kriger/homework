export default async function getUsers() {
    let users;
    try {
        const r = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!r.ok) {
            throw new Error(`${r.status} - ${r.statusText}`);
        }
        users = await r.json();
        console.log(users);
    } catch(e) {
        console.error(e);
    }
    return users;
}