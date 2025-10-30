import { apiClient } from "@/libs";

export const playSlots = async ({creditAmount}: {creditAmount: number}) => {
    const data = await apiClient.post("/play", {creditAmount});
    return data.data;
}