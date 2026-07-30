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
      const answerLetters = gsap.utils.toArray<HTMLElement>(
        ".purpose-answer-letter",
      );
      const questionRule = section.querySelector(".purpose-question-rule");
      const questionKicker = section.querySelector(".purpose-question-kicker");
      const answerCopy = section.querySelector(".purpose-answer-copy");
      const impactRing = section.querySelector(".purpose-impact-ring");
      const progress = section.querySelector(".purpose-progress-fill");

      if (reduceMotion) {
        section.classList.add("purpose-static");
        gsap.set(question, { autoAlpha: 1, yPercent: -105, scale: 0.58 });
        gsap.set(answer, { autoAlpha: 1 });
        gsap.set([questionLetters, answerLetters, answerCopy], {
          autoAlpha: 1,
          yPercent: 0,
          rotate: 0,
          scale: 1,
        });
        return;
      }

      gsap.set(answer, { autoAlpha: 0 });
      gsap.set(answerLetters, {
        autoAlpha: 0,
        yPercent: 130,
        rotate: 7,
        scale: 1.35,
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
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .from(questionLetters, {
          autoAlpha: 0,
          yPercent: 120,
          rotateX: -80,
          stagger: 0.035,
          duration: 0.75,
          ease: "power4.out",
        })
        .from(
          questionRule,
          {
            scaleX: 0,
            transformOrigin: "0% 50%",
            duration: 0.55,
            ease: "power3.out",
          },
          0.15,
        )
        .to(progress, { scaleX: 0.48, duration: 1.05 }, 0)
        .to(
          questionLetters,
          {
            autoAlpha: 0,
            yPercent: -145,
            stagger: 0.018,
            duration: 0.48,
            ease: "power3.in",
          },
          1.08,
        )
        .to(
          questionKicker,
          { autoAlpha: 0, y: -18, duration: 0.25 },
          1.02,
        )
        .to(
          questionRule,
          {
            scaleX: 0,
            transformOrigin: "100% 50%",
            duration: 0.32,
          },
          1.06,
        )
        .set(answer, { autoAlpha: 1 }, 1.36)
        .to(
          impactRing,
          {
            autoAlpha: 0.34,
            scale: 1,
            duration: 0.32,
            ease: "expo.out",
          },
          1.36,
        )
        .to(
          answerLetters,
          {
            autoAlpha: 1,
            yPercent: 0,
            rotate: 0,
            scale: 1,
            stagger: 0.032,
            duration: 0.82,
            ease: "expo.out",
          },
          1.39,
        )
        .to(
          impactRing,
          {
            autoAlpha: 0,
            scale: 1.7,
            duration: 0.65,
            ease: "power2.out",
          },
          1.67,
        )
        .to(
          answerCopy,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.46,
            ease: "power3.out",
          },
          1.92,
        )
        .to(progress, { scaleX: 1, duration: 1.35 }, 1.3);
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
