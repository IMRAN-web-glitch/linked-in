"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return (
    <main className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-md w-full border border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-8 text-center">
          Sign in to your account
        </h1>
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-2 bg-white border border-blue-200 hover:bg-blue-50 text-blue-700 font-semibold py-3 rounded-lg shadow transition text-lg"
        >
          <svg className="w-6 h-6" viewBox="0 0 48 48">
            <g>
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.5 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C34.1 5.1 29.3 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
              <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c2.7 0 5.2.9 7.2 2.5l6.4-6.4C34.1 5.1 29.3 3 24 3c-7.2 0-13.3 4.1-16.7 10.1z"/>
              <path fill="#FBBC05" d="M24 43c5.3 0 10.1-1.8 13.8-4.9l-6.4-5c-2 1.4-4.5 2.2-7.4 2.2-5.7 0-10.5-3.9-12.2-9.1l-7 5.4C6.7 39.1 14.7 43 24 43z"/>
              <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.2 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2l-7 5.4C17.5 41.1 20.6 43 24 43c7.2 0 13.3-4.1 16.7-10.1z"/>
            </g>
          </svg>
          Sign in with Google
        </button>
        <p className="mt-8 text-center text-slate-600 text-sm">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register with Google
          </a>
        </p>
      </div>
    </main>
  );
}