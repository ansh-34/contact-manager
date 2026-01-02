import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await login(form);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900">Login</h2>
        <p className="text-sm text-slate-600">Access your contacts with your account.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm shadow-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm shadow-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
