import { useMemo } from 'react'

const CONTENT = {
  en: {
    eyebrow: 'Step 2',
    heading: 'AI-Powered Recommendations',
    lead:
      'Your education, existing skills, work experience, interests and career goals have been analysed to suggest suitable skill development pathways.',

    profileAnalysis: 'Your Profile Analysis',

    education: 'Education',
    skills: 'Current Skills',
    experience: 'Work Experience',
    interests: 'Interests',
    careerGoal: 'Career Goal',

    notProvided: 'Not provided yet',

    recommendedSkills: 'Recommended Skills',
    missingSkills: 'Skills to Develop',
    whyRecommended: 'Why this is recommended',

    explore: 'Explore Course',

    nextHeading: 'Your Recommended Next Steps',

    nextSteps: [
      'Choose a recommended skill pathway.',
      'Start a suitable short-term training course.',
      'Practice the skills through projects or practical work.',
      'Explore employment or self-employment opportunities.',
    ],
  },

  hi: {
    eyebrow: 'चरण 2',
    heading: 'AI आधारित सिफारिशें',
    lead:
      'आपकी शिक्षा, कौशल, कार्य अनुभव, रुचियों और करियर लक्ष्य का विश्लेषण करके आपके लिए उपयुक्त कौशल विकास मार्ग सुझाए गए हैं।',

    profileAnalysis: 'आपकी प्रोफ़ाइल का विश्लेषण',

    education: 'शिक्षा',
    skills: 'वर्तमान कौशल',
    experience: 'कार्य अनुभव',
    interests: 'रुचियां',
    careerGoal: 'करियर लक्ष्य',

    notProvided: 'अभी उपलब्ध नहीं',

    recommendedSkills: 'सुझाए गए कौशल',
    missingSkills: 'विकसित करने वाले कौशल',
    whyRecommended: 'यह क्यों सुझाया गया है',

    explore: 'कोर्स देखें',

    nextHeading: 'आपके लिए अगले कदम',

    nextSteps: [
      'एक उपयुक्त कौशल मार्ग चुनें।',
      'उपयुक्त अल्पकालिक प्रशिक्षण कोर्स शुरू करें।',
      'प्रोजेक्ट और व्यावहारिक कार्यों के माध्यम से कौशल विकसित करें।',
      'रोजगार या स्वरोजगार के अवसर खोजें।',
    ],
  },

  mr: {
    eyebrow: 'पायरी 2',
    heading: 'AI आधारित शिफारसी',
    lead:
      'तुमचे शिक्षण, विद्यमान कौशल्ये, कामाचा अनुभव, आवडी आणि करिअर उद्दिष्टांचे विश्लेषण करून तुमच्यासाठी योग्य कौशल्य विकास मार्ग सुचवले आहेत.',

    profileAnalysis: 'तुमच्या प्रोफाइलचे विश्लेषण',

    education: 'शिक्षण',
    skills: 'सध्याची कौशल्ये',
    experience: 'कामाचा अनुभव',
    interests: 'आवडी',
    careerGoal: 'करिअर उद्दिष्ट',

    notProvided: 'माहिती उपलब्ध नाही',

    recommendedSkills: 'शिफारस केलेली कौशल्ये',
    missingSkills: 'विकसित करावयाची कौशल्ये',
    whyRecommended: 'ही शिफारस का केली आहे',

    explore: 'कोर्स पहा',

    nextHeading: 'तुमच्यासाठी पुढील पायऱ्या',

    nextSteps: [
      'तुमच्यासाठी योग्य कौशल्य मार्ग निवडा.',
      'योग्य अल्पकालीन प्रशिक्षण कोर्स सुरू करा.',
      'प्रकल्प आणि प्रत्यक्ष सरावातून कौशल्य विकसित करा.',
      'रोजगार किंवा स्वयंरोजगाराच्या संधी शोधा.',
    ],
  },
}


/* =====================================================
   AI RECOMMENDATION ENGINE
===================================================== */

function generateRecommendations(userData = {}, language = 'en') {
  const education = userData.education || {}
  const interestsGoals = userData.interestsGoals || {}

  const qualification =
    education.highestQualification || ''

  const skills =
    Array.isArray(education.skills)
      ? education.skills.join(' ').toLowerCase()
      : ''

  const experience =
    education.workExperience || ''

  const interests =
    Array.isArray(interestsGoals.interests)
      ? interestsGoals.interests.join(' ').toLowerCase()
      : ''

  const careerGoal =
    interestsGoals.careerGoal || ''

  const profileText = `
    ${qualification}
    ${skills}
    ${experience}
    ${interests}
    ${careerGoal}
  `.toLowerCase()


  const recommendations = []


  /* =====================================================
     AGRICULTURE
  ===================================================== */

  if (
    profileText.includes('farm') ||
    profileText.includes('agriculture') ||
    profileText.includes('agri') ||
    profileText.includes('शेती') ||
    profileText.includes('कृषी')
  ) {
    recommendations.push({
      category: 'agriculture',

      title:
        language === 'mr'
          ? 'कृषी आणि संलग्न कौशल्ये'
          : language === 'hi'
          ? 'कृषि और संबद्ध कौशल'
          : 'Agriculture & Allied Skills',

      description:
        language === 'mr'
          ? 'आधुनिक शेती, सेंद्रिय शेती, दुग्धव्यवसाय, कुक्कुटपालन आणि कृषी व्यवसायाशी संबंधित कौशल्ये विकसित करा.'
          : language === 'hi'
          ? 'आधुनिक खेती, जैविक खेती, डेयरी, पोल्ट्री और कृषि व्यवसाय से संबंधित कौशल विकसित करें।'
          : 'Develop skills in modern farming, organic agriculture, dairy, poultry and agri-business.',

      skills:
        language === 'mr'
          ? [
              'आधुनिक शेती',
              'सेंद्रिय शेती',
              'दुग्धव्यवसाय',
              'कृषी व्यवसाय',
            ]
          : language === 'hi'
          ? [
              'आधुनिक खेती',
              'जैविक खेती',
              'डेयरी',
              'कृषि व्यवसाय',
            ]
          : [
              'Modern Farming',
              'Organic Farming',
              'Dairy Management',
              'Agri-Business',
            ],

      missingSkills:
        language === 'mr'
          ? [
              'कृषी तंत्रज्ञान',
              'पाणी व्यवस्थापन',
              'बाजारपेठ व्यवस्थापन',
            ]
          : language === 'hi'
          ? [
              'कृषि तकनीक',
              'जल प्रबंधन',
              'बाजार प्रबंधन',
            ]
          : [
              'Agriculture Technology',
              'Water Management',
              'Market Management',
            ],

      reason:
        language === 'mr'
          ? 'तुमच्या आवडी आणि ग्रामीण उपजीविका संधींशी हे कौशल्य क्षेत्र जुळते.'
          : language === 'hi'
          ? 'यह कौशल क्षेत्र आपकी रुचियों और ग्रामीण आजीविका के अवसरों से मेल खाता है।'
          : 'This pathway matches your interests and provides strong rural livelihood opportunities.',
    })
  }


  /* =====================================================
     DIGITAL / COMPUTER
  ===================================================== */

  if (
    profileText.includes('computer') ||
    profileText.includes('digital') ||
    profileText.includes('technology') ||
    profileText.includes('office') ||
    profileText.includes('computer skill') ||
    recommendations.length === 0
  ) {
    recommendations.push({
      category: 'digital',

      title:
        language === 'mr'
          ? 'डिजिटल आणि संगणक कौशल्ये'
          : language === 'hi'
          ? 'डिजिटल और कंप्यूटर कौशल'
          : 'Digital & Computer Skills',

      description:
        language === 'mr'
          ? 'संगणक वापर, MS Office, इंटरनेट, डिजिटल सेवा आणि ऑनलाइन प्लॅटफॉर्मचा प्रभावी वापर शिका.'
          : language === 'hi'
          ? 'कंप्यूटर उपयोग, MS Office, इंटरनेट, डिजिटल सेवाओं और ऑनलाइन प्लेटफॉर्म का प्रभावी उपयोग सीखें।'
          : 'Learn computer operations, MS Office, internet usage, digital services and online platforms.',

      skills:
        language === 'mr'
          ? [
              'संगणक मूलतत्त्वे',
              'MS Office',
              'इंटरनेट वापर',
              'डिजिटल सेवा',
            ]
          : language === 'hi'
          ? [
              'कंप्यूटर मूल बातें',
              'MS Office',
              'इंटरनेट उपयोग',
              'डिजिटल सेवाएं',
            ]
          : [
              'Computer Basics',
              'MS Office',
              'Internet Skills',
              'Digital Services',
            ],

      missingSkills:
        language === 'mr'
          ? [
              'MS Excel',
              'ई-मेल संवाद',
              'डिजिटल पेमेंट',
            ]
          : language === 'hi'
          ? [
              'MS Excel',
              'ई-मेल संचार',
              'डिजिटल भुगतान',
            ]
          : [
              'MS Excel',
              'Email Communication',
              'Digital Payments',
            ],

      reason:
        language === 'mr'
          ? 'डिजिटल कौशल्ये रोजगार, सरकारी सेवा आणि स्वयंरोजगाराच्या संधी वाढवतात.'
          : language === 'hi'
          ? 'डिजिटल कौशल रोजगार, सरकारी सेवाओं और स्वरोजगार के अवसरों को बढ़ाते हैं।'
          : 'Digital skills improve access to employment, government services and self-employment opportunities.',
    })
  }


  /* =====================================================
     BUSINESS / ENTREPRENEURSHIP
  ===================================================== */

  if (
    profileText.includes('business') ||
    profileText.includes('self employment') ||
    profileText.includes('entrepreneur') ||
    profileText.includes('business owner') ||
    profileText.includes('स्वयंरोजगार') ||
    profileText.includes('व्यवसाय') ||
    profileText.includes('उद्योजक') ||
    recommendations.length < 2
  ) {
    recommendations.push({
      category: 'business',

      title:
        language === 'mr'
          ? 'उद्योजकता आणि स्वयंरोजगार'
          : language === 'hi'
          ? 'उद्यमिता और स्वरोजगार'
          : 'Entrepreneurship & Self-Employment',

      description:
        language === 'mr'
          ? 'लघुउद्योग सुरू करणे, ग्राहक व्यवस्थापन, आर्थिक नियोजन आणि डिजिटल मार्केटिंगची कौशल्ये विकसित करा.'
          : language === 'hi'
          ? 'छोटा व्यवसाय शुरू करने, ग्राहक प्रबंधन, वित्तीय योजना और डिजिटल मार्केटिंग के कौशल विकसित करें।'
          : 'Develop skills for starting small businesses, customer management, financial planning and digital marketing.',

      skills:
        language === 'mr'
          ? [
              'व्यवसाय नियोजन',
              'ग्राहक व्यवस्थापन',
              'आर्थिक व्यवस्थापन',
              'डिजिटल मार्केटिंग',
            ]
          : language === 'hi'
          ? [
              'व्यवसाय योजना',
              'ग्राहक प्रबंधन',
              'वित्तीय प्रबंधन',
              'डिजिटल मार्केटिंग',
            ]
          : [
              'Business Planning',
              'Customer Management',
              'Financial Management',
              'Digital Marketing',
            ],

      missingSkills:
        language === 'mr'
          ? [
              'व्यवसाय योजना तयार करणे',
              'बजेट व्यवस्थापन',
              'ऑनलाइन मार्केटिंग',
            ]
          : language === 'hi'
          ? [
              'बिजनेस प्लान बनाना',
              'बजट प्रबंधन',
              'ऑनलाइन मार्केटिंग',
            ]
          : [
              'Business Plan Creation',
              'Budget Management',
              'Online Marketing',
            ],

      reason:
        language === 'mr'
          ? 'तुमच्या करिअर उद्दिष्टांमध्ये स्वयंरोजगार किंवा आर्थिक स्वावलंबनाची शक्यता दिसते.'
          : language === 'hi'
          ? 'आपके करियर लक्ष्यों में स्वरोजगार और आर्थिक स्वतंत्रता की संभावना दिखाई देती है।'
          : 'This pathway supports career goals related to self-employment and financial independence.',
    })
  }


  /* =====================================================
     SERVICE / CUSTOMER SUPPORT
  ===================================================== */

  if (
    recommendations.length < 3
  ) {
    recommendations.push({
      category: 'services',

      title:
        language === 'mr'
          ? 'सेवा आणि रोजगार कौशल्ये'
          : language === 'hi'
          ? 'सेवा और रोजगार कौशल'
          : 'Service & Employability Skills',

      description:
        language === 'mr'
          ? 'संवाद कौशल्य, ग्राहक सेवा, वेळ व्यवस्थापन आणि व्यावसायिक कार्यपद्धती विकसित करा.'
          : language === 'hi'
          ? 'संचार कौशल, ग्राहक सेवा, समय प्रबंधन और पेशेवर कार्य कौशल विकसित करें।'
          : 'Develop communication, customer service, time management and professional workplace skills.',

      skills:
        language === 'mr'
          ? [
              'संवाद कौशल्य',
              'ग्राहक सेवा',
              'वेळ व्यवस्थापन',
              'टीमवर्क',
            ]
          : language === 'hi'
          ? [
              'संचार कौशल',
              'ग्राहक सेवा',
              'समय प्रबंधन',
              'टीमवर्क',
            ]
          : [
              'Communication',
              'Customer Service',
              'Time Management',
              'Teamwork',
            ],

      missingSkills:
        language === 'mr'
          ? [
              'व्यावसायिक संवाद',
              'मुलाखत कौशल्य',
              'टीमवर्क',
            ]
          : language === 'hi'
          ? [
              'पेशेवर संचार',
              'इंटरव्यू कौशल',
              'टीमवर्क',
            ]
          : [
              'Professional Communication',
              'Interview Skills',
              'Teamwork',
            ],

      reason:
        language === 'mr'
          ? 'ही कौशल्ये विविध क्षेत्रांमध्ये रोजगार मिळवण्याची क्षमता वाढवतात.'
          : language === 'hi'
          ? 'ये कौशल विभिन्न क्षेत्रों में रोजगार प्राप्त करने की क्षमता बढ़ाते हैं।'
          : 'These skills improve employability across multiple job sectors.',
    })
  }


  /*
    Minimum 2 recommendations guarantee
  */

  return recommendations.slice(0, 3)
}


/* =====================================================
   MAIN COMPONENT
===================================================== */

function Recommendations({
  language = 'en',
  userData = {},
}) {
  const copy = CONTENT[language] || CONTENT.en


  const recommendations = useMemo(() => {
    return generateRecommendations(userData, language)
  }, [userData, language])


  const education = userData.education || {}
  const interestsGoals = userData.interestsGoals || {}


  const qualification =
    education.highestQualification ||
    copy.notProvided


  const skills =
    Array.isArray(education.skills) &&
    education.skills.length > 0
      ? education.skills.join(', ')
      : copy.notProvided


  const experience =
    education.workExperience ||
    copy.notProvided


  const interests =
    Array.isArray(interestsGoals.interests) &&
    interestsGoals.interests.length > 0
      ? interestsGoals.interests.join(', ')
      : copy.notProvided


  const careerGoal =
    interestsGoals.careerGoal ||
    copy.notProvided


  return (
    <section className="page recommendations-page">

      {/* HEADER */}

      <div className="page-header">
        <p className="eyebrow">
          {copy.eyebrow}
        </p>

        <h1>
          {copy.heading}
        </h1>

        <p className="lead">
          {copy.lead}
        </p>
      </div>


      {/* PROFILE ANALYSIS */}

      <div className="card profile-analysis-card">

        <h2>
          {copy.profileAnalysis}
        </h2>


        <div className="profile-analysis-grid">

          <div className="analysis-item">
            <span className="analysis-label">
              {copy.education}
            </span>

            <strong className="analysis-value">
              {qualification}
            </strong>
          </div>


          <div className="analysis-item">
            <span className="analysis-label">
              {copy.skills}
            </span>

            <strong className="analysis-value">
              {skills}
            </strong>
          </div>


          <div className="analysis-item">
            <span className="analysis-label">
              {copy.experience}
            </span>

            <strong className="analysis-value">
              {experience}
            </strong>
          </div>


          <div className="analysis-item">
            <span className="analysis-label">
              {copy.interests}
            </span>

            <strong className="analysis-value">
              {interests}
            </strong>
          </div>


          <div className="analysis-item">
            <span className="analysis-label">
              {copy.careerGoal}
            </span>

            <strong className="analysis-value">
              {careerGoal}
            </strong>
          </div>

        </div>

      </div>


      {/* RECOMMENDATIONS */}

      <div className="recommendations-grid">

        {recommendations.map((item, index) => (

          <article
            className="card recommendation-card"
            key={item.category}
          >

            {/* NUMBER */}

            <div className="recommendation-number">
              {index + 1}
            </div>


            {/* TITLE */}

            <h2>
              {item.title}
            </h2>


            {/* DESCRIPTION */}

            <p>
              {item.description}
            </p>


            {/* RECOMMENDED SKILLS */}

            <div className="skill-gap-section">

              <h3>
                {copy.recommendedSkills}
              </h3>


              <div className="skill-tags">

                {item.skills.map((skill) => (

                  <span
                    className="skill-tag"
                    key={skill}
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>


            {/* MISSING SKILLS */}

            <div className="skill-gap-section">

              <h3>
                {copy.missingSkills}
              </h3>


              <div className="skill-tags">

                {item.missingSkills.map((skill) => (

                  <span
                    className="skill-tag"
                    key={skill}
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>


            {/* WHY */}

            <div className="recommendation-reason">

              <h3>
                {copy.whyRecommended}
              </h3>

              <p>
                {item.reason}
              </p>

            </div>


            {/* BUTTON */}

            <button
              type="button"
              className="btn btn-primary"
            >
              {copy.explore}
            </button>

          </article>

        ))}

      </div>


      {/* NEXT STEPS */}

      <div className="card next-step-card">

        <h2>
          {copy.nextHeading}
        </h2>


        <ul>

          {copy.nextSteps.map((step) => (

            <li key={step}>
              {step}
            </li>

          ))}

        </ul>

      </div>

    </section>
  )
}


export default Recommendations