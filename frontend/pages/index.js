import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import axios from "axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const result = await axios.post("http://localhost:4200/check", {
        url: "https://www.google.com",
      });
      setResponse(result.data);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <div className="flex flex-col gap-4 text-base justify-center items-center font-medium">
        <button
          onClick={handleCheck}
          disabled={loading}
          className="flex h-12 w-40 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check"}
        </button>
        {response && (
          <div className="mt-4 p-4 rounded border border-gray-300 dark:border-gray-700 text-sm">
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
