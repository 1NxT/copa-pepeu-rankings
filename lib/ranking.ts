export interface Participante {
  nome: string;
  titulos: number;
  posicao: number;
}

export async function getRanking(): Promise<Participante[]> {
  const participantes = [
    { nome: "Ronis", titulos: 6 },
    { nome: "Richard", titulos: 5 },
    { nome: "Lucas branco", titulos: 5 },
    { nome: "Lucão", titulos: 4 },
    { nome: "Heber", titulos: 3 },
    { nome: "Nando", titulos: 3 },
    { nome: "Caveira", titulos: 3 },
    { nome: "Brunão", titulos: 2 },
    { nome: "Bia", titulos: 1 },
    { nome: "Lucas Preto", titulos: 2 },
    { nome: "Renato", titulos: 1 },
    { nome: "Breno", titulos: 2 },
    { nome: "Tutui", titulos: 1 },
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
