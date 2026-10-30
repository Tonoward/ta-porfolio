"use client";
//React
import { useState } from "react";

//Components
import Button from "@/components/ui/Button";

//Turnstile
import { Turnstile } from "@marsidev/react-turnstile";

export default function EmailForm() {
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) return alert("Please complete the security check.");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      topic: formData.get("topic"),
      message: formData.get("message"),
    };
    console.log(data);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="col-span-2 flex flex-1 flex-col sm:col-span-1">
          <label htmlFor="name" className="text-lg font-semibold">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            className="mt-1 rounded-md border-1 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-2 flex flex-1 flex-col sm:col-span-1">
          <label htmlFor="email" className="text-lg font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="mt-1 rounded-md border-1 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <div className="flex flex-1 items-center">
            <label htmlFor="topic" className="text-lg font-semibold">
              Topic
            </label>
          </div>
          <input
            id="topic"
            name="topic"
            type="text"
            placeholder="Topic"
            className="mt-1 flex w-full rounded-md border-1 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="hidden">
          <label htmlFor="website">Phone</label>
          <input id="phone" name="website" type="tel" />
        </div>
      </div>
      <div>
        <div className="flex w-full flex-col">
          <label htmlFor="message" className="flex text-lg font-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            className="mt-1 flex h-32 w-full rounded-md border-1 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
      </div>
      {/* <div className="flex w-full items-center justify-center pt-4">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={(token) => setToken(token)}
        />
      </div> */}
      <div className="flex items-center justify-center">
        <Button className="mt-4" type="submit">
          Send Message
        </Button>
      </div>
    </form>
  );
}
