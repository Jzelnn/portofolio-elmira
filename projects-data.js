/**
 * Curated metadata for Elmira Jacinda Wahid's (Jzelnn) GitHub projects.
 * This data is merged dynamically with the live data fetched from the GitHub REST API.
 * Any project listed here that is NOT present in the live GitHub API response will still
 * be displayed beautifully as a featured local project.
 */
const CURATED_PROJECTS = {
  "college-menfess": {
    displayName: "Jellyfish Menfess Website",
    date: "May 2025 - Jun 2025",
    role: "Programmer",
    image: "image/college-menfess.png",
    brief:
      "Built an anonymous student platform with 4+ user interaction features, including posting, likes/dislikes, favorites, and music sharing.",
    details:
      "An interactive web platform designed for anonymous college student sharing. Built with robust authentication and moderation structures, allowing secure, fast, and light discussions.",
    features: [
      "Secure anonymous message posting and categorization",
      "Interactive social feedback features (likes, dislikes, favorites)",
      "Integrated music sharing capabilities",
      "Dynamic PHP backend panel with secure database schema",
    ],
    tech: ["PHP", "MySQL", "Bootstrap", "AJAX", "Security Protection"],
    demoUrl: "#",
    icon: "message-square",
  },
  "movie-rental-system": {
    displayName: "Movie Rental System",
    date: "May 2025 - Jun 2025",
    role: "Programmer",
    image: "image/movie-rental.jpg",
    brief:
      "Built a Java-based system to help staff manage movie inventory and customer rental transactions.",
    details:
      "A complete inventory and transaction tracking Java database program. Created to manage film rental logs, calculate rental pricing and overdue penalties, and organize customer data files.",
    features: [
      "Dynamic movie stock allocation and check-out tracking",
      "Integrated customer rental invoice logs",
      "Search functions for movie genres, release dates, and availability",
      "Clean, modular Object-Oriented Programming (OOP) structural architecture",
    ],
    tech: ["Java", "OOP", "Data Structures"],
    demoUrl: "#",
    icon: "film",
    isLocalOnly: true,
  },
  "calory-calculator": {
    displayName: "Calorie Detection System",
    date: "Sep 2025",
    role: "AI Developer",
    image: "image/calorie-detection.png",
    brief:
      "Built a real-time AI calorie detection system that processes food images and provides calorie estimation in one real-time workflow.",
    details:
      "A health tracking application powered by image recognition models. Automatically detects food items, calculates nutritional metrics, and compiles logs for active calorie counting.",
    features: [
      "Real-time food recognition using custom image models",
      "Instant calorie estimation and macro breakdown analysis",
      "Personalized daily energy expenditure tracker (TDEE)",
      "Intuitive fitness progress charts and tracking records",
    ],
    tech: ["TypeScript", "React", "Vite", "Chart.js", "Image Processing"],
    demoUrl: "#",
    icon: "activity",
  },
  "adopt-mini-AI": {
    displayName: "Mini Adobe AI",
    date: "Oct 2025",
    role: "AI Developer",
    image: "image/adopt-mini-ai.png",
    brief:
      "Developed an AI-powered image editing application with 3+ image enhancement features, including blur, contrast, and saturation adjustment.",
    details:
      "A creative image processing utility utilizing lightweight browser-based ML. Provides advanced image adjustments, visual presets, and simple filters to elevate photo qualities.",
    features: [
      "AI-powered image color enhancement and contrast correction",
      "Interactive canvas tools for real-time visual touch-ups",
      "User-friendly visual preset libraries for fast adjustments",
      "High-speed export utility with customizable configurations",
    ],
    tech: ["TypeScript", "React", "Vite", "TailwindCSS", "Generative AI"],
    demoUrl: "#",
    icon: "sparkles",
  },
  "coffee-shop-reservation-application": {
    displayName: "Coffee Shop Reservation Application",
    date: "Oct 2025",
    role: "Android Developer",
    image: "image/coffee-shop-reservation.png",
    brief:
      "Created an Android based cafe reservation application with Firebase, implementing 5 core features: authentication, reservation creation, menu selection, conflict detection, and reservation management.",
    details:
      "An Android app leveraging Firebase Realtime Database for seamless cafe seats reservations, pre-orders cart processing, and administrative slot coordination.",
    features: [
      "Real-time CRUD table reservation through Firebase syncing",
      "Custom seat and layout planner mapping",
      "Interactive digital menu item selector and cart builder",
      "Java-based OOP modular design architecture",
    ],
    tech: ["Java", "Firebase", "OOP", "Android Studio"],
    demoUrl: "#",
    icon: "coffee",
  },
  "public-speaking-AI-": {
    displayName: "Public Speaking AI",
    date: "Nov 2025 - Dec 2025",
    role: "AI Developer",
    image: "image/public-speaking-ai.png",
    brief:
      "Developed an AI-powered public speaking application that provides feedback through speech analysis and communication evaluation features.",
    details:
      "An audio speech coaching platform analyzing voice recordings to supply constructive visual reports on verbal pacing, word choice, filler usage, and tone delivery.",
    features: [
      "Intelligent speech analyzer measuring vocal metrics",
      "Interactive public speaking training guides",
      "Real-time pacing assessment and filler word counter",
      "Structured feedback dashboard to track confidence growth",
    ],
    tech: [
      "Markdown",
      "Speech Analysis",
      "Technical Writing",
      "Presentation Skills",
    ],
    demoUrl: "#",
    icon: "mic",
  },
  "AI-summarization": {
    displayName: "AI Summarization System",
    date: "Jan 2026 - Feb 2026",
    role: "AI Developer",
    image: "image/summarization.png",
    brief:
      "Built an AI text summarization system to help users generate faster and more accurate summaries from documents and text automatically.",
    details:
      "An AI-powered document intelligence and natural language processing tool designed to condense lengthy articles, extract core narratives, and identify naming elements automatically from plain text inputs.",
    features: [
      "AI text summarization using state-of-the-art transformers",
      "Instant entity extraction and named-entity recognition",
      "Interactive multi-format document reader and uploader",
      "Automated summary generation and report exporter",
    ],
    tech: ["Python", "PyTorch", "Transformers", "NLP", "HTML5", "JavaScript"],
    demoUrl: "#",
    icon: "brain-circuit",
  },
  "FLUENESIA-": {
    displayName: "FLUENSIA",
    date: "May 2026",
    role: "Database Engineer",
    image: "image/Fluenesia.png",
    brief:
      "Developed a Learning Management System to support student learning and engagement, allowing users to access learning materials and manage academic activities more easily.",
    details:
      "A comprehensive learning portal configured with relational database controls to manage student profiles, reference folders, activity history, and language modules.",
    features: [
      "Situational dialogue simulations with digital transcripts",
      "Gamified grammatical checks and interactive vocabulary tests",
      "Pronunciation guide checklists with voice references",
      "Dynamic visual vocabulary binders sorted by difficulty",
    ],
    tech: ["HTML5", "CSS3", "JavaScript ES6", "Audio API"],
    demoUrl: "#",
    icon: "languages",
  },
};
