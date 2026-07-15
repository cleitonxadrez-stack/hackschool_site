"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/teste";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) {
      setErro("E-mail ou senha incorretos.");
      setCarregando(false);
      return;
    }
    router.push(callbackUrl);
  }

  return (
    <main className="molde">
      <div className="olho">HACK SCHOOL® · Teste HackPerfil</div>
      <h1>Entrar</h1>
      <p className="sub">Acesse sua conta para fazer o teste ou ver seu resultado.</p>

      <form className="card" onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {erro && <div className="erro">{erro}</div>}

        <button type="submit" className="botao amarelo full" style={{ marginTop: 22 }} disabled={carregando}>
          {carregando ? "Entrando…" : "Entrar"}
        </button>
      </form>

      <p className="nota">
        Ainda não tem conta? <Link href="/cadastro">Criar conta</Link>
      </p>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
