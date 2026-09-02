const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिंदी' },
  { id: 'mr', label: 'मराठी' },
]

const COPY = {
  en: {
    eyebrow: 'PM-AJAY · Skill & Livelihood Support',
    heading: 'Discover Your Skills. Build Your Future.',
    lead:
      'PM-AJAY Saathi helps beneficiaries discover suitable skills, training pathways and livelihood opportunities using AI. Answer a short assessment to receive personalised guidance aligned with government schemes and local opportunities.',
    start: 'Start Assessment',
    languageLabel: 'Select language',

    skillTitle: 'Skill discovery',
    skillText:
      'Identify strengths and interests that match practical training and livelihood options.',

    trainingTitle: 'Training pathways',
    trainingText:
      'See recommended courses and next steps that fit your background and location.',

    livelihoodTitle: 'Livelihood options',
    livelihoodText:
      'Explore self-employment and wage opportunities linked to PM-AJAY support.',
  },

  hi: {
    eyebrow: 'PM-AJAY · कौशल और आजीविका सहायता',
    heading: 'अपने कौशल खोजें। अपना भविष्य बनाएं।',
    lead:
      'PM-AJAY साथी लाभार्थियों को AI की सहायता से उपयुक्त कौशल, प्रशिक्षण मार्ग और आजीविका के अवसर खोजने में मदद करता है। एक छोटा आकलन पूरा करें और सरकारी योजनाओं तथा स्थानीय अवसरों के अनुसार व्यक्तिगत मार्गदर्शन प्राप्त करें।',
    start: 'आकलन शुरू करें',
    languageLabel: 'भाषा चुनें',

    skillTitle: 'कौशल खोज',
    skillText:
      'अपनी क्षमताओं और रुचियों को पहचानें जो व्यावहारिक प्रशिक्षण और आजीविका विकल्पों से मेल खाती हैं।',

    trainingTitle: 'प्रशिक्षण के मार्ग',
    trainingText:
      'अपनी पृष्ठभूमि और स्थान के अनुसार अनुशंसित पाठ्यक्रम और अगले कदम देखें।',

    livelihoodTitle: 'आजीविका के विकल्प',
    livelihoodText:
      'PM-AJAY सहायता से जुड़े स्वरोजगार और रोजगार के अवसरों का पता लगाएं।',
  },

  mr: {
    eyebrow: 'PM-AJAY · कौशल्य आणि उपजीविका सहाय्य',
    heading: 'तुमची कौशल्ये शोधा. तुमचे भविष्य घडवा.',
    lead:
      'PM-AJAY साथी लाभार्थ्यांना AI च्या मदतीने योग्य कौशल्ये, प्रशिक्षणाचे मार्ग आणि उपजीविकेच्या संधी शोधण्यात मदत करतो. एक छोटा आढावा पूर्ण करा आणि सरकारी योजना व स्थानिक संधींनुसार वैयक्तिक मार्गदर्शन मिळवा.',
    start: 'मूल्यांकन सुरू करा',
    languageLabel: 'भाषा निवडा',

    skillTitle: 'कौशल्य शोध',
    skillText:
      'तुमच्या क्षमता आणि आवडी ओळखा ज्या व्यावहारिक प्रशिक्षण आणि उपजीविका पर्यायांशी जुळतात.',

    trainingTitle: 'प्रशिक्षणाचे मार्ग',
    trainingText:
      'तुमच्या पार्श्वभूमी आणि स्थानानुसार शिफारस केलेले अभ्यासक्रम आणि पुढील पायऱ्या पहा.',

    livelihoodTitle: 'उपजीविकेचे पर्याय',
    livelihoodText:
      'PM-AJAY सहाय्याशी संबंधित स्वयंरोजगार आणि नोकरीच्या संधी शोधा.',
  },
}

function Home({ onNavigate, language, setLanguage }) {
  const copy = COPY[language]

  return (
    <section className="page home-page">
      <div className="hero-card card">
        <p className="eyebrow">{copy.eyebrow}</p>

        <h1>{copy.heading}</h1>

        <p className="lead">{copy.lead}</p>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onNavigate('assessment')}
        >
          {copy.start}
        </button>

        <div className="language-block">
          <p className="language-label">{copy.languageLabel}</p>

          <div className="language-row" role="group" aria-label="Language">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                type="button"
                className={
                  language === lang.id
                    ? 'btn btn-language active'
                    : 'btn btn-language'
                }
                onClick={() => setLanguage(lang.id)}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="info-grid">
        <article className="card info-card">
          <h2>{copy.skillTitle}</h2>
          <p>{copy.skillText}</p>
        </article>

        <article className="card info-card">
          <h2>{copy.trainingTitle}</h2>
          <p>{copy.trainingText}</p>
        </article>

        <article className="card info-card">
          <h2>{copy.livelihoodTitle}</h2>
          <p>{copy.livelihoodText}</p>
        </article>
      </div>
    </section>
  )
}

export default Home