'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import ProcessSection from './ProcessSection';
import BlogSection from './BlogSection';
import IntegrationSection from './IntegrationSection';


export default function AllSection() {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // ── 1. Load external scripts sequentially ──────────────────────────
    const scripts = [
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js',
    ];

    const loadScript = (src) =>
      new Promise((res) => {
        if (document.querySelector(`script[src="${src}"]`)) return res();
        const s = document.createElement('script');
        s.src = src;
        s.onload = res;
        document.body.appendChild(s);
      });

    const loadStyles = () => {
      const hrefs = [
        'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css',
      ];
      hrefs.forEach((href) => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const l = document.createElement('link');
          l.rel = 'stylesheet';
          l.href = href;
          document.head.appendChild(l);
        }
      });
    };

    const init = async () => {
      loadStyles();
      for (const src of scripts) await loadScript(src);

      const $ = window.jQuery;
      if (!$) return;

      // ── 2. WOW Animations ─────────────────────────────────────────────
      if (window.WOW) {
        new window.WOW({ live: false, offset: 100 }).init();
      }

      // ── 3. Counter Animation ──────────────────────────────────────────
      const animateCounter = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const step = 16;
        const steps = duration / step;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        }, step);
      };

      const observeCounters = () => {
        const counters = document.querySelectorAll('.counter-number');
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting && !e.target.dataset.animated) {
                e.target.dataset.animated = '1';
                animateCounter(e.target);
              }
            });
          },
          { threshold: 0.5 }
        );
        counters.forEach((c) => {
          const raw = c.textContent.trim();
          c.setAttribute('data-target', raw);
          c.textContent = '0';
          io.observe(c);
        });
      };
      observeCounters();

      // ── 4. Swiper – helper ────────────────────────────────────────────
      const initSwiper = (selector, opts) => {
        const el = document.querySelector(selector);
        if (!el || el.swiper) return;
        new window.Swiper(selector, opts);
      };

      // ── 5. Marquee Slider 1 (LTR) ─────────────────────────────────────
      initSwiper('.marquee-slider-ltr', {
        loop: true,
        slidesPerView: 'auto',
        speed: 6000,
        autoplay: { delay: 0, disableOnInteraction: false },
        spaceBetween: 30,
        allowTouchMove: false,
      });

      // ── 6. Marquee Slider 2 (RTL) ─────────────────────────────────────
      initSwiper('.marquee-slider-rtl', {
        loop: true,
        slidesPerView: 'auto',
        speed: 4000,
        autoplay: { delay: 0, disableOnInteraction: false },
        spaceBetween: 30,
        allowTouchMove: false,
        rtl: true,
      });

      // ── 7. Testimonials Slider ────────────────────────────────────────
      initSwiper('#testiSlide1', {
        loop: true,
        spaceBetween: 24,
        autoplay: { delay: 3500, disableOnInteraction: false },
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        },
      });

      // ── 8. Blog Slider ────────────────────────────────────────────────
      initSwiper('#blogSlider1', {
        loop: true,
        spaceBetween: 24,
        autoplay: { delay: 3000, disableOnInteraction: false },
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        },
      });

      // ── 9. Magnific Popup (video) ─────────────────────────────────────
      if ($.fn.magnificPopup) {
        $('.popup-video').magnificPopup({ type: 'iframe' });
      }

      // ── 10. Smooth scroll for anchor links ───────────────────────────
      $(document).on('click', 'a[href^="#"]', function (e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
          e.preventDefault();
          $('html,body').animate({ scrollTop: target.offset().top - 80 }, 600);
        }
      });

      // ── 11. Text split animation (simple fade-in per word) ───────────
      document.querySelectorAll('.text-anime-style-2, .text-anime-style-3').forEach((el) => {
        el.style.opacity = '1';
      });
    };

    init();
  }, []);

  // ── Data updated from PPT ──────────────────────────────────────────────

  const features = [
    { icon: 'service_1_1.svg', title: 'Real-Time Opportunity Detection', text: '24/7 monitoring across major DEXs to identify arbitrage opportunities instantly.' },
    { icon: 'service_1_2.svg', title: 'Cross-DEX Arbitrage Execution', text: 'Automated execution across multiple decentralized exchanges for optimal returns.' },
    { icon: 'service_1_3.svg', title: 'Low Risk Smart Execution', text: 'MEV-resistant execution with built-in risk management and protection.' },
    { icon: 'service_1_4.svg', title: 'DEXX Liquidity Layer', text: 'AI and high-frequency mechanisms providing continuous liquidity with tighter spreads.' },
    { icon: 'service_1_5.svg', title: 'DEXX MEV+ Arbitrage', text: 'High-frequency arbitrage transforming MEV value into structured, stable yield.' },
    { icon: 'service_1_1.svg', title: 'AI-Powered Intent Engine', text: 'Quantum-scale compute engine identifying trading opportunities every second.' },
  ];

  const processSteps = [
    { num: '01', title: 'Problem Framing', img: 'process_1_1.jpg', list: ['Proven Expertise', 'Client-Centric Approach', 'Cutting-Edge Technology', 'Innovative Solutions', 'User-Centric Design'] },
    { num: '02', title: 'Data Intelligence', img: 'process_1_2.jpg', list: ['Data readiness score', 'Risk & bias map', 'Build vs. buy recommendation', 'Innovative Solutions', 'User-Centric Design'] },
    { num: '03', title: 'Model Strategy', img: 'process_1_3.jpg', list: ['Accuracy vs. latency tradeoffs', 'Cost at scale', 'Interpretability & control', 'Innovative Solutions', 'User-Centric Design'] },
    { num: '04', title: 'Human-in-the-Loop', img: 'process_1_4.jpg', list: ['Accuracy vs. latency tradeoffs', 'Cost at scale', 'Cutting-Edge Technology', 'Innovative Solutions', 'User-Centric Design'] },
    { num: '05', title: 'Production', img: 'process_1_5.jpg', list: ['Model monitoring & alerts', 'Version control & rollback', 'Compliance & explainability layers', 'Innovative Solutions', 'User-Centric Design'] },
  ];

  const caseStudies = [
    { img: 'project_1_1.png', sub: 'Liquidity', title: 'DEXX Liquidity Layer', text: 'AI and high-frequency mechanisms continuously provide liquidity to DEXs for smoother execution and tighter spreads.', discount: 'Real-time liquidity' },
    { img: 'project_1_2.png', sub: 'MEV', title: 'DEXX MEV+ Arbitrage', text: 'High-frequency arbitrage transforming value captured by MEV bots into structured, stable yield for all participants.', discount: 'Stable yield generation' },
    { img: 'project_1_3.png', sub: 'Arbitrage', title: 'Cross-DEX Arbitrage', text: 'Automated execution across multiple DEXs capturing market inefficiencies with <1s execution speed.', discount: 'Blazing fast execution' },
    { img: 'project_1_4.png', sub: 'Settlement', title: 'Payment Settlement Layer', text: 'On-chain USDT leased to payment service providers generating real transaction fee income.', discount: 'Real yield infrastructure' },
  ];

  const counters = [
    { num: '100', suffix: 'M+', label: 'Registered Capital' },
    { num: '24', suffix: '/7', label: 'Live Opportunities' },
    { num: '1', suffix: 's', label: 'Execution Speed' },
    { num: '100', suffix: '%', label: 'On-Chain Transparent' },
  ];

  const integrations = [
    { icon: 'icon-1.png', title: 'Microsoft Team' },
    { icon: 'icon-2.png', title: 'ChatGPT' },
    { icon: 'icon-3.png', title: 'Ziper' },
    { icon: 'icon-4.png', title: 'Loom' },
  ];

  const pricingPlans = [
    { title: 'Explorer', subtitle: 'Entry to on-chain intelligence', price: '99.99', active: false, delay: '.2s', list: ['Basic opportunity detection', 'Standard execution', 'Weekly reports', 'Community support'] },
    { title: 'Pro Trader', subtitle: 'Advanced arbitrage execution', price: '299.99', active: true, delay: '.4s', list: ['Full MEV+ operations', 'Cross-DEX arbitrage', 'Priority execution <1s', 'Real-time analytics'] },
    { title: 'Institutional', subtitle: 'White-glove capital solutions', price: '1499.99', active: false, delay: '.6s', list: ['Custom strategy deployment', 'Direct settlement layer', 'Dedicated infrastructure', 'Revenue-share agreement'] },
  ];

  const testimonials = [
    { img: 'testi_1_1.png', text: 'XOXOFX has transformed how we approach on-chain arbitrage. The automated system captures opportunities we consistently miss.', name: 'Ava Chen', role: 'CEO, XOXOFX' },
    { img: 'testi_1_2.png', text: 'The DEXX engine delivers quantum-scale compute power for identifying trading opportunities every second.', name: 'Ethan Cole', role: 'CTO, XOXOFX' },
    { img: 'testi_1_3.png', text: 'Our mission is to make on-chain arbitrage intelligent, accessible, and unstoppable for traders worldwide.', name: 'Alex Morgan', role: 'CMO, XOXOFX' },
    { img: 'testi_1_1.png', text: 'Built natively on blockchain with real-time transparency. All data, all trades, all on-chain.', name: 'XOXOFX', role: 'OnChain Trading Platform' },
    { img: 'testi_1_2.png', text: 'From centralized exchanges to decentralized intelligence - the future of trading is on-chain.', name: 'Global Community', role: 'Decentralized Finance' },
  ];

  const blogs = [
    { img: 'blog_1_1.jpg', cat: 'Arbitrage', date: '12 Apr, 2025', comments: '8 Comments', title: 'Automated On-Chain Arbitrage: The Future of DeFi Trading' },
    { img: 'blog_1_2.jpg', cat: 'MEV', date: '05 Apr, 2025', comments: '12 Comments', title: 'Understanding MEV+ : High-Frequency Arbitrage for Structured Yield' },
    { img: 'blog_1_3.jpg', cat: 'Liquidity', date: '28 Mar, 2025', comments: '6 Comments', title: 'DEXX Liquidity Layer: AI-Powered Continuous Liquidity Provision' },
    { img: 'blog_1_4.jpg', cat: 'Settlement', date: '20 Mar, 2025', comments: '5 Comments', title: 'Payment Settlement Layer: Turning Idle Capital into Yield' },
    { img: 'blog_1_1.jpg', cat: 'Roadmap', date: '15 Mar, 2025', comments: '14 Comments', title: 'XOXOFX Market Development Plan for 2025-2026' },
    { img: 'blog_1_2.jpg', cat: 'Compliance', date: '10 Mar, 2025', comments: '9 Comments', title: 'U.S. FinCEN MSB Registration: Compliance-First Infrastructure' },
  ];

  const marqueeItems = [
    'Real-Time Opportunity Detection',
    'Cross-DEX Arbitrage',
    'Low Risk Smart Execution',
    'DEXX Liquidity Layer',
    'DEXX MEV+ Arbitrage',
    'AI Intent Engine',
    'Payment Settlement Layer',
    'On-Chain Transparency',
  ];

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <div className="th-hero-wrapper hero-1" id="hero">
        <div className="container-fluid p-0 pe-lg-4 ps-lg-4">
          <div className="row gy-4">
            <div className="col-xl-6">
              <div className="hero-style1">
                <span className="sub-title text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">
                  XOXOFX
                </span>
                <h1 className="hero-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">
                  Arbitrage. Automated. On-Chain. Profitable.
                </h1>
                <p className="hero-text wow fadeInUp" data-wow-delay=".4s">
                  The All-in-One Intelligent Arbitrage System for DeFi Markets. Built natively on blockchain with real-time transparency, high-performance execution, and non-custodial security.
                </p>
                <div className="wow fadeInUp" data-wow-delay=".6s">
                  <Link href="/" className="th-btn">
                    Launch App{' '}
                    <span className="icon">
                      <Image src="/assets/img/icon/arrow-right.svg" alt="" width={16} height={16} />
                    </span>
                  </Link>
                </div>
                <div className="discount-wrapp scroll-down wow fadeInUp add-phone-none" data-wow-delay=".8s">
                  <Link href="#about-sec" className="spin">
                    <div className="logo-img">
                      <Image src="/assets/img/logo-icon.svg" alt="" width={50} height={50} />
                    </div>
                  </Link> 
                </div>
              </div>

              {/* Hero Stats Cards */}
              <div className="row gy-4 justify-content-center">
                {[
                  { num: '24', suffix: '/7', label: 'Live Opportunities' },
                  { num: '1', suffix: 's', label: 'Execution Speed' },
                  { num: '100', suffix: '%', label: 'On-Chain Transparent' },
                ].map((card, index) => (
                  <div className="col-sm-6 col-6 col-md-4 wow fadeInUp" data-wow-delay={`${(index + 1) * 0.2}s`} key={index}>
                    <div className="hero-card bounce__anim">
                      <div className="media-body">
                        <h2 className="box-number">
                          <span className="counter-number">{card.num}</span>
                          {card.suffix}
                        </h2>
                        <p className="box-text">{card.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Video */}
            <div className="col-xl-6 wow fadeInRight" data-wow-delay=".3s">
              <div className="hero-video"> 
                 <Image src="/assets/images/home-banner2.png" alt="About" width={800} height={600} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ABOUT SECTION ===== */}
      <div className="about-area overflow-hidden space" id="about-sec">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-8 mb-30 mb-xl-0">
              <div className="title-area pe-xl-5">
                <span className="sub-title text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">Founded 2026</span>
                <h2 className="sec-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">
                  <span>One-Stop</span>{' '}
                  <span className="title">On-Chain Trading Platform</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row gy-4">
            <div className="col-lg-5 col-xxl-5 wow fadeInLeft" data-wow-delay=".2s">
              <div className="img-box1">
                <div className="img1 image scale">
                  <Image src="/assets/images/Capital-Migration-img.png" alt="About" width={500} height={400} />
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-xxl-6">
              <div className="ps-xxl-5">
                <p className="pe-xl-5 me-xl-5 mb-35 wow fadeInUp" data-wow-delay=".4s">
                  XOXOFX brings together global blockchain engineers and quantitative trading specialists, dedicated to building the next generation of trading infrastructure that bridges consumer finance and decentralized finance (DeFi). Our vision is to redefine global trading by bringing every market, every asset, and every strategy fully onchain.
                </p>
                <div className="checklist list-two-column about-checklist wow fadeInUp" data-wow-delay=".6s">
                  <ul>
                    {['OnChain First', 'Real-Time Transparency', 'Global Access', 'High Performance', 'Secure & Non-Custodial', 'AI-Powered Execution'].map(
                      (item, i) => (
                        <li className="wow fadeInUp" data-wow-delay={`${(i + 1) * 0.1}s`} key={i}>
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="btn-group mt-45 wow fadeInUp" data-wow-delay=".8s">
                  <Link href="#about" className="th-btn">
                    Learn More{' '}
                    <span className="icon">
                      <Image src="/assets/img/icon/arrow-right.svg" alt="" width={16} height={16} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-mockup jumpAni d-none d-xxl-block" data-top="25%" data-right="0%">
          <Image src="/assets/img/shape/element-1.png" alt="" width={100} height={100} />
        </div>
      </div>

      {/* ===== FEATURES SECTION ===== */}
      <section className="service-area position-relative overflow-hidden space" id="features-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="title-area text-center">
                <span className="sub-title style2 text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">Core Features</span>
                <h2 className="sec-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">The All-in-One Intelligent Arbitrage System</h2>
              </div>
            </div>
          </div>
          <div className="row gy-4 justify-content-center">
            {features.map((feature, index) => (
              <div className="col-md-6 col-xl-4 wow fadeInUp" data-wow-delay={`${(index % 3 + 1) * 0.2}s`} key={index}>
                <div className="service-card">
                  <div className="box-icon">
                    <Image src={`/assets/img/icon/${feature.icon}`} alt="icon" width={50} height={50} />
                  </div>
                  <div className="box-content">
                    <h3 className="box-title">
                      <Link href="/features">{feature.title}</Link>
                    </h3>
                    <p className="box-text">{feature.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  <ProcessSection />
      {/* ===== CASE STUDIES SECTION ===== */}
      <section className="project-area position-relative overflow-hidden space" id="case-studies-sec">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title style2 text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">Production Systems</span>
            <h2 className="sec-title style2 text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">Live Arbitrage Infrastructure</h2>
          </div>
          <div className="row gy-4 justify-content-center">
            {caseStudies.map((study, index) => (
              <div className="col-lg-6 wow fadeInUp" data-wow-delay={`${(index + 1) * 0.2}s`} key={index}>
                <div className="project-card">
                  <div className="box-img global-img">
                    <Image src={`/assets/img/project/${study.img}`} alt="" width={600} height={400} />
                  </div>
                  <div className="box-content">
                    <span className="box-sub">{study.sub}</span>
                    <h3 className="box-title">
                      <Link href="/">{study.title}</Link>
                    </h3>
                    <p className="box-text">{study.text}</p>
                    <span className="discount">{study.discount}</span>{' '}
                    <Link href="/" className="icon-btn">
                      <span className="icon">
                        <Image src="/assets/img/icon/arrow-right.svg" alt="" width={16} height={16} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-80 wow fadeInUp" data-wow-delay=".3s">
            <Link href="/" className="th-btn">
              View All Strategies{' '}
              <span className="icon">
                <Image src="/assets/img/icon/arrow-right.svg" alt="" width={16} height={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== COUNTER SECTION ===== */}
      <div className="overflow-hidden space">
        <div className="container">
          <div className="title-area text-center">
            <h2 className="sec-title style2 text-anime-style-3 wow fadeInUp" data-wow-delay=".1s">Trusted Infrastructure</h2>
            <p className="wow fadeInUp" data-wow-delay=".3s">
              U.S. FinCEN-regulated Money Services Business (MSB) with $100,000,000 registered capital
            </p>
          </div>
          <div className="counter-area bounce_animation">
            {counters.map((counter, index) => (
              <div className="counter-card_wrapp wow fadeInUp" data-wow-delay={`${(index + 1) * 0.15}s`} key={index}>
                <div className="counter-card bounce__anim">
                  <div className="media-body">
                    <h3 className="box-number">
                      {/* counter-number value is used by the JS counter animation */}
                      <span className="counter-number">{counter.num}</span>
                      {counter.suffix}
                    </h3>
                    <p className="box-text">{counter.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== MARQUEE SECTION ===== */}
      <div className="overflow-hidden space-top">
        {/* Row 1 — LTR */}
        <div className="marquee-wrap2 bg-theme2 pt-40 pb-40" style={{ overflow: 'hidden' }}>
          <div className="swiper marquee-slider-ltr" style={{ overflow: 'hidden' }}>
            <div className="swiper-wrapper" style={{ transitionTimingFunction: 'linear' }}>
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <div className="swiper-slide" style={{ width: 'auto' }} key={i}>
                  <div className="marquee-card" style={{ whiteSpace: 'nowrap', padding: '0 30px' }}>
                    <span>{item} /</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 — RTL */}
        <div className="marquee-wrap3 bg-theme pt-40 pb-40" style={{ overflow: 'hidden' }}>
          <div className="swiper marquee-slider-rtl" style={{ overflow: 'hidden' }}>
            <div className="swiper-wrapper" style={{ transitionTimingFunction: 'linear' }}>
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <div className="swiper-slide" style={{ width: 'auto' }} key={i}>
                  <div className="marquee-card style2 text-white" style={{ whiteSpace: 'nowrap', padding: '0 30px' }}>
                    <span>{item} /</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== FEATURES / BENEFITS SECTION ===== */}
      <div className="position-relative space overflow-hidden">
        <div className="container">
          <div className="row gy-4 gx-0 justify-content-end flex-row-reverse">
            <div className="col-lg-10 col-xl-8">
              <div className="ps-xl-5 ms-xxl-5">
                <div className="about-wrapper">
                  <div className="title-area">
                    <span className="sub-title text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">The Shift</span>
                    <h2 className="sec-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">
                      From Centralized <span className="d-block">to Decentralized Exchanges</span>
                    </h2>
                  </div>
                  <div className="about-wrapp">
                    <div>
                      <div className="checklist style2 wow fadeInUp" data-wow-delay=".6s">
                        <ul>
                          {['Transparency', 'Self-Custody', 'Permissionless Access', 'On-Chain Settlement', 'Global Accessibility', 'Non-Custodial'].map(
                            (item, i) => (
                              <li className="wow fadeInUp" data-wow-delay={`${(i + 1) * 0.1}s`} key={i}>
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="btn-group mt-60 wow fadeInUp" data-wow-delay=".8s">
                        <Link href="/" className="th-btn">
                          Join Ecosystem{' '}
                          <span className="icon">
                            <Image src="/assets/img/icon/arrow-right.svg" alt="" width={16} height={16} />
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div>
                      <div className="feature-img2 global-img wow fadeInRight" data-wow-delay=".4s">
                        <Image src="/assets/img/normal/feature_1_2.jpg" alt="" width={400} height={300} />
                      </div>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-xl-4 wow fadeInLeft" data-wow-delay=".3s">
              <div className="feature-img global-img">
                <div className="box-img">
                  <Image src="/assets/img/normal/feature_1_1.webp" alt="" width={400} height={500} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 <IntegrationSection/>

      {/* ===== PRICING SECTION ===== */}
      <section className="overflow-hidden space">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">$DCP Token</span>
            <h2 className="sec-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">Revenue-Backed Multi-Layer Asset</h2>
          </div>
          <div className="row gy-4 justify-content-center">
            {pricingPlans.map((plan, index) => (
              <div className="col-xl-4 col-xxl-3 col-md-6" key={index}>
                <div
                  className={`price-box th-ani wow fadeInUp${plan.active ? ' active' : ''}`}
                  data-wow-delay={plan.delay}
                >
                  <div className="box-wrapp">
                    <div className="box-icon">
                      <Image src="/assets/img/icon/star.svg" alt="" width={30} height={30} />
                    </div>
                    <div className="box-content">
                      <h3 className="box-title">{plan.title}</h3>
                      <p className="box-text">{plan.subtitle}</p>
                    </div>
                  </div>
                  <h4 className="box-price">
                    <span className="dollar">$</span>
                    {plan.price}
                    <span className="duration">/month</span>
                  </h4>
                  <div className="box-content">
                    <div className="available-list">
                      <h4 className="subtitle">Strategy Access</h4>
                      <ul>
                        {plan.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <Link href="/" className="th-btn black-border fw-btn add-hover">
                      Get Started{' '}
                      <span className="icon">
                        <Image src="/assets/img/icon/arrow-right.svg" alt="" width={16} height={16} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="position-relative overflow-hidden" id="testi-sec">
        <div className="container">
          <div className="row justify-content-lg-between justify-content-center align-items-center">
            <div className="col-lg-6">
              <div className="title-area text-center text-lg-start">
                <span className="sub-title text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">Leadership</span>
                <h2 className="sec-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">
                  Built by Industry Experts
                </h2>
              </div>
            </div>
            <div className="col-auto wow fadeInUp" data-wow-delay=".3s">
              <div className="sec-btn">
                <Link href="/testimonial" className="th-btn">
                  View Team{' '}
                  <span className="icon">
                    <Image src="/assets/img/icon/arrow-right.svg" alt="" width={16} height={16} />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Swiper Testimonial Slider */}
          <div className="slider-wrap">
            <div className="swiper th-slider has-shadow" id="testiSlide1">
              <div className="swiper-wrapper">
                {testimonials.map((testi, index) => (
                  <div className="swiper-slide" key={index}>
                    <div className="testi-card">
                      <div className="box-wrapp">
                        <span className="rating">
                          {[...Array(5)].map((_, i) => (
                           <i className="fa-solid fa-star" key={i}></i>
                          ))}
                        </span>
                        <div className="box-quote">
                          <Image src="/assets/img/icon/quote.svg" alt="" width={30} height={30} />
                        </div>
                      </div>
                      <p className="box-text">{testi.text}</p>
                      <div className="box-wrapp">
                        <div className="box-profile">
                          <div className="box-author">
                            <Image src={`/assets/img/testimonial/${testi.img}`} alt="Avatar" width={50} height={50} />
                          </div>
                          <div className="box-info">
                            <h3 className="box-title">{testi.name}</h3>
                            <span className="box-desig">{testi.role}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Swiper navigation dots */}
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
      </section>
<BlogSection />
    
    </>
  );
}