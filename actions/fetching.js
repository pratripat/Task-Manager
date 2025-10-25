export async function createUser(email, password) {
    const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // send cookies
        body: JSON.stringify({
            email,
            password
        })
    });

    return await res.json();
}

export async function getUserByEmail(email, password) {
    const res = await fetch(`/api/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: 'GET',
        credentials: 'include'
    });

    return await res.json();
}

export async function getTasks() {
    const res = await fetch('/api/tasks', {
        method: 'GET',
        credentials: 'include'
    });

    return await res.json();
}