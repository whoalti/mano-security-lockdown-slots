import {Game} from "@/components/Game";
import {Rules} from "@/components/Rules";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Lockdown Casino
      </h1>
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8">
        <Game />
        <Rules />
      </div>
    </div>
  );
}
