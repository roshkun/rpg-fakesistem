// Habilidades de Etmos (resumo próprio das regras). P = prática, T = teórica.
// "acum": pode ser escolhida de novo; cada vez soma o bônus indicado.
window.HABILIDADES = {
 "Aparar":["P","A dificuldade para te acertarem (corpo a corpo ou à distância) sobe 2. Escolhida de novo, soma mais +2."],
 "Aperfeiçoamento Corporal":["P","Ao sofrer Ferimentos, pode reduzi-los em 1 (mínimo 1). Usos = Corpo −1, renovados no próximo Descanso Completo."],
 "Armas Brancas":["P","+2 nos ataques com armas brancas (faca, espada, martelo). Escolhida de novo, soma mais +2."],
 "Armas de longo alcance":["P","+2 nos ataques com arco, arma de fogo, estilingue etc. Escolhida de novo, soma mais +2."],
 "Artesão":["P","Permite criar Encantamentos (Artífice ou Alquimista). Até 3 vezes; cada vez sobe a categoria do item: Simples, Sofisticado, Primoroso."],
 "Artista":["P","Uma apresentação de pelo menos 10 minutos devolve 3 de Estresse a quem assistir (1 vez por dia por pessoa)."],
 "Conjuração Silenciosa":["P","Conjura sussurrando, ao custo de +1 de Estresse acumulado."],
 "Diplomacia":["P","Convencer e negociar com palavras. +2 nos testes; cada escolha extra soma mais +2."],
 "Direção e Montaria":["P","Dirige veículos terrestres e cavalga. Na 2ª escolha, também voadores e aquáticos. +2 nos testes por escolha."],
 "Enganar":["P","Mentir e ludibriar com palavras. +2 nos testes; cada escolha extra soma mais +2."],
 "Exceder os Limites":["P","1 vez por dia, conjura uma magia uma Complexidade acima do limite, com +2 de Estresse extra."],
 "Expert à Distância":["P","Ataques à distância causam +1 Ferimento. Pode ser escolhida de novo (+1 a cada vez)."],
 "Expert Corpo-a-Corpo":["P","Ataques corporais causam +1 Ferimento. Até 2 vezes."],
 "Expert em Oratória":["P","Escolha uma Função: +2 em testes contestados e de conjuração com ela. Até 3 vezes, uma Função nova a cada vez."],
 "Ladinagem":["P","Furtividade, roubar sem ser visto, abrir fechaduras. +2 nos testes; cada escolha extra soma mais +2."],
 "Performance":["P","Arte em geral, num ofício à escolha (dança, canto, instrumento, teatro). +2 nos testes; cada escolha traz um novo ofício."],
 "Perspicácia":["P","Olhar treinado para detalhes de lugares e pessoas. +2 nos testes; cada escolha extra soma mais +2."],
 "Protetor":["P","+1 nos testes de uma Reação feita para proteger outra criatura."],
 "Pronto para ação":["P","+3 na rolagem de Iniciativa."],
 "Reflexos Mágicos":["P","Pode usar qualquer Complexidade de magia como Reação de Defesa contra ataques não mágicos, se a Mente permitir."],
 "Rituais de Adivinhação":["P","Ritual de Alma, Dificuldade 10: no sucesso, faz ao Narrador uma pergunta de sim ou não. Custa 4 de Estresse; 1 vez por sessão."],
 "Sobrevivência":["P","Rastrear, coletar alimento, acampar e se orientar em lugares inóspitos. +2 nos testes por escolha."],
 "Acuidade Mágica":["T","+1 nos testes de Conjuração ao conjurar como Reação a outra magia."],
 "Agilidade Mental":["T","Duas Reações entre os turnos em vez de uma; a segunda acumula +3 de Estresse."],
 "Artes de Combate":["T","Na Iniciativa, pode não rolar e escolher onde ficar na Ordem."],
 "Conhecimento em História":["T","Eventos, pessoas, lugares e conflitos. +2 nos testes; cada escolha extra soma mais +2."],
 "Conhecimento em Geografia":["T","Topografia e clima do Mundano e do Fantástico. +2 nos testes por escolha."],
 "Conhecimento em Herbologia":["T","Plantas comuns, raras e mágicas. +2 nos testes por escolha."],
 "Conhecimento em Computação":["T","Computadores, criptografia, sistemas e hacking básico. +2 nos testes por escolha."],
 "Comunicação de Intenção":["T","Percebe intenções e emoções simples de qualquer criatura. Teste de Alma, Dif 8, para se entender sem idioma em comum."],
 "Culinária":["T","1 vez por dia, quem comer seus pratos recupera 1 Ferimento a mais no próximo descanso. Com ingredientes mágicos, dá +1 ao limite de Estresse ou de Ferimentos."],
 "Dedicado":["T","Na 1ª vez de cada dia que ganharia um Dado de Empenho, ganha 1 dado extra."],
 "Fanático por Fantásticos":["T","Escolha um tipo de Ficha Base de criatura: +1 em testes que envolvam esse tipo."],
 "Fanático por Mundanos":["T","+1 em testes que envolvam seres Mundanos que não sejam você."],
 "Inspirador":["T","No seu turno, em vez de Interagir com o Ambiente, dá um Dado de Empenho a um aliado (1 vez por dia por pessoa)."],
 "Linguista":["T","Aprende 2 idiomas novos. Pode ser escolhida de novo."],
 "Magia Entre Nós":["T","Encontrar magia no Mundano. +2 nos testes para localizar itens mágicos, santuários ou sinais de magia, por escolha."],
 "Medicina":["T","Fisiologia e tratamento de aflições físicas. +2 nos testes por escolha."],
 "Mecânica e Engenharia":["T","Conhecimentos básicos sobre máquinas. +2 nos testes por escolha."],
 "Pesquisador":["T","+1 em qualquer teste de Habilidade ou Atributo para obter informação."],
 "Reconhecer Sinais":["T","Sabe onde ficam Portais do Meio em cidade familiar; em outra, descobre com 10 minutos de pesquisa."],
 "Técnicas de Apoio":["T","Magia conjurada em criatura voluntária acumula 1 de Estresse a menos (mínimo 1)."],
 "Treinamento Mágico":["T","Aprende uma nova Característica para o Grimório. Até 3 vezes, uma Característica diferente a cada vez."],
 "Zoologia":["T","Fisiologia e comportamento de animais Mundanos e Fantásticos. +2 nos testes por escolha."]
};
// Procura a habilidade pelo nome escrito na ficha (aceita "(Origem)", "(Triz)" etc.)
window.habInfo=function(linha){
  var H=window.HABILIDADES||{}, n=String(linha||'').trim(); if(!n) return null;
  var nota=''; var m=n.match(/\(([^)]*)\)\s*$/); if(m){ nota=m[1]; n=n.replace(/\s*\([^)]*\)\s*$/,''); }
  var k=H[n]?n:Object.keys(H).filter(function(x){return x.toLowerCase()===n.toLowerCase();})[0];
  if(!k) return {nome:n,nota:nota,desc:''};
  return {nome:n,nota:nota,tipo:H[k][0],desc:H[k][1]};
};
