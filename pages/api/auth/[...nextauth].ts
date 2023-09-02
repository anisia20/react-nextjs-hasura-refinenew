import NextAuth, { Session } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // !!! Should be stored in .env file.
    KeycloakProvider({
      clientId: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET!,
      issuer: process.env.NEXT_PUBLIC_AUTH_ISSUER!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email,
        };
      },
    }),
  ],
  callbacks: {
     /**
     * JWT Callback
     * 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행
     * 반환된 값은 암호화되어 쿠키에 저장됨
     */
    async jwt({ token, profile }: any) {
      if (profile) {
        // Add a new prop on token for user data
        token.compcode = profile.compcode;
      }
      return token;
    },
     /**
     * Session Callback
     * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
     * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
     * JWT 토큰의 정보를 Session에 유지 시킨다.
     */
    async session({ session, token }: any) {
      session.token = token;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET!,
};
export default NextAuth(authOptions);
