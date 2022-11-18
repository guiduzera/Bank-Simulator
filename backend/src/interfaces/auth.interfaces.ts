export interface Ijwt {
  createToken(payload: string): string,
  verifyToken(token: string): string,
}

export interface Ibycript {
  encryptPassword(password: string): Promise<string>,
  comparePassword(password: string, encrypted: string): Promise<boolean>,
}
