// Magias de exemplo por personagem (4 cada, de Trivial a Complexa).
// f = Função, o = Objeto, c = Características, m = Complementos modificadores (códigos de data/particulas.js).
// Só usam partículas que a personagem já conhece e complementos de 1º nível. Mexa à vontade: são exemplos.
window.MAGIAS = {
  aluno1: [
    { nome:'Fio d’água', f:'ET', o:'ELI', c:['QUAN'], m:[], cx:'Trivial', efeito:'Fazer a água de um copo ou poça se erguer e girar, ou levar um fio d’água até a mão.' },
    { nome:'Pele de pedra', f:'AM', o:'IVI', c:['PHYS'], m:[], cx:'Regular', efeito:'Endurecer o corpo de uma pessoa por alguns minutos para aguentar um soco ou uma queda.' },
    { nome:'Muralha de pedra', f:'ET', o:'ELI', c:['ROC'], m:['SAR'], cx:'Difícil', efeito:'Levantar do chão uma parede de pedra para bloquear um corredor ou cobrir os colegas.' },
    { nome:'Redoma de força', f:'AM', o:'IVI', c:['VIB'], m:['SAN','MOR'], cx:'Complexa', efeito:'Cobrir um grupo com uma grande redoma de força que absorve impactos e explosões por toda a cena.' }
  ],
  aluno2: [
    { nome:'Faísca', f:'IM', o:'EXA', c:['TRIZ'], m:['MIN'], cx:'Trivial', efeito:'Soltar uma faísca para acender um pavio ou dar um choque leve num objeto de metal.' },
    { nome:'Arremesso', f:'IM', o:'EXA', c:['VIB'], m:[], cx:'Regular', efeito:'Arremessar com força uma pedra, cadeira ou garrafa contra o alvo.' },
    { nome:'Derrubar parede', f:'AS', o:'OMU', c:['VIB'], m:[], cx:'Difícil', efeito:'Demolir uma porta reforçada ou um trecho de parede de alvenaria.' },
    { nome:'Rastro de fogo e raio', f:'IM', o:'ERA', c:['TRIZ','IG'], m:['SAR','MOR'], cx:'Complexa', efeito:'Abrir uma linha de fogo e raios que irrompe do chão e varre tudo à frente.' }
  ],
  aluno3: [
    { nome:'Fechar arranhão', f:'AN', o:'IVI', c:['PHYS'], m:['MIN'], cx:'Trivial', efeito:'Fechar um corte pequeno ou aliviar uma dor leve de alguém.' },
    { nome:'Acalmar', f:'AM', o:'IVI', c:['BHAS'], m:[], cx:'Regular', efeito:'Proteger alguém do pânico ou do desespero, devolvendo a calma na hora.' },
    { nome:'Cura de luz', f:'AN', o:'IVI', c:['PHYS','LUM'], m:['MOR'], cx:'Difícil', efeito:'Fechar um ferimento sério com luz morna, estancando o sangue e restaurando a carne.' },
    { nome:'Redoma das almas', f:'AM', o:'ANI', c:['LUM'], m:['SAN'], cx:'Complexa', efeito:'Uma redoma de luz impede que espíritos, maldições e influências toquem as almas dentro dela.' }
  ],
  aluno4: [
    { nome:'Aparelho ligado?', f:'IL', o:'INA', c:['TRIZ'], m:['MIN'], cx:'Trivial', efeito:'Saber se um aparelho tem energia ou está transmitindo algo.' },
    { nome:'Tradução', f:'IL', o:'AZI', c:['HIN'], m:[], cx:'Regular', efeito:'Compreender um texto ou fala em idioma desconhecido.' },
    { nome:'Pensamento sem língua', f:'OR', o:'IMU', c:['HIN'], m:[], cx:'Difícil', efeito:'Enviar um pensamento a alguém que o entenda, sem barreira de idioma.' },
    { nome:'Assinatura mágica', f:'IL', o:'AZI', c:['MAG','RAT'], m:['MOR'], cx:'Complexa', efeito:'Ler a origem de uma magia, inclusive de portais e de outros planos próximos.' }
  ],
  aluno5: [
    { nome:'Passos distantes', f:'EV', o:'UNA', c:['MUL'], m:['MIN'], cx:'Trivial', efeito:'Criar um som pequeno e distante: passos, um estalo, um sussurro atrás da porta.' },
    { nome:'Miragem de objeto', f:'EV', o:'UNA', c:['ALUI','OCUL'], m:['SIN'], cx:'Regular', efeito:'Fazer todos verem um objeto simples que não existe: uma chave, uma espada, um papel.' },
    { nome:'Ninguém me viu', f:'AL', o:'IMU', c:['ALUI','OCUL'], m:[], cx:'Difícil', efeito:'Alterar o que o alvo percebe para que ele não registre a presença do conjurador.' },
    { nome:'Máscara coletiva', f:'EV', o:'IRO', c:['ALUI','LUM'], m:['SAN','MOR'], cx:'Complexa', efeito:'Uma grande esfera de luz ilusória faz o grupo parecer outras pessoas e esconde o que há dentro.' }
  ],
  aluno6: [
    { nome:'Bola na mão', f:'ET', o:'EXA', c:['TUM'], m:['MIN'], cx:'Trivial', efeito:'Fazer um objeto leve rolar ou voltar até a mão.' },
    { nome:'Pique', f:'IT', o:'IVI', c:['AST'], m:[], cx:'Regular', efeito:'Correr muito mais rápido por alguns segundos, num pique curto.' },
    { nome:'Salto sem peso', f:'IT', o:'IVI', c:['YM','TUM'], m:[], cx:'Difícil', efeito:'Saltar distâncias enormes e pousar leve, ou correr por uma parede.' },
    { nome:'Chão sem gravidade', f:'ET', o:'ERA', c:['YM'], m:['SAN','MOR'], cx:'Complexa', efeito:'Inverter a gravidade numa grande área circular do terreno, erguendo quem estiver nela.' }
  ]
};
