import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PERFIL_ORDER, PERFIS, type PerfilKey } from "@/lib/perfis";

export default async function ResultadoPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    redirect(`/login?callbackUrl=/resultado/${params.id}`);
  }

  const resultado = await prisma.testResult.findUnique({ where: { id: params.id } });
  if (!resultado || resultado.userId !== userId) {
    notFound();
  }

  const perfil = PERFIS[resultado.perfil as PerfilKey];
  const scores: Record<PerfilKey, number> = {
    CREATOR: resultado.scoreCreator,
    BUILDER: resultado.scoreBuilder,
    CONNECTOR: resultado.scoreConnector,
    TECH_MAKER: resultado.scoreTechMaker,
    LEADER: resultado.scoreLeader,
  };
  const total = PERFIL_ORDER.reduce((s, k) => s + scores[k], 0) || 1;

  return (
    <main className="molde">
      <div className="olho">Seu resultado · HackPerfil</div>

      <div className="card">
        <div className="perfil-hero">
          <div className="perfil-emoji">{perfil.emoji}</div>
          <div className="perfil-nome" style={{ color: perfil.cor }}>
            {perfil.nome}
          </div>
          <div className="perfil-tagline">{perfil.tagline}</div>
        </div>

        <p className="sub" style={{ marginTop: 18, textAlign: "center" }}>
          {perfil.descricao}
        </p>

        <div className="tagchips" style={{ justifyContent: "center" }}>
          {perfil.caracteristicas.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Como você contribui para a equipe</h2>
        <ul className="lista-simples">
          {perfil.contribuicoes.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Sua pontuação em cada perfil</h2>
        <div className="barras">
          {PERFIL_ORDER.map((key) => {
            const p = PERFIS[key];
            const pct = Math.round((scores[key] / total) * 100);
            return (
              <div className="barra-linha" key={key}>
                <div className="barra-label">
                  {p.emoji} {p.nome}
                </div>
                <div className="barra-fundo">
                  <div className="barra-preenchida" style={{ width: `${pct}%`, background: p.cor }} />
                </div>
                <div className="barra-valor">{scores[key]}</div>
              </div>
            );
          })}
        </div>
        <p className="nota" style={{ textAlign: "left", marginTop: 14 }}>
          Ninguém é só um perfil — todo mundo exercita um pouco de cada um. O perfil predominante é só o seu ponto de
          partida natural dentro de uma equipe.
        </p>
      </div>

      <div className="card" style={{ background: "var(--amarelo-claro)", borderColor: "var(--amarelo)" }}>
        <h2>🏅 A Regra de Ouro da formação de equipes</h2>
        <p style={{ fontSize: 14, color: "var(--tinta)", lineHeight: 1.6 }}>
          Toda equipe do HACK SCHOOL é montada com pelo menos um representante de cada um dos cinco perfis. Leve seu
          resultado para o seu Professor Mentor na hora de formar os grupos do próximo RACK.
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
        <Link href="/teste" className="botao claro">
          Refazer o teste
        </Link>
        <a href="https://www.hackschool.app" target="_blank" rel="noopener" className="botao preto">
          Voltar para hackschool.app
        </a>
      </div>
    </main>
  );
}
