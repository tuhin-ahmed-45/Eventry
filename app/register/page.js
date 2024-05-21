import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <section className="h-screen grid place-items-center">
            <div
                className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md"
            >
                <h4 className="font-bold text-2xl">Register</h4>
                <RegisterForm />

                <span className="text-center text-xs text-gray-500">
                    Already have an account? {" "}
                    <Link className="underline hover:text-indigo-600" href="/login">
                        Login
                    </Link>
                </span>
            </div>
        </section>
    )
}
