# rpg-fakesistem

Material de apoio para RPG. Três coisas moram aqui:

| Parte | Arquivos | O que é |
|---|---|---|
| **SoftMed (sistema falso)** | `index.html`, `sistema.html`, `admin.html`, `img/` | Prontuário hospitalar e laudos funerários para a cena, numa tela de monitor de tubo (só no PC; `?crt=0` desliga). Os dados vêm de uma planilha do Google **pela API do Apps Script**, com token. |
| **Brasilis / Etmos** | `brasilis/` | Fichas, dicionário, Mesa e área do mestre (tem o próprio `assets/LEIAME.md`). |
| **Outros** | `ficha.html`, `magic.html`, `magic_c.html`, `criptex-cinematografico.html` | Gerador de fichas Cypher e três versões do Criptex Arcano. |

`ferramentas.html` é o menu do mestre com links para tudo (não aparece no índice do jogo).

## Segurança (leia antes de jogar)

**A planilha não é mais publicada na web.** O `sistema.html` e o `admin.html` leem e gravam pela API do Apps Script, que exige token:

| Token | Onde fica | Para quê |
|---|---|---|
| `ADMIN_TOKEN` | Propriedades do script + sua cabeça/gerenciador de senhas | Tudo (ler, criar, editar, apagar). Só o painel `admin.html`. |
| `READ_TOKEN` | Propriedades do script | **Só leitura** (`getData`). É o que o `sistema.html` usa. |

- **Nada disso está no código do site.** Site estático não consegue esconder segredo: quem abre a página vê o que ela carrega. Por isso a URL e o token ficam só no navegador do mestre: na primeira vez o `sistema.html` pede o registro do terminal, ou você abre o link gerado em `gm-cifrar.html` (seção 3), que grava os dados no navegador e some da barra de endereço (ficam depois do `#`, parte que nunca vai a servidor). Para esquecer, use "Reconfigurar terminal" na tela de login ou limpe os dados do site.
- **Não coloque URL/token no repositório nem em links públicos.** Se vazar, troque o valor da propriedade no Apps Script (o token antigo deixa de valer na hora).
- Mesmo com a API protegida, o que está em texto puro na planilha é visto por quem tiver o token de leitura. Para esconder (por exemplo, do navegador de um jogador que use o terminal), use `gm-cifrar.html`: **hash** do código (`sha256:...`) nas colunas `observationCode`/`savedPassword` e observação **cifrada** (`enc:...`) em `medicalNotes`. No "modo hackeado" (erro das 3 tentativas) só as observações em texto puro são reveladas.
- Tudo que vem da planilha é exibido como texto: só `<b>`, `<i>`, `<strong>`, `<em>` e `<br>` funcionam como formatação. Links de foto só aceitam `https://`, `data:image/...` ou `img/...`.
- As páginas têm `noindex` e `no-referrer`.

### Código do Apps Script (início de `handleRequest`)

```js
const props = PropertiesService.getScriptProperties();
const tk = props.getProperty('ADMIN_TOKEN');
const rk = props.getProperty('READ_TOKEN');
const given = (e.parameter && e.parameter.token) || '';
const isAdmin = !!tk && given === tk;
const isRead = !!rk && given === rk && e.parameter.action === 'getData';
if (!isAdmin && !isRead) {
  return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'não autorizado' })).setMimeType(ContentService.MimeType.JSON);
}
```

Depois de mudar o código: Implantar > Gerenciar implantações > lápis > **Nova versão** (mantém a URL).

## Imagens

`img/` tem as fotos dos NPCs (já reduzidas, cerca de 150 a 300 KB cada). Os nomes dos arquivos aparecem no repositório público: evite nomes que entreguem a trama.
