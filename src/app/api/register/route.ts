import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").toLowerCase().trim();
    const password = body.password || "";
    const escola = (body.escola || "").trim();
    const serie = (body.serie || "").trim();
    const souProfessor = Boolean(body.souProfessor);
    const codigoProfessor = (body.codigoProfessor || "").trim();
    const codigoTurma = (body.codigoTurma || "").trim().toUpperCase();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Preencha nome, e-mail e senha." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "A senha precisa ter pelo menos 6 caracteres." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Digite um e-mail válido." }, { status: 400 });
    }

    let role: Role = "ALUNO";
    if (souProfessor) {
      if (!codigoProfessor || codigoProfessor !== process.env.TEACHER_SIGNUP_CODE) {
        return NextResponse.json({ error: "Código de professor inválido." }, { status: 403 });
      }
      role = "PROFESSOR";
    }

    let turmaId: string | null = null;
    if (!souProfessor && codigoTurma) {
      const turma = await prisma.turma.findUnique({ where: { codigo: codigoTurma } });
      if (!turma) {
        return NextResponse.json({ error: "Código de turma não encontrado." }, { status: 404 });
      }
      turmaId = turma.id;
    }

    const existente = await prisma.user.findUnique({ where: { email } });
    if (existente) {
      return NextResponse.json({ error: "Já existe uma conta com esse e-mail." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        escola: escola || null,
        serie: serie || null,
        role,
        turmaId,
      },
    });

    return NextResponse.json({ ok: true, userId: user.id, role: user.role });
  } catch (err) {
    console.error("Erro no cadastro:", err);
    return NextResponse.json({ error: "Erro interno ao criar a conta." }, { status: 500 });
  }
}
