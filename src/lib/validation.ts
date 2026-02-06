import { NextResponse } from "next/server";

export class ValidationError extends Error {
  constructor(message: string, public details?: unknown) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function handleApiError(error: unknown) {
  console.error('💥 API Error:', error);

  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        error: error.details,
        type: 'validation_error'
      },
      { status: 400 }
    );
  }

  if (error instanceof Error && error.name === 'MongoServerError' && 'code' in error && error.code === 11000) {
    // Duplicate key error
    const mongoError = error as unknown as { keyPattern: Record<string, number> };
    const field = Object.keys(mongoError.keyPattern)[0];
    return NextResponse.json(
      {
        success: false,
        message: `${field} already exists`,
        error: `A record with this ${field} already exists. Please use a different value.`,
        type: 'duplicate_error'
      },
      { status: 409 }
    );
  }

  // Generic server error
  return NextResponse.json(
    {
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : "Something went wrong",
      type: 'server_error'
    },
    { status: 500 }
  );
}

export function validateRequiredFields(data: Record<string, unknown>, requiredFields: string[]) {
  const missing = requiredFields.filter(field => !data[field]);
  if (missing.length > 0) {
    throw new ValidationError(
      `Missing required fields: ${missing.join(', ')}`,
      { missingFields: missing }
    );
  }
}

export function createSuccessResponse(data: unknown, message: string = "Operation successful") {
  return NextResponse.json({
    success: true,
    message,
    data
  });
}
