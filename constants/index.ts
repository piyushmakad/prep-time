import { CreateAssistantDTO, CreateWorkflowDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};

// export const feedbackSchema = z.object({
//   totalScore: z.number(),
//   categoryScores: z.tuple([
//     z.object({
//       name: z.literal("Communication Skills"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Technical Knowledge"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Problem Solving"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Cultural Fit"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Confidence and Clarity"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//   ]),
//   strengths: z.array(z.string()),
//   areasForImprovement: z.array(z.string()),
//   finalAssessment: z.string(),
// });

// export const generator: CreateWorkflowDTO = {
//   name: "jsm_interview_prep",
//   nodes: [
//     {
//       name: "introduction",
//       type: "conversation",
//       isStart: true,
//       metadata: {
//         position: {
//           x: 475.67996364813183,
//           y: -54.10780987001782
//         }
//       },
//       prompt: "Hey {{username}} ! Let's prepare your interview. I will ask you a few questions and generate a perfect interview just for you.Are you ready?",
//       messagePlan: {
//         firstMessage: ""
//       }
//     },
//     {
//       name: "Conversation",
//       type: "conversation",
//       metadata: {
//         position: {
//           x: 472.2889775724608,
//           y: 213.68011600933914
//         }
//       },
//       prompt: "What role would you like to train for?",
//       variableExtractionPlan: {
//         output: [
//           {
//             enum: [],
//             type: "string",
//             title: "role",
//             description: ""
//           }
//         ]
//       },
//       messagePlan: {
//         firstMessage: ""
//       }
//     },
//     {
//       name: "Conversation Copy",
//       type: "conversation",
//       metadata: {
//         position: {
//           x: 478.9225061368609,
//           y: 519.362361403776
//         }
//       },
//       prompt: "Are you aiming for a technical,behavioral or mixed interview?",
//       variableExtractionPlan: {
//         output : [
//           {
//             enum: [],
//             type: "string",
//             title: "type",
//             description: ""
//           }
//         ]
//       },
//       messagePlan: {
//         firstMessage: ""
//       }
//     },
//     {
//       name: "Conversation Copy Copy",
//       type: "conversation",
//       metadata: {
//         position: {
//           x: 466.6067046080565,
//           y: 793.3933263716362
//         }
//       },
//       prompt: "the job experience level ",
//       variableExtractionPlan: {
//         output: [
//           {
//             enum: [],
//             type: "string",
//             title: "level",
//             description: ""
//           }
//         ]
//       },
//       messagePlan: {
//         firstMessage: ""
//       }
//     },
//     {
//       name: "Conversation Copy Copy Copy",
//       type: "conversation",
//       metadata: {
//         position: {
//           x: 468.4703356236331,
//           y: 1073.4023715678463
//         }
//       },
//       prompt: "A list of technologies to cover during the job interview",
//       variableExtractionPlan: {
//         output: [
//           {
//             enum: [],
//             type: "string",
//             title: "techstack",
//             description: ""
//           }
//         ]
//       },
//       messagePlan: {
//         firstMessage: ""
//       }
//     },
//     {
//       name: "Conversation Copy Copy Copy Copy",
//       type: "conversation",
//       metadata: {
//         position: {
//           x: 472.39272549539623,
//           y: 1400.0736126514764
//         }
//       },
//       prompt: "How many questions would you like me to prepare? Provide amount",
//       variableExtractionPlan: {
//         output: [
//           {
//             enum: [],
//             type: "string",
//             title: "amount",
//             description: ""
//           }
//         ]
//       },
//       messagePlan: {
//         firstMessage: ""
//       }
//     },
//     {
//       name: "apiRequest",
//       type: "tool",
//       metadata: {
//         position: {
//           x: 465.7260588287295,
//           y: 1702.2009686944614
//         }
//       },
//       tool: {
//         url: "https://prep-time.vercel.app/api/vapi/generate",
//         body: {
//           type: "object",
//           required : [
//             "role",
//             "type",
//             "level",
//             "techstack",
//             "amount",
//             "userid"
//           ],
//           properties: {
//             role: {
//               type: "string",
//               value: "{{role}}",
//               description: ""
//             },
//             type: {
//               type: "string",
//               value: "{{type}}",
//               description: ""
//             },
//             level: {
//               type: "string",
//               value: "{{level}}",
//               description: ""
//             },
//             amount: {
//               type: "string",
//               value: "{{amount}}",
//               description: ""
//             },
//             userid: {
//               type: "string",
//               value: "{{userid}}",
//               description: ""
//             },
//             techstack: {
//               type: "string",
//               value: "{{techstack}}",
//               description: ""
//             }
//           }
//         },
//         name: "getInterviewData",
//         type: "apiRequest",
//         method: "POST",
//         function: {
//           name: "untitled_tool",
//           parameters: {
//             type: "object",
//             required: [],
//             properties: {}
//           }
//         }
//       }
//     },
//     {
//       name: "conversation_1751729704234",
//       type: "conversation",
//       metadata: {
//         position: {
//           x: 458.7616543223604,
//           y: 1942.9150960193026
//         }
//       },
//       prompt: "Thank you for the conversation.Your interview has been prepared.",
//       messagePlan: {
//         firstMessage: ""
//       }
//     },
//     {
//       name: "hangup_1751729847436",
//       type: "tool",
//       metadata: {
//         position: {
//           x: 457.90292757077384,
//           y: 2146.4857326435094
//         }
//       },
//       tool: {
//         type: "endCall"
//       }
//     }
//   ],
//   edges: [
//     {
//       from: "introduction",
//       to: "Conversation",
//       condition: {
//         type: "ai",
//         prompt: "if the user said yes"
//       }
//     },
//     {
//       from: "Conversation",
//       to: "Conversation Copy",
//       condition: {
//         type: "ai",
//         prompt: ""
//       }
//     },
//     {
//       from: "Conversation Copy",
//       to: "Conversation Copy Copy",
//       condition: {
//         type: "ai",
//         prompt: ""
//       }
//     },
//     {
//       from: "Conversation Copy Copy",
//       to: "Conversation Copy Copy Copy",
//       condition: {
//         type: "ai",
//         prompt: ""
//       }
//     },
//     {
//       from: "Conversation Copy Copy Copy",
//       to: "Conversation Copy Copy Copy Copy",
//       condition: {
//         type: "ai",
//         prompt: ""
//       }
//     },
//     {
//       from: "apiRequest",
//       to: "conversation_1751729704234",
//       condition: {
//         type: "ai",
//         prompt: ""
//       }
//     },
//     {
//       from: "Conversation Copy Copy Copy Copy",
//       to: "apiRequest",
//       condition: {
//         type: "ai",
//         prompt: ""
//       }
//     },
//     {
//       from: "conversation_1751729704234",
//       to: "hangup_1751729847436",
//       condition: {
//         type: "ai",
//         prompt: ""
//       }
//     }
//   ],
//   globalPrompt: ""
// }

// constants.ts - Updated VAPI Workflow Configuration

export const generator = {
  name: "jsm_interview_prep",

  assistant: {
    // Model configuration
    model: {
      provider: "openai",
      model: "gpt-4",
      temperature: 0.7,
      maxTokens: 1000,
    },

    // Voice configuration
    voice: {
      provider: "11labs", // or your preferred provider
      voiceId: "pNInz6obpgDQGcFmaJgB", // Replace with your voice ID
      speed: 1.0,
    },

    // First message
    firstMessage:
      "Hey {{username}}! Let's prepare your interview. I will ask you a few questions and generate a perfect interview just for you. Are you ready?",

    // Main conversation flow instructions
    instructions: `You are an AI interview preparation assistant. Follow this conversation flow:

1. First, greet the user and ask if they're ready to prepare for their interview.

2. If they say yes, ask: "What role would you like to train for?"
   - Extract the role and store it as {{role}}

3. Then ask: "Are you aiming for a technical, behavioral or mixed interview?"
   - Extract the type and store it as {{type}}

4. Then ask: "What is your job experience level?"
   - Extract the level and store it as {{level}}

5. Then ask: "What technologies should we cover during the interview? Please provide a list."
   - Extract the tech stack and store it as {{techstack}}

6. Finally ask: "How many questions would you like me to prepare? Please provide the amount."
   - Extract the amount and store it as {{amount}}

7. Once you have all the information, call the API to generate the interview questions using the getInterviewData function.

8. After the API call, say: "Thank you for the conversation. Your interview has been prepared."

9. Then end the call.

User Information:
- Username: {{username}}
- User ID: {{userid}}

Be conversational and helpful throughout the process.`,

    // Functions/Tools
    functions: [
      {
        name: "getInterviewData",
        description: "Generate interview questions based on user preferences",
        parameters: {
          type: "object",
          required: ["role", "type", "level", "techstack", "amount", "userid"],
          properties: {
            role: {
              type: "string",
              description: "The job role to prepare for",
            },
            type: {
              type: "string",
              description: "Type of interview: technical, behavioral, or mixed",
            },
            level: {
              type: "string",
              description: "Experience level for the job",
            },
            techstack: {
              type: "string",
              description: "Technologies to cover in the interview",
            },
            amount: {
              type: "string",
              description: "Number of questions to prepare",
            },
            userid: {
              type: "string",
              description: "User ID",
            },
          },
        },
      },
    ],

    // Server configuration for API calls
    serverUrl: "https://prep-time.vercel.app/api/vapi/generate",
    // serverUrlSecret: "your-webhook-secret", // Replace with your actual secret

    // End call configuration
    endCallMessage:
      "Thank you for using our interview preparation service. Good luck with your interview!",
    endCallPhrases: ["goodbye", "end call", "that's all", "thank you"],
  },
};

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];
