import { useState, useEffect, useRef } from 'react'

const LANGUAGES = [
  { label: 'हिंदी', code: 'hi-IN' },
  { label: 'ਪੰਜਾਬੀ', code: 'pa-IN' },
  { label: 'বাংলা', code: 'bn-IN' },
  { label: 'தமிழ்', code: 'ta-IN' },
  { label: 'తెలుగు', code: 'te-IN' },
]

const AI_RESPONSES = {
  default: {
    'hi-IN': 'Namaste! Main aapka AI Sahayak hoon. Aap Hindi mein pooch sakte hain — PM-KISAN, hospital, school, ya koi bhi jankari. Main yahan madad karne ke liye hoon! 🙏',
    'pa-IN': 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਸੀਂ ਕੁਝ ਵੀ ਪੁੱਛ ਸਕਦੇ ਹੋ — ਸਰਕਾਰੀ ਸਕੀਮਾਂ, ਡਾਕਟਰ, ਸਕੂਲ। ਮੈਂ ਇੱਥੇ ਮਦਦ ਕਰਨ ਲਈ ਹਾਂ!',
    'bn-IN': 'নমস্কার! আপনি যেকোনো প্রশ্ন করতে পারেন — সরকারি প্রকল্প, ডাক্তার, স্কুল। আমি এখানে সাহায্য করতে আছি!',
    'ta-IN': 'வணக்கம்! நீங்கள் எதையும் கேட்கலாம் — அரசு திட்டங்கள், மருத்துவர், பள்ளி. நான் இங்கே உதவ இருக்கிறேன்!',
    'te-IN': 'నమస్కారం! మీరు ఏమైనా అడగవచ్చు — ప్రభుత్వ పథకాలు, డాక్టర్, పాఠశాల. నేను ఇక్కడ సహాయం చేయడానికి ఉన్నాను!',
  },
  'kaise ho': 'Main bilkul theek hoon! Aapka AI Sahayak. Aap kaise hain? Maine aaj Bihar ke kisaanon ke liye nayi jaankari update ki hai. 😊',
  'namaste': 'Namaste! Kaunsi sarkari scheme ya hospital ke baare mein jaanna chahte hain aap?',
  'hello': 'Hello! I am your Smart India AI Sahayak. How can I help you today with schemes or services?',
  'thik': 'Sunkar achha laga! Agar aapko kheti, paisa, ya ilaj se judi koi madad chahiye toh poochiye.',
  'theek': 'Sunkar achha laga! Agar aapko kheti, paisa, ya ilaj se judi koi madad chahiye toh poochiye.',
  'kisan': 'Kisan samman nidhi (PM-KISAN) ke paise har 4 mahine mein ₹2000 aate hain. Bihar mein agli kist (installment) jald hi aane wali hai. Apne status check karne ke liye Aadhaar number taiyar rakhein.',
  'paisa': 'Sarkari schemes ka paisa seedhe aapke bank account (DBT) mein aata hai. PM-KISAN ka ₹2000 ya MGNREGA ki majduri — dono ke liye Aadhaar seed link hona zaroori hai.',
  'money': 'Sarkari schemes ka paisa seedhe aapke bank account (DBT) mein aata hai. PM-KISAN ka ₹2000 ya MGNREGA ki majduri — dono ke liye Aadhaar seed link hona zaroori hai.',
  'bihar': 'Bihar ke kisaanon ke liye khet-khalihan aur rabi fasal ke liye vishesh sahayata uplabdha hai. Aap Bihar Govt ki "Krishi" portal pe register kar sakte hain.',
  'hospital': '🏥 Paas ka hospital (PHC): Primary Health Centre, Muzaffarpur Road pe 2.1 km door hai. Wahan 24 ghante emergency suvidha hai.',
  'ilaj': '🏥 Muzaffarpur mein Govt Hospital (PHC) 2.1 km door hai. Ayushman card hai toh ₹5 lakh tak ka ilaj bilkul muft milega.',
  'doctor': '👨‍⚕️ Dr. Sahab PHC clinic mein Mon-Sat subah 9 baje se milte hain. Emergency ke liye 108 number pe call karein.',
  'pm kisan': 'PM-KISAN scheme mein ₹6000 per year milte hain — 3 installments mein. Aapko paas ke CSC center jaana hoga, Aadhaar + land record saath lena hoga. 📍 Nearest CSC: Gram Panchayat Office, 1.2 km.',
  'csc': '📍 CSC Center: Gram Panchayat Office, 1.2 km. Timing: 9AM-5PM. Contact: +91-9876543210. Documents: Aadhaar, ration card.',
  'school': '🏫 Govt. School: 0.8 km. Admission open April-June. RTE free seats available. Contact: 9123456789.',
  'mgnrega': '💼 MGNREGA: 100 din rozgar guarantee. Apne Gram Panchayat mein register karein. ₹220/day wage. Kaam mila sakta hoon aapko!',
  'ayushman': '🏥 Ayushman Bharat: ₹5 lakh health insurance FREE. Check eligibility: mera.pmjay.gov.in ya 14555 pe call karein.',
  'pm awas': '🏠 PM Awas Yojana: ₹1.2 lakh rural pakke ghar ke liye. BPL families ke liye. Gram Panchayat mein apply karein.',
  'scheme': 'Bahut saari schemes hain: PM-Kisan (Kheti), PM-Awas (Ghar), Ayushman (Ilaj), aur MGNREGA (Kaam). Aapko kiske baare mein jaanna hai?',
}

const getAIResponse = (text, langCode) => {
  const lower = text.toLowerCase()
  // Try to find the best keyword match
  const keywords = Object.keys(AI_RESPONSES).filter(k => k !== 'default')
  for (const key of keywords) {
    if (lower.includes(key)) return AI_RESPONSES[key]
  }
  return AI_RESPONSES.default[langCode] || AI_RESPONSES.default['hi-IN']
}

const schemes = [
  { icon: '🌾', title: 'PM-KISAN', desc: 'Kisaanon ko ₹6000 per year direct benefit', benefit: '₹6,000/year', color: '#00A651', keyword: 'pm kisan' },
  { icon: '🏠', title: 'PM Awas Yojana', desc: 'Rural pakke ghar ke liye sahayata', benefit: '₹1.2 Lakh', color: '#4CC9F0', keyword: 'pm awas' },
  { icon: '💼', title: 'MGNREGA', desc: '100 din guaranteed rojgar in Gram Panchayat', benefit: '100 days/year', color: '#7B5EA7', keyword: 'mgnrega' },
  { icon: '🏥', title: 'Ayushman Bharat', desc: '5 lakh tak ka health insurance — free', benefit: '₹5 Lakh Cover', color: '#FF9933', keyword: 'ayushman' },
]

const nearby = [
  { icon: '🏛️', name: 'CSC Center', dist: '1.2 km', open: true },
  { icon: '🏥', name: 'PHC Clinic', dist: '2.1 km', open: true },
  { icon: '🏫', name: 'Govt School', dist: '0.8 km', open: true },
  { icon: '🏦', name: 'Post Office', dist: '3.4 km', open: false },
]

export default function RuralSupportScreen() {
  const [selectedLang, setSelectedLang] = useState(0)
  const [listening, setListening] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! Main aapka AI Sahayak hoon. Aap Hindi mein pooch sakte hain — PM-KISAN, hospital, school, ya koi bhi sarkari scheme ke baare mein. 🙏' }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(true)
  const recognitionRef = useRef(null)
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setVoiceSupported(false)
    }
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const addMessage = (role, text) => {
    setMessages(prev => [...prev, { role, text }])
  }

  const simulateAIReply = async (userText) => {
    setIsTyping(true)
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userText,
          history: messages.slice(-5) // Send last 5 messages for context
        }),
      });

      if (!response.ok) throw new Error('Backend error');
      
      const data = await response.json();
      setIsTyping(false);
      addMessage('ai', data.text);
    } catch (error) {
      console.warn('Backend unavailable, using fallback AI');
      setTimeout(() => {
        setIsTyping(false)
        addMessage('ai', getAIResponse(userText, LANGUAGES[selectedLang].code))
      }, 1200)
    }
  }

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    addMessage('user', text)
    setInput('')
    simulateAIReply(text)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  const handleSchemeClick = (scheme) => {
    setExpanded(expanded === scheme.title ? null : scheme.title)
    addMessage('user', `${scheme.title} ke baare mein batao`)
    simulateAIReply(scheme.keyword)
  }

  const startListening = () => {
    if (!voiceSupported) {
      addMessage('ai', '⚠️ Aapka browser voice input support nahi karta. Please text mein type karein.')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    recognition.lang = LANGUAGES[selectedLang].code
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.continuous = false

    recognition.onstart = () => setListening(true)

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      addMessage('user', transcript)
      simulateAIReply(transcript)
    }

    recognition.onerror = (event) => {
      setListening(false)
      if (event.error === 'not-allowed') {
        addMessage('ai', '🎙️ Microphone access denied. Browser settings mein allow karein.')
      } else if (event.error === 'no-speech') {
        addMessage('ai', '🔇 Koi awaaz nahi aayi. Dobara try karein.')
      } else {
        addMessage('ai', `❌ Voice error: ${event.error}. Text mein type karein.`)
      }
    }

    recognition.onend = () => setListening(false)

    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  const toggleVoice = () => {
    if (listening) stopListening()
    else startListening()
  }

  const handleLangChange = (idx) => {
    setSelectedLang(idx)
    const lang = LANGUAGES[idx]
    const greet = AI_RESPONSES.default[lang.code]
    addMessage('ai', `[${lang.label}] ${greet}`)
  }

  return (
    <div className="page">
      <div className="page-header animate-fade-up">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>🌾</span>
          <h1 className="page-title" style={{ color: '#00A651' }}>Rural Support</h1>
        </div>
        <p className="page-subtitle">Hindi mein bolo · Sarkari schemes · Voice AI</p>
      </div>

      {/* Language Selector — FIXED */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }} className="animate-fade-up">
        {LANGUAGES.map((lang, i) => (
          <button
            key={lang.code}
            id={`lang-${lang.code}`}
            onClick={() => handleLangChange(i)}
            style={{
              padding: '7px 14px', borderRadius: 'var(--radius-full)', fontSize: 13, fontWeight: 600,
              background: selectedLang === i ? 'rgba(0,166,81,0.25)' : 'var(--bg-card)',
              border: `1px solid ${selectedLang === i ? '#00A651' : 'var(--border-glass)'}`,
              color: selectedLang === i ? '#00A651' : 'var(--text-secondary)',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: selectedLang === i ? '0 0 12px rgba(0,166,81,0.3)' : 'none',
              transform: selectedLang === i ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Voice Button — FIXED with Web Speech API */}
      <div style={{ textAlign: 'center', marginBottom: 24 }} className="animate-fade-up">
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
          🎙️ {LANGUAGES[selectedLang].label} mein bolein — AI samjhega
        </p>
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          {listening && (
            <>
              <div className="voice-ring" />
              <div className="voice-ring" style={{ animationDelay: '0.5s' }} />
              <div className="voice-ring" style={{ animationDelay: '1s' }} />
            </>
          )}
          <button
            id="voice-btn"
            className={`voice-btn ${listening ? 'listening' : ''}`}
            onClick={toggleVoice}
            title={listening ? 'Rokne ke liye tap karein' : 'Bolne ke liye tap karein'}
            style={{ fontSize: listening ? 32 : 36 }}
          >
            {listening ? '⏹️' : '🎙️'}
          </button>
        </div>
        <div style={{
          marginTop: 14, padding: '8px 22px', display: 'inline-block',
          background: listening ? 'rgba(0,166,81,0.15)' : 'var(--bg-card)',
          borderRadius: 'var(--radius-full)',
          border: `1px solid ${listening ? 'rgba(0,166,81,0.5)' : 'var(--border-glass)'}`,
          transition: 'all 0.3s'
        }}>
          <span style={{ fontSize: 13, color: listening ? '#00A651' : 'var(--text-muted)', fontWeight: 600 }}>
            {listening ? `🟢 Sun raha hoon... (${LANGUAGES[selectedLang].label})` : 'Tap karke bolein'}
          </span>
        </div>
        {!voiceSupported && (
          <p style={{ marginTop: 8, fontSize: 11, color: '#FF9933' }}>
            ⚠️ Voice supported nahi. Chrome use karein.
          </p>
        )}
      </div>

      {/* AI Chat — FUNCTIONAL */}
      <div style={{ marginBottom: 20 }} className="animate-fade-up">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p className="section-title" style={{ marginBottom: 0 }}>AI Sahayak — IndicBERT + Whisper</p>
          <div style={{ fontSize: 11, color: '#00A651', display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00A651', animation: 'pulse-dot 1.5s infinite' }} />
            Online · {LANGUAGES[selectedLang].label}
          </div>
        </div>
        <div style={{
          background: 'rgba(0,166,81,0.05)', border: '1px solid rgba(0,166,81,0.2)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden'
        }}>
          <div style={{ padding: 14, maxHeight: 220, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%', padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? 'var(--gradient-green)' : 'rgba(255,255,255,0.06)',
                  border: msg.role === 'ai' ? '1px solid rgba(0,166,81,0.25)' : 'none',
                  fontSize: 13, lineHeight: 1.6, color: 'var(--text-primary)',
                  animation: 'fadeInUp 0.3s ease'
                }}>
                  {msg.role === 'ai' && (
                    <div className="ai-badge" style={{ marginBottom: 6, fontSize: 10 }}>
                      <div className="ai-dot" />AI Sahayak
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 16px', borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(0,166,81,0.25)',
                  display: 'flex', gap: 5, alignItems: 'center'
                }}>
                  {[0, 1, 2].map(d => (
                    <div key={d} style={{
                      width: 7, height: 7, borderRadius: '50%', background: '#00A651',
                      animation: 'pulse-dot 1s infinite', animationDelay: `${d * 0.2}s`
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{ display: 'flex', gap: 8, padding: '10px 14px', borderTop: '1px solid rgba(0,166,81,0.15)' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={selectedLang === 0 ? 'यहाँ लिखें...' : selectedLang === 1 ? 'ਇੱਥੇ ਲਿਖੋ...' : selectedLang === 2 ? 'এখানে লিখুন...' : selectedLang === 3 ? 'இங்கே எழுதுங்கள்...' : 'ఇక్కడ టైప్ చేయండి...'}
              style={{
                flex: 1, padding: '10px 14px', borderRadius: 'var(--radius-full)',
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)',
                color: 'var(--text-primary)', fontSize: 13, outline: 'none', fontFamily: 'Inter, sans-serif'
              }}
            />
            <button
              id="chat-send-btn"
              className="btn btn-primary"
              onClick={handleSend}
              style={{ padding: '10px 16px', borderRadius: 'var(--radius-full)', fontSize: 13 }}
            >
              {selectedLang === 0 ? 'भेजें' : selectedLang === 1 ? 'ਭੇਜੋ' : selectedLang === 2 ? 'পাঠান' : selectedLang === 3 ? 'அனுப்பு' : 'పంపు'}
            </button>
          </div>
        </div>
      </div>

      {/* Schemes — clicking adds to chat */}
      <p className="section-title animate-fade-up">Sarkari Yojana — Tap to know more</p>
      {schemes.map((s, i) => (
        <div
          key={i}
          id={`scheme-${s.title.replace(/\s+/g, '-').toLowerCase()}`}
          className="scheme-card animate-fade-up"
          style={{ borderLeft: `3px solid ${s.color}`, animationDelay: `${i * 0.06}s`, cursor: 'pointer' }}
          onClick={() => handleSchemeClick(s)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div className="scheme-title">{s.title}</div>
              <div className="scheme-desc">{s.desc}</div>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
              {expanded === s.title ? '▲' : '▼'}
            </span>
          </div>
          <div className="scheme-benefit" style={{ color: s.color }}>{s.benefit}</div>
          {expanded === s.title && (
            <button
              className="btn btn-primary"
              style={{ marginTop: 10, padding: '8px 16px', fontSize: 13, background: s.color }}
              onClick={e => { e.stopPropagation() }}
            >
              Apply Now →
            </button>
          )}
        </div>
      ))}

      {/* Nearby */}
      <p className="section-title animate-fade-up">Paas Ke Services</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="animate-fade-up">
        {nearby.map((s, i) => (
          <div key={i} style={{
            padding: 14, background: 'var(--bg-card)', border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s'
          }}
            onClick={() => { addMessage('user', `${s.name} kahan hai?`); simulateAIReply(s.name.toLowerCase()) }}
          >
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginTop: 6 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{s.dist}</div>
            <span className={`badge ${s.open ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: 10, marginTop: 6, display: 'inline-flex' }}>
              {s.open ? 'Open' : 'Closed'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
