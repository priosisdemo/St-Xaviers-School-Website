/* ==========================================================================
   data.js — Central content file.
   Website ka saara text, links aur photos yahin se change hote hain.
   Image field "" chhodne par neutral placeholder dikhta hai.
   ========================================================================== */
(function () {
  "use strict";

  var IMG = "assets/images/";

  /* ---------- School details ---------- */
  var school = {
    name: "St. Xavier's Senior Secondary School",
    shortName: "St. Xavier's",
    tagline: "Committed to Ensure Quality Education",
    group: "A branch of St. Xavier's Group of Schools",
    affiliationNo: "2132084",
    schoolCode: "70094",
    udise: "[Verify UDISE code]",
    founded: 2012,
    classes: "Nursery to Class 12",
    type: "Co-educational",
    medium: "English medium",
    address: "Bahrampur (Near Bharat Petrol Pump), Ramnagar, Ambedkar Nagar, Uttar Pradesh",
    phones: ["+91 99726 68406"],
    phoneHref: "tel:+919972668406",
    whatsappNumber: "919972668406",
    managingDirector: "Mr. Buddhiram Yadav",
    principal: "Mr. Jagdish Prajapati",
    streams: ["Science", "Commerce", "Arts"],
    logo: "", // Logo image path yahan daalein, jaise "assets/images/logo.png"
    mapEmbed:
      "https://www.google.com/maps?q=Bahrampur%20Ramnagar%20Ambedkar%20Nagar%20Uttar%20Pradesh&output=embed"
  };

  /* ---------- Home hero background slides (auto-change every 6 seconds) ---------- */
  var heroSlides = [
    { src: IMG + "hero-campus.jpg", label: "Our Campus" },
    { src: IMG + "hero-classroom.jpg", label: "Classrooms" },
    { src: IMG + "hero-sports.jpg", label: "Sports & Activities" }
  ];

  var hours = {
    summer: { school: "7:00 AM - 2:45 PM", office: "9:00 AM - 4:00 PM" },
    winter: { school: "8:45 AM - 3:15 PM", office: "10:00 AM - 4:00 PM" },
    recess: "[Verify recess time]"
  };

  var links = {
    apply: "https://forms.gle/9NJT7Wd7Yim15bRH8",
    login: "https://easyedulab.com/login",
    app: "https://play.google.com/store/apps/details?id=com.easyedulabmobile",
    results: "https://results.cbse.nic.in/",
    facebook: "https://www.facebook.com/StXSchool",
    instagram: "https://www.instagram.com/thepriosis11/",
    youtube: "https://www.youtube.com/channel/UCVn77AGmwqiW1PLjBnecYiw/",
    disclosurePdf: "" // Mandatory Public Disclosure PDF ka link (optional)
  };

  /* ---------- Navigation (header menu) ---------- */
  var nav = [
    { href: "index.html", label: "Home" },
    { href: "gallery.html", label: "Gallery" },
    { href: "about.html", label: "About" },
    { href: "admission.html", label: "Admission" },
    { href: "services.html", label: "Services" },
    { href: "blog.html", label: "Blog" },
    { href: "contact.html", label: "Contact Us" }
  ];

  /* ---------- Home counters ---------- */
  var stats = [
    { value: 14, suffix: "+", label: "Years of Excellence" },
    { value: 60, suffix: "+", label: "Qualified Teachers" },
    { value: 2000, suffix: "+", label: "Students" }
  ];

  /* ---------- Facilities (Home + Services page) ---------- */
  var facilities = [
    {
      icon: "flask-conical",
      title: "Science Labs",
      short: "Hands-on experiments in well-equipped laboratories.",
      description:
        "Well-equipped Physics, Chemistry and Biology laboratories where students learn through observation and hands-on experiments."
    },
    {
      icon: "monitor",
      title: "Computer Lab",
      short: "Digital skills for a modern world.",
      description:
        "A computer lab that helps students build digital literacy, practical computing skills and confidence with technology."
    },
    {
      icon: "book-open",
      title: "Library",
      short: "A quiet space to read, explore and learn.",
      description:
        "A library with books for every age group that encourages a lifelong habit of reading and independent learning."
    },
    {
      icon: "trophy",
      title: "Sports and Playgrounds",
      short: "Indoor and outdoor games for every child.",
      description:
        "Playgrounds and facilities for both indoor and outdoor games that promote fitness, teamwork and sportsmanship."
    },
    {
      icon: "graduation-cap",
      title: "Certified and Qualified Teachers",
      short: "Experienced educators who care.",
      description:
        "A team of certified and qualified teachers who guide every student with patience, expertise and personal attention."
    },
    {
      icon: "puzzle",
      title: "Activity-Based Learning",
      short: "Learning by doing, every day.",
      description:
        "Classroom teaching enriched with activities that make concepts clear, engaging and easy to remember."
    }
  ];

  /* ---------- Toppers (photo "" = placeholder icon) ---------- */
  var toppers = {
    title: "Class X CBSE 2025-26",
    list: [
      { name: "Shreya Yadav", percent: "97.2%", photo: "" },
      { name: "Nikhil Sahu", percent: "94%", photo: "" },
      { name: "Priyansh Tiwari", percent: "93.8%", photo: "" },
      { name: "Ayesha Khatoon", percent: "93.4%", photo: "" },
      { name: "Musab Farooqui", percent: "93.2%", photo: "" },
      { name: "Nitin Maurya", percent: "93%", photo: "" },
      { name: "Kushagra", percent: "92.2%", photo: "" },
      { name: "Shubham Soni", percent: "92%", photo: "" }
    ]
  };

  /* ---------- Notices (Home page) ---------- */
  var notices = [
    { date: "2026-10-15", title: "Sample notice: Parent-teacher meeting schedule" },
    { date: "2026-10-08", title: "Sample notice: Half-yearly examination date sheet" },
    { date: "2026-10-01", title: "Sample notice: Admissions open for the new session" }
  ];

  /* ---------- Leadership (About page) ---------- */
  var leadership = [
    {
      name: "Mr. Buddhiram Yadav",
      role: "Managing Director",
      photo: IMG + "leader-md.png",
      message:
        "Our goal is to provide every child with quality education in a safe and caring environment. We are committed to building a school where learning, discipline and values go hand in hand."
    },
    {
      name: "Mr. Jagdish Prajapati",
      role: "Principal",
      photo: IMG + "leader-principal.png",
      message:
        "At St. Xavier's, we focus on the overall development of each student. With dedicated teachers and activity-based learning, we help our students achieve their best, both in academics and in life."
    }
  ];

  /* Placeholder teachers: asli naam, subject aur photo se replace karein. */
  var teachers = [];
  for (var t = 1; t <= 8; t++) {
    teachers.push({ name: "[Teacher Name " + t + "]", subject: "[Subject / Designation]", photo: "" });
  }

  /* ---------- Gallery (src badal kar photo update karein) ---------- */
  var galleryCategories = ["Events", "Campus", "Classroom", "Sports"];
  var gallery = [
    { src: IMG + "g-events-1.jpg", alt: "Annual day cultural programme", category: "Events", tall: true },
    { src: IMG + "g-campus-1.jpg", alt: "School building exterior", category: "Campus", tall: true },
    { src: IMG + "g-class-1.jpg", alt: "Bright classroom with students", category: "Classroom" },
    { src: IMG + "g-sports-1.jpg", alt: "Cricket on the school ground", category: "Sports", tall: true },
    { src: IMG + "g-events-2.jpg", alt: "Science exhibition", category: "Events" },
    { src: IMG + "g-campus-2.jpg", alt: "School playground", category: "Campus" },
    { src: IMG + "g-class-2.jpg", alt: "Teacher at the blackboard", category: "Classroom", tall: true },
    { src: IMG + "g-sports-2.jpg", alt: "Athletics race", category: "Sports" },
    { src: IMG + "g-events-3.jpg", alt: "Morning school assembly", category: "Events" },
    { src: IMG + "g-campus-3.jpg", alt: "School corridor", category: "Campus" },
    { src: IMG + "g-class-3.jpg", alt: "Computer lab", category: "Classroom" },
    { src: IMG + "g-sports-3.jpg", alt: "Indoor games", category: "Sports" },
    { src: IMG + "g-events-4.jpg", alt: "Festival celebration", category: "Events" },
    { src: IMG + "g-campus-4.jpg", alt: "School library", category: "Campus" },
    { src: IMG + "g-class-4.jpg", alt: "Science lab", category: "Classroom" },
    { src: IMG + "g-sports-4.jpg", alt: "Kho-kho match", category: "Sports" }
  ];

  /* ---------- Blog posts (naya post = naya object; slug unique rakhein) ---------- */
  var posts = [
    {
      slug: "admissions-open-new-session",
      date: "2026-10-01",
      title: "Sample post: Admissions open for the new session",
      excerpt: "Admissions are open from Nursery to Class 12. Learn about the process and documents required.",
      image: IMG + "blog-admissions.jpg",
      body: [
        "This is a sample post. Replace this text with the actual announcement.",
        "Admissions are open from Nursery to Class 12, including Science, Commerce and Arts streams for Classes 11 and 12. Parents can apply online or visit the school office during office hours."
      ]
    },
    {
      slug: "class-x-results-celebration",
      date: "2026-09-20",
      title: "Sample post: Celebrating our Class X toppers",
      excerpt: "We congratulate our Class X students on their outstanding CBSE results.",
      image: IMG + "blog-toppers.jpg",
      body: [
        "This is a sample post. Replace this text with the actual news.",
        "We are proud of all our students for their hard work, and we thank parents and teachers for their constant support."
      ]
    },
    {
      slug: "activity-based-learning",
      date: "2026-09-05",
      title: "Sample post: How activity-based learning helps children",
      excerpt: "A look at how hands-on activities make classroom learning engaging and effective.",
      image: IMG + "blog-activity.jpg",
      body: [
        "This is a sample post. Replace this text with the actual article.",
        "Activity-based learning helps children understand concepts by doing, observing and discussing, which builds deeper understanding and confidence."
      ]
    },
    {
      slug: "sports-and-fitness",
      date: "2026-08-22",
      title: "Sample post: Sports and fitness at school",
      excerpt: "Indoor and outdoor games are an important part of every student's day.",
      image: IMG + "blog-sports.jpg",
      body: [
        "This is a sample post. Replace this text with the actual article.",
        "Regular sports and games help students stay fit, learn teamwork and develop discipline."
      ]
    }
  ];

  /* ---------- Admission ---------- */
  var admission = {
    steps: [
      { title: "Enquiry", text: "Visit the school office or call us to learn about admissions and seat availability." },
      { title: "Application", text: "Fill in the online application form or download and submit the admission form." },
      { title: "Interaction", text: "Attend a short interaction or assessment, as applicable for the class." },
      { title: "Confirmation", text: "Submit the required documents and fees to confirm admission." }
    ],
    documents: [
      "Birth certificate (for Nursery to Class 1)",
      "Transfer certificate from the previous school",
      "Report card / mark sheet of the previous class",
      "Aadhaar card of the student and parents",
      "Recent passport-size photographs",
      "Address proof"
    ],
    faqs: [
      { q: "Which classes are available?", a: "We offer classes from Nursery to Class 12. Science, Commerce and Arts streams are available in Classes 11 and 12." },
      { q: "Which board is the school affiliated to?", a: "The school is Affiliated to CBSE, New Delhi (Affiliation No. 2132084)." },
      { q: "What is the medium of instruction?", a: "English is the medium of instruction." },
      { q: "How can I apply?", a: "You can apply using the online application form or by downloading the admission form and submitting it at the school office." }
    ]
  };

  window.SITE = {
    school: school,
    heroSlides: heroSlides,
    hours: hours,
    links: links,
    nav: nav,
    stats: stats,
    facilities: facilities,
    toppers: toppers,
    notices: notices,
    leadership: leadership,
    teachers: teachers,
    galleryCategories: galleryCategories,
    gallery: gallery,
    posts: posts,
    admission: admission
  };
})();
