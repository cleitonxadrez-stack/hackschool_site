import { withAuth } from "next-auth/middleware";
// Protege as rotas que exigem login: só quem está autenticado chega no
// /teste ou na /professor. O NextAuth já redireciona para /login (definido
// em auth.ts) com um callbackUrl de volta para a página original.
export default withAuth({
  pages: {
    signIn: "/login",
  },
});
export const config = {
  matcher: ["/teste/:path*", "/professor/:path*"],
};
