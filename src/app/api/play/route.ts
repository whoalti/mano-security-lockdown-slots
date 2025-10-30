import { slotsGame } from "@/libs";
import { playRequestSchema } from "@/schemas/playRequest";
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedBody = playRequestSchema.safeParse(body)

        if (!validatedBody.success) {
            return new Response(JSON.stringify({error: validatedBody.error.message}), {status: 400});
        }

        const { creditAmount } = validatedBody.data;

        const res = slotsGame.roll(creditAmount);

        return new Response(JSON.stringify(res), {status: 200});
        
    } catch (error) {
		const url = new URL(request.url);
		console.error("[API Error]", {
			method: "POST",
			path: url.pathname,
			message: error instanceof Error ? error.message : String(error),
			stack: error instanceof Error ? error.stack : undefined,
		});
        return new Response(JSON.stringify({error: "An unexpected error occurred"}), {status: 500});
    }

}