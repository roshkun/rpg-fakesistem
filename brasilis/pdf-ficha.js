/* PDF da ficha em abas: só background, informações de jogo e partículas.
   Sem bibliotecas: desenha páginas A4 em canvas (alta resolução) e monta o PDF com JPEGs.
   Uso: PDFFicha.gerar({aluno, state, part, glossario, modulos}) -> Promise<Uint8Array> */
(function(){
"use strict";
var W=1654, H=2339, M=110, CW=W-2*M, BOT=H-M-40;
var INK='#2e1a3a', PUR='#3e1c43', ACC='#6e3a7d', PAPER='#eceaf6', SOFT='#dcd8ee', LINE='#3e1c43';
var SERIF='Georgia,"Times New Roman",serif', SANS='system-ui,-apple-system,"Segoe UI",Roboto,sans-serif';

function loadImg(src){
  return new Promise(function(res){
    if(!src) return res(null);
    var i=new Image(); i.onload=function(){res(i);}; i.onerror=function(){res(null);}; i.src=src;
  });
}
function num(st,k){ var n=parseInt(st[k],10); return isNaN(n)?0:n; }
function cmx(v){ return v>=6?'Milagre':v>=4?'Complexa':v>=2?'Difícil':'Regular'; }
function jget(st,k){ try{ var a=JSON.parse(st[k]||'[]'); return Array.isArray(a)?a:[]; }catch(e){ return []; } }
function norm(s){ return String(s||'').replace(/\s+\n/g,'\n').replace(/[ \t]+/g,' ').trim(); }

function gerarPaginas(o,imgs){
  var A=o.aluno, st=o.state, PART=o.part||[], GL=(o.glossario||{}).d||{}, MOD=o.modulos||{}, PZ=MOD.proezas||{}, FAM=MOD.familiares||{}, ITENS=MOD.itens||[];
  var pages=[], cv, ctx, y;
  var nome=st.personagem||A.nome||'Personagem';

  function newPage(){
    cv=document.createElement('canvas'); cv.width=W; cv.height=H; ctx=cv.getContext('2d');
    ctx.fillStyle=PAPER; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle=PUR; ctx.lineWidth=5; ctx.strokeRect(46,46,W-92,H-92);
    ctx.lineWidth=2; ctx.strokeRect(58,58,W-116,H-116);
    pages.push(cv); y=M;
    if(pages.length>1){
      if(imgs.logo){ var lh=70, lw=lh*imgs.logo.naturalWidth/imgs.logo.naturalHeight; ctx.drawImage(imgs.logo,M,y-6,lw,lh); }
      txt(nome.toUpperCase(),W-M,y+40,{font:'700 26px '+SANS,color:ACC,align:'right',ls:3});
      y+=96;
    }
  }
  function txt(s,x,yy,op){
    ctx.save(); ctx.font=op.font; ctx.fillStyle=op.color||INK; ctx.textAlign=op.align||'left'; ctx.textBaseline='alphabetic';
    if(op.ls&&'letterSpacing' in ctx) ctx.letterSpacing=op.ls+'px';
    ctx.fillText(s,x,yy); ctx.restore();
  }
  function wrap(s,w,font){
    ctx.save(); ctx.font=font; var out=[];
    String(s).split('\n').forEach(function(par){
      if(!par.trim()){ out.push(''); return; }
      var line='';
      par.split(' ').forEach(function(wd){
        var t=line?line+' '+wd:wd;
        if(ctx.measureText(t).width>w&&line){ out.push(line); line=wd; } else line=t;
      });
      out.push(line);
    });
    ctx.restore(); return out;
  }
  function ensure(h){ if(y+h>BOT) newPage(); }
  /* parágrafo que atravessa páginas */
  function para(s,op){
    op=op||{}; var size=op.size||29, lh=Math.round(size*1.36), x=op.x===undefined?M:op.x, w=op.w||CW, font=(op.weight||'400')+' '+size+'px '+SERIF;
    var lines=wrap(s,w,font);
    lines.forEach(function(l){ ensure(lh); txt(l,x,y+size,{font:font,color:op.color||INK}); y+=lh; });
    y+=op.after===undefined?14:op.after;
  }
  function paraCol(s,x,yy,w,size){ /* em coluna fixa (sem quebra de página) */
    var lh=Math.round(size*1.42), font='400 '+size+'px '+SERIF, lines=wrap(s,w,font);
    lines.forEach(function(l){ txt(l,x,yy+size,{font:font}); yy+=lh; }); return yy;
  }
  function title(s,need){
    ensure(130+(need||110)); y+=14;
    txt(s.toUpperCase(),M,y+44,{font:'700 46px '+SERIF,color:PUR,ls:4});
    y+=60; ctx.fillStyle=PUR; ctx.fillRect(M,y,CW,5); ctx.fillRect(M,y+10,CW,2); y+=28;
  }
  function label(s,x,yy,w){ txt(s.toUpperCase(),x==null?M:x,(yy==null?y:yy)+24,{font:'700 24px '+SANS,color:ACC,ls:3}); if(yy==null) y+=44; }
  function box(x,yy,w,h,fill){
    ctx.save(); ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(x,yy,w,h,10); else ctx.rect(x,yy,w,h);
    ctx.fillStyle=fill||'rgba(255,255,255,.45)'; ctx.fill(); ctx.lineWidth=3; ctx.strokeStyle=LINE; ctx.stroke(); ctx.restore();
  }
  function field(lab,val,x,yy,w){
    box(x,yy,w,104); txt(lab.toUpperCase(),x+18,yy+32,{font:'700 20px '+SANS,color:ACC,ls:2});
    ctx.save(); ctx.font='400 36px '+SERIF; var t=String(val||'—'); while(ctx.measureText(t).width>w-36&&t.length>3) t=t.slice(0,-2); ctx.restore();
    txt(t,x+18,yy+80,{font:'400 36px '+SERIF});
  }
  function pips(x,yy,n,max,s){
    for(var i=0;i<max;i++){
      var px=x+i*(s+14); ctx.save(); ctx.lineWidth=4; ctx.strokeStyle=LINE; ctx.strokeRect(px,yy,s,s);
      if(i<n){ ctx.fillStyle=PUR; ctx.fillRect(px+8,yy+8,s-16,s-16); } ctx.restore();
    }
  }
  function glyph(d,x,yy,size){
    var s=size/410; ctx.save(); ctx.translate(x-120*s,yy-15*s); ctx.scale(s,s); ctx.fillStyle=PUR; ctx.fill(new Path2D(d),'evenodd'); ctx.restore();
  }
  function firstSentence(t,max){ var s=(t||'').split(/(?<=\.)\s/)[0]; if(s.length>max) s=s.slice(0,max-1).replace(/\s+\S*$/,'')+'…'; return s; }

  /* =============== PÁGINA 1: BACKGROUND =============== */
  newPage();
  var hy=y;
  if(imgs.logo){ var lh=130, lw=lh*imgs.logo.naturalWidth/imgs.logo.naturalHeight; ctx.drawImage(imgs.logo,M,hy,lw,lh); }
  txt('FICHA DE PERSONAGEM',W-M,hy+60,{font:'700 40px '+SERIF,color:PUR,align:'right',ls:5});
  txt('BACKGROUND · JOGO · PARTÍCULAS',W-M,hy+104,{font:'700 22px '+SANS,color:ACC,align:'right',ls:4});
  y=hy+170; ctx.fillStyle=PUR; ctx.fillRect(M,y,CW,5); y+=40;

  var FW=470, fy=y, fh=0;
  if(imgs.corpo){ fh=Math.min(740,FW*imgs.corpo.naturalHeight/imgs.corpo.naturalWidth); var fw=fh*imgs.corpo.naturalWidth/imgs.corpo.naturalHeight; ctx.save(); ctx.shadowColor='rgba(46,26,58,.35)'; ctx.shadowBlur=18; ctx.shadowOffsetY=8; ctx.drawImage(imgs.corpo,M+(FW-fw)/2,fy,fw,fh); ctx.restore(); }
  var rx=M+FW+50, rw=CW-FW-50, ry=fy, half=(rw-20)/2;
  field('Personagem',st.personagem||A.nome,rx,ry,rw); ry+=124;
  field('Jogador',st.jogador,rx,ry,half); field('Nível',st.nivel,rx+half+20,ry,half); ry+=124;
  field('Ano escolar',st.ano,rx,ry,half); field('Idade',st.idade,rx+half+20,ry,half); ry+=140;
  txt('BÁSICO',rx,ry+24,{font:'700 24px '+SANS,color:ACC,ls:3}); ry+=44;
  ry=paraCol(norm(st.basico),rx,ry,rw,32)+16;
  txt('APARÊNCIA',rx,ry+24,{font:'700 24px '+SANS,color:ACC,ls:3}); ry+=44;
  ry=paraCol(norm(st.aparencia),rx,ry,rw,29);
  y=Math.max(fy+fh,ry)+30;

  title('Dossiê da Coordenação');
  [['Como chegou',st.dos_chegada],['Postura e temperamento',st.dos_postura],['Observação da coordenação',st.dos_atencao]].forEach(function(b){
    if(!norm(b[1])) return; ensure(110); label(b[0]); para(norm(b[1]),{after:8});
  });
  if(norm(st.pontos)){ title('Pontos de importância'); para(norm(st.pontos)); }
  if(st.val_l1||st.val_r1||st.val_l2||st.val_r2){
    title('Valores e comportamento');
    [[st.val_l1,st.val_r1],[st.val_l2,st.val_r2]].forEach(function(p){
      if(!p[0]&&!p[1]) return; ensure(110); var bw=(CW-120)/2;
      box(M,y,bw,90); box(M+bw+120,y,bw,90);
      txt(p[0]||'—',M+bw/2,y+60,{font:'400 38px '+SERIF,align:'center'}); txt(p[1]||'—',M+bw+120+bw/2,y+60,{font:'400 38px '+SERIF,align:'center'});
      txt('↔',M+bw+60,y+62,{font:'700 44px '+SANS,color:ACC,align:'center'}); y+=116;
    });
  }
  if(norm(st.futuro)){ title('Futuro'); para(norm(st.futuro)); }
  if(norm(st.origens)){ title('Origens'); para(norm(st.origens)); }

  /* =============== INFORMAÇÕES DE JOGO =============== */
  newPage();
  title('Informações de jogo');
  var c=num(st,'corpo'), a=num(st,'alma'), m=num(st,'mente');
  label('Atributos');
  [['Corpo',c],['Alma',a],['Mente',m]].forEach(function(r){
    ensure(80); txt(r[0],M,y+46,{font:'700 40px '+SERIF,color:PUR}); pips(M+240,y,r[1],6,60); y+=84;
  });
  y+=6; ensure(130);
  var bw3=(CW-40)/3, fmax=num(st,'feridas_max')||(4+Math.floor(c/2)), emax=num(st,'estresse_max')||(4+a);
  field('Dados de empenho',st.dados,M,y,bw3); field('Limite de ferimentos',String(fmax),M+bw3+20,y,bw3); field('Limite de estresse',String(emax),M+2*(bw3+20),y,bw3); y+=130;

  /* proezas */
  title('Proezas');
  var pr=!!st.pr_praticas, fis=pr?c:m;
  var rows=[['Física',c,'Corpo',cmx(fis)+(pr?' (por Corpo)':'')],['Mental',m,'Mente',cmx(m)],['Mágica',a,'Alma',cmx(m)]];
  rows.forEach(function(r){ ensure(70); txt(r[0],M,y+44,{font:'700 36px '+SERIF,color:PUR}); txt('2d6 + '+r[2]+' '+r[1],M+300,y+44,{font:'400 36px '+SERIF}); txt('até '+r[3],M+800,y+44,{font:'400 36px '+SERIF}); y+=70; });
  var es=(PZ.estresse||[]); if(es.length){ para('Estresse por Complexidade: '+es.map(function(e){return e[0]+' '+e[1];}).join(' · ')+'. Proeza Composta: +1 de Estresse extra.',{size:28,color:ACC}); }
  if(norm(st.pr_notas)){ label('Minhas proezas'); para(norm(st.pr_notas),{size:28}); }
  if(norm(st.praticas)){ label('Habilidades práticas'); para(norm(st.praticas),{size:28}); }
  if(norm(st.teoricas)){ label('Habilidades teóricas'); para(norm(st.teoricas),{size:28}); }

  /* totem */
  if(A.totem){
    var T=A.totem; title('Totem',300); ensure(270);
    var tw=0; if(imgs.totem){ var th=Math.min(240,imgs.totem.naturalHeight); tw=th*imgs.totem.naturalWidth/imgs.totem.naturalHeight; if(tw>240){ tw=240; th=tw*imgs.totem.naturalHeight/imgs.totem.naturalWidth; } ctx.drawImage(imgs.totem,M,y,tw,th); tw+=30; }
    txt(T.nome,M+tw,y+40,{font:'700 36px '+SERIF,color:PUR}); txt('RANK '+T.rank,M+tw,y+86,{font:'700 24px '+SANS,color:ACC,ls:3});
    var tl=wrap(T.desc||'',CW-tw,'400 28px '+SERIF), ty=y+134; tl.forEach(function(l){ txt(l,M+tw,ty,{font:'400 28px '+SERIF}); ty+=40; });
    var tr=wrap('Cada magia não Trivial conjurada no Mundano soma Estresse extra, conforme o Rank. Sintoniza no primeiro uso; perde a sintonia após 100 anos sem uso.',CW-tw,'400 24px '+SERIF); ty+=10; tr.forEach(function(l){ txt(l,M+tw,ty,{font:'italic 400 24px '+SERIF,color:ACC}); ty+=34; });
    y=Math.max(y+250,ty+10);
  }

  /* itens */
  var mine=jget(st,'mod_itens').map(function(n){ return ITENS.filter(function(x){return x.nome===n;})[0]; }).filter(Boolean);
  if(mine.length||norm(st.inventario)){
    title('Itens e inventário'); var tot=0;
    mine.forEach(function(it){
      tot+=it.pp; var lines=wrap(it.efeito,CW-60,'400 30px '+SERIF), h=60+lines.length*43+14; ensure(h);
      box(M,y,CW,h-14,'rgba(255,255,255,.4)'); txt(it.nome,M+24,y+44,{font:'700 34px '+SERIF,color:PUR}); txt(it.pp+' PP',M+CW-24,y+44,{font:'700 28px '+SANS,color:ACC,align:'right'});
      var yy=y+54; lines.forEach(function(l){ txt(l,M+24,yy+30,{font:'400 30px '+SERIF}); yy+=43; }); y+=h;
    });
    if(mine.length){ para('Total: '+tot+' PP em '+mine.length+' item(ns)',{size:28,color:ACC}); }
    if(norm(st.inventario)){ label('Inventário'); para(norm(st.inventario),{size:28}); }
  }

  /* familiar */
  if(st.fam_on){
    title('Familiar',420);
    var fo=Math.max(1,num(st,'fam_forca')||1), sel=jget(st,'fam_apts'), lim=fo+2, fy0=y, fiw=0;
    ensure(380);
    if(imgs.fam){ var fih=Math.min(360,imgs.fam.naturalHeight), fiw=fih*imgs.fam.naturalWidth/imgs.fam.naturalHeight; if(fiw>520){ fiw=520; fih=fiw*imgs.fam.naturalHeight/imgs.fam.naturalWidth; } ctx.drawImage(imgs.fam,M+CW-fiw,y,fiw,fih); fiw+=30; }
    var fwid=CW-fiw;
    field('Nome',st.fam_nome,M,y,fwid); y+=124; field('Tipo de pacto',st.fam_tipo,M,y,fwid); y+=124;
    txt('FORÇA DO PACTO',M,y+30,{font:'700 24px '+SANS,color:ACC,ls:3}); pips(M+330,y-2,fo,4,48); txt(lim+' aptidões',M+330+4*62+20,y+34,{font:'400 30px '+SERIF}); y+=70;
    y=Math.max(y,fy0+(imgs.fam?380:0));
    var ap=(FAM.aptidoes||[]).filter(function(x){return sel.indexOf(x[0])>=0;});
    if(ap.length){ label('Aptidões ('+sel.length+'/'+lim+')'); ap.forEach(function(x){ var ls=wrap(x[1],CW,'400 27px '+SERIF), h=48+ls.length*38+14; ensure(h); txt(x[0],M,y+36,{font:'700 31px '+SERIF,color:PUR}); var yy=y+46; ls.forEach(function(l){ txt(l,M,yy+27,{font:'400 27px '+SERIF}); yy+=38; }); y+=h; }); }
    if(norm(st.fam_notas)){ label('Anotações'); para(norm(st.fam_notas),{size:28}); }
  }

  /* =============== PARTÍCULAS =============== */
  newPage();
  title('Grimório · Partículas');
  var CATS=[['Funções',2],['Objetos',3],['Características',4]];
  function cards(list){
    var cw=(CW-30)/2, ch=186;
    list.forEach(function(p,i){
      if(i%2===0) ensure(ch+20);
      var x=M+(i%2)*(cw+30);
      box(x,y,cw,ch,'rgba(255,255,255,.5)'); glyph(p.d,x+22,y+22,140);
      var nf=34; ctx.save(); while(nf>20){ ctx.font='700 '+nf+'px '+SERIF; if(ctx.measureText(p.nome).width<=cw-220) break; nf-=2; } ctx.restore(); txt(p.nome,x+200,y+52,{font:'700 '+nf+'px '+SERIF,color:PUR});
      txt(p.codigo,x+200,y+88,{font:'700 26px '+SANS,color:ACC,ls:3});
      var g=GL[p.codigo], d=g?firstSentence(g[0],118):'';
      if(d){ var ls=wrap(d,cw-220,'400 25px '+SERIF).slice(0,3), yy=y+100; ls.forEach(function(l){ txt(l,x+200,yy+24,{font:'400 25px '+SERIF}); yy+=32; }); }
      if(i%2===1||i===list.length-1) y+=ch+20;
    });
  }
  CATS.forEach(function(ct){
    var list=PART.filter(function(p){return p.cat===ct[0]&&st[p.key];});
    ensure(120); label(ct[0]+'  '+list.length+'/'+ct[1]+(list.length>ct[1]?' (+'+(list.length-ct[1])+' de origem)':''));
    if(!list.length){ para('Nenhuma escolhida.',{size:28,color:ACC}); } else cards(list);
    y+=10;
  });
  var comps=PART.filter(function(p){return p.cat==='Complementos'&&p.nivel===1;});
  if(comps.length){ ensure(120); label('Complementos conhecidos'); cards(comps); }

  /* rodapé / numeração */
  pages.forEach(function(p,i){
    var cx=p.getContext('2d'); cx.fillStyle=ACC; cx.font='600 22px '+SANS; cx.textAlign='center';
    cx.fillText('Etmos RPG · '+nome+' · '+(i+1)+' / '+pages.length,W/2,H-72);
  });
  return pages;
}

function b64(buf){ return new Uint8Array(buf); }
function buildPdf(jpegs){
  var PW=595.276, PH=841.89, chunks=[], len=0, offs=[];
  function push(x){ if(typeof x==='string'){ var u=new Uint8Array(x.length); for(var i=0;i<x.length;i++) u[i]=x.charCodeAt(i)&255; x=u; } chunks.push(x); len+=x.length; }
  push('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  var n=jpegs.length;
  offs[1]=len; push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  var kids=[]; for(var i=0;i<n;i++) kids.push((3+3*i)+' 0 R');
  offs[2]=len; push('2 0 obj\n<< /Type /Pages /Kids ['+kids.join(' ')+'] /Count '+n+' >>\nendobj\n');
  for(var i=0;i<n;i++){
    var po=3+3*i, co=4+3*i, io=5+3*i;
    offs[po]=len; push(po+' 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 '+PW+' '+PH+'] /Resources << /XObject << /Im0 '+io+' 0 R >> >> /Contents '+co+' 0 R >>\nendobj\n');
    var content='q '+PW+' 0 0 '+PH+' 0 0 cm /Im0 Do Q';
    offs[co]=len; push(co+' 0 obj\n<< /Length '+content.length+' >>\nstream\n'+content+'\nendstream\nendobj\n');
    offs[io]=len; push(io+' 0 obj\n<< /Type /XObject /Subtype /Image /Width '+W+' /Height '+H+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+jpegs[i].length+' >>\nstream\n');
    push(jpegs[i]); push('\nendstream\nendobj\n');
  }
  var total=3+3*n, xref=len, x='xref\n0 '+total+'\n0000000000 65535 f \n';
  for(var k=1;k<total;k++) x+=('0000000000'+offs[k]).slice(-10)+' 00000 n \n';
  push(x); push('trailer\n<< /Size '+total+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF');
  var out=new Uint8Array(len), p=0; chunks.forEach(function(c){ out.set(c,p); p+=c.length; });
  return out;
}

function paraJpegs(pages){
  return Promise.all(pages.map(function(cv){
    return new Promise(function(res,rej){ cv.toBlob(function(b){ if(!b) return rej(new Error('canvas')); b.arrayBuffer().then(function(ab){res(b64(ab));}); },'image/jpeg',0.92); });
  }));
}

window.PDFFicha={
  gerar:function(o){
    var A=o.aluno;
    return Promise.all([loadImg('assets/ui/logo-etmos.svg'),loadImg(A.imagem),loadImg(A.familiar_img),loadImg(A.totem&&A.totem.img)]).then(function(r){
      var imgs={logo:r[0],corpo:r[1],fam:o.state.fam_on?r[2]:null,totem:r[3]};
      var go=function(im){ return paraJpegs(gerarPaginas(o,im)); };
      return go(imgs).catch(function(){ return go({}); });
    }).then(buildPdf);
  },
  nomeArquivo:function(o){ var s=(o.state.personagem||o.aluno.nome||o.aluno.id||'ficha').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').toLowerCase(); return 'ficha-etmos-'+s+'.pdf'; }
};
})();
