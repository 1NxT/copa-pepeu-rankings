import { getRanking } from '@/lib/ranking';

function getTrophyEmoji(posicao: number): string {
  if (posicao === 1) return '🥇';
  if (posicao === 2) return '🥈';
  if (posicao === 3) return '🥉';
  return '🏅';
}

function getTrophyColor(posicao: number): string {
  if (posicao === 1) return 'from-yellow-400 to-yellow-600';
  if (posicao === 2) return 'from-gray-300 to-gray-500';
  if (posicao === 3) return 'from-amber-600 to-amber-800';
  return 'from-purple-400 to-purple-600';
}

function getBorderColor(posicao: number): string {
  if (posicao === 1) return 'border-yellow-400';
  if (posicao === 2) return 'border-gray-400';
  if (posicao === 3) return 'border-amber-600';
  return 'border-purple-500';
}

export default async function Home() {
  const ranking = await getRanking();

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="text-6xl animate-trophy-bounce">🏆</div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-500 mb-4">
            Copa Pepeu
          </h1>
          <p className="text-xl text-gray-300">
            Ranking de Títulos
          </p>
          <div className="mt-4 text-sm text-gray-400">
            Atualizado em {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>

        {/* Ranking Cards */}
        <div className="space-y-4">
          {ranking.map((participante, index) => (
            <div
              key={participante.nome}
              className={`
                bg-white/10 backdrop-blur-lg rounded-xl p-6
                border-2 ${getBorderColor(participante.posicao)}
                transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                animate-slide-up
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                {/* Posição e Nome */}
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center
                    bg-gradient-to-br ${getTrophyColor(participante.posicao)}
                    text-3xl font-bold text-white shadow-lg
                  `}>
                    {participante.posicao}
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {participante.nome}
                    </h2>
                    <p className="text-gray-300">
                      {participante.titulos === 1 ? '1 Título' : `${participante.titulos} Títulos`}
                    </p>
                  </div>
                </div>

                {/* Troféu e Títulos */}
                <div className="flex items-center space-x-3">
                  <div className="text-5xl">
                    {getTrophyEmoji(participante.posicao)}
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-white">
                      {participante.titulos}
                    </div>
                    <div className="text-sm text-gray-400">
                      {participante.titulos === 1 ? 'título' : 'títulos'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getTrophyColor(participante.posicao)} rounded-full transition-all duration-1000`}
                  style={{
                    width: `${(participante.titulos / ranking[0].titulos) * 100}%`,
                    animationDelay: `${index * 0.1 + 0.3}s`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>* Títulos do evento 2025.09.28 não contam</p>
        </div>
      </div>
    </main>
  );
}
