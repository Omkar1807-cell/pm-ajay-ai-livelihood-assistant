import { useEffect, useRef, useState } from 'react'
import ChatMessage from '../components/ChatMessage.jsx'

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिंदी' },
  { id: 'mr', label: 'मराठी' },
]

const TOTAL_STEPS = 5

const COPY = {
  en: {
    eyebrow: 'Step 1',
    heading: 'AI Livelihood Assessment',
    lead: 'Answer a few questions in this chat. Your replies stay on this device for the MVP demo.',
    languageLabel: 'Select language',
    progressLabel: 'Assessment progress',
    progressText: (current, total) => `Question ${Math.min(current + 1, total)} of ${total}`,
    completeText: 'Assessment answers collected',
    composerLabel: 'Your reply',
    placeholder: 'Type your answer…',
    send: 'Send',
    aiName: 'PM-AJAY Saathi',
    userName: 'You',
    typing: 'Saathi is typing…',
    greeting:
      'Hello! I am PM-AJAY Saathi. I will help you discover suitable skills and livelihood opportunities. Let\'s begin. What is your highest level of education?',
    followUps: [
      'Thank you. What skills or work experience do you already have?',
      'Noted. Which type of work interests you most, such as farming, crafts, services, or trades?',
      'Understood. Which district or local area do you live in?',
      'Thank you. Would you prefer wage employment, self-employment, or skill training first?',
      'Thank you for sharing. I have enough information to suggest skills and livelihood pathways. You may continue, or open Recommendations when you are ready.',
    ],
    extraReply:
      'Thank you. I have noted that as well. You can add more detail, or visit Recommendations to see suggested pathways.',
  },
  hi: {
    eyebrow: 'चरण 1',
    heading: 'AI Livelihood Assessment',
    lead: 'इस बातचीत में कुछ प्रश्नों के उत्तर दें। MVP डेमो में आपके उत्तर इसी डिवाइस पर रहते हैं।',
    languageLabel: 'भाषा चुनें',
    progressLabel: 'आकलन प्रगति',
    progressText: (current, total) => `प्रश्न ${Math.min(current + 1, total)} / ${total}`,
    completeText: 'आकलन के उत्तर एकत्र हो गए हैं',
    composerLabel: 'आपका उत्तर',
    placeholder: 'अपना उत्तर लिखें…',
    send: 'भेजें',
    aiName: 'PM-AJAY साथी',
    userName: 'आप',
    typing: 'साथी लिख रहे हैं…',
    greeting:
      'नमस्ते! मैं PM-AJAY साथी हूँ। मैं आपको उपयुक्त कौशल और आजीविका के अवसर खोजने में मदद करूँगा। चलिए शुरू करते हैं। आपकी शिक्षा का उच्चतम स्तर क्या है?',
    followUps: [
      'धन्यवाद। आपके पास कौन से कौशल या कार्य अनुभव हैं?',
      'समझ गया। आपको किस तरह का काम अधिक रुचिकर लगता है, जैसे कृषि, शिल्प, सेवाएँ या व्यवसाय?',
      'ठीक है। आप किस जिले या क्षेत्र में रहते हैं?',
      'धन्यवाद। क्या आप पहले वेतन रोजगार, स्वरोजगार, या कौशल प्रशिक्षण चाहेंगे?',
      'जानकारी साझा करने के लिए धन्यवाद। कौशल और आजीविका सुझाव देने के लिए यह पर्याप्त है। आप और बता सकते हैं, या Recommendations पर जा सकते हैं।',
    ],
    extraReply:
      'धन्यवाद, यह भी नोट कर लिया गया है। आप और विवरण जोड़ सकते हैं, या सुझाव देखने के लिए Recommendations खोल सकते हैं।',
  },
  mr: {
    eyebrow: 'पायरी 1',
    heading: 'AI Livelihood Assessment',
    lead: 'या गपाट्यात काही प्रश्नांची उत्तरे द्या. MVP डेमोमध्ये तुमची उत्तरे या उपकरणावरच राहतात.',
    languageLabel: 'भाषा निवडा',
    progressLabel: 'मूल्यांकन प्रगती',
    progressText: (current, total) => `प्रश्न ${Math.min(current + 1, total)} / ${total}`,
    completeText: 'मूल्यांकनाची उत्तरे जमा झाली आहेत',
    composerLabel: 'तुमचे उत्तर',
    placeholder: 'तुमचे उत्तर लिहा…',
    send: 'पाठवा',
    aiName: 'PM-AJAY साथी',
    userName: 'तुम्ही',
    typing: 'साथी लिहीत आहे…',
    greeting:
      'नमस्कार! मी PM-AJAY साथी आहे. मी तुम्हाला योग्य कौशल्ये आणि उपजीविका संधी शोधण्यात मदत करेन. चला सुरुवात करूया. तुमची सर्वाधिक शैक्षणिक पातळी काय आहे?',
    followUps: [
      'धन्यवाद. तुमच्याकडे कोणती कौशल्ये किंवा कामाचा अनुभव आहे?',
      'समजले. शेती, हस्तकला, सेवा किंवा व्यवसाय यापैकी कोणते काम तुम्हाला अधिक आवडते?',
      'ठीक आहे. तुम्ही कोणत्या जिल्ह्यात किंवा परिसरात राहता?',
      'धन्यवाद. तुम्हाला प्रथम वेतन रोजगार, स्वयंरोजगार किंवा कौशल्य प्रशिक्षण हवे आहे का?',
      'माहिती दिल्याबद्दल धन्यवाद. कौशल्य आणि उपजीविका सुचवण्यासाठी ही पुरेशी आहे. तुम्ही आणखी सांगू शकता, किंवा Recommendations पाहू शकता.',
    ],
    extraReply:
      'धन्यवाद, हेही नोंदवले आहे. तुम्ही अधिक तपशील देऊ शकता, किंवा Suggestions पाहण्यासाठी Recommendations उघडू शकता.',
  },
}

function createGreeting(language) {
  return {
    id: 'ai-greeting',
    role: 'ai',
    text: COPY[language].greeting,
  }
}

function getMockReply(language, userAnswerCount) {
  const copy = COPY[language]
  const index = userAnswerCount - 1
  if (index >= 0 && index < copy.followUps.length) {
    return copy.followUps[index]
  }
  return copy.extraReply
}


function Assessment({ language, setLanguage }) {
  const [input, setInput] = useState('')
  const [isReplying, setIsReplying] = useState(false)
  const [messages, setMessages] = useState(() => [createGreeting('en')])
  const logRef = useRef(null)
  const replyTimer = useRef(null)
  const recognitionRef = useRef(null)
  const [isListening, setIsListening] = useState(false)
  const copy = COPY[language]
  const userTurns = messages.filter((message) => message.role === 'user').length
  const progress = Math.min(100, Math.round((userTurns / TOTAL_STEPS) * 100))
  const progressLabel =
    userTurns >= TOTAL_STEPS
      ? copy.completeText
      : copy.progressText(userTurns, TOTAL_STEPS)

  useEffect(() => {
    const log = logRef.current
    if (log) {
      log.scrollTop = log.scrollHeight
    }
  }, [messages, isReplying])

  useEffect(() => {
    return () => {
      if (replyTimer.current) {
        window.clearTimeout(replyTimer.current)
      }
  
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  function handleLanguageChange(nextLanguage) {
    setLanguage(nextLanguage)
    setMessages((current) => {
      const hasUserMessage = current.some((message) => message.role === 'user')
      if (hasUserMessage) {
        return current
      }
      return [createGreeting(nextLanguage)]
    })
  }
  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
  
    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser.')
      return
    }
  
    const recognition = new SpeechRecognition()
  
    recognition.lang =
      language === 'mr'
        ? 'mr-IN'
        : language === 'hi'
        ? 'hi-IN'
        : 'en-IN'
  
    recognition.continuous = false
    recognition.interimResults = false
  
    recognition.onstart = () => {
      setIsListening(true)
    }
  
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript
      setInput(spokenText)
    }
  
    recognition.onerror = () => {
      setIsListening(false)
    }
  
    recognition.onend = () => {
      setIsListening(false)
    }
  
    recognitionRef.current = recognition
    recognition.start()
  }
  function sendMessage() {
    const text = input.trim()
    if (!text || isReplying) {
      return
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
    }

    setInput('')
    setIsReplying(true)
    setMessages((current) => [...current, userMessage])

    const nextCount = userTurns + 1
    const replyLanguage = language

    replyTimer.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `ai-${Date.now()}`,
          role: 'ai',
          text: getMockReply(replyLanguage, nextCount),
        },
      ])
      setIsReplying(false)
    }, 450)
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage()
  }

  return (
    <section className="page assessment-page">
      <div className="page-header assessment-header">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.heading}</h1>
        <p className="lead">{copy.lead}</p>
      </div>

      <div className="assessment-toolbar">
        <div className="language-block assessment-languages">
          <p className="language-label" id="assessment-language-label">
            {copy.languageLabel}
          </p>
          <div
            className="language-row"
            role="group"
            aria-labelledby="assessment-language-label"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                type="button"
                className={
                  language === lang.id
                    ? 'btn btn-language active'
                    : 'btn btn-language'
                }
                aria-pressed={language === lang.id}
                onClick={() => handleLanguageChange(lang.id)}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <div className="progress-block">
          <div className="progress-meta">
            <span id="assessment-progress-label">{copy.progressLabel}</span>
            <span>{progressLabel}</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-labelledby="assessment-progress-label"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="card chat-panel">
        <div
          className="chat-log"
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label={copy.heading}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              senderLabel={message.role === 'ai' ? copy.aiName : copy.userName}
              text={message.text}
            />
          ))}
          {isReplying ? (
            <p className="chat-typing" aria-live="polite">
              {copy.typing}
            </p>
          ) : null}
        </div>

        <form className="chat-composer" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="assessment-reply">
            {copy.composerLabel}
          </label>
          <input
            id="assessment-reply"
            className="chat-input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={copy.placeholder}
            autoComplete="off"
            disabled={isReplying}
          />
          <button
  type="button"
  className={isListening ? 'btn btn-mic listening' : 'btn btn-mic'}
  onClick={startListening}
  disabled={isReplying}
  aria-label="Voice input"
>
  🎤
</button>
          <button
            type="submit"
            className="btn btn-primary btn-send"
            disabled={isReplying || !input.trim()}
          >
            {copy.send}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Assessment
