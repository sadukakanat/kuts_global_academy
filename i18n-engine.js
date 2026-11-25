/**
 * KUTS Global Academy — Self-Contained Zero-Fetch Localization Engine (i18n-engine.js v2)
 * Pinaleaf Advancements LLP (THRINC000) | 100% Local Kubo, Public IPFS Gateway & Render Static Safe
 *
 * Key Upgrades in v2:
 * 1. ZERO fetch() DEPENDENCY: Core English (en) and Malayalam (ml) dictionaries plus a cross-page
 *    phrase translation table are embedded directly in JS—eliminating 404/CORS/subpath errors
 *    on http://127.0.0.1:8080/ipfs/<CID>/, https://<CID>.ipfs.dweb.link/, and file:// opens.
 * 2. CROSS-PAGE DOM PHRASE TRANSLATOR: Automatically translates shared navigation links, buttons,
 *    headings, and cards across ALL 11 HTML pages even if an element lacks a `data-i18n` attribute.
 * 3. TECHNICAL IDENTIFIER SHIELD: Protects `.font-mono-kuts`, `<code>`, `<pre>`, composite serials,
 *    NodeIDs (`THRINC000`), and SHA-256 digests from alteration.
 */

(function () {
  const SUPPORTED_LOCALES = [
    { code: "en", label: "English (Global)", dir: "ltr" },
    { code: "ml", label: "മലയാളം (Malayalam)", dir: "ltr" },
    { code: "hi", label: "हिन्दी (Hindi)", dir: "ltr" },
    { code: "ta", label: "தமிழ் (Tamil)", dir: "ltr" },
    { code: "te", label: "తెలుగు (Telugu)", dir: "ltr" },
    { code: "kn", label: "ಕನ್ನಡ (Kannada)", dir: "ltr" },
    { code: "bn", label: "বাংলা (Bengali)", dir: "ltr" },
    { code: "ar", label: "العربية (Arabic)", dir: "rtl" },
    { code: "es", label: "Español (Spanish)", dir: "ltr" },
    { code: "fr", label: "Français (French)", dir: "ltr" },
    { code: "pt", label: "Português (Portuguese)", dir: "ltr" },
    { code: "zh", label: "中文 (Mandarin)", dir: "ltr" }
  ];

  // Embedded Dictionaries (Zero fetch() required on IPFS gateways)
  const EMBEDDED_DICTS = {
    en: {
      "meta.lang_name": "English (Global)",
      "nav.home": "← Home",
      "nav.academy": "Academy LMS",
      "nav.diploma": "Practitioner Diploma",
      "nav.partner_ops": "Partner OPS",
      "nav.module4_quiz": "Module 04 Quiz →",
      "ai.header_title": "Global AI Skills Training",
      "ai.badge": "FREE GLOBAL COHORT PROGRAM • PINALEAF ADVANCEMENTS LLP",
      "ai.hero_title": "Practical Artificial Intelligence (AI) Training for Everyone",
      "ai.hero_subtitle": "A zero-jargon, 4-stage mobile-first program helping everyday learners, professionals, and MSMEs apply AI in daily life and work—linked to KUTS Global Academy Module 04 certification.",
      "ai.cta_whatsapp": "Join Global WhatsApp Cohort",
      "ai.cta_telegram": "Join Telegram Channel",
      "ai.cta_quiz": "Take Module 04 Quiz (SHA-256 Certificate) →",
      "ai.stages_heading": "4-Stage Practical Curriculum & Mini-Projects",
      "ai.stages_subheading": "Check off each stage as you complete it (saved privately in your browser with zero database).",
      "ai.mark_done": "Mark Stage Completed",
      "ai.done_badge": "Completed ✓",
      "ai.mini_project_label": "Mini Project:",
      "ai.stage1.num": "STAGE 01",
      "ai.stage1.title": "AI Foundations, Prompting & Digital Safety",
      "ai.stage1.desc": "Overcome technical fear and master everyday AI prompting.",
      "ai.stage1.p1": "What generative AI is—and its real-world limitations",
      "ai.stage1.p2": "Personal and business data privacy hygiene",
      "ai.stage1.p3": "Drafting formal letters, emails, and applications",
      "ai.stage1.p4": "Structured Role + Context + Task + Format prompting",
      "ai.stage1.project": "Draft a formal bank/vendor request letter or a detailed 3-day travel/household budget plan.",
      "ai.stage2.num": "STAGE 02",
      "ai.stage2.title": "Creative & Multimodal AI (Images, Voice & Vision)",
      "ai.stage2.desc": "Work effortlessly with visuals, voice notes, and camera scans.",
      "ai.stage2.p1": "Writing clear image prompts and creating promotional graphics",
      "ai.stage2.p2": "Turning voice memos into structured meeting summaries",
      "ai.stage2.p3": "Converting handwritten notes and receipts into clean digital text",
      "ai.stage2.p4": "Everyday mobile vision & camera-assisted AI tools",
      "ai.stage2.project": "Create a promotional poster and social media caption for a local business or community event.",
      "ai.stage3.num": "STAGE 03",
      "ai.stage3.title": "Document Analysis, Fact-Checking & Research",
      "ai.stage3.desc": "Inspect long PDFs and organize reliable information rapidly.",
      "ai.stage3.p1": "Analyzing and summarizing lengthy PDF manuals and reports",
      "ai.stage3.p2": "Source-grounded verification to prevent AI hallucinations",
      "ai.stage3.p3": "Extracting comparison tables and checklists from raw notes",
      "ai.stage3.p4": "Document reading and bilingual translation workflows",
      "ai.stage3.project": "Upload a user manual or policy PDF and generate a plain-language 10-point FAQ guide.",
      "ai.stage4.num": "STAGE 04",
      "ai.stage4.title": "Custom AI Assistants & Workflow Automation",
      "ai.stage4.desc": "Automate repetitive office, study, and MSME workflows.",
      "ai.stage4.p1": "Configuring persistent System / Custom Instructions",
      "ai.stage4.p2": "Building multi-step prompt chains for complex tasks",
      "ai.stage4.p3": "Creating custom assistants tailored to your tone and domain",
      "ai.stage4.p4": "Proofreading, SOP generation, and reusable prompt templates",
      "ai.stage4.project": "Design and test a reusable prompt template for your daily job or business workflow.",
      "ai.schedule.title": "Weekly Cohort Learning Rhythm (39-Day Expanse-Epoch)",
      "ai.schedule.subtitle": "Designed so busy learners can progress steadily in just 15 minutes a day:",
      "ai.schedule.mon_title": "Monday — Concept Brief",
      "ai.schedule.mon_desc": "A 2-minute audio note and visual infographic introducing the week's core skill.",
      "ai.schedule.wed_title": "Wednesday — Hands-On Task",
      "ai.schedule.wed_desc": "A practical 10-minute exercise you can complete directly on your smartphone.",
      "ai.schedule.fri_title": "Friday — Live Q&A & Review",
      "ai.schedule.fri_desc": "Open community review window to share mini-projects and resolve doubts.",
      "ai.bottom.title": "Start Learning Free Today!",
      "ai.bottom.desc": "Anyone with a smartphone can join. Complete all 4 stages and advance toward your KUTS Certified Practitioner Diploma.",
      "ai.cohort.whatsapp_url": "https://chat.whatsapp.com/F0WuiwhaBjzK8KajqFGid9",
      "ai.cohort.telegram_url": "https://t.me/pinaleaf_kuts"
    },
    ml: {
      "meta.lang_name": "മലയാളം (Malayalam)",
      "nav.home": "← ഹോം",
      "nav.academy": "അക്കാദമി LMS",
      "nav.diploma": "പ്രാക്റ്റീഷണർ ഡിപ്ലോമ",
      "nav.partner_ops": "പാർട്ണർ OPS",
      "nav.module4_quiz": "Module 04 പരീക്ഷ →",
      "ai.header_title": "AI നൈപുണ്യ പരിശീലനം",
      "ai.badge": "സൗജന്യ വാട്‌സ്ആപ്പ് ലേണിംഗ് പ്രോഗ്രാം • PINALEAF ADVANCEMENTS LLP",
      "ai.hero_title": "സാധാരണക്കാർക്കായി ലളിതമായ ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ് (AI) പരിശീലനം",
      "ai.hero_subtitle": "സാങ്കേതിക ജ്ഞാനം ഇല്ലാത്തവർക്കും ദൈനംദിന ജീവിതത്തിലും തൊഴിലിലും എഐ സാങ്കേതികവിദ്യ പ്രയോജനപ്പെടുത്താൻ സഹായിക്കുന്ന 4-ഘട്ട പ്രായോഗിക പരിശീലനം. പൂർത്തിയാക്കുന്നവർക്ക് KUTS Global Academy (Module 04) സർട്ടിഫിക്കറ്റും നേടാം.",
      "ai.cta_whatsapp": "വാട്‌സ്ആപ്പ് ഗ്രൂപ്പിൽ അംഗമാവുക",
      "ai.cta_telegram": "ടെലിഗ്രാം ചാനലിൽ ചേരുക",
      "ai.cta_quiz": "Module 04 പരീക്ഷ എഴുതുക (SHA-256 സർട്ടിഫിക്കറ്റ്) →",
      "ai.stages_heading": "പരിശീലന ഘട്ടങ്ങൾ & മിനി പ്രൊജക്റ്റുകൾ",
      "ai.stages_subheading": "ഓരോ ഘട്ടവും പൂർത്തിയാക്കുമ്പോൾ താഴെ അടയാളപ്പെടുത്തുക (നിങ്ങളുടെ ബ്രൗസറിൽ സുരക്ഷിതമായി സേവ് ചെയ്യപ്പെടും).",
      "ai.mark_done": "പൂർത്തിയായതായി അടയാളപ്പെടുത്തുക",
      "ai.done_badge": "പൂർത്തിയാക്കി ✓",
      "ai.mini_project_label": "മിനി പ്രൊജക്റ്റ് (Mini Project):",
      "ai.stage1.num": "ഘട്ടം 01 • STAGE 01",
      "ai.stage1.title": "എഐ അടിസ്ഥാന പാഠങ്ങൾ",
      "ai.stage1.desc": "സാങ്കേതിക ഭയം ഒഴിവാക്കുക, ദൈനംദിന ഉപയോഗം പഠിക്കുക.",
      "ai.stage1.p1": "ജനറേറ്റീവ് എഐ എന്താണ്, അതിന്റെ പരിമിതികൾ",
      "ai.stage1.p2": "സ്വകാര്യതയും സുരക്ഷയും (Data Privacy)",
      "ai.stage1.p3": "ഔദ്യോഗിക ഇമെയിലുകളും അപേക്ഷകളും തയ്യാറാക്കൽ",
      "ai.stage1.p4": "റോൾ + ടാസ്ക് ഫോർമുല അടിസ്ഥാനമാക്കിയുള്ള പ്രോംപ്റ്റിംഗ്",
      "ai.stage1.project": "ബാങ്ക് കത്ത് അല്ലെങ്കിൽ 3 ദിവസത്തെ കൃത്യമായ യാത്രാ ബഡ്ജറ്റ് പ്ലാൻ തയ്യാറാക്കൽ.",
      "ai.stage2.num": "ഘട്ടം 02 • STAGE 02",
      "ai.stage2.title": "ക്രിയേറ്റീവ് & മൾട്ടിമോഡൽ",
      "ai.stage2.desc": "ചിത്രങ്ങൾ, ശബ്ദം, ഫോട്ടോകൾ എന്നിവ കൈകാര്യം ചെയ്യൽ.",
      "ai.stage2.p1": "ഇമേജ് പ്രോംപ്റ്റ് തയ്യാറാക്കലും ചിത്ര നിർമ്മാണവും",
      "ai.stage2.p2": "വോയ്‌സ് നോട്ടുകളിൽ നിന്ന് മീറ്റിംഗ് സമ്മറി ഉണ്ടാക്കൽ",
      "ai.stage2.p3": "കൈപ്പടയിലുള്ള കുറിപ്പുകൾ ഡിജിറ്റൽ ടെക്സ്റ്റാക്കി മാറ്റൽ",
      "ai.stage2.p4": "മൊബൈൽ വിഷൻ & എഐ ടൂളുകൾ",
      "ai.stage2.project": "ഒരു പ്രാദേശിക സ്ഥാപനത്തിനോ പരിപാടിക്കോ വേണ്ടിയുള്ള പോസ്റ്ററും അടിക്കുറിപ്പും നിർമ്മിക്കുക.",
      "ai.stage3.num": "ഘട്ടം 03 • STAGE 03",
      "ai.stage3.title": "വിവര വിശകലനം & പഠനം",
      "ai.stage3.desc": "വലിയ രേഖകൾ പരിശോധിക്കലും വിവരങ്ങൾ ചിട്ടപ്പെടുത്തലും.",
      "ai.stage3.p1": "വലിയ പിഡിഎഫ് (PDF) ഫയലുകൾ വിശകലനം ചെയ്യൽ",
      "ai.stage3.p2": "വിശ്വസനീയമായ ഡാറ്റ അടിസ്ഥാനമാക്കിയുള്ള വിവര ശേഖരണം",
      "ai.stage3.p3": "കുറിപ്പുകളിൽ നിന്ന് പട്ടികകളും സംഗ്രഹങ്ങളും ഉണ്ടാക്കൽ",
      "ai.stage3.p4": "ഡോക്യുമെന്റ് റീഡിംഗ് എഐ ടൂളുകൾ",
      "ai.stage3.project": "യൂസർ മാനുവൽ അല്ലെങ്കിൽ പിഡിഎഫ് രേഖ നൽകി എളുപ്പത്തിലുള്ള FAQ ഗൈഡ് നിർമ്മിക്കുക.",
      "ai.stage4.num": "ഘട്ടം 04 • STAGE 04",
      "ai.stage4.title": "വിപുലമായ രീതികൾ & കസ്റ്റം എഐ",
      "ai.stage4.desc": "സ്ഥിരമായി വരുന്ന ജോലികൾ ഓട്ടോമേറ്റ് ചെയ്യൽ.",
      "ai.stage4.p1": "സിസ്റ്റം ഇൻസ്ട്രക്ഷനുകൾ (Custom Instructions)",
      "ai.stage4.p2": "സങ്കീർണ്ണമായ മൾട്ടി-സ്റ്റെപ്പ് പ്രോംപ്റ്റുകൾ",
      "ai.stage4.p3": "സ്വന്തം ശൈലിയിൽ മറുപടി നൽകുന്ന കസ്റ്റം അസിസ്റ്റന്റുകൾ",
      "ai.stage4.p4": "പ്രൂഫ് റീഡിംഗ്, ടെംപ്ലേറ്റ് നിർമ്മാണം",
      "ai.stage4.project": "പ്രത്യേക ആവശ്യങ്ങൾക്കായി സ്ഥിരമായി ഉപയോഗിക്കാവുന്ന ഒരു പ്രോംപ്റ്റ് ടെംപ്ലേറ്റ് വികസിപ്പിക്കുക.",
      "ai.schedule.title": "ഗ്രൂപ്പ് പ്രവർത്തന രീതി (ആഴ്ചതോറും)",
      "ai.schedule.subtitle": "തിരക്കുകൾക്കിടയിലും പഠനം മുടങ്ങാതെ കൊണ്ടുപോകാൻ ക്രമീകരിച്ച ഷെഡ്യൂൾ:",
      "ai.schedule.mon_title": "തിങ്കൾ (Monday)",
      "ai.schedule.mon_desc": "ആശയ വിശദീകരണം: അന്നത്തെ പാഠം വിശദീകരിക്കുന്ന 2 മിനിറ്റ് വോയ്‌സ് നോട്ടും ഇൻഫോഗ്രാഫിക്കും.",
      "ai.schedule.wed_title": "ബുധൻ (Wednesday)",
      "ai.schedule.wed_desc": "ഹാൻഡ്സ്-ഓൺ ടാസ്ക്: മൊബൈൽ ഫോണിൽ തന്നെ ചെയ്തുനോക്കാവുന്ന ചെറിയ പ്രായോഗിക വ്യായാമം.",
      "ai.schedule.fri_title": "വെള്ളി (Friday)",
      "ai.schedule.fri_desc": "ഫീഡ്‌ബാക്ക് സെഷൻ: നിങ്ങളുടെ സംശയങ്ങൾ ചോദിക്കാനും ചെയ്ത കാര്യങ്ങൾ പങ്കുവെക്കാനും ഗ്രൂപ്പ് തുറക്കുന്നു.",
      "ai.bottom.title": "ഇന്നുതന്നെ സൗജന്യമായി പങ്കാളിയാകൂ!",
      "ai.bottom.desc": "സ്മാർട്ട്‌ഫോൺ ഉപയോഗിക്കാൻ അറിയാവുന്ന ആർക്കും ഈ പരിശീലനത്തിൽ പങ്കെടുക്കാം. 4 ഘട്ടങ്ങളും പൂർത്തിയാക്കി KUTS Global Academy-യുടെ AI & KUTS Practitioner പാതയിലേക്ക് മുന്നേറൂ.",
      "ai.cohort.whatsapp_url": "https://chat.whatsapp.com/F0WuiwhaBjzK8KajqFGid9",
      "ai.cohort.telegram_url": "https://t.me/pinaleaf_kuts"
    },
    hi: {
      "meta.lang_name": "हिन्दी (Hindi)",
      "nav.home": "← होम",
      "nav.academy": "अकादमी LMS",
      "nav.diploma": "प्रैक्टिशनर डिप्लोमा",
      "nav.partner_ops": "पार्टनर OPS",
      "nav.module4_quiz": "मॉड्यूल 04 क्विज़ →",
      "ai.header_title": "ग्लोबल AI कौशल प्रशिक्षण",
      "ai.badge": "निःशुल्क ग्लोबल प्रशिक्षण कार्यक्रम • PINALEAF ADVANCEMENTS LLP",
      "ai.hero_title": "सभी के लिए व्यावहारिक आर्टिफिशियल इंटेलिजेंस (AI) प्रशिक्षण",
      "ai.hero_subtitle": "बिना किसी तकनीकी जटिलता के 4-चरणीय मोबाइल-फर्स्ट प्रशिक्षण कार्यक्रम, जो आम नागरिकों, छात्रों और MSME उद्यमियों को दैनिक जीवन और कार्य में AI का उपयोग करना सिखाता है।",
      "ai.cta_whatsapp": "व्हाट्सएप ग्रुप से जुड़ें",
      "ai.cta_telegram": "टेलीग्राम चैनल से जुड़ें",
      "ai.cta_quiz": "मॉड्यूल 04 परीक्षा दें (SHA-256 प्रमाणपत्र) →",
      "ai.stages_heading": "4-चरणीय व्यावहारिक पाठ्यक्रम और मिनी-प्रोजेक्ट्स",
      "ai.stages_subheading": "प्रत्येक चरण पूरा करने पर नीचे चिह्नित करें (बिना किसी डेटाबेस के आपके ब्राउज़र में सुरक्षित रहेगा)।",
      "ai.mark_done": "पूर्ण चिह्नित करें",
      "ai.done_badge": "पूर्ण ✓",
      "ai.mini_project_label": "मिनी प्रोजेक्ट:",
      "ai.bottom.title": "आज ही निःशुल्क सीखना शुरू करें!",
      "ai.bottom.desc": "स्मार्टफोन का उपयोग करने वाला कोई भी व्यक्ति इस प्रशिक्षण में भाग ले सकता है।"
    },
    ta: {
      "meta.lang_name": "தமிழ் (Tamil)",
      "nav.home": "← முகப்பு",
      "nav.academy": "அகாடமி LMS",
      "nav.diploma": "பயிற்சியாளர் டிப்ளமோ",
      "nav.partner_ops": "பார்ட்னர் OPS",
      "nav.module4_quiz": "தொகுதி 04 தேர்வு →",
      "ai.header_title": "உலகளாவிய AI திறன் பயிற்சி",
      "ai.badge": "இலவச கற்றல் திட்டம் • PINALEAF ADVANCEMENTS LLP",
      "ai.hero_title": "அனைவருக்கும் எளிய செயற்கை நுண்ணறிவு (AI) பயிற்சி",
      "ai.hero_subtitle": "தொழில்நுட்ப அறிவு இல்லாதவர்களும் அன்றாட வாழ்க்கையிலும் தொழிலிலும் AI தொழில்நுட்பத்தைப் பயன்படுத்த உதவும் 4-நிலை செயல்முறைப் பயிற்சி.",
      "ai.cta_whatsapp": "வாட்ஸ்அப் குழுவில் இணையுங்கள்",
      "ai.cta_telegram": "டெலிகிராம் சேனலில் இணையுங்கள்",
      "ai.cta_quiz": "தொகுதி 04 தேர்வை எழுதுங்கள் (SHA-256 சான்றிதழ்) →",
      "ai.stages_heading": "4-நிலை பாடத்திட்டம் & சிறு திட்டங்கள்",
      "ai.stages_subheading": "ஒவ்வொரு நிலையையும் முடித்தவுடன் கீழே குறிக்கவும்.",
      "ai.mark_done": "முடிந்ததாகக் குறிக்கவும்",
      "ai.done_badge": "முடிந்தது ✓",
      "ai.mini_project_label": "சிறு திட்டம்:",
      "ai.bottom.title": "இன்றே இலவசமாகக் கற்கத் தொடங்குங்கள்!",
      "ai.bottom.desc": "ஸ்மார்ட்போன் பயன்படுத்தத் தெரிந்த எவரும் இதில் பங்கேற்கலாம்."
    }
  };

  // Cross-Page Phrase Dictionary so ALL 11 Academy HTML pages translate automatically without needing data-i18n on every tag
  const CROSS_PAGE_PHRASES = {
    ml: {
      "KUTS Global Academy": "KUTS ഗ്ലോബൽ അക്കാദമി",
      "Academy LMS": "അക്കാദമി LMS",
      "Practitioner Diploma": "പ്രാക്റ്റീഷണർ ഡിപ്ലോമ",
      "Partner OPS": "പാർട്ണർ OPS",
      "Temporal Scale": "ടെമ്പറൽ സ്കെയിൽ",
      "Test Vectors": "ടെസ്റ്റ് വെക്റ്ററുകൾ",
      "16 Categories": "16 വിഭാഗങ്ങൾ",
      "Anchor Nodes": "ആങ്കർ നോഡുകൾ",
      "Enter Kinepool →": "കൈൻപൂളിലേക്ക് പ്രവേശിക്കുക →",
      "Access Key": "ആക്സസ് കീ",
      "Start Learning (6 Modules)": "പഠനം ആരംഭിക്കുക (6 മൊഡ്യൂളുകൾ)",
      "Practitioner Diploma & Kinepool": "പ്രാക്റ്റീഷണർ ഡിപ്ലോമ & കൈൻപൂൾ",
      "Partner OPS (39-Day Deals)": "പാർട്ണർ OPS (39-ദിവസ ഡീലുകൾ)",
      "KUTS Global Academy & Operations Suite": "KUTS ഗ്ലോബൽ അക്കാദമി & ഓപ്പറേഷൻസ് സ്യൂട്ട്",
      "Global AI Skills Training (Multi-Language)": "ആഗോള AI നൈപുണ്യ പരിശീലനം (ബഹുഭാഷാ)",
      "Academy LMS & Quiz Engine": "അക്കാദമി LMS & ക്വിസ് എഞ്ചിൻ",
      "KUTS Practitioner Diploma & Kinepool Gate": "KUTS പ്രാക്റ്റീഷണർ ഡിപ്ലോമ & കൈൻപൂൾ ഗേറ്റ്",
      "Partner Operations & 39-Day Deal Registry": "പാർട്ണർ ഓപ്പറേഷൻസ് & 39-ദിവസ ഡീൽ രജിസ്ട്രി",
      "Expanse-Epoch Task & Sprint Console": "എക്സ്പാൻസ്-ഇപോക്ക് ടാസ്ക് & സ്പ്രിന്റ് കൺസോൾ",
      "64-Order Temporal Scale & Base-100 Converter": "64-ഓർഡർ ടെമ്പറൽ സ്കെയിൽ & ബേസ്-100 കൺവെർട്ടർ",
      "Section 10.2 Test Vector & Parser Sandbox": "സെക്ഷൻ 10.2 ടെസ്റ്റ് വെക്റ്റർ & പാർസർ സാൻഡ്ബോക്സ്",
      "16-Category Entity Registry & Precedence Wizard": "16-വിഭാഗം എന്റിറ്റി രജിസ്ട്രി",
      "Anchor Node Registry & Propagation Offset": "ആങ്കർ നോഡ് രജിസ്ട്രി",
      "Category 04 Key Console & Offline Verifier": "കാറ്റഗറി 04 കീ കൺസോൾ & ഓഫ്‌ലൈൻ വെരിഫയർ",
      "← Home": "← ഹോം",
      "Open →": "തുറക്കുക →"
    },
    hi: {
      "KUTS Global Academy": "KUTS ग्लोबल अकादमी",
      "Academy LMS": "अकादमी LMS",
      "Practitioner Diploma": "प्रैक्टिशनर डिप्लोमा",
      "Partner OPS": "पार्टनर OPS",
      "Temporal Scale": "टेम्पोरल स्केल",
      "Test Vectors": "टेस्ट वेक्टर्स",
      "16 Categories": "16 श्रेणियां",
      "Anchor Nodes": "एंकर नोड्स",
      "Enter Kinepool →": "काइनपूल में प्रवेश करें →",
      "Access Key": "एक्सेस कुंजी",
      "Start Learning (6 Modules)": "सीखना शुरू करें (6 मॉड्यूल)",
      "Global AI Skills Training (Multi-Language)": "ग्लोबल AI कौशल प्रशिक्षण (बहुभाषी)",
      "← Home": "← होम",
      "Open →": "खोलें →"
    },
    ta: {
      "KUTS Global Academy": "KUTS உலகளாவிய அகாடமி",
      "Academy LMS": "அகாடமி LMS",
      "Practitioner Diploma": "பயிற்சியாளர் டிப்ளமோ",
      "Partner OPS": "பார்ட்னர் OPS",
      "Enter Kinepool →": "கைன்பூலில் நுழையவும் →",
      "Access Key": "அணுகல் விசை",
      "Start Learning (6 Modules)": "கற்றலைத் தொடங்குங்கள் (6 தொகுதிகள்)",
      "Global AI Skills Training (Multi-Language)": "உலகளாவிய AI திறன் பயிற்சி",
      "← Home": "← முகப்பு",
      "Open →": "திற →"
    }
  };

  const DEFAULT_LOCALE = "en";
  const STORAGE_KEY = "kuts_preferred_lang";
  let activeDictionary = EMBEDDED_DICTS.en;
  const fallbackDictionary = EMBEDDED_DICTS.en;

  function protectTechnicalNodes() {
    const selectors = [
      ".font-mono-kuts",
      "code",
      "pre",
      "#live-kuts-serial",
      "#diploma-serial",
      "#diploma-access-key",
      "#diploma-sha256"
    ];
    document.querySelectorAll(selectors.join(",")).forEach((el) => {
      el.classList.add("notranslate");
      el.setAttribute("translate", "no");
    });
  }

  function applyDataI18nAttributes(dict) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = (dict && dict[key]) || fallbackDictionary[key];
      if (value) {
        if (el.hasAttribute("data-i18n-html")) {
          el.innerHTML = value;
        } else {
          el.textContent = value;
        }
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const value = (dict && dict[key]) || fallbackDictionary[key];
      if (value) el.setAttribute("placeholder", value);
    });
  }

  // Translates common UI labels across all pages even without explicit data-i18n attributes
  function applyCrossPagePhrases(langCode) {
    const phraseMap = CROSS_PAGE_PHRASES[langCode] || {};
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || parent.closest(".notranslate") || parent.tagName === "SCRIPT" || parent.tagName === "STYLE") {
        continue;
      }
      if (!node._kutsOriginalText) {
        node._kutsOriginalText = node.nodeValue;
      }
      const trimmed = node._kutsOriginalText.trim();
      if (!trimmed) continue;

      if (langCode === "en") {
        node.nodeValue = node._kutsOriginalText;
      } else if (phraseMap[trimmed]) {
        node.nodeValue = node._kutsOriginalText.replace(trimmed, phraseMap[trimmed]);
      } else {
        node.nodeValue = node._kutsOriginalText;
      }
    }
  }

  function setLanguage(langCode) {
    const meta = SUPPORTED_LOCALES.find((l) => l.code === langCode) || SUPPORTED_LOCALES[0];
    localStorage.setItem(STORAGE_KEY, meta.code);

    document.documentElement.setAttribute("lang", meta.code);
    document.documentElement.setAttribute("dir", meta.dir);

    const dict = EMBEDDED_DICTS[meta.code] || fallbackDictionary;
    activeDictionary = dict;

    applyDataI18nAttributes(dict);
    applyCrossPagePhrases(meta.code);
    protectTechnicalNodes();

    const hintBanner = document.getElementById("kuts-i18n-browser-hint");
    if (hintBanner) {
      if (EMBEDDED_DICTS[meta.code]) {
        hintBanner.classList.add("hidden");
      } else {
        hintBanner.classList.remove("hidden");
        hintBanner.textContent = `Selected "${meta.label}" — use your browser's built-in Translate menu for full page translation, or switch to English / Malayalam / Hindi / Tamil for offline IPFS packs.`;
      }
    }

    window.dispatchEvent(
      new CustomEvent("kuts:language-changed", {
        detail: { lang: meta.code, dir: meta.dir, dictionary: activeDictionary }
      })
    );
  }

  function mountSelector() {
    if (document.getElementById("kuts-lang-select")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "notranslate flex items-center";
    wrapper.setAttribute("translate", "no");

    const select = document.createElement("select");
    select.id = "kuts-lang-select";
    select.setAttribute("aria-label", "Select Language");
    select.className =
      "text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-400 text-slate-200 focus:outline-none focus:border-sky-400 cursor-pointer";

    const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LOCALE;

    SUPPORTED_LOCALES.forEach((loc) => {
      const opt = document.createElement("option");
      opt.value = loc.code;
      opt.textContent = `🌐 ${loc.label}`;
      if (loc.code === saved) opt.selected = true;
      select.appendChild(opt);
    });

    select.addEventListener("change", (e) => setLanguage(e.target.value));
    wrapper.appendChild(select);

    const headerInner = document.querySelector("header > div");
    if (headerInner && headerInner.lastElementChild) {
      headerInner.lastElementChild.prepend(wrapper);
    } else {
      wrapper.className = "notranslate fixed bottom-4 right-4 z-50 shadow-xl";
      document.body.appendChild(wrapper);
    }

    const hint = document.createElement("div");
    hint.id = "kuts-i18n-browser-hint";
    hint.className =
      "hidden bg-amber-500/15 border-b border-amber-500/30 text-amber-200 text-xs text-center py-1.5 px-4 font-mono-kuts";
    const header = document.querySelector("header");
    if (header && header.parentNode) {
      header.parentNode.insertBefore(hint, header.nextSibling);
    }
  }

  window.KUTS_I18N = {
    setLanguage,
    getSupportedLocales: () => SUPPORTED_LOCALES,
    t: (key) => activeDictionary[key] || fallbackDictionary[key] || key
  };

  let isUpdating = false;
  function boot() {
    protectTechnicalNodes();
    mountSelector();
    const initialLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LOCALE;
    setLanguage(initialLang);

    const observer = new MutationObserver(() => {
      if (isUpdating) return;
      isUpdating = true;
      const currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LOCALE;
      applyDataI18nAttributes(activeDictionary);
      if (currentLang !== "en") applyCrossPagePhrases(currentLang);
      protectTechnicalNodes();
      isUpdating = false;
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
