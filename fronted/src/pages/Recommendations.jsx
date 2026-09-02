const CONTENT = {
  en: {
    eyebrow: 'Step 2',
    heading: 'Your Recommendations',
    lead:
      'Based on your assessment, these skills and livelihood pathways may be suitable for you.',

    recommendations: [
      {
        title: 'Digital & Computer Skills',
        description:
          'Basic computer operation, MS Office, digital payments and online services.',
      },
      {
        title: 'Skill Development Training',
        description:
          'Join short-term practical training programmes to improve employability.',
      },
      {
        title: 'Self-Employment Opportunities',
        description:
          'Explore small business, local services and entrepreneurship opportunities.',
      },
    ],

    button: 'Explore Opportunity',
    nextHeading: 'What you can do next',
    nextSteps: [
      'Explore available skill training programmes.',
      'Identify suitable livelihood opportunities.',
      'Connect with local support and training centres.',
    ],
  },

  hi: {
    eyebrow: 'चरण 2',
    heading: 'आपकी सिफारिशें',
    lead:
      'आपके मूल्यांकन के आधार पर, ये कौशल और आजीविका के मार्ग आपके लिए उपयुक्त हो सकते हैं।',

    recommendations: [
      {
        title: 'डिजिटल और कंप्यूटर कौशल',
        description:
          'बुनियादी कंप्यूटर संचालन, एमएस ऑफिस, डिजिटल भुगतान और ऑनलाइन सेवाएँ।',
      },
      {
        title: 'कौशल विकास प्रशिक्षण',
        description:
          'रोजगार क्षमता बढ़ाने के लिए अल्पकालिक व्यावहारिक प्रशिक्षण कार्यक्रमों में शामिल हों।',
      },
      {
        title: 'स्वरोजगार के अवसर',
        description:
          'छोटे व्यवसाय, स्थानीय सेवाओं और उद्यमिता के अवसरों का पता लगाएँ।',
      },
    ],

    button: 'अवसर देखें',
    nextHeading: 'आप आगे क्या कर सकते हैं',
    nextSteps: [
      'उपलब्ध कौशल प्रशिक्षण कार्यक्रमों की जानकारी लें।',
      'उपयुक्त आजीविका के अवसरों की पहचान करें।',
      'स्थानीय सहायता और प्रशिक्षण केंद्रों से जुड़ें।',
    ],
  },

  mr: {
    eyebrow: 'पायरी 2',
    heading: 'तुमच्यासाठी शिफारसी',
    lead:
      'तुमच्या मूल्यांकनाच्या आधारे, ही कौशल्ये आणि उपजीविकेचे मार्ग तुमच्यासाठी उपयुक्त ठरू शकतात.',

    recommendations: [
      {
        title: 'डिजिटल आणि संगणक कौशल्ये',
        description:
          'मूलभूत संगणक वापर, एमएस ऑफिस, डिजिटल पेमेंट आणि ऑनलाइन सेवा.',
      },
      {
        title: 'कौशल्य विकास प्रशिक्षण',
        description:
          'रोजगार क्षमता वाढवण्यासाठी अल्पकालीन व्यावहारिक प्रशिक्षण कार्यक्रमात सहभागी व्हा.',
      },
      {
        title: 'स्वयंरोजगाराच्या संधी',
        description:
          'लघुउद्योग, स्थानिक सेवा आणि उद्योजकतेच्या संधी शोधा.',
      },
    ],

    button: 'संधी पहा',
    nextHeading: 'पुढे तुम्ही काय करू शकता',
    nextSteps: [
      'उपलब्ध कौशल्य प्रशिक्षण कार्यक्रम शोधा.',
      'योग्य उपजीविकेच्या संधी ओळखा.',
      'स्थानिक सहाय्य आणि प्रशिक्षण केंद्रांशी संपर्क साधा.',
    ],
  },
}

function Recommendations({ language }) {
  const copy = CONTENT[language]

  return (
    <section className="page">
      <div className="page-header">
        <p className="eyebrow">{copy.eyebrow}</p>

        <h1>{copy.heading}</h1>

        <p className="lead">{copy.lead}</p>
      </div>

      <div className="recommendations-grid">
        {copy.recommendations.map((item) => (
          <article className="card recommendation-card" key={item.title}>
            <h2>{item.title}</h2>

            <p>{item.description}</p>

            <button className="btn btn-primary">
              {copy.button}
            </button>
          </article>
        ))}
      </div>

      <div className="card next-step-card">
        <h2>{copy.nextHeading}</h2>

        <ul>
          {copy.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Recommendations