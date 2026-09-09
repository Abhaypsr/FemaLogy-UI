import React, { useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ProgressStepper from './components/ProgressStepper'
import QuestionnairePage from './components/QuestionnairePage'
import { defaultAnswers, optionGroups, wizardSteps } from './data/questionnaireConfig'

const pageConfig = {
  caseType: {
    key: 'caseType',
    question: 'What type of case is this?',
    options: optionGroups.caseType,
    title: 'What type of case is this?',
    description: 'Choose whether this matter is a new filing or an existing case record.'
  },
  caseCategory: {
    key: 'caseCategory',
    question: 'Select the case category',
    options: optionGroups.caseCategory['New Case'],
    title: 'Select the case category',
    description: 'This step depends on the case type selected in the previous step.'
  },
  country: {
    key: 'country',
    question: 'Which country is involved in this ODI case?',
    options: optionGroups.country,
    title: 'Select the country',
    description: 'This question is shown only when the category is ODI.'
  }
}

function SurveyPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentIndex = wizardSteps.findIndex((step) => step.path === location.pathname)
  const currentStep = wizardSteps[currentIndex] || wizardSteps[0]
  const currentKey = currentStep.id
  const isFinalStep = currentIndex === wizardSteps.length - 1
  const [answers, setAnswers] = useState(defaultAnswers)
  const [submitted, setSubmitted] = useState(false)

  const currentCaseType = answers.caseType
  const currentCaseCategory = answers.caseCategory

  const isCaseCategoryVisible = currentCaseType === 'New Case'
  const selectedValue = answers[currentKey]

  const resolvedOptions =
    currentKey === 'caseCategory'
      ? isCaseCategoryVisible
        ? optionGroups.caseCategory[currentCaseType] || []
        : []
      : currentKey === 'country' && currentCaseCategory !== 'ODI'
        ? []
        : pageConfig[currentKey].options

  const currentPage = pageConfig[currentKey]

  const progress = useMemo(
    () => ((currentIndex + 1) / wizardSteps.length) * 100,
    [currentIndex]
  )

  const handleAnswerSelect = (value) => {
    setSubmitted(false)

    if (currentKey === 'caseType') {
      setAnswers((previous) => ({
        ...previous,
        caseType: value,
        caseCategory: value === 'New Case' ? previous.caseCategory || '' : '',
        country: value === 'New Case' ? previous.country || '' : ''
      }))
      return
    }

    if (currentKey === 'caseCategory') {
      setAnswers((previous) => ({
        ...previous,
        caseCategory: value,
        country: value === 'ODI' ? previous.country || '' : ''
      }))
      return
    }

    setAnswers((previous) => ({
      ...previous,
      country: value
    }))
  }

  const handleNext = () => {
    if (!selectedValue || resolvedOptions.length === 0) return

    if (currentKey === 'caseCategory' && currentCaseType === 'Existing') {
      setSubmitted(true)
      return
    }

    if (currentKey === 'caseCategory' && currentCaseCategory === 'ODI') {
      navigate('/country')
      return
    }

    if (currentKey === 'caseType' && currentCaseType === 'Existing') {
      navigate('/category')
      return
    }

    if (isFinalStep) {
      setSubmitted(true)
      return
    }

    const nextIndex = currentIndex + 1
    navigate(wizardSteps[nextIndex].path)
  }

  const handleBack = () => {
    if (currentIndex === 0) return
    navigate(wizardSteps[currentIndex - 1].path)
  }

  const handleSubmit = () => {
    if (!selectedValue && currentKey !== 'country') return
    setSubmitted(true)
  }

  const goHome = () => {
    setAnswers(defaultAnswers)
    setSubmitted(false)
    navigate('/')
  }

  const underDevelopmentState =
    currentKey === 'caseCategory' && currentCaseType === 'Existing'
      ? {
          title: 'We are in development phase',
          message: 'This flow is not available right now.'
        }
      : currentKey === 'country' && currentCaseCategory !== 'ODI'
        ? {
            title: 'We are in development phase',
            message: 'This flow is not available right now.'
          }
        : null

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:py-10">
      <aside className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-lg font-bold text-white">
            F
          </div>
          <div>
            <span className="block text-base font-bold text-slate-900">FemaLogy</span>
            <small className="text-sm text-slate-500">Case workflow</small>
          </div>
        </div>

        <ProgressStepper steps={wizardSteps} currentStepIndex={currentIndex} />
      </aside>

      <main className="flex items-center justify-center rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-6 lg:p-8">
        {underDevelopmentState ? (
          <div className="w-full max-w-xl rounded-[28px] border border-amber-200 bg-amber-50 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-amber-700">
              Development status
            </span>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">{underDevelopmentState.title}</h1>
            <p className="mt-3 text-base leading-7 text-slate-600">{underDevelopmentState.message}</p>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:brightness-105"
                onClick={goHome}
              >
                Home
              </button>
            </div>
          </div>
        ) : (
          <QuestionnairePage
            title={currentPage.title}
            description={currentPage.description}
            progress={progress}
            stepNumber={currentIndex + 1}
            totalSteps={wizardSteps.length}
            question={currentPage.question}
            options={resolvedOptions}
            selectedValue={selectedValue}
            onSelect={handleAnswerSelect}
            onBack={currentIndex > 0 ? handleBack : null}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isFinal={isFinalStep}
            submitted={submitted}
          />
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/category" element={<SurveyPage />} />
        <Route path="/country" element={<SurveyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
