/* Aviso de primeira visita (projeto de fã) */
(function(){
  var KEY='etmos-aviso-v1';
  function visto(){ try{ return localStorage.getItem(KEY)==='1'; }catch(e){ return false; } }
  function marcar(){ try{ localStorage.setItem(KEY,'1'); }catch(e){} }
  var css=document.createElement('style');
  css.textContent='#aviso{position:fixed;inset:0;z-index:1000;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(ellipse at top,#3a2347 0%,#1d1424 75%);color:#f1ecf7;display:flex;justify-content:center;align-items:flex-start}'
   +'#aviso .box{max-width:560px;width:100%;padding:28px 20px calc(28px + env(safe-area-inset-bottom));font:16px/1.55 Georgia,serif}'
   +'#aviso .lg{display:inline-block;background:#f1ecf7;border-radius:12px;padding:8px 14px;margin-bottom:14px}#aviso .lg img{display:block;height:44px;width:auto}'
   +'#aviso .ey{font:700 12px system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#c9a6d6}'
   +'#aviso h1{margin:6px 0 14px;font:700 28px/1.1 Georgia,serif;font-variant:small-caps;letter-spacing:.04em}'
   +'#aviso p{margin:0 0 12px}#aviso ul{margin:0 0 18px;padding-left:20px}#aviso li{margin-bottom:8px}'
   +'#aviso a{color:#e2c9ee;text-decoration:underline;text-underline-offset:2px}'
   +'#aviso button{font:700 15px system-ui,sans-serif;color:#fff;background:#6e3a7d;border:1px solid #a974ba;padding:14px 26px;border-radius:10px;cursor:pointer;width:100%}'
   +'#avisolink{background:none;border:0;color:inherit;font:inherit;text-decoration:underline;cursor:pointer;padding:0}';
  document.head.appendChild(css);
  var el;
  function abrir(){
    if(el) return;
    el=document.createElement('div'); el.id='aviso'; el.setAttribute('role','dialog'); el.setAttribute('aria-modal','true'); el.setAttribute('aria-label','Aviso legal');
    el.innerHTML='<div class="box"><div class="lg"><img src="assets/ui/logo-etmos.svg" alt="Etmos RPG"></div><br><div class="ey">Escola Brasilis · Etmos RPG</div><h1>Antes de entrar</h1>'
     +'<p><b>Este site é um projeto de fã, feito por fãs, para fãs.</b></p>'
     +'<p>Ele é gratuito e não tem fins lucrativos: não vende nada e não exibe anúncios.</p>'
     +'<p>O Etmos RPG, o sistema, as regras, os textos e todas as informações reunidas aqui pertencem a <b>Rafa Reis</b> e à <b>Editora Balde Galáctico</b>, que detêm todos os direitos sobre eles. Este site é só um material de apoio e não substitui as obras originais.</p>'
     +'<p>Nomes, marcas e conteúdos de terceiros citados aqui pertencem aos seus respectivos donos. Este site não é um produto oficial.</p>'
     +'<p>Não copie, redistribua nem venda este conteúdo sem autorização dos autores. Para apoiar o trabalho deles e conhecer os materiais oficiais:</p>'
     +'<ul><li><b>Rafa Reis (@mestrerafareis):</b> <a href="https://www.youtube.com/@mestrerafareis" target="_blank" rel="noopener">YouTube</a> · <a href="https://mestrerafareis.substack.com/" target="_blank" rel="noopener">Módulos de Etmos no Substack</a></li>'
     +'<li><b>Editora Balde Galáctico:</b> <a href="https://baldegalactico.com.br/" target="_blank" rel="noopener">Site oficial</a> · <a href="https://baldegalactico.com.br/jogo/etmos/" target="_blank" rel="noopener">Página do Etmos RPG</a></li></ul>'
     +'<button type="button" id="avisook">Li e quero entrar</button></div>';
    document.body.appendChild(el); document.body.style.overflow='hidden';
    var b=el.querySelector('#avisook');
    b.onclick=function(){ marcar(); el.remove(); el=null; document.body.style.overflow=''; };
    b.focus();
  }
  window.abrirAviso=abrir;
  function ini(){ if(!visto()) abrir(); var l=document.getElementById('avisolink'); if(l) l.onclick=abrir; }
  if(document.body) ini(); else document.addEventListener('DOMContentLoaded',ini);
})();
