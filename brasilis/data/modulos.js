window.MODULOS = {
 "proezas": {
  "intro": "Este módulo descentraliza a magia, permitindo ações e combates não mágicos elaborados através das Proezas.",
  "mecanica": "Todas as ações que requerem teste são consideradas Proezas. Elas são divididas em três tipos, utilizando 2d6 + Atributo correspondente. Para realizar uma Proeza, o jogador deve \"justificar\" sua ação combinando Rudimentos, Itens e/ou Habilidades.",
  "tipos": [
   [
    "Físicas",
    "Corpo",
    "Pular prédios, arrombar fechaduras, manipular armas, levantar peso."
   ],
   [
    "Mentais",
    "Mente",
    "Perceber ambientes, convencer, deduzir, usar sistemas, desvendar cifras."
   ],
   [
    "Mágicas",
    "Alma",
    "Conjuração de magia, percepção mágica, manipulação do sobrenatural."
   ]
  ],
  "rudimentos": [
   [
    "Expressão",
    "Capacidade de comunicar intenções, emoções e ideias de forma eficaz, seja por palavras, postura, tom, gesto ou presença. Expressão é interação direta: convencer, distrair, acalmar, inspirar, provocar ou desestabilizar alguém por meio do impacto social imediato."
   ],
   [
    "Furtividade",
    "Agir sem ser percebido, discrição: controlar ruído corporal, minimizar presença, mover-se suavemente, manipular objetos silenciosamente e usar o corpo para passar despercebido. É físico, não social — diz respeito ao modo como o corpo ocupa o espaço."
   ],
   [
    "Improviso",
    "Usar ambiente, objetos e circunstâncias de maneira inesperada ou criativa. Transforma qualquer elemento presente — uma cadeira, uma cortina, um desnível, um barril — em parte da ação. Representa adaptação instantânea e inventividade corporal."
   ],
   [
    "Instinto",
    "Leitura corporal e sensorial do ambiente. Detectar movimentos, reagir a perigo iminente, perceber vibrações, notar armadilhas físicas, ajustar postura automaticamente. É a percepção tátil, espacial e reflexiva, seja consciente ou não."
   ],
   [
    "Mobilidade",
    "Deslocamento corporal amplo: correr, saltar, escalar, esquivar, rolar, alcançar lugares difíceis, atravessar ambientes apertados. Representa controle sobre a trajetória e o movimento do corpo no espaço."
   ],
   [
    "Potência",
    "Capacidade de aplicar força bruta ao mundo. Usado para empurrar, puxar, arrombar, levantar, romper, sustentar peso ou golpear com impacto. Potência trata de energia direta, de transformar esforço em ação física imediata."
   ],
   [
    "Precisão",
    "Controle motor fino e direção exata. Usado para manipular mecanismos, encaixar, destravar, ajustar, acertar pontos específicos ou operar objetos delicados. Representa ações que exigem cuidado e coordenação detalhada."
   ],
   [
    "Raciocínio",
    "Clareza mental, organização de ideias e compreensão estrutural. Raciocínio representa a capacidade de analisar, deduzir, interpretar pistas, conectar informações e compreender implicações sem depender de conhecimento formal. É a lógica interna do pensamento, o entendimento de como algo funciona e a habilidade de resolver problemas abstratos."
   ],
   [
    "Técnica",
    "Aplicação de conhecimento aprendido. Inclui alavancas, posturas, manuseio de ferramentas, golpes marciais, manipulação eficiente do próprio peso e uso avançado de instrumentos físicos. Técnica é a lógica mecânica, não força bruta."
   ],
   [
    "Vigor",
    "Capacidade de suportar esforço prolongado, dor, calor, impacto, peso, cansaço ou condições adversas. Representa tolerância física e manutenção de desempenho sob pressão."
   ]
  ],
  "complexidade": "Assim como as magias, Proezas têm Complexidade (que determina o ganho de Estresse e limites de Fadiga). A Complexidade é delimitada pelo atributo Mente (0/1: Regular; 2/3: Difícil; 4/5: Complexa; 6: Milagre).",
  "estresse": [
   [
    "Trivial",
    0
   ],
   [
    "Regular",
    1
   ],
   [
    "Difícil",
    2
   ],
   [
    "Complexa",
    4
   ],
   [
    "Milagre",
    7
   ]
  ],
  "composta": [
   "Ocorre quando a ação engloba mais de um tipo de Proeza (ex: Proeza Mágica para se fortalecer + Proeza Física para quebrar uma parede simultaneamente).",
   "Atributo: o jogador escolhe qual atributo usar entre os envolvidos.",
   "Complexidade: igual à maior Complexidade entre as Proezas combinadas. O estresse acumula apenas uma vez.",
   "Custo extra: acumula +1 de Estresse adicional (Trivial 1PE, Regular 2PE, Difícil 3PE, Complexa 5PE, Milagre 8PE)."
  ],
  "habilidade": [
   "Proezas Práticas (P)",
   "A Personagem aprende tão bem na prática quanto no estudo. Ela pode utilizar o Atributo Corpo (ao invés de Mente) para determinar a Complexidade máxima de Proezas Físicas que consegue executar."
  ]
 },
 "itens": [
  {
   "nome": "Encantamento do Copião",
   "pp": 5,
   "efeito": "Copia movimentos de escrita de outro instrumento observado em tempo real (apenas o gesto, não o significado).",
   "veiculos": "Canetas, penas, lápis, pincéis."
  },
  {
   "nome": "Audição Amplificada",
   "pp": 5,
   "efeito": "Custa 1 Estresse. Ouve qualquer som até 100m com clareza por 1 hora.",
   "veiculos": "Fones, brincos, tiaras, auriculares."
  },
  {
   "nome": "Chama Aderente",
   "pp": 10,
   "efeito": "Custa 1 Estresse. A arma entra em ignição por 1h sem ferir o usuário. Aumenta Ferimentos causados em +1.",
   "veiculos": "Espadas, adagas, machados, correntes."
  },
  {
   "nome": "Potencialização",
   "pp": 15,
   "efeito": "Aumenta um Atributo (Corpo, Mente ou Alma - definido na criação) em +1 enquanto equipado.",
   "veiculos": "Anéis, colares, cintos, tiaras."
  },
  {
   "nome": "Conjuração Partilhada",
   "pp": 15,
   "efeito": "Sintoniza até 4 objetos. Permite que outro usuário acumule até 2 de Estresse no lugar de quem conjurou a magia.",
   "veiculos": "Broches, anéis, pulseiras."
  },
  {
   "nome": "Visão Noturna",
   "pp": 5,
   "efeito": "Enxerga perfeitamente no escuro absoluto (sem distorções) enquanto usado.",
   "veiculos": "Óculos, máscaras, lentes."
  },
  {
   "nome": "Cura Menor",
   "pp": 10,
   "efeito": "Consumível de 10 cargas. Cura 1 Ferimento imediatamente (máx 2 curas por pessoa até o próximo descanso completo).",
   "veiculos": "Curativos, adesivos, selos."
  },
  {
   "nome": "Desaparecimento",
   "pp": 10,
   "efeito": "Consumível (3 usos). Cria névoa que torna o alvo e seus itens totalmente invisíveis por 10 minutos (sons/cheiros mantidos).",
   "veiculos": "Algibeiras, cápsulas, frascos."
  },
  {
   "nome": "Sorte Engarrafada",
   "pp": 10,
   "efeito": "Consumível. O usuário ganha 3 Dados de Empenho adicionais.",
   "veiculos": "Frascos, garrafas, cantis."
  },
  {
   "nome": "Replicação",
   "pp": 15,
   "efeito": "Registra um objeto não mágico/orgânico (até 30cm) no interior. Gera cópia idêntica que dura 24h. Recarrega em 24h (ou custo de 5 Estresse).",
   "veiculos": "Mochilas, caixas, alforjes."
  },
  {
   "nome": "Proteção Ígnea",
   "pp": 10,
   "efeito": "Reduz em 2 Ferimentos qualquer dano vindo de fogo e calor extremo.",
   "veiculos": "Colares, mantos, braceletes."
  },
  {
   "nome": "Chuva Engarrafada",
   "pp": 10,
   "efeito": "Consumível. Libera chuva torrencial por 1 hora. Extensão custa 2 Estresse por hora extra.",
   "veiculos": "Garrafas, ânforas."
  },
  {
   "nome": "Impacto Explosivo",
   "pp": 5,
   "efeito": "Projétil explode no impacto causando 2 Ferimentos (Defesa Ineficaz). Múltiplos projéteis simultâneos adicionam +1 Ferimento cada.",
   "veiculos": "Esferas, pedras, cápsulas."
  },
  {
   "nome": "Forma Animada",
   "pp": 10,
   "efeito": "Transforma objeto colapsável em estrutura animada (até 2m) por 8 horas (voar, flutuar, transportar).",
   "veiculos": "Origamis, papéis, tendas desmontáveis."
  },
  {
   "nome": "Transposição de Matéria",
   "pp": 15,
   "efeito": "Consumível (queimável). Deixa criaturas em 10m intangíveis por 1 hora. Se acabar dentro de algo sólido, sofre 5 Ferimentos e é ejetado.",
   "veiculos": "Incensos, velas, essências."
  },
  {
   "nome": "Líquido Infindável",
   "pp": 5,
   "efeito": "Reservatório inesgotável do último líquido não mágico nele posto. Se derramado no chão, evapora em 1 min.",
   "veiculos": "Canecas, cantis, barris."
  },
  {
   "nome": "Melodia Dominadora",
   "pp": 15,
   "efeito": "Custa 2 Estresse. Encanta animais não mágicos (obedecem por 1 hora). Criaturas fantásticas resistem com Mente Dif 12.",
   "veiculos": "Flautas, caixas de música."
  },
  {
   "nome": "Janela-Além",
   "pp": 25,
   "efeito": "Portal para espaço paralelo isolado (senha exigida). Cópias conectam-se ao mesmo espaço.",
   "veiculos": "Quadros, pôsteres, portas falsas."
  },
  {
   "nome": "Amplificação",
   "pp": 10,
   "efeito": "Foco mágico. Custa +1 Estresse. Concede +2 em Testes de Conjuração.",
   "veiculos": "Varinhas, cajados."
  },
  {
   "nome": "Repulsão",
   "pp": 10,
   "efeito": "Custa 1 Estresse. Empurra alvo (até 10m) para 30m de distância, causando 1 Ferimento.",
   "veiculos": "Bastões, escudos, manoplas."
  },
  {
   "nome": "Desfase",
   "pp": 15,
   "efeito": "Custa 2 Estresse. Fica intangível/desfasado por 5 min (+1 Estresse/minuto extra). Se acabar dentro de parede, sofre 3 Ferimentos.",
   "veiculos": "Amuletos, capas, cajados."
  },
  {
   "nome": "Corte Espacial",
   "pp": 15,
   "efeito": "Custa 2 Estresse. Cria portal abrindo 2 fendas a até 30m de distância. Dura 1 minuto.",
   "veiculos": "Espadas, adagas, katanas."
  },
  {
   "nome": "Conversão de Dor",
   "pp": 10,
   "efeito": "Converte Ferimentos físicos do ataque armado em Acúmulo de Estresse instantâneo para o alvo.",
   "veiculos": "Espadas, bastões, lanças."
  },
  {
   "nome": "Muitas Faces",
   "pp": 10,
   "efeito": "Custa 1 Estresse. Altera a aparência física (cor, feições, voz) por 2 horas (+1 Estresse renova por +2h). Atributos inalterados.",
   "veiculos": "Amuletos, anéis, máscaras."
  },
  {
   "nome": "Mão Fantasma",
   "pp": 10,
   "efeito": "Cria mão translúcida até 10m de distância que atua como extensão do corpo. Sofre e executa rolagens normalmente.",
   "veiculos": "Luvas, anéis, manoplas."
  },
  {
   "nome": "Umbrocinesia",
   "pp": 15,
   "efeito": "Controla sombras (até 30m, 0 Estresse); vê através de sombra (até 60m, 1 Estresse); teleporte entre sombras (até 100m, 3 Estresse).",
   "veiculos": "Capas, adagas cerimoniais."
  },
  {
   "nome": "Voo",
   "pp": 10,
   "efeito": "Permite voo contínuo sem esforço.",
   "veiculos": "Capas, botas, colares."
  },
  {
   "nome": "Voo Temporário",
   "pp": 5,
   "efeito": "Consumível. Voa por 2 minutos.",
   "veiculos": "Poções, penas mágicas, óleos."
  },
  {
   "nome": "Celeridade",
   "pp": 10,
   "efeito": "Movimentação +3m. Bônus de +2 em testes de mobilidade, salto e esquiva.",
   "veiculos": "Botas, cintos, tornozeleiras."
  },
  {
   "nome": "Percepção de Falsidade",
   "pp": 15,
   "efeito": "Percebe instintivamente quando alguém fala diretamente uma mentira verbal intencional.",
   "veiculos": "Brincos, aparelhos auditivos."
  },
  {
   "nome": "Projétil Guiado",
   "pp": 5,
   "efeito": "Curva a trajetória do projétil no ar, dando +4 em Testes de acerto.",
   "veiculos": "Flechas, facas de arremesso."
  },
  {
   "nome": "Psicometria",
   "pp": 15,
   "efeito": "Lê impressões passadas do item tocado. Custa 1 Estresse para a última hora. Exige mais estresse cumulativo para dias anteriores.",
   "veiculos": "Luvas, anéis, adagas rituais."
  },
  {
   "nome": "Cornucópia",
   "pp": 15,
   "efeito": "Gera 3 refeições completas (10 pessoas cada) por dia. Alimento some se removido do item por muito tempo.",
   "veiculos": "Cornucópias, cestas, barris."
  },
  {
   "nome": "Passo Silente",
   "pp": 5,
   "efeito": "Oculta qualquer som de contato dos pés com o solo.",
   "veiculos": "Botas, capas leves, tornozeleiras."
  },
  {
   "nome": "Ventania Engarrafada",
   "pp": 10,
   "efeito": "Consumível (3 usos). Libera rajada única (2 Ferimentos em alvo até 10m) ou ventania contínua de 5 minutos que conturba a área.",
   "veiculos": "Garrafas, ânforas."
  },
  {
   "nome": "Revelação Invisível",
   "pp": 10,
   "efeito": "Revela qualquer entidade, marca, camuflagem ou efeito invisível.",
   "veiculos": "Óculos, lentes, máscaras."
  },
  {
   "nome": "Rastreamento Parcial",
   "pp": 10,
   "efeito": "Aponta a direção geral de um alvo a partir de um fragmento (escama, cabelo, peça de roupa) inserido.",
   "veiculos": "Bússolas, agulhas."
  },
  {
   "nome": "Respiração Aquática",
   "pp": 5,
   "efeito": "Permite respirar embaixo d'água indefinidamente.",
   "veiculos": "Amuletos, máscaras, tiaras."
  },
  {
   "nome": "Passos de Aranha",
   "pp": 5,
   "efeito": "Caminha sobre qualquer superfície (água, tetos, paredes, névoa densa) sem perder estabilidade.",
   "veiculos": "Botas, sandálias."
  },
  {
   "nome": "Marca Vinculada",
   "pp": 15,
   "efeito": "Marca 1 objeto por 1 semana (máx 3 marcas). Custa 1 Estresse para puxar o objeto até você; 3 Estresse para se teleportar até ele.",
   "veiculos": "Anéis, luvas, broches."
  },
  {
   "nome": "Silêncio Contido",
   "pp": 5,
   "efeito": "Custa 2 Estresse. Cria área estática de 10m de raio de silêncio isolante por 10 min. Nada entra ou sai audivelmente.",
   "veiculos": "Amuletos, sinos selados."
  },
  {
   "nome": "Traço Animado",
   "pp": 15,
   "efeito": "Custa 1 Estresse. Desenhos feitos ganham forma sólida em tinta 3D (até 3m / 100kg). Dura 1 hora ou se desfaz com 1 Ferimento.",
   "veiculos": "Pincéis, canetas, estiletes."
  },
  {
   "nome": "Partícula Acrescida",
   "pp": 15,
   "efeito": "Consumível. Contém 1 Partícula mágica (definida pelo Narrador). Permite uso perfeito em 1 conjuração, desfazendo o item.",
   "veiculos": "Páginas de grimório, pergaminhos."
  },
  {
   "nome": "Campo de Distorção Mágica",
   "pp": 15,
   "efeito": "Custa 2 Estresse. Cria campo estático (10m raio) por 10 min. Todo conjurador (incluindo usuário) sofre +1 Estresse em magias NÃO Triviais.",
   "veiculos": "Cajados, lanternas, pedestais."
  },
  {
   "nome": "Refluxo Arcano",
   "pp": 20,
   "efeito": "Recupera 1 Ponto de Estresse imediatamente após conjurar magias NÃO Triviais.",
   "veiculos": "Anéis, cajados, colares."
  },
  {
   "nome": "Retrocesso Breve",
   "pp": 15,
   "efeito": "Custa 1 Estresse. Refaz o teste de uma criatura visível a 30m. Apenas 1x por teste e 2x por dia máximo.",
   "veiculos": "Ampulhetas, relógios de bolso."
  },
  {
   "nome": "Eco Particulado",
   "pp": 25,
   "efeito": "Reação (custa 3 Estresse). Copia 1 Partícula que acabou de ouvir ser usada. Guarda a partícula no Grimório por 1 hora (ou até copiar outra).",
   "veiculos": "Brincos, penas ornamentais."
  },
  {
   "nome": "Ventania Heroica",
   "pp": 5,
   "efeito": "Visual épico permanente: a capa ondula dramaticamente como se houvesse vento. Sem efeito mecânico.",
   "veiculos": "Capas, mantos, echarpes."
  },
  {
   "nome": "Som Elogioso",
   "pp": 5,
   "efeito": "Ao emitir som, o item proclama elogios absurdos, altos e heroicos para a pessoa mais próxima.",
   "veiculos": "Apitos, sinos, liras."
  },
  {
   "nome": "Avaliação Absurda",
   "pp": 5,
   "efeito": "Projeta notas arbitrárias e absurdas sobre pessoas ao redor (ex: \"Grau de majestade do nariz: 10\").",
   "veiculos": "Monóculos, óculos, tiaras."
  },
  {
   "nome": "Trivia Inútil",
   "pp": 5,
   "efeito": "Revela fatos totalmente irrelevantes e desnecessários nos piores momentos.",
   "veiculos": "Livros, sinos, cristais falantes."
  }
 ],
 "familiares": {
  "pacto": [
   "Pode ser Afetivo, Espiritual, Fenômeno Místico ou Contrato Escrito.",
   "Vínculo Mental e Espiritual: Possuem localização mútua, telepatia e empatia.",
   "Conjuração Através do Familiar: O Orador pode conjurar magias como se estivesse no local do Familiar, custando +1 de Estresse extra.",
   "Dano Compartilhado: Efeitos mágicos que tenham o Familiar como alvo podem afetar o Pactário (e vice-versa), com um acúmulo de +2 Pontos de Estresse.",
   "Se o Familiar morre, a alma retorna ao Pactário e é conservada até ser ressuscitada."
  ],
  "base": [
   [
    "Corpo",
    "1"
   ],
   [
    "Mente",
    "1"
   ],
   [
    "Alma",
    "1"
   ],
   [
    "Limite de Ferimentos",
    "2"
   ],
   [
    "Limite de Estresse",
    "2"
   ],
   [
    "Complexidade Máxima",
    "Regular"
   ]
  ],
  "aptidoes": [
   [
    "Grimório Compartilhado",
    "Familiar pode conjurar magias (1 Função, 1 Objeto, 1 Característica do mestre)."
   ],
   [
    "Golpe Simples (Ataque)",
    "Ataque desarmado (Corpo) até 1m, 1 Ferimento."
   ],
   [
    "Corpo Fechado",
    "Bloqueia magias miradas no Familiar de afetarem o Pactário."
   ],
   [
    "Presença Calmante",
    "1x/dia recupera 3 de Estresse do Pactário."
   ],
   [
    "Extensão de Sentidos",
    "Ver/ouvir pelos sentidos do outro (+1 Estresse se >10 min)."
   ],
   [
    "Reinvocação Espontânea",
    "Se morto, renasce espontaneamente após 3 dias."
   ],
   [
    "Familiar Totêmico",
    "Age como Totem Rank 2 (exige Força do Pacto 3+)."
   ],
   [
    "Fala",
    "Pode falar os idiomas do Pactário."
   ],
   [
    "Voo",
    "Pode voar ou flutuar."
   ],
   [
    "Fôlego Sem Fim",
    "Não precisa respirar."
   ],
   [
    "Resistência Elemental",
    "Imunidade a 1 elemento (Fogo, Gelo, Veneno, Ácido ou Eletricidade)."
   ],
   [
    "Robustez",
    "+2 no Limite de Ferimentos."
   ],
   [
    "Treinado",
    "+2 em um Atributo (máx 5). Pode ser escolhida várias vezes."
   ]
  ],
  "forca": [
   [
    "Força 1",
    "3 Aptidões"
   ],
   [
    "Força 2",
    "4 Aptidões"
   ],
   [
    "Força 3",
    "5 Aptidões"
   ],
   [
    "Força 4",
    "6 Aptidões"
   ]
  ],
  "aptintro": "Ao fazer o pacto, o Familiar ganha 3 Aptidões e, a cada aumento na Força do Pacto, ganha 1 nova."
 }
};
