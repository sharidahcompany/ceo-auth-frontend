import { ActionResponse, ApiErrorData } from "@/types";
import { AxiosError } from "axios";
import { getTranslations } from "next-intl/server";

export async function handleAction<T>(
  apiCall: () => Promise<T>,
): Promise<ActionResponse<T>> {
  const t = await getTranslations("errors");

  try {
    const result = await apiCall();
    return {
      success: true,
      data: result,
      error: null,
      errors: null,
      status: 200,
    };
  } catch (err) {
    const error = err as AxiosError<ApiErrorData>;

    console.log(error);


    if (error.response) {
      return {
        success: false,
        data: null,
        status: error.response.status,
        error: error.response.data?.message || t("something_went_wrong"),
        errors: error.response.data?.errors || null,
        firstError: error.response.data?.errors
          ? (Object.values(error.response.data.errors).flat()[0] as string)
          : null,
      };
    }

    return {
      success: false,
      data: null,
      status: 500,
      error: t("network_error"),
      errors: null,
    };
  }
}
