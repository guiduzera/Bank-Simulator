export interface Ijwt {
  _secret: string,
  _options: Record<string, string>,
  createToken(payload: string): string,
  verifyToken(token: string): string,
}

export interface Ibycript {
  encryptPassword(password: string): Promise<string>,
  comparePassword(password: string, encrypted: string): Promise<boolean>,
}
