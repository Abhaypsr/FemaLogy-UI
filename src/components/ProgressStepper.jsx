import React from 'react'

export default function ProgressStepper({ steps, currentStepIndex }) {
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between text-xs font-medium text-slate-500">
        <span>Progress</span>
        <strong className="text-sm font-semibold text-slate-800">{Math.round(progressPercentage)}%</strong>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200" aria-label="Questionnaire progress">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400" style={{ width: `${progressPercentage}%` }} />
      </div>

      <div className="mt-4 space-y-3" aria-label="Questionnaire steps">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex
          const isCompleted = index < currentStepIndex

          return (
            <div
              key={step.id}
              className={[
                'flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-all',
                isActive ? 'border-blue-200 bg-blue-50 text-blue-700' : '',
                isCompleted ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-slate-50 text-slate-500'
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white',
                  isActive ? 'bg-blue-600' : isCompleted ? 'bg-emerald-500' : 'bg-slate-400'
                ].join(' ')}
              >
                {index + 1}
              </span>
              <span>{step.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
