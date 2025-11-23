"use client";

import React from "react";

interface Props {
  onChange: (file: File | null) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function UploadForm({ onChange, onSubmit, disabled }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex items-center gap-4"
    >
      <input
        type="file"
        accept=".csv"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="submit"
        disabled={disabled}
      >
        {disabled ? "Memproses..." : "Upload & Mulai Job"}
      </button>
    </form>
  );
}
