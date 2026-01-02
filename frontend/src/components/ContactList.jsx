import { useEffect, useState } from "react";
import api from "../lib/api";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => 
  {
    setLoading(true);
    try {
      const res = await api.get(`/api/contacts`);
      setContacts(res.data);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    await api.delete(`/api/contacts/${id}`);
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-sky-600">Saved contacts</p>
        <h2 className="text-xl font-bold text-slate-900">Your list</h2>
        <p className="text-sm text-slate-600">Quick actions and tidy rows.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/70">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white/70">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-slate-500">Loading...</td>
              </tr>
            ) : contacts.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-slate-500">No contacts yet.</td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr key={c._id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 text-sm font-semibold text-slate-900">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{c.email || "—"}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{c.phone}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteContact(c._id)}
                      className="inline-flex items-center rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 shadow-sm ring-1 ring-rose-200 transition hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
