import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
  return Response.json(
    { success: true, message: "VAPI SDK is ready to use" },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const { type, role, techstack, level, amount, userid } =
      await request.json();
    if (!type || !role || !techstack || !level || !amount || !userid) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const prompt = `Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${level}.
The tech stack used in the job is: ${techstack}.
The focus between behavioural and technical questions should lean towards: ${type}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]
Thank you! <3`;

    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt,
    });

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    console.log("✅ Interview saved successfully");

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Unexpected error in /api/vapi/generate", err);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
