import React from 'react'

export default function QuestionnairePage({
  title,
  description,
  progress,
  stepNumber,
  totalSteps,
  question,
  options,
  selectedValue,
  onSelect,
  onBack,
  onNext,
  onSubmit,
  isFinal,
  submitted
}) {
  return (
    <div className="w-full max-w-5xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-blue-700">
          Step {stepNumber} of {totalSteps}
        </span>

        <div className="min-w-[70px] rounded-full bg-blue-50 px-3 py-1.5 text-center text-sm font-bold text-blue-700" aria-label="Current progress">
          {Math.round(progress)}%
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
      </div>

      <div className="mt-6">
        <h2 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl">{question}</h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {options.map((option) => {
            const isSelected = selectedValue === option.value

            return (
              <button
                key={option.value}
                type="button"
                className={[
                  'group rounded-2xl border p-4 text-left transition-all duration-200',
                  isSelected
                    ? 'border-blue-300 bg-blue-50 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.15)]'
                    : 'border-slate-200 bg-slate-50 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50'
                ].join(' ')}
                onClick={() => onSelect(option.value)}
              >
                <span className="block text-base font-bold text-slate-900">{option.label}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{option.description}</span>
              </button>
            )
          })}
        </div>
      </div>

      {submitted && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800" role="status" aria-live="polite">
          Questionnaire submitted successfully.
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {onBack ? (
          <button type="button" className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200" onClick={onBack}>
            Back
          </button>
        ) : <span />}

        {isFinal ? (
          <button type="button" className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:brightness-105" onClick={onSubmit}>
            Submit questionnaire
          </button>
        ) : (
          <button type="button" className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50" onClick={onNext} disabled={!selectedValue}>
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
