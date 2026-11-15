// Magias de exemplo por personagem (4 cada, de Trivial a Complexa), partindo dos exemplos do livro.
// o = origem: 'livro' (exemplo do livro, sem mudança), 'adapt' (exemplo do livro com partículas trocadas pelas que a personagem conhece; lv = frase original) ou 'nova' (no estilo do livro).
// f = Função, o = Objeto, c = Características, m = Complementos modificadores (códigos de data/particulas.js).
// Só usam partículas que a personagem já conhece e complementos de 1º nível. Mexa à vontade: são exemplos.
window.MAGIAS = {
  aluno1: [
    { nome:'Parede de pedra', f:'ET', o:'ELI', c:['ROC'], m:['SAR'], cx:'Trivial', or:'adapt', lv:'Eveli Roc Sar', efeito:'Erguer uma parede de pedra contra projéteis.' },
    { nome:'Torre de pedra', f:'ET', o:'OMU', c:['ROC'], m:[], cx:'Regular', or:'adapt', lv:'Evomu Roc', efeito:'Erguer uma torre de pedra para passar a noite.' },
    { nome:'Preso à rocha', f:'ET', o:'IVI', c:['ROC'], m:[], cx:'Difícil', or:'adapt', lv:'Arivi Roc', efeito:'Prender uma pessoa a uma pedra gigante para que ela não ande.' },
    { nome:'Redoma de força', f:'AM', o:'IVI', c:['VIB'], m:['SAN','MOR'], cx:'Complexa', or:'nova', efeito:'Cobrir um grupo com uma grande redoma de força que absorve impactos e explosões por toda a cena.' }
  ],
  aluno2: [
    { nome:'Faísca', f:'IM', o:'EXA', c:['TRIZ'], m:['MIN'], cx:'Trivial', or:'nova', efeito:'Soltar uma faísca para acender um pavio ou dar um choque leve num objeto de metal.' },
    { nome:'Desmontar', f:'AS', o:'OMU', c:[], m:[], cx:'Regular', or:'livro', lv:'Asomu', efeito:'Desmontar uma barraca armada.' },
    { nome:'Chão eletrificado', f:'IM', o:'ERA', c:['TRIZ'], m:[], cx:'Difícil', or:'adapt', lv:'Alera Triz', efeito:'Eletrificar o chão do local.' },
    { nome:'Rastro de fogo e raio', f:'IM', o:'ERA', c:['TRIZ','IG'], m:['SAR','MOR'], cx:'Complexa', or:'nova', efeito:'Abrir uma linha de fogo e raios que irrompe do chão e varre tudo à frente.' }
  ],
  aluno3: [
    { nome:'Planta luminosa', f:'AN', o:'ORA', c:['LUM'], m:['MIN'], cx:'Trivial', or:'adapt', lv:'Evora Lum Min', efeito:'Reavivar uma planta e fazê-la brilhar para clarear uma caverna.' },
    { nome:'Restaurar 1 Ferimento', f:'AN', o:'IVI', c:['PHYS'], m:['MIN'], cx:'Regular', or:'livro', lv:'Anivi Phys Min', efeito:'Restaurar 1 Ferimento.' },
    { nome:'Cura de luz', f:'AN', o:'IVI', c:['PHYS','LUM'], m:['MOR'], cx:'Difícil', or:'nova', efeito:'Fechar um ferimento sério com luz morna, estancando o sangue e restaurando a carne.' },
    { nome:'Redoma das almas', f:'AM', o:'ANI', c:['LUM'], m:['SAN'], cx:'Complexa', or:'nova', efeito:'Uma redoma de luz impede que espíritos, maldições e influências toquem as almas dentro dela.' }
  ],
  aluno4: [
    { nome:'Lembrar do esquecido', f:'IL', o:'IMU', c:[], m:[], cx:'Trivial', or:'livro', lv:'Ilimu', efeito:'Fazer alguém lembrar do que esqueceu.' },
    { nome:'Rastrear sinal', f:'IL', o:'INA', c:['TRIZ'], m:[], cx:'Regular', or:'adapt', lv:'Ilina Mutazi', efeito:'Descobrir a localização exata de um aparelho conectado, como um endereço de IP.' },
    { nome:'Pensamento sem língua', f:'OR', o:'IMU', c:['HIN'], m:[], cx:'Difícil', or:'nova', efeito:'Enviar um pensamento a alguém que o entenda, sem barreira de idioma.' },
    { nome:'Assinatura mágica', f:'IL', o:'AZI', c:['MAG','RAT'], m:['MOR'], cx:'Complexa', or:'nova', efeito:'Ler a origem de uma magia, inclusive de portais e de outros planos próximos.' }
  ],
  aluno5: [
    { nome:'Sussurros', f:'AL', o:'UNA', c:['MUL'], m:[], cx:'Trivial', or:'livro', lv:'Aluna Mul', efeito:'Fazer alguém ouvir sussurros com clareza.' },
    { nome:'Miragem de objeto', f:'EV', o:'UNA', c:['ALUI','OCUL'], m:['SIN'], cx:'Regular', or:'nova', efeito:'Fazer todos verem um objeto simples que não existe: uma chave, uma espada, um papel.' },
    { nome:'Ver o som', f:'AL', o:'UNA', c:['OCUL','MUL'], m:[], cx:'Difícil', or:'adapt', lv:'Unazi Ocul Mul', efeito:'Fazer alguém ver o som e ouvir as cores.' },
    { nome:'Máscara coletiva', f:'EV', o:'IRO', c:['ALUI','LUM'], m:['SAN','MOR'], cx:'Complexa', or:'nova', efeito:'Uma grande esfera de luz ilusória faz o grupo parecer outras pessoas e esconde o que há dentro.' }
  ],
  aluno6: [
    { nome:'Bola na mão', f:'ET', o:'EXA', c:['TUM'], m:['MIN'], cx:'Trivial', or:'nova', efeito:'Fazer um objeto leve rolar ou voltar até a mão.' },
    { nome:'Ponto visível', f:'IT', o:'IVI', c:[], m:[], cx:'Regular', or:'livro', lv:'Itivi', efeito:'Levar uma pessoa a um ponto visível a até 10 metros.' },
    { nome:'Menos gravidade', f:'ET', o:'ERA', c:['YM'], m:[], cx:'Difícil', or:'adapt', lv:'Iniro Ym', efeito:'Reduzir a gravidade nos locais que você consiga ver.' },
    { nome:'Chão sem gravidade', f:'ET', o:'ERA', c:['YM'], m:['SAN','MOR'], cx:'Complexa', or:'nova', efeito:'Inverter a gravidade numa grande área circular do terreno, erguendo quem estiver nela.' }
  ]
};
