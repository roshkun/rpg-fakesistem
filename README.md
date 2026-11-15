# rpg-fakesistem

Material de apoio para RPG. Três coisas moram aqui:

| Parte | Arquivos | O que é |
|---|---|---|
| **SoftMed (sistema falso)** | `index.html`, `sistema.html`, `admin.html`, `dados/`, `img/` | Prontuário hospitalar e laudos funerários para a cena. Os dados vêm de uma planilha do Google; se ela não responder, o sistema usa `dados/*.json`. |
| **Brasilis / Etmos** | `brasilis/` | Fichas, dicionário, Mesa e área do mestre (tem o próprio `assets/LEIAME.md`). |
| **Outros** | `ficha.html`, `magic.html`, `magic_c.html`, `criptex-cinematografico.html` | Gerador de fichas Cypher e três versões do Criptex Arcano. |

`ferramentas.html` é o menu do mestre com links para tudo (não aparece no índice do jogo).

## Segurança (leia antes de jogar)

- **A planilha é pública.** O link de leitura está no código de `sistema.html`. Tudo que está em texto puro nela (códigos dos médicos, observações) pode ser lido por quem abrir esse link. Para esconder:
  - abra `gm-cifrar.html`, gere o **hash** do código e cole na coluna `observationCode`/`savedPassword` (`sha256:...`);
  - gere a observação **cifrada** e cole na coluna `medicalNotes` (`enc:...`).
  Texto puro continua funcionando, então proteja só o que precisa. No "modo hackeado" (erro das 3 tentativas) só as observações em texto puro são reveladas.
- **O painel `admin.html` não guarda a URL do Apps Script no código.** Cole a URL e o token no próprio painel; ficam só no seu navegador. O token só protege se o seu Apps Script o conferir (veja abaixo).
- Tudo que vem da planilha é exibido como texto: só `<b>`, `<i>`, `<strong>`, `<em>` e `<br>` funcionam como formatação. Links de foto só aceitam `https://`, `data:image/...` ou `img/...`.
- As páginas têm `noindex` (não entram em buscadores) e `no-referrer`.

### Conferir o token no Apps Script

Se o endereço antigo do Apps Script já foi publicado neste repositório, **gere uma nova implantação** (Implantar > Gerenciar implantações > nova versão com novo URL) e desative a antiga. O URL antigo continua no histórico do Git.

No script, guarde o token em Propriedades do script (`ADMIN_TOKEN`) e confira no início de `doGet`/`doPost`:

```js
function autorizado(e) {
  const t = PropertiesService.getScriptProperties().getProperty('ADMIN_TOKEN');
  return t && e && e.parameter && e.parameter.token === t;
}
// no começo de doGet(e) e doPost(e):
// if (!autorizado(e)) return ContentService.createTextOutput(JSON.stringify({success:false,error:'não autorizado'})).setMimeType(ContentService.MimeType.JSON);
```

## Imagens

`img/` tem as fotos dos NPCs (já reduzidas, cerca de 150 a 300 KB cada). Os nomes dos arquivos aparecem no repositório público: evite nomes que entreguem a trama.
