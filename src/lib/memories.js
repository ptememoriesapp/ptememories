// src/lib/memories.js
// Single source of truth for all sample memory data
// Replace / extend this with real DB data when backend is ready

export const MEMORIES = [
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
            content: 'First passage: urban planning and smart cities. ~55 words. Second: history of the printing press and its impact on literacy rates. ~65 words, more complex.',
            tip: 'For longer passages, break into 3-second chunks mentally before speaking.',
          },
          {
            type: 'Describe Image',
            content: 'Pie chart — global energy sources (fossil fuels 78%, renewables 15%, nuclear 7%). Process diagram: water treatment cycle with 5 stages.',
            tip: 'Process diagrams: describe each step in sequence. Use "first", "then", "finally".',
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
            tip: 'Read all options first. Identify clear opener and closer, then fill middle.',
          },
          {
            type: 'MCQ — Multiple Answers',
            content: 'Benefits of bilingualism. Select 2. Answer: cognitive flexibility + delayed dementia onset.',
            tip: 'Eliminate clearly wrong options first. Wrong answers don\'t cost marks but don\'t earn them either.',
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
            tip: 'Pay attention to the final 10 seconds — the missing word follows logically from the last topic shift.',
          },
        ],
      },
    ],
  },

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
            tip: 'Strong stance scores better than wishy-washy. Pick one side, argue well, acknowledge complexity briefly.',
          },
        ],
      },
    ],
  },

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
            tip: 'These 3 sentences are high-frequency — practise typing them from memory.',
          },
          {
            type: 'Highlight Incorrect Words',
            content: 'Climate change adaptation strategies. Transcript had 4 incorrect words. Pace was fast — mark while listening, not after.',
            tip: 'Don\'t read ahead — follow the audio word by word. Click as you hear the mismatch.',
          },
          {
            type: 'Summarize Spoken Text',
            content: 'Psychology of procrastination — emotion regulation, fear of failure, perfectionism. Speaker\'s 3 strategies: time-boxing, reward systems, identity shift.',
            tip: 'Include all 3 strategies if time permits — they\'re the natural structure for your summary.',
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
