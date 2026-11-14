# Brasilis — Etmos RPG

Abertura (`index.html`) + ficha de cada aluno (`ficha.html?aluno=alunoN`).

## Editar alunos
Tudo está em `data/alunos.js`: `nome`, `crop` (enquadramento da foto) e `ficha` (valores iniciais dos campos).
Chaves da ficha: jogador, personagem, ano, idade, nivel, dados, corpo/alma/mente (0–6), fadiga, complex,
feridas_atual, feridas_max, estresse_atual, estresse_max, m_fis/m_emo/m_men (0–5), origens, praticas, teoricas,
inventario, basico, aparencia, pontos, futuro, val_l1, val_l2, val_r1, val_r2 e as partículas
fun_0…fun_16, obj_0…obj_18, car_0…car_18, car2_0…car2_14 (true = marcada).
O botão "Exportar dados" na ficha gera um JSON nesse formato.

## Publicar (GitHub Pages)
Publicado junto com o resto do repositório: `<url-do-pages>/brasilis/`.
