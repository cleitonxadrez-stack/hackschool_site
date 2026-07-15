"use client";

import { useState } from "react";

export default function CopiarLink({ url }: { url: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // se o navegador bloquear o clipboard, não faz nada — o link já está visível abaixo
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={copiar}
        className="botao amarelo"
        style={{ border: "none", cursor: "pointer" }}
      >
        {copiado ? "Link copiado! ✓" : "🔗 Copiar link para enviar"}
      </button>
      <p className="nota" style={{ marginTop: 10, wordBreak: "break-all" }}>
        {url}
      </p>
    </div>
  );
}
