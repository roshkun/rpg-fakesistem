// Mesa: canal de tempo real (ntfy.sh) e imagens do repositório que o mestre pode exibir.
// A chave pública valida as mensagens; a privada fica criptografada na Área do Mestre.
window.MESA={
 "personagens": [{"id": "aluno1", "n": "Vanguarda"}, {"id": "aluno2", "n": "Rebelde"}, {"id": "aluno3", "n": "Cuidante"}, {"id": "aluno4", "n": "Estudante"}, {"id": "aluno5", "n": "Ilusionista"}, {"id": "aluno6", "n": "Atleta"}],
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
 {"c": "cenario", "t": "Sala coberta de vegetação", "s": "assets/cenario/sala-coberta-de-vegetacao.webp"},
 {"c": "cenario", "t": "Corredor com vinhas travando a passagem", "s": "assets/cenario/corredor-vinhas-travando.webp"},
 {"c": "cenario", "t": "Construção abandonada (exterior)", "s": "assets/cenario/construcao-abandonada-exterior.webp"},
 {"c": "cenario", "t": "Sala de aula de Brasilis", "s": "assets/cenario/sala-de-aula-brasilis.webp"},
 {"c": "cenario", "t": "Entrada: vinhas combatendo os sinais", "s": "assets/cenario/entrada-vinhas-combatendo.webp"},
 {"c": "cenario", "t": "Entrada: vinhas combatendo (versão 2)", "s": "assets/cenario/entrada-vinhas-combatendo-versao-2.webp"},
 {"c": "cenario", "t": "Entrada: vestígios", "s": "assets/cenario/entrada-vestigios.webp"},
 {"c": "cenario", "t": "Mão do professor com o besouro", "s": "assets/cenario/mao-professor-besouro.webp"},
 {"c": "cenario", "t": "Sala vazia, sinais de obra", "s": "assets/cenario/sala-vazia-obra.webp"},
 {"c":"npcs","t":"NPC A","s":"assets/npcs/npc-a.webp"},
 {"c":"npcs","t":"NPC B","s":"assets/npcs/npc-b.webp"},
 {"c":"npcs","t":"Professor Jonas \"Fagulha\"","s":"assets/npcs/professor-jonas-fagulha.webp"},
 {"c":"npcs","t":"NPC C","s":"assets/npcs/npc-c.webp"},
  {
   "c": "cenario",
   "t": "Escola Brasilis",
   "s": "assets/cenario/escola-brasilis.webp"
  },
  {
   "c": "personagens",
   "t": "Vanguarda",
   "s": "assets/personagens/a-vanguarda-2.webp"
  },
  {
   "c": "personagens",
   "t": "Rebelde",
   "s": "assets/personagens/o-rebelde.webp"
  },
  {
   "c": "personagens",
   "t": "Cuidante",
   "s": "assets/personagens/o-curandeiro.webp"
  },
  {
   "c": "personagens",
   "t": "Estudante",
   "s": "assets/personagens/o-academico.webp"
  },
  {
   "c": "personagens",
   "t": "Ilusionista",
   "s": "assets/personagens/o-ilusionista.webp"
  },
  {
   "c": "personagens",
   "t": "Atleta",
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
 "titulos": {"sala-coberta-de-vegetacao":"Sala coberta de vegetação","corredor-vinhas-travando":"Corredor com vinhas travando a passagem", "construcao-abandonada-exterior":"Construção abandonada (exterior)", "sala-de-aula-brasilis":"Sala de aula de Brasilis", "entrada-vinhas-combatendo":"Entrada: vinhas combatendo os sinais", "entrada-vinhas-combatendo-versao-2":"Entrada: vinhas combatendo (versão 2)", "entrada-vestigios":"Entrada: vestígios", "mao-professor-besouro":"Mão do professor com o besouro", "sala-vazia-obra":"Sala vazia, sinais de obra","npc-a":"NPC A","npc-b":"NPC B","professor-jonas-fagulha":"Professor Jonas \"Fagulha\"","npc-c":"NPC C","escola-brasilis": "Escola Brasilis", "a-vanguarda": "Vanguarda", "a-vanguarda-2": "Vanguarda", "jabuti-muralha": "Jabuti-Muralha", "o-rebelde": "Rebelde", "brasinha": "Brasinha", "o-curandeiro": "Cuidante", "cantiga": "Cantiga", "o-academico": "Estudante", "verbete": "Verbete", "o-ilusionista": "Ilusionista", "miragem": "Miragem", "o-atleta": "Atleta", "corisco": "Corisco"},
 "categorias": [["personagens","Personagens"],["mascotes","Mascotes"],["npcs","NPCs"],["cenario","Cenário"],["itens","Itens"]],
 "repo": {"nome":"roshkun/rpg-fakesistem","ramo":"main","pasta":"brasilis/assets"}
};
