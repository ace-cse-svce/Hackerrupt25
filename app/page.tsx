"use client";

import { useEffect, useRef, useState } from "react";
import MainShell from "@/components/layout/MainShell";
import { supabase } from "@/lib/supabaseClient";
import confetti from "canvas-confetti";

// Helper component for the animated mascot
const Mascot = ({ pongalMounted, pongalActive, pongalSettled }: { pongalMounted?: boolean; pongalActive?: boolean; pongalSettled?: boolean }) => (
  <div className="relative w-96 h-90 animate-bob flex items-center justify-center mb-0">
    {/* Glowing ring around mascot */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 blur-2xl animate-pulse"></div>
    
    {/* Multiple rotating rings */}
    <div className="absolute inset-4 rounded-full border border-cyan-400/30 animate-spin" style={{animationDuration: '20s'}}></div>
    <div className="absolute inset-8 rounded-full border border-purple-400/30 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
    <div className="absolute inset-12 rounded-full border border-pink-400/30 animate-spin" style={{animationDuration: '25s'}}></div>
    
    {pongalMounted ? (
      <img
        src="/pongal.png"
        alt=""
        aria-hidden="true"
        className={`relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.8)] transition-all duration-500 pongal-image ${pongalActive ? 'visible' : ''} ${pongalSettled ? 'settled' : ''}`}
      />
    ) : (
      <img
        src="/sr.png"
        alt="Hackerrupt Mascot"
        className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.8)] hover:drop-shadow-[0_0_40px_rgba(168,85,247,0.9)] transition-all duration-500 hover:scale-110"
      />
    )}
    
    {/* Floating particles around mascot */}
    <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
    <div className="absolute top-20 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-80"></div>
    <div className="absolute bottom-16 left-12 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-50"></div>
    <div className="absolute bottom-10 right-16 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-70"></div>
  </div>
);

// Toast notification component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-4 z-[70] animate-slide-in-right">
      <div className={`
        px-6 py-4 rounded-lg shadow-2xl border backdrop-blur-sm
        flex items-center gap-3 min-w-[300px] max-w-[400px]
        ${type === 'success' 
          ? 'bg-green-900/90 border-green-500/50 text-green-100' 
          : 'bg-red-900/90 border-red-500/50 text-red-100'
        }
      `}>
        <div className={`text-2xl ${
          type === 'success' ? 'text-green-400' : 'text-red-400'
        }`}>
          {type === 'success' ? '✅' : '❌'}
        </div>
        <div className="flex-1 text-sm font-medium">
          {message.replace('❌ ', '').replace('✅ ', '')}
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors ml-2"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const Input = ({
  name,
  placeholder,
  type = "text",
  required = true,
}: {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    required={required}
    className="w-full p-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
  />
);

const Section = ({ title }: { title: string }) => (
  <h2 className="text-xl font-bold text-green-400 mt-6 mb-4 border-b border-green-400/30 pb-2">{title}</h2>
);

const RegistrationModal = ({ isOpen, onClose, showToast }: { isOpen: boolean; onClose: () => void; showToast: (message: string, type: 'success' | 'error') => void }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [totalParticipants, setTotalParticipants] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    if (!formRef.current) {
      showToast("Form error. Please try again.", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData(formRef.current);
    const payload = Object.fromEntries(formData.entries());

    // Remove p4 fields if total_participants is 3
    if (payload.total_participants === "3") {
      delete payload.p4_name;
      delete payload.p4_register_number;
      delete payload.p4_email;
      delete payload.p4_mobile_number;
      delete payload.p4_college_name;
      delete payload.p4_degree;
      delete payload.p4_branch;
      delete payload.p4_year_of_study;
    }

    // Extra safety: prevent empty values
    const hasEmptyField = Object.values(payload).some(
      (value) => value === "" || value === null
    );

    if (hasEmptyField) {
      showToast("Please fill in all fields", "error");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("team_registrations")
      .insert([payload]);

    if (error) {
      console.error(error);
      showToast("Submission failed", "error");
    } else {
      showToast("Registration successful! Confirmation email will be sent shortly.", "success");
      if (formRef.current) {
        formRef.current.reset();
      }
      setTotalParticipants("");
      setAgreedToTerms(false);
      setTimeout(() => {
        onClose();
      }, 2000);
    }

    setLoading(false);
  };



  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-start justify-center z-[60] p-2 md:p-4 pt-4 md:pt-20"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-green-500/50 rounded-xl shadow-2xl w-full max-w-4xl max-h-[92vh] md:max-h-[85vh] overflow-y-auto mt-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-900 border-b border-green-500/50 p-6 flex justify-between items-center z-10">
          <h1 className="font-pixel text-2xl md:text-3xl text-green-400">
            Hackerrupt'26 Team Registration
          </h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Team Info */}
          <Section title="Team Information" />
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="team_email" placeholder="Team Email" type="email" />
            <Input name="team_name" placeholder="Team Name" />
            <select
              name="total_participants"
              required
              value={totalParticipants}
              onChange={(e) => setTotalParticipants(e.target.value)}
              className="w-full p-3 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
            >
              <option value="">Total Participants</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          {/* Participant 1 */}
          <Section title="Participant 1 (Team Leader)" />
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="p1_name" placeholder="Full Name" />
            <Input name="p1_register_number" placeholder="Register Number" />
            <Input name="p1_email" placeholder="Email" type="email" />
            <Input name="p1_mobile_number" placeholder="Mobile Number" />
            <Input name="p1_college_name" placeholder="College Name" />
            <select
              name="p1_degree"
              required
              className="w-full p-3 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
            >
              <option value="">Degree</option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
            </select>
            <Input name="p1_branch" placeholder="Branch" />
            <Input name="p1_year_of_study" placeholder="Year of Study" />
          </div>

          {/* Participant 2 */}
          <Section title="Participant 2" />
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="p2_name" placeholder="Full Name" />
            <Input name="p2_register_number" placeholder="Register Number" />
            <Input name="p2_email" placeholder="Email" type="email" />
            <Input name="p2_mobile_number" placeholder="Mobile Number" />
            <Input name="p2_college_name" placeholder="College Name" />
            <select
              name="p2_degree"
              required
              className="w-full p-3 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
            >
              <option value="">Degree</option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
            </select>
            <Input name="p2_branch" placeholder="Branch" />
            <Input name="p2_year_of_study" placeholder="Year of Study" />
          </div>

          {/* Participant 3 */}
          <Section title="Participant 3" />
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="p3_name" placeholder="Full Name" />
            <Input name="p3_register_number" placeholder="Register Number" />
            <Input name="p3_email" placeholder="Email" type="email" />
            <Input name="p3_mobile_number" placeholder="Mobile Number" />
            <Input name="p3_college_name" placeholder="College Name" />
            <select
              name="p3_degree"
              required
              className="w-full p-3 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
            >
              <option value="">Degree</option>
              <option value="B.E">B.E</option>
              <option value="B.Tech">B.Tech</option>
            </select>
            <Input name="p3_branch" placeholder="Branch" />
            <Input name="p3_year_of_study" placeholder="Year of Study" />
          </div>

          {/* Participant 4 - Only show if total_participants is 4 */}
          {totalParticipants === "4" && (
            <>
              <Section title="Participant 4" />
              <div className="grid md:grid-cols-2 gap-4">
                <Input name="p4_name" placeholder="Full Name" required={totalParticipants === "4"} />
                <Input name="p4_register_number" placeholder="Register Number" required={totalParticipants === "4"} />
                <Input name="p4_email" placeholder="Email" type="email" required={totalParticipants === "4"} />
                <Input name="p4_mobile_number" placeholder="Mobile Number" required={totalParticipants === "4"} />
                <Input name="p4_college_name" placeholder="College Name" required={totalParticipants === "4"} />
                <select
                  name="p4_degree"
                  required={totalParticipants === "4"}
                  className="w-full p-3 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
                >
                  <option value="">Degree</option>
                  <option value="B.E">B.E</option>
                  <option value="B.Tech">B.Tech</option>
                </select>
                <Input name="p4_branch" placeholder="Branch" required={totalParticipants === "4"} />
                <Input name="p4_year_of_study" placeholder="Year of Study" required={totalParticipants === "4"} />
              </div>
            </>
          )}

          {/* Drive Link Section */}
          <Section title="Instructions for Submission" />
          <div className="bg-black/40 border border-yellow-500/50 rounded-lg p-4 mb-4">
            <p className="text-yellow-300 font-semibold mb-2">📋 Important Instructions:</p>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Upload all required documents (solution ppt in pdf format, (optional) abstract-maximum of 250 words document, (optional) git repository, etc.) to Google Drive</li>
              <li>Save the file as (Problem ID_PPT - Team Name, Example HK2601_PPT - Team_ACE) and (Problem ID_Abstract - Team Name, Example HK2601_Abstract - Team_Coders).</li>
              <li>Make sure the folder/file is accessible via link (set sharing permissions)</li>
              <li>Copy the shareable link from Google Drive</li>
              <li>Paste the complete Drive link in the field below</li>
              <li>Ensure the link is valid and accessible-public before submitting</li>
              <li>Please note that this submission confirms only registration, shortlisting for the finals is subjected to further evaluation</li>
            </ul>
          </div>
          <div className="mb-4">
            <Input
              name="drive_link"
              placeholder="https://drive.google.com/..."
              type="url"
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-start space-x-3 mb-6 p-4 bg-black/40 border border-gray-700 rounded-lg">
            <input
              type="checkbox"
              id="terms-checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-5 h-5 text-green-400 bg-black/60 border-gray-700 rounded focus:ring-2 focus:ring-green-400 focus:ring-offset-0 cursor-pointer"
              required
            />
            <label htmlFor="terms-checkbox" className="text-gray-300 text-sm cursor-pointer">
              I confirm that I have read and understood the instructions above. I have verified that my Drive link is accessible and contains all required documents. I agree to proceed with the registration.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !agreedToTerms}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>

          {status && (
            <p className={`text-center font-medium mt-2 ${status.includes("✅") ? "text-green-400" : "text-red-400"}`}>
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

const HomeSection = ({ onRegisterClick, pongalMounted, pongalActive, pongalSettled }: { onRegisterClick: () => void; pongalMounted?: boolean; pongalActive?: boolean; pongalSettled?: boolean }) => (
  <div
  id="home"
  className="
    min-h-screen flex flex-col items-center justify-start
    text-center px-3 sm:px-4
    pt-2
    -mt-[64px] sm:-mt-[72px]
    relative
  "
  style={{
    backgroundImage: "url('/pongal-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
    {/* Overlay for better text readability */}
    <div className="absolute inset-0 bg-black/40 z-0"></div>
    
    <div className="relative z-10 w-full flex flex-col items-center">
    <Mascot pongalMounted={pongalMounted} pongalActive={pongalActive} pongalSettled={pongalSettled} />
    <div className="flex flex-col items-center justify-center text-center">
            <p className="font-serif italic text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text font-extrabold text-lg sm:text-2xl md:text-3xl tracking-widest uppercase animate-pulse mb-2">
              Association of Computer Engineers
            </p>

            <p className="font-serif italic text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text font-semibold text-base sm:text-lg md:text-xl tracking-wide mb-3">
              Department of Computer Science Engineering
            </p>

            <p className="font-serif text-transparent bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400 bg-clip-text font-bold text-sm sm:text-xl md:text-xl tracking-widest">
              PRESENTS
            </p>
          </div>
    {/* Title */}
    <h1 className="font-pixel text-2xl xs:text-3xl sm:text-4xl md:text-7xl mb-3 animate-text-glitch leading-snug break-words">
      &lt;Hackerrupt'26&gt;
    </h1>
    <p className="text-pink-400 font-bold mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl">
      Date : Jan 31 & Feb 1
    </p>

 <p className="text-pink-400 font-bold mb-10 sm:mb-12 text-lg sm:text-xl md:text-2xl">
  Venue :{" "}
  <a
    href="https://maps.app.goo.gl/uDWAWYucR8QmuNp76"
    target="_blank"
    rel="noopener noreferrer"
    className="no-underline hover:text-purple-300 transition"
  >
    CodeWork.Ai, Chennai
  </a>
</p>



    {/* Buttons Container */}
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
      <button
        disabled
        className="group relative w-[85%] sm:w-auto mx-auto px-8 py-3 rounded-xl
      text-base sm:text-lg font-bold tracking-wide
      text-gray-400
      bg-gray-600
      shadow-lg
      cursor-not-allowed
      overflow-hidden"
      >
        Registration Closed
      </button>
      <a
    href="/problem-statements"
    className="group relative w-[85%] sm:w-auto mx-auto px-8 py-3 rounded-xl
      text-base sm:text-lg font-bold tracking-wide
      text-white
      bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600
      shadow-lg shadow-purple-500/30
      transition-all duration-300
      hover:scale-105 hover:shadow-indigo-500/40
      overflow-hidden"
  >
    <span className="relative z-10">Problem Statements</span>
    <span className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
  </a>
    </div>
    </div>
  </div>
);
const TimerSection = ({ forwardRef }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("January 25, 2026 23:59:59").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const CircularUnit = ({ value, label, max }) => {
    const radius = 65;
    const stroke = 8;
    const normalizedRadius = radius - stroke;
    const circumference = normalizedRadius * 2 * Math.PI;
    const offset = circumference - (value / max) * circumference;

    return (
      <div className="flex flex-col items-center justify-center relative">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center rounded-full bg-gradient-to-br from-black/20 to-black/40 backdrop-blur-sm border border-white/10 shadow-2xl">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r={normalizedRadius}
              stroke="#1f2937"
              strokeWidth={stroke}
              fill="transparent"
            />
            <circle
              cx="70"
              cy="70"
              r={normalizedRadius}
              stroke="#05FFa1"
              strokeWidth={stroke}
              fill="transparent"
              strokeDasharray={circumference}
              style={{
                strokeDashoffset: offset,
                filter: "drop-shadow(0 0 8px #05FFa1)",
              }}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl sm:text-4xl font-mono font-black text-white leading-none">
              {value.toString().padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#05FFa1] mt-1 font-bold">
              {label}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={forwardRef} className="py-16 flex flex-col items-center justify-center text-center px-4 overflow-visible bg-transparent">
      <div className="max-w-6xl mx-auto w-full">
        {/* Registration Closes Header */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text mb-4 animate-pulse">
            Shortlisted teams will be announced on or before January 28, 2026
          </h3>
         
          <div className="w-32 h-1 bg-gradient-to-r from-red-400 to-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 lg:flex lg:justify-center items-center gap-y-12 gap-x-8 sm:gap-16 justify-items-center">
          <CircularUnit value={timeLeft.days} label="Days" max={31} />
          <CircularUnit value={timeLeft.hours} label="Hours" max={24} />
          <CircularUnit value={timeLeft.minutes} label="Minutes" max={60} />
          <CircularUnit value={timeLeft.seconds} label="Seconds" max={60} />
        </div>
      </div>
    </section>
  );
};
const PrizePoolSection = () => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.6 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    // Re-introduce min-h-screen or a fixed height to ensure the orbit container doesn't collapse
    // Use py-20 to maintain space while reducing the massive py-32 gap
    <section ref={ref}
      // Changed: min-h-screen -> min-h-fit (or remove it)
      // Changed: py-32 -> pt-20 pb-0 (reduces bottom gap significantly)
      className="min-h-fit flex items-center justify-center px-4 pt-20 pb-0 relative overflow-visible bg-transparent"
    >
      <div className="flex flex-col items-center gap-12 relative z-10 w-full">
        <div className="text-center">
          <h2 className="font-pixel text-3xl md:text-5xl mb-8 text-green-400 animate-slide-in-down">
            Prize Pool
          </h2>
        </div>

        {/* Adjust container height if it's pushing content down too far */}
        <div className="relative w-[500px] h-[500px] max-w-[90vw] max-h-[90vw]">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 animate-spin" style={{ animationDuration: '20s' }}></div>

          {/* Subtle central glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>
          </div>

          {/* Central Triangle and Text */}
          <div className="absolute inset-0 flex items-center justify-center">
          <div className="triangle-core relative flex flex-col items-center justify-center">
              <svg viewBox="0 0 260 260" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
                <polygon points="130,20 240,200 20,200" fill="url(#triangleGradient)" stroke="#facc15" strokeWidth="4" />
              </svg>
              <div className="relative z-10 flex flex-col items-center justify-center mt-6">
                <h3 className="text-5xl font-black text-white/90 drop-shadow-2xl animate-pulse mb-1">100K+</h3>
                <p className="text-sm font-bold text-yellow-400 tracking-widest uppercase">Worth of</p>
              </div>
            </div>
          </div>

          {/* Orbiting Hexagons */}
          <Hex label="INTERNSHIPS & PLACEMENTS" show={show} delay="0ms" pos="top-left" />
          <Hex label="NETWORKING & MENTORSHIPS" show={show} delay="120ms" pos="top-right" />
          <Hex label="PRIZES & EXPOSURE" show={show} delay="240ms" pos="bottom" />
        </div>
      </div>
    </section>
  );
};

const hexPositions = {
  // Pulling them inward slightly (0.8 factor) to ensure they stay inside the 500x500 box
  "top-left": "translate(calc(-50% - var(--radius) * 0.7), calc(-50% - var(--radius) * 0.4))",
  "top-right": "translate(calc(-50% + var(--radius) * 0.7), calc(-50% - var(--radius) * 0.4))",
  "bottom": "translate(-50%, calc(-50% + var(--radius) * 0.8))",
};

const Hex = ({ label, show, pos, delay }) => (
  <div
    className="absolute top-1/2 left-1/2 flex items-center justify-center text-center tracking-widest text-white group cursor-pointer"
    style={{
      width: "var(--hex-size)", height: "var(--hex-size)", fontSize: "var(--hex-font-size)",
      "--radius": "var(--orbit-radius)",
      transform: show ? hexPositions[pos] : "translate(-50%, -50%) scale(0.1)",
      opacity: show ? 1 : 0,
      transition: `all 900ms cubic-bezier(0.16,1,0.3,1) ${delay}`,
    }}
  >
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      <polygon points="25,5 75,5 100,50 75,95 25,95 0,50" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="3" />
    </svg>
    <span className="relative z-10 px-3 font-bold text-yellow-100">{label}</span>
  </div>
);


const ScrollReveall = ({ children, direction = 'up', delay = '0s', className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const hiddenStyles = {
    up: 'opacity-0 translate-y-10',
    down: 'opacity-0 -translate-y-10',
    left: 'opacity-0 -translate-x-20',
    right: 'opacity-0 translate-x-20',
  };

  const visibleStyle = 'opacity-100 translate-x-0 translate-y-0';

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-1000 ease-out ${isVisible ? visibleStyle : hiddenStyles[direction]
        } ${className}`}
      style={{ transitionDelay: isVisible ? delay : '0s' }}
    >
      {children}
    </div>
  );
};


const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
    },
    {
      threshold: 0.3,
    }
  );

  if (sectionRef.current) observer.observe(sectionRef.current);

  return () => observer.disconnect();
}, []);


  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-10 py-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="font-pixel text-3xl md:text-5xl mb-8 text-green-400 animate-slide-in-down">
          About HACKERRUPT
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side text */}
          <div
            className={`space-y-6 transition-all duration-1000 ease-out
              ${isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-16"}`}
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              HACKERRUPT is more than just a hackathon — it's a revolution in problem-solving.
              We bring together the brightest minds to transform bugs into breakthrough innovations.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Join us for 24 hours of intense coding, creative thinking, and collaborative building
              as we tackle real-world challenges with cutting-edge technology.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <span className="px-4 py-2 bg-purple-600/30 rounded-full text-purple-300 border border-purple-500">
                24hrs of Innovation
              </span>
              <span className="px-4 py-2 bg-green-600/30 rounded-full text-green-300 border border-green-500">
                Collaboration
              </span>
              <div className="flex justify-center w-full">
                <span className="px-4 py-2 bg-blue-600/30 rounded-full text-blue-300 border border-blue-500">
                  Technology
                </span>
              </div>
            </div>
          </div>

          {/* Right side video */}
          <div className="animate-slide-in-right relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 blur-2xl animate-pulse"></div>
            <div
              className="absolute inset-4 rounded-full border border-green-400/30 animate-spin"
              style={{ animationDuration: "20s" }}
            />
            <div
              className="absolute inset-8 rounded-full border border-cyan-400/20 animate-spin"
              style={{ animationDuration: "15s", animationDirection: "reverse" }}
            />

            <div className="relative w-64 h-64 mx-auto mt-12 rounded-full overflow-hidden border-2 border-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 p-1 shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:scale-105">
              <video
                src="/robot.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const TimelineItem = ({ item, index, lineProgress, totalItems, setActiveIndex }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const domRef = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
  if (isMobile) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setActiveIndex(index); // 🔥 KEY LINE
        }
      },
      { threshold: 0.4 }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  } else {
    const threshold = ((index + 1) / totalItems) * 100;
    setIsVisible(lineProgress >= threshold);
  }
}, [lineProgress, index, totalItems, isMobile]);


  return (
    <div
      ref={domRef}
      className={`flex items-center w-full mb-12 transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${isMobile ? "flex-col" : isEven ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Card */}
      <div
        className={`${
          isMobile
            ? "w-full pl-12 pr-4 text-left"
            : `w-5/12 ${isEven ? "text-right pr-8" : "text-left pl-8"}`
        }`}
      >
        <div
          className={`bg-black/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4
            hover:border-green-400 transition-all duration-500 shadow-lg transform
            ${
              isVisible
                ? "translate-x-0"
                : isMobile
                ? ""
                : isEven
                ? "translate-x-20"
                : "-translate-x-20"
            }`}
        >
          <div className="text-green-400 font-bold text-lg">{item.time}</div>
          <div className="text-purple-400 text-sm mb-1">{item.day}</div>
          <div className="text-white font-semibold mb-2 text-xs md:text-lg">
            {item.event}
          </div>
          <div className="text-gray-300 text-sm">{item.description}</div>
        </div>
      </div>

      {/* Center Dot */}
      <div className={`${isMobile ? "absolute left-5" : "w-2/12 flex justify-center"}`}>
  <div
    className={`w-4 h-4 rounded-full border-4 border-black relative z-10
      transition-all duration-500 delay-300
      ${isVisible ? "bg-green-400 scale-125" : "bg-transparent scale-0"}`}
  >
    {isVisible && (
      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
    )}
  </div>
</div>


      {!isMobile && <div className="w-5/12" />}
    </div>
  );
};


const TimelineSection = () => {
  const [lineHeight, setLineHeight] = useState(0);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const prevProgressRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const timelineData = [
    {
      time: "12:00 AM",
      event: "Abstract Submission Closes",
      day: "26 Jan 2026",
      description: "Deadline for abstract PPT submission",
    },
    {
      time: "10:00 AM",
      event: "Announcement of Shortlisted Teams for finale",
      day: "28 Jan 2026",
      description: "This confirms the teams spot on the finale event and registration fee payment link will be shared.",
    },

    {
      time: "08:30 AM",
      event: "Registration & Inauguration",
      day: "Day 1 - Jan 31 2026",
      description: "Participant check-in and opening ceremony",
    },
    {
      time: "10:00 AM",
      event: "Hackathon Begins",
      day: "Day 1 - Jan 31 2026",
      description: "24-hour coding challenge starts",
    },
    {
      time: "7:30 PM",
      event: "First round Evaluation",
      day: "Day 1 - Jan 31 2026",
      description: "Mentor evaluation and feedback with Q&A section",
    },
    {
      time: "10:00 AM",
      event: "Final Review & Hackathon Ends",
      day: "Day 2 - Feb 1 2026",
      description: "Conclusion of Hackathon with Final submissions and judging",
    },
    {
      time: "12:30 PM",
      event: "Awards Ceremony & Vote of Thanks",
      day: "Day 2 - Feb 1 2026",
      description: "Announcement of Results and prize distribution. The closing ceremony will follow.",
    },
  ];

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollTop = windowHeight - rect.top;
const progress = (scrollTop / rect.height) * 100;


      setLineHeight(Math.max(0, Math.min(100, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="font-pixel text-3xl md:text-5xl mb-16 text-center text-green-400">
          Event Timeline
        </h2>

        <div className="relative" ref={containerRef}>
          {/* Animated Line */}
          <div
  className={`absolute top-0 
    ${isMobile ? "left-6 w-0.5" : "left-1/2 w-1 -translate-x-1/2"}
    bg-gradient-to-b from-green-400 via-purple-600 to-indigo-900
    rounded-b-full origin-top
    transition-[height] duration-700 ease-out
    shadow-[0_0_15px_rgba(34,211,238,0.5)]`}
  style={{
    height: isMobile
      ? activeIndex >= 0
        ? `${(activeIndex + 1) * (100 / timelineData.length)}%`
        : "0%"
      : `${Math.min(lineHeight, 95)}%`,
  }}
/>



          <div className="space-y-12 relative z-10">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                lineProgress={lineHeight}
                totalItems={timelineData.length}
                setActiveIndex={setActiveIndex}
              />

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const handleScroll = () => {
  if (!containerRef.current) return;

  const rect = containerRef.current.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const visible = windowHeight - rect.top;
  let progress = (visible / (rect.height + windowHeight)) * 100;

  progress = Math.max(0, Math.min(100, progress));

  // 🔥 Detect scroll direction
  const prev = prevProgressRef.current;

  if (progress < prev) {
    // Scrolling UP → collapse faster
    progress = prev - (prev - progress) * 1.6;
  }

  prevProgressRef.current = progress;
  setLineHeight(progress);
};



const TeamsSection = () => {
  const [selectedTeam, setSelectedTeam] = useState("Core Team")

  const teams = {
    "Core Team": [
      {
        name: "Mithun S",
        role: "President",
        image: "/boat.jpg",

      },
      {
        name: "Kiran M S",
        role: "Vice President",
        image: "/kiran.png",

      },
      {
        name: "Srinidhi S",
        role: "Vice President",
        image: "/srinidhi.png",

      },
      {
        name: "Harsh S",
        role: "Vice President",
        image: "/harsh.png",

      },
      {
        name: "Jai Krishna Prasath D",
        role: "Secretary",
        image: "/jai.png",

      },

      {
        name: "Sarvesh Ragav B",
        role: "Operations Head",
        image: "/raghav1.png",

      },

      {
        name: "Ashika Haseen S",
        role: "Treasurer",
        image: "/ashika.png",

      },

      {
        name: "Nirrmal G",
        role: "Joint Secretary",
        image: "/nirrms.png",

      },
    ],
    "Executive Team": [
      {
        name: "Johan A",
        role: "Executive Associative",
        image: "/johan.png",

      },
      {
        name: "Aravintth T",
        role: "Executive Associative",
        image: "/aravintth.jpeg",

      },
      {
        name: "Shrinidhi Dasaraty",
        role: "Executive Associative",
        image: "/shrinithi.png",

      },

      {
        name: "Kavya K P",
        role: "Executive Associative",
        image: "/kavya.png",

      },
      {
        name: "Mirthun K S",
        role: "Executive Member",
        image: "/mirthun.png",

      },
      {
        name: "Shree Kowsik S B",
        role: "Executive Member",
        image: "/kowsik.png",

      },

      {
        name: "Salai B Dharshini",
        role: "Executive Member",
        image: "/salai.png",

      },

      {
        name: "C Dhinesh",
        role: "Executive Member",
        image: "/dhinesh.png",

      },

      {
        name: "Alagu Manikandan",
        role: "Executive Member",
        image: "/am.png",

      },
      {
        name: "Rethinagiri S",
        role: "Executive Member",
        image: "/rethinagiri.png",

      },

      {
        name: "Arpitha Paraneetharan",
        role: "Executive Member",
        image: "/arpritha.png",

      },
      {
        name: "Kesava Navya",
        role: "Executive Member",
        image: "/kesava.png",

      },
    ],

    "Web Team": [
      {
        name: "Sharmile S",
        role: "Web Team Lead",
        image: "/sharmile.png",
      },
      {
        name: "Sri Ram R",
        role: "Web Team Member",
        image: "/sri.png",
      },
      {
        name: "B Jashwanth Shankar",
        role: "Web Team Member",
        image: "/jaswanth.png",
      },
    ],

    "Design Team": [
      {
        name: "Aneesh Kumar R",
        role: "Design Team Head",
        image: "/hari.jpeg",

      },
      {
        name: "Nantha Kishore S",
        role: "Design Team Member",
        image: "/nantha.png",

      },
      {
        name: "Kanisha S",
        role: "Design Team Member",
        image: "/kanisha.png",

      },
      {
        name: "Rajeshwari B C",
        role: "Design Team Member",
        image: "/raje.png",

      },
      {
        name: "Kavinithi R P",
        role: "Design Team Member",
        image: "/kavinithi.png",

      },
    ],
    "Content Team": [
      {
        name: "Sadhana S",
        role: "Content Team Head",
        image: "/sadhana.png",

      },
      {
        name: "Mona Shree",
        role: "Content Team Member",
        image: "/mona.png",

      },
      {
        name: "Vaishnavi Chitraa M",
        role: "Content Team Member",
        image: "/vaishnavi.png",

      },
      {
        name: "Tharun Kumar T",
        role: "Content Team Member",
        image: "/tk.png",

      },
    ],
    "Marketing And Outreach Team": [
      {
        name: "Shashank N S",
        role: "Marketing Team Head",
        image: "/shashank.png",

      },
      {
        name: "Hariganesh A",
        role: "Outreach Team Head",
        image: "/harii.jpeg",

      },
      {
        name: "Priyanka A",
        role: "Marketing Team Member",
        image: "/priyanka.png",

      },
      {
        name: "Sharmila M",
        role: "Marketing Team Member",
        image: "/sharmila.png",

      },
      {
        name: "Bhavana G",
        role: "Marketing Team Member",
        image: "/bhavana.png",

      },
    ],
    "Photography Team": [
      {
        name: "V Raghav",
        role: "Photography Team Member",
        image: "/raghav.png",

      },
    ],

    "Faculty Co-ordinator": [
      {
        name: "DR.G Janaka Sudha",
        role: "Faculty Coordinator",
        image: "/js.jpeg",

      },
      {
        name: "MR.K Srinivasan",
        role: "Faculty Coordinator",
        image: "/srini.jpeg",

      },
      {
        name: "MR.R. Gnanavel",
        role: "Faculty Coordinator",
        image: "/vel.jpg",

      }

    ],
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="font-pixel text-3xl md:text-5xl mb-12 text-center text-green-400 animate-slide-in-down">
          Teams
        </h2>

        {/* Team Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(teams).map((teamName) => (
            <button
              key={teamName}
              onClick={() => setSelectedTeam(teamName)}
              className={`px-6 py-3 rounded-lg border transition-all duration-300 ${selectedTeam === teamName
                ? "bg-green-600/30 border-green-400 text-green-300"
                : "bg-black/40 border-gray-700 text-gray-300 hover:border-green-400 hover:text-green-300"
                }`}
            >
              {teamName}
            </button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {teams[selectedTeam].map((member, index) => (
            <div
              key={index}
              className="group relative bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-400 transition-all duration-300 animate-slide-in-up w-72 h-auto"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

              <div className="relative z-10 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-600 group-hover:border-green-400 transition-colors duration-300">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-bold text-lg text-white mb-2 group-hover:text-green-300 transition-colors duration-300">
                  {member.name}
                </h3>

                <p className="text-yellow-400 text-sm mb-4 font-semibold">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SponsorsSection: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-pixel text-3xl md:text-5xl mb-12 text-green-400 animate-slide-in-down">
          Our Sponsors
        </h2>

        {/* Sponsor Logos Section */}
        <div className="mb-16">
          {/* Title Sponsor */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-yellow-400 mb-6">Title & Venue Sponsor</h1>
            <div className="flex justify-center">
              <img src="/logo1.svg" alt="Title Sponsor" className="h-22 w-auto object-contain hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          
          {/* Other Sponsors */}
          <div>
            <h1 className="text-3xl font-bold text-purple-400 mb-6">Other Sponsors</h1>
            <div className="flex justify-center items-center gap-12">
              <img src="/logo4.png" alt="Sponsor 2" className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300" />
              <img src="/logo3.webp" alt="Sponsor 3" className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300" />
              <img src="/logo2.png" alt="Sponsor 4" className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Decorative borders */}
          <div className="absolute inset-0 border-2 border-green-400/30 rounded-2xl transform rotate-1"></div>
          <div className="absolute inset-0 border-2 border-purple-400/20 rounded-2xl transform -rotate-1"></div>

          <div className="relative bg-black/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-green-400 transition-all duration-500">
            <div className="space-y-4">
              <div className="text-4xl md:text-6xl animate-pulse">🚀</div>

              {/* Changed heading */}
              <h3 className="font-pixel text-xl md:text-3xl text-purple-400 mb-4">
                Want to sponsor us … ?
              </h3>

              <p className="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
                We’re working with amazing sponsors to bring you the best hackathon
                experience. Download our sponsorship brochure below!
              </p>

              {/* Button to download brochure */}
              <div>
                <a
                  href="/brochure.pdf" // put brochure.pdf inside /public folder
                  download="EWB_Sponsorship_Brochure.pdf" // optional custom filename
                  className="inline-block bg-green-500 text-black font-semibold px-4 py-2 rounded-lg hover:bg-green-400 transition-colors duration-300"
                >
                  Download Brochure
                </a>
              </div>

              {/* Decorative bouncing dots */}
              <div className="flex justify-center space-x-4 mt-6">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function HomePage() {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [showPongalImage, setShowPongalImage] = useState(false);
  const [pongalMounted, setPongalMounted] = useState(true);
  const [pongalActive, setPongalActive] = useState(true);
  const [pongalSettled, setPongalSettled] = useState(true);
  const settleTimeoutRef = useRef<number | null>(null);
  const [pongalInstant, setPongalInstant] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    // Wait for hydration to complete
    const timer = setTimeout(() => {
      setPongalMounted(true);
      setPongalInstant(true);
      setPongalActive(true);
      setPongalSettled(true);
      requestAnimationFrame(() => setPongalInstant(false));
      settleTimeoutRef.current = window.setTimeout(() => setPongalSettled(true), 520);
      setShowPongalImage(true);
    // Smooth confetti: multiple small bursts over the duration to avoid a single "explosion" feel
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ["#fbbf24", "#fde68a", "#22c55e", "#f97316"];

    (function fire() {
      confetti({
        particleCount: 18,
        spread: 60,
        startVelocity: 25,
        colors,
        origin: { x: Math.random(), y: 0.3 + Math.random() * 0.4 },
        scalar: 1,
      });
      if (Date.now() < end) {
        // jitter the interval slightly for natural look
        setTimeout(fire, 180 + Math.random() * 160);
      }
    })();

      setTimeout(() => {
        if (settleTimeoutRef.current) {
          clearTimeout(settleTimeoutRef.current);
          settleTimeoutRef.current = null;
        }
        setPongalSettled(false);
        setTimeout(() => {
          setPongalActive(false);
          setTimeout(() => {
            setPongalMounted(false);
            setShowPongalImage(false);
          }, 700);
        }, 60);
      }, duration + 250);
    }, 0);
  }, []);

  useEffect(() => {
    return () => {
      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current);
      }
    };
  }, []);

  /* Home-only scroll sections */
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    timer: useRef<HTMLDivElement>(null),
    prizepool: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    timeline: useRef<HTMLDivElement>(null),
    teams: useRef<HTMLDivElement>(null),
    sponsors: useRef<HTMLDivElement>(null),
  };

  return (
    <MainShell enableScrollNav sectionRefs={sectionRefs}>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        showToast={showToast}
      />

      <main className="relative z-10">
        {/* ================= HOME ================= */}
        <section ref={sectionRefs.home}>
          <HomeSection
            onRegisterClick={() => setIsRegistrationModalOpen(true)}
            pongalMounted={pongalMounted}
            pongalActive={pongalActive}
            pongalSettled={pongalSettled}
          />
        </section>

        {/* ================= TIMER ================= */}
        <section ref={sectionRefs.timer}>
          <TimerSection forwardRef={sectionRefs.timer} />
        </section>

        {/* ================= PRIZE POOL ================= */}
        <section ref={sectionRefs.prizepool}>
          <PrizePoolSection />
        </section>

        {/* ================= ABOUT ================= */}
        <section ref={sectionRefs.about}>
          <AboutSection />
        </section>

        {/* ================= TIMELINE ================= */}
        <section ref={sectionRefs.timeline}>
          <TimelineSection />
        </section>

        {/* ================= TEAMS ================= */}
        <section ref={sectionRefs.teams}>
          <TeamsSection />
        </section>

        {/* ================= SPONSORS ================= */}
        <section ref={sectionRefs.sponsors}>
          <SponsorsSection />
        </section>
      </main>
    </MainShell>
  );
}
