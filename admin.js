/* =============================================
   DrZan Labs — Admin Panel Logic
   ============================================= */

const HASH_KEY  = 'drzan_admin_hash';
const CONTENT_KEY = 'drzan_content';

// ---- DEFAULT CONTENT (mirrors T object in main.js) ----
const DEFAULTS = {
    sk: {
        heroTagline: 'Kde technológia stretáva inteligenciu',
        heroDesc: 'IT podpora novej generácie. Automatizácia poháňaná umelou inteligenciou.',
        heroBtn1: 'Naše služby', heroBtn2: 'Kontaktujte nás',
        heroBtn1Link: '#services',
        heroBtn2Link: '#contact',
        servicesTag: '// SLUŽBY', servicesTitle: 'Čo pre vás môžeme urobiť',
        servicesSubtitle: 'Kombinujeme expertízu v IT s pokročilou AI automatizáciou',
        svc1Title: 'IT Support & Infraštruktúra',
        svc1Desc: 'Kompletná správa IT systémov, sietí a serverov. Monitoring 24/7, rýchla odozva, preventívna údržba.',
        svc1F1: 'Helpdesk & vzdialená podpora', svc1F2: 'Správa sietí a serverov', svc1F3: 'Kybernetická bezpečnosť', svc1F4: 'Cloud migrácia',
        svc1Back: 'Poskytujeme komplexnú správu vašej IT infraštruktúry — od monitoringu serverov a sietí až po okamžitú pomoc pri výpadkoch. Náš tím reaguje do 15 minút a zabezpečuje 99.9% dostupnosť systémov.',
        svc1BackB1: 'Monitoring 24/7 s automatickými alertami', svc1BackB2: 'SLA garantovaná odozva do 15 minút', svc1BackB3: 'Zálohovanie, obnova a disaster recovery', svc1BackCta: 'Mám záujem',
        svc2Title: 'AI Automatizácia',
        svc2Desc: 'Inteligentné workflow automatizácie, chatboty, a AI riešenia šité na mieru pre váš biznis.',
        svc2F1: 'AI chatboty & asistenti', svc2F2: 'Automatizácia procesov', svc2F3: 'Dátová analytika s AI', svc2F4: 'Integrácia LLM modelov',
        svc2Back: 'Implementujeme AI riešenia, ktoré nahradia opakujúce sa manuálne úlohy. Chatboty, automatizované reporty, prediktívna analytika — všetko na mieru vášmu procesu.',
        svc2BackB1: 'Ušetrí až 70% času na rutinných úlohách', svc2BackB2: 'Integrácia s CRM, ERP a existujúcimi systémami', svc2BackB3: 'Kontinuálne zlepšovanie cez ML feedback', svc2BackCta: 'Mám záujem',
        svc3Title: 'Weby & E-shopy',
        svc3Desc: 'Tvorba reprezentatívnych webových stránok a e-shopov. Moderný dizajn, rýchle načítanie, optimalizácia pre konverzie.',
        svc3F1: 'Prezentačné weby na mieru', svc3F2: 'E-shopy & online obchody', svc3F3: 'SEO & výkonnostná optimalizácia', svc3F4: 'Správa & údržba webov',
        svc3Back: 'Navrhujeme a vyvíjame weby a e-shopy, ktoré konvertujú návštevníkov na zákazníkov. Dôraz na rýchlosť, SEO a mobilnú optimalizáciu.',
        svc3BackB1: 'Priemerný PageSpeed skóre 95+', svc3BackB2: 'Responzívny dizajn pre všetky zariadenia', svc3BackB3: 'Vlastný CMS, jednoduchá správa obsahu', svc3BackCta: 'Mám záujem',
        svc4Title: 'Konzultácie & Stratégia',
        svc4Desc: 'Strategické poradenstvo v oblasti IT a digitálnej transformácie. Navrhujeme riešenia šité na mieru vašim cieľom.',
        svc4F1: 'IT audit & analýza potrieb', svc4F2: 'Digitálna transformácia', svc4F3: 'Technologická roadmapa', svc4F4: 'Optimalizácia nákladov',
        svc4Back: 'Ponúkame hĺbkovú analýzu vašich IT procesov a tvorbu konkrétnej technologickej roadmapy. Pomáhame firmám optimalizovať náklady a prejsť digitálnou transformáciou.',
        svc4BackB1: 'IT audit + akčný plán do 5 pracovných dní', svc4BackB2: 'Nezávislé poradenstvo bez konfliktu záujmov', svc4BackB3: 'Merateľné KPIs pre každý krok transformácie', svc4BackCta: 'Mám záujem',
        aboutTitle: 'Technológia, ktorá pracuje <span class="gold">pre vás</span>',
        aboutP1: 'DrZan Labs je technologická firma zameraná na poskytovanie špičkového IT supportu a implementáciu AI automatizácie. Veríme, že správna technológia dokáže transformovať akýkoľvek biznis.',
        aboutP2: 'Naša misia je jednoduchá: zbaviť vás technických starostí a dať vám nástroje, ktoré vám dajú konkurenčnú výhodu.',
        aboutF1Title: 'Rýchla odozva', aboutF1Desc: 'Priemerný čas reakcie pod 15 minút',
        aboutF2Title: 'Bezpečnosť', aboutF2Desc: 'Kybernetická ochrana na enterprise úrovni',
        aboutF3Title: 'AI-First prístup', aboutF3Desc: 'Automatizácia ako základ, nie doplnok',
        statLabel1: 'Uptime garantovaný', statLabel2: 'Priemerná odozva', statLabel3: 'Vyriešených ticketov', statLabel4: 'AI automatizácií',
        offerTitle: 'IT podpora <span class="gold">priamo u vás doma</span>',
        offerDesc: 'Nefunguje vám počítač, internet alebo tlačiareň? Neviete si rady s nastavením? Prídeme priamo k vám domov a vyriešime to na mieste.',
        offerF1: 'Diagnostika a oprava PC / notebooku', offerF2: 'Nastavenie Wi-Fi, routera a siete',
        offerF3: 'Inštalácia softvéru a antivírusu', offerF4: 'Zálohovanie dát a obnova systému',
        offerF5: 'Poradenstvo pri kúpe nového zariadenia',
        offerNote: 'Dostupnosť: Bratislava a okolie',
        offerPriceLabel: 'Výjazd už od',
        offerPriceVal: '25 €',
        offerBtn: 'Objednať výjazd',
        pricingRow1Price: '60 €', pricingRow2Price: '40 €', pricingRowTransportPrice: 'od 25 €',
        pricingRow3Price: '25 €', pricingRow4Price: '50 €', pricingDiscountValue: '−50%',
        pricingDiscountNote: 'na všetko okrem dopravy',
        aboutTag: '// O NÁS',
        offerTag: '// ŠPECIÁLNA PONUKA',
        offerBadge: 'PRE DOMÁCNOSTI',
        contactTag: '// KONTAKT',
        contactEmail: 'Email',
        contactLocation: 'Lokácia',
        formName: 'Meno', formNamePh: 'Vaše meno',
        formEmail: 'Email', formEmailPh: 'email@priklad.sk',
        formService: 'Služba', formServiceDefault: 'Vyberte službu',
        formMessage: 'Správa', formMessagePh: 'Popíšte váš projekt alebo otázku...',
        formSubmit: 'Odoslať správu',
        navCtaText: 'Kontakt',
        scrollText: 'Scroll',
        contactTitle: 'Poďme spolupracovať',
        contactDesc: 'Máte otázku alebo projekt? Ozvite sa nám a spoločne nájdeme riešenie.',
        contactLocationVal: 'Slovensko',
        contactEmailVal: 'info@drzanlabs.com',
        footerCopy: '&copy; 2026 DrZan Labs. Všetky práva vyhradené.',
    },
    en: {
        heroTagline: 'Where technology meets intelligence',
        heroDesc: 'Next-generation IT support. Automation powered by artificial intelligence.',
        heroBtn1: 'Our services', heroBtn2: 'Contact us',
        heroBtn1Link: '#services',
        heroBtn2Link: '#contact',
        servicesTag: '// SERVICES', servicesTitle: 'What we can do for you',
        servicesSubtitle: 'We combine IT expertise with advanced AI automation',
        svc1Title: 'IT Support & Infrastructure',
        svc1Desc: 'Complete management of IT systems, networks and servers. 24/7 monitoring, fast response, preventive maintenance.',
        svc1F1: 'Helpdesk & remote support', svc1F2: 'Network & server management', svc1F3: 'Cybersecurity', svc1F4: 'Cloud migration',
        svc1Back: 'We provide comprehensive management of your IT infrastructure — from server and network monitoring to instant help during outages. Our team responds within 15 minutes and ensures 99.9% system uptime.',
        svc1BackB1: '24/7 monitoring with automated alerts', svc1BackB2: 'SLA-guaranteed response within 15 minutes', svc1BackB3: 'Backup, recovery and disaster recovery', svc1BackCta: "I'm interested",
        svc2Title: 'AI Automation',
        svc2Desc: 'Intelligent workflow automation, chatbots, and custom AI solutions for your business.',
        svc2F1: 'AI chatbots & assistants', svc2F2: 'Process automation', svc2F3: 'Data analytics with AI', svc2F4: 'LLM model integration',
        svc2Back: 'We implement AI solutions that replace repetitive manual tasks. Chatbots, automated reports, predictive analytics — all tailored to your process.',
        svc2BackB1: 'Saves up to 70% time on routine tasks', svc2BackB2: 'Integration with existing systems (CRM, ERP)', svc2BackB3: 'Continuous improvement via ML feedback', svc2BackCta: "I'm interested",
        svc3Title: 'Websites & E-shops',
        svc3Desc: 'Creating professional websites and e-shops. Modern design, fast loading, conversion optimization.',
        svc3F1: 'Custom presentation websites', svc3F2: 'E-shops & online stores', svc3F3: 'SEO & performance optimization', svc3F4: 'Website management & maintenance',
        svc3Back: 'We design and develop websites and e-shops that convert visitors into customers. Focus on speed, SEO and mobile optimization.',
        svc3BackB1: 'Average PageSpeed score 95+', svc3BackB2: 'Responsive design for all devices', svc3BackB3: 'Custom CMS, easy content management', svc3BackCta: "I'm interested",
        svc4Title: 'Consulting & Strategy',
        svc4Desc: 'Strategic consulting in IT and digital transformation. We design solutions tailored to your goals.',
        svc4F1: 'IT audit & needs analysis', svc4F2: 'Digital transformation', svc4F3: 'Technology roadmap', svc4F4: 'Cost optimization',
        svc4Back: 'We offer in-depth analysis of your IT processes and a concrete technology roadmap. We help companies optimize costs and navigate digital transformation.',
        svc4BackB1: 'IT audit + action plan within 5 business days', svc4BackB2: 'Independent advice without conflict of interest', svc4BackB3: 'Measurable KPIs for every transformation step', svc4BackCta: "I'm interested",
        aboutTitle: 'Technology that works <span class="gold">for you</span>',
        aboutP1: 'DrZan Labs is a technology company focused on providing top-tier IT support and implementing AI automation. We believe the right technology can transform any business.',
        aboutP2: 'Our mission is simple: free you from technical worries and give you tools that provide a competitive advantage.',
        aboutF1Title: 'Fast response', aboutF1Desc: 'Average response time under 15 minutes',
        aboutF2Title: 'Security', aboutF2Desc: 'Enterprise-level cybersecurity protection',
        aboutF3Title: 'AI-First approach', aboutF3Desc: 'Automation as a foundation, not an add-on',
        statLabel1: 'Guaranteed uptime', statLabel2: 'Average response', statLabel3: 'Resolved tickets', statLabel4: 'AI automations',
        offerTitle: 'IT support <span class="gold">right at your home</span>',
        offerDesc: "Computer, internet or printer not working? Need help with setup? We come directly to your home and fix it on the spot.",
        offerF1: 'PC / laptop diagnostics and repair', offerF2: 'Wi-Fi, router and network setup',
        offerF3: 'Software and antivirus installation', offerF4: 'Data backup and system recovery',
        offerF5: 'Advice on purchasing new devices',
        offerNote: 'Availability: Bratislava and surroundings',
        offerPriceLabel: 'On-site visit from',
        offerPriceVal: '25 €',
        offerBtn: 'Book a visit',
        pricingRow1Price: '60 €', pricingRow2Price: '40 €', pricingRowTransportPrice: 'from 25 €',
        pricingRow3Price: '25 €', pricingRow4Price: '50 €', pricingDiscountValue: '−50%',
        pricingDiscountNote: 'on everything except transport',
        aboutTag: '// ABOUT US',
        offerTag: '// SPECIAL OFFER',
        offerBadge: 'FOR HOUSEHOLDS',
        contactTag: '// CONTACT',
        contactEmail: 'Email',
        contactLocation: 'Location',
        formName: 'Name', formNamePh: 'Your name',
        formEmail: 'Email', formEmailPh: 'email@example.com',
        formService: 'Service', formServiceDefault: 'Select a service',
        formMessage: 'Message', formMessagePh: 'Describe your project or question...',
        formSubmit: 'Send message',
        navCtaText: 'Contact',
        scrollText: 'Scroll',
        contactTitle: "Let's collaborate",
        contactDesc: 'Have a question or project? Get in touch and we will find a solution together.',
        contactLocationVal: 'Slovakia',
        contactEmailVal: 'info@drzanlabs.com',
        footerCopy: '&copy; 2026 DrZan Labs. All rights reserved.',
    }
};

// ---- SECTION DEFINITIONS ----
const SECTIONS = [
    {
        id: 'hero', icon: '🎯', label: 'Hero sekcia',
        desc: 'Hlavný nadpis, popis a tlačidlá na úvodnej obrazovke.',
        fields: [
            { key: 'heroTagline', label: 'Tagline (podnadpis)', type: 'input' },
            { key: 'heroDesc', label: 'Popis', type: 'textarea' },
            { row: [
                { key: 'heroBtn1', label: 'Tlačidlo 1 – Text', type: 'input' },
                { key: 'heroBtn1Link', label: 'Tlačidlo 1 – Link', type: 'input' },
            ]},
            { row: [
                { key: 'heroBtn2', label: 'Tlačidlo 2 – Text', type: 'input' },
                { key: 'heroBtn2Link', label: 'Tlačidlo 2 – Link', type: 'input' },
            ]},
            { key: 'scrollText', label: 'Scroll indikátor text', type: 'input' },
        ]
    },
    {
        id: 'nav', icon: '🧭', label: 'Navigácia',
        desc: 'Texty v navigačnom menu.',
        fields: [
            { row: [
                { key: 'navServices', label: 'Nav – Služby', type: 'input' },
                { key: 'navAbout', label: 'Nav – O nás', type: 'input' },
            ]},
            { row: [
                { key: 'navContact', label: 'Nav – Kontakt', type: 'input' },
                { key: 'navCtaText', label: 'Nav – CTA tlačidlo', type: 'input' },
            ]},
        ]
    },
    {
        id: 'svc', icon: '⚡', label: 'Služby',
        desc: 'Nadpisy a popisy všetkých 4 služieb (predná aj zadná strana karty).',
        subsections: [
            {
                title: 'Hlavička sekcie',
                fields: [
                    { key: 'servicesTag', label: 'Tag (// SLUŽBY)', type: 'input' },
                    { key: 'servicesTitle', label: 'Nadpis sekcie', type: 'input' },
                    { key: 'servicesSubtitle', label: 'Podnadpis', type: 'input' },
                ]
            },
            {
                title: '1. IT Support & Infraštruktúra',
                fields: [
                    { key: 'svc1Title', label: 'Názov', type: 'input' },
                    { key: 'svc1Desc', label: 'Krátky popis (predná strana)', type: 'textarea' },
                    { row: [{ key: 'svc1F1', label: 'Feature 1', type: 'input' }, { key: 'svc1F2', label: 'Feature 2', type: 'input' }] },
                    { row: [{ key: 'svc1F3', label: 'Feature 3', type: 'input' }, { key: 'svc1F4', label: 'Feature 4', type: 'input' }] },
                    { key: 'svc1Back', label: 'Dlhší popis (zadná strana)', type: 'textarea' },
                    { row: [{ key: 'svc1BackB1', label: 'Bod 1', type: 'input' }, { key: 'svc1BackB2', label: 'Bod 2', type: 'input' }] },
                    { row: [{ key: 'svc1BackB3', label: 'Bod 3', type: 'input' }, { key: 'svc1BackCta', label: 'CTA tlačidlo text', type: 'input' }] },
                ]
            },
            {
                title: '2. AI Automatizácia',
                fields: [
                    { key: 'svc2Title', label: 'Názov', type: 'input' },
                    { key: 'svc2Desc', label: 'Krátky popis (predná strana)', type: 'textarea' },
                    { row: [{ key: 'svc2F1', label: 'Feature 1', type: 'input' }, { key: 'svc2F2', label: 'Feature 2', type: 'input' }] },
                    { row: [{ key: 'svc2F3', label: 'Feature 3', type: 'input' }, { key: 'svc2F4', label: 'Feature 4', type: 'input' }] },
                    { key: 'svc2Back', label: 'Dlhší popis (zadná strana)', type: 'textarea' },
                    { row: [{ key: 'svc2BackB1', label: 'Bod 1', type: 'input' }, { key: 'svc2BackB2', label: 'Bod 2', type: 'input' }] },
                    { row: [{ key: 'svc2BackB3', label: 'Bod 3', type: 'input' }, { key: 'svc2BackCta', label: 'CTA tlačidlo text', type: 'input' }] },
                ]
            },
            {
                title: '3. Weby & E-shopy',
                fields: [
                    { key: 'svc3Title', label: 'Názov', type: 'input' },
                    { key: 'svc3Desc', label: 'Krátky popis (predná strana)', type: 'textarea' },
                    { row: [{ key: 'svc3F1', label: 'Feature 1', type: 'input' }, { key: 'svc3F2', label: 'Feature 2', type: 'input' }] },
                    { row: [{ key: 'svc3F3', label: 'Feature 3', type: 'input' }, { key: 'svc3F4', label: 'Feature 4', type: 'input' }] },
                    { key: 'svc3Back', label: 'Dlhší popis (zadná strana)', type: 'textarea' },
                    { row: [{ key: 'svc3BackB1', label: 'Bod 1', type: 'input' }, { key: 'svc3BackB2', label: 'Bod 2', type: 'input' }] },
                    { row: [{ key: 'svc3BackB3', label: 'Bod 3', type: 'input' }, { key: 'svc3BackCta', label: 'CTA tlačidlo text', type: 'input' }] },
                ]
            },
            {
                title: '4. Konzultácie & Stratégia',
                fields: [
                    { key: 'svc4Title', label: 'Názov', type: 'input' },
                    { key: 'svc4Desc', label: 'Krátky popis (predná strana)', type: 'textarea' },
                    { row: [{ key: 'svc4F1', label: 'Feature 1', type: 'input' }, { key: 'svc4F2', label: 'Feature 2', type: 'input' }] },
                    { row: [{ key: 'svc4F3', label: 'Feature 3', type: 'input' }, { key: 'svc4F4', label: 'Feature 4', type: 'input' }] },
                    { key: 'svc4Back', label: 'Dlhší popis (zadná strana)', type: 'textarea' },
                    { row: [{ key: 'svc4BackB1', label: 'Bod 1', type: 'input' }, { key: 'svc4BackB2', label: 'Bod 2', type: 'input' }] },
                    { row: [{ key: 'svc4BackB3', label: 'Bod 3', type: 'input' }, { key: 'svc4BackCta', label: 'CTA tlačidlo text', type: 'input' }] },
                ]
            },
        ]
    },
    {
        id: 'about', icon: '🏢', label: 'O nás',
        desc: 'Sekcia o firme, hodnoty a štatistiky.',
        fields: [
            { key: 'aboutTag', label: 'Tag (// O NÁS)', type: 'input' },
            { key: 'aboutTitle', label: 'Nadpis', type: 'input', html: true },
            { key: 'aboutP1', label: 'Odsek 1', type: 'textarea' },
            { key: 'aboutP2', label: 'Odsek 2', type: 'textarea' },
            { row: [{ key: 'aboutF1Title', label: 'Hodnota 1 – Názov', type: 'input' }, { key: 'aboutF1Desc', label: 'Hodnota 1 – Popis', type: 'input' }] },
            { row: [{ key: 'aboutF2Title', label: 'Hodnota 2 – Názov', type: 'input' }, { key: 'aboutF2Desc', label: 'Hodnota 2 – Popis', type: 'input' }] },
            { row: [{ key: 'aboutF3Title', label: 'Hodnota 3 – Názov', type: 'input' }, { key: 'aboutF3Desc', label: 'Hodnota 3 – Popis', type: 'input' }] },
            { row: [{ key: 'statLabel1', label: 'Štat 1 – Popis', type: 'input' }, { key: 'statLabel2', label: 'Štat 2 – Popis', type: 'input' }] },
            { row: [{ key: 'statLabel3', label: 'Štat 3 – Popis', type: 'input' }, { key: 'statLabel4', label: 'Štat 4 – Popis', type: 'input' }] },
        ]
    },
    {
        id: 'offer', icon: '🏠', label: 'Ponuka & Cenník',
        desc: 'Špeciálna ponuka IT podpora pre domácnosti a kompletný cenník.',
        subsections: [
            {
                title: 'Predná strana – obsah',
                fields: [
                    { key: 'offerTag', label: 'Tag (// ŠPECIÁLNA PONUKA)', type: 'input' },
                    { key: 'offerBadge', label: 'Badge (PRE DOMÁCNOSTI)', type: 'input' },
                    { key: 'offerTitle', label: 'Nadpis', type: 'input', html: true },
                    { key: 'offerDesc', label: 'Popis', type: 'textarea' },
                    { key: 'offerF1', label: 'Feature 1', type: 'input' },
                    { key: 'offerF2', label: 'Feature 2', type: 'input' },
                    { key: 'offerF3', label: 'Feature 3', type: 'input' },
                    { key: 'offerF4', label: 'Feature 4', type: 'input' },
                    { key: 'offerF5', label: 'Feature 5', type: 'input' },
                    { row: [{ key: 'offerPriceLabel', label: 'Cenový label ("Výjazd už od")', type: 'input' }, { key: 'offerPriceVal', label: 'Cena na prednej strane', type: 'input' }] },
                    { row: [{ key: 'offerBtn', label: 'Tlačidlo text', type: 'input' }, { key: 'offerNote', label: 'Poznámka (dostupnosť)', type: 'input' }] },
                ]
            },
            {
                title: 'Cenník – Výjazd k zákazníkovi',
                price: true,
                fields: [
                    { key: 'pricingRow1Price', label: '1. hodina (aj začatá)', type: 'input' },
                    { key: 'pricingRow2Price', label: '2. hodina', type: 'input' },
                    { key: 'pricingRowTransportPrice', label: 'Doprava', type: 'input' },
                ]
            },
            {
                title: 'Cenník – Vzdialená podpora',
                price: true,
                fields: [
                    { key: 'pricingRow3Price', label: 'Prvá pol hodina', type: 'input' },
                    { key: 'pricingRow4Price', label: 'Celá hodina', type: 'input' },
                ]
            },
            {
                title: 'Dôchodcovská zľava',
                price: true,
                fields: [
                    { key: 'pricingDiscountValue', label: 'Výška zľavy', type: 'input' },
                    { key: 'pricingDiscountNote', label: 'Poznámka k zľave', type: 'input' },
                ]
            },
        ]
    },
    {
        id: 'contact', icon: '✉️', label: 'Kontakt & Formulár',
        desc: 'Texty v kontaktnej sekcii a formulár.',
        subsections: [
            {
                title: 'Kontaktná sekcia',
                fields: [
                    { key: 'contactTag', label: 'Tag (// KONTAKT)', type: 'input' },
                    { key: 'contactTitle', label: 'Nadpis', type: 'input' },
                    { key: 'contactDesc', label: 'Popis', type: 'textarea' },
                    { row: [{ key: 'contactEmail', label: 'Emailový label', type: 'input' }, { key: 'contactEmailVal', label: 'Email adresa (aj link)', type: 'input' }] },
                    { row: [{ key: 'contactLocation', label: 'Lokácia label', type: 'input' }, { key: 'contactLocationVal', label: 'Lokácia hodnota', type: 'input' }] },
                ]
            },
            {
                title: 'Kontaktný formulár',
                fields: [
                    { row: [{ key: 'formName', label: 'Pole Meno – label', type: 'input' }, { key: 'formNamePh', label: 'Pole Meno – placeholder', type: 'input' }] },
                    { row: [{ key: 'formEmail', label: 'Pole Email – label', type: 'input' }, { key: 'formEmailPh', label: 'Pole Email – placeholder', type: 'input' }] },
                    { row: [{ key: 'formService', label: 'Pole Služba – label', type: 'input' }, { key: 'formServiceDefault', label: 'Pole Služba – default', type: 'input' }] },
                    { row: [{ key: 'formMessage', label: 'Pole Správa – label', type: 'input' }, { key: 'formMessagePh', label: 'Pole Správa – placeholder', type: 'input' }] },
                    { key: 'formSubmit', label: 'Odoslať – text tlačidla', type: 'input' },
                ]
            },
            {
                title: 'Footer',
                fields: [
                    { key: 'footerCopy', label: 'Copyright text', type: 'input', html: true },
                ]
            },
        ]
    },
];

// ---- STATE ----
let currentLang = 'sk';
let savedContent = {};

function loadSaved() {
    try { savedContent = JSON.parse(localStorage.getItem(CONTENT_KEY) || '{}'); } catch(e) { savedContent = {}; }
}

function getVal(key) {
    return (savedContent[currentLang] && savedContent[currentLang][key] != null)
        ? savedContent[currentLang][key]
        : DEFAULTS[currentLang][key] || '';
}

// ---- CRYPTO ----
async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
}

// ---- AUTH ----
async function init() {
    loadSaved();
    const hash = localStorage.getItem(HASH_KEY);
    if (!hash) {
        document.getElementById('setup-view').style.display = 'block';
        document.getElementById('login-view').style.display = 'none';
    } else {
        document.getElementById('setup-view').style.display = 'none';
        document.getElementById('login-view').style.display = 'block';
    }

    // Setup
    document.getElementById('setup-btn').addEventListener('click', async () => {
        const pw  = document.getElementById('setup-pw').value;
        const pw2 = document.getElementById('setup-pw2').value;
        const err = document.getElementById('setup-error');
        if (pw.length < 6) { err.textContent = 'Heslo musí mať aspoň 6 znakov.'; return; }
        if (pw !== pw2)    { err.textContent = 'Heslá sa nezhodujú.'; return; }
        localStorage.setItem(HASH_KEY, await sha256(pw));
        showAdmin();
    });
    document.getElementById('setup-pw2').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('setup-btn').click(); });

    // Login
    document.getElementById('login-btn').addEventListener('click', async () => {
        const pw  = document.getElementById('login-pw').value;
        const err = document.getElementById('login-error');
        const stored = localStorage.getItem(HASH_KEY);
        if ((await sha256(pw)) === stored) {
            showAdmin();
        } else {
            err.textContent = 'Nesprávne heslo.';
            document.getElementById('login-pw').value = '';
        }
    });
    document.getElementById('login-pw').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('login-btn').click(); });
}

function showAdmin() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'flex';
    buildSidebar();
    showSection(SECTIONS[0].id);

    // Lang switch
    document.querySelectorAll('.lang-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            saveCurrentSection();
            currentLang = btn.dataset.lang;
            document.querySelectorAll('.lang-tab').forEach(b => b.classList.toggle('active', b === btn));
            refreshCurrentSection();
        });
    });

    // Save all
    document.getElementById('save-all-btn').addEventListener('click', saveAll);

    // Preview
    document.getElementById('preview-btn').addEventListener('click', () => window.open('index.html', '_blank'));

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        if (confirm('Odhlásiť sa?')) location.reload();
    });
}

// ---- SIDEBAR ----
function buildSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    SECTIONS.forEach(sec => {
        const a = document.createElement('a');
        a.className = 'sidebar-link';
        a.dataset.section = sec.id;
        a.innerHTML = `<span class="link-icon">${sec.icon}</span>${sec.label}`;
        a.addEventListener('click', () => { saveCurrentSection(); showSection(sec.id); });
        sidebar.appendChild(a);
    });
}

let _currentSectionId = null;

function showSection(id) {
    _currentSectionId = id;
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.toggle('active', l.dataset.section === id));
    const main = document.getElementById('admin-main');
    main.innerHTML = '';
    const sec = SECTIONS.find(s => s.id === id);
    if (!sec) return;

    const div = document.createElement('div');
    div.className = 'admin-section visible';
    div.id = 'sec-' + id;

    div.innerHTML = `<h2 class="section-title">${sec.icon} ${sec.label}</h2>
        <p class="section-desc">${sec.desc || ''}</p>`;

    if (sec.subsections) {
        sec.subsections.forEach(sub => {
            const hr = document.createElement('hr');
            hr.className = 'section-divider';
            div.appendChild(hr);
            const st = document.createElement('h3');
            st.className = 'subsection-title';
            st.textContent = sub.title;
            div.appendChild(st);
            renderFields(div, sub.fields, sub.price);
        });
    } else if (sec.fields) {
        const hr = document.createElement('hr');
        hr.className = 'section-divider';
        div.appendChild(hr);
        renderFields(div, sec.fields);
    }

    // Reset button
    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-btn';
    resetBtn.innerHTML = '↩ Obnoviť predvolené hodnoty pre túto sekciu';
    resetBtn.addEventListener('click', () => resetSection(sec));
    div.appendChild(resetBtn);

    main.appendChild(div);
}

function renderFields(container, fields, isPrice) {
    fields.forEach(f => {
        if (f.row) {
            const row = document.createElement('div');
            row.className = 'field-row';
            f.row.forEach(rf => row.appendChild(buildField(rf, isPrice)));
            container.appendChild(row);
        } else {
            container.appendChild(buildField(f, isPrice));
        }
    });
}

function buildField(f, isPrice) {
    const wrapper = document.createElement('div');
    wrapper.className = 'field-group';

    const label = document.createElement('label');
    label.className = 'field-label';
    label.htmlFor = 'field-' + f.key;
    label.textContent = f.key === 'footerCopy' ? f.label : f.label;
    if (f.html) {
        const tag = document.createElement('span');
        tag.className = 'html-tag';
        tag.textContent = 'HTML povolené';
        label.appendChild(tag);
    }
    wrapper.appendChild(label);

    const val = getVal(f.key);

    if (f.type === 'textarea') {
        const ta = document.createElement('textarea');
        ta.className = 'field-textarea';
        ta.id = 'field-' + f.key;
        ta.dataset.key = f.key;
        ta.value = val;
        markIfChanged(ta, f.key);
        ta.addEventListener('input', () => markIfChanged(ta, f.key));
        wrapper.appendChild(ta);
    } else {
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.className = 'field-input';
        inp.id = 'field-' + f.key;
        inp.dataset.key = f.key;
        inp.value = val;
        if (isPrice) {
            inp.style.fontWeight = '700';
            inp.style.color = 'var(--gold)';
            inp.style.width = '140px';
        }
        markIfChanged(inp, f.key);
        inp.addEventListener('input', () => markIfChanged(inp, f.key));
        wrapper.appendChild(inp);
    }

    return wrapper;
}

function markIfChanged(el, key) {
    const def = DEFAULTS[currentLang][key] || '';
    const saved = (savedContent[currentLang] && savedContent[currentLang][key] != null)
        ? savedContent[currentLang][key] : def;
    el.classList.toggle('changed', el.value !== def);
}

// ---- SAVE ----
function saveCurrentSection() {
    if (!_currentSectionId) return;
    const fields = document.querySelectorAll('[data-key]');
    if (!savedContent[currentLang]) savedContent[currentLang] = {};
    fields.forEach(el => {
        const key = el.dataset.key;
        const val = el.value.trim();
        // Only save if different from default
        if (val !== (DEFAULTS[currentLang][key] || '')) {
            savedContent[currentLang][key] = val;
        } else {
            delete savedContent[currentLang][key];
        }
    });
}

function saveAll() {
    saveCurrentSection();
    localStorage.setItem(CONTENT_KEY, JSON.stringify(savedContent));
    const status = document.getElementById('save-status');
    status.textContent = '✓ Uložené';
    status.classList.add('visible');
    setTimeout(() => status.classList.remove('visible'), 2500);
    // Refresh fields to update "changed" markers
    if (_currentSectionId) showSection(_currentSectionId);
}

function refreshCurrentSection() {
    if (_currentSectionId) showSection(_currentSectionId);
}

function resetSection(sec) {
    if (!confirm(`Obnoviť predvolené hodnoty pre sekciu "${sec.label}"?`)) return;
    if (!savedContent[currentLang]) savedContent[currentLang] = {};

    function collectKeys(fields) {
        fields.forEach(f => {
            if (f.row) f.row.forEach(rf => delete savedContent[currentLang][rf.key]);
            else if (f.key) delete savedContent[currentLang][f.key];
        });
    }
    if (sec.subsections) sec.subsections.forEach(sub => collectKeys(sub.fields));
    else if (sec.fields) collectKeys(sec.fields);

    localStorage.setItem(CONTENT_KEY, JSON.stringify(savedContent));
    showSection(sec.id);
}

// ---- BOOT ----
init();
