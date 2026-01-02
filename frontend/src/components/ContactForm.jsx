import { useState } from "react";
import api from "../lib/api";

export default function ContactForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (form.email && !form.email.includes("@")) newErrors.email = "Email must be valid";
    return newErrors;
  };

  const isValid =
    form.name.trim() &&
    form.phone.trim() &&
    (!form.email || form.email.includes("@"));

  const handleBlur = (field) => {
    const newErrors = { ...errors };
    if (field === "name" && !form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (field === "name") {
      delete newErrors.name;
    }
    
    if (field === "phone" && !form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (field === "phone") {
      delete newErrors.phone;
    }
    
    if (field === "email" && form.email && !form.email.includes("@")) {
      newErrors.email = "Email must be valid";
    } else if (field === "email") {
      delete newErrors.email;
    }
    
    setErrors(newErrors);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await api.post(`/api/contacts`, form);
      setForm({ name: "", email: "", phone: "", message: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white/60 px-4 py-3 text-sm shadow-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition";

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-sky-600">Add contact</p>
        <h2 className="text-xl font-bold text-slate-900">New entry</h2>
        <p className="text-sm text-slate-600">Capture the essentials so you can follow up fast.</p>
      </div>

      {success && (
        <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          ✓ Contact saved successfully!
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input
              className={inputClass + (errors.name ? " border-red-400" : "")}
              placeholder="Name*"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onBlur={() => handleBlur("name")}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          <div>
            <input
              className={inputClass + (errors.phone ? " border-red-400" : "")}
              placeholder="Phone*"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              onBlur={() => handleBlur("phone")}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>
          <div className="sm:col-span-2">
            <input
              className={inputClass + (errors.email ? " border-red-400" : "")}
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onBlur={() => handleBlur("email")}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
        </div>
        <textarea
          className={inputClass + " min-h-30"}
          placeholder="Notes"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? "Saving..." : "Save contact"}
        </button>
      </form>
    </div>
  );
}
