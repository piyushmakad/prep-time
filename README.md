# PrepTime

**Practice job interviews with an AI voice interviewer and structured feedback.**

[Try the live app](https://prep-time.vercel.app/)

PrepTime lets a candidate choose a role, experience level, tech stack, and interview type. Gemini generates relevant questions, a Vapi voice agent conducts the interview, and Gemini turns the transcript into scored feedback. Firebase handles authentication and stores interviews and feedback.

## How it works

1. The candidate chooses an interview role, level, tech stack, question count, and technical or behavioral focus.
2. The [question-generation route](app/api/vapi/generate/route.ts) uses Gemini to create interview questions and stores the interview in Firestore.
3. The [voice agent](components/Agent.tsx) runs the interview with Vapi and captures the conversation transcript.
4. The [feedback action](actions/general.action.ts) uses Gemini structured output to score communication, technical knowledge, problem-solving, role fit, and confidence. It stores strengths, improvement areas, and a final assessment in Firestore.
5. Signed-in users can revisit their interview history and feedback.

## Stack

Next.js, React, TypeScript, Vapi, Gemini via the AI SDK, Firebase Authentication, Firestore, and Tailwind CSS.

## Run locally

1. Install Node.js and run `npm install`.
2. Create a Firebase project and a Vapi account. Configure the Firebase client and admin credentials, a Gemini API key, and the Vapi public/private keys in `.env.local`. The application reads the required variable names from [`firebase/client.ts`](firebase/client.ts), [`firebase/admin.ts`](firebase/admin.ts), [`lib/vapi.sdk.ts`](lib/vapi.sdk.ts), and the AI generation routes.
3. Run `npm run dev` and open `http://localhost:3000`.

Do not commit service-account keys or API keys. Voice interviews and model calls require the external services above.
