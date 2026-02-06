import { NextResponse } from "next/server";
import { ROLE_PERMISSIONS, Role } from "./roles";

export function permissionGuard(
  userRole: Role,
  requiredPermission: string
) {
  const permissions = ROLE_PERMISSIONS[userRole];

  if (!permissions.includes(requiredPermission as never)) {
    return NextResponse.json(
      { message: "Forbidden: Permission denied" },
      { status: 403 }
    );
  }
}
