// src/lib/memories.js
// Single source of truth for all sample memory data
// Replace / extend with real DB data when backend is ready

export const MEMORIES = [

  // ─── 1 ───────────────────────────────────────────────────────────────────
  {
    id: 'rahul-1mar',
    name: 'Rahul M.',
    date: '1 Mar 2026',
    location: 'Delhi, India',
    centre: 'Pearson VUE, Connaught Pl.',
    score: 79,
    avatarGradient: 'linear-gradient(135deg,#4F46E5,#818CF8)',
    frequency: 6,
    frequencyRange: 'Dec 2025–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'sp',
        preview: 'Read Aloud · Retell Lecture · Describe Image',
        questions: [
          {
            type: 'Read Aloud',
            content: 'Coral reef restoration and ocean temperature impacts. About 60 words, academic tone. Difficult word: "calcification".',
            tip: 'Pause at commas, don\'t rush. Steady rhythm — mic picks up hesitations.',
          },
          {
            type: 'Retell Lecture',
            content: 'Habit formation and behavioral psychology. Pavlov\'s conditioning, reward loops in apps. Diagram: cue → routine → reward. British accent, medium pace.',
            tip: 'Start: "The lecture discussed how habits form through..." Reference the diagram.',
          },
          {
            type: 'Describe Image',
            content: 'Double bar chart — renewable energy (solar vs wind) across 6 countries, 2010 vs 2022. Germany highest. Clear upward trend overall.',
            tip: 'Template: "The chart shows... Overall... Highest... In conclusion..."',
          },
        ],
      },
      {
        key: 'wr',
        preview: 'Write Essay · Summarize Written Text',
        questions: [
          {
            type: 'Write Essay',
            content: '"Should governments prioritize funding for arts or practical sciences?" — Agree/disagree. Keywords: creative economy, innovation, cultural identity.',
            tip: '4-para: Intro → Stance → Counter → Conclusion. Don\'t skip the counter.',
          },
          {
            type: 'Summarize Written Text',
            content: 'Remote work\'s impact on urban real estate — reduced office demand, rising suburban prices post-pandemic.',
            tip: 'One sentence, under 75 words. Use "which", "that", "due to".',
          },
        ],
      },
    ],
  },

  // ─── 2 ───────────────────────────────────────────────────────────────────
  {
    id: 'priya-27feb',
    name: 'Priya S.',
    date: '27 Feb 2026',
    location: 'Melbourne, Australia',
    centre: 'Pearson VUE, CBD',
    score: 86,
    avatarGradient: 'linear-gradient(135deg,#059669,#34D399)',
    frequency: 9,
    frequencyRange: 'Jan–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'li',
        preview: 'WFD × 3 · Summarize Spoken Text · Highlight Summary',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The government has introduced new regulations to reduce carbon emissions.',
              'Access to clean water remains a significant challenge in developing nations.',
              'Researchers found a strong link between diet and long-term cognitive health.',
            ],
            tip: 'Played once. Even 70%+ accuracy earns partial marks.',
          },
          {
            type: 'Summarize Spoken Text',
            content: 'Circular economy — reducing industrial waste by redesigning supply chains. Key point: many companies already saving costs. Australian accent, clear pace.',
            tip: '50–70 words. Main idea + 2 supporting points. Connect ideas, don\'t just list.',
          },
          {
            type: 'Highlight Correct Summary',
            content: 'AI ethics audio. Wrong option said "replaces human judgment entirely". Correct: "raises concerns about human oversight".',
            tip: '"Entirely", "always", "completely" = wrong. Measured language = right.',
          },
        ],
      },
      {
        key: 'rd',
        preview: 'R&W FIB × 2 · MCQ Single · Reorder',
        questions: [
          {
            type: 'R&W Fill in the Blanks',
            content: 'Climate policy and carbon markets. Blank words: "offset", "mandatory", "compliance", "threshold". About 220 words.',
            tip: 'Check word form — noun vs adjective vs verb matters.',
          },
          {
            type: 'MCQ — Single Answer',
            content: 'Passage on quantum computing limitations. Q: "What is the biggest barrier to adoption?" A: cost of error correction systems.',
          },
          {
            type: 'Reorder Paragraphs',
            content: 'History of the internet — ARPANET to World Wide Web. 4 paragraphs. Opener: "This network, originally developed for military use..."',
            tip: '"This" and "these" always refer to the previous paragraph.',
          },
        ],
      },
    ],
  },

  // ─── 3 ───────────────────────────────────────────────────────────────────
  {
    id: 'arjun-22feb',
    name: 'Arjun K.',
    date: '22 Feb 2026',
    location: 'London, UK',
    centre: 'Pearson VUE, Holborn',
    score: 73,
    avatarGradient: 'linear-gradient(135deg,#F59E0B,#FCD34D)',
    frequency: 5,
    frequencyRange: 'Jan–Mar 2026',
    priority: 'medium',
    sections: [
      {
        key: 'sp',
        preview: 'Read Aloud × 2 · Describe Image × 2',
        questions: [
          {
            type: 'Read Aloud',
            content: 'First: urban planning and smart cities (~55 words). Second: history of the printing press and its impact on literacy rates (~65 words, more complex).',
            tip: 'For longer passages, break into 3-second mental chunks before you start.',
          },
          {
            type: 'Describe Image',
            content: 'Pie chart — global energy sources (fossil fuels 78%, renewables 15%, nuclear 7%). Process diagram: water treatment cycle with 5 stages.',
            tip: 'Process diagrams: describe each stage in sequence. Use "first", "then", "finally".',
          },
        ],
      },
      {
        key: 'wr',
        preview: 'Write Essay · Summarize Written Text',
        questions: [
          {
            type: 'Write Essay',
            content: '"Some people believe technology has made human relationships more superficial. To what extent do you agree?" Academic register, balanced argument needed.',
            tip: '"To what extent" = give your position clearly, then qualify. Don\'t sit on the fence.',
          },
          {
            type: 'Summarize Written Text',
            content: 'Economic and cultural significance of street food markets in Southeast Asian cities.',
            tip: 'Include both economic AND cultural angle — both were in the passage.',
          },
        ],
      },
      {
        key: 'rd',
        preview: 'Reorder · MCQ Multiple',
        questions: [
          {
            type: 'Reorder Paragraphs',
            content: 'Economics of coffee production — farm to consumer. 5 paragraphs. Trick: two paragraphs started with similar connectives.',
            tip: 'Identify clear opener and closer first, then fill the middle.',
          },
          {
            type: 'MCQ — Multiple Answers',
            content: 'Benefits of bilingualism. Select 2. Answer: cognitive flexibility + delayed dementia onset.',
            tip: 'Eliminate clearly wrong options first. Wrong answers don\'t cost marks.',
          },
        ],
      },
      {
        key: 'li',
        preview: 'WFD × 2 · Select Missing Word',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The lecture series focuses on contemporary issues in environmental science.',
              'Students must submit their assignments before the deadline to receive full marks.',
            ],
          },
          {
            type: 'Select Missing Word',
            content: 'Audio about Arctic bird migration. Last word beeped. Options: "navigation", "hibernation", "extinction", "migration". Answer: "navigation".',
            tip: 'The missing word follows logically from the last topic sentence — listen actively to the end.',
          },
        ],
      },
    ],
  },

  // ─── 4 ───────────────────────────────────────────────────────────────────
  {
    id: 'mei-20feb',
    name: 'Mei L.',
    date: '20 Feb 2026',
    location: 'Singapore',
    centre: 'Pearson VUE, Tanjong Pagar',
    score: 90,
    avatarGradient: 'linear-gradient(135deg,#8B5CF6,#C4B5FD)',
    frequency: 11,
    frequencyRange: 'Dec 2025–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'rd',
        preview: 'R&W FIB × 2 · Reading FIB · Reorder',
        questions: [
          {
            type: 'R&W Fill in the Blanks',
            content: 'Passage 1: neuroscience of memory — blanks: "consolidation", "retrieval", "hippocampus", "synaptic". Passage 2: gig economy — blanks: "precarious", "flexibility", "workforce", "autonomous".',
            tip: 'Academic vocabulary repeats across PTE. Build a word list from past memories.',
          },
          {
            type: 'Reading FIB (Dropdown)',
            content: 'Migration patterns. Dropdown options all grammatically valid — meaning was the differentiator. E.g., "emigrate" vs "immigrate" vs "migrate".',
            tip: 'em = leaving your country, im = entering a new one.',
          },
          {
            type: 'Reorder Paragraphs',
            content: 'Evolution of film — silent era to streaming. 5 paragraphs, chronological. Connector: "By this point, cinema had transformed..."',
          },
        ],
      },
      {
        key: 'wr',
        preview: 'Write Essay',
        questions: [
          {
            type: 'Write Essay',
            content: '"In the future, robots will replace most human workers. Is this a positive or negative development?" Keywords: automation, employment, inequality, creativity.',
            tip: 'Strong stance scores better than wishy-washy. Pick one side, argue well, briefly acknowledge complexity.',
          },
        ],
      },
    ],
  },

  // ─── 5 ───────────────────────────────────────────────────────────────────
  {
    id: 'anon-bangalore',
    name: 'Anonymous',
    date: '18 Feb 2026',
    location: 'Bangalore, India',
    centre: null,
    score: 82,
    avatarGradient: 'linear-gradient(135deg,#EC4899,#F9A8D4)',
    frequency: 7,
    frequencyRange: 'Feb–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'li',
        preview: 'WFD × 3 · Highlight Incorrect Words · SST',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The university library provides access to thousands of academic journals online.',
              'Scientists believe that early intervention is critical for successful treatment outcomes.',
              'The committee reviewed all applications and selected candidates based on merit.',
            ],
            tip: 'These 3 are high-frequency — practise typing them from memory before your exam.',
          },
          {
            type: 'Highlight Incorrect Words',
            content: 'Climate change adaptation strategies. Transcript had 4 incorrect words. Pace was fast — mark while listening, not after.',
            tip: 'Don\'t read ahead — follow the audio word by word. Click as you hear the mismatch.',
          },
          {
            type: 'Summarize Spoken Text',
            content: 'Psychology of procrastination — emotion regulation, fear of failure, perfectionism. Speaker\'s 3 strategies: time-boxing, reward systems, identity shift.',
            tip: 'Include all 3 strategies — they\'re the natural structure for your 50–70 word summary.',
          },
        ],
      },
    ],
  },

  // ─── 6 ───────────────────────────────────────────────────────────────────
  {
    id: 'deepa-5mar',
    name: 'Deepa R.',
    date: '5 Mar 2026',
    location: 'Mumbai, India',
    centre: 'Pearson VUE, BKC',
    score: 88,
    avatarGradient: 'linear-gradient(135deg,#EF4444,#FCA5A5)',
    frequency: 8,
    frequencyRange: 'Feb–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'sp',
        preview: 'Read Aloud × 3 · Repeat Sentence × 4 · Retell Lecture',
        questions: [
          {
            type: 'Read Aloud',
            content: 'Passage 1: psychological impact of social isolation in remote workers (~58 words). Passage 2: role of microbes in soil fertility and crop yield (~62 words). Passage 3: history of Silk Road trade routes (~50 words, proper nouns).',
            tip: 'Proper nouns like "Samarkand" or "Mesopotamia" — slow down slightly, then resume normal pace.',
          },
          {
            type: 'Repeat Sentence',
            content: 'All 4 were long (12–15 words). Examples: "The administration has proposed significant changes to the university\'s admission criteria." / "Despite the challenges, the researchers managed to publish their findings last month."',
            tip: 'Don\'t try to understand — just echo. Focus on rhythm and function words.',
          },
          {
            type: 'Retell Lecture',
            content: 'Marine plastic pollution. Speaker discussed microplastics entering food chains through fish. Graph shown: plastic production vs ocean concentration, 1950–2025. American female accent, fairly fast.',
            tip: 'Structure: "The lecture discussed [topic]. The speaker explained [key points]. In conclusion, [main takeaway]."',
          },
        ],
      },
      {
        key: 'wr',
        preview: 'Write Essay · Summarize Written Text × 2',
        questions: [
          {
            type: 'Write Essay',
            content: '"Zoos play an important role in wildlife conservation. Others think zoos are cruel and should be banned." Discuss both views and give your own opinion.',
            tip: 'Discuss-both: equal paragraphs for each side. Your opinion goes in conclusion — be clear, not vague.',
          },
          {
            type: 'Summarize Written Text',
            content: 'Passage 1: the rise of teletherapy and mental health access post-COVID. Passage 2: how ancient Roman aqueducts influenced modern water engineering.',
            tip: 'Two different passages = two separate tasks. Budget 10 minutes each.',
          },
        ],
      },
    ],
  },

  // ─── 7 ───────────────────────────────────────────────────────────────────
  {
    id: 'kevin-28feb',
    name: 'Kevin O.',
    date: '28 Feb 2026',
    location: 'Sydney, Australia',
    centre: 'Pearson VUE, Pitt Street',
    score: 85,
    avatarGradient: 'linear-gradient(135deg,#0EA5E9,#7DD3FC)',
    frequency: 6,
    frequencyRange: 'Jan–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'li',
        preview: 'WFD × 4 · FIB Listening · HCS',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The economic impact of tourism on small island communities is often underestimated.',
              'Philosophers have long debated the nature of consciousness and human identity.',
              'The new policy aims to improve educational outcomes for disadvantaged students.',
              'Renewable energy sources are becoming increasingly cost-competitive with fossil fuels.',
            ],
            tip: 'WFD tip: write quickly, then check spelling in the last 5 seconds. Focus on content words first.',
          },
          {
            type: 'Listening FIB',
            content: 'Lecture on urban heat islands. Blanks: "impervious", "albedo", "mitigation", "canopy". Academic geography topic.',
            tip: 'Words are spelled as you hear them — trust your ear. Academic lectures often have 4–5 blanks.',
          },
          {
            type: 'Highlight Correct Summary',
            content: 'Podcast on cryptocurrency regulation. Correct summary: "governments are introducing frameworks while preserving innovation". Wrong option: "regulators want to ban all crypto activity".',
            tip: 'Extremes in wrong options — "ban all", "completely eliminate" — are usually the trick.',
          },
        ],
      },
      {
        key: 'rd',
        preview: 'R&W FIB · Reorder · MCQ Single',
        questions: [
          {
            type: 'R&W Fill in the Blanks',
            content: 'Passage on global health equity. Blanks: "disparity", "mortality", "intervention", "prevalent". ~230 words, complex sentences.',
            tip: 'If unsure between two words, pick the one that fits the overall tone — academic passages use formal vocabulary.',
          },
          {
            type: 'Reorder Paragraphs',
            content: 'Development of antibiotics — Fleming\'s discovery to modern resistance crisis. 5 paragraphs. Clear chronological structure.',
            tip: 'Dates and years in sentences = strong ordering clues.',
          },
          {
            type: 'MCQ — Single Answer',
            content: 'Passage on Keynesian economics. Q: "What does Keynes argue about government spending during recessions?" A: it stimulates aggregate demand.',
          },
        ],
      },
    ],
  },

  // ─── 8 ───────────────────────────────────────────────────────────────────
  {
    id: 'sara-3mar',
    name: 'Sara N.',
    date: '3 Mar 2026',
    location: 'Dubai, UAE',
    centre: 'Pearson VUE, DIFC',
    score: 77,
    avatarGradient: 'linear-gradient(135deg,#F97316,#FDBA74)',
    frequency: 4,
    frequencyRange: 'Feb–Mar 2026',
    priority: 'medium',
    sections: [
      {
        key: 'sp',
        preview: 'Describe Image × 3 · Answer Short Questions × 3',
        questions: [
          {
            type: 'Describe Image',
            content: 'Image 1: Line graph — global average temperature 1880–2020 (clear upward trend). Image 2: Venn diagram — characteristics of mammals vs reptiles vs shared traits. Image 3: Map showing population density across Southeast Asia.',
            tip: 'Maps: describe pattern (dense in coasts/cities), mention outliers, state overall trend.',
          },
          {
            type: 'Answer Short Questions',
            content: 'Q1: "What is the term for a government led by a single ruler with absolute power?" (autocracy/dictatorship) · Q2: "What organ produces insulin?" (pancreas) · Q3: "What is the chemical symbol for gold?" (Au)',
            tip: 'Answer in 1–3 words. Don\'t explain. If you hesitate, say the word — silence is worse.',
          },
        ],
      },
      {
        key: 'wr',
        preview: 'Write Essay · Summarize Written Text',
        questions: [
          {
            type: 'Write Essay',
            content: '"Online education will eventually replace traditional classroom learning." Do you agree or disagree? Include personal stance with supporting arguments.',
            tip: 'Don\'t be vague. "I strongly believe..." + 2 clear reasons + acknowledge counter + restate stance.',
          },
          {
            type: 'Summarize Written Text',
            content: 'How sleep deprivation affects memory consolidation and learning in university students.',
            tip: 'Include the cause-effect relationship — this was the core of the passage.',
          },
        ],
      },
      {
        key: 'li',
        preview: 'WFD × 2 · Select Missing Word',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The results of the experiment confirmed the hypothesis proposed by the research team.',
              'Many developed countries are facing significant challenges related to an ageing population.',
            ],
          },
          {
            type: 'Select Missing Word',
            content: 'Audio on deep sea exploration technology. Last beeped word: options "pressure", "visibility", "temperature", "biodiversity". Answer: "biodiversity".',
            tip: 'The full audio context sets up the answer — don\'t guess early.',
          },
        ],
      },
    ],
  },

  // ─── 9 ───────────────────────────────────────────────────────────────────
  {
    id: 'anon-toronto',
    name: 'Anonymous',
    date: '25 Feb 2026',
    location: 'Toronto, Canada',
    centre: null,
    score: null,
    avatarGradient: 'linear-gradient(135deg,#64748B,#94A3B8)',
    frequency: 4,
    frequencyRange: 'Feb–Mar 2026',
    priority: 'medium',
    sections: [
      {
        key: 'wr',
        preview: 'Write Essay · Summarize Written Text',
        questions: [
          {
            type: 'Write Essay',
            content: '"Should governments subsidize organic farming or leave it to market forces?" Keywords: sustainable agriculture, food security, economic viability.',
            tip: 'Discuss-both-views: balanced paragraphs. End with a clear personal opinion.',
          },
          {
            type: 'Summarize Written Text',
            content: 'Decline of biodiversity in urban environments and how green corridors help migratory species survive in cities.',
            tip: 'Link idea + evidence: "Urban biodiversity declines because... however... which suggests..."',
          },
        ],
      },
      {
        key: 'sp',
        preview: 'Respond to Situation · Answer Short Questions × 2',
        questions: [
          {
            type: 'Respond to a Situation',
            content: 'You booked a hotel room but arrived to find it double-booked. Receptionist offers a different room at higher price. Respond politely but firmly.',
            tip: 'Acknowledge → state position → request solution. Formal but direct.',
          },
          {
            type: 'Answer Short Questions',
            content: 'Q1: "What is the term for an organism that produces its own food using sunlight?" (autotroph) · Q2: "Which organ filters blood?" (kidneys)',
            tip: 'One or two words only. Don\'t overthink.',
          },
        ],
      },
    ],
  },

  // ─── 10 ──────────────────────────────────────────────────────────────────
  {
    id: 'liam-7mar',
    name: 'Liam P.',
    date: '7 Mar 2026',
    location: 'Auckland, New Zealand',
    centre: 'Pearson VUE, Newmarket',
    score: 83,
    avatarGradient: 'linear-gradient(135deg,#10B981,#6EE7B7)',
    frequency: 5,
    frequencyRange: 'Feb–Mar 2026',
    priority: 'medium',
    sections: [
      {
        key: 'sp',
        preview: 'Read Aloud × 2 · Retell Lecture · Repeat Sentence × 3',
        questions: [
          {
            type: 'Read Aloud',
            content: 'Passage 1: New Zealand\'s indigenous Māori land rights and treaty settlements (~60 words). Passage 2: the role of algae in global oxygen production (~55 words).',
            tip: 'For "Māori" — if unsure of pronunciation, slow slightly. The AI scores fluency, not accent.',
          },
          {
            type: 'Retell Lecture',
            content: 'Geothermal energy in Iceland. Speaker covered how tectonic plate boundaries enable cheap electricity. Charts: cost per kWh vs country. New Zealand mentioned as a comparison.',
            tip: 'If they show a chart, mention it: "The chart illustrated that Iceland produces energy at..."',
          },
          {
            type: 'Repeat Sentence',
            content: 'Examples: "The professor suggested that students review the chapter before attending the seminar." / "Participants were asked to complete a brief questionnaire at the end of the study."',
            tip: 'These are usually 10–15 words. Don\'t panic — say what you remember, confidently.',
          },
        ],
      },
      {
        key: 'li',
        preview: 'WFD × 3 · SST · Highlight Incorrect Words',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The proposal was rejected due to insufficient evidence provided by the applicants.',
              'Cultural diversity within organizations has been shown to improve creative problem solving.',
              'The river system supports a wide range of plant and animal species.',
            ],
          },
          {
            type: 'Summarize Spoken Text',
            content: 'Urban farming and vertical agriculture. Key: LED lighting enables year-round crops, 90% less water than traditional farming, premium pricing offset costs.',
            tip: 'Numbers and statistics in the audio = include them in your summary. They show listening depth.',
          },
          {
            type: 'Highlight Incorrect Words',
            content: 'Talk on ancient trade in the Mediterranean. Transcript had "exported" where audio said "imported". Also: "copper" vs "gold", "century" vs "decade".',
            tip: 'Common swaps: synonyms, opposites, and similar-sounding words. Train your ear on all three.',
          },
        ],
      },
    ],
  },

  // ─── 11 ──────────────────────────────────────────────────────────────────
  {
    id: 'nalini-4mar',
    name: 'Nalini V.',
    date: '4 Mar 2026',
    location: 'Chennai, India',
    centre: 'Pearson VUE, Anna Salai',
    score: 79,
    avatarGradient: 'linear-gradient(135deg,#7C3AED,#A78BFA)',
    frequency: 7,
    frequencyRange: 'Jan–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'rd',
        preview: 'Reorder × 2 · MCQ Multiple · R&W FIB',
        questions: [
          {
            type: 'Reorder Paragraphs',
            content: 'Passage 1: evolution of surgical techniques from ancient Egypt to laparoscopy (5 paragraphs, chronological). Passage 2: formation of the European Union — political and economic arguments (4 paragraphs, thematic).',
            tip: 'Thematic passages are harder — find the "thesis" paragraph first, then supporting points, then conclusion.',
          },
          {
            type: 'MCQ — Multiple Answers',
            content: 'Passage on social media\'s effect on political polarization. Select 3 correct effects. Answers: echo chambers, reduced exposure to opposing views, increased speed of misinformation spread.',
            tip: 'For MCQ Multiple — 3 correct = select exactly 3. Read the question stem carefully for "how many".',
          },
          {
            type: 'R&W Fill in the Blanks',
            content: 'Passage on space debris — blanks: "trajectory", "decommission", "collision", "escalate". Satellite industry context.',
            tip: 'Space/tech topics use specialized vocabulary. If you don\'t know the word, fit the grammar first.',
          },
        ],
      },
      {
        key: 'wr',
        preview: 'Write Essay · Summarize Written Text',
        questions: [
          {
            type: 'Write Essay',
            content: '"Governments should make it compulsory for citizens to vote in elections." Agree or disagree with this statement.',
            tip: 'Civic/political essays: don\'t be too one-sided. Acknowledging the other view adds sophistication.',
          },
          {
            type: 'Summarize Written Text',
            content: 'The impact of music education on cognitive development in early childhood.',
            tip: 'Include: cause, mechanism, effect. "Music education improves cognition because... which results in..."',
          },
        ],
      },
    ],
  },

  // ─── 12 ──────────────────────────────────────────────────────────────────
  {
    id: 'anon-kl',
    name: 'Anonymous',
    date: '2 Mar 2026',
    location: 'Kuala Lumpur, Malaysia',
    centre: null,
    score: 74,
    avatarGradient: 'linear-gradient(135deg,#0F766E,#2DD4BF)',
    frequency: 6,
    frequencyRange: 'Feb–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'li',
        preview: 'WFD × 4 · HCS · FIB Listening',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The findings suggest that regular physical exercise significantly reduces the risk of depression.',
              'International students are required to demonstrate English proficiency before enrollment.',
              'The study examined the relationship between income inequality and social mobility.',
              'Advances in nanotechnology are opening new possibilities in medicine and materials science.',
            ],
            tip: 'All 4 are medium-to-high frequency. WFD can make or break your listening score — practise daily.',
          },
          {
            type: 'Highlight Correct Summary',
            content: 'Lecture on behavioral economics. Correct: "people often make irrational decisions based on how choices are framed." Wrong: "rational decision-making is the foundation of modern economics."',
            tip: 'The correct option is usually a nuanced paraphrase — not the most extreme, not the vaguest.',
          },
          {
            type: 'Listening FIB',
            content: 'Talk on language acquisition in children. Blanks: "critical", "exposure", "phonemic", "acquisition". Early childhood development context.',
          },
        ],
      },
      {
        key: 'sp',
        preview: 'Read Aloud · Describe Image · Respond to Situation',
        questions: [
          {
            type: 'Read Aloud',
            content: 'Passage on Malaysia\'s economic transformation from agricultural to industrial economy, 1970–2000. ~65 words, proper nouns.',
          },
          {
            type: 'Describe Image',
            content: 'Table — comparison of literacy rates across 5 Southeast Asian countries in 2000 vs 2020. Singapore 100%, Myanmar lowest but improving.',
            tip: 'Tables: state the comparison, identify outliers, mention trend over time.',
          },
          {
            type: 'Respond to a Situation',
            content: 'Your team submitted a project late due to a technical issue. Your manager asks for an explanation via voicemail. Respond professionally.',
            tip: 'Apologize briefly → explain clearly → state what you\'ve done to fix it. Don\'t over-apologize.',
          },
        ],
      },
    ],
  },

  // ─── 13 ──────────────────────────────────────────────────────────────────
  {
    id: 'yuki-26feb',
    name: 'Yuki T.',
    date: '26 Feb 2026',
    location: 'Tokyo, Japan',
    centre: 'Pearson VUE, Shinjuku',
    score: 91,
    avatarGradient: 'linear-gradient(135deg,#DB2777,#F9A8D4)',
    frequency: 4,
    frequencyRange: 'Jan–Mar 2026',
    priority: 'medium',
    sections: [
      {
        key: 'sp',
        preview: 'Read Aloud × 3 · Repeat Sentence × 5',
        questions: [
          {
            type: 'Read Aloud',
            content: 'Passage 1: cultural significance of traditional Japanese theater (~55 words). Passage 2: economic models of healthcare funding systems (~60 words). Passage 3: ethical debates in genetic engineering (~65 words, complex).',
            tip: 'For complex passages: read the whole thing in 20 seconds before you speak. Don\'t start immediately.',
          },
          {
            type: 'Repeat Sentence',
            content: '"Students who engage regularly with academic texts tend to develop stronger critical thinking skills." / "The results indicate that the intervention had a statistically significant positive effect." / "We recommend that participants arrive at least fifteen minutes before the session begins."',
            tip: '5 RS questions — they come fast. Keep your rhythm between each. Don\'t let one mistake shake you.',
          },
        ],
      },
      {
        key: 'rd',
        preview: 'R&W FIB × 2 · MCQ Single · Reading FIB',
        questions: [
          {
            type: 'R&W Fill in the Blanks',
            content: 'Passage 1: economic inequality and social capital — blanks: "cohesion", "disparity", "redistributive", "stratified". Passage 2: photosynthesis — blanks: "chlorophyll", "glucose", "absorbed", "emitted".',
          },
          {
            type: 'MCQ — Single Answer',
            content: 'Passage on the effects of deforestation on indigenous communities. Q: "What does the author imply is the root cause?" A: prioritization of economic gain over cultural rights.',
            tip: '"What does the author imply" = inference question. The answer won\'t be stated directly.',
          },
          {
            type: 'Reading FIB (Dropdown)',
            content: 'Architecture and urban design — dropdowns all grammatically similar: "constructed", "erected", "assembled", "built". Subtle meaning differences.',
            tip: '"Erected" is formal for large structures. "Assembled" implies multiple parts. Context is everything.',
          },
        ],
      },
    ],
  },

  // ─── 14 ──────────────────────────────────────────────────────────────────
  {
    id: 'aisha-8mar',
    name: 'Aisha B.',
    date: '8 Mar 2026',
    location: 'Lahore, Pakistan',
    centre: 'Pearson VUE, Gulberg',
    score: 76,
    avatarGradient: 'linear-gradient(135deg,#D97706,#FDE68A)',
    frequency: 8,
    frequencyRange: 'Feb–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'wr',
        preview: 'Write Essay × 2 · Summarize Written Text',
        questions: [
          {
            type: 'Write Essay',
            content: '"The increasing use of surveillance technology by governments threatens individual privacy and civil liberties." To what extent do you agree?',
            tip: 'Tech + civil rights essays: concrete examples (CCTV, facial recognition) strengthen your argument.',
          },
          {
            type: 'Write Essay',
            content: '"Children today are under too much pressure to succeed academically. Schools should focus more on well-being." Discuss both views.',
            tip: 'Discuss-both: 2 body paragraphs of equal length. Your opinion goes last — brief but clear.',
          },
          {
            type: 'Summarize Written Text',
            content: 'The commercialization of space travel and its potential to create new economic inequalities.',
            tip: 'One complex sentence: "Space commercialization promises innovation but may [negative], thus [implication]."',
          },
        ],
      },
      {
        key: 'li',
        preview: 'WFD × 3 · SST',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The professor emphasized the importance of peer review in maintaining academic integrity.',
              'Despite initial setbacks, the construction project was completed ahead of schedule.',
              'The discovery challenged previously accepted theories about the origins of the universe.',
            ],
          },
          {
            type: 'Summarize Spoken Text',
            content: 'Lecture on water scarcity — desalination technologies, geopolitical tensions over shared rivers, and projected 2050 shortage data. Fast-paced, Indian male accent.',
            tip: 'Fast lectures: jot 3–4 bullet keywords, not sentences. Reconstruct after it ends.',
          },
        ],
      },
    ],
  },

  // ─── 15 ──────────────────────────────────────────────────────────────────
  {
    id: 'marcus-24feb',
    name: 'Marcus A.',
    date: '24 Feb 2026',
    location: 'Accra, Ghana',
    centre: 'Pearson VUE, Accra Mall',
    score: 80,
    avatarGradient: 'linear-gradient(135deg,#16A34A,#86EFAC)',
    frequency: 3,
    frequencyRange: 'Feb–Mar 2026',
    priority: 'medium',
    sections: [
      {
        key: 'sp',
        preview: 'Retell Lecture × 2 · Describe Image × 2 · ASQ × 3',
        questions: [
          {
            type: 'Retell Lecture',
            content: 'Lecture 1: African colonial history and post-independence economic development. Chart: GDP growth of 5 nations, 1960–2000. Lecture 2: neuroplasticity — how learning reshapes brain structure.',
            tip: 'Two retell lectures in one sitting is common. Budget exactly 40 seconds each — the timer shows.',
          },
          {
            type: 'Describe Image',
            content: 'Image 1: Flowchart — how a bill becomes law in a parliamentary system (7 steps). Image 2: World map highlighting regions with highest deforestation rates.',
            tip: 'World maps: say "the map shows... The regions with the highest... In contrast, areas such as..."',
          },
          {
            type: 'Answer Short Questions',
            content: 'Q1: "What is the medical term for high blood pressure?" (hypertension) · Q2: "What gas makes up most of Earth\'s atmosphere?" (nitrogen) · Q3: "What is the term for a word that sounds the same as another but has different meaning?" (homophone)',
            tip: '"Homophone" vs "homonym" — homophone = sounds the same, homonym = spelled and sounds the same.',
          },
        ],
      },
      {
        key: 'rd',
        preview: 'Reorder · MCQ Multiple · Reading FIB',
        questions: [
          {
            type: 'Reorder Paragraphs',
            content: 'Impact of colonialism on African educational systems — 4 paragraphs. Tricky: two paragraphs both started with "However".',
            tip: 'When two paragraphs start similarly, look at the last word of the preceding paragraph for the link.',
          },
          {
            type: 'MCQ — Multiple Answers',
            content: 'Passage on renewable energy investment. Select 2. Answers: declining cost of solar panels + increased government subsidies.',
          },
          {
            type: 'Reading FIB (Dropdown)',
            content: 'Passage on globalization. Dropdowns included "affected", "effected", "influenced", "impacted". Context determined correct usage.',
            tip: '"Affected" = influenced. "Effected" = brought about (rare, formal). Most of the time it\'s "affected".',
          },
        ],
      },
    ],
  },

  // ─── 16 ──────────────────────────────────────────────────────────────────
  {
    id: 'fatima-6mar',
    name: 'Fatima Z.',
    date: '6 Mar 2026',
    location: 'Karachi, Pakistan',
    centre: 'Pearson VUE, Clifton',
    score: 84,
    avatarGradient: 'linear-gradient(135deg,#2563EB,#93C5FD)',
    frequency: 9,
    frequencyRange: 'Jan–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'li',
        preview: 'WFD × 5 · Highlight Incorrect Words × 2',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The board of directors approved the merger after months of negotiation.',
              'Effective communication is considered one of the most valuable skills in the workplace.',
              'The archaeological site revealed evidence of human settlement dating back thousands of years.',
              'Students are encouraged to participate actively in class discussions and group projects.',
              'The treaty established a framework for cooperation on environmental protection.',
            ],
            tip: 'When you get 5 WFD questions, it\'s heavily weighted. Don\'t rush — each word matters.',
          },
          {
            type: 'Highlight Incorrect Words',
            content: 'Audio 1: history of vaccination — transcript swapped "immunity" with "resistance", "prevent" with "treat". Audio 2: climate summit — "agreed" vs "refused", "reduce" vs "increase".',
            tip: 'Antonyms are the most common swap. Train yourself to flag opposites immediately.',
          },
        ],
      },
      {
        key: 'sp',
        preview: 'Read Aloud × 2 · Repeat Sentence × 4',
        questions: [
          {
            type: 'Read Aloud',
            content: 'Passage 1: the role of international organizations in conflict resolution (~60 words). Passage 2: how blockchain technology enables secure financial transactions (~58 words).',
            tip: 'Blockchain/tech passages — don\'t pause on jargon. Say it confidently even if you don\'t know the word.',
          },
          {
            type: 'Repeat Sentence',
            content: '"All students attending the field trip must return their signed permission forms by Friday." / "The new curriculum emphasizes critical thinking, collaboration, and digital literacy."',
            tip: 'Short RS = easy marks. Long RS = chunk it: subject | verb phrase | qualifier. Recall in that order.',
          },
        ],
      },
    ],
  },

  // ─── 17 ──────────────────────────────────────────────────────────────────
  {
    id: 'hyun-19feb',
    name: 'Hyun J.',
    date: '19 Feb 2026',
    location: 'Seoul, South Korea',
    centre: 'Pearson VUE, Gangnam',
    score: 87,
    avatarGradient: 'linear-gradient(135deg,#9333EA,#D8B4FE)',
    frequency: 5,
    frequencyRange: 'Jan–Mar 2026',
    priority: 'medium',
    sections: [
      {
        key: 'rd',
        preview: 'R&W FIB × 3 · MCQ Single · Reorder',
        questions: [
          {
            type: 'R&W Fill in the Blanks',
            content: 'Passage 1: artificial intelligence in healthcare — blanks: "diagnostic", "algorithm", "precision", "validate". Passage 2: ocean acidification — blanks: "dissolved", "carbonic", "calcify", "threshold". Passage 3: urbanization in Asia — blanks: "density", "infrastructure", "migration", "sprawl".',
            tip: '3 R&W FIB passages is a heavy load. Pace yourself — don\'t spend more than 3 minutes per passage.',
          },
          {
            type: 'MCQ — Single Answer',
            content: 'Passage on dark matter. Q: "What do scientists currently know about dark matter?" A: its effects can be observed but its composition is unknown.',
            tip: 'Science passages often have MCQ where all options sound plausible. Focus on what the text says, not what you know.',
          },
          {
            type: 'Reorder Paragraphs',
            content: 'The Korean economic miracle — from war-torn economy to global tech leader. 5 paragraphs. Opener identified by: "In 1953, South Korea..."',
            tip: 'Historical passages: years are your anchors. The earliest year = likely the opener.',
          },
        ],
      },
      {
        key: 'wr',
        preview: 'Write Essay · Summarize Written Text × 2',
        questions: [
          {
            type: 'Write Essay',
            content: '"Social media companies should be legally responsible for the content posted on their platforms." Discuss both views and give your opinion.',
          },
          {
            type: 'Summarize Written Text',
            content: 'Passage 1: rising interest in plant-based diets and their environmental vs health tradeoffs. Passage 2: how algorithmic bias in AI hiring tools perpetuates workplace discrimination.',
            tip: 'Both passages had complex vocabulary. If unsure of a word, paraphrase it in your summary.',
          },
        ],
      },
    ],
  },

  // ─── 18 ──────────────────────────────────────────────────────────────────
  {
    id: 'anon-nairobi',
    name: 'Anonymous',
    date: '15 Feb 2026',
    location: 'Nairobi, Kenya',
    centre: null,
    score: 71,
    avatarGradient: 'linear-gradient(135deg,#DC2626,#FCA5A5)',
    frequency: 3,
    frequencyRange: 'Feb 2026',
    priority: 'medium',
    sections: [
      {
        key: 'sp',
        preview: 'Read Aloud × 2 · Retell Lecture · Describe Image · RST',
        questions: [
          {
            type: 'Read Aloud',
            content: 'Passage 1: role of microfinance in poverty reduction in sub-Saharan Africa. Passage 2: how volcanoes influence global climate through ash and sulfur emissions.',
            tip: 'If you stumble, don\'t go back — keep reading forward. The AI measures fluency, not perfection.',
          },
          {
            type: 'Retell Lecture',
            content: 'Archaeology lecture on the Great Rift Valley as the "cradle of humankind". Fossils, migration patterns, Homo sapiens timeline. Map shown with migration routes.',
            tip: 'For geography + archaeology topics: say 2–3 facts + mention the visual.',
          },
          {
            type: 'Describe Image',
            content: 'Bar chart — mobile phone penetration rates across African nations (2010 vs 2020). Nigeria and South Africa highest. Clear upward trend across all nations.',
          },
          {
            type: 'Respond to a Situation',
            content: 'You are a project manager. A client emails asking why their delivery is 2 weeks late. Respond professionally explaining the reasons and next steps.',
            tip: 'Business RST: apologize once → explain → commit to resolution date. 30–40 words max.',
          },
        ],
      },
      {
        key: 'li',
        preview: 'WFD × 3 · SMW',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The rapid expansion of mobile technology has transformed communication across the continent.',
              'Conservation efforts have helped increase the population of several endangered species.',
              'The conference brought together experts from more than forty different countries.',
            ],
          },
          {
            type: 'Select Missing Word',
            content: 'Audio on entrepreneurship in emerging markets. Final beeped word: options "capital", "investment", "funding", "resources". Answer: "capital".',
          },
        ],
      },
    ],
  },

  // ─── 19 ──────────────────────────────────────────────────────────────────
  {
    id: 'rafael-23feb',
    name: 'Rafael M.',
    date: '23 Feb 2026',
    location: 'São Paulo, Brazil',
    centre: 'Pearson VUE, Paulista',
    score: 81,
    avatarGradient: 'linear-gradient(135deg,#15803D,#86EFAC)',
    frequency: 4,
    frequencyRange: 'Feb–Mar 2026',
    priority: 'medium',
    sections: [
      {
        key: 'wr',
        preview: 'Write Essay × 2 · Summarize Written Text',
        questions: [
          {
            type: 'Write Essay',
            content: '"International tourism benefits local economies but causes irreversible cultural and environmental damage." Discuss both views and give your opinion.',
            tip: 'Good structure: Para 1 (benefits) → Para 2 (damage) → Para 3 (your stance with nuance).',
          },
          {
            type: 'Write Essay',
            content: '"Public transport should be made free of charge in major cities." To what extent do you agree?',
            tip: '"To what extent" = agree, but acknowledge conditions. E.g., "only if funded by X".',
          },
          {
            type: 'Summarize Written Text',
            content: 'The relationship between deforestation in the Amazon and global precipitation patterns.',
            tip: 'Scientific cause-effect: don\'t simplify too much. Include the mechanism ("which triggers", "resulting in").',
          },
        ],
      },
      {
        key: 'rd',
        preview: 'MCQ Multiple · Reorder · Reading FIB',
        questions: [
          {
            type: 'MCQ — Multiple Answers',
            content: 'Passage on microplastics. Select 3 impacts. Answers: hormonal disruption, marine ecosystem damage, entry into human food supply.',
            tip: '"Select X" — don\'t select more or fewer than stated. Even if 4 seem right, you must choose exactly 3.',
          },
          {
            type: 'Reorder Paragraphs',
            content: 'History of coffee — origins in Ethiopia to global commodity. 4 paragraphs. Opener: "Legend traces the discovery of coffee to an Ethiopian goat herder."',
          },
          {
            type: 'Reading FIB (Dropdown)',
            content: 'Rainforest conservation. Dropdowns: "sustain/maintain/preserve/conserve" — answer depended on what followed ("biodiversity" → "preserve").',
            tip: 'Collocations matter: "conserve energy", "preserve biodiversity", "maintain quality".',
          },
        ],
      },
    ],
  },

  // ─── 20 ──────────────────────────────────────────────────────────────────
  {
    id: 'ananya-9mar',
    name: 'Ananya S.',
    date: '9 Mar 2026',
    location: 'Hyderabad, India',
    centre: 'Pearson VUE, Hitech City',
    score: 89,
    avatarGradient: 'linear-gradient(135deg,#4F46E5,#C4B5FD)',
    frequency: 10,
    frequencyRange: 'Feb–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'sp',
        preview: 'Read Aloud × 3 · Repeat Sentence × 4 · Describe Image × 2',
        questions: [
          {
            type: 'Read Aloud',
            content: 'Passage 1: CRISPR gene editing — ethical concerns and medical potential (~65 words). Passage 2: the psychology of color in marketing and consumer behavior (~60 words). Passage 3: urbanization trends in South Asia (~55 words).',
            tip: 'CRISPR, genome, nucleotide — slow slightly on scientific terms. Fluency still matters most.',
          },
          {
            type: 'Repeat Sentence',
            content: '"The conference aims to foster dialogue between government officials and independent researchers." / "Students who fail to submit assessments on time may receive a grade penalty." / "The company announced plans to expand its operations into three new markets by next year."',
          },
          {
            type: 'Describe Image',
            content: 'Image 1: Line graph — India\'s GDP growth 2000–2024 (dip in 2020, recovery 2021–24). Image 2: Diagram showing layers of Earth\'s atmosphere with altitude markers.',
            tip: 'GDP dip in 2020 = COVID. You can mention it: "likely reflecting the economic impact of the pandemic."',
          },
        ],
      },
      {
        key: 'li',
        preview: 'WFD × 4 · SST · FIB Listening',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The government announced a new initiative to improve digital literacy in rural communities.',
              'Research indicates that mindfulness practices can reduce symptoms of anxiety and stress.',
              'The company reported record profits despite challenging global economic conditions.',
              'Access to quality healthcare remains unevenly distributed across different income groups.',
            ],
            tip: 'These 4 are all medium-high frequency across multiple test centers. Memorize them.',
          },
          {
            type: 'Summarize Spoken Text',
            content: 'Lecture on India\'s space program — from ISRO\'s founding to Chandrayaan-3. Key: low-cost innovation model. Fast-paced, male Indian accent.',
            tip: 'Pride yourself on speed-writing. 50 words in 10 minutes is very achievable with practice.',
          },
          {
            type: 'Listening FIB',
            content: 'Podcast on digital privacy. Blanks: "encrypted", "metadata", "consent", "aggregate".',
          },
        ],
      },
    ],
  },

  // ─── 21 ──────────────────────────────────────────────────────────────────
  {
    id: 'chen-17feb',
    name: 'Chen W.',
    date: '17 Feb 2026',
    location: 'Vancouver, Canada',
    centre: 'Pearson VUE, Downtown',
    score: 92,
    avatarGradient: 'linear-gradient(135deg,#0369A1,#7DD3FC)',
    frequency: 6,
    frequencyRange: 'Jan–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'rd',
        preview: 'R&W FIB × 2 · Reorder × 2 · MCQ Single + Multiple',
        questions: [
          {
            type: 'R&W Fill in the Blanks',
            content: 'Passage 1: international law and territorial disputes — blanks: "sovereignty", "jurisdiction", "arbitration", "bilateral". Passage 2: epigenetics — blanks: "heritable", "methylation", "suppress", "phenotype".',
            tip: 'Epigenetics is recurring in PTE 2025-26. Learn: methylation, phenotype, expression, heritable.',
          },
          {
            type: 'Reorder Paragraphs',
            content: 'Passage 1: development of modern democracy — Athens to present (5 paragraphs). Passage 2: how vaccines are developed and approved (4 paragraphs, process-based).',
            tip: 'Process-based reorders are easier: find "first step" and "final outcome" paragraphs first.',
          },
          {
            type: 'MCQ — Single Answer',
            content: 'Passage on immigration policy. Q: "What is the author\'s primary argument?" A: economic benefits of immigration outweigh social costs when managed effectively.',
            tip: '"Primary argument" = author\'s main claim, not a supporting detail. Scan for thesis statements.',
          },
          {
            type: 'MCQ — Multiple Answers',
            content: 'Passage on coral reef decline. Select 2 causes. Answers: rising ocean temperatures + agricultural runoff.',
          },
        ],
      },
      {
        key: 'sp',
        preview: 'Read Aloud × 2 · Retell Lecture',
        questions: [
          {
            type: 'Read Aloud',
            content: 'Passage 1: Canada\'s reconciliation process with Indigenous peoples — Truth and Reconciliation Commission (~65 words). Passage 2: global supply chain disruptions post-pandemic (~60 words).',
          },
          {
            type: 'Retell Lecture',
            content: 'Lecture on quantum computing — qubits vs classical bits, superposition, applications in cryptography. Highly technical, fast-paced, American accent. Graph: projected computing power growth.',
            tip: 'For very technical topics: just get the main theme + 2 details. You don\'t need to understand to retell.',
          },
        ],
      },
    ],
  },

  // ─── 22 ──────────────────────────────────────────────────────────────────
  {
    id: 'divya-10mar',
    name: 'Divya P.',
    date: '10 Mar 2026',
    location: 'Pune, India',
    centre: 'Pearson VUE, Baner',
    score: 78,
    avatarGradient: 'linear-gradient(135deg,#B45309,#FDE68A)',
    frequency: 7,
    frequencyRange: 'Feb–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'li',
        preview: 'WFD × 4 · HCS × 2 · Listening FIB',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The treaty was signed by representatives from twelve nations after three years of negotiation.',
              'Higher education institutions are increasingly adopting flexible online learning models.',
              'The study revealed that urban green spaces significantly improve resident mental health outcomes.',
              'Global food systems must adapt to the pressures of climate change and population growth.',
            ],
            tip: 'Sentences 3 and 4 are very high frequency across test centres in 2026. Learn them word-for-word.',
          },
          {
            type: 'Highlight Correct Summary',
            content: 'Audio 1: talk on dark tourism. Correct: "people are drawn to sites of tragedy to understand history and mortality." Audio 2: lecture on media literacy. Correct: "teaching critical evaluation of sources is essential in the digital age."',
            tip: 'Two HCS in one exam is not unusual. Each audio plays once — engage from the first second.',
          },
          {
            type: 'Listening FIB',
            content: 'Documentary on ocean currents. Blanks: "thermohaline", "circulation", "equatorial", "salinity".',
            tip: 'Scientific geography vocabulary: thermohaline = thermo (heat) + haline (salt). Context helps.',
          },
        ],
      },
      {
        key: 'sp',
        preview: 'Retell Lecture · Describe Image × 2 · RST',
        questions: [
          {
            type: 'Retell Lecture',
            content: 'Women\'s participation in the workforce — historical exclusion, post-WWII entry, pay gap data. Chart: female labor participation by region, 1970–2020. British female accent.',
            tip: 'Charts with clear trends: state the trend in one sentence, then give 2 specific data points.',
          },
          {
            type: 'Describe Image',
            content: 'Image 1: scatter plot — correlation between education spending (% GDP) and HDI score across 30 countries. Image 2: table comparing costs of 4 renewable energy types.',
            tip: 'Scatter plots: state direction of correlation ("positive relationship"), mention cluster or outlier.',
          },
          {
            type: 'Respond to a Situation',
            content: 'A colleague asks you to cover their shift at work without much notice. You have prior commitments. Respond via voicemail.',
            tip: 'Personal RST: be warm but honest. "I\'m sorry I can\'t this time because... I could help on..."',
          },
        ],
      },
    ],
  },

  // ─── 23 ──────────────────────────────────────────────────────────────────
  {
    id: 'oliver-21feb',
    name: 'Oliver H.',
    date: '21 Feb 2026',
    location: 'Berlin, Germany',
    centre: 'Pearson VUE, Mitte',
    score: 88,
    avatarGradient: 'linear-gradient(135deg,#374151,#9CA3AF)',
    frequency: 4,
    frequencyRange: 'Jan–Feb 2026',
    priority: 'medium',
    sections: [
      {
        key: 'sp',
        preview: 'Read Aloud × 3 · Repeat Sentence × 5 · Describe Image',
        questions: [
          {
            type: 'Read Aloud',
            content: 'Passage 1: EU climate legislation and the Green Deal (~60 words). Passage 2: Nietzsche\'s philosophy of the will to power (~55 words, dense). Passage 3: how mRNA vaccines work (~62 words).',
            tip: 'Philosophical texts: slow down slightly — precise pronunciation matters more than speed.',
          },
          {
            type: 'Repeat Sentence',
            content: '"Research ethics requires that participants provide informed consent prior to their involvement in any study." / "The exhibition will feature works by contemporary artists from across the European Union." / "Students are advised to consult the reading list before the first lecture of each module."',
            tip: '5 RS questions — a high number. Don\'t dwell on one. Move through them with confidence.',
          },
          {
            type: 'Describe Image',
            content: 'Organizational chart — structure of a multinational corporation with HQ, regional branches, and subsidiaries.',
            tip: 'Org charts: describe hierarchy (top → bottom), then notable features (e.g., "X reports directly to Y").',
          },
        ],
      },
      {
        key: 'wr',
        preview: 'Write Essay · Summarize Written Text',
        questions: [
          {
            type: 'Write Essay',
            content: '"Nuclear energy is a necessary solution to climate change and should be expanded globally." Do you agree or disagree?',
            tip: 'Energy essays: data helps. "Nuclear emits X times less CO₂ than coal" is a strong supporting point even if approximate.',
          },
          {
            type: 'Summarize Written Text',
            content: 'The evolution of the European Union from a trade bloc to a political union and the tensions this creates.',
            tip: 'Political/institutional: summarize the central tension ("while X, there is growing concern about Y").',
          },
        ],
      },
    ],
  },

  // ─── 24 ──────────────────────────────────────────────────────────────────
  {
    id: 'pooja-11mar',
    name: 'Pooja T.',
    date: '11 Mar 2026',
    location: 'Ahmedabad, India',
    centre: 'Pearson VUE, SG Highway',
    score: 76,
    avatarGradient: 'linear-gradient(135deg,#7E22CE,#E9D5FF)',
    frequency: 9,
    frequencyRange: 'Feb–Mar 2026',
    priority: 'high',
    sections: [
      {
        key: 'li',
        preview: 'WFD × 5 · Highlight Incorrect Words · SST',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The researcher concluded that further studies are needed to confirm these preliminary findings.',
              'All employees are expected to comply with the updated workplace health and safety guidelines.',
              'The exhibition attracted visitors from over sixty countries during its three-month run.',
              'Sustainable development requires balancing economic growth with environmental protection.',
              'The new software update significantly improved the performance of older devices.',
            ],
            tip: 'Getting 5 WFD is tough. Don\'t overthink spelling — write fast and correct at the end if time allows.',
          },
          {
            type: 'Highlight Incorrect Words',
            content: 'Talk on India\'s green hydrogen policy. 3 swapped words in transcript: "imported" (audio: "exported"), "reduce" (audio: "increase"), "solar" (audio: "wind").',
          },
          {
            type: 'Summarize Spoken Text',
            content: 'Lecture on urban heat islands in Indian cities. Solutions discussed: cool roofs, urban forests, permeable pavements. Data: Mumbai 3°C warmer than 1970.',
            tip: 'Include numerical data: "the speaker noted that temperatures had risen by X degrees over Y years."',
          },
        ],
      },
      {
        key: 'sp',
        preview: 'Read Aloud × 2 · Retell Lecture · ASQ × 2',
        questions: [
          {
            type: 'Read Aloud',
            content: 'Passage 1: India\'s digital public infrastructure and UPI\'s impact on financial inclusion (~65 words). Passage 2: the science of monsoon formation and its agricultural significance (~60 words).',
          },
          {
            type: 'Retell Lecture',
            content: 'History of yoga — from Vedic texts to global wellness industry. Diagram: timeline with key milestones. Speaker mentioned commercialization controversies.',
            tip: 'Cultural/historical lectures: theme → key development → modern relevance. 35–40 seconds is ideal.',
          },
          {
            type: 'Answer Short Questions',
            content: 'Q1: "What is the name of the process by which plants lose water through their leaves?" (transpiration) · Q2: "What type of rock is formed from cooled magma?" (igneous)',
          },
        ],
      },
    ],
  },

  // ─── 25 ──────────────────────────────────────────────────────────────────
  {
    id: 'anon-dubai2',
    name: 'Anonymous',
    date: '12 Mar 2026',
    location: 'Dubai, UAE',
    centre: null,
    score: 85,
    avatarGradient: 'linear-gradient(135deg,#C2410C,#FDBA74)',
    frequency: 6,
    frequencyRange: 'Mar 2026',
    priority: 'medium',
    sections: [
      {
        key: 'rd',
        preview: 'R&W FIB × 2 · Reorder · MCQ Single · Reading FIB',
        questions: [
          {
            type: 'R&W Fill in the Blanks',
            content: 'Passage 1: philosophy of ethics — blanks: "utilitarian", "consequentialist", "deontological", "inherent". Passage 2: urban migration in Gulf states — blanks: "expatriate", "remittance", "demographic", "transient".',
            tip: 'Ethics vocabulary repeats in PTE: utilitarian, consequentialist, normative, subjective. Worth studying.',
          },
          {
            type: 'Reorder Paragraphs',
            content: 'Rise of Dubai as a global city — from fishing village to financial hub. 5 paragraphs. Opener: "Few cities have undergone as dramatic a transformation..."',
          },
          {
            type: 'MCQ — Single Answer',
            content: 'Passage on desertification. Q: "What factor does the author identify as most underestimated?" A: the role of wind erosion compared to water erosion.',
          },
          {
            type: 'Reading FIB (Dropdown)',
            content: 'Passage on renewable energy policy in the Gulf. Dropdowns: "adopt/adapt/adopt/impose" — all plausible, context made "adopt" correct twice.',
            tip: '"Adopt" = take on a practice. "Adapt" = modify to fit. Very commonly confused in PTE.',
          },
        ],
      },
      {
        key: 'li',
        preview: 'WFD × 3 · SST · SMW',
        questions: [
          {
            type: 'Write from Dictation',
            sentences: [
              'The central bank raised interest rates for the third consecutive time this year.',
              'Many species of migratory birds are threatened by habitat loss and climate disruption.',
              'The hospital implemented a new triage system to reduce emergency department wait times.',
            ],
          },
          {
            type: 'Summarize Spoken Text',
            content: 'Talk on the psychology of decision fatigue. Key points: willpower as finite resource, how judges give harsher decisions late in the day, strategies (routine, simplification).',
            tip: 'Include one concrete example from the audio — it shows depth: "the speaker cited a study on judges..."',
          },
          {
            type: 'Select Missing Word',
            content: 'Audio on wildlife conservation. Final beeped word: options "extinction", "preservation", "recovery", "migration". Answer: "recovery" (context: species were responding well to protection efforts).',
          },
        ],
      },
    ],
  },

]

// Helper to get memories by section filter
export function getMemoriesBySection(sectionKey) {
  if (!sectionKey || sectionKey === 'all') return MEMORIES
  return MEMORIES.filter(m => m.sections.some(s => s.key === sectionKey))
}
