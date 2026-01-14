"use client";

import { useState } from "react";

export default function ProblemList({ problemStatements }) {

"use client";

import { useState } from "react";

export default function ProblemList({ problemStatements }) {
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (id) => setSelectedId(id);
  const closeModal = () => setSelectedId(null);

  return (
    <>
      <div className="space-y-3">
        {problemStatements.map(ps => (
          <ProblemStatementItem 
            key={ps.id} 
            ps={ps} 
            onClick={() => openModal(ps.id)}
          />
        ))}
      </div>

      {selectedId && (
          <Modal
          ps={problemStatements.find(p => p.id === selectedId)} 
          onClose={closeModal} 
        />
      )}
    </>
  );
}

function ProblemStatementItem({ ps, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow border p-4 md:p-5 hover:bg-gray-50 transition cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold text-blue-700 text-lg">{ps.id}</span>
          <span className="text-gray-800 text-base md:text-lg">{ps.title}</span>
        </div>
        <span className="text-2xl text-gray-400">➜</span>
      </div>
    </div>
  );
}

function Modal({ ps, onClose }) {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${ps.id} - ${ps.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 12px; border: 1px solid #ddd; vertical-align: top; }
            .label { background: #f5f5f5; font-weight: bold; width: 25%; }
            .watermark { text-align: right; margin-top: 20px; color: #999; font-size: 14px; }
            ul { margin: 0; padding-left: 20px; }
            li { margin-bottom: 8px; }
            h2 { text-align: center; color: #1d4ed8; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h2>PROBLEM STATEMENT DETAILS</h2>
          <table>
            <tbody>
              <tr><td class="label">Problem Statement ID</td><td>${ps.id}</td></tr>
              <tr><td class="label">Problem Statement Title</td><td>${ps.title}</td></tr>
              <tr><td class="label">Description</td><td style="white-space: pre-line;">${ps.description}</td></tr>
              <tr><td class="label">Expected Solution</td><td><ul>${ps.expectedSolution.map(item => `<li>${item}</li>`).join('')}</ul></td></tr>
              <tr><td class="label">Domains</td><td>${ps.domains}</td></tr>
            </tbody>
          </table>
          <div class="watermark">Hackerrupt'26</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-blue-700">{ps.id} - {ps.title}</h2>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">PDF</button>
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm">✕</button>
          </div>
        </div>
        <div className="p-6">
          <div className="hidden md:block">
            <table className="w-full text-[16px] border">
              <tbody>
                <tr className="border-t"><td className="bg-gray-50 p-4 font-semibold w-1/4">Problem Statement ID</td><td className="p-4">{ps.id}</td></tr>
                <tr className="border-t"><td className="bg-gray-50 p-4 font-semibold w-1/4">Problem Statement Title</td><td className="p-4">{ps.title}</td></tr>
                <tr className="border-t"><td className="bg-gray-50 p-4 font-semibold w-1/4 align-top">Description</td><td className="p-4 whitespace-pre-line leading-relaxed">{ps.description}</td></tr>
                <tr className="border-t"><td className="bg-gray-50 p-4 font-semibold align-top">Expected Solution</td><td className="p-4"><ul className="list-disc pl-6 space-y-2">{ps.expectedSolution.map((item, i) => <li key={i}>{item}</li>)}</ul></td></tr>
                <tr className="border-t"><td className="bg-gray-50 p-4 font-semibold w-1/4">Domains</td><td className="p-4">{ps.domains}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-4">
            <div className="border rounded p-4 bg-white"><div className="font-semibold text-gray-700 mb-2 text-sm uppercase">Problem Statement ID</div><div className="text-gray-900 text-[16px]">{ps.id}</div></div>
            <div className="border rounded p-4 bg-white"><div className="font-semibold text-gray-700 mb-2 text-sm uppercase">Problem Statement Title</div><div className="text-gray-900 text-[16px]">{ps.title}</div></div>
            <div className="border rounded p-4 bg-white"><div className="font-semibold text-gray-700 mb-2 text-sm uppercase">Description</div><div className="text-gray-900 text-[16px]"><p className="whitespace-pre-line leading-relaxed">{ps.description}</p></div></div>
            <div className="border rounded p-4 bg-white"><div className="font-semibold text-gray-700 mb-2 text-sm uppercase">Expected Solution</div><div className="text-gray-900 text-[16px]"><ul className="list-disc pl-5 space-y-2">{ps.expectedSolution.map((item, i) => <li key={i}>{item}</li>)}</ul></div></div>
            <div className="border rounded p-4 bg-white"><div className="font-semibold text-gray-700 mb-2 text-sm uppercase">Domains</div><div className="text-gray-900 text-[16px]">{ps.domains}</div></div>
          </div>
          <div className="text-right mt-6 text-gray-400 text-sm">Hackerrupt'26</div>
        </div>
      </div>
    </div>
  );
}