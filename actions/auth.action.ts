"use server";
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params: SignUpParams) {
  const { uid, email, name, password } = params;

  if (!uid || !email || !name || !password) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }
  try {
    const userExists = await db.collection("users").doc(uid).get(); // from firebase admin SDK

    if (userExists.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead.",
      };
    }

    await db.collection("users").doc(uid).set({
      email,
      name,
      password,
    });

    return {
      success: true,
      message: "Account created successfully.",
    };
  } catch (e: any) {
    console.error("Error during sign up:", e);

    if (e.code === "auth/email-already-in-use") {
      return {
        success: false,
        message: "Email is already in use. Please use a different email.",
      };
    }

    return {
      success: false,
      message: "Failed to create account.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email); // from firebase admin SDK

    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Please sign up instead.",
      };
    }

    // Set session cookie
    await setSessionCookie(idToken);
    return {
      success: true,
      message: "Sign in successful.",
    };
  } catch (e: any) {
    console.error("Error during sign in:", e);
    if (e.code === "auth/user-not-found") {
      return {
        success: false,
        message: "User does not exist. Please sign up instead.",
      };
    }
    return {
      success: false,
      message: "Failed to create account.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  try {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 7 * 1000, // 7 days
    });
    cookieStore.set("session", sessionCookie, {
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "lax",
      path: "/",
    });
  } catch (error) {
    console.error("Error getting session cookie:", error);
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return null;
    }

    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims?.uid)
      .get();
    if (!userRecord.exists) {
      return null;
    }
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return !!user; // Return true if user exists, false otherwise -> {object user data} -> !{object user data} = false -> !false = true
  } catch (error) {
    console.error("Error verifying authentication:", error);
    return false;
  }
}

