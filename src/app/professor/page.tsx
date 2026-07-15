import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CriarTurmaForm from "@/components/CriarTurmaForm";

export default async function ProfessorPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { id?: string; role?: string } | undefined;

  if (!user?.id) {
    redirect("/login?callbackUrl=/professor");
  }
  if (user.role !== "PROFESSOR") {
    redirect("/teste");
  }

  const turmas = await prisma.turma.findMany({
    where: { professorId: user.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { alunos: true } } },
  });

  return (
    <main className="molde">
      <div className="olho">HACK SCHOOL® · Área do Professor</div>
      <h1>Suas turmas</h1>
      <p className="sub">
        Crie uma turma, compartilhe o código com os alunos e acompanhe os perfis pra formar as equipes.
      </p>

      <div className="card">
        <h2>Criar nova turma</h2>
        <CriarTurmaForm />
      </div>

      {turmas.length === 0 ? (
        <p className="nota" style={{ marginTop: 20 }}>
          Você ainda não criou nenhuma turma.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
          {turmas.map((turma) => (
            <Link
              key={turma.id}
              href={`/professor/turmas/${turma.id}`}
              className="card"
              style={{ display: "block", textDecoration: "none" }}
            >
              <h2 style={{ marginBottom: 4 }}>{turma.nome}</h2>
              <p className="nota" style={{ margin: 0 }}>
                Código: <strong>{turma.codigo}</strong> · {turma._count.alunos} aluno
                {turma._count.alunos === 1 ? "" : "s"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
