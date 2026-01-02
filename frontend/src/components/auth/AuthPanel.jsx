import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthPanel() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50 text-slate-900 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full grid gap-6 lg:grid-cols-2">
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/70 p-8">
          {mode === "login" ? <LoginForm /> : <SignupForm />}
        </div>
        <div className="bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/70 p-8 flex flex-col justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-sky-600">Secure access</p>
            <h1 className="text-3xl font-bold">Manage your contacts anywhere</h1>
            <p className="text-slate-600">Sign up or log in to keep your contacts private and synced.</p>
          </div>
          <div className="flex gap-3 pt-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition ${mode === "login" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-slate-800 border-slate-200 hover:border-sky-200"}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition ${mode === "signup" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-slate-800 border-slate-200 hover:border-sky-200"}`}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
