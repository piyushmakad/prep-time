import Vapi from "@vapi-ai/web";
import { VapiClient } from "@vapi-ai/server-sdk";

export const valiClient = new VapiClient({
  token: process.env.NEXT_PUBLIC_VAPI_PRIVATE_KEY!,
});
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
