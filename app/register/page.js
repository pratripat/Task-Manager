'use client';

import AuthForm from "@/components/auth-form";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode') || 'login';

    return (
        <AuthForm mode={mode} />
    )
}