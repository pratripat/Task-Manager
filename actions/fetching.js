import _ from 'lodash';

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

export async function createTask(task) {
    const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // send cookies
        body: JSON.stringify(task)
    });

    return await res.json();
}

export async function editTask(task) {
    const res = await fetch(`/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // send cookies
        body: JSON.stringify(_.pick(task, ['title', 'description', 'priority', 'status', 'dueDate']))
    });

    return await res.json();
}

export async function deleteTask(taskId) {
    const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // send cookies
    });

    return await res.json();
}

export async function logout() {
    const res = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include'
    });

    return await res.json();
}