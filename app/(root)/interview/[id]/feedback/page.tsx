import { getCurrentUser } from "@/actions/auth.action";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/actions/general.action";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  console.log("Feedback for interview:", feedback);
  return <div>page</div>;
};

export default page;
