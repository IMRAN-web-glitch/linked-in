import AuthProvider from "@/components/AuthProvider";
import React from "react";
export default function Home() {
  return (
    <AuthProvider>
      
      <main className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4">
        <div className="bg-white/90 shadow-xl rounded-2xl p-10 max-w-xl w-full text-center border border-blue-100">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 tracking-tight">
            Welcome to{" "}
            <span className="text-blue-500">Mini LinkedIn</span> Community Platform
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8">
            Connect with professionals, share posts, and grow your network!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition"
            >
              Get Started
            </a>
            <a
              href="/feed"
              className="bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg shadow transition"
            >
              Explore Feed
            </a>
          </div>
        </div>
      </main>
    </AuthProvider>
  );
}