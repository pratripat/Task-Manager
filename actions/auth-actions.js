import { redirect } from "next/navigation";
import { createUser, getUserByEmail } from "./fetching";

function validate(email, password) {
    let inputErrors = {};

    if (!email.includes('@')) {
        inputErrors.email = 'Please enter a valid email address.';
    }
    if (password.trim().length < 8) {
        inputErrors.password = 'Password must be atleast 8 characters long.'
    }

    return inputErrors;
}

async function login(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    let inputErrors = validate(email, password);

    if (Object.keys(inputErrors).length > 0) {
        return { inputErrors };
    }

    const data = await getUserByEmail(email, password);

    if (data.error) {
        inputErrors.email = 'Failed authentication, please check your credentials';
        return { inputErrors };
    }

    redirect('/tasks');
}

async function signup(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    let inputErrors = validate(email, password);

    if (Object.keys(inputErrors).length > 0) {
        return { inputErrors }
    }

    const data = await createUser(email, password);

    if (data.error) {
        inputErrors.email = data.error;
        return { inputErrors };
    }

    redirect('/tasks');
}

export async function auth(mode, formData) {
    if (mode === 'login') return login(formData);
    return signup(formData);
}

