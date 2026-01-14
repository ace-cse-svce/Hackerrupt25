export const problemStatements = [
{
    id: "HK2601",
    title: "AI-Based Match Outcome & Strategy Prediction System",
    description: `Problem Statement
Predicting match outcomes and formulating effective strategies across different sports is complex due to the large volume of historical and real-time data involved. Coaches, analysts, and fans often rely on intuition rather than data-driven insights. The challenge is to build an AI-based system that can predict match outcomes and provide strategic insights across multiple sports using a unified approach.

Background
Sports such as Cricket, Football, and Basketball generate extensive data related to player performance, team dynamics, venue conditions, and historical match results. Existing analytics solutions are often sport-specific and lack adaptability. Advances in machine learning and sports analytics create an opportunity to build a scalable system that works across multiple sports while delivering accurate and explainable predictions.`,
    expectedSolution: [
      "Collect and analyze historical match data across multiple sports",
      "Incorporate team statistics, player performance, and head-to-head records",
      "Consider venue impact and home-advantage patterns",
      "Predict match outcomes with confidence scores",
      "Generate sport-specific strategic insights using a common ML framework",
      "Provide dashboards or reports for coaches, analysts, and enthusiasts",
      "Ensure adaptability to different sports formats and rule sets",
    ],
    domains: "Artificial Intelligence, Sports Analytics, Data Science",
  },

  {
    id: "HK2602",
    title: "AI-Driven Inclusive Assessment Tool for Skill Ecosystem",
    description: `Theme: EduTech

Problem Statement
Traditional assessment systems struggle to fairly and consistently evaluate students across diverse formats such as objective tests, descriptive answers, and oral examinations. Manual grading is time-consuming, prone to bias, and difficult to scale. The challenge is to develop an AI-powered assessment platform that can evaluate multiple answer formats accurately while ensuring transparency, fairness, and consistency.

Background
Modern education requires flexible assessment methods that reflect real understanding rather than rote learning. Handwritten theory answers and viva responses are especially difficult to evaluate at scale. Advances in AI, natural language processing, and semantic analysis provide an opportunity to automate grading while maintaining rubric-based fairness and explainable scoring.`,
    expectedSolution: [
      "Support multiple assessment formats: MCQs, handwritten theory answers, and viva/oral responses",
      "Digitize and process handwritten answers using OCR and AI",
      "Evaluate descriptive answers using rubrics, semantic similarity, and NLP techniques",
      "Apply partial marking for multi-point answers",
      "Provide transparent score justifications and feedback",
      "Reduce human bias and ensure consistency across evaluations",
      "Scale efficiently for large-scale academic assessments",
    ],
    domains: "Artificial Intelligence, EdTech, Natural Language Processing",
  },
  {
    id: "HK2603",
    title: "Vision-Guard: Healthcare Safety Monitor",
    description: `Problem Statement
In healthcare and home-care environments, continuous monitoring of patients is challenging and resource-intensive. Critical incidents such as falls or prolonged inactivity may go unnoticed, putting patient safety at risk. The challenge is to develop an automated system that can monitor patient movement and detect potential safety issues in real time.

Background
Manual supervision in hospitals and home-care settings is costly and prone to human error. With advancements in computer vision and AI, there is an opportunity to monitor patient activity automatically while preserving privacy, enabling faster response to emergencies without intrusive surveillance.`,
    expectedSolution: [
      "Capture patient movement using camera-based monitoring",
      "Detect human posture, movement, and activity patterns",
      "Identify events such as falls, unsafe movements, or prolonged inactivity",
      "Distinguish normal resting states from potential medical emergencies",
      "Generate real-time alerts for caregivers or medical staff",
      "Apply privacy-preserving techniques such as pose abstraction or face blurring",
    ],
    domains: "Artificial Intelligence, Computer Vision, Healthcare",
  },

  {
    id: "HK2604",
    title: "Certificate Proofing: Skill Retention & Readiness Monitor",
    description: `Problem Statement
Certificates indicate course completion but do not reflect long-term skill retention or real-world readiness. Over time, skills may decay without notice, reducing employability. The challenge is to build a system that evaluates whether certified skills remain relevant and retained over time.

Background
Learners often earn certificates through courses or training programs, but there is limited follow-up to assess how well those skills are maintained. Traditional certification systems lack mechanisms to measure skill decay or continued engagement. With digital learning and analytics, there is an opportunity to track skill retention beyond one-time certification.`,
    expectedSolution: [
      "Track user skill activity and learning behavior over time",
      "Conduct periodic micro-assessments to evaluate retention",
      "Analyze performance trends to identify skill decay or improvement",
      "Generate insights on current skill readiness",
      "Provide alerts or recommendations for skill refreshment",
      "Ensure the system is simple, scalable, and user-friendly",
    ],
    domains: "Artificial Intelligence, EdTech, Learning Analytics",
  },
  
  {
    id: "HK2605",
    title: "Intelligent Badminton Pose Analysis System",
    description: `Problem Statement
Badminton players often practice without continuous access to professional coaching, leading to incorrect posture, inefficient movement, and improper stroke techniques. These issues negatively impact performance and increase the risk of injuries. The challenge is to develop a system that can analyze a player’s body posture during badminton practice and help identify technique-related issues in a practical and accessible manner.

Background
Proper posture and movement play a critical role in badminton performance. Beginners and intermediate players commonly develop incorrect habits due to limited feedback during practice sessions. Traditional coaching methods are not always affordable or available, especially for individual or remote practice. With advancements in technology, there is an opportunity to assist players by digitally observing movements and offering insights that support skill improvement.`,
    expectedSolution: [
      "Capture the badminton player’s movements using a camera (mobile, laptop, or external camera)",
      "Detect and track key body joints and posture during play",
      "Analyze player posture, footwork, and stroke movements",
      "Compare the observed posture with correct or ideal badminton techniques",
      "Identify mistakes such as incorrect stance, arm angle, or balance",
      "Provide clear feedback to help the player correct their posture",
      "Display feedback visually, textually, or through simple alerts",
      "Ensure the system is easy to use and works during regular practice sessions",
      "Avoid the need for wearable sensors or specialized hardware",
    ],
    domains: "Artificial Intelligence, Sports Analytics, Computer Vision",
  },

  {
    id: "HK2606",
    title: "DDoS-Shield: Real-Time Attack Detection & Mitigation",
    description: `Problem Statement
Distributed Denial of Service (DDoS) attacks can overwhelm systems within seconds, disrupting services and causing significant financial and operational damage. The challenge is to develop a real-time system that can detect and mitigate DDoS attacks while ensuring uninterrupted access for legitimate users.

Background
Modern digital services face increasing DDoS threats driven by botnets and automated attack tools. Traditional defense mechanisms often react too slowly or block genuine users. With real-time traffic analysis and AI-based anomaly detection, there is an opportunity to proactively identify attacks and respond intelligently.`,
    expectedSolution: [
      "Monitor incoming network traffic in real time",
      "Detect anomalies such as sudden traffic spikes or non-human behavior",
      "Identify and block malicious IPs or traffic patterns",
      "Allow legitimate user traffic to continue without disruption",
      "Provide real-time dashboards or threat maps for administrators",
      "Ensure scalability and minimal latency during mitigation",
    ],
    domains: "Artificial Intelligence, Cybersecurity, Networking",
  },

  {
    id: "HK2607",
    title: "EcoSort: Intelligent Waste & Recycling System",
    description: `Problem Statement
Improper waste sorting and lack of incentives lead to recyclable materials being discarded as waste. Citizens often lack motivation and clarity to recycle correctly. The challenge is to build an intelligent and gamified system that not only guides correct recycling but also rewards users for responsible disposal, encouraging sustainable behavior.

Background
Recycling efforts fail when users are confused about material types or see no direct benefit for their effort. With advances in AI, digital payments, and location-based services, there is an opportunity to combine waste identification with gamification and monetary incentives to promote consistent and correct recycling practices.`,
    expectedSolution: [
      "Identify waste or household items using image recognition",
      "Classify items by material type and recyclability",
      "Provide disposal instructions based on local recycling rules",
      "Detect contamination and suggest cleaning or correct disposal",
      "Gamify recycling through points, badges, and achievement levels",
      "Allow users to earn rewards or money by submitting recyclables to authorized recycling centers",
      "Track verified recycling actions through QR codes, receipts, or partner centers",
      "Display user impact metrics such as waste diverted and earnings earned",
      "Connect users to nearby recycling, e-waste, or donation centers",
    ],
    domains: "Artificial Intelligence, Sustainability, Smart Cities",
  },

  {
    id: "HK2608",
    title: "Personalized Government Scheme Awareness System",
    description: `Problem Statement
Despite the availability of numerous government welfare schemes, many eligible citizens fail to benefit due to lack of awareness, complex eligibility criteria, language barriers, and unclear reasons for rejection. Existing platforms mainly list schemes without explaining personal eligibility or guiding users on how to proceed. The challenge is to build a system that helps citizens identify and access schemes relevant to them.

Background
Government schemes are often distributed across multiple departments and portals, making them difficult to navigate. Citizens are required to interpret eligibility rules on their own, which leads to confusion and missed opportunities. With digital platforms and data-driven personalization, there is scope to simplify scheme discovery and improve inclusivity and access.`,
    expectedSolution: [
      "Identify and list government schemes relevant to the individual",
      "Categorize schemes based on fields such as education, health, agriculture, employment, etc.",
      "Explain eligibility or ineligibility in simple, local-language-friendly terms",
      "Guide users on corrective actions or next steps to avail benefits",
      "Redirect users to the appropriate department or scheme-specific portal",
      "Ensure data privacy, accessibility, and inclusive design",
    ],
    domains: "Artificial Intelligence, GovTech, Data Personalization",
  },

  {
    id: "HK2609",
    title: "Hospital Queue: Intelligent Waiting Time Management",
    description: `Problem Statement
Hospital waiting times often feel unpredictable, causing patient frustration and operational strain. In many cases, delays arise from inefficient queue management rather than staff shortages. The challenge is to develop a system that can analyze patient flow and predict congestion across hospital departments.

Background
Hospitals manage multiple departments with varying patient loads throughout the day. Traditional queue management systems offer limited visibility into future congestion and do not adapt dynamically. With advancements in data analytics and AI, there is an opportunity to forecast demand, balance loads, and improve patient experience through smarter queue intelligence.`,
    expectedSolution: [
      "Collect patient flow and appointment data across departments",
      "Analyze historical and real-time queue patterns",
      "Predict waiting times and congestion levels",
      "Recommend patient redirection or appointment slot optimization",
      "Provide clear insights for hospital staff and administrators",
      "Support smoother operations and reduced patient wait times",
    ],
    domains: "Artificial Intelligence, Healthcare, Data Analytics",
  },

  {
    id: "HK2610",
    title: "Voice Verification: AI-Generated Voice Detection",
    description: `Problem Statement
The rise of AI-generated voice cloning has enabled sophisticated audio deepfakes that are increasingly used in phone-based fraud, including scams targeting vulnerable populations. The challenge is to develop a real-time system that can detect synthetic or cloned voices during live calls and alert users to potential fraud.

Background
Advancements in voice synthesis and cloning technologies have made it difficult for individuals to distinguish between real and fake voices. Traditional fraud prevention methods are often ineffective against voice-based attacks. With real-time audio analysis and AI, there is an opportunity to identify characteristics of synthetic speech and help prevent financial and social engineering scams.`,
    expectedSolution: [
      "Capture and analyze audio streams during live calls",
      "Detect features indicative of AI-generated or cloned voices",
      "Differentiate natural human speech from synthetic audio",
      "Provide real-time alerts to users during suspicious calls",
      "Operate with low latency for live call scenarios",
      "Ensure privacy and secure handling of voice data",
    ],
    domains: "Artificial Intelligence, Cybersecurity, Audio Processing",
  },

  {
    id: "HK2611",
    title: "Food Expiry: Smart Food Waste Reduction System",
    description: `Problem Statement
A significant amount of food is wasted due to poor tracking of expiry dates and inefficient consumption planning. This leads to financial loss for households and small businesses and contributes to environmental harm. The challenge is to develop a smart solution that helps users track food items, reduce waste, and optimize consumption before expiry.

Background
Most households and small food businesses rely on manual methods to manage groceries and ingredients, which are often inaccurate or neglected. With advancements in digital tools and AI, there is an opportunity to monitor food inventory intelligently, provide timely alerts, and encourage better consumption and sharing practices.`,
    expectedSolution: [
      "Track food items and expiry dates through manual input, barcode scanning, or smart sensing",
      "Notify users when items are nearing expiration",
      "Suggest recipes using ingredients close to expiry",
      "Recommend donation or sharing options for unused items",
      "Optionally include gamification to encourage waste reduction",
      "Advanced solutions may predict usage patterns and optimize shopping decisions",
    ],
    domains: "Artificial Intelligence, Sustainability, Smart Systems",
  },

  {
    id: "HK2612",
    title: "Exam Bot Assistant: AI-Powered Study Companion",
    description: `Problem Statement
Students have access to vast amounts of digital study material but often struggle with information overload, poor prioritization, and ineffective revision strategies. Existing platforms focus on content delivery rather than guiding students on what to study, when to study, and how well they understand the concepts. The challenge is to build an intelligent system that supports personalized and adaptive exam preparation.

Background
Modern learning resources are largely unstructured and disconnected, making it difficult for students to identify key concepts and knowledge gaps. Traditional study methods lack continuous feedback and personalization. With advances in AI and learning analytics, there is an opportunity to create systems that analyze study materials, track understanding, and dynamically guide learning.`,
    expectedSolution: [
      "Analyze unstructured study materials to extract key concepts",
      "Organize concepts into a structured knowledge graph",
      "Generate personalized study plans based on time, difficulty, and progress",
      "Create adaptive quizzes to assess concept-level understanding",
      "Identify weak areas and update study plans dynamically",
      "Provide clear insights to support focused revision and time management",
    ],
    domains: "Artificial Intelligence, EdTech, NLP",
  },

  {
    id: "HK2613",
    title: "Government-Issued Document: PII Detection & Privacy Protection",
    description: `Problem Statement
Sensitive government-issued personal information is often shared or stored digitally, increasing the risk of accidental data exposure. Identifying such information manually across documents and datasets is difficult and error-prone. The challenge is to develop a system that can automatically detect government-issued personally identifiable information (PII) to help prevent data leaks.

Background
Documents may contain sensitive identifiers such as Aadhaar, PAN, or passport details, either intentionally or unintentionally. Existing data handling practices often lack automated checks for privacy compliance. With advancements in document analysis and AI, there is an opportunity to identify and protect sensitive information before it is misused or exposed.`,
    expectedSolution: [
      "Scan documents, images, or datasets automatically",
      "Detect government-issued PII such as Aadhaar, PAN, or passport numbers",
      "Identify sensitive data embedded in text, tables, or scanned documents",
      "Flag or classify documents containing PII",
      "Support privacy compliance and data protection efforts",
      "Ensure secure and responsible handling of sensitive information",
    ],
    domains: "Artificial Intelligence, Cybersecurity, Document Analysis",
  },

  {
    id: "HK2614",
    title: "Sign Language to Speech: Real-Time Accessibility Tool",
    description: `Problem Statement
Communication barriers during video calls make it difficult for sign language users to interact seamlessly with others who do not understand sign language. Most solutions require both parties to install specialized software, limiting adoption. The challenge is to develop a lightweight tool that can translate sign language into speech or text in real time during live video calls.

Background
Sign language is a primary mode of communication for many individuals, yet mainstream video conferencing platforms lack built-in translation support. With advancements in computer vision and real-time gesture recognition, there is an opportunity to enable inclusive communication using browser-based or mobile tools without modifying existing platforms.`,
    expectedSolution: [
      "Use the device camera to capture hand and gesture movements",
      "Recognize sign language gestures with low latency",
      "Convert recognized signs into spoken audio or text in real time",
      "Work seamlessly during live video calls without requiring software from the other party",
      "Operate as a lightweight browser extension or mobile tool",
      "Prioritize accessibility, accuracy, and performance",
    ],
    domains: "Artificial Intelligence, Accessibility, Computer Vision",
  },

  {
    id: "HK2615",
    title: "Dark Pattern & Phishing: Fair UI Detection Tool",
    description: `Problem Statement
Many websites use deceptive design practices such as fake urgency, hidden costs, or misleading prompts to manipulate user decisions. These dark patterns reduce transparency and harm consumer trust. The challenge is to develop an AI-based tool that can identify and flag such deceptive elements in real time while users browse websites.

Background
Dark patterns are increasingly common in e-commerce and online services, making it difficult for users to recognize manipulation. Traditional rule-based detection methods are limited and fail to adapt to new tactics. With advancements in AI and UI analysis, there is an opportunity to automatically detect deceptive patterns and protect consumers.`,
    expectedSolution: [
      "Scan web pages in real time during browsing",
      "Detect deceptive UI elements such as fake countdowns or hidden costs",
      "Identify phishing-like manipulation techniques",
      "Highlight suspicious elements for user awareness",
      "Generate a fairness or trust rating for websites",
      "Operate as a browser-based, user-friendly tool",
    ],
    domains: "Artificial Intelligence, Cybersecurity, HCI",
  },

  {
    id: "HK2616",
    title: "Smart Attendance Management: Engagement-Aware Classroom Analytics",
    description: `Problem Statement
Traditional attendance systems record only presence or absence and fail to reflect actual student engagement. In large classrooms, identifying disengaged students early is difficult, especially when relying on low-quality CCTV feeds. The challenge is to design a system that tracks attendance and analyzes engagement indicators using a single low-resolution camera.

Background
Most classrooms already have a single CCTV camera with limited resolution and suboptimal angles. Manual monitoring in such environments is ineffective, particularly for classes with many students. Advances in computer vision and AI make it possible to extract meaningful attendance and engagement insights even from low-quality video inputs, without additional hardware.`,
    expectedSolution: [
      "Use a single low-resolution CCTV camera feed as input",
      "Detect and track student presence in a classroom of up to 60 students",
      "Handle challenges such as poor lighting, occlusion, and low image clarity",
      "Record attendance along with punctuality and consistency trends",
      "Analyze engagement indicators at an aggregate or individual level",
      "Provide actionable insights to faculty and feedback to students",
      "Ensure privacy-aware, ethical, and non-intrusive monitoring",
    ],
    domains: "Artificial Intelligence, Computer Vision, EdTech",
  },

  {
    id: "HK2617",
    title: "Stock Market Pattern / Trend Analysis",
    description: `Problem Statement
Stock markets generate large volumes of data every day, making it difficult for investors and traders to manually analyze price movements and identify meaningful patterns. Without proper analysis, market trends may be missed, leading to uninformed or risky decisions. The challenge is to develop a system that can analyze stock market data and identify patterns or trends that support better understanding of market behavior.

Background
Stock prices are influenced by multiple factors such as historical price movements, trading volume, and market volatility. Traditional analysis methods often require deep financial expertise and significant manual effort. With the increasing availability of historical and real-time market data, there is an opportunity to use technology to automatically analyze trends and present insights in a simplified and accessible manner for users.`,
    expectedSolution: [
      "Collect historical and/or real-time stock market data",
      "Process price, volume, and time-series data effectively",
      "Identify trends such as upward, downward, or sideways movements",
      "Detect recurring patterns or unusual market behavior",
      "Analyze market volatility and price fluctuations",
      "Provide clear visualizations such as charts or indicators",
      "Generate insights that help users understand market trends",
      "Ensure the system is easy to use and interpretable for users",
      "Design the solution to support informed decision-making",
    ],
    domains: "Artificial Intelligence, FinTech, Data Analytics",
  },

  {
    id: "HK2618",
    title: "SafeGuard: Technology for Women’s Safety",
    description: `Problem Statement
Women’s safety in public and private spaces continues to be a critical concern. Existing safety tools often require manual interaction, which may not be feasible during emergencies. The challenge is to create an innovative, reliable, and discreet technological solution that enhances personal safety and enables rapid response in threatening situations.

Background
Incidents related to harassment, stalking, and unsafe travel routes highlight the need for proactive and intelligent safety solutions. Traditional systems such as helpline numbers or mobile apps are reactive and depend on user visibility and network availability. Advances in AI, IoT, and location intelligence present an opportunity to build preventive, context-aware safety tools.`,
    expectedSolution: [
      "Enable emergency triggering through voice commands, gestures, or wearable-free inputs",
      "Support silent or discreet activation during distress situations",
      "Share real-time location with trusted contacts and emergency services",
      "Assess and display a dynamic danger level based on time, location, and crowd data",
      "Provide AI-recommended safe routes using community and historical safety data",
      "Allow users to report incidents and unsafe areas anonymously",
      "Integrate SOS alerts with nearby volunteers, security staff, or authorities",
      "Offer offline or low-connectivity support where possible",
      "Ensure privacy, data security, and user control over shared information",
    ],
    domains: "Artificial Intelligence, Public Safety, IoT",
  },
];