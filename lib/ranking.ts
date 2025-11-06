export interface Participante {
  nome: string;
  titulos: number;
  posicao: number;
}

export async function getRanking(): Promise<Participante[]> {
  const participantes = [
    { nome: "Ronis", titulos: 4 },
    { nome: "Lucão", titulos: 3 },
    { nome: "Lucas branco", titulos: 3 },
    { nome: "Nando", titulos: 3 },
    { nome: "Brunão", titulos: 2 },
    { nome: "Caveira", titulos: 2 },
    { nome: "Heber", titulos: 2 },
    { nome: "Richard", titulos: 2 },
    { nome: "Bia", titulos: 1 },
    { nome: "Lucas Preto", titulos: 1 },
    { nome: "Renato", titulos: 1 },
    { nome: "Breno", titulos: 0 },
    { nome: "Tutui", titulos: 0 },
  ];

  // Ordena por títulos (decrescente)
  participantes.sort((a, b) => b.titulos - a.titulos);

  // Adiciona a posição baseada no index
  const ranking: Participante[] = participantes.map((p, index) => ({
    ...p,
    posicao: index + 1,
  }));

  return ranking;
}
