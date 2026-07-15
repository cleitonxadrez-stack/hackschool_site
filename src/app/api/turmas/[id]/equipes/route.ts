import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { id?: string; role?: string } | undefined;

  if (!user?.id || user.role !== "PROFESSOR") {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
  }

  const turma = await prisma.turma.findUnique({ where: { id: params.id } });
  if (!turma || turma.professorId !== user.id) {
    return NextResponse.json({ error: "Turma não encontrada." }, { status: 404 });
  }

  const body = await req.json();
  const atribuicoes: { alunoId: string; numeroEquipe: number | null }[] = body.atribuicoes || [];

  await Promise.all(
    atribuicoes.map(({ alunoId, numeroEquipe }) =>
      prisma.user.updateMany({
        where: { id: alunoId, turmaId: turma.id },
        data: { numeroEquipe: numeroEquipe ?? null },
      })
    )
  );

  return NextResponse.json({ ok: true });
}
