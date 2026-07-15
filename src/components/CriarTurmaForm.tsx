"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CriarTurmaForm() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const res = await fetch("/api/turmas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error || "Não foi possível criar a turma.");
        setCarregando(false);
        return;
      }
      setNome("");
      setCarregando(false);
      router.refresh();
    } catch {
      setErro("Erro de conexão. Tente novamente.");
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <label htmlFor="nomeTurma">Nome da turma</label>
        <input
          id="nomeTurma"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: 1ª Série A"
          required
        />
      </div>
      <button
        type="submit"
        className="botao amarelo"
        disabled={carregando}
        style={{ border: "none", cursor: "pointer" }}
      >
        {carregando ? "Criando…" : "Criar turma"}
      </button>
      {erro && (
        <div className="erro" style={{ width: "100%" }}>
          {erro}
        </div>
      )}
    </form>
  );
}
