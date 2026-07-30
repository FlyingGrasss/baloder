"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const QUESTION_WORDS = ["BALÖDER", "niye", "var?"];
const ANSWER_WORDS = ["ÖĞRENCİ", "İÇİN."];

function AnimatedWord({
  word,
  letterClass,
}: {
  word: string;
  letterClass: string;
}) {
  return (
    <span className="purpose-word">
      {Array.from(word).map((letter, index) => (
        <span className={letterClass} key={`${letter}-${index}`}>
          {letter}
        </span>
      ))}
    </span>
  );
}

export default function PurposeStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const question = section.querySelector(".purpose-question");
      const answer = section.querySelector(".purpose-answer");
      const questionLetters = gsap.utils.toArray<HTMLElement>(
        ".purpose-question-letter",
      );
      const questionTitle = section.querySelector(".purpose-question h2");
      const answerTitle = section.querySelector(".purpose-answer h2");
      const questionRule = section.querySelector(".purpose-question-rule");
      const questionKicker = section.querySelector(".purpose-question-kicker");
      const answerCopy = section.querySelector(".purpose-answer-copy");
      const impactRing = section.querySelector(".purpose-impact-ring");
      const progress = section.querySelector(".purpose-progress-fill");

      if (reduceMotion) {
        section.classList.add("purpose-static");
        gsap.set(question, { autoAlpha: 0 });
        gsap.set(answer, { autoAlpha: 1 });
        gsap.set([answerTitle, answerCopy], {
          autoAlpha: 1,
          rotate: 0,
          scale: 1,
        });
        return;
      }

      gsap.set(answer, { autoAlpha: 0 });
      gsap.set(answerTitle, {
        autoAlpha: 0,
        rotate: -2,
        scale: 0.92,
        transformOrigin: "0% 50%",
      });
      gsap.set(answerCopy, { autoAlpha: 0, y: 28 });
      gsap.set(impactRing, { autoAlpha: 0, scale: 0.25 });
      gsap.set(progress, { scaleX: 0, transformOrigin: "0% 50%" });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top+=64",
          end: "bottom bottom",
          scrub: 1.15,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(questionTitle, { scale: 1.018, duration: 0.65 }, 0)
        .to(questionTitle, { scale: 1, duration: 0.65 }, 0.65)
        .from(
          questionRule,
          {
            scaleX: 0,
            transformOrigin: "0% 50%",
            duration: 0.55,
            ease: "power3.out",
          },
          0.25,
        )
        .to(progress, { scaleX: 0.46, duration: 1.45 }, 0)
        .to(
          questionLetters,
          {
            autoAlpha: 0,
            yPercent: -22,
            rotate: -6,
            scale: 0.96,
            stagger: { each: 0.055, from: "end" },
            duration: 0.48,
            ease: "power3.in",
          },
          1.45,
        )
        .to(
          questionKicker,
          { autoAlpha: 0, y: -8, duration: 0.35, ease: "power2.in" },
          1.45,
        )
        .to(
          questionRule,
          {
            scaleX: 0,
            transformOrigin: "100% 50%",
            duration: 0.5,
          },
          1.58,
        )
        .set(answer, { autoAlpha: 1 }, 2.7)
        .to(
          impactRing,
          {
            autoAlpha: 0.34,
            scale: 1,
            duration: 0.55,
            ease: "expo.out",
          },
          2.7,
        )
        .to(
          answerTitle,
          {
            autoAlpha: 1,
            rotate: 0,
            scale: 1,
            duration: 0.82,
            ease: "expo.out",
          },
          2.74,
        )
        .to(
          impactRing,
          {
            autoAlpha: 0,
            scale: 1.7,
            duration: 0.85,
            ease: "power2.out",
          },
          3.15,
        )
        .to(
          answerCopy,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          3.65,
        )
        .to(progress, { scaleX: 1, duration: 1.6 }, 2.7);
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      aria-label="BALÖDER'in varlık nedeni"
      className="purpose-manifesto"
      ref={sectionRef}
    >
      <div className="purpose-stage">
        <div aria-hidden="true" className="purpose-coordinate purpose-coordinate-left">
          38°27&apos;N
        </div>
        <div aria-hidden="true" className="purpose-coordinate purpose-coordinate-right">
          BAL / İZMİR
        </div>

        <div aria-hidden="true" className="purpose-progress">
          <span className="purpose-progress-fill" />
        </div>

        <div aria-hidden="true" className="purpose-question">
          <p className="purpose-question-kicker">Bir soruyla başlayalım.</p>
          <h2>
            {QUESTION_WORDS.map((word) => (
              <AnimatedWord
                key={word}
                letterClass="purpose-letter purpose-question-letter"
                word={word}
              />
            ))}
          </h2>
          <span className="purpose-question-rule" />
        </div>

        <div aria-hidden="true" className="purpose-answer">
          <span className="purpose-impact-ring" />
          <p className="purpose-answer-kicker">Cevabımız çok net.</p>
          <h2>
            {ANSWER_WORDS.map((word) => (
              <AnimatedWord
                key={word}
                letterClass="purpose-letter purpose-answer-letter"
                word={word}
              />
            ))}
          </h2>
          <p className="purpose-answer-copy">
            Kararlarımızın, bütçemizin ve ürettiğimiz her çözümün merkezinde
            Bornova Anadolu Lisesi öğrencisi var.
          </p>
        </div>

        <p className="sr-only">
          BALÖDER niye var? Öğrenci için. Kararlarımızın, bütçemizin ve
          ürettiğimiz her çözümün merkezinde Bornova Anadolu Lisesi öğrencisi
          var.
        </p>
      </div>
    </section>
  );
}
