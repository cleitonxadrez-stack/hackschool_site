"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function CadastroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [escola, setEscola] = useState("");
  const [serie, setSerie] = useState("");
  const [souProfessor, setSouProfessor] = useState(false);
  const [codigoProfessor, setCodigoProfessor] = useState("");
  const [codigoTurma, setCodigoTurma] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          escola,
          serie,
          souProfessor,
          codigoProfessor,
          codigoTurma,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error || "Não foi possível criar a conta.");
        setCarregando(false);
        return;
      }

      // Cadastro OK — já loga automaticamente em seguida.
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (loginRes?.error) {
        setErro("Conta criada, mas houve um problema ao entrar. Tente fazer login.");
        setCarregando(false);
        return;
      }
      router.push(data.role === "PROFESSOR" ? "/professor" : "/teste");
    } catch {
      setErro("Erro de conexão. Tente novamente.");
      setCarregando(false);
    }
  }

  return (
    <main className="molde">
      <div className="olho">HACK SCHOOL® · Teste HackPerfil</div>
      <h1>Criar sua conta</h1>
      <p className="sub">Rápido — só o necessário para guardar o resultado do seu teste.</p>

      <form className="card" onSubmit={handleSubmit}>
        <label htmlFor="name">Nome completo</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <label htmlFor="password">Senha (mínimo 6 caracteres)</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />

        <label htmlFor="escola">Escola (opcional)</label>
        <input id="escola" value={escola} onChange={(e) => setEscola(e.target.value)} />

        {!souProfessor && (
          <>
            <label htmlFor="serie">Série (opcional)</label>
            <select id="serie" value={serie} onChange={(e) => setSerie(e.target.value)}>
              <option value="">Selecione</option>
              <option value="1a">1ª série do Ensino Médio</option>
              <option value="2a">2ª série do Ensino Médio</option>
              <option value="3a">3ª série do Ensino Médio</option>
              <option value="outro">Outro</option>
            </select>

            <label htmlFor="codigoTurma">Código da turma (opcional)</label>
            <input
              id="codigoTurma"
              value={codigoTurma}
              onChange={(e) => setCodigoTurma(e.target.value)}
              placeholder="Se o seu professor passou um código, coloque aqui"
            />
          </>
        )}

        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={souProfessor}
            onChange={(e) => setSouProfessor(e.target.checked)}
            style={{ width: "auto" }}
          />
          Sou professor
        </label>

        {souProfessor && (
          <>
            <label htmlFor="codigoProfessor">Código de professor</label>
            <input
              id="codigoProfessor"
              value={codigoProfessor}
              onChange={(e) => setCodigoProfessor(e.target.value)}
              placeholder="Código fornecido pela coordenação"
              required
            />
          </>
        )}

        {erro && <div className="erro">{erro}</div>}

        <button type="submit" className="botao amarelo full" style={{ marginTop: 22 }} disabled={carregando}>
          {carregando ? "Criando conta…" : "Criar conta e continuar"}
        </button>
      </form>

      <p className="nota">
        Já tem conta? <Link href="/login">Entrar</Link>
      </p>
    </main>
  );
}
