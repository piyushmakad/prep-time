import { getCurrentUser } from "@/actions/auth.action";
import Agent from "@/components/Agent";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <h3>Interview Page</h3>
      <Agent
        userName={user?.name!}
        userId={user?.id}
        type="generate"
      />
    </>
  );
};

export default page;
