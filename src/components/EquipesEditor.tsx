"use client";

import { useState } from "react";
import { PERFIL_ORDER, type PerfilKey } from "@/lib/perfis";

type Aluno = {
  id: string;
  name: string;
  serie: string | null;
  numeroEquipe: number | null;
  perfil: PerfilKey | null;
  perfilNome: string | null;
  perfilEmoji: string | null;
  perfilCor: string | null;
};

function sugerirEquipes(alunos: Aluno[], numEquipes: number) {
  const chaves: (PerfilKey | "SEM_TESTE")[] = [...PERFIL_ORDER, "SEM_TESTE"];
  const filas: Record<string, Aluno[]> = {};
  chaves.forEach((c) => (filas[c] = []));
  alunos.forEach((a) => {
    const chave = a.perfil ?? "SEM_TESTE";
    filas[chave].push(a);
  });

  const atualizacoes: Record<string, number> = {};
  let equipeAtual = 1;
  let restante = alunos.length;
  while (restante > 0) {
    for (const chave of chaves) {
      const fila = filas[chave];
      if (fila.length === 0) continue;
      const aluno = fila.shift() as Aluno;
      atualizacoes[aluno.id] = equipeAtual;
      restante--;
      equipeAtual = equipeAtual === numEquipes ? 1 : equipeAtual + 1;
    }
  }
  return atualizacoes;
}

export default function EquipesEditor({
  turmaId,
  alunosIniciais,
}: {
  turmaId: string;
  alunosIniciais: Aluno[];
}) {
  const [alunos, setAlunos] = useState<Aluno[]>(alunosIniciais);
  const [numEquipes, setNumEquipes] = useState(Math.max(1, Math.ceil(alunosIniciais.length / 5)) || 1);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  function aplicarSugestao() {
    const atualizacoes = sugerirEquipes(alunos, numEquipes);
    setAlunos((atuais) => atuais.map((a) => ({ ...a, numeroEquipe: atualizacoes[a.id] ?? a.numeroEquipe })));
    setMensagem(null);
  }

  function mudarEquipe(alunoId: string, valor: string) {
    const numero = valor === "" ? null : Number(valor);
    setAlunos((atuais) => atuais.map((a) => (a.id === alunoId ? { ...a, numeroEquipe: numero } : a)));
  }

  async function salvar() {
    setSalvando(true);
    setMensagem(null);
    try {
      const res = await fetch(`/api/turmas/${turmaId}/equipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          atribuicoes: alunos.map((a) => ({ alunoId: a.id, numeroEquipe: a.numeroEquipe })),
        }),
      });
      if (!res.ok) {
        setMensagem("Não foi possível salvar. Tente de novo.");
      } else {
        setMensagem("Equipes salvas! ✓");
      }
    } catch {
      setMensagem("Erro de conexão. Tente de novo.");
    } finally {
      setSalvando(false);
    }
  }

  if (alunos.length === 0) {
    return (
      <div className="card">
        <p className="nota" style={{ margin: 0 }}>
          Ainda não tem nenhum aluno nessa turma. Compartilhe o código com eles pra aparecerem aqui.
        </p>
      </div>
    );
  }

  const equipesAgrupadas = alunos.reduce<Record<number, Aluno[]>>((acc, a) => {
    const chave = a.numeroEquipe ?? 0;
    if (!acc[chave]) acc[chave] = [];
    acc[chave].push(a);
    return acc;
  }, {});

  return (
    <div>
      <div className="card">
        <h2>Formar equipes</h2>
        <p className="sub" style={{ marginTop: 0 }}>
          A sugestão automática distribui os perfis entre as equipes — depois é só ajustar manualmente quem quiser.
        </p>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <label htmlFor="numEquipes">Quantas equipes</label>
            <input
              id="numEquipes"
              type="number"
              min={1}
              max={alunos.length}
              value={numEquipes}
              onChange={(e) => setNumEquipes(Math.max(1, Number(e.target.value) || 1))}
              style={{ width: 90 }}
            />
          </div>
          <button
            type="button"
            onClick={aplicarSugestao}
            className="botao claro"
            style={{ border: "none", cursor: "pointer" }}
          >
            🔀 Sugerir equipes automaticamente
          </button>
          <button
            type="button"
            onClick={salvar}
            disabled={salvando}
            className="botao amarelo"
            style={{ border: "none", cursor: "pointer" }}
          >
            {salvando ? "Salvando…" : "💾 Salvar equipes"}
          </button>
        </div>
        {mensagem && (
          <p className="nota" style={{ marginTop: 10 }}>
            {mensagem}
          </p>
        )}
      </div>

      <div className="card">
        <h2>Alunos da turma ({alunos.length})</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {alunos.map((aluno) => (
            <div
              key={aluno.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                padding: "10px 0",
                borderBottom: "1px solid #e5e5e5",
                flexWrap: "wrap",
              }}
            >
              <div>
                <strong>{aluno.name}</strong>
                {aluno.serie && (
                  <span className="nota" style={{ marginLeft: 8 }}>
                    {aluno.serie}
                  </span>
                )}
                <div style={{ marginTop: 4 }}>
                  {aluno.perfil ? (
                    <span style={{ color: aluno.perfilCor ?? undefined, fontWeight: 600 }}>
                      {aluno.perfilEmoji} {aluno.perfilNome}
                    </span>
                  ) : (
                    <span className="nota">Ainda não fez o teste</span>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor={`equipe-${aluno.id}`} className="nota">
                  Equipe
                </label>
                <select
                  id={`equipe-${aluno.id}`}
                  value={aluno.numeroEquipe ?? ""}
                  onChange={(e) => mudarEquipe(aluno.id, e.target.value)}
                  style={{ marginLeft: 6, width: 100 }}
                >
                  <option value="">—</option>
                  {Array.from({ length: numEquipes }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      Equipe {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {Object.keys(equipesAgrupadas).some((k) => Number(k) > 0) && (
        <div className="card">
          <h2>Resumo por equipe</h2>
          {Object.entries(equipesAgrupadas)
            .filter(([numero]) => Number(numero) > 0)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([numero, membros]) => (
              <div key={numero} style={{ marginBottom: 14 }}>
                <strong>Equipe {numero}</strong>
                <ul className="lista-simples">
                  {membros.map((m) => (
                    <li key={m.id}>
                      {m.name} {m.perfilEmoji ? `— ${m.perfilEmoji} ${m.perfilNome}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
