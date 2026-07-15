import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calcularResultado, PERGUNTAS, type PerfilKey } from "@/lib/perfis";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Você precisa estar logado para fazer o teste." }, { status: 401 });
  }

  const body = await req.json();
  const respostas: PerfilKey[] = body.respostas;

  if (!Array.isArray(respostas) || respostas.length !== PERGUNTAS.length) {
    return NextResponse.json({ error: "Respostas inválidas ou incompletas." }, { status: 400 });
  }

  const { perfil, scores } = calcularResultado(respostas);

  const result = await prisma.testResult.create({
    data: {
      userId,
      perfil,
      scoreCreator: scores.CREATOR,
      scoreBuilder: scores.BUILDER,
      scoreConnector: scores.CONNECTOR,
      scoreTechMaker: scores.TECH_MAKER,
      scoreLeader: scores.LEADER,
      answers: respostas,
    },
  });

  return NextResponse.json({ ok: true, resultId: result.id, perfil, scores });
}
