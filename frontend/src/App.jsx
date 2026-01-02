import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <header className="mb-8 flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-500 animate-pulse" />
            Live contacts
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact Manager</h1>
            <p className="text-slate-600">
              Save new people, keep your list tidy, and reach them quickly.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/70 p-6">
            <ContactForm onSuccess={() => setRefreshKey((k) => k + 1)} />
          </div>
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/70 p-6">
            <ContactList key={refreshKey} />
          </div>
        </div>
      </div>
    </div>
  );
}
