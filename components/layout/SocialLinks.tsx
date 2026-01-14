"use client";

export default function SocialLinks() {
  return (
    <div
      className="
        /* --- Mobile Styles (Default) --- */
        fixed bottom-0 inset-x-0 z-40
        flex flex-row justify-center items-center
        space-x-8 p-4
        bg-gray-900 bg-opacity-80 backdrop-blur-sm
        text-white

        /* --- Desktop Styles --- */
        md:inset-auto md:left-4 md:bottom-4
        md:w-auto md:p-0
        md:flex-col md:space-y-4 md:space-x-0
        md:bg-transparent md:backdrop-blur-none
        md:text-current
      "
    >
      {/* Vertical text (desktop only) */}
      <span className="hidden md:block writing-mode-vertical-rl rotate-180 uppercase text-xs tracking-widest mb-4">
        Follow us on
      </span>

      {/* Divider (desktop only) */}
      <div className="hidden md:block w-px h-16 bg-green-400"></div>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/acesvce?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
        className="hover:text-green-300 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/company/ace-svce/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on LinkedIn"
        className="hover:text-green-300 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </a>
    </div>
  );
}
