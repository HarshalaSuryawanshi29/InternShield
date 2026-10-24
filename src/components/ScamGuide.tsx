import React from 'react';
import { 
  X, 
  ShieldAlert, 
  Laptop, 
  MessageSquare, 
  CreditCard,
  IdCard
} from 'lucide-react';
import { SupportedLanguage } from '../types/analyzer';
import { TRANSLATIONS } from '../i18n/translations';

interface ScamGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadExample: (key: string) => void;
  language: SupportedLanguage;
}

interface ArchetypeItem {
  id: string;
  icon: React.ReactNode;
  badgeColor: string;
  title: Record<SupportedLanguage, string>;
  severity: Record<SupportedLanguage, string>;
  howItWorks: Record<SupportedLanguage, string>;
  theTrap: Record<SupportedLanguage, string>;
  redFlagPhrases: string[];
}

const ARCHETYPES: ArchetypeItem[] = [
  {
    id: 'upi-courier-india',
    icon: <CreditCard className="w-5 h-5 text-rose-400" />,
    badgeColor: 'text-rose-400 bg-rose-950/80 border-rose-700',
    title: {
      en: 'The UPI Courier & Laptop Deposit Scam (India)',
      mr: 'UPI कुरिअर शुल्क व लॅपटॉप सुरक्षा ठेव (भारत)',
      hi: 'UPI कूरियर शुल्क व लैपटॉप सुरक्षा जमा (भारत)',
      gu: 'UPI કુરિયર ફી અને લેપટોપ સિક્યોરિટી ડિપોઝિટ (ભારત)',
      ta: 'UPI கூரியர் கட்டணம் & லேப்டாப் டெபாசிட் மோசடி (இந்தியா)',
      te: 'UPI కొరియర్ ఛార్జీలు & ల్యాప్‌టాప్ డిపాజిట్ మోసం (భారత్)',
      kn: 'UPI ಕೊರಿಯರ್ ಶುಲ್ಕ & ಲ್ಯಾಪ್‌ಟಾಪ್ ಡೆಪಾಸಿಟ್ ವಂಚನೆ (ಭಾರತ)',
      bn: 'UPI কুরিয়ার চার্জ ও ল্যাপটপ সিকিউরিটি ডিপোজিট (ভারত)',
    },
    severity: {
      en: 'High Frequency in India',
      mr: 'भारतात सर्वाधिक प्रमाण',
      hi: 'भारत में सर्वाधिक प्रचलित',
      gu: 'ભારતમાં સૌથી વધુ પ્રચલિત',
      ta: 'இந்தியாவில் அதிக நிகழ்வு',
      te: 'భారతదేశంలో అత్యధికం',
      kn: 'ಭಾರತದಲ್ಲಿ ಅತಿ ಹೆಚ್ಚು',
      bn: 'ভারতে সর্বাধিক প্রচলিত',
    },
    howItWorks: {
      en: 'Students receive direct WhatsApp selection letters impersonating TCS, Infosys, or tech startups. To ship a company laptop, the recruiter demands a "refundable courier fee" of ₹1,500–₹3,000 via Google Pay, PhonePe, or Paytm UPI.',
      mr: 'विद्यार्थ्याला व्हॉट्सॲपवर टीसीएस, इन्फोसिस किंवा स्टार्टअप्सच्या नावाने थेट सिलेक्शन लेटर पाठवले जाते. कंपनीचा लॅपटॉप पाठवण्यासाठी ₹१,५०० ते ₹३,००० "कुरिअर फी" किंवा "सिक्युरिटी डिपॉझिट" गुगल पे/फोनपे वर मागितले जाते.',
      hi: 'छात्रों को व्हाट्सएप पर टीसीएस, इन्फोसिस या टेक कंपनियों के नाम से सीधे चयन पत्र भेजा जाता है। कंपनी का लैपटॉप भेजने के नाम पर ₹१,५०० से ₹३,००० की कूरियर फीस या सुरक्षा जमा यूपीआई से मांगी जाती है।',
      gu: 'વિદ્યાર્થીઓને વ્હોટ્સએપ પર મોટી કંપનીઓના નામે સીધા પસંદગી પત્રો મોકલવામાં આવે છે. કંપનીનું લેપટોપ મોકલવા માટે ₹૧,૫૦૦ થી ₹૩,૦૦૦ ની કુરિયર ફી ગૂગલ પે અથવા ફોનપે દ્વારા માંગવામાં આવે છે.',
      ta: 'மாணவர்களுக்கு வாட்ஸ்அப்பில் முன்னணி நிறுவனங்களின் பெயரில் தேர்வு கடிதங்கள் அனுப்பப்படுகின்றன. லேப்டாப் அனுப்ப ₹1,500 முதல் ₹3,000 வரை முன்பண கூரியர் கட்டணம் UPI மூலம் கோரப்படுகிறது.',
      te: 'విద్యార్థులకు ప్రముఖ కంపెనీల పేరుతో వాట్సాప్‌లో జాబ్ లెటర్స్ వస్తాయి. ల్యాప్‌టాప్ పంపడానికి ₹1,500 నుండి ₹3,000 కొరియర్ డిపాజిట్‌ను UPI ద్వారా అడుగుతారు.',
      kn: 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕಂಪನಿಗಳ ಹೆಸರಿನಲ್ಲಿ ನೇರ ಆಯ್ಕೆ ಪತ್ರ ಬರುತ್ತದೆ. ಲ್ಯಾಪ್‌ಟಾಪ್ ಕಳುಹಿಸಲು ₹1,500 ರಿಂದ ₹3,000 ಕೊರಿಯರ್ ಶುಲ್ಕವನ್ನು UPI ಮೂಲಕ ಕೇಳಲಾಗುತ್ತದೆ.',
      bn: 'শিক্ষার্থীদের হোয়াটসঅ্যাপে নামকরা কোম্পানির নামে সরাসরি নিয়োগপত্র পাঠানো হয়। ল্যাপটপ পাঠানোর জন্য ₹১,৫০০ থেকে ₹৩,০০০ কুরিয়ার ফি UPI দিয়ে পাঠাতে বলা হয়।',
    },
    theTrap: {
      en: 'Demands for upfront delivery fees or courier deposits via UPI are strong warning signs of recruitment fraud. Established employers typically supply hardware directly without requesting candidate funds.',
      mr: 'यूपीआयद्वारे आगाऊ कुरिअर डिपॉझिट किंवा लॅपटॉप फी मागणे हे भरती फसवणुकीचे तीव्र चेतावणी संकेत आहेत. अधिकृत कंपन्या उमेदवारांकडून साहित्यासाठी पैसे मागत नाहीत.',
      hi: 'यूपीआई द्वारा अग्रिम कूरियर शुल्क या लैपटॉप डिपॉजिट मांगना भर्ती धोखाधड़ी का बड़ा चेतावनी संकेत है। स्थापित कंपनियां आमतौर पर उम्मीदवारों से उपकरण के लिए पैसे नहीं मांगती हैं।',
      gu: 'UPI દ્વારા એડવાન્સ કુરિયર ડિપોઝિટ કે સાધન ફી માંગવી એ ભરતી છેતરપિંડીના મજબૂત ચેતવણી સંકેતો છે. વાસ્તવિક કંપનીઓ સાધનો માટે ઉમેદવારો પાસેથી પૈસા માંગતી નથી.',
      ta: 'முன்பண கூரியர் கட்டணம் அல்லது சாதன வைப்புத்தொகை கோருவது வேலைவாய்ப்பு மோசடியின் வலுவான எச்சரிக்கை அறிகுறியாகும். அங்கீகரிக்கப்பட்ட நிறுவனங்கள் பொதுவாக சாதனங்களுக்கு பணம் கேட்பதில்லை.',
      te: 'UPI ద్వారా ముందస్తు కొరియర్ డిపాజిట్ అడగడం రిక్రూట్‌మెంట్ మోసానికి బలమైన హెచ్చరిక సంకేతం. సాధారణంగా సంస్థలు అభ్యర్థుల నుండి నిధులు అడగవు.',
      kn: 'UPI ಮೂಲಕ ಮುಂಗಡ ಕೊರಿಯರ್ ಡೆಪಾಸಿಟ್ ಕೇಳುವುದು ನೇಮಕಾತಿ ವಂಚನೆಯ ಪ್ರಬಲ ಎಚ್ಚರಿಕೆಯ ಸೂಚನೆಯಾಗಿದೆ. ಅಧಿಕೃತ ಕಂಪನಿಗಳು ಸಾಮಾನ್ಯವಾಗಿ ಹಣ ಕೇಳುವುದಿಲ್ಲ.',
      bn: 'UPI-র মাধ্যমে অগ্রিম কুরিয়ার ফি বা ল্যাপটপ ডিপোজিট চাওয়া চাকরি প্রতারণার একটি বড় সতর্কতামূলক লক্ষণ। প্রতিষ্ঠিত কোম্পানি সাধারণত প্রার্থীর কাছে টাকা চায় না।',
    },
    redFlagPhrases: [
      '"Pay ₹1,850 refundable laptop courier deposit via Google Pay UPI to hr-dispatch@okhdfcbank"',
      '"Transfer ₹2,400 training registration fee before 5 PM to confirm your seat"',
      '"Pay security deposit via UPI QR code, refundable in your first salary"'
    ]
  },
  {
    id: 'aadhaar-harvesting',
    icon: <IdCard className="w-5 h-5 text-amber-400" />,
    badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-700',
    title: {
      en: 'Aadhaar & PAN Harvesting (Identity Theft)',
      mr: 'आधार व पॅन कार्ड चोरी (ओळख चोरी)',
      hi: 'आधार व पैन कार्ड चोरी (पहचान की चोरी)',
      gu: 'આધાર અને પાન કાર્ડ ચોરી (ઓળખ ચોરી)',
      ta: 'ஆதார் & பான் கார்டு திருட்டு (அடையாள திருட்டு)',
      te: 'ఆధార్ & పాన్ కార్డ్ డేటా చోరీ',
      kn: 'ಆಧಾರ್ & ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಕಳ್ಳತನ (ಗುರುತಿನ ದುರುಪಯೋಗ)',
      bn: 'আধার ও প্যান কার্ড তথ্য চুরি (আইডেন্টিটি থেফট)',
    },
    severity: {
      en: 'Severe Privacy Hazard',
      mr: 'गंभीर गोपनीय धोका',
      hi: 'गंभीर पहचान खतरा',
      gu: 'ગંભીર ગોપનીયતા જોખમ',
      ta: 'தீவிர தனியுரிமை ஆபத்து',
      te: 'తీవ్రమైన గోప్యతా ముప్పు',
      kn: 'ಗಂಭೀರ ಗೌಪ್ಯತಾ ಅಪಾಯ',
      bn: 'মারাত্মক ব্যক্তিগত গোপনীয়তা ঝুঁকি',
    },
    howItWorks: {
      en: 'Recruiters demand unmasked photos of your Aadhaar card (front and back), PAN card, and bank passbook/cancelled cheque directly over WhatsApp before any formal interview.',
      mr: 'मुलाखतीपूर्वीच व्हॉट्सॲप किंवा टेलिग्रामवर आधार कार्डचे दोन्ही बाजूंचे फोटो, पॅन कार्ड आणि बँक पासबुक मागितले जाते.',
      hi: 'इंटरव्यू से पहले ही व्हाट्सएप या टेलीग्राम पर आधार कार्ड (आगे-पीछे), पैन कार्ड और बैंक पासबुक की तस्वीरें मांगी जाती हैं।',
      gu: 'ઇન્ટરવ્યુ પહેલાં જ વ્હોટ્સએપ પર આધાર કાર્ડ, પાન કાર્ડ અને બેંક પાસબુકના સ્પષ્ટ ફોટા માંગવામાં આવે છે.',
      ta: 'நேர்காணலுக்கு முன்பே வாட்ஸ்அப்பில் ஆதார் கார்டு, பான் கார்டு மற்றும் வங்கி பாஸ்புக் புகைப்படங்கள் கோரப்படுகின்றன.',
      te: 'ఇంటర్వ్యూకి ముందే వాట్సాప్‌లో ఆధార్ కార్డ్, పాన్ కార్డ్ మరియు బ్యాంక్ పాస్‌బుక్ ఫోటోలను డిమాండ్ చేస్తారు.',
      kn: 'ಸಂದರ್ಶನಕ್ಕೆ ಮುಂಚೆಯೇ ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಆಧಾರ್ ಕಾರ್ಡ್, ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಫೋಟೋಗಳನ್ನು ಕೇಳುತ್ತಾರೆ.',
      bn: 'ইন্টারভিউয়ের আগেই হোয়াটসঅ্যাপে আধার কার্ড, প্যান কার্ড এবং ব্যাংক পাসবইয়ের ছবি চাওয়া হয়।',
    },
    theTrap: {
      en: 'Stolen KYC documents are used to register fraudulent SIM cards and open bank accounts used for money laundering in cybercrimes.',
      mr: 'या कागदपत्रांचा वापर करून विद्यार्थ्यांच्या नकळत नवीन सिम कार्ड (SIM Cards) किंवा बनावट बँक खाती (Mule Accounts) उघडली जातात.',
      hi: 'चुराए गए केवाईसी दस्तावेजों से फर्जी सिम कार्ड जारी किए जाते हैं और साइबर अपराधों के लिए फर्जी बैंक खाते खोले जाते हैं।',
      gu: 'ચોરાયેલા દસ્તાવેજોથી ગેરકાયદે સિમ કાર્ડ ખરીદવામાં આવે છે અને સાયબર ગુનાઓ માટે બેંક ખાતા ખોલવામાં આવે છે.',
      ta: 'திருடப்பட்ட ஆவணங்கள் போலி சிம் கார்டுகள் வாங்கவும் சைபர் குற்றங்களுக்கான கணக்குகளைத் திறக்கவும் பயன்படுத்தப்படுகின்றன.',
      te: 'దొంగిలించిన పత్రాలతో నకిలీ సిమ్ కార్డులు మరియు సైబర్ నేరాలకు బ్యాంక్ ఖాతాలు తెరుస్తారు.',
      kn: 'ಕದ್ದ ದಾಖಲೆಗಳನ್ನು ಬಳಸಿ ನಕಲಿ ಸಿಮ್ ಕಾರ್ಡ್ ಪಡೆಯಲಾಗುತ್ತದೆ ಮತ್ತು ಸೈಬರ್ ವಂಚನೆಗಳಿಗೆ ಬ್ಯಾಂಕ್ ಖಾತೆ ತೆರೆಯಲಾಗುತ್ತದೆ.',
      bn: 'চুরি করা নথি দিয়ে ভুয়া সিম কার্ড তোলা হয় এবং সাইবার অপরাধে মানি লন্ডারিং ব্যাংক অ্যাকাউন্ট খোলা হয়।',
    },
    redFlagPhrases: [
      '"Send Aadhaar card front and back along with PAN card on WhatsApp immediately"',
      '"Verification requires clear photo of your bank cheque with signature"',
      '"Send Aadhaar OTP for employee registration verification"'
    ]
  },
  {
    id: 'fake-check',
    icon: <Laptop className="w-5 h-5 text-purple-400" />,
    badgeColor: 'text-purple-400 bg-purple-950/80 border-purple-700',
    title: {
      en: 'The Fake Check & Equipment Advance Scam (Global)',
      mr: 'बनावट चेक व उपकरण घोटाळा (आंतरराष्ट्रीय)',
      hi: 'फर्जी चेक व उपकरण घोटाला (ग्लोबल)',
      gu: 'નકલી ચેક અને સાધન કૌભાંડ (વૈશ્વિક)',
      ta: 'போலி காசோலை மற்றும் உபகரண மோசடி (உலகளாவிய)',
      te: 'నకిలీ చెక్ & ఎక్విప్‌మెంట్ స్కామ్ (గ్లోబల్)',
      kn: 'ನಕಲಿ ಚೆಕ್ & ಉಪಕರಣ ವಂಚನೆ (ಜಾಗತಿಕ)',
      bn: 'ভুয়া চেক ও সরঞ্জাম স্ক্যাম (গ্লোবাল)',
    },
    severity: {
      en: 'Global Classic Scam',
      mr: 'आंतरराष्ट्रीय स्कॅम',
      hi: 'अंतरराष्ट्रीय घोटाला',
      gu: 'આંતરરાષ્ટ્રીય કૌભાંડ',
      ta: 'சர்வதேச மோசடி',
      te: 'అంతర్జాతీయ మోసం',
      kn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ವಂಚನೆ',
      bn: 'আন্তর্জাতিক স্ক্যাম',
    },
    howItWorks: {
      en: 'The "recruiter" emails an image of an electronic check for $2,000–$4,000 to purchase MacBook Pros. You are told to deposit it and immediately wire funds to their "certified vendor."',
      mr: 'कंपनी $३,००० चा बनावट इलेक्ट्रॉनिक चेक पाठवते आणि तो बँकेत जमा करून त्यांच्या "मान्यताप्राप्त व्हेंडर"ला Zelle किंवा Bitcoin ने पैसे पाठवण्यास सांगते.',
      hi: 'कंपनी $3,000 का फर्जी चेक भेजती है और कहती है कि इसे बैंक में जमा करके उनके बताए वेंडर को जेले या वायर से पैसे भेजें।',
      gu: 'કંપની $3,000 નો નકલી ચેક મોકલે છે અને કહે છે કે તેને બેંકમાં જમા કરાવીને તેમના વેન્ડરને પૈસા ટ્રાન્સફર કરો.',
      ta: 'நிறுவனம் போலி காசோலையை அனுப்பி, அதை வங்கியில் டெபாசிட் செய்து அவர்களின் வெண்டருக்கு பணம் அனுப்ப சொல்கிறது.',
      te: 'కంపెనీ నకిలీ చెక్కును పంపి, దాన్ని డిపాజిట్ చేసి వారి వెండర్‌కు డబ్బులు పంపాలని చెబుతుంది.',
      kn: 'ಕಂಪನಿಯು ನಕಲಿ ಚೆಕ್ ಕಳುಹಿಸಿ, ಅದನ್ನು ಡೆಪಾಸಿಟ್ ಮಾಡಿ ಅವರ ಮಾರಾಟಗಾರರಿಗೆ ಹಣ ಕಳುಹಿಸಲು ಹೇಳುತ್ತದೆ.',
      bn: 'কোম্পানি ভুয়া চেক পাঠিয়ে ব্যাংকে জমা করতে বলে এবং তাদের অনুমোদিত ভেন্ডরকে টাকা পাঠাতে নির্দেশ দেয়।',
    },
    theTrap: {
      en: 'When the check bounces 1–2 weeks later, your bank reverses the credit, and the thousands of dollars wired to the vendor are gone forever.',
      mr: 'काही दिवसांनी बँक तो चेक बाऊन्स ठरवते आणि पाठवलेले सर्व पैसे विद्यार्थ्याच्या स्वतःच्या खात्यातून कापले जातात.',
      hi: 'कुछ दिनों बाद चेक बाउंस हो जाता है और भेजी गई पूरी रकम छात्र के निजी बैंक खाते से कट जाती है।',
      gu: 'થોડા દિવસો પછી ચેક બાઉન્સ થાય છે અને મોકલેલા તમામ પૈસા વિદ્યાર્થીના પોતાના ખાતામાંથી કપાઈ જાય છે.',
      ta: 'சில நாட்களில் காசோலை பவுನ್ಸ್ ஆகிறது, மற்றும் அனுப்பப்பட்ட பணம் மாணவரின் கணக்கிலிருந்து கழிக்கப்படுகிறது.',
      te: 'కొన్ని రోజుల తర్వాత చెక్ బౌన్స్ అవుతుంది మరియు పంపిన మొత్తం విద్యార్థి సొంత ఖాతా నుండి కట్ అవుతుంది.',
      kn: 'ಕೆಲವು ದಿನಗಳ ನಂತರ ಚೆಕ್ ಬೌನ್ಸ್ ಆಗುತ್ತದೆ ಮತ್ತು ಕಳುಹಿಸಿದ ಹಣ ವಿದ್ಯಾರ್ಥಿಯ ಖಾತೆಯಿಂದ ಕಡಿತಗೊಳ್ಳುತ್ತದೆ.',
      bn: 'কয়েকদিন পর চেক বাউন্স করে এবং পাঠানো সমস্ত টাকা শিক্ষার্থীর নিজের অ্যাকাউন্ট থেকে কেটে নেওয়া হয়।',
    },
    redFlagPhrases: [
      '"Our accounting team will issue an electronic check for home office supplies."',
      '"Deposit the check and immediately wire $3,000 to our certified supplier."',
      '"Keep $300 as your bonus and wire the remaining funds back."'
    ]
  },
  {
    id: 'telegram-interview',
    icon: <MessageSquare className="w-5 h-5 text-cyan-400" />,
    badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-700',
    title: {
      en: 'Text-Only Telegram & WhatsApp Recruiter',
      mr: 'केवळ चॅटवरील मुलाखतीचा बनाव',
      hi: 'केवल चैट पर फर्जी इंटरव्यू',
      gu: 'માત્ર ચેટ પર નકલી ઇન્ટરવ્યુ',
      ta: 'சாட் மூலம் மட்டுமே போலி நேர்காணல்',
      te: 'చాట్ ద్వారా మాత్రమే నకిలీ ఇంటర్వ్యూ',
      kn: 'ಕೇವಲ ಚಾಟ್ ಮೂಲಕ ನಕಲಿ ಸಂದರ್ಶನ',
      bn: 'শুধু চ্যাটে ভুয়া ইন্টারভিউ',
    },
    severity: {
      en: 'High Impersonation Risk',
      mr: 'अत्यंत संशयास्पद पद्धत',
      hi: 'अत्यधिक संदेಹಾస్పద',
      gu: 'અતિ શંકાસ્પદ પદ્ધતિ',
      ta: 'அதிக ஆள்മാறாட்ட ஆபத்து',
      te: 'తీవ్ర అనుమానాస్పదం',
      kn: 'ಅತೀವ ಅನುಮಾನಾಸ್ಪದ',
      bn: 'অত্যন্ত সন্দেহজনক পদ্ধতি',
    },
    howItWorks: {
      en: 'You are contacted via generic text messaging claiming an urgent opening. The entire "interview" is conducted via text chat, and you are offered the role within 20 minutes.',
      mr: 'कोणत्याही व्हिडिओ किंवा फोन कॉलशिवाय फक्त टेलिग्राम किंवा व्हॉट्सॲपवर ५-१० प्रश्न विचारून २० मिनिटांत ऑफर लेटर दिले जाते.',
      hi: 'बिना किसी वीडियो या फोन कॉल के सिर्फ टेलीग्राम या व्हाट्सएप चैट पर कुछ प्रश्न पूछकर २० मिनट में ऑफर लेटर दे दिया जाता है।',
      gu: 'કોઈપણ વિડીયો કે ફોન કોલ વગર માત્ર વ્હોટ્સએપ પર પ્રશ્નો પૂછીને ૨૦ મિનિટમાં ઑફર લેટર આપી દેવામાં આવે છે.',
      ta: 'வீடியோ அல்லது தொலைபேசி அழைப்பு இல்லாமல் வாட்ஸ்அப் அல்லது டெலிகிராமில் சாட் மூலம் 20 நிமிடங்களில் வேலை ஆஃபர் வழங்கப்படுகிறது.',
      te: 'వీడియో లేదా ఫోన్ కాల్ లేకుండా కేవలం టెలిగ్రామ్ లేదా వాట్సాప్ చాట్‌లో 20 నిమిషాల్లో ఆఫర్ లెటర్ ఇస్తారు.',
      kn: 'ಯಾವುದೇ ವಿಡಿಯೋ ಅಥವಾ ಫೋನ್ ಕರೆ ಇಲ್ಲದೆ ಕೇವಲ ವಾಟ್ಸಾಪ್ ಚಾಟ್ ಮೂಲಕ 20 ನಿಮಿಷಗಳಲ್ಲಿ ಉದ್ಯೋಗ ಆಫರ್ ನೀಡಲಾಗುತ್ತದೆ.',
      bn: 'কোনো ভিডিও বা ফোন কল ছাড়াই শুধু টেলিগ্রাম বা হোয়াটসঅ্যাপ চ্যাটে প্রশ্ন করে ২০ মিনিটে অফার লেটার দেওয়া হয়।',
    },
    theTrap: {
      en: 'Relying exclusively on informal chat without video or in-person verification presents a high impersonation risk. Established corporate hiring typically involves verified communications.',
      mr: 'कोणत्याही पडताळणीशिवाय केवळ चॅटवर भरती करणे ही गैरव्यवहाराची तीव्र लक्षणे दर्शवते. अधिकृत कंपन्या पडताळणीयोग्य प्रक्रियेचा वापर करतात.',
      hi: 'बिना किसी सत्यापन के केवल चैट पर भर्ती प्रक्रिया होना भारी जोखिम और चेतावनी संकेत है। स्थापित कंपनियां औपचारिक प्रक्रियाओं का पालन करती हैं।',
      gu: 'કોઈપણ ચકાસણી વગર માત્ર ચેટ દ્વારા ભરતી કરવી એ ઓળખ ચોરીનો મોટો ચેતવણી સંકેત છે. અધિકૃત કંપનીઓ વિડીયો મીટિંગ કે ઔપચારિક પદ્ધતિઓ વાપરે છે.',
      ta: 'முறையான சரிபார்ப்பு இல்லாமல் சாட் மூலம் மட்டுமே வேலை வழங்குவது தீவிர ஆள்மாறாட்ட எச்சரிக்கை அறிகுறியாகும். நிறுவனங்கள் சரிபார்க்கப்பட்ட வழிகளைப் பயன்படுத்துகின்றன.',
      te: 'ఎటువంటి ధృవీకరణ లేకుండా కేవలం చాట్ ద్వారా నియామకం చేయడం తీవ్రమైన అనుమానాలకు తావిస్తుంది. సంస్థలు అధికారిక ప్రక్రియలను పాటిస్తాయి.',
      kn: 'ಯಾವುದೇ ದೃಢೀಕರಣವಿಲ್ಲದೆ ಕೇವಲ ಚಾಟ್ ಮೂಲಕ ಉದ್ಯೋಗ ನೀಡುವುದು ವಂಚನೆಯ ಬಲವಾದ ಎಚ್ಚರಿಕೆ ಸಂಕೇತವಾಗಿದೆ. ಅಧಿಕೃತ ಸಂಸ್ಥೆಗಳು ಪರಿಶೀಲಿಸಬಹುದಾದ ಸಂವಹನಗಳನ್ನು ಬಳಸುತ್ತವೆ.',
      bn: 'যথাযথ যাচাইকরণ ছাড়া শুধু চ্যাটের মাধ্যমে চাকরি দেওয়া অত্যন্ত উচ্চ ঝুঁকির সতর্কতামূলক লক্ষণ। প্রতিষ্ঠিত নিয়োগ প্রক্রিয়ায় আনুষ্ঠানিক মাধ্যম ব্যবহার করা হয়।',
    },
    redFlagPhrases: [
      '"Add our hiring manager on Telegram (@RecruiterLead123) for your interview."',
      '"Because of urgent hiring needs, no phone interview is required."',
      '"Interview will be held strictly via Signal messenger between 9am and 10am."'
    ]
  }
];

export const ScamGuide: React.FC<ScamGuideProps> = ({ isOpen, onClose, onLoadExample, language }) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#080d1a]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {t.guideModalTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {t.guideModalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ARCHETYPES.map((item) => (
              <div 
                key={item.id}
                className="rounded-xl bg-[#080c18] border border-slate-800 p-4.5 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <h4 className="text-sm font-bold text-white">
                      {item.title[language] || item.title.en}
                    </h4>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border mb-2.5 ${item.badgeColor}`}>
                    {item.severity[language] || item.severity.en}
                  </span>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div>
                      <span className="font-semibold text-slate-200">
                        {t.guideHowItWorks}
                      </span>
                      <span>{item.howItWorks[language] || item.howItWorks.en}</span>
                    </div>
                    <div className="bg-rose-950/30 border border-rose-900/40 p-2.5 rounded-lg text-rose-200">
                      <span className="font-semibold text-rose-300">
                        {t.guideTheTrap}
                      </span>
                      <span>{item.theTrap[language] || item.theTrap.en}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                  <p className="text-[11px] font-mono text-slate-400 mb-1.5 font-semibold">
                    {t.guideRedFlags}
                  </p>
                  <ul className="space-y-1">
                    {item.redFlagPhrases.map((phrase, i) => (
                      <li key={i} className="text-[11px] font-mono text-slate-300 bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
                        {phrase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Test Prompt */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider font-mono">
                {t.guideTestSamplesTitle}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                {t.guideTestSamplesDesc}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <button
                onClick={() => {
                  onLoadExample('indianSuspicious');
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                {t.sampleSuspiciousIndian}
              </button>
              <button
                onClick={() => {
                  onLoadExample('suspicious');
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                {t.sampleSuspiciousGlobal}
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#080d1a] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            {t.guideCloseBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
