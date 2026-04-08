/* ========================================
   DrZan Labs - Main JavaScript
   Portal Animation + Interactions
   ======================================== */

(function () {
    'use strict';

    // ---- Portal Animation (Three.js) ----
    const portalOverlay = document.getElementById('portal-overlay');
    const portalCanvas = document.getElementById('portal-canvas');
    const skipBtn = document.getElementById('skip-intro');
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('main-content');

    let portalDone = false;
    let siteLang = 'sk';
    let startPortalOpening = null; // set by initPortal, called by lang chooser

    // ---- Translations ----
    const T = {
        en: {
            // Portal
            portalSubtitle: 'Initializing system...',
            portalConnecting: 'Connecting...',
            skipIntro: 'Skip',
            // Nav
            navServices: 'Services',
            navAbout: 'About',
            navContact: 'Contact',
            mobileHome: 'Home',
            // Hero
            heroTagline: 'Where technology meets intelligence',
            heroDesc: 'Next-generation IT support. Automation powered by artificial intelligence.',
            heroBtn1: 'Our services',
            heroBtn2: 'Contact us',
            heroBtn1Link: '#services',
            heroBtn2Link: '#contact',
            // Services
            servicesTag: '// SERVICES',
            servicesTitle: 'What we can do for you',
            servicesSubtitle: 'We combine IT expertise with advanced AI automation',
            serviceBadge: 'POPULAR',
            svc1Title: 'IT Support & Infrastructure',
            svc1Desc: 'Complete management of IT systems, networks and servers. 24/7 monitoring, fast response, preventive maintenance.',
            svc1F1: 'Helpdesk & remote support', svc1F2: 'Network & server management', svc1F3: 'Cybersecurity', svc1F4: 'Cloud migration',
            svc2Title: 'AI Automation',
            svc2Desc: 'Intelligent workflow automation, chatbots, and custom AI solutions for your business.',
            svc2F1: 'AI chatbots & assistants', svc2F2: 'Process automation', svc2F3: 'Data analytics with AI', svc2F4: 'LLM model integration',
            svc3Title: 'Websites & E-shops',
            svc3Desc: 'Creating professional websites and e-shops. Modern design, fast loading, conversion optimization.',
            svc3F1: 'Custom presentation websites', svc3F2: 'E-shops & online stores', svc3F3: 'SEO & performance optimization', svc3F4: 'Website management & maintenance',
            svc4Title: 'Consulting & Strategy',
            svc4Desc: 'Strategic consulting in IT and digital transformation. We design solutions tailored to your goals.',
            svc4F1: 'IT audit & needs analysis', svc4F2: 'Digital transformation', svc4F3: 'Technology roadmap', svc4F4: 'Cost optimization',
            // Service card backs
            svc1Back: 'We provide comprehensive management of your IT infrastructure — from server and network monitoring to instant help during outages. Our team responds within 15 minutes and ensures 99.9% system uptime.',
            svc1BackB1: '24/7 monitoring with automated alerts', svc1BackB2: 'SLA-guaranteed response within 15 minutes', svc1BackB3: 'Backup, recovery and disaster recovery',
            svc1BackCta: "I'm interested",
            svc2Back: 'We implement AI solutions that replace repetitive manual tasks. Chatbots, automated reports, predictive analytics — all tailored to your process.',
            svc2BackB1: 'Saves up to 70% time on routine tasks', svc2BackB2: 'Integration with existing systems (CRM, ERP)', svc2BackB3: 'Continuous improvement via ML feedback',
            svc2BackCta: "I'm interested",
            svc3Back: 'We design and develop websites and e-shops that convert visitors into customers. Focus on speed, SEO and mobile optimization.',
            svc3BackB1: 'Average PageSpeed score 95+', svc3BackB2: 'Responsive design for all devices', svc3BackB3: 'Custom CMS, easy content management',
            svc3BackCta: "I'm interested",
            svc4Back: 'We offer in-depth analysis of your IT processes and a concrete technology roadmap. We help companies optimize costs and navigate digital transformation.',
            svc4BackB1: 'IT audit + action plan within 5 business days', svc4BackB2: 'Independent advice without conflict of interest', svc4BackB3: 'Measurable KPIs for every transformation step',
            svc4BackCta: "I'm interested",
            flipHint: 'click for more →',
            flipBackHint: '← back',
            // About
            aboutTag: '// ABOUT US',
            aboutTitle: 'Technology that works <span class="gold">for you</span>',
            aboutP1: 'DrZan Labs is a technology company focused on providing top-tier IT support and implementing AI automation. We believe the right technology can transform any business.',
            aboutP2: 'Our mission is simple: free you from technical worries and give you tools that provide a competitive advantage.',
            aboutF1Title: 'Fast response', aboutF1Desc: 'Average response time under 15 minutes',
            aboutF2Title: 'Security', aboutF2Desc: 'Enterprise-level cybersecurity protection',
            aboutF3Title: 'AI-First approach', aboutF3Desc: 'Automation as a foundation, not an add-on',
            statLabel1: 'Guaranteed uptime', statLabel2: 'Average response', statLabel3: 'Resolved tickets', statLabel4: 'AI automations',
            // Home offer
            offerBadge: 'FOR HOUSEHOLDS',
            offerTag: '// SPECIAL OFFER',
            offerTitle: 'IT support <span class="gold">right at your home</span>',
            offerDesc: "Computer, internet or printer not working? Need help with setup? We come directly to your home and fix it on the spot.",
            offerF1: 'PC / laptop diagnostics and repair',
            offerF2: 'Wi-Fi, router and network setup',
            offerF3: 'Software and antivirus installation',
            offerF4: 'Data backup and system recovery',
            offerF5: 'Advice on purchasing new devices',
            offerPriceLabel: 'On-site visit from',
            offerPriceVal: '25 €',
            offerBtn: 'Book a visit',
            offerNote: 'Availability: Bratislava and surroundings',
            offerFlipHint: 'click for pricing →',
            // Offer pricing back
            offerBackTitle: 'Service Pricing',
            pricingOnSiteTitle: '🏠 On-site visit',
            pricingRow1: '1st hour (incl. started)', pricingRow1Price: '60 €',
            pricingRow2: '2nd hour', pricingRow2Price: '40 €',
            pricingRowTransport: 'Transport', pricingRowTransportPrice: 'from 25 €',
            pricingRemoteTitle: '💻 Remote support',
            pricingRow3: 'First half hour', pricingRow3Price: '25 €',
            pricingRow4: 'Full hour', pricingRow4Price: '50 €',
            pricingDiscountLabel: '👴 Senior discount',
            pricingDiscountValue: '−50%',
            pricingDiscountNote: 'on everything except transport',
            // Contact
            contactTag: '// CONTACT',
            contactTitle: "Let's collaborate",
            contactDesc: 'Have a question or project? Get in touch and we will find a solution together.',
            contactEmail: 'Email',
            contactLocation: 'Location',
            contactLocationVal: 'Slovakia',
            contactEmailVal: 'info@drzanlabs.com',
            formName: 'Name', formNamePh: 'Your name',
            formEmail: 'Email', formEmailPh: 'email@example.com',
            formService: 'Service', formServiceDefault: 'Select a service',
            formServiceOpts: ['IT Support', 'AI Automation', 'Websites & E-shops', 'Consulting', 'Home IT support', 'Other'],
            formMessage: 'Message', formMessagePh: 'Describe your project or question...',
            formSubmit: 'Send message',
            formSent: 'Sent!',
            // Footer
            footerCopy: '&copy; 2026 DrZan Labs. All rights reserved.',
        },
        sk: {
            portalSubtitle: 'Inicializujem systém...',
            portalConnecting: 'Pripájam sa...',
            skipIntro: 'Preskočiť',
            navServices: 'Služby',
            navAbout: 'O nás',
            navContact: 'Kontakt',
            mobileHome: 'Domov',
            heroTagline: 'Kde technológia stretáva inteligenciu',
            heroDesc: 'IT podpora novej generácie. Automatizácia poháňaná umelou inteligenciou.',
            heroBtn1: 'Naše služby',
            heroBtn2: 'Kontaktujte nás',
            heroBtn1Link: '#services',
            heroBtn2Link: '#contact',
            servicesTag: '// SLUŽBY',
            servicesTitle: 'Čo pre vás môžeme urobiť',
            servicesSubtitle: 'Kombinujeme expertízu v IT s pokročilou AI automatizáciou',
            serviceBadge: 'POPULÁRNE',
            svc1Title: 'IT Support & Infraštruktúra',
            svc1Desc: 'Kompletná správa IT systémov, sietí a serverov. Monitoring 24/7, rýchla odozva, preventívna údržba.',
            svc1F1: 'Helpdesk & vzdialená podpora', svc1F2: 'Správa sietí a serverov', svc1F3: 'Kybernetická bezpečnosť', svc1F4: 'Cloud migrácia',
            svc2Title: 'AI Automatizácia',
            svc2Desc: 'Inteligentné workflow automatizácie, chatboty, a AI riešenia šité na mieru pre váš biznis.',
            svc2F1: 'AI chatboty & asistenti', svc2F2: 'Automatizácia procesov', svc2F3: 'Dátová analytika s AI', svc2F4: 'Integrácia LLM modelov',
            svc3Title: 'Weby & E-shopy',
            svc3Desc: 'Tvorba reprezentatívnych webových stránok a e-shopov. Moderný dizajn, rýchle načítanie, optimalizácia pre konverzie.',
            svc3F1: 'Prezentačné weby na mieru', svc3F2: 'E-shopy & online obchody', svc3F3: 'SEO & výkonnostná optimalizácia', svc3F4: 'Správa & údržba webov',
            svc4Title: 'Konzultácie & Stratégia',
            svc4Desc: 'Strategické poradenstvo v oblasti IT a digitálnej transformácie. Navrhujeme riešenia šité na mieru vašim cieľom.',
            svc4F1: 'IT audit & analýza potrieb', svc4F2: 'Digitálna transformácia', svc4F3: 'Technologická roadmapa', svc4F4: 'Optimalizácia nákladov',
            // Service card backs
            svc1Back: 'Poskytujeme komplexnú správu vašej IT infraštruktúry — od monitoringu serverov a sietí až po okamžitú pomoc pri výpadkoch. Náš tím reaguje do 15 minút a zabezpečuje 99.9% dostupnosť systémov.',
            svc1BackB1: 'Monitoring 24/7 s automatickými alertami', svc1BackB2: 'SLA garantovaná odozva do 15 minút', svc1BackB3: 'Zálohovanie, obnova a disaster recovery',
            svc1BackCta: 'Mám záujem',
            svc2Back: 'Implementujeme AI riešenia, ktoré nahradia opakujúce sa manuálne úlohy. Chatboty, automatizované reporty, prediktívna analytika — všetko na mieru vášmu procesu.',
            svc2BackB1: 'Ušetrí až 70% času na rutinných úlohách', svc2BackB2: 'Integrácia s CRM, ERP a existujúcimi systémami', svc2BackB3: 'Kontinuálne zlepšovanie cez ML feedback',
            svc2BackCta: 'Mám záujem',
            svc3Back: 'Navrhujeme a vyvíjame weby a e-shopy, ktoré konvertujú návštevníkov na zákazníkov. Dôraz na rýchlosť, SEO a mobilnú optimalizáciu.',
            svc3BackB1: 'Priemerný PageSpeed skóre 95+', svc3BackB2: 'Responzívny dizajn pre všetky zariadenia', svc3BackB3: 'Vlastný CMS, jednoduchá správa obsahu',
            svc3BackCta: 'Mám záujem',
            svc4Back: 'Ponúkame hĺbkovú analýzu vašich IT procesov a tvorbu konkrétnej technologickej roadmapy. Pomáhame firmám optimalizovať náklady a prejsť digitálnou transformáciou.',
            svc4BackB1: 'IT audit + akčný plán do 5 pracovných dní', svc4BackB2: 'Nezávislé poradenstvo bez konfliktu záujmov', svc4BackB3: 'Merateľné KPIs pre každý krok transformácie',
            svc4BackCta: 'Mám záujem',
            flipHint: 'kliknite pre viac →',
            flipBackHint: '← späť',
            aboutTag: '// O NÁS',
            aboutTitle: 'Technológia, ktorá pracuje <span class="gold">pre vás</span>',
            aboutP1: 'DrZan Labs je technologická firma zameraná na poskytovanie špičkového IT supportu a implementáciu AI automatizácie. Veríme, že správna technológia dokáže transformovať akýkoľvek biznis.',
            aboutP2: 'Naša misia je jednoduchá: zbaviť vás technických starostí a dať vám nástroje, ktoré vám dajú konkurenčnú výhodu.',
            aboutF1Title: 'Rýchla odozva', aboutF1Desc: 'Priemerný čas reakcie pod 15 minút',
            aboutF2Title: 'Bezpečnosť', aboutF2Desc: 'Kybernetická ochrana na enterprise úrovni',
            aboutF3Title: 'AI-First prístup', aboutF3Desc: 'Automatizácia ako základ, nie doplnok',
            statLabel1: 'Uptime garantovaný', statLabel2: 'Priemerná odozva', statLabel3: 'Vyriešených ticketov', statLabel4: 'AI automatizácií',
            offerBadge: 'PRE DOMÁCNOSTI',
            offerTag: '// ŠPECIÁLNA PONUKA',
            offerTitle: 'IT podpora <span class="gold">priamo u vás doma</span>',
            offerDesc: 'Nefunguje vám počítač, internet alebo tlačiareň? Neviete si rady s nastavením? Prídeme priamo k vám domov a vyriešime to na mieste.',
            offerF1: 'Diagnostika a oprava PC / notebooku',
            offerF2: 'Nastavenie Wi-Fi, routera a siete',
            offerF3: 'Inštalácia softvéru a antivírusu',
            offerF4: 'Zálohovanie dát a obnova systému',
            offerF5: 'Poradenstvo pri kúpe nového zariadenia',
            offerPriceLabel: 'Výjazd už od',
            offerPriceVal: '25 €',
            offerBtn: 'Objednať výjazd',
            offerNote: 'Dostupnosť: Bratislava a okolie',
            offerFlipHint: 'kliknite pre cenník →',
            // Offer pricing back
            offerBackTitle: 'Cenník služieb',
            pricingOnSiteTitle: '🏠 Výjazd k zákazníkovi',
            pricingRow1: '1. hodina (aj začatá)', pricingRow1Price: '60 €',
            pricingRow2: '2. hodina', pricingRow2Price: '40 €',
            pricingRowTransport: 'Doprava', pricingRowTransportPrice: 'od 25 €',
            pricingRemoteTitle: '💻 Vzdialená podpora',
            pricingRow3: 'Prvá pol hodina', pricingRow3Price: '25 €',
            pricingRow4: 'Celá hodina', pricingRow4Price: '50 €',
            pricingDiscountLabel: '👴 Dôchodcovská zľava',
            pricingDiscountValue: '−50%',
            pricingDiscountNote: 'na všetko okrem dopravy',
            contactTag: '// KONTAKT',
            contactTitle: 'Poďme spolupracovať',
            contactDesc: 'Máte otázku alebo projekt? Ozvite sa nám a spoločne nájdeme riešenie.',
            contactEmail: 'Email',
            contactLocation: 'Lokácia',
            contactLocationVal: 'Slovensko',
            contactEmailVal: 'info@drzanlabs.com',
            formName: 'Meno', formNamePh: 'Vaše meno',
            formEmail: 'Email', formEmailPh: 'email@priklad.sk',
            formService: 'Služba', formServiceDefault: 'Vyberte službu',
            formServiceOpts: ['IT Support', 'AI Automatizácia', 'Weby & E-shopy', 'Konzultácia', 'IT podpora pre domácnosť', 'Iné'],
            formMessage: 'Správa', formMessagePh: 'Popíšte váš projekt alebo otázku...',
            formSubmit: 'Odoslať správu',
            formSent: 'Odoslane!',
            footerCopy: '&copy; 2026 DrZan Labs. Všetky práva vyhradené.',
        }
    };

    // ---- Load admin content overrides from localStorage ----
    (function loadContentOverrides() {
        try {
            const saved = JSON.parse(localStorage.getItem('drzan_content') || 'null');
            if (!saved) return;
            ['sk', 'en'].forEach(lang => {
                if (saved[lang] && typeof saved[lang] === 'object') {
                    Object.assign(T[lang], saved[lang]);
                }
            });
        } catch(e) {}
    })();

    function applyLanguage(lang) {
        siteLang = lang;
        const t = T[lang];
        document.documentElement.lang = lang;
        updateLangSwitch(lang);

        // Helper to set text/html
        const txt = (sel, val) => { const el = document.querySelector(sel); if (el) el.textContent = val; };
        const htm = (sel, val) => { const el = document.querySelector(sel); if (el) el.innerHTML = val; };

        // Nav
        const navLinks = document.querySelectorAll('.nav-links a');
        if (navLinks[0]) navLinks[0].textContent = t.navServices;
        if (navLinks[1]) navLinks[1].textContent = t.navAbout;
        if (navLinks[2]) navLinks[2].textContent = t.navContact;

        // Mobile nav
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        if (mobileLinks[0]) mobileLinks[0].textContent = t.mobileHome;
        if (mobileLinks[1]) mobileLinks[1].textContent = t.navServices;
        if (mobileLinks[2]) mobileLinks[2].textContent = t.navAbout;
        if (mobileLinks[3]) mobileLinks[3].textContent = t.navContact;

        // Hero
        txt('.hero-tagline', t.heroTagline);
        txt('.hero-desc', t.heroDesc);
        const heroBtns = document.querySelectorAll('.hero-buttons .btn');
        if (heroBtns[0]) { heroBtns[0].textContent = t.heroBtn1; if (t.heroBtn1Link) heroBtns[0].href = t.heroBtn1Link; }
        if (heroBtns[1]) { heroBtns[1].textContent = t.heroBtn2; if (t.heroBtn2Link) heroBtns[1].href = t.heroBtn2Link; }

        // Services section
        const svcHeader = document.querySelector('#services .section-header');
        if (svcHeader) {
            svcHeader.querySelector('.section-tag').textContent = t.servicesTag;
            svcHeader.querySelector('h2').textContent = t.servicesTitle;
            svcHeader.querySelector('p').textContent = t.servicesSubtitle;
        }
        const svcBadge = document.querySelector('.service-badge');
        if (svcBadge) svcBadge.textContent = t.serviceBadge;

        const cards = document.querySelectorAll('.service-card');
        [1,2,3,4].forEach(n => {
            const card = cards[n-1];
            if (!card) return;
            // Front face
            const front = card.querySelector('.card-front');
            if (front) {
                front.querySelector('h3').textContent = t['svc'+n+'Title'];
                front.querySelector('p').textContent = t['svc'+n+'Desc'];
                const lis = front.querySelectorAll('.service-features li');
                lis[0].textContent = t['svc'+n+'F1'];
                lis[1].textContent = t['svc'+n+'F2'];
                lis[2].textContent = t['svc'+n+'F3'];
                lis[3].textContent = t['svc'+n+'F4'];
                const flipHintEl = front.querySelector('.flip-hint');
                if (flipHintEl) flipHintEl.textContent = t.flipHint;
            }
            // Back face
            const back = card.querySelector('.card-back-inner');
            if (back) {
                back.querySelector('h3').textContent = t['svc'+n+'Title'];
                back.querySelector('.back-desc').textContent = t['svc'+n+'Back'];
                const blis = back.querySelectorAll('.back-list li');
                blis[0].textContent = t['svc'+n+'BackB1'];
                blis[1].textContent = t['svc'+n+'BackB2'];
                blis[2].textContent = t['svc'+n+'BackB3'];
                const backCta = back.querySelector('.back-cta');
                if (backCta) backCta.textContent = t['svc'+n+'BackCta'];
                const flipBackHintEl = back.querySelector('.flip-back-hint');
                if (flipBackHintEl) flipBackHintEl.textContent = t.flipBackHint;
            }
        });

        // About
        const aboutContent = document.querySelector('.about-content');
        if (aboutContent) {
            aboutContent.querySelector('.section-tag').textContent = t.aboutTag;
            aboutContent.querySelector('h2').innerHTML = t.aboutTitle;
            const ps = aboutContent.querySelectorAll(':scope > p');
            if (ps[0]) ps[0].textContent = t.aboutP1;
            if (ps[1]) ps[1].textContent = t.aboutP2;
            const features = aboutContent.querySelectorAll('.about-feature');
            if (features[0]) { features[0].querySelector('h4').textContent = t.aboutF1Title; features[0].querySelector('p').textContent = t.aboutF1Desc; }
            if (features[1]) { features[1].querySelector('h4').textContent = t.aboutF2Title; features[1].querySelector('p').textContent = t.aboutF2Desc; }
            if (features[2]) { features[2].querySelector('h4').textContent = t.aboutF3Title; features[2].querySelector('p').textContent = t.aboutF3Desc; }
        }

        // Stat labels
        const statLabels = document.querySelectorAll('.stat-label');
        if (statLabels[0]) statLabels[0].textContent = t.statLabel1;
        if (statLabels[1]) statLabels[1].textContent = t.statLabel2;
        if (statLabels[2]) statLabels[2].textContent = t.statLabel3;
        if (statLabels[3]) statLabels[3].textContent = t.statLabel4;

        // Home offer
        const offer = document.getElementById('home-offer');
        if (offer) {
            // Front face
            offer.querySelector('.offer-card-front .offer-badge').textContent = t.offerBadge;
            offer.querySelector('.section-tag').textContent = t.offerTag;
            offer.querySelector('.offer-text h2').innerHTML = t.offerTitle;
            offer.querySelector('.offer-text > p').textContent = t.offerDesc;
            const offerLis = offer.querySelectorAll('.offer-features li span');
            if (offerLis[0]) offerLis[0].textContent = t.offerF1;
            if (offerLis[1]) offerLis[1].textContent = t.offerF2;
            if (offerLis[2]) offerLis[2].textContent = t.offerF3;
            if (offerLis[3]) offerLis[3].textContent = t.offerF4;
            if (offerLis[4]) offerLis[4].textContent = t.offerF5;
            offer.querySelector('.price-label').textContent = t.offerPriceLabel;
            const priceValEl = offer.querySelector('.price-value');
            if (priceValEl && t.offerPriceVal) priceValEl.textContent = t.offerPriceVal;
            offer.querySelector('.offer-cta .btn').textContent = t.offerBtn;
            offer.querySelector('.offer-note').textContent = t.offerNote;
            const offerFlipHintEl = offer.querySelector('.offer-flip-hint');
            if (offerFlipHintEl) offerFlipHintEl.textContent = t.offerFlipHint;
            // Back face — pricing
            const back = offer.querySelector('.offer-back-inner');
            if (back) {
                const backBadge = back.querySelector('.offer-badge');
                if (backBadge) backBadge.textContent = t.offerBadge;
                back.querySelector('.offer-back-title').textContent = t.offerBackTitle;
                const blocks = back.querySelectorAll('.pricing-block-title');
                if (blocks[0]) blocks[0].textContent = t.pricingOnSiteTitle;
                if (blocks[1]) blocks[1].textContent = t.pricingRemoteTitle;
                const rows = back.querySelectorAll('.pricing-row');
                const rowTexts = [t.pricingRow1, t.pricingRow2, t.pricingRowTransport, t.pricingRow3, t.pricingRow4];
                const rowPrices = [t.pricingRow1Price, t.pricingRow2Price, t.pricingRowTransportPrice, t.pricingRow3Price, t.pricingRow4Price];
                rows.forEach((row, i) => {
                    if (rowTexts[i]) row.childNodes[0].textContent = rowTexts[i];
                    const priceEl = row.querySelector('.pricing-price');
                    if (priceEl && rowPrices[i]) priceEl.textContent = rowPrices[i];
                });
                const disc = back.querySelector('.pricing-discount');
                if (disc) {
                    disc.querySelector('.discount-label').textContent = t.pricingDiscountLabel;
                    disc.querySelector('.discount-value').textContent = t.pricingDiscountValue;
                    disc.querySelector('.discount-note').textContent = t.pricingDiscountNote;
                }
                const backCta = back.querySelector('.offer-order-btn');
                if (backCta) backCta.textContent = t.offerBtn;
                const backHint = back.querySelector('.flip-back-hint');
                if (backHint) backHint.textContent = t.flipBackHint;
            }
        }

        // Contact
        const contact = document.getElementById('contact');
        if (contact) {
            contact.querySelector('.section-tag').textContent = t.contactTag;
            contact.querySelector('.contact-info h2').textContent = t.contactTitle;
            contact.querySelector('.contact-info > p').textContent = t.contactDesc;
            const labels = contact.querySelectorAll('.contact-label');
            if (labels[0]) labels[0].textContent = t.contactEmail;
            if (labels[1]) labels[1].textContent = t.contactLocation;
            const locSpan = contact.querySelectorAll('.contact-item')[1];
            if (locSpan) { const s = locSpan.querySelectorAll('span'); if (s[1]) s[1].textContent = t.contactLocationVal; }
            const emailLink = contact.querySelector('a[href^="mailto"]');
            if (emailLink && t.contactEmailVal) { emailLink.href = 'mailto:' + t.contactEmailVal; emailLink.textContent = t.contactEmailVal; }

            // Form
            const nameInput = document.getElementById('name');
            nameInput.placeholder = t.formNamePh;
            nameInput.nextElementSibling.textContent = t.formName;
            const emailInput = document.getElementById('email');
            emailInput.placeholder = t.formEmailPh;
            emailInput.nextElementSibling.textContent = t.formEmail;
            const serviceSelect = document.getElementById('service');
            serviceSelect.innerHTML = '<option value="" disabled selected>' + t.formServiceDefault + '</option>' +
                t.formServiceOpts.map(o => '<option>' + o + '</option>').join('');
            serviceSelect.nextElementSibling.textContent = t.formService;
            const msgInput = document.getElementById('message');
            msgInput.placeholder = t.formMessagePh;
            msgInput.nextElementSibling.textContent = t.formMessage;
            const submitBtn = contact.querySelector('button[type="submit"]');
            if (submitBtn) {
                const svg = submitBtn.querySelector('svg').outerHTML;
                submitBtn.innerHTML = '<span>' + t.formSubmit + '</span>' + svg;
            }
        }

        // Footer
        const footerLinks = document.querySelectorAll('.footer-links a');
        if (footerLinks[0]) footerLinks[0].textContent = t.navServices;
        if (footerLinks[1]) footerLinks[1].textContent = t.navAbout;
        if (footerLinks[2]) footerLinks[2].textContent = t.navContact;
        const footerCopy = document.querySelector('.footer-copy p');
        if (footerCopy) footerCopy.innerHTML = t.footerCopy;

        // Skip button
        const skipText = document.getElementById('skip-intro');
        if (skipText) skipText.innerHTML = t.skipIntro + ' <span>→</span>';
    }

    // ---- Matrix Decode Effect ----
    const matrixChars = '01アイウエオカキクケコサシスセソ10タチツテトナニヌネノ';
    let matrixInterval = null;

    function matrixDecode(el, targetText, duration) {
        if (matrixInterval) clearInterval(matrixInterval);
        const len = targetText.length;
        const resolved = new Array(len).fill(false);
        const startTime = Date.now();

        matrixInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Resolve characters left to right based on progress
            const resolveCount = Math.floor(progress * len);
            for (let i = 0; i < resolveCount; i++) resolved[i] = true;

            let output = '';
            for (let i = 0; i < len; i++) {
                if (resolved[i]) {
                    output += targetText[i];
                } else if (targetText[i] === ' ') {
                    output += ' ';
                } else {
                    output += matrixChars[Math.floor(Math.random() * matrixChars.length)];
                }
            }
            el.textContent = output;

            if (progress >= 1) {
                clearInterval(matrixInterval);
                matrixInterval = null;
                el.textContent = targetText;
            }
        }, 50);
    }

    function initPortal() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: portalCanvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        camera.position.z = 5;

        // Portal ring particles
        const ringCount = 3;
        const rings = [];
        const particlesPerRing = 200;

        for (let r = 0; r < ringCount; r++) {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particlesPerRing * 3);
            const radius = 1.8 + r * 0.5;

            for (let i = 0; i < particlesPerRing; i++) {
                const angle = (i / particlesPerRing) * Math.PI * 2;
                const jitter = (Math.random() - 0.5) * 0.15;
                positions[i * 3] = Math.cos(angle) * (radius + jitter);
                positions[i * 3 + 1] = Math.sin(angle) * (radius + jitter);
                positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.PointsMaterial({
                color: new THREE.Color().setHSL(0.12, 0.8, 0.5 + r * 0.1),
                size: 0.03 + r * 0.005,
                transparent: true,
                opacity: 0.8 - r * 0.15,
                blending: THREE.AdditiveBlending,
            });

            const points = new THREE.Points(geometry, material);
            scene.add(points);
            rings.push({ points, speed: 0.3 + r * 0.15, radius });
        }

        // Central glow particles
        const centerCount = 500;
        const centerGeo = new THREE.BufferGeometry();
        const centerPos = new Float32Array(centerCount * 3);
        const centerVelocities = [];

        for (let i = 0; i < centerCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 1.5;
            centerPos[i * 3] = Math.cos(angle) * dist;
            centerPos[i * 3 + 1] = Math.sin(angle) * dist;
            centerPos[i * 3 + 2] = (Math.random() - 0.5) * 2;
            centerVelocities.push({
                x: (Math.random() - 0.5) * 0.005,
                y: (Math.random() - 0.5) * 0.005,
                z: -0.01 - Math.random() * 0.02,
            });
        }

        centerGeo.setAttribute('position', new THREE.BufferAttribute(centerPos, 3));
        const centerMat = new THREE.PointsMaterial({
            color: 0xd4af37,
            size: 0.02,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
        });
        const centerPoints = new THREE.Points(centerGeo, centerMat);
        scene.add(centerPoints);

        // Energy lines (portal edges)
        const lineCount = 12;
        for (let i = 0; i < lineCount; i++) {
            const angle = (i / lineCount) * Math.PI * 2;
            const lineGeo = new THREE.BufferGeometry();
            const linePositions = new Float32Array(6);
            linePositions[0] = Math.cos(angle) * 1.5;
            linePositions[1] = Math.sin(angle) * 1.5;
            linePositions[2] = 0;
            linePositions[3] = Math.cos(angle) * 3;
            linePositions[4] = Math.sin(angle) * 3;
            linePositions[5] = 0;
            lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
            const lineMat = new THREE.LineBasicMaterial({
                color: 0xd4af37,
                transparent: true,
                opacity: 0.15,
            });
            const line = new THREE.Line(lineGeo, lineMat);
            scene.add(line);
        }

        let time = 0;
        let portalPhase = 'idle'; // idle -> opening -> zoomThrough
        let phaseTime = 0;

        // Language gate: wait for user to pick SK/EN before opening portal
        // Start Matrix decode on initial subtitle immediately
        const subtitle = document.getElementById('portal-subtitle');
        matrixDecode(subtitle, 'INITIALIZING SYSTEM...', 3000);

        startPortalOpening = function (lang) {
            applyLanguage(lang);
            matrixDecode(subtitle, T[lang].portalConnecting.toUpperCase(), 600);
            portalPhase = 'opening';
            phaseTime = 0;
        };

        // Show language chooser after 0.5s (let logo appear first)
        setTimeout(() => {
            const chooser = document.getElementById('lang-chooser');
            const timerBar = document.getElementById('lang-timer-bar');
            chooser.classList.add('visible');
            timerBar.classList.add('counting');

            let langChosen = false;

            // Auto-select EN after 5 seconds
            const autoTimer = setTimeout(() => {
                if (!langChosen) {
                    langChosen = true;
                    document.querySelector('[data-lang="en"]').classList.add('active');
                    chooser.style.opacity = '0.5';
                    startPortalOpening('en');
                }
            }, 5000);

            // Button click handlers
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (langChosen) return;
                    langChosen = true;
                    clearTimeout(autoTimer);
                    timerBar.style.animation = 'none';
                    timerBar.classList.add('loading');
                    btn.classList.add('active');
                    startPortalOpening(btn.dataset.lang);
                });
            });
        }, 500);

        function animate() {
            if (portalDone) {
                renderer.dispose();
                return;
            }
            requestAnimationFrame(animate);
            time += 0.016;
            phaseTime += 0.016;

            // Rotate rings
            rings.forEach((ring, idx) => {
                ring.points.rotation.z += ring.speed * 0.01;
                ring.points.rotation.x = Math.sin(time * 0.5 + idx) * 0.1;
            });

            // Animate center particles (flow inward)
            const positions = centerPoints.geometry.attributes.position.array;
            for (let i = 0; i < centerCount; i++) {
                positions[i * 3] += centerVelocities[i].x;
                positions[i * 3 + 1] += centerVelocities[i].y;
                positions[i * 3 + 2] += centerVelocities[i].z;

                // Reset particles that go too far
                if (positions[i * 3 + 2] < -2) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = Math.random() * 1.5;
                    positions[i * 3] = Math.cos(angle) * dist;
                    positions[i * 3 + 1] = Math.sin(angle) * dist;
                    positions[i * 3 + 2] = 1 + Math.random();
                }
            }
            centerPoints.geometry.attributes.position.needsUpdate = true;

            // Portal opening phase
            if (portalPhase === 'opening') {
                const scale = 1 + phaseTime * 0.3;
                rings.forEach(ring => {
                    ring.points.scale.setScalar(scale);
                    ring.points.material.opacity = Math.max(0, ring.points.material.opacity - 0.003);
                });

                centerMat.opacity = Math.min(1, 0.6 + phaseTime * 0.3);
                centerMat.size = 0.02 + phaseTime * 0.01;

                if (phaseTime > 0.6) {
                    portalPhase = 'zoomThrough';
                    phaseTime = 0;
                }
            }

            if (portalPhase === 'zoomThrough') {
                camera.position.z -= 0.15;
                camera.fov = 75 + phaseTime * 30;
                camera.updateProjectionMatrix();

                if (phaseTime > 0.5) {
                    finishPortal();
                }
            }

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            if (portalDone) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    function finishPortal() {
        if (portalDone) return;
        portalDone = true;

        portalOverlay.style.transition = 'opacity 0.6s ease';
        portalOverlay.style.opacity = '0';

        setTimeout(() => {
            portalOverlay.style.display = 'none';
            showMainContent();
        }, 100);
    }

    function showMainContent() {
        navbar.classList.remove('hidden');
        navbar.style.opacity = '1';
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '1';

        // Use setTimeout for reliable execution across all environments
        setTimeout(() => {
            animateHero();
            initScrollAnimations();
        }, 100);
    }

    // Skip intro — also applies language if not chosen yet
    skipBtn.addEventListener('click', () => {
        if (startPortalOpening && !portalDone) {
            // If language wasn't chosen yet, default to EN
            if (document.querySelector('.lang-btn.active') === null) {
                applyLanguage('en');
            }
        }
        finishPortal();
    });

    // ---- Background Particles (Three.js) ----
    function initBackground() {
        const canvas = document.getElementById('bg-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        camera.position.z = 30;

        const count = 800;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 80;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xd4af37,
            size: 0.08,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // ---- Creation of Adam Constellation ----
        // Coordinates trace the iconic silhouette: Adam (left) reaching right, God (right) reaching left
        // Scale: roughly -20 to +20 on X, -10 to +10 on Y
        const adamPoints = [
            // Adam's head
            [-16, 2], [-15.5, 3], [-15, 3.5], [-14.2, 3.3], [-13.8, 2.5], [-14, 1.5],
            // Adam's upper body (reclining)
            [-14.5, 1], [-13.5, 0.5], [-12.5, 0], [-11.5, -0.3],
            // Adam's torso
            [-15, 0], [-15.5, -1], [-15, -2.5], [-14, -3.5], [-13, -4],
            // Adam's left leg (bent)
            [-12, -4.5], [-11, -5.5], [-10.5, -7], [-11, -8], [-12, -8.5],
            // Adam's right leg (extended)
            [-14.5, -4], [-15.5, -5], [-16.5, -6.5], [-17, -8], [-17.5, -8.5],
            // Adam's left arm (reaching toward God) - KEY
            [-11, 0], [-9.5, 0.8], [-8, 1.5], [-6.5, 2], [-5, 2.3],
            // Adam's hand & fingers reaching
            [-4, 2.4], [-3.2, 2.45], [-2.5, 2.5],
        ];

        const godPoints = [
            // God's hand & fingers reaching
            [2.5, 2.5], [3.2, 2.55], [4, 2.5],
            // God's arm
            [5, 2.3], [6.5, 2], [8, 1.5], [9.5, 1.2],
            // God's head
            [12, 3.5], [12.8, 4], [13.5, 4.2], [14.2, 4], [14.8, 3.5], [14.5, 2.5],
            // God's upper body
            [11, 1], [12, 0.5], [13, 0], [14, -0.5],
            // God's robe / flowing cloth
            [10, 0], [9, -1], [8.5, -2.5], [9, -4], [10, -5],
            [11, -5.5], [12.5, -5], [14, -4.5], [15, -3.5],
            [15.5, -2], [15, -0.5],
            // God's other arm (behind)
            [10.5, 3], [9.5, 3.5], [8.5, 3.8], [7.5, 3.5],
            // Angels / figures around God
            [11, 5], [12.5, 5.5], [14, 5.2], [15, 4.5],
            [10, -1.5], [11, -2.5], [12, -3],
            // The billowing cloak shape
            [7, -1], [7.5, -3], [8, -4.5], [9, -5.5],
            [16, -2.5], [16.5, -1],
        ];

        // The gap between fingers - the most iconic part
        const gapPoints = [
            [-1.8, 2.5], [-1, 2.48], [0, 2.47], [1, 2.48], [1.8, 2.5],
        ];

        const allConstPoints = [...adamPoints, ...godPoints, ...gapPoints];
        const constCount = allConstPoints.length;
        const constGeo = new THREE.BufferGeometry();
        const constPositions = new Float32Array(constCount * 3);
        const constSizes = new Float32Array(constCount);
        const constPhases = new Float32Array(constCount);

        const constScale = 1.6; // stretch factor
        for (let i = 0; i < constCount; i++) {
            constPositions[i * 3] = allConstPoints[i][0] * constScale;
            constPositions[i * 3 + 1] = allConstPoints[i][1] * constScale;
            constPositions[i * 3 + 2] = 0;
            constSizes[i] = 0.15 + Math.random() * 0.1;
            constPhases[i] = Math.random() * Math.PI * 2;
        }

        constGeo.setAttribute('position', new THREE.BufferAttribute(constPositions, 3));

        const constMat = new THREE.PointsMaterial({
            color: 0xd4af37,
            size: 0.3,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
        });

        const constStars = new THREE.Points(constGeo, constMat);
        constStars.position.y = 4; // shift up to align with hero
        constStars.position.z = -3; // closer to camera for visibility
        scene.add(constStars);

        // Constellation connecting lines (very faint)
        function addConstellationLines(points, scene) {
            const lineMat = new THREE.LineBasicMaterial({
                color: 0xd4af37,
                transparent: true,
                opacity: 0.04,
            });

            for (let i = 0; i < points.length - 1; i++) {
                const dx = points[i + 1][0] - points[i][0];
                const dy = points[i + 1][1] - points[i][1];
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 3.5) { // only connect nearby stars
                    const lineGeo = new THREE.BufferGeometry();
                    const verts = new Float32Array([
                        points[i][0] * constScale, points[i][1] * constScale, 0,
                        points[i + 1][0] * constScale, points[i + 1][1] * constScale, 0,
                    ]);
                    lineGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
                    const line = new THREE.Line(lineGeo, lineMat);
                    line.position.y = 4;
                    line.position.z = -3;
                    scene.add(line);
                }
            }
        }

        addConstellationLines(adamPoints, scene);
        addConstellationLines(godPoints, scene);
        addConstellationLines(gapPoints, scene);

        let mouseX = 0, mouseY = 0;
        let bgTime = 0;
        document.addEventListener('mousemove', e => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        function animate() {
            requestAnimationFrame(animate);
            bgTime += 0.016;
            particles.rotation.y += 0.0003;
            particles.rotation.x += 0.0001;

            // Twinkle constellation stars
            const sizes = constStars.geometry.attributes.position.array;
            for (let i = 0; i < constCount; i++) {
                const twinkle = 0.5 + 0.5 * Math.sin(bgTime * (0.8 + constSizes[i] * 3) + constPhases[i]);
                // Modulate size isn't easy with PointsMaterial, so we'll shift z slightly for depth flicker
                sizes[i * 3 + 2] = Math.sin(bgTime * 1.2 + constPhases[i]) * 0.3;
            }
            constStars.geometry.attributes.position.needsUpdate = true;
            constMat.opacity = 0.55 + 0.25 * Math.sin(bgTime * 0.5);

            camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
            camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // ---- Hero Animation ----
    function animateHero() {
        const items = document.querySelectorAll('.hero-anim');
        items.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) scale(1)';
            }, i * 150 + 50);
        });
    }

    // ---- Scroll Animations (IntersectionObserver based) ----
    function initScrollAnimations() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 80);
        }, { passive: true });

        // IntersectionObserver for reveal animations
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('revealed');
                    // Also force styles directly for environments where CSS transitions lag
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'none';
                    }, parseFloat(getComputedStyle(el).transitionDelay || '0') * 1000 + 50);
                    revealObserver.unobserve(el);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

        // Add reveal class and observe
        const revealSelectors = [
            '.service-card', '.section-header', '.about-content',
            '.about-visual', '.stat-card', '.contact-info',
            '.contact-form', '.tech-marquee'
        ];

        revealSelectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.classList.add('scroll-reveal');
                revealObserver.observe(el);
            });
        });

        // Section-level reveal animations
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('section-visible');
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'none';
                    }, 1050);
                    sectionObserver.unobserve(el);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        const sectionAnimations = [
            { sel: '#services', cls: 'from-bottom' },
            { sel: '#about', cls: 'from-left' },
            { sel: '#home-offer', cls: 'from-scale' },
            { sel: '#contact', cls: 'from-right' },
        ];

        sectionAnimations.forEach(({ sel, cls }) => {
            const el = document.querySelector(sel);
            if (el) {
                el.classList.add('section-reveal', cls);
                sectionObserver.observe(el);
            }
        });

        // Stat counter animation
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(stat => {
            statObserver.observe(stat);
        });
    }

    function animateCounter(el) {
        const target = parseFloat(el.dataset.target);
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = target * eased;
            el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // ---- 3D Tilt Cards ----
    function initTiltCards() {
        // No tilt on touch devices — pointless and interferes with flip
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        document.querySelectorAll('[data-tilt]').forEach(card => {
            const inner = card.querySelector('.card-inner') || card;
            let rafId = null;
            let targetRX = 0, targetRY = 0;
            let currentRX = 0, currentRY = 0;
            let hovering = false;

            function lerp(a, b, t) { return a + (b - a) * t; }

            function animate() {
                // Card was flipped — hand transform back to CSS, stop loop
                if (card.classList.contains('flipped')) {
                    inner.style.transform = '';
                    rafId = null;
                    hovering = false;
                    targetRX = 0; targetRY = 0;
                    currentRX = 0; currentRY = 0;
                    return;
                }
                currentRX = lerp(currentRX, targetRX, 0.12);
                currentRY = lerp(currentRY, targetRY, 0.12);
                const ty = hovering ? lerp(0, -8, Math.abs(currentRX + currentRY) / 10) : lerp(currentRX, 0, 0.12);
                inner.style.transform = `perspective(1000px) rotateX(${currentRX.toFixed(3)}deg) rotateY(${currentRY.toFixed(3)}deg) translateY(${hovering ? -3 : 0}px)`;
                // Stop when close enough to rest
                if (!hovering && Math.abs(currentRX) < 0.01 && Math.abs(currentRY) < 0.01) {
                    inner.style.transform = '';
                    rafId = null;
                    return;
                }
                rafId = requestAnimationFrame(animate);
            }

            card.addEventListener('mouseenter', () => {
                if (card.classList.contains('flipped')) return;
                hovering = true;
                if (!rafId) rafId = requestAnimationFrame(animate);
            });

            card.addEventListener('mousemove', (e) => {
                if (card.classList.contains('flipped')) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                targetRX = ((y - rect.height / 2) / (rect.height / 2)) * -3;
                targetRY = ((x - rect.width  / 2) / (rect.width  / 2)) *  3;
                if (!rafId) rafId = requestAnimationFrame(animate);
            });

            card.addEventListener('mouseleave', () => {
                hovering = false;
                targetRX = 0;
                targetRY = 0;
                if (!rafId) rafId = requestAnimationFrame(animate);
            });
        });
    }

    // ---- Service Card Flip ----
    function initCardFlip() {
        // Generic flip setup — works for both service cards and offer card
        function setupFlip(el, innerSel, skipSel) {
            let timer = null;
            let hovered = false;

            function doFlip(toFlipped) {
                const inner = el.querySelector(innerSel);
                if (el.classList.contains('flipped') === toFlipped) return;
                inner.classList.add('flip-anim');
                el.classList.toggle('flipped', toFlipped);
                inner.style.transform = '';
                setTimeout(() => inner.classList.remove('flip-anim'), 700);
                if (retroMode) retroAudio.playClick();
            }

            function scheduleBack() {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    if (el.classList.contains('flipped')) doFlip(false);
                }, 3000);
            }

            el.addEventListener('mouseenter', () => {
                hovered = true;
                clearTimeout(timer);
            });

            el.addEventListener('mouseleave', () => {
                hovered = false;
                if (el.classList.contains('flipped')) scheduleBack();
            });

            el.addEventListener('click', (e) => {
                if (skipSel && e.target.closest(skipSel)) return;
                const willFlip = !el.classList.contains('flipped');
                doFlip(willFlip);
                if (willFlip && !hovered) {
                    // Touch device — no hover, start timer immediately
                    scheduleBack();
                } else {
                    clearTimeout(timer);
                }
            });
        }

        document.querySelectorAll('.service-card').forEach(card => {
            setupFlip(card, '.card-inner', '.back-cta');
        });

        const offerCard = document.querySelector('.offer-card');
        if (offerCard) setupFlip(offerCard, '.offer-card-inner', '.offer-order-btn');
    }

    // ---- Cookie Banner ----
    function initCookieBanner() {
        if (localStorage.getItem('cookie_consent')) return;
        const banner = document.getElementById('cookie-banner');
        if (!banner) return;
        setTimeout(() => banner.classList.add('visible'), 1200);
        document.getElementById('cookie-accept').addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'accepted');
            banner.classList.remove('visible');
        });
    }

    // ---- Mobile Menu ----
    function initMobileMenu() {
        const btn = document.getElementById('mobile-menu');
        const nav = document.getElementById('mobile-nav');

        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                btn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile nav when lang switch is tapped
        nav.querySelectorAll('.lang-sw-btn').forEach(langBtn => {
            langBtn.addEventListener('click', () => {
                btn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ---- Contact Form ----
    function initContactForm() {
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span>' + T[siteLang].formSent + '</span> ✓';
            if (retroMode) retroAudio.playSuccess();
            btn.style.background = 'linear-gradient(135deg, #2d8a4e, #3cb371)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

    // ---- Smooth Scroll ----
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ---- Language Switch (navbar SK/EN) ----
    function initLangToggle() {
        // Document-level delegation — handles both navbar and mobile nav lang buttons
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.lang-sw-btn');
            if (!btn) return;
            const lang = btn.dataset.lang;
            if (lang === siteLang) return;
            applyLanguage(lang);
            updateLangSwitch(lang);
        });
    }

    function updateLangSwitch(lang) {
        document.querySelectorAll('.lang-sw-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.lang === lang);
        });
    }

    // ---- 8-Bit Retro Audio (Web Audio API) ----
    const retroAudio = {
        ctx: null,
        masterGain: null,
        muted: false,
        musicPlaying: false,
        musicOscs: [],

        init() {
            if (this.ctx) return;
            try {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = 0.15;
                this.masterGain.connect(this.ctx.destination);
                // iOS Safari starts AudioContext suspended — must resume in user gesture
                if (this.ctx.state === 'suspended') this.ctx.resume();
            } catch(e) {
                this.ctx = null; // audio unavailable, visual mode still works
            }
        },

        playBeep(freq, duration, type) {
            if (this.muted || !this.ctx) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type || 'square';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        },

        playHover() {
            this.playBeep(800, 0.05, 'square');
        },

        playClick() {
            this.playBeep(1200, 0.08, 'square');
            setTimeout(() => this.playBeep(1600, 0.06, 'square'), 60);
        },

        playStartup() {
            if (this.muted || !this.ctx) return;
            const notes = [262, 330, 392, 523, 659, 784];
            notes.forEach((freq, i) => {
                setTimeout(() => this.playBeep(freq, 0.12, 'square'), i * 80);
            });
        },

        playSuccess() {
            if (this.muted || !this.ctx) return;
            const notes = [523, 659, 784, 1047];
            notes.forEach((freq, i) => {
                setTimeout(() => this.playBeep(freq, 0.15, 'square'), i * 120);
            });
        },

        startMusic() {
            if (this.musicPlaying || this.muted || !this.ctx) return;
            this.musicPlaying = true;

            const melody = [
                262, 0, 330, 0, 392, 0, 330, 0,
                349, 0, 294, 0, 262, 0, 0, 0,
                392, 0, 440, 0, 523, 0, 440, 0,
                392, 0, 330, 0, 262, 0, 0, 0
            ];
            const bass = [
                131, 0, 131, 0, 165, 0, 165, 0,
                175, 0, 147, 0, 131, 0, 0, 0,
                196, 0, 196, 0, 220, 0, 220, 0,
                196, 0, 165, 0, 131, 0, 0, 0
            ];

            const bpm = 140;
            const noteLen = 60 / bpm / 2;
            const loopLen = melody.length * noteLen;

            const scheduleLoop = () => {
                if (!this.musicPlaying || this.muted) return;
                const now = this.ctx.currentTime;

                melody.forEach((freq, i) => {
                    if (freq === 0) return;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.12, now + i * noteLen);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * noteLen + noteLen * 0.8);
                    osc.connect(gain);
                    gain.connect(this.masterGain);
                    osc.start(now + i * noteLen);
                    osc.stop(now + i * noteLen + noteLen * 0.9);
                });

                bass.forEach((freq, i) => {
                    if (freq === 0) return;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.08, now + i * noteLen);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * noteLen + noteLen * 0.8);
                    osc.connect(gain);
                    gain.connect(this.masterGain);
                    osc.start(now + i * noteLen);
                    osc.stop(now + i * noteLen + noteLen * 0.9);
                });

                this._musicTimer = setTimeout(scheduleLoop, loopLen * 1000);
            };

            scheduleLoop();
        },

        stopMusic() {
            this.musicPlaying = false;
            if (this._musicTimer) clearTimeout(this._musicTimer);
        },

        toggleMute() {
            this.muted = !this.muted;
            if (this.muted) {
                this.stopMusic();
                if (this.masterGain) this.masterGain.gain.value = 0;
            } else {
                if (this.masterGain) this.masterGain.gain.value = 0.15;
                if (document.body.classList.contains('retro-mode')) this.startMusic();
            }
        }
    };

    // ---- 8-Bit Mode Toggle ----
    let retroMode = false;

    function initRetroMode() {
        const btn = document.getElementById('retro-toggle');
        const footerBtn = document.getElementById('footer-retro-btn');
        const muteBtn = document.getElementById('mute-toggle');

        function toggleRetro() {
            retroMode = !retroMode;
            document.body.classList.toggle('retro-mode', retroMode);
            if (btn) btn.classList.toggle('active', retroMode);
            if (footerBtn) footerBtn.classList.toggle('active', retroMode);

            retroAudio.init();

            if (retroMode) {
                if (muteBtn) muteBtn.classList.add('visible');
                retroAudio.playStartup();
                setTimeout(() => retroAudio.startMusic(), 600);
            } else {
                retroAudio.stopMusic();
                if (muteBtn) muteBtn.classList.remove('visible');
            }
        }

        if (btn) btn.addEventListener('click', toggleRetro);
        if (footerBtn) footerBtn.addEventListener('click', toggleRetro);

        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                retroAudio.toggleMute();
                muteBtn.classList.toggle('muted', retroAudio.muted);
            });
        }

        // Add retro sound triggers to interactive elements
        document.addEventListener('mouseover', (e) => {
            if (!retroMode) return;
            const target = e.target.closest('a, button, .service-card, .btn, .lang-sw-btn');
            if (target) retroAudio.playHover();
        });

        document.addEventListener('click', (e) => {
            if (!retroMode) return;
            const target = e.target.closest('.btn, button[type="submit"]');
            if (target) retroAudio.playClick();
        });
    }

    // ---- Initialize Everything ----
    function init() {
        initPortal();
        initBackground();
        initTiltCards();
        initCardFlip();
        initCookieBanner();
        initMobileMenu();
        initContactForm();
        initSmoothScroll();
        initLangToggle();
        initRetroMode();
    }

    // Wait for DOM and libraries
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
