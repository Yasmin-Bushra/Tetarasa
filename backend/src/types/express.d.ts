declare global {
  namespace Express {
    interface Request {
      auth?: { userId: string; role: 'mother' | 'caregiver'; email: string };
    }
  }
}
export {};
