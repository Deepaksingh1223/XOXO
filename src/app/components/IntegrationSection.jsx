'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const integrations = [
  {
    title: 'Centralized Exchange',
    text: 'Limited to trade aggregation. Users must make directional decisions and bear slippage and MEV costs.',
    icon: '/assets/images/icons-img.png',
  },
  {
    title: 'Traditional DEX',
    text: 'MEV value is largely captured by external bots. Returns are fully dependent on crypto market volatility.',
    icon: '/assets/images/icons-img.png',
  },
  {
    title: 'XOXOFX DEXX',
    text: 'Goes beyond aggregation with active capital orchestration. DEXX Engine connects on-chain trading with off-chain payment settlement.',
    icon: '/assets/images/icons-img.png',
  },
  {
    title: 'Payment Settlement Layer',
    text: 'Generates real, sustainable cash flow beyond pure crypto market cycles through settlement liquidity.',
    icon: '/assets/images/icons-img.png',
  },
];

export default function IntegrationSection() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const loadScript = (src) =>
      new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.body.appendChild(script);
      });

    const initWOW = async () => {
      await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js'
      );

      if (window.WOW) {
        new window.WOW({
          live: false,
          offset: 100,
        }).init();
      }

      document
        .querySelectorAll('.text-anime-style-2, .text-anime-style-3')
        .forEach((el) => {
          el.style.opacity = '1';
        });
    };

    initWOW();
  }, []);

  return (
    <section className="download-area overflow-hidden space-top">
      <div className="container">
        <div className="row gy-4 justify-content-center align-items-center">
          <div className="col-xl-10">
            <div className="title-area mb-80 text-center">
              <span
                className="sub-title text-white text-anime-style-2 wow fadeInUp"
                data-wow-delay=".1s"
              >
                How DEXX Differs From Other DEXs
              </span>

              <h2
                className="sec-title text-white text-anime-style-3 wow fadeInUp"
                data-wow-delay=".2s"
              >
                Beyond Aggregation with Active Capital Orchestration
              </h2>
            </div>

            <div className="download-img-wrapp">
              <div
                className="download-image style1 wow zoomIn"
                data-wow-delay="0.15s"
              >
                <Image
                  src="/assets/images/icons-img.png"
                  alt="XOXOFX Evolution"
                  width={1000}
                  height={500}
                  className="img-fluid"
                />
              </div>
            </div>

            <div
              className="position-relative z-index-3 mt-60 text-center mb-80 wow fadeInUp"
              data-wow-delay=".4s"
            >
              <Link href="/" className="th-btn">
                Launch Arbitrage System

                <span className="icon ms-2">
                  <Image
                    src="/assets/img/icon/arrow-right.svg"
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Integration Cards */}
        <div className="row gy-4 mt-lg-50">
          {integrations.map((item, index) => (
            <div
              className="col-md-6 col-xl-3 wow fadeInUp"
              data-wow-delay={`${(index + 1) * 0.15}s`}
              key={index}
            >
              <div className="integration-card">
                <div className="box-content">
                  <div className="box-icon">
                    <Image
                      src="/assets/images/icons-img.png"
                      alt="icon"
                      width={50}
                      height={50}
                    />
                  </div>

                  <h3 className="box-title">{item.title}</h3>
                </div>

                <p className="box-text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}