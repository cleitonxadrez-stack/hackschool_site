import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PERFIS, type PerfilKey } from "@/lib/perfis";
import EquipesEditor from "@/components/EquipesEditor";

export default async function TurmaPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { id?: string; role?: string } | undefined;

  if (!user?.id) {
    redirect(`/login?callbackUrl=/professor/turmas/${params.id}`);
  }
  if (user.role !== "PROFESSOR") {
    redirect("/teste");
  }

  const turma = await prisma.turma.findUnique({
    where: { id: params.id },
    include: {
      alunos: {
        include: {
          results: { orderBy: { createdAt: "desc" }, take: 1 },
        },
        orderBy: { name: "asc" },
      },
    },
  });

  if (!turma || turma.professorId !== user.id) {
    notFound();
  }

  const alunos = turma.alunos.map((aluno) => {
    const resultado = aluno.results[0] ?? null;
    const perfilKey = resultado ? (resultado.perfil as PerfilKey) : null;
    return {
      id: aluno.id,
      name: aluno.name,
      serie: aluno.serie,
      numeroEquipe: aluno.numeroEquipe,
      perfil: perfilKey,
      perfilNome: perfilKey ? PERFIS[perfilKey].nome : null,
      perfilEmoji: perfilKey ? PERFIS[perfilKey].emoji : null,
      perfilCor: perfilKey ? PERFIS[perfilKey].cor : null,
    };
  });

  return (
    <main className="molde">
      <div className="olho">HACK SCHOOL® · Área do Professor</div>
      <h1>{turma.nome}</h1>
      <p className="sub">
        Código da turma: <strong>{turma.codigo}</strong> — passe esse código pros seus alunos digitarem no cadastro
        deles.
      </p>

      <EquipesEditor turmaId={turma.id} alunosIniciais={alunos} />
    </main>
  );
}
