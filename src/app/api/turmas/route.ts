import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function gerarCodigo(): string {
  const alfabeto = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let codigo = "";
  for (let i = 0; i < 6; i++) {
    codigo += alfabeto[Math.floor(Math.random() * alfabeto.length)];
  }
  return codigo;
}

async function getProfessorSession() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { id?: string; role?: string } | undefined;
  if (!user?.id || user.role !== "PROFESSOR") return null;
  return user;
}

export async function GET() {
  const professor = await getProfessorSession();
  if (!professor) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
  }

  const turmas = await prisma.turma.findMany({
    where: { professorId: professor.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { alunos: true } } },
  });

  return NextResponse.json({ turmas });
}

export async function POST(req: Request) {
  const professor = await getProfessorSession();
  if (!professor) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
  }

  const body = await req.json();
  const nome = (body.nome || "").trim();
  if (!nome) {
    return NextResponse.json({ error: "Digite um nome para a turma." }, { status: 400 });
  }

  let codigo = gerarCodigo();
  for (let tentativas = 0; tentativas < 5; tentativas++) {
    const existente = await prisma.turma.findUnique({ where: { codigo } });
    if (!existente) break;
    codigo = gerarCodigo();
  }

  const turma = await prisma.turma.create({
    data: { nome, codigo, professorId: professor.id },
  });

  return NextResponse.json({ turma });
}
