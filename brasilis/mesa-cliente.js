/* Mesa: recebe imagens exibidas pelo mestre (ntfy.sh + assinatura ECDSA).
   Inclua depois de data/mesa.js. API: window.MesaCliente.assinar() / .publicar(chavePrivadaJwk, acao, img, titulo) */
(function(){
"use strict";
var M=window.MESA; if(!M) return;
var ECDSA={name:'ECDSA',namedCurve:'P-256'}, ALG={name:'ECDSA',hash:'SHA-256'};
function b64(s){ var r=atob(s), u=new Uint8Array(r.length); for(var i=0;i<r.length;i++) u[i]=r.charCodeAt(i); return u; }
function b64e(buf){ var u=new Uint8Array(buf), s=''; for(var i=0;i<u.length;i++) s+=String.fromCharCode(u[i]); return btoa(s); }
function caminhoOk(p){ return typeof p==='string'&&/^assets\/(personagens|mascotes|npcs|cenario)\/[^\\:?#"'<>]+\.(webp|png|jpe?g|gif|svg|avif)$/i.test(p)&&p.indexOf('..')<0; }
function corpo(m){ return [m.a,m.s||'',m.n||'',m.t].join('|'); }
function enc(s){ return new TextEncoder().encode(s); }

/* ---- publicar (mestre) ---- */
function publicar(priv,acao,src,nome){
  var m={a:acao,s:src||'',n:nome||'',t:Date.now()};
  return crypto.subtle.importKey('jwk',priv,ECDSA,false,['sign']).then(function(k){ return crypto.subtle.sign(ALG,k,enc(corpo(m))); }).then(function(sig){
    m.g=b64e(sig);
    return fetch(M.server+'/'+M.topic,{method:'POST',body:JSON.stringify(m)});
  }).then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return m; });
}

/* ---- presença: só o personagem (sem nome, sem dados pessoais) ---- */
function pers(){
  var q=new URLSearchParams(location.search).get('aluno');
  if(q&&/^aluno\d+$/.test(q)){ try{ localStorage.setItem('etmos-mesa-pers',q); }catch(e){} return q; }
  try{ var v=localStorage.getItem('etmos-mesa-pers'); return /^aluno\d+$/.test(v||'')?v:''; }catch(e){ return ''; }
}
function sid(){ try{ var v=sessionStorage.getItem('etmos-mesa-sid'); if(!v){ v=Math.random().toString(36).slice(2,10); sessionStorage.setItem('etmos-mesa-sid',v); } return v; }catch(e){ return 'x'; } }
var batimento=null;
function batida(saindo){
  var p=pers(); if(!p) return;
  try{ fetch(M.server+'/'+M.topic+'-presenca',{method:'POST',body:JSON.stringify({p:p,s:sid(),t:Date.now(),o:saindo?1:0}),keepalive:true}); }catch(e){}
}
function presencaLigar(){ if(batimento||!pers()) return; batida(false); batimento=setInterval(function(){ batida(false); },90000); }
function presencaDesligar(){ if(batimento){ clearInterval(batimento); batimento=null; } batida(true); }
/* mestre: observa quem está na mesa -> cb(mapa {alunoN:true}) */
function observarPresenca(cb){
  var vistos={}; function calc(){ var agora=Date.now(), r={}; Object.keys(vistos).forEach(function(k){ var v=vistos[k]; if(!v.o&&agora-v.t<200000) r[v.p]=(r[v.p]||0)+1; }); cb(r); }
  var e=new EventSource(M.server+'/'+M.topic+'-presenca/sse?since=5m');
  e.onmessage=function(ev){ var d; try{ d=JSON.parse(ev.data); }catch(x){ return; } if(d.event!=='message') return; var m; try{ m=JSON.parse(d.message); }catch(x){ return; }
    if(!m||!/^aluno\d+$/.test(m.p||'')||typeof m.s!=='string') return; vistos[m.s]={p:m.p,t:(d.time?d.time*1000:Date.now()),o:m.o?1:0}; calc(); };
  setInterval(calc,10000); return e;
}

/* ---- consentimento: só escuta depois de "Entrar na mesa" ---- */
function naMesa(){ try{ return localStorage.getItem('etmos-mesa')==='sim'; }catch(e){ return false; } }
function recusou(){ try{ return sessionStorage.getItem('etmos-mesa-nao')==='1'; }catch(e){ return false; } }
function dialogo(corpoHtml,botoes){
  var d=document.createElement('div'); d.style.cssText='position:fixed;inset:0;z-index:500;background:rgba(14,8,20,.82);display:flex;align-items:center;justify-content:center;padding:18px';
  var bx=document.createElement('div'); bx.setAttribute('role','dialog'); bx.setAttribute('aria-modal','true');
  bx.style.cssText='max-width:380px;width:100%;background:#2a1a36;color:#f1ecf7;border:1px solid #7b4a8a;border-radius:14px;padding:20px;font:15px/1.5 system-ui,sans-serif;box-shadow:0 14px 50px rgba(0,0,0,.6)';
  bx.innerHTML=corpoHtml; var row=document.createElement('div'); row.style.cssText='display:flex;flex-direction:column;gap:8px;margin-top:16px';
  botoes.forEach(function(b){ var e=document.createElement('button'); e.type='button'; e.textContent=b[0]; e.style.cssText='font:700 14px system-ui,sans-serif;padding:13px;border-radius:10px;cursor:pointer;color:#fff;border:1px solid '+(b[2]?'#a974ba':'#5b3a6b')+';background:'+(b[2]?'#6e3a7d':'#3a2350'); e.onclick=function(){ d.remove(); b[1](); }; row.appendChild(e); });
  bx.appendChild(row); d.appendChild(bx); document.body.appendChild(d); row.firstChild.focus();
}
function entrar(){ try{ localStorage.setItem('etmos-mesa','sim'); sessionStorage.removeItem('etmos-mesa-nao'); }catch(e){} assinar(); atualizaBtn(); }
function sair(){ presencaDesligar(); try{ localStorage.removeItem('etmos-mesa'); }catch(e){} if(es){ es.close(); es=null; } ultimo=null; fechadoT=0; if(ov) ov.style.display='none'; atualizaBtn(); }
function perguntar(depois){
  if(naMesa()||recusou()||!window.EventSource){ depois(); return; }
  dialogo('<h2 style="margin:0 0 8px;font:700 19px Georgia,serif">Entrar na mesa?</h2><div>Ao entrar, este aparelho passa a <b>receber as imagens que o mestre exibir</b> durante a sessão. O mestre vê apenas <b>qual personagem está conectado</b>, sem nome nem qualquer dado pessoal. A conexão passa pelo serviço público ntfy.sh, que vê o endereço de rede de quem se conecta. Você pode sair da mesa a qualquer momento.</div>',
    [['Entrar na mesa',function(){ entrar(); depois(); },true],['Agora não',function(){ try{ sessionStorage.setItem('etmos-mesa-nao','1'); }catch(e){} depois(); }]]);
}
function menuMesa(){
  if(naMesa()){
    dialogo('<h2 style="margin:0 0 8px;font:700 19px Georgia,serif">Você está na mesa</h2><div>As imagens exibidas pelo mestre aparecem aqui automaticamente.</div>',
      [['Fechar',function(){}],['Rever a última imagem',function(){ fechadoT=0; abrir(); },true],['Sair da mesa',sair]]);
  } else { try{ sessionStorage.removeItem('etmos-mesa-nao'); }catch(e){} perguntar(function(){}); }
}

/* ---- receber (jogadores) ---- */
var pubKey=null, ultimo=null, fechadoT=0, es=null, ov=null, btn=null, ouvintes=[];
function chave(){ return pubKey?Promise.resolve(pubKey):crypto.subtle.importKey('jwk',M.pub,ECDSA,false,['verify']).then(function(k){ return (pubKey=k); }); }
function valido(m){ return chave().then(function(k){ return crypto.subtle.verify(ALG,k,b64(m.g),enc(corpo(m))); }).catch(function(){ return false; }); }

function overlay(){
  if(ov) return ov;
  ov=document.createElement('div'); ov.id='mesa-ov';
  ov.style.cssText='position:fixed;inset:0;z-index:400;background:rgba(14,8,20,.95);display:none;flex-direction:column;align-items:center;justify-content:center;padding:16px;gap:12px;font-family:Georgia,serif;color:#f1ecf7';
  ov.innerHTML='<img alt="" style="max-width:100%;max-height:78vh;object-fit:contain;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,.6)"><div class="cap" style="font:700 15px Georgia,serif;letter-spacing:.08em;text-transform:uppercase;color:#d9bfe8;text-align:center"></div><button type="button" style="font:700 14px system-ui,sans-serif;color:#fff;background:#6e3a7d;border:1px solid #a974ba;padding:12px 26px;border-radius:10px;cursor:pointer">Fechar</button>';
  ov.querySelector('button').onclick=fechar; ov.addEventListener('click',function(e){ if(e.target===ov) fechar(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&ov.style.display==='flex') fechar(); });
  document.body.appendChild(ov); return ov;
}
function abrir(){
  if(!ultimo||ultimo.a!=='show') return;
  var o=overlay(); o.querySelector('img').src=encodeURI(ultimo.s); o.querySelector('.cap').textContent=ultimo.n||''; o.style.display='flex';
}
function fechar(){ if(ov) ov.style.display='none'; if(ultimo) fechadoT=ultimo.t; }
function atualizaBtn(){ if(!btn) return; var on=naMesa(); btn.innerHTML=(on?'📺':'📺')+'<span class="tx">'+(on?' Na mesa':' Entrar na mesa')+'</span>'; btn.style.borderColor=on?'#7bd88f':'#7b4a8a'; }
function aplicar(m){
  if(ultimo&&m.t<=ultimo.t) return; ultimo=m; atualizaBtn();
  if(m.a==='show'){ if(m.t>fechadoT) abrir(); } else if(ov) ov.style.display='none';
  ouvintes.forEach(function(f){ try{ f(m); }catch(e){} });
}
function assinar(){
  if(!naMesa()) return;
  presencaLigar();
  if(es||!window.EventSource||!crypto.subtle) return;
  es=new EventSource(M.server+'/'+M.topic+'/sse?since=12h');
  es.onmessage=function(ev){
    var d; try{ d=JSON.parse(ev.data); }catch(e){ return; }
    if(d.event!=='message'||!d.message) return;
    var m; try{ m=JSON.parse(d.message); }catch(e){ return; }
    if(!m||(m.a!=='show'&&m.a!=='hide')||!m.g||typeof m.t!=='number') return;
    if(m.a==='show'&&!caminhoOk(m.s)) return;
    valido(m).then(function(ok){ if(ok) aplicar(m); });
  };
}
function botao(){
  var top=document.querySelector('.top'); if(!top||document.getElementById('mesabtn')) return;
  btn=document.createElement('button'); btn.id='mesabtn'; btn.type='button'; btn.title='Mesa: receber imagens do mestre'; btn.innerHTML='📺<span class="tx"> Mesa</span>'; btn.style.cssText='display:inline-block;font:600 13px/1 system-ui,sans-serif;color:#f1ecf7;background:transparent;border:1px solid #7b4a8a;padding:9px 11px;border-radius:8px;cursor:pointer;white-space:nowrap';
  btn.onclick=menuMesa;
  var sp=top.querySelector('.sp'); top.insertBefore(btn,sp?sp.nextSibling:null);
}
window.MesaCliente={ publicar:publicar, assinar:assinar, observarPresenca:observarPresenca, perguntar:perguntar, entrar:entrar, sair:sair, naMesa:naMesa, aoReceber:function(f){ ouvintes.push(f); if(ultimo) f(ultimo); } };
if(!window.MESA_SO_PUBLICAR){ function ini(){ botao(); atualizaBtn(); assinar(); } document.addEventListener('DOMContentLoaded',ini); if(document.readyState!=='loading') ini(); }
})();
