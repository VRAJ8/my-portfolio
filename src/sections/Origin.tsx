import { Brain, Database, Server, Sparkles } from 'lucide-react';
import ChapterTitle from '../components/ChapterTitle';
import CountUp from '../components/CountUp';
import Split from '../components/Split';
import GlobeLabels from '../components/GlobeLabels';
import { projects } from '../data/projects';

const focus = [
  { title: 'Data engineering', detail: 'Pipelines, warehouses and streaming that keep analysis honest.', Icon: Database },
  { title: 'Machine learning', detail: 'Models that make useful predictions, and the tests that prove it.', Icon: Brain },
  { title: 'Applied AI & LLMs', detail: 'LLMs inside real products, from code review to reading receipts.', Icon: Sparkles },
  { title: 'APIs & deployment', detail: 'Wrapping models and data in APIs, and shipping them.', Icon: Server },
];

const stats = [
  { value: 3, label: 'internships' },
  { value: 1, label: 'IEEE publication' },
  { value: projects.length, label: 'projects shipped' },
  { value: 8.32, decimals: 2, label: 'B.Tech GPA' },
];

/** Chapter 1: where Vraj comes from. The globe turns from Gujarat to California as you read. */
export default function Origin({ labels }: { labels: boolean }) {
  return (
    <section id="origin" className="relative px-5 py-32 sm:px-8 md:py-44">
      {labels && <GlobeLabels />}
      <div className="mx-auto max-w-7xl">
        <div className="max-w-xl">
          <ChapterTitle index={1} label="Origin">
            From Gujarat
            <br />
            to <span className="serif">California.</span>
          </ChapterTitle>
          <Split as="p" className="lede mt-10">
            Hi, I'm Vraj. I studied Computer Science and Engineering at CHARUSAT in Gujarat, shipped full-stack products
            through three internships, and moved to San José for an MS in Applied Data Intelligence. Now my work is data
            and machine learning: the pipelines, the models and the products around them.
          </Split>
          <Split as="p" className="mt-6 leading-relaxed text-ink-2">
            I like work that mixes logic with creativity, and I care about things that are both useful and well made.
            Away from the desk it's basketball, cricket and football.
          </Split>
        </div>

        <div className="mt-[30svh] max-w-xl md:mt-[38svh]">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)]">
            {stats.map((s) => (
              <div key={s.label} className="bg-[var(--panel)] p-6">
                <dt className="kicker">{s.label}</dt>
                <dd className="mt-3 text-5xl font-semibold tracking-[-0.04em]">
                  <CountUp value={s.value} decimals={s.decimals} />
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="kicker mt-14">What I focus on</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {focus.map(({ title, detail, Icon }) => (
              <li key={title} className="panel rounded-3xl p-5">
                <Icon size={20} className="text-accent" aria-hidden="true" />
                <p className="mt-4 font-medium">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
