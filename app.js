const baseStylists = [
  {
    id: 'amara', name: 'Amara Styles', initials: 'AS', area: 'South London', neighbourhood: 'Brixton', rating: 4.9, reviewCount: 48,
    mobile: true, verified: true, price: 65, contact: '@amarastyles',
    services: ['Knotless braids', 'Cornrows', 'Twists'],
    servicePrices: [['Knotless braids', 'from £95'], ['Cornrows', 'from £45'], ['Passion twists', 'from £110']],
    bio: 'Protective-style specialist focused on neat parts, low-tension installs and natural-looking finishes. Mobile appointments available across selected South London areas.',
    reviews: [{name:'Tia', rating:5, text:'Really neat braids and she explained the maintenance properly.'}, {name:'Sade', rating:5, text:'On time, gentle with my edges and the price was exactly what was advertised.'}],
    colors: ['#d9a483', '#8f5d49']
  },
  {
    id: 'nia', name: 'Nia Loc Studio', initials: 'NL', area: 'East London', neighbourhood: 'Hackney', rating: 4.8, reviewCount: 31,
    mobile: false, verified: true, price: 55, contact: '@nialocs',
    services: ['Loc retwist', 'Starter locs', 'Loc styling'],
    servicePrices: [['Retwist', 'from £55'], ['Starter locs', 'from £90'], ['Retwist + style', 'from £80']],
    bio: 'Loctician working with starter locs, mature loc maintenance and event styling. Consultation-first approach for clients beginning their loc journey.',
    reviews: [{name:'Maya', rating:5, text:'Best retwist I have had in London. Clean parts and no unnecessary product buildup.'}],
    colors: ['#a4b5a0', '#647a67']
  },
  {
    id: 'coco', name: 'Coco Natural Hair', initials: 'CN', area: 'North London', neighbourhood: 'Finsbury Park', rating: 4.9, reviewCount: 64,
    mobile: false, verified: true, price: 50, contact: '@coconaturalhair',
    services: ['Silk press', 'Natural hair', 'Treatments'],
    servicePrices: [['Wash + blow dry', 'from £50'], ['Silk press', 'from £75'], ['Deep treatment', 'from £35']],
    bio: 'Healthy-hair focused stylist specialising in coils, curls, silk presses and treatments without compromising long-term hair health.',
    reviews: [{name:'Leah', rating:5, text:'My silk press lasted and my curls bounced back after wash day.'}, {name:'Ayo', rating:5, text:'Loved that she actually talked me through what my hair needed.'}],
    colors: ['#c5a8d2', '#7b648b']
  },
  {
    id: 'zuri', name: 'Zuri Wig Atelier', initials: 'ZW', area: 'West London', neighbourhood: 'Shepherd’s Bush', rating: 4.7, reviewCount: 27,
    mobile: true, verified: false, price: 70, contact: '@zuriwigs',
    services: ['Wig install', 'Frontal install', 'Customisation'],
    servicePrices: [['Closure install', 'from £70'], ['Frontal install', 'from £95'], ['Wig customisation', 'from £45']],
    bio: 'Wig installs, lace customisation and natural-looking hairlines. Mobile service available for selected bookings.',
    reviews: [{name:'Keisha', rating:5, text:'The lace melted beautifully and the appointment did not feel rushed.'}],
    colors: ['#d4b089', '#9d7656']
  },
  {
    id: 'imani', name: 'Imani Braids', initials: 'IB', area: 'Central London', neighbourhood: 'Elephant & Castle', rating: 4.6, reviewCount: 19,
    mobile: true, verified: true, price: 45, contact: '@imanibraids',
    services: ['Box braids', 'Knotless braids', 'Kids hair'],
    servicePrices: [['Kids cornrows', 'from £45'], ['Medium knotless', 'from £90'], ['Box braids', 'from £85']],
    bio: 'Family-friendly braider offering protective styles for adults and children, with clear pricing by size and length.',
    reviews: [{name:'Dani', rating:5, text:'Patient with my daughter and the style came out lovely.'}],
    colors: ['#e5b29b', '#ae735f']
  },
  {
    id: 'jade', name: 'Jade Texture Studio', initials: 'JT', area: 'South London', neighbourhood: 'Croydon', rating: 4.8, reviewCount: 42,
    mobile: false, verified: true, price: 60, contact: '@jadetexture',
    services: ['Natural hair', 'Colour', 'Silk press'],
    servicePrices: [['Silk press', 'from £70'], ['Trim + treatment', 'from £60'], ['Colour consultation', 'from £35']],
    bio: 'Texture-focused salon stylist working across natural styling, colour and healthy-hair maintenance for curls and coils.',
    reviews: [{name:'Nadine', rating:5, text:'She knew how to colour my hair without leaving it dry.'}],
    colors: ['#aeb8c8', '#657185']
  }
];

const baseReferrals = [
  { id: 1, service: 'Medium knotless braids', area: 'Brixton', budget: '£120', details: 'Client needs Saturday afternoon. Mid-back length, hair already purchased.', posted: 'Amara Styles' },
  { id: 2, service: 'Loc retwist', area: 'Stratford', budget: '£70', details: 'Regular client needs cover next Wednesday after 5pm.', posted: 'Nia Loc Studio' },
  { id: 3, service: 'Silk press', area: 'Camden', budget: '£85', details: 'Looking for a healthy-hair specialist comfortable with very dense 4C hair.', posted: 'Coco Natural Hair' }
];

const popularServices = ['All', 'Knotless braids', 'Loc retwist', 'Silk press', 'Cornrows', 'Wig install', 'Natural hair'];
const state = {
  stylists: [...baseStylists, ...JSON.parse(localStorage.getItem('tyas-stylists') || '[]')],
  referrals: [...baseReferrals, ...JSON.parse(localStorage.getItem('tyas-referrals') || '[]')],
  activeService: 'All'
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const escapeHTML = (str = '') => str.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

function renderQuickFilters() {
  $('#quickFilters').innerHTML = popularServices.map(service => `
    <button class="pill ${state.activeService === service ? 'active' : ''}" data-service="${service}">${service}</button>
  `).join('');
  $$('#quickFilters [data-service]').forEach(btn => btn.addEventListener('click', () => {
    state.activeService = btn.dataset.service;
    renderQuickFilters();
    renderStylists();
  }));
}

function filteredStylists() {
  const query = $('#searchInput').value.trim().toLowerCase();
  const area = $('#areaFilter').value;
  const maxPrice = Number($('#priceFilter').value);
  const mobileOnly = $('#mobileFilter').checked;
  return state.stylists.filter(stylist => {
    const haystack = [stylist.name, stylist.area, stylist.neighbourhood, ...stylist.services].join(' ').toLowerCase();
    return (!query || haystack.includes(query))
      && (area === 'all' || stylist.area === area)
      && stylist.price <= maxPrice
      && (!mobileOnly || stylist.mobile)
      && (state.activeService === 'All' || stylist.services.some(s => s.toLowerCase().includes(state.activeService.toLowerCase())));
  });
}

function stylistCard(stylist) {
  return `
    <article class="stylist-card">
      <div class="card-visual" style="--card-a:${stylist.colors[0]};--card-b:${stylist.colors[1]}">
        <div class="avatar">${escapeHTML(stylist.initials)}</div>
        <div class="card-badges">
          ${stylist.verified ? '<span class="badge">✓ Verified demo</span>' : ''}
          ${stylist.mobile ? '<span class="badge">Mobile</span>' : '<span class="badge">Studio</span>'}
        </div>
      </div>
      <div class="card-body">
        <div class="name-row"><h3>${escapeHTML(stylist.name)}</h3><span class="rating">★ ${stylist.rating.toFixed(1)}</span></div>
        <p class="location">${escapeHTML(stylist.neighbourhood)} · ${escapeHTML(stylist.area)} · ${stylist.reviewCount} reviews</p>
        <p class="services">${stylist.services.map(escapeHTML).join(' · ')}</p>
        <div class="price-row">
          <div class="price"><span>Services from</span><strong>£${stylist.price}</strong></div>
          <button class="btn btn-light btn-small" data-profile="${stylist.id}">View profile</button>
        </div>
      </div>
    </article>`;
}

function renderStylists() {
  const results = filteredStylists();
  $('#stylistGrid').innerHTML = results.map(stylistCard).join('');
  $('#resultCount').textContent = `${results.length} stylist${results.length === 1 ? '' : 's'} matching your search`;
  $('#emptyState').classList.toggle('hidden', results.length > 0);
  $$('#stylistGrid [data-profile]').forEach(btn => btn.addEventListener('click', () => openProfile(btn.dataset.profile)));
  $('#networkCount').textContent = state.stylists.length;
}

function openModal(id) {
  $('#modalBackdrop').classList.remove('hidden');
  $('#modalBackdrop').setAttribute('aria-hidden', 'false');
  $(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModals() {
  $('#modalBackdrop').classList.add('hidden');
  $('#modalBackdrop').setAttribute('aria-hidden', 'true');
  $$('.modal').forEach(modal => modal.classList.add('hidden'));
  document.body.style.overflow = '';
}

function openProfile(id) {
  const stylist = state.stylists.find(s => s.id === id);
  if (!stylist) return;
  $('#profileContent').innerHTML = `
    <div class="profile-hero" style="--card-a:${stylist.colors[0]};--card-b:${stylist.colors[1]}">
      <div class="avatar">${escapeHTML(stylist.initials)}</div>
      <h2 id="profileName">${escapeHTML(stylist.name)}</h2>
      <p>${escapeHTML(stylist.neighbourhood)} · ★ ${stylist.rating.toFixed(1)} (${stylist.reviewCount} reviews)</p>
    </div>
    <div class="profile-body">
      <div>
        <h3>About</h3>
        <p class="profile-about">${escapeHTML(stylist.bio)}</p>
        <h3>Services & advertised prices</h3>
        <div class="service-list">${stylist.servicePrices.map(([name, price]) => `<div class="service-row"><span>${escapeHTML(name)}</span><strong>${escapeHTML(price)}</strong></div>`).join('')}</div>
        <div class="profile-actions">
          <button class="btn btn-dark" id="messageStylistBtn">Send enquiry</button>
          <button class="btn btn-light" id="copyContactBtn">Copy ${escapeHTML(stylist.contact)}</button>
        </div>
      </div>
      <div>
        <h3>Client feedback</h3>
        <div class="review-list">${stylist.reviews.map(review => `<div class="review"><div class="review-head"><span>${escapeHTML(review.name)}</span><span>★ ${review.rating}</span></div><p>${escapeHTML(review.text)}</p></div>`).join('') || '<p>No reviews yet.</p>'}</div>
      </div>
    </div>`;
  openModal('#profileModal');
  $('#messageStylistBtn').addEventListener('click', () => {
    closeModals();
    openEnquiry(stylist.id);
  });
  $('#copyContactBtn').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(stylist.contact); showToast('Contact copied'); }
    catch { showToast(`Contact: ${stylist.contact}`); }
  });
}

function openEnquiry(id) {
  const stylist = state.stylists.find(s => s.id === id);
  if (!stylist) return;
  $('#enquiryStylistId').value = id;
  $('#enquirySubtext').textContent = `Your message will be prepared for ${stylist.name}. This prototype stores it locally rather than sending personal data.`;
  openModal('#enquiryModal');
}

function renderReferrals() {
  $('#referralList').innerHTML = state.referrals.map(item => `
    <article class="referral-card">
      <div>
        <h3>${escapeHTML(item.service)}</h3>
        <div class="referral-meta"><span>📍 ${escapeHTML(item.area)}</span><span>Budget ${escapeHTML(item.budget)}</span><span>Posted by ${escapeHTML(item.posted)}</span></div>
        <p>${escapeHTML(item.details)}</p>
      </div>
      <button class="btn btn-light btn-small" data-respond-referral="${item.id}">I can take this</button>
    </article>`).join('');
  $('#requestCount').textContent = state.referrals.length;
  $$('[data-respond-referral]').forEach(btn => btn.addEventListener('click', () => showToast('Response recorded for prototype')));
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add('hidden'), 2600);
}

function setView(view) {
  $$('.view').forEach(el => el.classList.remove('active'));
  $$('.nav-link').forEach(el => el.classList.toggle('active', el.dataset.view === view));
  $(`#${view}View`).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

$$('.nav-link').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
$('#searchBtn').addEventListener('click', renderStylists);
$('#searchInput').addEventListener('input', renderStylists);
$('#areaFilter').addEventListener('change', renderStylists);
$('#priceFilter').addEventListener('change', renderStylists);
$('#mobileFilter').addEventListener('change', renderStylists);
$('#clearFiltersBtn').addEventListener('click', () => {
  $('#searchInput').value = '';
  $('#areaFilter').value = 'all';
  $('#priceFilter').value = '999';
  $('#mobileFilter').checked = false;
  state.activeService = 'All';
  renderQuickFilters();
  renderStylists();
});

$('#joinStylistBtn').addEventListener('click', () => openModal('#stylistModal'));
$('#postReferralBtn').addEventListener('click', () => openModal('#referralModal'));
$('#modalBackdrop').addEventListener('click', closeModals);
$$('[data-close-modal]').forEach(btn => btn.addEventListener('click', closeModals));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModals(); });

$('#enquiryForm').addEventListener('submit', e => {
  e.preventDefault();
  const enquiries = JSON.parse(localStorage.getItem('tyas-enquiries') || '[]');
  enquiries.push({
    stylistId: $('#enquiryStylistId').value,
    name: $('#enquiryName').value,
    contact: $('#enquiryContact').value,
    message: $('#enquiryMessage').value,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem('tyas-enquiries', JSON.stringify(enquiries));
  e.target.reset(); closeModals(); showToast('Enquiry saved — ready for backend delivery');
});

$('#stylistForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#stylistName').value.trim();
  const services = $('#stylistServices').value.split(',').map(s => s.trim()).filter(Boolean);
  const price = Number($('#stylistPrice').value);
  const custom = {
    id: `custom-${Date.now()}`,
    name,
    initials: name.split(/\s+/).map(s => s[0]).join('').slice(0,2).toUpperCase(),
    area: $('#stylistArea').value,
    neighbourhood: 'London',
    rating: 5.0,
    reviewCount: 0,
    mobile: $('#stylistMobile').checked,
    verified: false,
    price,
    contact: $('#stylistContact').value.trim(),
    services,
    servicePrices: services.map((s, index) => [s, index === 0 ? `from £${price}` : 'Ask for price']),
    bio: $('#stylistBio').value.trim(),
    reviews: [],
    colors: ['#c9ad9d', '#80695c']
  };
  state.stylists.push(custom);
  const saved = JSON.parse(localStorage.getItem('tyas-stylists') || '[]');
  saved.push(custom); localStorage.setItem('tyas-stylists', JSON.stringify(saved));
  e.target.reset(); closeModals(); renderStylists(); showToast('Your demo listing is live');
});

$('#referralForm').addEventListener('submit', e => {
  e.preventDefault();
  const referral = {
    id: Date.now(),
    service: $('#referralService').value.trim(),
    area: $('#referralArea').value.trim(),
    budget: $('#referralBudget').value.trim(),
    details: $('#referralDetails').value.trim(),
    posted: 'Demo stylist'
  };
  state.referrals.unshift(referral);
  const saved = JSON.parse(localStorage.getItem('tyas-referrals') || '[]');
  saved.unshift(referral); localStorage.setItem('tyas-referrals', JSON.stringify(saved));
  e.target.reset(); closeModals(); renderReferrals(); showToast('Referral request posted');
});

renderQuickFilters();
renderStylists();
renderReferrals();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
