import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: string;
  role: string;
  permissions?: string[];
}

export function signToken(user: { _id: string; role: string; permissions?: string[] }) {
  return jwt.sign(
    { userId: user._id, role: user.role, permissions: user.permissions },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
}
