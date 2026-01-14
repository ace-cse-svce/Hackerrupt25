"use client";

import { useState } from "react";
import { problemStatements } from "@/data/problemStatements";
import ProblemStatementDetails from "./ProblemStatementDetails";

export default function Clients() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Problem Statements – Hackerrupt&apos;26
      </h1>
"use client";

import { useState } from "react";
import { problemStatements } from "@/data/problemStatements";
import ProblemStatementDetails from "./ProblemStatementDetails";

export default function Clients() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Problem Statements – Hackerrupt&apos;26
      </h1>

      {/* LIST VIEW */}
      <div className="space-y-3">
        {problemStatements.map(ps => (
          <div
            key={ps.id}
            onClick={() => setSelectedId(ps.id)}
            className="bg-white rounded-lg shadow border p-4 md:p-5 hover:bg-gray-50 transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-bold text-blue-700 text-lg">
                  {ps.id}
                </span>
                <span className="text-gray-800 text-base md:text-lg">
                  {ps.title}
                </span>
              </div>
              <span className="text-2xl text-gray-400">➜</span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedId && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="font-bold text-blue-700">
                {selectedId}
              </h2>
              <button
                onClick={() => setSelectedId(null)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                ✕
              </button>
            </div>

            {/* DETAILS */}
            <ProblemStatementDetails id={selectedId} />
          </div>
        </div>
      )}
    </div>
  );
}
