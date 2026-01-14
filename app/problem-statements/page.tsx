"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import MainShell from "@/components/layout/MainShell";
import { problemStatements } from "@/data/problemStatements"; 
import { ArrowRight, ChevronUp, Eye, X, Download, PrinterCheck, DownloadCloudIcon } from "lucide-react"; 
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ProblemStatementsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activePs, setActivePs] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted on the client before using Portals
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const generatePDFDoc = (ps: any) => {
    const doc = new jsPDF();
    
    // Header Title
    doc.setFontSize(18);
    doc.setTextColor(34, 197, 94); // Green-500
    doc.text(`Problem Statement Detail: ${ps.id}`, 14, 20);

    // Boxed Data Table
    autoTable(doc, {
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [34, 197, 94], textColor: [255, 255, 255] },
      body: [
        ["Problem ID", ps.id],
        ["Title", ps.title],
        ["Background & Problem", ps.description],
        ["Expected Solution", ps.expectedSolution?.join("\n\n• ") || "Not Specified"],
        ["Technical Domains", ps.domains],
      ],
      styles: { cellPadding: 6, fontSize: 10, overflow: 'linebreak' },
      columnStyles: {
        0: { fontStyle: 'bold', width: 45, textColor: [34, 197, 94] },
      },
    });

    return doc;
  };

  const handlePreview = (ps: any) => {
    const doc = generatePDFDoc(ps);
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    setActivePs(ps); 
    setPreviewUrl(url);
  };

  const handleDownloadFromModal = () => {
    if (activePs) {
      const doc = generatePDFDoc(activePs);
      doc.save(`${activePs.id}_Detail_Statement.pdf`);
    }
  };

  const closePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setActivePs(null);
    }
  };

  return (
    <MainShell enableScrollNav={false}>
      <section className="pt-25 pb-20 max-w-5xl mx-auto px-4 min-h-screen">
        <h1 className="font-pixel text-3xl md:text-5xl text-center text-green-400 mb-12 uppercase tracking-tighter">
          Problem Statements
        </h1>

        <div className="space-y-4">
          {problemStatements?.map((ps) => (
            <div
              key={ps.id}
              className={`group relative overflow-hidden border transition-all duration-300 rounded-xl ${
                expandedId === ps.id
                  ? "border-green-500 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                  : "border-white/10 bg-black/20 hover:border-green-500/50 hover:bg-green-500/5"
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleExpand(ps.id)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left outline-none"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="font-mono text-green-500 font-bold text-sm md:text-base tracking-widest shrink-0">
                    {ps.id}
                  </span>
                  <h3 className="text-gray-200 font-medium text-sm md:text-lg tracking-tight group-hover:text-white transition-colors">
                    {ps.title}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {expandedId === ps.id ? (
                    <ChevronUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-green-400 transform transition-all group-hover:translate-x-1" />
                  )}
                </div>
              </button>

              {/* Accordion Content */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  expandedId === ps.id ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 border-t border-white/5 space-y-6 bg-black/40">
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => handlePreview(ps)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] active:scale-95"
                    >
                      <PrinterCheck className="w-4 h-4" />
                      Print PDF
                    </button>
                  </div>

                  {/* 1. Background Section */}
                  <div>
                    <h4 className="text-green-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Background & Problem
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-light whitespace-pre-line">
                      {ps.description}
                    </p>
                  </div>

                  {/* 2. Expected Solution Section */}
                  <div>
                    <h4 className="text-green-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Expected Solution
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ps.expectedSolution?.map((sol: string, index: number) => (
                        <li key={index} className="flex gap-2 text-gray-300 text-sm">
                          <span className="text-green-500 shrink-0">▹</span> 
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 3. Domains/Tags Section */}
                  <div className="pt-4 flex items-center gap-3 border-t border-white/5">
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Tags:</span>
                    <div className="flex flex-wrap gap-2">
                      {ps.domains?.split(',').map((domain: string, i: number) => (
                        <span key={i} className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 font-mono">
                          {domain.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PORTAL MODAL --- */}
      {mounted && previewUrl && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl">
          <div className="absolute inset-0" onClick={closePreview} />
          
          <div className="relative z-[10000] w-full max-w-5xl h-[85vh] md:h-full mt-10 md:mt-20 bg-[#0c0c0c] border border-white/20 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.1)]">
            
            {/* Modal Header */}
            <div className="relative z-[10001] flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadFromModal();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-bold text-xs uppercase tracking-tight hover:green-600 transition-all shadow-md active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>

              <h3 className="hidden md:block text-green-400 font-mono font-bold uppercase tracking-widest text-sm">
                Statement Preview
              </h3>
              
              <button 
                onClick={closePreview} 
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* PDF Viewer Container */}
            <div className="flex-1 w-full bg-white relative z-[9999]">
              <iframe
                src={`${previewUrl}#toolbar=0`}
                className="w-full h-full border-none"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </MainShell>
  );
}
