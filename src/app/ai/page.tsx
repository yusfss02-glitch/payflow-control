"use client";

import { FormEvent, useState } from "react";

export default function AIPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!question.trim()) {
      return;
    }

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "PayFlow AI request failed."
        );
      }

      setAnswer(data.answer || "");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            PayFlow AI Assistant
          </h1>

          <p className="mt-2 text-gray-600">
            Ask questions about the PayFlow Control product
            documentation.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <label
            htmlFor="question"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Your question
          </label>

          <textarea
            id="question"
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            placeholder="Example: What are the main capabilities of PayFlow Control?"
            className="min-h-32 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-gray-500"
          />

          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="mt-4 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask PayFlow AI"}
          </button>
        </form>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        )}

        {answer && (
          <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              AI Answer
            </h2>

            <div className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
              {answer}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}