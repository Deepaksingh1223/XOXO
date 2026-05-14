'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

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

  // ── Data ──────────────────────────────────────────────────────────────

  const features = [
    { icon: 'service_1_1.svg', title: 'Advanced Neural Networks', text: 'State-of-the-art deep learning models trained on billions of data points for unmatched accuracy.' },
    { icon: 'service_1_2.svg', title: 'Lightning Fast Processing', text: 'Real-time inference with sub-millisecond latency powered by optimized GPU acceleration.' },
    { icon: 'service_1_3.svg', title: 'Enterprise Security', text: 'Bank-grade encryption and compliance with SOC 2, GDPR, and HIPAA standards.' },
    { icon: 'service_1_4.svg', title: 'Predictive Analytics', text: 'Forecast trends and outcomes with AI-powered predictive models and insights.' },
    { icon: 'service_1_5.svg', title: 'AutoML Capabilities', text: 'Automated model training and optimization without requiring data science expertise.' },
    { icon: 'service_1_1.svg', title: 'Actionable Insights', text: 'Transform complex data into clear visualizations and actionable business intelligence.' },
  ];

  const processSteps = [
    { num: '01', title: 'Problem Framing', img: 'process_1_1.jpg', list: ['Proven Expertise', 'Client-Centric Approach', 'Cutting-Edge Technology', 'Innovative Solutions', 'User-Centric Design'] },
    { num: '02', title: 'Data Intelligence', img: 'process_1_2.jpg', list: ['Data readiness score', 'Risk & bias map', 'Build vs. buy recommendation', 'Innovative Solutions', 'User-Centric Design'] },
    { num: '03', title: 'Model Strategy', img: 'process_1_3.jpg', list: ['Accuracy vs. latency tradeoffs', 'Cost at scale', 'Interpretability & control', 'Innovative Solutions', 'User-Centric Design'] },
    { num: '04', title: 'Human-in-the-Loop', img: 'process_1_4.jpg', list: ['Accuracy vs. latency tradeoffs', 'Cost at scale', 'Cutting-Edge Technology', 'Innovative Solutions', 'User-Centric Design'] },
    { num: '05', title: 'Production', img: 'process_1_5.jpg', list: ['Model monitoring & alerts', 'Version control & rollback', 'Compliance & explainability layers', 'Innovative Solutions', 'User-Centric Design'] },
  ];

  const caseStudies = [
    { img: 'project_1_1.jpg', sub: 'Service', title: 'Customer Support', text: 'Deliver high-quality customer service with a portfolio of generative and predictive applications tailored to your business needs.', discount: '60% reduction in response time' },
    { img: 'project_1_2.jpg', sub: 'Healthcare', title: 'Telemedicine', text: 'Intelligent chatbots, sentiment analysis, and automated ticket routing.', discount: '35% increase in conversion' },
    { img: 'project_1_3.jpg', sub: 'Education', title: 'Online Learning', text: 'Deliver high-quality customer service with a portfolio of generative and predictive applications tailored to your business needs.', discount: '60% reduction in response time' },
    { img: 'project_1_4.jpg', sub: 'Retail', title: 'e-Commerce', text: 'Intelligent chatbots, sentiment analysis, and automated ticket routing.', discount: '35% increase in conversion' },
  ];

  const counters = [
    { num: '10', suffix: 'M+', label: 'API Calls Daily' },
    { num: '150', suffix: '+', label: 'Countries Served' },
    { num: '4.9', suffix: '/5', label: 'Customer Rating' },
    { num: '24', suffix: '/7', label: 'Expert Support' },
  ];

  const integrations = [
    { icon: 'icon-1.png', title: 'Microsoft Team' },
    { icon: 'icon-2.png', title: 'ChatGPT' },
    { icon: 'icon-3.png', title: 'Ziper' },
    { icon: 'icon-4.png', title: 'Loom' },
  ];

  const pricingPlans = [
    { title: 'Starter', subtitle: 'The most premium plan', price: '99.99', active: false, delay: '.2s', list: ['1 Robentix Core Unit', 'Limited AI Task Library', 'Self-Service Deployment', 'Basic Dashboard Access'] },
    { title: 'Beginner', subtitle: 'Affordable family coverage', price: '189.99', active: false, delay: '.4s', list: ['5 Chiropractic Adjustment', 'Limited AI Task Library', 'Follow-Up Recommendations', 'Basic Dashboard Access'] },
    { title: 'Professional', subtitle: 'Focus on preventive care', price: '299.99', active: true, delay: '.6s', list: ['15 Chiropractic Adjustment', 'Limited AI Task Library', 'Follow-Up Recommendations', 'Basic Dashboard Access'] },
    { title: 'Enterprise', subtitle: 'Unlimited Members', price: '499.99', active: false, delay: '.8s', list: ['15 Chiropractic Adjustment', 'Limited AI Task Library', 'Follow-Up Recommendations', 'Basic Dashboard Access'] },
  ];

  const testimonials = [
    { img: 'testi_1_1.png', text: 'The collaborative approach they took was refreshing and effective', name: 'Jems Colin', role: 'CTO, Ailitic' },
    { img: 'testi_1_2.png', text: 'The innovative strategies they implemented greatly improved our workflow.', name: 'Sara Lin', role: 'Product Manager, Innovatech' },
    { img: 'testi_1_3.png', text: 'The innovative strategies they implemented greatly improved our workflow.', name: 'Mark Rivas', role: 'Lead Developer, TechScribe' },
    { img: 'testi_1_1.png', text: 'The collaborative approach they took was refreshing and effective', name: 'Jems Colin', role: 'CTO, Ailitic' },
    { img: 'testi_1_2.png', text: 'The innovative strategies they implemented greatly improved our workflow.', name: 'Sara Lin', role: 'Product Manager, Innovatech' },
  ];

  const blogs = [
    { img: 'blog_1_1.jpg', cat: 'Remote work', date: '15 Jan, 2025', comments: '2 Comments', title: 'Building and Leading a Talented Design Team for Success' },
    { img: 'blog_1_2.jpg', cat: 'Hybrid Collaboration', date: '19 Jan, 2025', comments: '3 Comments', title: 'Maximizing Productivity in a Flexible Work Environment' },
    { img: 'blog_1_3.jpg', cat: 'User-Centered Design', date: '20 Jan, 2025', comments: '2 Comments', title: 'Strategies to Enhance User Engagement and Satisfaction' },
    { img: 'blog_1_4.jpg', cat: 'Design Systems', date: '22 Jan, 2025', comments: '4 Comments', title: 'Creating Cohesive Experiences Across Platforms' },
    { img: 'blog_1_1.jpg', cat: 'Remote work', date: '25 Jan, 2025', comments: '2 Comments', title: 'Building and Leading a Talented Design Team for Success' },
    { img: 'blog_1_2.jpg', cat: 'Hybrid Collaboration', date: '29 Jan, 2025', comments: '3 Comments', title: 'Maximizing Productivity in a Flexible Work Environment' },
  ];

  const marqueeItems = [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Neural Networks',
    'Natural Language Processing',
    'Computer Vision',
    'Predictive Analytics',
    'AutoML',
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
                  Next-Generation AI Technology
                </span>
                <h1 className="hero-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">
                  Transform Your Business With AI
                </h1>
                <p className="hero-text wow fadeInUp" data-wow-delay=".4s">
                  We help businesses unlock new opportunities with AI-driven solutions for automation, insights, and growth.
                </p>
                <div className="wow fadeInUp" data-wow-delay=".6s">
                  <Link href="#about" className="th-btn">
                    Discover More{' '}
                    <span className="icon">
                      <Image src="/assets/img/icon/arrow-right.svg" alt="" width={16} height={16} />
                    </span>
                  </Link>
                </div>
                <div className="discount-wrapp scroll-down wow fadeInUp" data-wow-delay=".8s">
                  <Link href="#about-sec" className="spin">
                    <div className="logo-img">
                      <Image src="/assets/img/logo-icon.svg" alt="" width={50} height={50} />
                    </div>
                  </Link>
                  <div className="discount-tag">
                    <span className="discount-anime">
                      SCROLL DOWN FOR MORE *** SCROLL DOWN FOR MORE *** SCROLL DOWN**
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Stats Cards */}
              <div className="row gy-4 justify-content-center">
                {[
                  { num: '500', suffix: 'K+', label: 'Active Users' },
                  { num: '99.9', suffix: '%', label: 'Uptime SLA' },
                  { num: '2.5', suffix: 'B+', label: 'Predictions Made' },
                ].map((card, index) => (
                  <div className="col-sm-6 col-md-4 wow fadeInUp" data-wow-delay={`${(index + 1) * 0.2}s`} key={index}>
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
                <video autoPlay loop muted playsInline>
                  <source src="/assets/img/bg/aior.mp4" type="video/mp4" />
                </video>
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
                <span className="sub-title text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">About Us</span>
                <h2 className="sec-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">
                  <span>AI solutions</span>{' '}
                  <span className="title">crafted for everyone!</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row gy-4">
            <div className="col-lg-5 col-xxl-5 wow fadeInLeft" data-wow-delay=".2s">
              <div className="img-box1">
                <div className="img1 image scale">
                  <Image src="/assets/img/normal/about_1_1.jpg" alt="About" width={500} height={400} />
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-xxl-6">
              <div className="ps-xxl-5">
                <p className="pe-xl-5 me-xl-5 mb-35 wow fadeInUp" data-wow-delay=".4s">
                  In today&apos;s fast-paced tech environment, incorporating AI is essential. It changes how
                  businesses and customers connect, offering key insights for adapting to market trends. AI involves
                  creating computer systems that can do things that usually need human intelligence.
                </p>
                <div className="checklist list-two-column about-checklist wow fadeInUp" data-wow-delay=".6s">
                  <ul>
                    {['Proven Expertise', 'Proven Expertise', 'Client-Centric Approach', 'Client-Centric Approach', 'Cutting-Edge Technology', 'Cutting-Edge Technology'].map(
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
                <span className="sub-title style2 text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">Our Features</span>
                <h2 className="sec-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">Powerful AI Features</h2>
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

      {/* ===== PROCESS SECTION ===== */}
      <section
        className="process-area position-relative space"
        data-overlay="black2"
        data-opacity="6"
      >
        <div className="container">
          <div className="title-area text-center pe-xl-5 ps-xl-5">
            <span className="sub-title text-anime-style-2 style2 wow fadeInUp" data-wow-delay=".1s">Works Process</span>
            <h2 className="sec-title text-white text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">How it Works</h2>
          </div>
          <div className="row justify-content-center">
            {processSteps.map((step, index) => (
              <div className="col-lg-8 wow fadeInUp" data-wow-delay={`${(index + 1) * 0.15}s`} key={index}>
                <div className="process-wrapper">
                  <div className="process-item mb-50">
                    <div className="box-wrapp">
                      <span className="box-num">
                        <span className="number">{step.num}</span> STEP
                      </span>
                      <div className="box-content">
                        <h3 className="box-title">{step.title}</h3>
                        <p className="box-text">
                          Seamlessly integrate with your existing data sources through our APIs or upload directly.
                        </p>
                        <div className="checklist">
                          <ul>
                            {step.list.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="box-img">
                      <Image src={`/assets/img/process/${step.img}`} alt="" width={500} height={350} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CASE STUDIES SECTION ===== */}
      <section className="project-area position-relative overflow-hidden space" id="case-studies-sec">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title style2 text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">Proven Use Cases</span>
            <h2 className="sec-title style2 text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">Recent Case Studies</h2>
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
              Explore All{' '}
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
            <h2 className="sec-title style2 text-anime-style-3 wow fadeInUp" data-wow-delay=".1s">Trusted by Industry Leaders</h2>
            <p className="wow fadeInUp" data-wow-delay=".3s">
              Join thousands of companies transforming their business with AI
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
                    <span className="sub-title text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">Features / Benefits</span>
                    <h2 className="sec-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">
                      AI solutions <span className="d-block">crafted for everyone!</span>
                    </h2>
                  </div>
                  <div className="about-wrapp">
                    <div>
                      <div className="checklist style2 wow fadeInUp" data-wow-delay=".6s">
                        <ul>
                          {['Proven Expertise', 'Client-Centric Approach', 'Cutting-Edge Technology', 'Innovative Solutions', 'User-Centric Design', 'Seamless Integration'].map(
                            (item, i) => (
                              <li className="wow fadeInUp" data-wow-delay={`${(i + 1) * 0.1}s`} key={i}>
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="btn-group mt-60 wow fadeInUp" data-wow-delay=".8s">
                        <Link href="/contact" className="th-btn">
                          Learn More{' '}
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
                  <div className="discount-wrapp wow fadeInUp" data-wow-delay=".5s">
                    <Link
                      href="https://www.youtube.com/watch?v=_sI_Ps7JSEk"
                      className="play-btn popup-video"
                    >
                      <i className="fa-solid fa-play"></i>
                    </Link>
                    <div className="discount-tag">
                      <span className="discount-anime">
                        View All Demo ** View All Demo ** View All Demo ** View All Demo**
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-xl-4 wow fadeInLeft" data-wow-delay=".3s">
              <div className="feature-img global-img">
                <div className="box-img">
                  <Image src="/assets/img/normal/feature_1_1.jpg" alt="" width={400} height={500} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== AI AGENTS INTEGRATION SECTION ===== */}
      <section className="download-area overflow-hidden space-top">
        <div className="container">
          <div className="row gy-4 justify-content-center align-items-center">
            <div className="col-xl-10">
              <div className="title-area mb-80 text-center">
                <span className="sub-title text-white text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">Integration</span>
                <h2 className="sec-title text-white text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">AI Agents Integration</h2>
              </div>
              <div className="download-img-wrapp">
                {['social-img4.png', 'social-img3.png', 'social-img2.png', 'social-img.png'].map((img, index) => (
                  <div
                    className={`download-image${index === 0 ? ' style1' : index === 1 ? ' stylw2' : index === 2 ? ' style3' : ''} wow zoomIn`}
                    data-wow-delay={`${(index + 1) * 0.15}s`}
                    key={index}
                  >
                    <Image src={`/assets/img/normal/${img}`} alt="" width={120} height={120} />
                  </div>
                ))}
              </div>
              <div className="position-relative z-index-3 mt-60 text-center mb-80 wow fadeInUp" data-wow-delay=".4s">
                <Link href="/contact" className="th-btn">
                  Contact Us{' '}
                  <span className="icon">
                    <Image src="/assets/img/icon/arrow-right.svg" alt="" width={16} height={16} />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Integration Cards */}
          <div className="row gy-4 mt-lg-50">
            {integrations.map((item, index) => (
              <div className="col-md-6 col-xl-3 wow fadeInUp" data-wow-delay={`${(index + 1) * 0.15}s`} key={index}>
                <div className="integration-card">
                  <div className="box-content">
                    <div className="box-icon">
                      <Image src={`/assets/img/icon/${item.icon}`} alt="" width={50} height={50} />
                    </div>
                    <h3 className="box-title">{item.title}</h3>
                  </div>
                  <p className="box-text">
                    Use the context from your contact like bio.title, location, and notes in complex ChatGPT queries and workflows.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className="overflow-hidden space">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">Pricing Plan</span>
            <h2 className="sec-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">The People Powering Progress</h2>
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
                      <h4 className="subtitle">What included?</h4>
                      <ul>
                        {plan.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <Link href="/contact" className="th-btn black-border fw-btn">
                      Choose the plan{' '}
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
                <span className="sub-title text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">Testimonials</span>
                <h2 className="sec-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">
                  See What Our Happy Customers Say
                </h2>
              </div>
            </div>
            <div className="col-auto wow fadeInUp" data-wow-delay=".3s">
              <div className="sec-btn">
                <Link href="/testimonial" className="th-btn">
                  Learn More{' '}
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
                            <i className="fa-sharp fa-solid fa-star-sharp" key={i}></i>
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

      {/* ===== CTA SECTION ===== */}
      <div className="space overflow-hidden">
        <div className="container">
          <div className="cta-area2 space">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-10">
                <div className="title-area text-center">
                  <h2 className="sec-title text-white text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">
                    Ready to Transform Your Business?
                  </h2>
                  <span className="box-text text-anime-style-3 wow fadeInUp" data-wow-delay=".3s">
                    Join thousands of companies already using our AI platform to drive innovation and growth.
                  </span>
                </div>
                <div className="btn-group justify-content-center wow fadeInUp" data-wow-delay=".5s">
                  <Link href="/contact" className="th-btn">
                    Start Free Trial{' '}
                    <span className="icon">
                      <Image src="/assets/img/icon/arrow-right.svg" alt="" width={16} height={16} />
                    </span>
                  </Link>
                  <Link href="/contact" className="th-btn th-border">
                    Schedule Demo{' '}
                    <Image src="/assets/img/icon/arrow-right.svg" alt="" width={16} height={16} />
                  </Link>
                </div>
                <ul className="cta-list wow fadeInUp" data-wow-delay=".7s">
                  <li><i className="fa-light fa-check"></i>No credit card required</li>
                  <li><i className="fa-light fa-check"></i>14-day free trial</li>
                  <li><i className="fa-light fa-check"></i>Cancel anytime</li>
                  <li><i className="fa-light fa-check"></i>24/7 support</li>
                </ul>
              </div>
            </div>
            <div className="shape-mockup movingX d-none d-lg-block" data-bottom="0%" data-right="0%">
              <Image src="/assets/img/shape/element-2.png" alt="" width={100} height={100} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== BLOG SECTION ===== */}
      <section className="overflow-hidden space bg-smoke2" id="blog-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-xxl-9">
              <div className="row justify-content-lg-between justify-content-center align-items-center">
                <div className="col-lg-8 col-xxl-6">
                  <div className="title-area text-center text-lg-start">
                    <span className="sub-title text-anime-style-2 wow fadeInUp" data-wow-delay=".1s">News &amp; Blog</span>
                    <h2 className="sec-title text-anime-style-3 wow fadeInUp" data-wow-delay=".2s">
                      Recent our recent articles
                    </h2>
                  </div>
                </div>
                <div className="col-auto wow fadeInUp" data-wow-delay=".3s">
                  <div className="sec-btn">
                    <Link href="/blog" className="th-btn">
                      BROWSE ALL{' '}
                      <span className="icon">
                        <Image src="/assets/img/icon/arrow-right.svg" alt="" width={16} height={16} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Blog Swiper Slider */}
              <div className="slider-area">
                <div className="swiper th-slider has-shadow" id="blogSlider1">
                  <div className="swiper-wrapper">
                    {blogs.map((blog, index) => (
                      <div className="swiper-slide" key={index}>
                        <div className="blog-card">
                          <div className="box-img global-img">
                            <Image src={`/assets/img/blog/${blog.img}`} alt="blog image" width={400} height={260} />
                          </div>
                          <div className="box-content">
                            <span className="cat">{blog.cat}</span>
                            <h3 className="box-title">
                              <Link href="/">{blog.title}</Link>
                            </h3>
                          </div>
                          <div className="blog-meta">
                            <Link href="/blog">{blog.date}</Link>{' '}
                            <Link href="/blog">{blog.comments}</Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
              </div>
            </div>

            <div className="col-xxl-3 wow fadeInRight" data-wow-delay=".3s">
              <div className="blog-image">
                <Image src="/assets/img/blog/blog-image.jpg" alt="" width={350} height={600} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}