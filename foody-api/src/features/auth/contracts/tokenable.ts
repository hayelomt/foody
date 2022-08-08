export default interface Tokenable {
  generateAuthTokens(
    id: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  verifyRefreshToken(token: string): Promise<string>;
}
