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
   "efeito": "Este encantamento permite ao objeto reproduzir com precisão os movimentos realizados por outra ferramenta de escrita que esteja ao alcance da visão do portador.\nSempre que o portador observar uma caneta, lápis ou qualquer instrumento de escrita realizando traços cursivos, o objeto encantado repete os mesmos movimentos, copiando o gesto com fidelidade. A cópia ocorre em tempo real, desde que o usuário mantenha o instrumento original sob observação contínua. O encantamento imita apenas o movimento da escrita, não interpretando palavras ou significados — reproduz unicamente os gestos.",
   "veiculos": "Canetas, penas, lápis, pincéis, bisturis finos, ponteiros de caligrafia."
  },
  {
   "nome": "Audição Amplificada",
   "pp": 5,
   "efeito": "Este encantamento permite ao portador perceber sons distantes com clareza excepcional, como se seus ouvidos fossem afinados para captar murmúrios e vibrações sutis.\nAo acumular 1 Ponto de Estresse, o portador pode ouvir qualquer som a até 100 metros de distância, distinguindo detalhes como conversas, passos, sussurros e ruídos leves. O efeito permanece ativo por 1 hora.",
   "veiculos": "Fones de ouvido, brincos, tiaras, amuletos, colares, clipes auriculares, capacetes leves."
  },
  {
   "nome": "Chama Aderente",
   "pp": 10,
   "efeito": "Este encantamento envolve a arma em fogo controlado, permitindo ao portador manejar chamas intensas sem sofrer dano.\nAo acumular 1 Ponto de Estresse e acionar o encantamento, a arma entra em ignição, produzindo uma chama forte que não afeta o portador nem o objeto encantado. Enquanto estiver em chamas, qualquer Ferimento causado pela arma é aumentado em 1 devido ao calor extremo.\nO efeito dura por 1 hora, podendo ser encerrado voluntariamente pelo portador a qualquer momento como uma ação livre.",
   "veiculos": "Espadas, adagas, lanças, machados, correntes, punhais rituais, manoplas."
  },
  {
   "nome": "Potencialização",
   "pp": 15,
   "efeito": "Este encantamento reforça a estrutura interna do portador, elevando sua capacidade física, mental ou espiritual conforme a afinidade definida.\nEnquanto estiver utilizando o objeto encantado, o portador tem um de seus Atributos (Corpo, Mente ou Alma) aumentado em 1. O Atributo escolhido é definido no momento em que o encantamento é preparado e não pode ser alterado posteriormente.",
   "veiculos": "Anéis, braceletes, broches, colares, tiaras, cintos, amuletos."
  },
  {
   "nome": "Conjuração Partilhada",
   "pp": 15,
   "efeito": "Este encantamento cria um vínculo cooperativo entre até quatro objetos igualmente encantados, permitindo que seus portadores dividam o peso da conjuração.\nO objeto encantado pode ser sintonizado com até outros três iguais, formando uma pequena rede mágica entre seus usuários. Sempre que o portador conjurar uma magia, qualquer outro usuário de objetos sintonizados pode escolher acumular até 2 Pontos de Estresse no lugar da pessoa que realizou a conjuração.\nA partilha é voluntária e ocorre de forma instantânea, desde que ambos os portadores estejam conscientes. A sintonia permanece ativa enquanto todos os objetos estiverem em posse de seus usuários.",
   "veiculos": "Broches, anéis, colares, pulseiras, braceletes rúnicos."
  },
  {
   "nome": "Visão Noturna",
   "pp": 5,
   "efeito": "Este encantamento ajusta a percepção visual do portador, permitindo-lhe enxergar perfeitamente mesmo na ausência total de luz.\nEnquanto estiver utilizando um objeto encantado com este efeito, o portador pode enxergar no escuro absoluto como se estivesse em plena iluminação comum, sem distorções de cor ou profundidade.",
   "veiculos": "Óculos, máscaras, viseiras, lentes, tiaras, capacetes leves."
  },
  {
   "nome": "Cura Menor",
   "pp": 10,
   "efeito": "Este encantamento cria um efeito de cura simples armazenado em pequenas unidades consumíveis, permitindo restaurar ferimentos leves de forma imediata.\nO objeto que contém este encantamento possui 10 cargas independentes, cada uma capaz de curar 1 Ferimento assim que ativada e aplicada sobre a pessoa alvo. A cura é instantânea e funciona em qualquer tipo de ferimento comum, mas uma pessoa não pode recuperar mais do que 2 Ferimentos através desse encantamento até o final de seu próximo Descanso Completo.\nCada carga perde permanentemente suas propriedades mágicas após ser utilizada.",
   "veiculos": "Curativos, adesivos, selos de papel, pedrinhas marcadas, tiras de pano, pequenos talismãs descartáveis."
  },
  {
   "nome": "Desaparecimento",
   "pp": 10,
   "efeito": "Este encantamento permite que o portador produza uma pequena nuvem luminosa que distorce a percepção ao redor, ocultando completamente quem estiver dentro dela.\nAo utilizar um dos usos armazenados no objeto encantado, o portador pode a energia vinculada, em forma de uma névoa prateada que torna uma única pessoa completamente invisível por 10 minutos. A invisibilidade cobre todo o corpo e todos os itens carregados, mas não oculta sons, cheiros ou pegadas produzidas pela pessoa.\nObjetos encantados com este efeito possuem 3 usos, cada qual se desfazendo após ativação.",
   "veiculos": "Algibeiras, bolsas pequenas, frascos, anéis ocos, pingentes, broches, cápsulas rúnicas."
  },
  {
   "nome": "Sorte Engarrafada",
   "pp": 10,
   "efeito": "Este encantamento confere ao recipiente que o contém a capacidade de gerar uma dose única de sorte instintiva, manifestada no momento em que o líquido é ingerido.\nAo usufruir do conteúdo do item encantado, o usuário recebe 3 Dados de Empenho adicionais, que funcionam exatamente como os Dados de Empenho normais e desaparecem conforme forem utilizados.\nUma vez consumida a dose, o encantamento se desfaz completamente, tornando o recipiente um objeto comum sem propriedades mágicas.",
   "veiculos": "Frascos, garrafas, cantis, copos rituais, cabaças, ampolas."
  },
  {
   "nome": "Replicação",
   "pp": 15,
   "efeito": "Este encantamento cria um espaço isolado que registra um único objeto colocado em seu interior, permitindo gerar cópias temporárias dele.\nQualquer objeto não orgânico, não mágico, de até 30 cm, pode ser armazenado no recipiente encantado, ficando registrado de forma permanente. O objeto armazenado não pode ser removido, mas o portador pode retirar do recipiente uma réplica exata, funcional e idêntica ao original. Toda réplica criada desaparece após 24 horas.\nApós retirar uma réplica, o encantamento só pode gerar outra após 24 horas, ou imediatamente se o usuário acumular 5 Pontos de Estresse.",
   "veiculos": "Mochilas, bolsas de tiracolo, caixas pequenas, bolsas de cintura, alforjes."
  },
  {
   "nome": "Proteção Ígnea",
   "pp": 10,
   "efeito": "Este encantamento envolve o portador em uma camada de resistência térmica que dissipa calor extremo e absorve parte da energia de queimaduras.\nEnquanto estiver utilizando o objeto encantado, o portador recebe alta resistência a fogo e calor, reduzindo em 2 Ferimentos qualquer dano proveniente dessas fontes.",
   "veiculos": "Colares, amuletos, anéis, broches, mantos, braceletes, cintos rúnicos."
  },
  {
   "nome": "Chuva Engarrafada",
   "pp": 10,
   "efeito": "Este encantamento aprisiona uma pequena massa de nuvens tempestuosas dentro de um recipiente selado, permitindo que o clima seja invocado de forma controlada.\nAo abrir o recipiente encantado libera-se uma nuvem que ascende imediatamente ao céu acima. Após aproximadamente 2 minutos, forma-se uma chuva torrencial sobre a área, com intensidade constante e uniformidade climática. A chuva dura 1 hora, podendo ter sua duração estendida ao custo de 2 Pontos de Estresse adicionais por cada hora extra.\nO efeito pode ser encerrado apenas quando a duração chegar ao fim; fechar o recipiente não retorna a chuva para dentro dele, e após a chuva ser liberada, o encantamento se encerra.",
   "veiculos": "Garrafas, frascos, potes selados, jarros rúnicos, ampolas reforçadas."
  },
  {
   "nome": "Impacto Explosivo",
   "pp": 5,
   "efeito": "Este encantamento transforma pequenos projéteis em cargas instáveis que detonam ao primeiro impacto, liberando uma explosão concentrada.\nQualquer projétil encantado dessa forma explode ao colidir com uma superfície ou criatura, causando 2 Ferimentos em um alvo, tratada como Defesa Ineficaz. Se múltiplos projéteis encantados forem utilizados simultaneamente contra o mesmo alvo, a explosão combinada aumenta os Ferimentos causados em +1 para cada 2 projéteis adicionais envolvidos na colisão.\nCada projétil encantado perde sua propriedade mágica após ser utilizado, não podendo ser reutilizado.",
   "veiculos": "Esferas pequenas, pedrinhas, rolamentos, mini-orbes, bagas petrificadas, cápsulas rígidas."
  },
  {
   "nome": "Forma Animada",
   "pp": 10,
   "efeito": "Este encantamento permite que um objeto dobrável ou colapsável se transforme temporariamente em uma estrutura maior e funcional, assumindo uma forma definida pelo item encantado.\nAo ativar o encantamento, o objeto se desfaz, expande-se e se reorganiza sozinho, ganhando uma forma animada inerte, capaz de se mover ou se deslocar, mas incapaz de causar Ferimentos. A forma criada possui até 2 metros de dimensão e pode cumprir uma função simples, como voar, flutuar, transportar uma pessoa ou deslocar-se pelo terreno conforme seu formato permitir. A estrutura permanece ativa por até 8 horas, perdendo suas propriedades mágicas ao final desse período ou quando o portador desejar encerrá-la.\nAo término do efeito, o objeto retorna ao seu estado não encantado, incapaz de ser reutilizado até ser encantado novamente.",
   "veiculos": "Origamis, esculturas dobráveis, folhas de papel rígido, tecidos rituais, miniaturas desmontáveis."
  },
  {
   "nome": "Transposição de Matéria",
   "pp": 15,
   "efeito": "Este encantamento, quando aplicado a um objeto capaz de ser queimado, liberado ou ativado de forma contínua, cria uma névoa etérea que desloca parcialmente o corpo físico de quem permanecer exposto ao efeito. A transposição altera a interação material do alvo com o ambiente, permitindo atravessar matéria sólida enquanto existir sustentação mágica.\nAo ser ativado, o encantamento afeta todas as criaturas voluntárias em até 10 metros após 1 minuto. As criaturas afetadas tornam-se intangíveis por 1 hora, podendo atravessar objetos sólidos livremente e interagir fisicamente com seres, objetos e ambientes que também sejam intangíveis. Se o efeito se encerrar enquanto a criatura afetada estiver dentro de matéria sólida, ela sofre 5 Ferimentos e reaparece imediatamente no espaço desobstruído mais próximo.\nO encantamento não impede Ferimentos provenientes de efeitos mágicos, elementais ou ataques de entidades intangíveis.",
   "veiculos": "incensos, velas, difusores aromáticos, papéis pirotécnicos, fitas queimáveis, essências voláteis."
  },
  {
   "nome": "Líquido Infindável",
   "pp": 5,
   "efeito": "O objeto encantado torna-se um reservatório inexaurível de um único líquido simples não mágico.\nO Item permanece sempre cheio do último líquido não mágico nele posto, podendo ser trocado à vontade. Mas se for derramado no chão ou em outro reservatório, o líquido desaparece após 1 minuto.\nO líquido gerado não possui nenhuma propriedade especial além de seu sabor e natureza comuns.",
   "veiculos": "Canecas, garrafas, cuias, cantis, potes selados, jarros pequenos."
  },
  {
   "nome": "Melodia Dominadora",
   "pp": 15,
   "efeito": "Este encantamento vincula uma melodia hipnótica ao objeto encantado, capaz de influenciar profundamente o comportamento de criaturas não mágicas.\nQuando ativado, o usuário pode acumular 2 Pontos de Estresse para encantar qualquer animal não mágico que possa ouvir o som emitido pelo veículo encantado. O efeito dura por 1 hora, período no qual o animal obedece aos comandos do usuário ao melhor de sua capacidade natural.\nCriaturas fantásticas incapazes de comunicação formal podem ser afetadas da mesma forma, contanto que falhem em um Teste de Mente de Dificuldade 12. A influência não força ações impossíveis ao animal, mas o torna extraordinariamente receptivo, dócil e cooperativo.",
   "veiculos": "Flautas, apitos, sinos, instrumentos musicais, caixas de música, conchas ressonantes, pequenos artefatos sonoros."
  },
  {
   "nome": "Janela-Além",
   "pp": 25,
   "efeito": "Este encantamento transforma um objeto bidimensional em um portal estável para um espaço paralelo fechado, acessível apenas por quem conhece a senha definida por quem fez o encantamento.\nQuando ativado, o objeto se torna atravessável, conduzindo qualquer pessoa que o transponha ao interior de um espaço isolado — uma sala, cabana, galeria, ou qualquer ambiente definido no momento da criação. O local é seguro, fixo e não pode ser acessado por outros meios. Uma cópia do objeto encantado sempre existe dentro desse espaço, funcionando como saída. Se essa cópia for destruída, o portal correspondente também se desfaz.\nTodos os objetos portadores deste encantamento conduzem ao mesmo espaço paralelo, independentemente de onde estejam no mundo, criando uma rede de acessos dispersos.",
   "veiculos": "Quadros, pôsteres, murais, tapeçarias, portas falsas, grandes placas rígidas."
  },
  {
   "nome": "Amplificação",
   "pp": 10,
   "efeito": "Esse encantamento intensifica o poder de magias canalizadas através do objeto que o contém, servindo como um foco que reforça a potência da conjuração.\nSempre que o usuário optar por fazer uma magia partir diretamente do item encantado, a conjuração se torna mais forte ao acumular 1 Ponto de Estresse adicional. Magias canalizadas dessa forma recebem +2 em Testes de Conjuração, refletindo o impulso fornecido pelo foco amplificador.",
   "veiculos": "Varinhas, cajados curtos, estabilizadores de mão, amuletos focais, hastes rígidas."
  },
  {
   "nome": "Repulsão",
   "pp": 10,
   "efeito": "O objeto encantado armazena uma carga de energia expansiva que pode ser liberada de forma controlada.\nAo acumular 1 Ponto de Estresse, o portador ativa o encantamento, emitindo uma onda de repulsão que afasta um alvo escolhido a até 10 metros de distância. A onda causa 1 Ferimento no alvo e o empurra até 30 metros para longe do ponto de origem, desde que o espaço permita o deslocamento.",
   "veiculos": "Bastões, escudos, luvas, anéis, manoplas, broches, cajados, superfícies rígidas."
  },
  {
   "nome": "Desfase",
   "pp": 15,
   "efeito": "O objeto encantado permite ao portador existir parcialmente fora da matéria, ocupando um estado entre presença e ausência.\nAo acumular 2 Pontos de Estresse, o portador ativa o encantamento e entra em desfase, tornando-se incapaz de interagir fisicamente com qualquer objeto sólido.\nNesse estado, o portador pode atravessar paredes, portas, objetos, superfícies e criaturas, e seu corpo adquire leveza suficiente para flutuar a pequenas alturas sem apoio físico.\nO estado de desfase dura 5 minutos, podendo ser estendido ao custo de 1 Ponto de Estresse adicional por minuto extra. O portador pode encerrar o efeito a qualquer momento de forma voluntária.\nCaso o efeito se encerre enquanto o portador estiver dentro de um objeto sólido, ele sofre 3 Ferimentos e reaparece no ponto livre mais próximo. Se estiver dentro de uma criatura, apenas o portador sofre os Ferimentos, sem causar dano ao outro ser.",
   "veiculos": "Amuletos, anéis, broches, tornozeleiras, capas, luvas, pingentes, cajados."
  },
  {
   "nome": "Corte Espacial",
   "pp": 15,
   "efeito": "O objeto encantado permite ao portador rasgar a superfície do espaço, criando uma abertura transitável entre dois pontos próximos.\nAo acumular 2 Pontos de Estresse, o portador realiza um golpe com a lâmina encantada, cortando o espaço e abrindo um portal estático no local atingido. Imediatamente após criar o primeiro portal, o portador deve realizar um segundo corte com a lâmina, escolhendo um ponto a até 30 metros de distância, onde o portal de saída se forma.\nOs dois portais permanecem conectados, permitindo que pessoas e objetos atravessem de um lado ao outro. O portal se mantém aberto por 1 minuto, podendo ser encerrado antes caso o portador deseje.\nCriaturas que estiverem no limiar do portal quando ele se fechar reaparecem no lado de entrada. O portal não pode ser criado dentro de criaturas ou objetos sólidos.",
   "veiculos": "Espadas, adagas, katanas, lâminas curvas, machadinhas, foices, kunais, punhais rituais."
  },
  {
   "nome": "Conversão de Dor",
   "pp": 10,
   "efeito": "Este encantamento altera a natureza do impacto causado pela arma, redirecionando o dano físico para o campo emocional e mental.\nAntes de realizar quaisquer Testes para definir êxito no ataque, o portador pode optar por ativar o encantamento. Se o fizer, todos os Ferimentos que seriam causados pela arma naquele ataque tornam-se Acúmulo de Estresse no alvo, em vez de Ferimentos regulares.\nA arma ainda produz impacto físico, mas a consequência mágica converte a dor e o trauma do golpe em tensão mental instantânea. Esse efeito não altera outros tipos de dano que venham de fontes externas, apenas o dano direto causado pela arma encantada.",
   "veiculos": "Espadas, adagas, bastões, lanças, correntes, foices, manoplas, cajados."
  },
  {
   "nome": "Muitas Faces",
   "pp": 10,
   "efeito": "Este encantamento permite ao portador alterar a própria aparência física, assumindo uma forma diferente sem modificar sua espécie ou capacidades essenciais.\nAo acumular 1 Ponto de Estresse, o portador ativa o encantamento e pode modificar livremente características como estatura, proporções corporais, textura da pele, coloração, feições faciais, cabelo, voz e outras qualidades externas. A metamorfose dura 2 horas, mantendo todas as capacidades físicas e atributos originais do usuário.\nO portador pode renovar a duração por mais 2 horas adicionais ao acumular 1 Ponto de Estresse cada vez que desejar estender o efeito. O efeito pode ser encerrado voluntariamente a qualquer momento, retornando o usuário à forma original.",
   "veiculos": "Amuletos, anéis, colares, broches, tiaras, pulseiras, espelhos portáteis, máscaras rituais."
  },
  {
   "nome": "Mão Fantasma",
   "pp": 10,
   "efeito": "Este encantamento permite ao portador manifestar uma mão fantasmagórica que surge à distância e atua como uma extensão física de seu próprio corpo.\nO portador pode criar a mão fantasmagórica em qualquer ponto a até 10 metros de sua posição, permitindo-lhe manipular objetos, operar mecanismos ou realizar tarefas finas como se estivesse tocando diretamente. A mão pode executar qualquer ação que o usuário seria capaz de realizar com sua própria, inclusive ações que possam causar Ferimentos, desde que a tarefa seja compatível com sua força e habilidade naturais.\nTodos os Testes realizados através da mão fantasmagórica utilizam os mesmos Atributos e capacidades que o usuário empregaria normalmente. A manifestação pode ser encerrada a qualquer momento, e o usuário pode criar uma nova mão fantasmagórica novamente sempre que desejar.",
   "veiculos": "Luvas, anéis, braceletes, cajados, bastões, manoplas, colares rúnicos."
  },
  {
   "nome": "Umbrocinesia",
   "pp": 15,
   "efeito": "Este encantamento concede ao portador controle direto sobre sombras, permitindo moldá-las livremente, perceber através delas e até atravessar espaços escuros como caminhos ocultos.\nAo utilizar este Encantamento, o portador pode aplicar os efeitos abaixo, acumulando o Estresse associado a cada uso:\n• O portador pode moldar, mover e alterar sombras a até 30 metros de distância, modificando sua forma, tamanho ou posição como desejar. (Sem custo de Estresse)\n• O portador pode ver e ouvir através de uma sombra a até 60 metros de distância, percebendo o que ocorre ao redor dela como se estivesse presente no local observado. (Custo: 1 Ponto de Estresse)\n• O portador pode teleportar-se de uma sombra para outra dentro de um limite de 100 metros, deslocando-se instantaneamente, desde que ambas as sombras sejam grandes o suficiente para acomodar seu corpo. (Custo: 3 Pontos de Estresse)\nQualquer efeito de Umbrocinesia pode ser encerrado voluntariamente a qualquer momento.",
   "veiculos": "Capas, mantos, anéis, broches, pingentes, cajados, adagas cerimoniais, lanternas escuras."
  },
  {
   "nome": "Voo",
   "pp": 10,
   "efeito": "Este encantamento permite ao portador deslocar-se pelo ar como se seu corpo fosse naturalmente sustentado por correntes invisíveis, mantendo-se em voo contínuo sem esforço.\nO portador pode voar livremente enquanto estiver utilizando o objeto encantado, movendo-se pelo ar com a mesma facilidade com que caminharia no solo.",
   "veiculos": "Capas, Mantos, Botas, Broches, Anéis, Colares."
  },
  {
   "nome": "Voo Temporário",
   "pp": 5,
   "efeito": "Este encantamento concede um período temporário de voo ao portador, desfazendo-se completamente após ser utilizado uma única vez.\nAo utilizar o objeto encantado, o portador passa a voar livremente por até 2 horas, movendo-se pelo ar com a mesma facilidade com que caminharia no solo. Ao término da duração — ou caso o portador deseje encerrar o efeito antes — o voo se desfaz e o encantamento é consumido permanentemente.",
   "veiculos": "Poções, pergaminhos, pedras rúnicas, penas encantadas, talismãs frágeis, óleos aplicados à pele, velas rituais."
  },
  {
   "nome": "Celeridade",
   "pp": 10,
   "efeito": "Este encantamento amplifica a fluidez dos movimentos do portador, tornando cada passo mais leve, preciso e rápido do que o normal.\nEnquanto estiver utilizando o objeto encantado, o portador tem sua movimentação aumentada em 3 metros. Além disso, o portador recebe +2 em quaisquer Testes que envolvam sua mobilidade, incluindo ações como correr, saltar, esquivar, contornar obstáculos, manter equilíbrio ou executar movimentos acrobáticos.",
   "veiculos": "Botas, cintos, braceletes, anéis, capas leves, tiaras, tornozeleiras."
  },
  {
   "nome": "Percepção de Falsidade",
   "pp": 15,
   "efeito": "Este encantamento afina a percepção do portador para as nuances sutis presentes na fala humana, permitindo-lhe identificar desvios, hesitações e pequenas dissonâncias que revelam falsidade.\nSempre que alguém falar diretamente com o portador, ele percebe instintivamente quando a afirmação contém mentira, distorção consciente ou falsidade intencional. O efeito não interpreta intenção, emoção ou contexto — apenas indica a presença de mentira verbal direta.\nO encantamento não funciona com mensagens escritas, gravações, ilusões auditivas ou qualquer forma de comunicação que não seja fala presencial direcionada ao portador.",
   "veiculos": "Brincos, anéis, colares, broches, tiaras, coroas, amuletos auditivos."
  },
  {
   "nome": "Projétil Guiado",
   "pp": 5,
   "efeito": "Este encantamento infunde no projétil uma força direcional sutil, permitindo que ele curve sua trajetória e ajuste seu percurso em pleno ar para alcançar o alvo pretendido.\nProjéteis encantados desta forma tornam-se autocorrigidos, acompanhando o movimento do alvo e compensando desvios provocados por vento, distância ou movimentação brusca. Ataques realizados utilizando projéteis encantados com este efeito recebem +4 de bônus em Testes de acerto, refletindo a precisão ampliada do impacto guiado.\nO projétil ainda precisa ser lançado, arremessado ou disparado normalmente, mas sua trajetória passa a responder à intenção do portador de forma evidente.",
   "veiculos": "Flechas, virotes, dardos, facas de arremesso, pedras encantadas, shurikens, agulhas."
  },
  {
   "nome": "Psicometria",
   "pp": 15,
   "efeito": "Este encantamento permite ao portador acessar impressões residuais do passado de um objeto, lendo fragmentos emocionais, visuais e sensoriais deixados pelas pessoas que o manipularam.\nAo acumular 1 Ponto de Estresse, o portador pode perceber as memórias ligadas ao objeto relativas à última hora de seu uso.\nPara investigar períodos anteriores, o portador pode continuar acumulando Estresse em uma progressão crescente, avançando 1 dia no passado por uso, com o seguinte custo:\n• 1 dia no passado — 1 Estresse\n• 2 dias no passado — 2 Estresse\n• 3 dias no passado — 3 Estresse\n• 4 dias no passado — 5 Estresse\n• 5 dias no passado — 8 Estresse\n• 6 dias no passado — 13 Estresse\n• 7 dias no passado — 21 Estresse\nO usuário recebe percepções sensoriais fragmentadas do período selecionado — não visões contínuas — e pode encerrar o efeito a qualquer momento.\nEste encantamento não revela pensamentos internos de indivíduos envolvidos, apenas suas ações e emoções superficiais ligadas ao objeto.",
   "veiculos": "Luvas, anéis, braceletes, colares, adagas rituais, amuletos, grimórios, máscaras."
  },
  {
   "nome": "Cornucópia",
   "pp": 15,
   "efeito": "Este encantamento cria uma fonte inesgotável de alimentos naturais, gerados diretamente do objeto encantado, como se ele estivesse ligado a um reservatório fértil e abundante.\nO receptáculo encantado produz até 3 refeições completas por dia, cada uma capaz de alimentar até 10 pessoas com comida sempre fresca, nutritiva e variada (frutas, raízes, legumes, grãos e outros alimentos simples). O alimento desaparece se removido do recipiente por tempo prolongado ou armazenado de maneira inadequada, mas nunca estraga enquanto permanecer dentro do receptáculo encantado.\nO efeito não acumula Estresse e se renova diariamente ao amanhecer.",
   "veiculos": "Cornucópias, cestas, baús pequenos, panelas, potes cerâmicos, cantis largos, barris esculpidos."
  },
  {
   "nome": "Passo Silente",
   "pp": 5,
   "efeito": "Este encantamento envolve o portador em uma camada fina de amortecimento mágico, suprimindo vibrações e dissipando sons produzidos pelo contato dos pés com o solo.\nEnquanto estiver utilizando o objeto encantado, o portador é capaz de mover-se sem produzir qualquer ruído, mesmo ao caminhar sobre superfícies que normalmente fariam barulho, como madeira, folhas secas, cascalho ou metal. O encantamento não interfere na movimentação em si — apenas oculta o som gerado pelos passos, permitindo aproximação furtiva e deslocamentos discretos.\nQualquer outro som produzido pelo portador (fala, respiração, objetos manipulados) não é afetado por este encantamento.",
   "veiculos": "Botas, tornozeleiras, capas leves, cintos, anéis, broches, luvas."
  },
  {
   "nome": "Ventania Engarrafada",
   "pp": 10,
   "efeito": "Este encantamento armazena correntes de ar violentas dentro de um recipiente ou objeto oco, permitindo que o portador libere ventos concentrados ou prolongados conforme sua necessidade. O efeito pode ser utilizado 3 vezes antes de o encantamento se desfazer por completo.\nO portador pode quebrar o lacre, tampa ou selo do objeto encantado para liberar uma rajada única de vento concentrado, que explode para fora com força suficiente para causar 2 Ferimentos em um alvo em até 10m atingido diretamente.\nAlternativamente, o portador pode abrir o recipiente de forma controlada, liberando uma ventania contínua que toma o ambiente, gerando fortes correntes de ar que conturbam a área por até 5 minutos, dificultando movimentos, visão e estabilidade de criaturas presentes.\nCada uso consome um dos três usos do encantamento, independentemente da forma como o vento é liberado.",
   "veiculos": "Garrafas, frascos lacrados, tubos ocos, ânforas pequenas, cabaças, lanternas vazias, potes ritualísticos."
  },
  {
   "nome": "Revelação Invisível",
   "pp": 10,
   "efeito": "Este encantamento permite ao portador perceber aquilo que está oculto aos sentidos comuns, revelando formas, criaturas, marcas e fenômenos que normalmente não poderiam ser vistos.\nEnquanto estiver utilizando o objeto encantado, o portador é capaz de enxergar qualquer entidade, objeto ou efeito invisível, incluindo criaturas ocultas, assinaturas mágicas, símbolos disfarçados e camuflagens místicas. A visão revelada não altera o funcionamento do ambiente — apenas expõe o que está presente, mantendo o restante da percepção inalterado. O portador pode alternar entre sua visão normal e a revelada a qualquer momento, sem custo adicional.",
   "veiculos": "Óculos, lentes, anéis, tiaras, máscaras, cajados, pingentes."
  },
  {
   "nome": "Rastreamento Parcial",
   "pp": 10,
   "efeito": "Este encantamento permite ao portador identificar a direção geral de um objeto ou pessoa desde que possua uma parte legítima do todo — um fragmento, peça, fio de roupa, mecha de cabelo, escama, lasca, acessório ou qualquer componente que tenha pertencido originalmente ao alvo.\nAo segurar o fragmento e ativar o encantamento, o objeto encantado aponta para a direção geral do restante do alvo, agindo como um indicador sensível que busca o “todo” a partir da “parte”. A indicação não fornece distância exata, apenas direção aproximada, e pode oscilar caso existam obstáculos mágicos ou interferências energéticas.\nO efeito permanece ativo enquanto o portador estiver segurando o fragmento original, encerrando-se assim que o contato for perdido.",
   "veiculos": "Bússolas, agulhas, pingentes, anéis, talismãs, cajados, placas metálicas, peças de cerâmica."
  },
  {
   "nome": "Respiração Aquática",
   "pp": 5,
   "efeito": "Este encantamento adapta o corpo do portador para extrair oxigênio diretamente da água, permitindo que permaneça submerso sem dificuldade ou risco de asfixia.\nEnquanto estiver utilizando o objeto encantado, o portador pode respirar debaixo d’água indefinidamente, mantendo-se tão confortável quanto estaria em ar aberto.",
   "veiculos": "Amuletos, anéis, colares, broches, máscaras, braceletes, tiaras."
  },
  {
   "nome": "Passos de Aranha",
   "pp": 5,
   "efeito": "Este encantamento permite ao portador deslocar-se sobre qualquer superfície como se estivesse caminhando em solo firme, independentemente de sua consistência ou orientação.\nO portador pode caminhar sobre água, lama, gelo, superfícies lisas, paredes verticais, tetos, névoas densas e até estruturas frágeis sem afundar, escorregar ou perder estabilidade. A tração mágica se adapta automaticamente ao tipo de superfície, garantindo equilíbrio constante e permitindo deslocamento em velocidade normal.",
   "veiculos": "Botas, sandálias, anéis, tornozeleiras, mantos, cajados."
  },
  {
   "nome": "Marca Vinculada",
   "pp": 15,
   "efeito": "Este encantamento cria uma ligação estável entre o portador e um objeto marcado, permitindo deslocamentos instantâneos entre ambos mediante gasto de Estresse.\nAo tocar um objeto e aplicar o encantamento, o portador cria uma Marca Vinculada que permanece ativa por 1 semana. O portador pode manter até 3 Marcas simultaneamente; criar uma nova marca além desse limite faz com que a mais antiga desapareça. Objetos marcados não podem ser seres vivos, nem entidades conscientes ou animadas.\nAo acumular 1 Ponto de Estresse, o portador pode teleportar o objeto marcado para sua localização atual, desde que o objeto seja de tamanho e massa compatíveis com algo que o portador poderia carregar com o próprio corpo.\nAo acumular 3 Pontos de Estresse, o portador pode teleportar-se para a localização do objeto marcado, aparecendo próximo a ele.\nObjetos grandes, como casas, construções, rochedos, árvores ou estruturas fixas, não podem ser movidos, mas o portador pode teleportar-se até eles normalmente.\nO portador pode encerrar voluntariamente qualquer Marca antes do fim da duração.",
   "veiculos": "Anéis, luvas, broches, cajados, amuletos, braceletes, correntes rituais."
  },
  {
   "nome": "Silêncio Contido",
   "pp": 5,
   "efeito": "Este encantamento cria um campo isolante ao redor do portador, impedindo que qualquer som produzido dentro da área ultrapasse seus limites.\nAo acumular 2 Pontos de Estresse, o portador ativa o encantamento e estabelece uma zona de silêncio estática com 10 metros de raio, onde conversas, passos, impactos e quaisquer ruídos ficam confinados. Dentro da área, todos podem falar e ouvir normalmente; porém, nada do que for dito ou produzido em seu interior pode ser percebido por quem estiver fora dela.\nO campo permanece ativo por 10 minutos, podendo ser encerrado antecipadamente. O encantamento não bloqueia vibrações físicas nem impede entrada ou saída de pessoas, nem interfere com nenhuma conjuração.",
   "veiculos": "Amuletos, anéis, broches, sinos selados, cajados, lanternas ritualísticas."
  },
  {
   "nome": "Traço Animado",
   "pp": 15,
   "efeito": "Este encantamento permite ao portador transformar desenhos feitos com o objeto encantado em formas físicas temporárias, compostas de tinta solidificada.\nAo acumular 1 Ponto de Estresse, o portador ativa o efeito e qualquer desenho concluído ganha forma física com aspecto de tinta tridimensional. As criações não podem ser seres vivos, não possuem propriedades mágicas, tecnológicas ou nutritivas, e existem apenas como objetos sólidos simples. O tamanho, formato e peso da criação são determinados pela Intenção do usuário, mas não podem ultrapassar 3 metros de extensão nem 100Kg.\nA criação permanece por 1 hora, podendo ser desfeita voluntariamente pelo portador a qualquer momento, ou automaticamente ao sofrer 1 Ferimento, desfazendo-se em respingos de tinta.",
   "veiculos": "Pincéis, canetas, estiletes de caligrafia, penas metálicas, brochas de pintura."
  },
  {
   "nome": "Partícula Acrescida",
   "pp": 15,
   "efeito": "Este encantamento armazena uma única Partícula mágica, permitindo ao portador utilizá-la uma vez para conjurar uma magia como se possuísse pleno domínio sobre aquela Partícula específica.\nAssim que o objeto encantado é encontrado, ele já contém uma Partícula pré-determinada, escolhida pelo Narrador, e essa Partícula não pode ser alterada ou substituída por qualquer meio.\nAo utilizar a Partícula contida neste encantamento para compor uma magia, o efeito se desfaz imediatamente após a conjuração, e o objeto perde suas propriedades mágicas. A Partícula armazenada funciona como qualquer outra Partícula conhecida pelo usuário, mas apenas para um único uso.",
   "veiculos": "Páginas de grimório, pergaminhos, amuletos, pedras rúnicas, selos, medalhões, anéis."
  },
  {
   "nome": "Campo de Distorção Mágica",
   "pp": 15,
   "efeito": "Este encantamento cria uma área fixa de instabilidade arcana que interfere diretamente no ato de conjurar, elevando seu acúmulo de estresse.\nAo acumular 2 Pontos de Estresse, o portador ativa o encantamento e gera um campo fixo de distorção mágica com 10 metros de raio, cuja posição é determinada no exato local onde o usuário se encontra no momento da ativação.\nDentro dessa área, qualquer conjurador — inclusive o próprio portador — acumula 1 Ponto de Estresse adicional sempre que realizar uma magia NÃO Trivial. O campo permanece ativo por 10 minutos, e não se move após ser formado, mesmo que o portador se afaste. O efeito não pode ser encerrado voluntariamente pelo portador e não pode ser deslocado ou reposicionado até o término de sua duração.",
   "veiculos": "Cajados, amuletos, lanternas, bastões, talismãs rúnicos, pedestais portáteis."
  },
  {
   "nome": "Refluxo Arcano",
   "pp": 20,
   "efeito": "Este encantamento estabiliza parcialmente o fluxo emocional e mental do portador, permitindo-lhe recuperar parte do estresse causado por magias mais exigentes.\nSempre que o portador conjurar uma magia NÃO Trivial, ele recupera 1 Ponto de Estresse imediatamente após a conclusão da conjuração. O portador pode manter o encantamento ativo continuamente enquanto estiver utilizando o objeto que o carrega.",
   "veiculos": "Anéis, amuletos, braceletes, broches, cajados, colares, tiaras."
  },
  {
   "nome": "Retrocesso Breve",
   "pp": 15,
   "efeito": "Este encantamento permite ao portador intervir sutilmente no fluxo do tempo, desfazendo alguns segundos de um acontecimento recente para forçar que ele seja refeito.\nAssim que uma criatura (ou o próprio usuário) em até 30m realizar um Teste, você pode acumular 1 Ponto de Estresse. Se o fizer o Teste é imediatamente refeito, substituindo o resultado anterior pelo novo. Este efeito só pode ser aplicado uma única vez sobre cada Teste, e em uma criatura que você possa ver. Ele não pode ser usado para repetir um Teste que já tenha sido forçado anteriormente.\nO encantamento pode ser utilizado no máximo duas vezes por dia.",
   "veiculos": "Ampulhetas, relógios de bolso, anéis, pingentes, braceletes, cajados cerimoniais."
  },
  {
   "nome": "Eco Particulado",
   "pp": 25,
   "efeito": "Este encantamento permite ao portador captar e reproduzir temporariamente uma Partícula mágica pronunciada por outra pessoa, como se a entonação e a intenção do som ficassem presas no objeto encantado por um curto período.\nQuando o portador ouvir uma Partícula sendo usada em uma magia, ele pode gastar sua Reação para copiar essa Partícula, acumulando 3 Pontos de Estresse ao fazê-lo. A Partícula copiada é adicionada ao Grimório do usuário como uma Partícula temporária, podendo ser utilizada normalmente na construção de frases mágicas. A Partícula copiada permanece disponível por 1 hora, ou até que o portador copie uma nova Partícula, o que substitui automaticamente a anterior.",
   "veiculos": "Brincos, anéis, colares, broches, fivelas, pulseiras, cajados, penas ornamentais."
  },
  {
   "nome": "Ventania Heroica",
   "pp": 5,
   "efeito": "Este encantamento permite ao portador controlar dramaticamente o fluxo de ar ao redor de sua capa, manto ou tecido semelhante, criando um efeito de ondulação constante como se estivesse sempre sob um vento épico.\nO portador pode fazer a capa esvoaçar, tremular, se inflar, girar ou ondular ao seu comando, mesmo em locais completamente fechados ou sem circulação de ar. A intensidade do movimento pode variar de uma brisa suave até uma rajada teatral digna de um herói lendário fazendo uma entrada triunfal.\nEste efeito é puramente visual e não interfere em testes, movimentação, furtividade ou qualquer outra mecânica. O portador pode ativar ou interromper a ondulação da capa quando desejar.",
   "veiculos": "Capas, mantos, echarpes, ponchos, casacos longos, tapetes de ombro."
  },
  {
   "nome": "Som Elogioso",
   "pp": 5,
   "efeito": "Este encantamento faz com que qualquer objeto capaz de produzir um som curto manifeste uma voz calorosa e exageradamente positiva sempre que for acionado.\nAo emitir o som, o objeto identifica automaticamente a pessoa mais próxima do portador e gera um elogio espontâneo, sempre de forma alta, clara e constrangedoramente sincera. Os elogios variam entre comentários motivacionais, observações poéticas e declarações heroicas grandiosas, muitas vezes completamente fora de contexto.",
   "veiculos": "Apitos, sinos pequenos, liras, pedras sonoras, amuletos vocais, argolas chocalhantes."
  },
  {
   "nome": "Avaliação Absurda",
   "pp": 5,
   "efeito": "Este encantamento projeta avaliações totalmente arbitrárias sobre as pessoas ao redor do portador, atribuindo notas, conceitos ou comentários sem qualquer critério lógico ou discernível.\nSempre que o portador desejar, o encantamento se manifesta automaticamente sobre a pessoa mais próxima, atribuindo uma “nota” aleatória — que pode surgir como um número flutuante no ar, uma pequena placa luminosa ou até uma voz etérea proclamando a avaliação. As avaliações não seguem qualquer lógica: podem julgar “grau de majestade do nariz”, “nível de heroísmo potencial”, “carisma culinário”, “misticidade dos sapatos”, “quantidade de enigmas não resolvidos” ou qualquer outro parâmetro absurdo.",
   "veiculos": "Monóculos, óculos, tiaras, broches, pequenos sinos, pedras rúnicas humorísticas."
  },
  {
   "nome": "Trivia Inútil",
   "pp": 5,
   "efeito": "Este encantamento faz com que o objeto conte fatos, curiosidades e informações completamente aleatórias, irrelevantes e sem relação com o momento — muitas vezes no pior momento possível.\nAo ser ativado, o objeto compartilha um único fato inesperado, que pode variar de “interessante, porém inútil” até “absurdamente desnecessário”, sempre sem qualquer conexão com a situação presente. O conteúdo das curiosidades não possui fundamento prático, mas é surpreendentemente específico, como se o encantamento tivesse acesso a um acervo infinito de informações que ninguém pediu.",
   "veiculos": "Livros, sinos, cristais falantes, estátuas pequenas, broches, pergaminhos."
  }
 ],
 "familiares": {
  "pacto": [
   "Pacto: relação social e mística com o Familiar (o Orador é o Pactário). Apenas 1 Pacto pode ser estabelecido por vez. Ele é firmado de modo narrativo, por exemplo como Vínculo Afetivo, Conexão Espiritual, Fenômeno Místico ou Contrato Escrito.",
   "O Pacto conecta Pactário e Familiar através de suas almas. Ambos conseguem determinar a localização um do outro, sentir suas emoções e integridade física. Também possuem contato psíquico, de modo que não precisam falar o mesmo idioma para conseguirem se comunicar.",
   "Conjurar através do Familiar: o Orador pode conjurar magias através de seu Familiar, como se estivessem no mesmo lugar. A magia acumula 1 Ponto de Estresse adicional, independente da Complexidade.",
   "Afetar o Pactário através do Familiar (e vice-versa): uma magia conjurada no Familiar pode afetar o Pactário, e vice-versa, ao acúmulo de 2 Pontos de Estresse extra quando conjurar a magia.",
   "Se o Familiar morre, sua Alma retorna ao Pactário e fica atrelada a seu corpo, sendo assim “conservada”. Com a magia apropriada, ou itens Encantados específicos, é possível trazê-lo de volta à vida.",
   "Em combate, o Familiar não age se não for comandado. O Pactário pode comandá-lo como opção à sua ação de Interagir com o Ambiente, e o Familiar age imediatamente (para se movimentar ou executar uma ação).",
   "A forma do Familiar (sua “skin”) pode ser qualquer uma, desde que acordada entre Jogador e Narrador, mas a aparência não define mecânica: o que ele pode fazer vem das Aptidões."
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
    "O Pactário compartilha parte do seu Grimório, permitindo o Familiar conjurar magias por conta própria. Escolha 1 Função, 1 Objeto e 1 Característica do seu Grimório: O Familiar sabe essas Partículas e pode conjurar magias com elas."
   ],
   [
    "Golpe Simples (Ataque)",
    "O Familiar realiza um ataque desarmado usando seu Atributo Corpo como bônus extraordinário contra um alvo em distância até 1m, causando 1 Ferimento."
   ],
   [
    "Corpo Fechado",
    "Não é possível afetar o Pactário através de magias, ou outros efeitos mágicos, que tenham o Familiar como alvo."
   ],
   [
    "Presença Calmante",
    "Uma vez por dia, o Familiar pode acalmar os nervos do Pactário, recuperando 3 Pontos de Estresse."
   ],
   [
    "Extensão de Sentidos",
    "O Pactário e Familiar podem concentrar-se para experienciar o mundo através do outro. Pode-se ver, ouvir, e sentir a mesma coisa que o outro. Permanecer com essa Extensão de Sentidos por mais de 10 minutos por dia acumula 1 Ponto de Estresse."
   ],
   [
    "Reinvocação Espontânea",
    "Após ser morto e ter sua Alma retornada ao corpo do Pactário, o corpo físico do Familiar se reforma espontaneamente após 3 dias."
   ],
   [
    "Familiar Totêmico",
    "O Familiar conta como um Totem de Rank 2 para seu Pactário. Esse efeito não se aplica se a Força do Pacto for menor que 3."
   ],
   [
    "Fala",
    "O Familiar consegue se comunicar por conta própria nos mesmos idiomas que o Pactário."
   ],
   [
    "Voo",
    "O Familiar consegue flutuar ou voar."
   ],
   [
    "Fôlego Sem Fim",
    "O Familiar não precisa respirar."
   ],
   [
    "Resistência Elemental",
    "Escolhe entre: Fogo, Gelo, Veneno, Ácido ou Eletricidade. O Familiar não sofre Ferimento de tais fontes."
   ],
   [
    "Robustez",
    "Aumenta o Limite de Ferimentos do Familiar em 2."
   ],
   [
    "Treinado",
    "Aumente um Atributo do Familiar em 2, até o máximo de 5. Essa Aptidão é cumulativa e pode ser escolhida mais de uma vez."
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
  "aptintro": "Assim que o Pacto é estabelecido, o Jogador (Pactário) escolhe 3 Aptidões para o Familiar possuir e, a cada aumento da Força do Pacto, escolhe 1 nova Aptidão."
 }
};
