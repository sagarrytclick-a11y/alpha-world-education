import { Role } from "./roles";
import { verifyToken } from "./jwt";
type AuthSuccess = {
  user: {
    id: string;
    role: Role;
  };
};

type AuthError = {
  error: string;
  status: number;
};

export function authGuard(req: Request): AuthSuccess | AuthError {
  const token = req.headers.get("authorization");

  if (!token) {
    return { error: "Unauthorized", status: 401 };
  }

  
  const decoded = verifyToken(token.replace("Bearer ", ""));

  if (!decoded) {
    return { error: "Invalid token", status: 403 };
  }

  return {
    user: {
      id: decoded.userId,
      role: decoded.role as Role, 
    },
  };
} 

export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
