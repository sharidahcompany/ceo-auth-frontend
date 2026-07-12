"use server";

import { login } from "@/services/loginService";
import { LoginData } from "@/types";
import { handleAction } from "@/utils/handleAction";

export async function loginAction(data: LoginData) {
  return await handleAction(() => login(data));
}
