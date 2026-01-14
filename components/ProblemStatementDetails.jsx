"use client";

import { problemStatements } from "@/data/problemStatements";

export default function ProblemStatementDetails({ id }) {
  const ps = problemStatements.find(p => p.id === id);
  if (!ps) return null;

  return (
    <div className="p-4 md:p-6 relative">

      {/* BACKGROUND LOGO */}
      <div
        className="absolute inset-0 opacity-[0.05] bg-center bg-no-repeat bg-contain pointer-events-none"
        style={{ backgroundImage: "url('/acelogo.png')" }}
      />

      {/* TITLE */}
      <div className="relative mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-blue-700">
          PROBLEM STATEMENT DETAILS
        </h2>
      </div>

      {/* DESKTOP VIEW */}
      <div className="relative hidden md:block">
        <table className="w-full text-[18px] border">
          <tbody>
            <Row label="Problem Statement ID" value={ps.id} />
            <Row label="Problem Statement Title" value={ps.title} />

            <tr className="border-t">
              <td className="bg-gray-50 p-5 font-semibold w-1/4">
                Description
              </td>
              <td className="p-5 whitespace-pre-line leading-relaxed">
                {ps.description}
              </td>
            </tr>

            <tr className="border-t">
              <td className="bg-gray-50 p-5 font-semibold align-top">
                Expected Solution
              </td>
              <td className="p-5">
                <ul className="list-disc pl-6 space-y-2">
                  {ps.expectedSolution.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </td>
            </tr>

            <Row label="Domains" value={ps.domains} />
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="relative md:hidden space-y-4">
        <MobileBlock label="Problem Statement ID">{ps.id}</MobileBlock>
        <MobileBlock label="Problem Statement Title">{ps.title}</MobileBlock>

        <MobileBlock label="Description">
          <p className="whitespace-pre-line leading-relaxed">
            {ps.description}
          </p>
        </MobileBlock>

        <MobileBlock label="Expected Solution">
          <ul className="list-disc pl-5 space-y-2">
            {ps.expectedSolution.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </MobileBlock>

        <MobileBlock label="Domains">{ps.domains}</MobileBlock>
      </div>

      {/* WATERMARK */}
      <div className="relative text-right mt-6 text-gray-400 text-sm">
        Hackerrupt&apos;26
      </div>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function Row({ label, value }) {
  return (
    <tr className="border-t">
      <td className="bg-gray-50 p-5 font-semibold w-1/4">{label}</td>
      <td className="p-5">{value}</td>
    </tr>
  );
}

function MobileBlock({ label, children }) {
  return (
    <div className="border rounded p-4 bg-gray-50">
      <div className="font-semibold text-gray-700 mb-2 text-sm uppercase">
        {label}
      </div>
      <div className="text-gray-900 text-[16px]">
        {children}
      </div>
    </div>
  );
}
