'use strict';
/* Última página (oferta): substitui offer() e startReadingClock() do app.js.
   - sem a etapa "Tempo de leitura do teu plano"
   - estrutura de oferta com cronómetro de 10 min, raspadinha, confetes
   - preço anterior a vermelho (riscado) e preço novo a verde (cfg.oldPrice em config.js) */
const OFFER_SECONDS = 600;

function offerMoney(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

function offerDeal(d) {
  const buyLabel = 'GARANTIR O MEU PLANO DE AULAS';
  return `<div class="deal">
    <h2 class="deal-title">GARANTE O TEU PLANO PESSOAL${d.hasDisc ? `<span class="only-won"><br><em>AGORA ${d.pct}% OFF!</em></span>` : ''}</h2>
    <div class="offer-bar only-won js-bar">⏱ Oferta válida por <b class="js-timer">10:00</b></div>
    <div class="bf-badge"><span class="bf-gift">🎁</span><span class="bf-text">BLACK FRIDAY</span><span class="bf-gift">🎁</span></div>
    <div class="plan-card">
      <div class="plan-card-pill">★ Recomendado para ti</div>
      <div class="plan-card-head only-won">🎁 PRENDA DE HOJE · ${d.pct}% DE DESCONTO</div>
      <div class="plan-card-body">
        <div class="plan-card-info">
          <strong>DESAFIO 21 DIAS</strong>
          <span class="plan-tag">Pagamento único</span>
          <div class="prices">${d.hasDisc ? `<s class="old only-won-inline">${offerMoney(d.old)} Kz</s>` : ''}<b class="new">${offerMoney(d.price)} Kz</b></div>
        </div>
        <div class="per-day"><small>≈ ${offerMoney(d.perDay)} Kz</small><b>por dia</b></div>
      </div>
    </div>
    <p class="guarantee-link">GARANTIA DE ${cfg.guaranteeDays} DIAS</p>
    <div class="buy-wrap"><a class="buy" href="${checkout()}">${buyLabel}</a></div>
    <p class="fine">Pagamento único, sem mensalidades e sem cobranças recorrentes. Recebes o acesso ao plano de aulas após a confirmação do pagamento.</p>
  </div>`;
}

function offer() {
  const p = profile();
  const price = Number(cfg.price);
  const old = Number(cfg.oldPrice) || 0;
  const hasDisc = old > price;
  const d = { price, old, hasDisc, pct: hasDisc ? Math.round((1 - price / old) * 100) : 0, perDay: price / 21 };
  const buy = t => `<a class="buy" href="${checkout()}">${t}</a>`;
  return `<article class="offer${hasDisc ? ' has-disc' : ''}" id="offer-root" data-disc="${hasDisc ? 1 : 0}">
    <p class="eyebrow">Aulas sem sair de casa</p>
    <h1 class="title" tabindex="-1">${p.name ? esc(p.name) + ', o' : 'O'} teu plano de treino de Pilates está pronto!<br><em>Começa hoje e muda de vida em 2026!</em></h1>
    <p class="offer-lead">Pilates na Parede com Fernanda Martins. Uma sequência de aulas em casa para trabalhares força, mobilidade e uma rotina de movimento no teu ritmo.</p>
    <div class="hero-badges"><span>21 dias de programa</span><span>Em casa</span><span>${offerMoney(price)} Kz</span></div>
    ${media('plano-aulas-21', 'O teu plano de Pilates na Parede: aulas, alongamentos e materiais de apoio', 'class="offer-infographic" width="800" height="800"')}
    ${offerDeal(d)}
    <section class="social-proof"><div class="laurel"><b>Mais de 1500 mulheres</b><span>de pessoas transformaram as suas vidas com o Pilates na Parede</span></div><div class="rating-card"><span class="stars" aria-hidden="true">★★★★★</span><b>4,8 de 5</b></div><p class="proof-line">Mais de 351.000 avaliações de 5 estrelas das utilizadoras</p></section>
    <section><h2>O que vais receber</h2><div class="plan-pack"><header><b>21</b><span>DIAS DE PILATES<br>NA PAREDE</span></header>${[['▶', 'Plano de aulas em casa', 'Uma sequência organizada para acompanhares ao longo do desafio.'], ['◎', 'Demonstração dos movimentos', 'Orientações visuais para acompanhares cada aula.'], ['▦', 'Calendário de três semanas', 'Um caminho claro para distribuir a prática na tua rotina.'], ['🎁', 'Materiais complementares', 'Guias de apoio para consultares durante o programa.']].map(([icon, title, txt]) => `<div class="pack-row"><span class="icon" aria-hidden="true">${icon}</span><div><strong>${title}</strong><small>${txt}</small></div></div>`).join('')}</div></section>
    <section><h2>Como funciona o desafio</h2>${weeks()}${buy('QUERO COMEÇAR O MEU DESAFIO')}</section>
    <section><h2>Sem uma rotina vs. com o desafio</h2><div class="comparison"><div><strong>SEM UMA ROTINA</strong><p>✕ Não saber o que praticar.</p><p>✕ Adiar por falta de organização.</p><p>✕ Começar sem uma sequência.</p></div><div><strong>COM O DESAFIO</strong><p>✓ Uma aula para acompanhares.</p><p>✓ Um momento reservado na agenda.</p><p>✓ Um percurso de 21 dias.</p></div></div>${buy('GARANTIR O MEU PLANO DE AULAS')}</section>
    <section><h2>Recebe também os materiais complementares</h2><div class="bonus-grid">${[['bonus-recipes', 'Receitas saudáveis'], ['bonus-skin', 'Guia Eliminando a Flacidez'], ['bonus-cellulite', 'Guia Eliminando a Celulite'], ['bonus-menopause', 'Como Superar a Menopausa']].map(([img, title]) => `<article class="bonus">${media(img, title)}<div><strong>${title}</strong><small>Incluído no programa</small></div></article>`).join('')}</div><p class="disclaimer">Materiais educativos complementares. Não substituem aconselhamento médico ou nutricional individual.</p></section>
    ${offerDeal(d)}
    <ul class="check-points"><li>Pagamento único de ${offerMoney(price)} Kz, sem mensalidades.</li><li>Acesso ao plano de aulas após a confirmação do pagamento.</li><li>Sem renovação automática e sem cobranças futuras.</li><li>Garantia de ${cfg.guaranteeDays} dias: se não ficares satisfeita, podes pedir o reembolso.</li></ul>
    <section class="guarantee">${media('garantia-30-dias', 'Garantia de 30 dias', 'width="600" height="451"')}<h2>${cfg.guaranteeDays} dias de garantia</h2><p>Tens ${cfg.guaranteeDays} dias após a compra para conhecer o programa. Se não ficares satisfeita, podes solicitar a devolução do valor pago dentro do prazo da garantia.</p></section>
    <section class="faq"><h2>Perguntas frequentes</h2>${[['Preciso de experiência em Pilates?', 'Podes começar como iniciante. Acompanha as orientações de cada aula e ajusta o movimento ao teu nível de conforto.'], ['Tenho de pagar todos os meses?', `Não. O valor apresentado é de ${offerMoney(price)} Kz, em pagamento único.`], ['Preciso de aparelhos?', 'A proposta é praticar em casa, com uma parede e espaço livre. Um tapete confortável pode ajudar nos movimentos realizados no chão.'], ['Como recebo o acesso?', 'Após a confirmação do pagamento, receberás o acesso pelo WhatsApp e pelo email informados na compra.'], ['E se eu não gostar?', 'Tens uma garantia de 30 dias. Se não ficares satisfeita, podes solicitar o reembolso dentro desse prazo.'], ['E se tiver dor, lesão ou alguma limitação?', 'Procura orientação de um profissional de saúde antes de iniciar. O questionário não avalia se um exercício é adequado ao teu caso. Interrompe qualquer movimento que provoque dor.'], ['Vou perder uma quantidade específica de peso?', 'Não há uma quantidade de peso garantida. Os resultados dependem de vários factores e variam de pessoa para pessoa. O desafio organiza a tua prática durante 21 dias.']].map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}${buy(`GARANTIR O MEU PLANO POR ${offerMoney(price)} Kz`)}</section>
  </article>`;
}

/* ---------- comportamento: raspadinha, confetes e cronómetro ---------- */
function offerTick(start) {
  const left = Math.max(0, OFFER_SECONDS - Math.floor((Date.now() - start) / 1000));
  const txt = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
  document.querySelectorAll('.js-timer').forEach(el => { el.textContent = txt; });
  if (left === 0) {
    clearInterval(offerTimer);
    document.querySelectorAll('.js-bar').forEach(el => { el.innerHTML = '�� Garante o teu plano hoje'; });
    document.querySelectorAll('.sticky-offer small').forEach(el => { el.textContent = 'Oferta de hoje'; });
  }
}

/* Inicia a oferta e o cronómetro assim que a última etapa é apresentada. */
function startReadingClock() {
  return;
}
