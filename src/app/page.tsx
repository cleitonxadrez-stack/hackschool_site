import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PERFIL_ORDER, PERFIS } from "@/lib/perfis";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="molde">
      <div className="olho">HACK SCHOOL® · Teste HackPerfil</div>
      <h1>Descubra qual dos 5 Perfis de Talentos é o seu</h1>
      <p className="sub">
        No HACK SCHOOL não existem alunos melhores ou piores — existem talentos diferentes. Responda 12 perguntas
        rápidas e descubra qual perfil predomina em você: Creator, Builder, Connector, Tech Maker ou Leader.
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
        {session ? (
          <Link href="/teste" className="botao amarelo">
            📝 Fazer o teste agora
          </Link>
        ) : (
          <>
            <Link href="/cadastro" className="botao amarelo">
              📝 Criar conta e fazer o teste
            </Link>
            <Link href="/login" className="botao claro">
              Já tenho conta — Entrar
            </Link>
          </>
        )}
      </div>

      <div className="card">
        <h2>Os 5 perfis</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginTop: 12 }}>
          {PERFIL_ORDER.map((key) => {
            const p = PERFIS[key];
            return (
              <div
                key={key}
                style={{
                  border: "1px solid var(--linha)",
                  borderTop: `4px solid ${p.cor}`,
                  borderRadius: 14,
                  padding: "16px 14px",
                }}
              >
                <div style={{ fontSize: 26 }}>{p.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: 15, marginTop: 4 }}>{p.nome}</div>
                <div style={{ fontSize: 12.5, color: "var(--suave)", marginTop: 2 }}>{p.tagline}</div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="nota">
        Já é uma escola parceira? Voltar para{" "}
        <a href="https://www.hackschool.app" target="_blank" rel="noopener">
          hackschool.app
        </a>
      </p>
    </main>
  );
}
