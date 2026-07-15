"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { PERGUNTAS, type PerfilKey } from "@/lib/perfis";

export default function TestePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<(PerfilKey | null)[]>(Array(PERGUNTAS.length).fill(null));
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const pergunta = PERGUNTAS[passo];
  const progresso = Math.round(((passo + 1) / PERGUNTAS.length) * 100);

  function escolher(perfil: PerfilKey) {
    const novas = [...respostas];
    novas[passo] = perfil;
    setRespostas(novas);

    setTimeout(() => {
      if (passo < PERGUNTAS.length - 1) {
        setPasso(passo + 1);
      } else {
        enviar(novas);
      }
    }, 220);
  }

  async function enviar(respostasFinais: (PerfilKey | null)[]) {
    if (respostasFinais.some((r) => r === null)) return;
    setEnviando(true);
    setErro(null);
    try {
      const res = await fetch("/api/teste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ respostas: respostasFinais }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error || "Não foi possível calcular o resultado.");
        setEnviando(false);
        return;
      }
      router.push(`/resultado/${data.resultId}`);
    } catch {
      setErro("Erro de conexão. Tente novamente.");
      setEnviando(false);
    }
  }

  return (
    <>
      <div className="topbar">
        <div className="marca">⚡ HackPerfil</div>
        {session?.user?.name && (
          
            className="sair"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              signOut({ callbackUrl: "/" });
            }}
          >
            Sair ({session.user.name.split(" ")[0]})
          </a>
        )}
      </div>
      <main className="molde">
        <div className="progresso-wrap">
          <div className="progresso-barra" style={{ width: `${progresso}%` }} />
        </div>

        <div className="pergunta-num">
          Pergunta {passo + 1} de {PERGUNTAS.length}
        </div>
        <h2 style={{ fontSize: 20, marginBottom: 6 }}>{pergunta.texto}</h2>

        <div>
          {pergunta.opcoes.map((op, i) => (
            <button
              key={i}
              type="button"
              className={`opcao${respostas[passo] === op.perfil ? " selecionada" : ""}`}
              onClick={() => escolher(op.perfil)}
              disabled={enviando}
            >
              {op.texto}
            </button>
          ))}
        </div>

        {erro && <div className="erro">{erro}</div>}
        {enviando && <p className="nota">Calculando seu resultado…</p>}

        {passo > 0 && !enviando && (
          <p className="nota">
            
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPasso(passo - 1);
              }}
            >
              ← Voltar para a pergunta anterior
            </a>
          </p>
        )}
      </main>
    </>
  );
}
