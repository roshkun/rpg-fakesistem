// 6 magias por personagem, todas dentro dos limites da ficha: só partículas que ela conhece,
// só complementos de 1º nível e Complexidade até o que a Mente permite (0-1 Regular, 2-3 Difícil, 4-5 Complexa).
// f = Função, o = Objeto, c = Características, m = Complementos (códigos de data/particulas.js).
// Lembrete: no Mundano só se conjura com Totem ou dentro de um Santuário; por isso nenhuma magia aqui depende de cenário Mundano (câmeras, computadores, IP...).
// or: 'livro' = exemplo do livro sem mudança · 'adapt' = exemplo do livro com partículas trocadas (lv = frase original)
//     'ficha' = a magia-símbolo da própria ficha · 'nova' = no estilo do livro. A Complexidade é um exemplo: o narrador ajusta.
window.MAGIAS = {
  aluno1: [
    { nome:'Parede de pedra', f:'ET', o:'ELI', c:['ROC'], m:['SAR'], cx:'Trivial', or:'adapt', lv:'Eveli Roc Sar', efeito:'Erguer uma parede de pedra contra projéteis.' },
    { nome:'Equilíbrio', f:'AM', o:'IVI', c:['PHYS'], m:[], cx:'Trivial', or:'adapt', lv:'Emuna Phys', efeito:'Melhorar o equilíbrio de uma pessoa.' },
    { nome:'Torre de pedra', f:'ET', o:'OMU', c:['ROC'], m:[], cx:'Regular', or:'adapt', lv:'Evomu Roc', efeito:'Erguer uma torre de pedra para passar a noite.' },
    { nome:'Armas não tocam', f:'AM', o:'IVI', c:['VIB'], m:[], cx:'Regular', or:'adapt', lv:'Irexa Impe', efeito:'Impedir que armas toquem o corpo de uma pessoa por 5 minutos.' },
    { nome:'Preso à rocha', f:'ET', o:'IVI', c:['ROC'], m:[], cx:'Difícil', or:'adapt', lv:'Arivi Roc', efeito:'Prender uma pessoa a uma pedra gigante para que ela não ande.' },
    { nome:'Barreira d’água', f:'ET', o:'ELI', c:['QUAN'], m:['SAR'], cx:'Difícil', or:'ficha', efeito:'Erguer barreiras de água para proteger o grupo.' }
  ],
  aluno2: [
    { nome:'Tocha na caverna', f:'IM', o:'EXA', c:['IG'], m:['MIN'], cx:'Trivial', or:'adapt', lv:'Evora Lum Min', efeito:'Acender uma chama pequena num objeto para clarear uma caverna.' },
    { nome:'Faísca', f:'IM', o:'EXA', c:['TRIZ'], m:['MIN'], cx:'Trivial', or:'nova', efeito:'Soltar uma faísca para acender um pavio ou dar um choque leve num objeto de metal.' },
    { nome:'Rajada de fogo', f:'IM', o:'ERA', c:['IG'], m:[], cx:'Regular', or:'adapt', lv:'Imeli adaQuan', efeito:'Usar o fogo do ambiente para disparar uma rajada de chamas.' },
    { nome:'Desmontar', f:'AS', o:'OMU', c:[], m:[], cx:'Regular', or:'livro', lv:'Asomu', efeito:'Desmontar uma barraca armada.' },
    { nome:'Quebrar barreiras', f:'AS', o:'OMU', c:['VIB'], m:[], cx:'Difícil', or:'ficha', efeito:'Quebrar fechaduras e derrubar barreiras físicas ou mágicas.' },
    { nome:'Chão eletrificado', f:'IM', o:'ERA', c:['TRIZ'], m:[], cx:'Difícil', or:'adapt', lv:'Alera Triz', efeito:'Eletrificar o chão do local.' }
  ],
  aluno3: [
    { nome:'Planta luminosa', f:'AN', o:'ORA', c:['LUM'], m:['MIN'], cx:'Trivial', or:'adapt', lv:'Evora Lum Min', efeito:'Reavivar uma planta e fazê-la brilhar para clarear uma caverna.' },
    { nome:'Sono tranquilo', f:'AM', o:'IVI', c:['CYSG'], m:['MIN'], cx:'Trivial', or:'nova', efeito:'Ajudar alguém a pegar no sono e dormir sem pesadelos.' },
    { nome:'Restaurar 1 Ferimento', f:'AN', o:'IVI', c:['PHYS'], m:['MIN'], cx:'Regular', or:'livro', lv:'Anivi Phys Min', efeito:'Restaurar 1 Ferimento.' },
    { nome:'Erva revivida', f:'AN', o:'ORA', c:['PHYS'], m:[], cx:'Regular', or:'adapt', lv:'Anibo', efeito:'Recuperar uma planta ou erva que murchou há poucos dias.' },
    { nome:'Reorganizar o corpo', f:'AN', o:'IVI', c:['PHYS'], m:[], cx:'Difícil', or:'ficha', efeito:'Usar palavras precisas para reorganizar a realidade de um corpo ferido.' },
    { nome:'Guarda da alma', f:'AM', o:'ANI', c:['LUM'], m:[], cx:'Difícil', or:'nova', efeito:'Proteger a alma de alguém de influências espirituais com um manto de luz.' }
  ],
  aluno4: [
    { nome:'Lembrar do esquecido', f:'IL', o:'IMU', c:[], m:[], cx:'Trivial', or:'livro', lv:'Ilimu', efeito:'Fazer alguém lembrar do que esqueceu.' },
    { nome:'Mentes ligadas', f:'OR', o:'IMU', c:[], m:[], cx:'Regular', or:'adapt', lv:'Unimu', efeito:'Ligar duas mentes para conversarem por pensamento.' },
    { nome:'Resíduos mágicos', f:'IL', o:'AZI', c:['MAG'], m:[], cx:'Regular', or:'ficha', efeito:'Ler resíduos mágicos.' },
    { nome:'Entendido sem idioma', f:'OR', o:'AZI', c:['HIN'], m:[], cx:'Trivial', or:'adapt', lv:'Alala Hin', efeito:'Fazer a pessoa ser entendida apesar da barreira do idioma.' },
    { nome:'Rastro de portais', f:'IL', o:'AZI', c:['RAT'], m:[], cx:'Difícil', or:'nova', efeito:'Perceber onde há portais e passagens para outros planos nas proximidades.' },
    { nome:'Bolso dimensional', f:'OR', o:'INA', c:['RAT'], m:[], cx:'Complexa', or:'adapt', lv:'Enivi Rat', efeito:'Enviar um objeto para uma dimensão de bolso.' }
  ],
  aluno5: [
    { nome:'Sussurros', f:'AL', o:'UNA', c:['MUL'], m:[], cx:'Trivial', or:'livro', lv:'Aluna Mul', efeito:'Fazer alguém ouvir sussurros com clareza.' },
    { nome:'Luz suave', f:'EV', o:'IRO', c:['LUM'], m:['MIN'], cx:'Trivial', or:'adapt', lv:'Evora Lum Min', efeito:'Invocar uma luz suave para clarear uma caverna.' },
    { nome:'Miragem de objeto', f:'EV', o:'UNA', c:['ALUI','OCUL'], m:['SIN'], cx:'Regular', or:'nova', efeito:'Fazer todos verem um objeto simples que não existe: uma chave, uma espada, um papel.' },
    { nome:'Peça nos inspetores', f:'EV', o:'UNA', c:['ALUI','LUM'], m:['MIN'], cx:'Regular', or:'nova', efeito:'Faíscas de luz ilusória que enganam o olhar por alguns segundos, só para pregar uma peça.' },
    { nome:'Ver o som', f:'AL', o:'UNA', c:['OCUL','MUL'], m:[], cx:'Difícil', or:'adapt', lv:'Unazi Ocul Mul', efeito:'Fazer alguém ver o som e ouvir as cores.' },
    { nome:'Imagens efêmeras', f:'EV', o:'UNA', c:['ALUI'], m:[], cx:'Difícil', or:'ficha', efeito:'Criar imagens efêmeras formadas por partículas caóticas.' }
  ],
  aluno6: [
    { nome:'Equilíbrio', f:'ET', o:'IVI', c:['TUM'], m:[], cx:'Trivial', or:'adapt', lv:'Emuna Phys', efeito:'Melhorar o equilíbrio de uma pessoa.' },
    { nome:'Bola na mão', f:'ET', o:'EXA', c:['TUM'], m:['MIN'], cx:'Trivial', or:'nova', efeito:'Fazer um objeto leve rolar ou voltar até a mão.' },
    { nome:'Ponto visível', f:'IT', o:'IVI', c:[], m:[], cx:'Regular', or:'livro', lv:'Itivi', efeito:'Levar uma pessoa a um ponto visível a até 10 metros.' },
    { nome:'Peso que muda', f:'ET', o:'IVI', c:['YM'], m:[], cx:'Regular', or:'ficha', efeito:'Alterar o próprio peso para saltar prédios.' },
    { nome:'Pique', f:'IT', o:'IVI', c:['AST'], m:[], cx:'Regular', or:'nova', efeito:'Correr muito mais rápido por alguns segundos, num pique curto.' },
    { nome:'Chão rolante', f:'ET', o:'ERA', c:['TUM'], m:['MIN'], cx:'Regular', or:'nova', efeito:'Fazer um trecho curto do chão deslizar como esteira, levando quem estiver em cima.' }
  ]
};
