import { z } from "zod";

export const playRequestSchema = z.object({
    creditAmount: z.number().min(0, "Credit amount must be greater than 0"),
});