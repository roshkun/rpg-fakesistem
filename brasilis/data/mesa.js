// Mesa: canal de tempo real (ntfy.sh) e imagens do repositório que o mestre pode exibir.
// A chave pública valida as mensagens; a privada fica criptografada na Área do Mestre.
window.MESA={
 "personagens": [{"id": "aluno1", "n": "A Vanguarda"}, {"id": "aluno2", "n": "O Rebelde"}, {"id": "aluno3", "n": "O Curandeiro"}, {"id": "aluno4", "n": "O Acadêmico"}, {"id": "aluno5", "n": "O Ilusionista"}, {"id": "aluno6", "n": "O Atleta"}],
 "server": "https://ntfy.sh",
 "topic": "etmos-mesa-66e4eb7d11b1a41cd938a373",
 "pub": {
  "key_ops": [
   "verify"
  ],
  "ext": true,
  "kty": "EC",
  "x": "kGBZS6oxtkJr18bcVreJh3xzwXwbYMr_SpAkEh2hDzg",
  "y": "OGIiN3xgxnixhyMsAa0ZuRVvsIKg8sGDMV_7O8dbdcg",
  "crv": "P-256"
 },
 "imagens": [
 {"c": "cenario", "t": "Corredor com vinhas travando a passagem", "s": "assets/cenario/corredor-vinhas-travando.webp"},
 {"c": "cenario", "t": "Construção abandonada (exterior)", "s": "assets/cenario/construcao-abandonada-exterior.webp"},
 {"c": "cenario", "t": "Sala de aula de Brasilis", "s": "assets/cenario/sala-de-aula-brasilis.webp"},
 {"c": "cenario", "t": "Entrada: vinhas combatendo os sinais", "s": "assets/cenario/entrada-vinhas-combatendo.webp"},
 {"c": "cenario", "t": "Entrada: vinhas combatendo (versão 2)", "s": "assets/cenario/entrada-vinhas-combatendo-versao-2.webp"},
 {"c": "cenario", "t": "Entrada: vestígios da Perna Cabeluda", "s": "assets/cenario/entrada-vestigios-perna-cabeluda.webp"},
 {"c": "cenario", "t": "Mão do professor com o besouro", "s": "assets/cenario/mao-professor-besouro.webp"},
 {"c": "cenario", "t": "Sala vazia, sinais de obra", "s": "assets/cenario/sala-vazia-obra.webp"},
 {"c":"npcs","t":"Caipora","s":"assets/npcs/caipora.webp"},
 {"c":"npcs","t":"Perna Cabeluda","s":"assets/npcs/perna-cabeluda.webp"},
 {"c":"npcs","t":"Professor Jonas \"Fagulha\"","s":"assets/npcs/professor-jonas-fagulha.webp"},
 {"c":"npcs","t":"Orador Buscador","s":"assets/npcs/orador-buscador.webp"},
  {
   "c": "cenario",
   "t": "Escola Brasilis",
   "s": "assets/cenario/escola-brasilis.webp"
  },
  {
   "c": "personagens",
   "t": "A Vanguarda",
   "s": "assets/personagens/a-vanguarda.webp"
  },
  {
   "c": "personagens",
   "t": "O Rebelde",
   "s": "assets/personagens/o-rebelde.webp"
  },
  {
   "c": "personagens",
   "t": "O Curandeiro",
   "s": "assets/personagens/o-curandeiro.webp"
  },
  {
   "c": "personagens",
   "t": "O Acadêmico",
   "s": "assets/personagens/o-academico.webp"
  },
  {
   "c": "personagens",
   "t": "O Ilusionista",
   "s": "assets/personagens/o-ilusionista.webp"
  },
  {
   "c": "personagens",
   "t": "O Atleta",
   "s": "assets/personagens/o-atleta.webp"
  },
  {
   "c": "mascotes",
   "t": "Jabuti-Muralha",
   "s": "assets/mascotes/jabuti-muralha.webp"
  },
  {
   "c": "mascotes",
   "t": "Brasinha",
   "s": "assets/mascotes/brasinha.webp"
  },
  {
   "c": "mascotes",
   "t": "Cantiga",
   "s": "assets/mascotes/cantiga.webp"
  },
  {
   "c": "mascotes",
   "t": "Verbete",
   "s": "assets/mascotes/verbete.webp"
  },
  {
   "c": "mascotes",
   "t": "Miragem",
   "s": "assets/mascotes/miragem.webp"
  },
  {
   "c": "mascotes",
   "t": "Corisco",
   "s": "assets/mascotes/corisco.webp"
  }
 ],
 "titulos": {"corredor-vinhas-travando":"Corredor com vinhas travando a passagem", "construcao-abandonada-exterior":"Construção abandonada (exterior)", "sala-de-aula-brasilis":"Sala de aula de Brasilis", "entrada-vinhas-combatendo":"Entrada: vinhas combatendo os sinais", "entrada-vinhas-combatendo-versao-2":"Entrada: vinhas combatendo (versão 2)", "entrada-vestigios-perna-cabeluda":"Entrada: vestígios da Perna Cabeluda", "mao-professor-besouro":"Mão do professor com o besouro", "sala-vazia-obra":"Sala vazia, sinais de obra","caipora":"Caipora","perna-cabeluda":"Perna Cabeluda","professor-jonas-fagulha":"Professor Jonas \"Fagulha\"","orador-buscador":"Orador Buscador","escola-brasilis": "Escola Brasilis", "a-vanguarda": "A Vanguarda", "jabuti-muralha": "Jabuti-Muralha", "o-rebelde": "O Rebelde", "brasinha": "Brasinha", "o-curandeiro": "O Curandeiro", "cantiga": "Cantiga", "o-academico": "O Acadêmico", "verbete": "Verbete", "o-ilusionista": "O Ilusionista", "miragem": "Miragem", "o-atleta": "O Atleta", "corisco": "Corisco"},
 "categorias": [["personagens","Personagens"],["mascotes","Mascotes"],["npcs","NPCs"],["cenario","Cenário"]],
 "repo": {"nome":"roshkun/rpg-fakesistem","ramo":"main","pasta":"brasilis/assets"}
};
