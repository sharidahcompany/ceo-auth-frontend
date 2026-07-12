"use server";

import { register } from "@/services/registerService";
import { RegisterData } from "@/types";
import { handleAction } from "@/utils/handleAction";

export async function registerAction(data: RegisterData) {
  return await handleAction(() => register(data));
}
