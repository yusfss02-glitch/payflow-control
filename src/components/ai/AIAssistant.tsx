"use client";

import { FormEvent, useState } from "react";

type AIAssistantProps = {
  onClose: () => void;
  onExpand: () => void;
};

export default function AIAssistant({
  onClose,
  onExpand,
}: AIAssistantProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!question.trim() || loading) {
      return;
    }

    const submittedQuestion = question.trim();

    setQuestion("");
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
          question: submittedQuestion,
        }),
      });

      const responseText = await response.text();

      let data: {
        success?: boolean;
        answer?: string;
        error?: string;
      };

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `AI service returned an unexpected response (${response.status}).`
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            `PayFlow AI request failed (${response.status}).`
        );
      }

      setAnswer(data.answer || "");
    } catch (error) {
      console.error("PayFlow AI frontend error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting PayFlow AI."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleQuestionKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      if (!loading && question.trim()) {
        event.currentTarget.form?.requestSubmit();
      }
    }
  }

  return (
    <div className="h-full w-full">

      {/* AI PANEL */}

      <aside className="flex h-full w-full flex-col border-l border-slate-200 bg-white shadow-2xl">

        {/* HEADER */}

        <header className="flex h-[73px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5">

          <div className="flex items-center gap-3">

            {/* AI LOGO */}

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >

                <path
                  d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z"
                  fill="currentColor"
                />

                <path
                  d="M19 15L19.8 17.2L22 18L19.8 18.8L19 21L18.2 18.8L16 18L18.2 17.2L19 15Z"
                  fill="currentColor"
                />

              </svg>

            </div>

            <div>

              <h1 className="text-sm font-semibold tracking-tight text-slate-900">
                PayFlow AI Assistant
              </h1>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Product Knowledge Assistant
              </p>

            </div>

          </div>

          {/* HEADER ACTIONS */}

          <div className="flex items-center gap-1">

            {/* EXPAND */}

            <button
              type="button"
              onClick={onExpand}
              aria-label="Expand AI Assistant"
              title="Expand"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >

              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >

                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                <path d="M16 3h3a2 2 0 0 1 2 2v3" />
                <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />

              </svg>

            </button>

            {/* CLOSE */}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close AI Assistant"
              title="Close"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >

                <path d="M6 6L18 18" />
                <path d="M18 6L6 18" />

              </svg>

            </button>

          </div>

        </header>

        {/* CONTENT */}

        <div className="flex min-h-0 flex-1 flex-col bg-slate-50">

          {/* INTRO */}

          <div className="border-b border-slate-200 bg-white px-5 py-5">

            <p className="text-sm leading-6 text-slate-600">
              Ask questions about the PayFlow Control product
              documentation.
            </p>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              Documentation connected

            </div>

          </div>

          {/* ANSWER AREA */}

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">

            {/* LOADING */}

            {loading && (
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">

                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >

                      <path
                        d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z"
                        fill="currentColor"
                      />

                    </svg>

                  </div>

                  <div>

                    <p className="text-sm font-medium text-slate-900">
                      PayFlow AI is thinking...
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Reviewing the product documentation.
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">

                <p className="font-medium">
                  Unable to get an answer
                </p>

                <p className="mt-1 leading-6">
                  {error}
                </p>

              </div>
            )}

            {/* ANSWER */}

            {!loading && !error && answer && (
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="mb-4 flex items-center gap-2">

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-white">

                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >

                      <path
                        d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z"
                        fill="currentColor"
                      />

                    </svg>

                  </div>

                  <h2 className="text-sm font-semibold text-slate-900">
                    AI Answer
                  </h2>

                </div>

                <div className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                  {answer}
                </div>

              </section>
            )}

            {/* EMPTY STATE */}

            {!loading && !error && !answer && (
              <div className="flex h-full min-h-[240px] items-center justify-center">

                <div className="max-w-sm text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">

                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >

                      <path
                        d="M12 3L13.8 8.2L19 10L13.8 11.8L12 17L10.2 11.8L5 10L10.2 8.2L12 3Z"
                        fill="currentColor"
                      />

                      <path
                        d="M19 15L19.8 17.2L22 18L19.8 18.8L19 21L18.2 18.8L16 18L18.2 17.2L19 15Z"
                        fill="currentColor"
                      />

                    </svg>

                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-800">
                    Ask PayFlow AI
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Get answers based on the PayFlow Control
                    product documentation.
                  </p>

                </div>

              </div>
            )}

          </div>

          {/* QUESTION FORM */}

          <div className="shrink-0 border-t border-slate-200 bg-white p-5">

            <form onSubmit={handleSubmit}>

              <label
                htmlFor="ai-question"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
              >
                Your question
              </label>

              <textarea
                id="ai-question"
                value={question}
                onChange={(event) =>
                  setQuestion(event.target.value)
                }
                onKeyDown={handleQuestionKeyDown}
                disabled={loading}
                placeholder="Ask about the product, capabilities, scope, users, or decisions..."
                className="min-h-[100px] w-full resize-none rounded-xl border border-slate-300 bg-white p-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:bg-slate-50"
              />

              <div className="mt-3 flex items-center justify-between gap-3">

                <p className="text-[11px] leading-4 text-slate-400">
                  Press Enter to ask. Shift + Enter for a new line.
                </p>

                <button
                  type="submit"
                  disabled={
                    loading || !question.trim()
                  }
                  className="shrink-0 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading
                    ? "Thinking..."
                    : "Ask AI"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </aside>
    </div>
  );
}