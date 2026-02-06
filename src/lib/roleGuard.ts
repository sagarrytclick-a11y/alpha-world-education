import { NextResponse } from "next/server";
import { Role } from "./roles";

export function roleGuard(
  userRole: Role,
  allowedRoles: Role[]
) {
  if (!allowedRoles.includes(userRole)) {
    return NextResponse.json(
      { message: "Forbidden: Access denied" },
      { status: 403 }
    );
  }

  return null;
}
