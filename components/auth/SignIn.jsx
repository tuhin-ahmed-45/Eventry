'use client'

import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const { auth, setAuth } = useAuth()
    const router = useRouter()

    const logout = () => {
        setAuth(null)
        router.push('/login')
    }

    return (
        <div>
            {
                auth ?
                    (
                        <>
                            <span className="mx-2">Hello {auth?.name}</span>
                            <span className="mx-1">|</span>
                            <a onClick={logout} className="cursor-pointer">Logout</a>
                        </>
                    ) : (
                        <Link href="/login">
                            Login
                        </Link>
                    )
            }
        </div>
    );
}