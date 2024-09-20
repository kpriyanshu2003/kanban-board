"use server";
import api from ".";

export async function register(formData: string) {
  const { email, password } = JSON.parse(formData);
  try {
    const response = await fetch(api + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Failed to signup");

    return await response.json();
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
}
export async function login(formData: string) {
  const { email, password } = JSON.parse(formData);
  try {
    const response = await fetch(api + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Failed to login");
    return await response.json();
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
}
