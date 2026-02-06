import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    
    const exam = await Exam.findOne({ slug });
    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam not found",
        },
        { status: 404 }
      );
    }

    if (!exam.exam_mode_enabled) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam mode is not enabled for this exam",
        },
        { status: 400 }
      );
    }

    if (!exam.exam_questions || exam.exam_questions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No questions available for this exam",
        },
        { status: 400 }
      );
    }

    // Shuffle questions for random order
    const shuffledQuestions = [...exam.exam_questions].sort(() => Math.random() - 0.5);
    
    // Remove correct answers from the response
    const questionsForExam = shuffledQuestions.map((q: any) => ({
      question: q.question,
      options: q.options,
      section: q.section,
      difficulty: q.difficulty,
      marks: q.marks,
      time_limit_seconds: q.time_limit_seconds
    }));

    return NextResponse.json({
      success: true,
      message: "Exam started successfully",
      data: {
        exam_id: exam._id,
        exam_name: exam.name,
        total_questions: questionsForExam.length,
        total_duration_mins: exam.exam_pattern?.total_duration_mins || 120,
        questions: questionsForExam
      }
    });
  } catch (error) {
    console.error("Error starting exam:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to start exam",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    const body = await request.json();
    const { answers, time_taken_seconds } = body;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        {
          success: false,
          message: "Answers are required and must be an array",
        },
        { status: 400 }
      );
    }

    const exam = await Exam.findOne({ slug });
    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam not found",
        },
        { status: 404 }
      );
    }

    let totalScore = 0;
    let correctAnswers = 0;
    const results = [];

    for (const userAnswer of answers) {
      const question = exam.exam_questions.find((q: any) => q.question === userAnswer.question);
      if (question) {
        const isCorrect = question.correct_answer === userAnswer.selected_option;
        if (isCorrect) {
          totalScore += question.marks;
          correctAnswers++;
        }
        
        results.push({
          question: question.question,
          selected_option: userAnswer.selected_option,
          correct_option: question.correct_answer,
          is_correct: isCorrect,
          marks: question.marks,
          section: question.section
        });
      }
    }

    const totalPossibleMarks = exam.exam_questions.reduce((sum: number, q: any) => sum + q.marks, 0);
    const percentage = totalPossibleMarks > 0 ? (totalScore / totalPossibleMarks) * 100 : 0;

    return NextResponse.json({
      success: true,
      message: "Exam submitted successfully",
      data: {
        exam_id: exam._id,
        exam_name: exam.name,
        total_questions: exam.exam_questions.length,
        correct_answers: correctAnswers,
        total_score: totalScore,
        total_possible_marks: totalPossibleMarks,
        percentage: Math.round(percentage * 100) / 100,
        time_taken_seconds: time_taken_seconds || 0,
        results: results
      }
    });
  } catch (error) {
    console.error("Error submitting exam:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit exam",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
