"use client";

import MainShell from "@/components/layout/MainShell";

export default function ContactPage() {
  return (
    <MainShell enableScrollNav={false}>
      <section className="pb-20">
        <ContactSection />
      </section>
    </MainShell>
  );
}


const ContactSection = () => {
  return (
    <footer className="bg-[#001106] text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">

        {/* Main Grid: Left (Text Content) vs Right (Maps) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ================= LEFT COLUMN: ALL TEXT CONTENT ================= */}
          <div className="space-y-10">

            {/* 1. Branding & Header */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
                Hackerrupt '26
              </h2>
            </div>

            {/* 2. Contact Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-green-400 flex items-center space-x-3">
                <i className="bi bi-telephone-fill"></i>
                <span>Contact Us</span>
              </h3>

              <div className="pt-6 border-t border-gray-800">
                <div>
                  <h4 className="font-bold text-white text-2xl md:text-2xl leading-relaxed mb-3">Association of Computer Engineers</h4>

                  <p className="text-purple-400 text-lg font-medium leading-relaxed mb-6">Department of Computer Science and Engineering</p>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Sri Venkateswara College Of Engineering<br />
                    Post Bag No.1, Pennalur Village<br />
                    Sriperumbudur Tk. - 602 117<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>





              {/* 4. Addresses Text Block */}
              <div className="space-y-6 pt-4 border-t border-gray-800">

                {/* Organization Address */}
                <div>


                  <h4 className="text-white font-bold mb-4 flex items-center text-xl">
                    <i className="bi bi-geo-alt-fill text-purple-400 mr-3"></i>
                    Event Venue
                  </h4>
                  <p className="text-gray-400 text-lg leading-relaxed pl-10">
                    CodeWork.Ai<br />
                    3rd Floor, SSPDL, Alpha City IT Park<br />
                    No 25, Rajiv Gandhi Salai, Navalur<br />
                    Chennai, Tamil Nadu 600130
                  </p>
                </div>
                {/* Email */}
                <div className="flex items-center space-x-1 gap-3">
                  <i className="bi bi-envelope-fill text-purple-400 text-2xl"></i>
                  <a href="mailto:ace@svce.in" className="text-xl hover:text-green-400 transition no-underline text-gray-200">
                    ace@svce.in
                  </a>
                </div>

                {/* Phones */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <div>
                    <p className="text-white text-lg mb-2">Mithun S</p>
                    <a href="tel:+917010341676" className="text-lg hover:text-green-400 transition no-underline text-white font-mono font-small">
                      +91 70103 41676
                    </a>
                  </div>
                  <div>
                    <p className="text-white text-lg mb-2">Kiran M S</p>
                    <a href="tel:+918825594439" className="text-lg hover:text-green-400 transition no-underline text-white font-mono font-small">
                      +91 88255 94439
                    </a>
                  </div><div>
                    <p className="text-white text-xl mb-2">Ashika Haseen</p>
                    <a href="tel:+918825594439" className="text-lg hover:text-green-400 transition no-underline text-white font-mono font-small">
                      +91 86676 36294
                    </a>
                  </div>
                </div>
              </div>


            </div>

          </div>


          {/* ================= RIGHT COLUMN: CENTERED MAPS ================= */}
          <div className="flex flex-col items-center gap-10 sticky top-40 mt-8">

            {/* Map 1: SVCE Campus */}
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative h-72 w-full rounded-xl overflow-hidden border-2 border-green-400/50 shadow-2xl bg-gray-900">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3887.7633829245924!2d79.969464!3d12.9869803!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528cd0cfb6e7ab%3A0x3294da3faad96a9!2sSri%20Venkateswara%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1768121160542!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="SVCE Campus Location"
                  className="rounded-xl"
                ></iframe>
              </div>
              <p className="text-center text-green-400 font-semibold mt-2 text-base">🏫 SVCE Campus</p>
            </div>

            {/* Map 2: Event Venue */}
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative h-72 w-full rounded-xl overflow-hidden border-2 border-purple-400/50 shadow-2xl bg-gray-900">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7780.046343936589!2d80.2258535!3d12.8417791!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xacb1d754ab2bfcdd%3A0xf85ebc93e22fb826!2sCODEWORK%20PRO-%20AI%20LEARNING%20CENTRE!5e0!3m2!1sen!2sin!4v1768121284627!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Event Venue Location"
                  className="rounded-xl"
                ></iframe>
              </div>
              <p className="text-center text-purple-400 font-semibold mt-2 text-base">🎯 Event Venue - CodeWork.Ai</p>
            </div>

            {/* Directions prompt */}
            <div className="text-center">
              <p className="text-base text-gray-500">🗺️ Click maps for detailed directions</p>
            </div>

          </div>

        </div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-600 text-sm mt-12 pt-6 border-t border-gray-800">
          © 2026 HACKERRUPT '26 - Association of Computer Engineers, SVCE
        </div>
      </div>
    </footer>
  );
};
