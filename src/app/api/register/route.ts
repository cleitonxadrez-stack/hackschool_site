import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").toLowerCase().trim();
    const password = body.password || "";
    const escola = (body.escola || "").trim();
    const serie = (body.serie || "").trim();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Preencha nome, e-mail e senha." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "A senha precisa ter pelo menos 6 caracteres." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Digite um e-mail válido." }, { status: 400 });
    }

    const existente = await prisma.user.findUnique({ where: { email } });
    if (existente) {
      return NextResponse.json({ error: "Já existe uma conta com esse e-mail." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash, escola: escola || null, serie: serie || null },
    });

    return NextResponse.json({ ok: true, userId: user.id });
  } catch (err) {
    console.error("Erro no cadastro:", err);
    return NextResponse.json({ error: "Erro interno ao criar a conta." }, { status: 500 });
  }
}
