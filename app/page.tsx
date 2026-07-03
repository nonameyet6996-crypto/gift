'use client';

/**
 * app/page.tsx
 *
 * Setup (one-time):
 *   npm install framer-motion
 *   Tailwind must already be set up (it is, by default, in a fresh `create-next-app`).
 *
 * Everything else — fonts, colors, keyframes — is self-contained in this file.
 * To use real photos instead of emoji: set `image: "/photos/trek.jpg"` on any
 * memory below and drop the file into your `public/photos` folder.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Playfair_Display, Quicksand } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

/* ============================================================
   CONFIG
   ============================================================ */
const FROM_NAME = 'Rahul';
const TO_NAME = 'Chelsi Jain';

type Theme = 'blush' | 'lavender' | 'finale';

interface Memory {
  emoji: string;
  eyebrow: string;
  title: string;
  theme: Theme;
  back: string;
  image: string | null;
  cheeky?: boolean;
}

const MEMORIES: Memory[] = [
  {
    emoji: '🏔️',
    eyebrow: 'Memory One',
    title: 'The Trek',
    theme: 'blush',
    back: "We were just classmates in a class full of strangers, until that trek at the start of it all. Somewhere between the climb and the roasts, something in me changed. I think that's the day I started to love you.",
    image: '/Photos/trek.jpeg',
  },
  {
    emoji: '👣',
    eyebrow: 'Memory Two',
    title: 'The Long Walk',
    theme: 'lavender',
    back: "That one evening on FC Road, we walked all the way back to campus. No rickshaw, no rush, just us talking until my feet forgot to be tired. I'd walk that same road a thousand times over, because every step with you told me I love you.",
    image: '/Photos/fc.png',
  },
  {
    emoji: '📚',
    eyebrow: 'Memory Three',
    title: "The 'Tutor'",
    theme: 'blush',
    back: "Confession: I studied harder than I ever had, not really for the marks, but so I'd have an excuse to sit beside you and teach you something. Turns out the only thing I was ever actually trying to say was I love you.",
    image: '/Photos/study.png',
  },
  {
    emoji: '🍫',
    eyebrow: 'Memory Four',
    title: 'The First Chocolates',
    theme: 'lavender',
    back: "You are the very first person I ever bought chocolates for. I stood in that shop overthinking flavours like my life depended on it, because with you, even the small things felt like they mattered more. They still do. I love you.",
    image: '/Photos/chocolate.jpg',
  },
  {
    emoji: '💐',
    eyebrow: 'Memory Five',
    title: 'The First Bouquet',
    theme: 'blush',
    back: "You're also the first person I ever handed a bouquet to, hands a little too sweaty, heart a little too loud. Every flower in it was really just me trying to say I love you, before I had the courage to actually say it.",
    image: '/Photos/flower.jpeg',
  },
  {
    emoji: '💞',
    eyebrow: 'Memory Six',
    title: 'The Ultimate First',
    theme: 'lavender',
    back: "And then, one day, I finally said it out loud, to you first, and to you only. So here it is again, as true as it was that day: I love you, Chelsi.",
    image: '/Photos/confess.jpg',
  },
  {
    emoji: '🤍',
    eyebrow: 'Memory Seven',
    title: 'The Safe Space',
    theme: 'blush',
    back: "I have never felt this at peace with anyone else, like I can be tired, weird, quiet, or completely unfiltered, and still be exactly enough. That kind of peace has a name, and it's you. I love you.",
    image: null,
  },
  {
    emoji: '🔥',
    eyebrow: 'Memory Eight',
    title: 'The Passion',
    theme: 'lavender',
    back: "And then there's the other side of us, the make-out sessions that leave my heart racing long after we've stopped. Even my own pulse can't lie about how much I love you.",
    image: '/Photos/kiss.jpg',
  },
  {
    emoji: '😏',
    eyebrow: 'Memory Nine',
    title: 'The Cheeky Milestone',
    theme: 'blush',
    back: "You are also the first person whose boobs I've touched 🍒🤭. A milestone I intend to cherish with exactly as much devotion as every serious one on this list. Still love you, obviously. Maybe a little too much for this one.",
    image: '/Photos/boobies.jpeg',
    cheeky: true,
  },
  {
    emoji: '✨',
    eyebrow: 'Memory Ten',
    title: 'The Grand Finale',
    theme: 'finale',
    back: '',
    image: null,
  },
];

function FloatingHearts({ count = 14 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 18,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 12,
        driftX: (Math.random() - 0.5) * 120,
        color: Math.random() > 0.5 ? '#E9A9C4' : '#B9A6E8',
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute bottom-[-5vh]"
          style={{ left: `${h.left}%`, fontSize: `${h.size}px`, color: h.color }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: '-115vh', x: h.driftX, opacity: [0, 0.55, 0.55, 0.35, 0], rotate: 25 }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}

function RunawayButton({ onArrive }: { onArrive: () => void }) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [attempts, setAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const NEEDED_DODGES = 2;

  const dodge = () => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const btnW = 220;
    const btnH = 60;
    const maxX = Math.max(w - btnW, 0);
    const maxY = Math.max(h - btnH, 0);
    setPos({ left: Math.random() * maxX, top: Math.random() * maxY });
  };

  const handleTrigger = () => {
    if (attempts < NEEDED_DODGES) {
      dodge();
      setAttempts((a) => a + 1);
    } else {
      onArrive();
    }
  };

  return (
    <div ref={containerRef} className="relative mx-auto h-40 w-full max-w-md">
      <motion.button
        onMouseEnter={() => {
          if (attempts < NEEDED_DODGES) {
            dodge();
            setAttempts((a) => a + 1);
          }
        }}
        onClick={handleTrigger}
        animate={
          pos
            ? { left: pos.left, top: pos.top, x: 0, y: 0 }
            : { left: '50%', top: '50%', x: '-50%', y: '-50%' }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="absolute whitespace-nowrap rounded-full bg-[#D97CA0] px-8 py-4 font-[family-name:var(--font-body)] text-base font-semibold text-white shadow-lg shadow-[#D97CA0]/30 transition-shadow hover:shadow-xl"
      >
        {attempts === 0 && 'Begin Our Story →'}
        {attempts === 1 && 'Not so fast… try again 😏'}
        {attempts >= NEEDED_DODGES && 'Okay okay — tap me for real ♥'}
      </motion.button>
    </div>
  );
}

function MemoryCard({ memory, index, isActive }: { memory: any; index: number; isActive: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const isLavender = memory.theme === 'lavender';

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 relative z-10">
      <div
        className={`text-center mb-6 transition-all duration-700 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="font-body tracking-[0.3em] text-xs uppercase text-[#D97CA0]/80">
          {memory.eyebrow} · {index + 1} of 10
        </span>
      </div>

      {/* perspective applied here */}
      <div className="w-full aspect-[3/4]" style={{ perspective: '1600px' }}>
        <div
          className="relative w-full h-full cursor-pointer transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
          onClick={() => setFlipped((f) => !f)}
        >
          {/* FRONT */}
          <div
            className={`absolute inset-0 rounded-3xl shadow-xl border flex flex-col items-center justify-center gap-4 p-8 ${
              isLavender
                ? 'bg-[#E4DBF7] border-[#B9A6E8]/40'
                : 'bg-[#F8DCE6] border-[#E9A9C4]/40'
            }`}
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden' 
            }}
          >
            {memory.image ? (
              <img
                src={memory.image}
                alt={memory.title}
                className="w-32 h-32 object-cover rounded-full shadow-md border-4 border-white"
              />
            ) : (
              <span className="text-6xl">{memory.emoji}</span>
            )}
            <h3 className="font-display text-2xl sm:text-3xl text-[#4A3F55] text-center leading-snug">
              {memory.title}
            </h3>
            <p className="font-body text-sm text-[#4A3F55]/60 text-center">
              Tap to open this memory
            </p>
          </div>

          {/* BACK */}
          <div
            className={`absolute inset-0 rounded-3xl shadow-xl border flex flex-col items-center justify-center gap-4 p-8 ${
              isLavender
                ? 'bg-white border-[#B9A6E8]/40'
                : 'bg-white border-[#E9A9C4]/40'
            }`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {memory.image ? (
              <img
                src={memory.image}
                alt={memory.title}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full shadow-sm"
              />
            ) : (
              <span className="text-3xl">{memory.emoji}</span>
            )}
            <p className="font-body text-base sm:text-lg text-[#4A3F55]/90 text-center leading-relaxed">
              {memory.back}
            </p>
            <span className="font-body text-xs text-[#4A3F55]/40 mt-2">
              — {FROM_NAME}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressTrail({
  active,
  total,
  onJump,
}: {
  active: number;
  total: number;
  onJump: (i: number) => void;
}) {
  return (
    <>
      <div className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onJump(i)}
            aria-label={`Go to memory ${i + 1}`}
            className={`rounded-full transition-all duration-500 ${
              i === active
                ? 'h-4 w-4 scale-110 bg-[#D97CA0]'
                : i < active
                ? 'h-2.5 w-2.5 bg-[#E9A9C4]'
                : 'h-2 w-2 bg-[#4A3F55]/15'
            }`}
          />
        ))}
      </div>
      <div className="fixed left-0 right-0 top-0 z-30 h-1.5 bg-[#4A3F55]/5 md:hidden">
        <div
          className="h-full bg-gradient-to-r from-[#D97CA0] to-[#B9A6E8] transition-all duration-500"
          style={{ width: `${((active + 1) / total) * 100}%` }}
        />
      </div>
    </>
  );
}

function FinaleSection() {
  const [sparkles, setSparkles] = useState<
    { id: number; left: number; top: number; delay: number; size: number }[]
  >([]);
  const triggered = useRef(false);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8DCE6] via-[#E4DBF7] to-[#EFC77A]/30 px-6 py-24">
      <motion.div
        className="pointer-events-none absolute inset-0"
        onViewportEnter={() => {
          if (triggered.current) return;
          triggered.current = true;
          setSparkles(
            Array.from({ length: 18 }).map((_, i) => ({
              id: i,
              left: Math.random() * 100,
              top: Math.random() * 100,
              delay: Math.random() * 1.2,
              size: 10 + Math.random() * 16,
            }))
          );
        }}
        viewport={{ once: true, amount: 0.4 }}
      >
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            className="absolute text-[#EFC77A]"
            style={{ left: `${s.left}%`, top: `${s.top}%`, fontSize: `${s.size}px` }}
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], rotate: 360, opacity: [0, 1, 0.9] }}
            transition={{ duration: 1.1, delay: s.delay, ease: [0.22, 1, 0.36, 1] }}
          >
            ✦
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-xl text-center"
      >
        <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.35em] text-[#D97CA0]/80">
          Memory Ten · The Grand Finale
        </span>
        <motion.div
          className="my-6 text-7xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          💞
        </motion.div>
        <h2 className="mb-2 font-[family-name:var(--font-display)] text-3xl italic text-[#4A3F55]/70 sm:text-4xl">
          To
        </h2>
        <h1 className="mb-8 font-[family-name:var(--font-display)] text-5xl leading-tight text-[#D97CA0] sm:text-6xl md:text-7xl">
          {TO_NAME}
        </h1>
        <p className="mb-4 font-[family-name:var(--font-body)] text-base leading-relaxed text-[#4A3F55]/85 sm:text-lg">
          Ten memories, and I could have written a hundred more. From a trek that started
          it all, to a walk that never felt long enough, to every quiet, safe, funny,
          racing-heart moment in between.
        </p>
        <p className="mt-8 font-[family-name:var(--font-display)] text-2xl italic text-[#D97CA0] sm:text-3xl">
          I love you, {TO_NAME.split(' ')[0]}. Today, and every ordinary day after this one.
        </p>
        <p className="mt-10 font-[family-name:var(--font-body)] text-sm text-[#4A3F55]/50">
          — {FROM_NAME}
        </p>
      </motion.div>
    </section>
  );
}

function Landing({ onBegin }: { onBegin: () => void }) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.35em] text-[#D97CA0]/70">
          A small scrapbook, made just for you
        </span>
        <h1 className="mb-3 mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#4A3F55] sm:text-6xl">
          For <span className="text-[#D97CA0]">{TO_NAME}</span>
        </h1>
        <p className="mx-auto mb-10 max-w-sm font-[family-name:var(--font-body)] text-sm text-[#4A3F55]/60 sm:text-base">
          Ten memories. Ten reasons. One thing I've been trying to say, quietly, in
          every one of them.
        </p>
      </motion.div>
      <RunawayButton onArrive={onBegin} />
      <motion.div
        className="absolute bottom-10 text-2xl text-[#D97CA0]/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        ↓
      </motion.div>
    </section>
  );
}

export default function Page() {
  const [active, setActive] = useState(-1);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.55 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToMemory = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div
      className={`${playfair.variable} ${quicksand.variable} relative bg-[#FFF9F3] font-[family-name:var(--font-body)] text-[#4A3F55]`}
    >
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #e9a9c4;
          border-radius: 8px;
        }
      `}</style>

      <FloatingHearts />
      <ProgressTrail active={Math.max(active, 0)} total={MEMORIES.length} onJump={scrollToMemory} />

      <Landing onBegin={() => scrollToMemory(0)} />

      {MEMORIES.map((m, i) =>
        m.theme === 'finale' ? (
          <div
            key={i}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
          >
            <FinaleSection />
          </div>
        ) : (
          <section
            key={i}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            className={`relative flex min-h-screen flex-col items-center justify-center py-24 ${
              m.theme === 'lavender' ? 'bg-[#E4DBF7]/30' : 'bg-[#F8DCE6]/30'
            }`}
          >
            <MemoryCard memory={m} index={i} isActive={active === i} />
          </section>
        )
      )}

      <footer className="py-10 text-center font-[family-name:var(--font-body)] text-xs text-[#4A3F55]/30">
        made with a lot of ♥ by {FROM_NAME}
      </footer>
    </div>
  );
}