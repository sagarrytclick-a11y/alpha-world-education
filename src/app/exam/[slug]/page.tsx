'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group-simple'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Clock, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Question {
  question: string
  options: string[]
  section: string
  difficulty: string
  marks: number
  time_limit_seconds: number
}

interface ExamData {
  exam_id: string
  exam_name: string
  total_questions: number
  total_duration_mins: number
  questions: Question[]
}

export default function ExamModePage() {
  const params = useParams()
  const router = useRouter()
  const [examData, setExamData] = useState<ExamData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Array<{question: string, selected_option: number}>>([])
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [examStarted, setExamStarted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.slug) {
      startExam()
    }
  }, [params.slug])

  useEffect(() => {
    if (examStarted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && examStarted) {
      submitExam()
    }
  }, [timeRemaining, examStarted])

  const startExam = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`/api/admin/exams/exam-mode/${params.slug}`)
      const result = await response.json()
      
      if (result.success) {
        setExamData(result.data)
        setTimeRemaining(result.data.total_duration_mins * 60)
        setExamStarted(true)
      } else {
        setError(result.message || 'Failed to start exam')
      }
    } catch (error) {
      setError('Error starting exam')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswerChange = (questionIndex: number, selectedOption: number) => {
    const question = examData!.questions[questionIndex]
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.question === question.question)
      if (existingIndex >= 0) {
        const newAnswers = [...prev]
        newAnswers[existingIndex] = { question: question.question, selected_option: selectedOption }
        return newAnswers
      } else {
        return [...prev, { question: question.question, selected_option: selectedOption }]
      }
    })
  }

  const getCurrentAnswer = () => {
    const currentQuestion = examData!.questions[currentQuestionIndex]
    const answer = answers.find(a => a.question === currentQuestion.question)
    return answer?.selected_option
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < examData!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const submitExam = async () => {
    if (!examData) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/exams/exam-mode/${examData.exam_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          time_taken_seconds: (examData.total_duration_mins * 60) - timeRemaining
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setResults(result.data)
        setShowResults(true)
      } else {
        setError('Failed to submit exam')
      }
    } catch (error) {
      setError('Error submitting exam')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    if (!examData) return 0
    return ((currentQuestionIndex + 1) / examData.questions.length) * 100
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exam...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => router.push('/')} className="w-full">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Exam Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-blue-600 mb-2">{results.percentage}%</h2>
                <p className="text-gray-600">
                  You scored {results.total_score} out of {results.total_possible_marks}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{results.correct_answers}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{results.total_questions - results.correct_answers}</div>
                  <div className="text-sm text-gray-600">Incorrect Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{results.total_questions}</div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{formatTime(results.time_taken_seconds)}</div>
                  <div className="text-sm text-gray-600">Time Taken</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Question Review</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {results.results.map((result: any, index: number) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      result.is_correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium mb-2">Question {index + 1}: {result.question}</p>
                          <div className="text-sm space-y-1">
                            <p>Your answer: Option {result.selected_option + 1}</p>
                            {!result.is_correct && (
                              <p className="text-green-600">Correct answer: Option {result.correct_option + 1}</p>
                            )}
                            <p className="text-gray-600">Section: {result.section} | Marks: {result.marks}</p>
                          </div>
                        </div>
                        <div className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                          result.is_correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {result.is_correct ? 'Correct' : 'Incorrect'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button onClick={() => router.push('/')} size="lg">
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!examData) {
    return null
  }

  const currentQuestion = examData.questions[currentQuestionIndex]
  const currentAnswer = getCurrentAnswer()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{examData.exam_name}</h1>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              <Clock className="h-4 w-4" />
              <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestionIndex + 1} of {examData.questions.length}</span>
              <span>{Math.round(getProgressPercentage())}% Complete</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Question {currentQuestionIndex + 1}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm">
                <span className="px-2 py-1 bg-gray-100 rounded">{currentQuestion.section}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{currentQuestion.difficulty}</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{currentQuestion.marks} marks</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg font-medium">{currentQuestion.question}</p>
            
            <RadioGroup
              value={currentAnswer?.toString()}
              onValueChange={(value: string) => handleAnswerChange(currentQuestionIndex, parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="text-sm text-gray-600">
            {answers.filter(a => a.selected_option !== undefined).length} of {examData.questions.length} questions answered
          </div>
          
          {currentQuestionIndex === examData.questions.length - 1 ? (
            <Button
              onClick={submitExam}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Exam'}
            </Button>
          ) : (
            <Button
              onClick={goToNextQuestion}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Question Navigation Grid */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Navigation</h3>
          <div className="grid grid-cols-10 gap-2">
            {examData.questions.map((_, index) => {
              const hasAnswer = answers.some(a => a.question === examData.questions[index].question && a.selected_option !== undefined)
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-blue-600 text-white border-blue-600'
                      : hasAnswer
                      ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
