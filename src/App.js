import React, { useEffect, useRef, useState } from 'react';
import './index.css';

function Scene({ id, bgClass, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className={`scene ${bgClass} ${visible ? 'visible' : ''}`}>
      {children}
    </section>
  );
}

function StarField({ count = 60 }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 1.5 + Math.random() * 2,
  }));
  return (
    <>
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          width: s.size, height: s.size,
          top: `${s.top}%`, left: `${s.left}%`,
          animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s`,
        }} />
      ))}
    </>
  );
}

function RainDrops() {
  const drops = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.8 + Math.random() * 0.6,
    opacity: 0.2 + Math.random() * 0.3,
  }));
  return (
    <div className="rain-container">
      {drops.map(d => (
        <div key={d.id} className="raindrop" style={{
          left: `${d.left}%`,
          animationDelay: `${d.delay}s`,
          animationDuration: `${d.duration}s`,
          opacity: d.opacity,
        }} />
      ))}
    </div>
  );
}

export default function App() {
  const sceneIds = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13','s14'];
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const observers = sceneIds.map((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveScene(idx); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);// eslint-disable-line

  const scrollToScene = (idx) => {
    const el = document.getElementById(sceneIds[idx]);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <nav className="progress-nav" aria-label="Story progress">
        {sceneIds.map((_, idx) => (
          <button key={idx} className={`dot ${activeScene === idx ? 'active' : ''}`}
            onClick={() => scrollToScene(idx)} title={`Scene ${idx + 1}`} aria-label={`Go to scene ${idx + 1}`} />
        ))}
      </nav>

      {/* ── S1: Title ── */}
      <Scene id="s1" bgClass="scene-s1">
        <div className="bg-blob" style={{ width:300,height:300,background:'#b8d4f0',top:-60,left:-80 }} />
        <div className="bg-blob" style={{ width:200,height:200,background:'#dbbff5',bottom:40,right:-40 }} />
        <div className="scene-inner">
          <div className="title-card">
            <span className="illustration slow">🐱</span>
            <div className="story-title">The Cat &amp; The Owl</div>
            <div className="story-subtitle">A tale of two distant insomniacs finding their way</div>
            <div style={{ margin:'24px 0 8px' }}>
              <p className="story-text">Once upon a time, there was a small kitty cat who lived in a far away land — separated from all his kitten friends, yearning to come back home.</p>
            </div>
            <div className="scroll-hint">
              <div className="scroll-arrow">↓</div>
              <span>scroll to continue</span>
            </div>
          </div>
        </div>
      </Scene>

      {/* ── S2: Message from a friend ── */}
      <Scene id="s2" bgClass="scene-s2">
        <div className="bg-blob" style={{ width:250,height:250,background:'#ffc8a0',top:-50,right:-60 }} />
        <div className="scene-inner">
          <div className="scene-card">
            <span className="chapter-tag">Chapter 1 — A rumour on the wind</span>
            <span className="illustration">🐾</span>
            <h2>A Message from a Friend</h2>
            <p className="story-text">One day, through one of his bestie kitten friends, the kitty came to know about a curious owl</p>
            <p className="story-text">Being the idiot he is he messed up even before getting to know her</p>
            <div className="chat-bubbles" style={{ marginTop:20 }}>
              <div className="bubble">
                <div className="bubble-avatar">🐾</div>
                <div className="bubble-text">"Hey, I know I messed up, I am <em>so sorry</em>"</div>
              </div>
              <div className="bubble right">
                <div className="bubble-avatar">🦉</div>
                <div className="bubble-text">"This can only be remedied by chocolates"</div>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* ── S3: Midnight owl ── */}
      <Scene id="s3" bgClass="scene-s3">
        <StarField />
        <div className="scene-inner">
          <div className="scene-card dark-card">
            <span className="chapter-tag light">Chapter 2 — Under the moon</span>
            <span className="illustration twinkle" style={{ fontSize:70 }}>🦉</span>
            <h2 className="light">The Owl Who Spoke at Midnight</h2>
            <p className="story-text light">The kitty noticed something strange — the owl only ever appeared very late at night. <em>Why?</em> What kept her awake when all the world was sleeping?</p>
            <p className="story-text light">On one such late night texting session he asked the owl about this, and what he found surprised him. The owl was carrying something incredibly difficult — a challenge she was quietly battling all on her own, doing her very best to conquer it.</p>
            <div style={{ marginTop:20,fontSize:38,opacity:0.85 }}>🩺🥼💉</div>
          </div>
        </div>
      </Scene>

      {/* ── S4: Everyday chats ── */}
      <Scene id="s4" bgClass="scene-s4">
        <div className="bg-blob" style={{ width:280,height:280,background:'#a8e6cf',top:-60,right:-70 }} />
        <div className="bg-blob" style={{ width:180,height:180,background:'#fffacd',bottom:-30,left:-40 }} />
        <div className="scene-inner">
          <div className="scene-card">
            <span className="chapter-tag">Chapter 3 — Simple joys</span>
            <span className="illustration" style={{ fontSize:65 }}>💬</span>
            <h2>Every other Day</h2>
            <p className="story-text">The kitty and the owl started chatting every day. They found each other's simple little lives endlessly interesting.</p>
            <div className="chat-bubbles">
              <div className="bubble">
                <div className="bubble-avatar">🦉</div>
                <div className="bubble-text">"I CAPTURED ORION TODAY. YOU WILL BE PROUD!!"</div>
              </div>
              <div className="bubble right">
                <div className="bubble-avatar">🐱</div>
                <div className="bubble-text">"Yayyyy. I'm so proud 🥳🥳"</div>
              </div>
              <div className="bubble">
                <div className="bubble-avatar">🦉</div>
                <div className="bubble-text">"LALALALALALA 💃"</div>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* ── S5: Flowers ── */}
      <Scene id="s5" bgClass="scene-s5">
        <div className="bg-blob" style={{ width:260,height:260,background:'#ffb3c6',bottom:-40,left:-60 }} />
        <div className="scene-inner">
          <div className="scene-card">
            <span className="chapter-tag">Chapter 4 — Blooming</span>
            <h2>A Love for Flowers 🌸</h2>
            <div className="flowers-row">
              {['🌷','🌸','🌼','🌺','🌻'].map((f,i) => (
                <span key={i} className="flower" style={{ animationDelay:`${i*0.3}s` }}>{f}</span>
              ))}
            </div>
            <p className="story-text">Among all the things they shared, both discovered a deep love for flowers — a little  universe of petals and colour that was entirely theirs.</p>
            <div className="flowers-row" style={{ marginTop:4 }}>
              {['🌹','💐','🪷'].map((f,i) => (
                <span key={i} className="flower" style={{ animationDelay:`${i*0.4}s` }}>{f}</span>
              ))}
            </div>
          </div>
        </div>
      </Scene>

      {/* ── S6: Plans to meet ── */}
      <Scene id="s6" bgClass="scene-s6">
        <div className="bg-blob" style={{ width:300,height:300,background:'#ffd700',opacity:0.12,top:-80,left:-80 }} />
        <div className="scene-inner">
          <div className="scene-card">
            <span className="chapter-tag">Chapter 5 — The big day approaches</span>
            <h2>Coming Home 🏡</h2>
            <p className="story-text">The kitty made it back to his hometown with all the chocolates that he promised for owlie. And soon after, they made plans to see each other. For the very first time.</p>
            <div className="meeting-characters">
              <div className="char-left">🐱</div>
              <div className="hearts-between">
                <span className="heart-pop" style={{ animationDelay:'0s' }}>💜</span>
                <span className="heart-pop" style={{ animationDelay:'0.5s',fontSize:18 }}>🤩</span>
                <span className="heart-pop" style={{ animationDelay:'1s',fontSize:14 }}>🙂‍↕️</span>
              </div>
              <div className="char-right">🦉</div>
            </div>
            <div className="excited-banner">
              {['🎉','✨','🌸','🎀'].map((e,i) => (
                <span key={i} className="bounce-item" style={{ animationDelay:`${i*0.15}s` }}>{e}</span>
              ))}
            </div>
            <p className="story-text" style={{ fontWeight:700,color:'var(--text-dark)' }}>Both of them were <em>really</em> excited.</p>
          </div>
        </div>
      </Scene>

      {/* ── S7: The magical evening ── */}
      <Scene id="s7" bgClass="scene-s7">
        <div className="bg-blob" style={{ width:320,height:320,background:'#ffd6e0',top:-80,right:-80 }} />
        <div className="bg-blob" style={{ width:200,height:200,background:'#fff3c4',bottom:-40,left:-40 }} />
        <div className="scene-inner">
          <div className="scene-card">
            <span className="chapter-tag">Chapter 6 — The real life owliee</span>
            <div className="duo-emoji">
              <span className="duo-left">🐱</span>
              <span className="duo-right">🦉</span>
            </div>
            <h2>A Beautiful Evening ☀️</h2>
            <p className="story-text">They finally met — and it was everything and more. They talked and laughed for hours. The kitty had always wondered what the owl would be like in real life.</p>
            <p className="story-text">That evening, he got his answer. She was even more wonderful, adventuruos and exuberent than he had imagined. His real life owliee. 🦉✨</p>
            <div className="memory-tags">
              <span className="mem-tag">long talks</span>
              <span className="mem-tag">laughter</span>
              <span className="mem-tag">Mathilchattoms</span>
            </div>
          </div>
        </div>
      </Scene>

      {/* ── S8: Train debacle ── */}
      <Scene id="s8" bgClass="scene-s8">
        <div className="scene-inner">
          <div className="scene-card">
            <span className="chapter-tag">Chapter 7 — The midday adventure</span>
            <span className="illustration" style={{ fontSize:65 }}>🚂</span>
            <h2>The Train Debacle ☀️😅</h2>
            <p className="story-text">And then there was the midday train. The hot sun blazing overhead. The two of them rushing, laughing, probably a little lost — making a perfectly chaotic memory neither would forget.</p>
            <div className="train-scene">
              <div className="sun-pulse">☀️</div>
              <div className="train-row">
                <span className="train-char" style={{ animationDelay:'0s' }}>🐱</span>
                <span className="train-char" style={{ animationDelay:'0.2s' }}>🦉</span>
                <span className="train-emoji">🚂💨</span>
              </div>
            </div>
            <p className="story-text" style={{ fontStyle:'italic',color:'var(--text-soft)' }}>Memorable? Yes</p>
            <p className="story-text" style={{ fontStyle:'italic',color:'var(--text-soft)' }}>Almost got a heatstroke? Yes</p>
            <p className="story-text" style={{ fontStyle:'italic',color:'var(--text-soft)' }}>Will the cat do it again? Absolutely yes without even a hesitation</p>
          </div>
        </div>
      </Scene>

      {/* ── S9: The bestie ── */}
      <Scene id="s9" bgClass="scene-s9">
        <div className="bg-blob" style={{ width:260,height:260,background:'#c8b8e8',top:-60,left:-60 }} />
        <div className="scene-inner">
          <div className="scene-card">
            <span className="chapter-tag">Chapter 8 — The storm begins</span>
            <span className="illustration" style={{ fontSize:60 }}>😟</span>
            <h2>The Bestie's Hurt</h2>
            <p className="story-text">After their meet-up, the kitty's bestie reached out. He was a little hurt — the cat hadn't told them how close he'd grown to the owl, or about the trip to see her.</p>
            <p className="story-text">The cat was awestruck. A wave of guilt washed over him instantly.</p>
            <div className="thought-bubble">
              <div className="thought-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="thought-content">
                💭 <em>"It's all my fault. I need to fix everything. Right now."</em>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* ── S10: Overthinking spiral ── */}
      <Scene id="s10" bgClass="scene-s10">
        <RainDrops />
        <div className="scene-inner">
          <div className="scene-card storm-card">
            <span className="chapter-tag storm-tag">Chapter 9 — The spiral</span>
            <span className="illustration" style={{ fontSize:65,animation:'wobble 1.2s ease-in-out infinite' }}>😵‍💫</span>
            <h2 style={{ color:'#ede0ff' }}>The Overthinking Machine</h2>
            <p className="story-text light">Even though his bestie said it was just a miscommunication — all good now — the cat's mind wouldn't let it rest. His past, his pressure, his patterns all came rushing in at once.</p>
            <div className="spiral-thoughts">
              {[
                'what if I hurt everyone?',
                'I should just stop everything atleast temporarily',
                'this is all my fault',
                'why do I always mess up?',
              ].map((t, i) => (
                <div key={i} className="spiral-thought" style={{ animationDelay:`${i*0.4}s` }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </Scene>

      {/* ── S11: The white lie ── */}
      <Scene id="s11" bgClass="scene-s11">
        <div className="scene-inner">
          <div className="scene-card">
            <span className="chapter-tag">Chapter 10 — The dumb cat moment</span>
            <span className="illustration" style={{ fontSize:60 }}>💔</span>
            <h2>One White Lie</h2>
            <p className="story-text">Cornered by guilt and running out of time to think, the cat tried to start a fight with the owl — an exit, a wall. The owl saw right through it and asked for an explanation.</p>
            <p className="story-text">In his desperation, idiocricy and lack of proper thought — the cat told one white lie. And he knew, before the words even finished, that he had hurt her more than he could imagine.</p>
            <div className="chat-bubbles" style={{ marginTop:16 }}>
              <div className="bubble right">
                <div className="bubble-avatar">🐱</div>
                <div className="bubble-text" style={{ background:'rgba(255,200,200,0.7)' }}><em>[starts unnecessary fight]</em></div>
              </div>
              <div className="bubble">
                <div className="bubble-avatar">🦉</div>
                <div className="bubble-text">"What is going on? Tell me."</div>
              </div>
              <div className="bubble right">
                <div className="bubble-avatar">🐱</div>
                <div className="bubble-text" style={{ background:'rgba(255,180,180,0.7)' }}><em>[says the wrong thing entirely]</em></div>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* ── S12: The silence ── */}
      <Scene id="s12" bgClass="scene-s12">
        <StarField count={30} />
        <div className="scene-inner">
          <div className="scene-card dark-card">
            <span className="chapter-tag light">Chapter 11 — Silence</span>
            <div style={{ fontSize:55,margin:'12px 0',letterSpacing:24,opacity:0.7 }}>🐱🦉</div>
            <h2 className="light">Days of Quiet</h2>
            <p className="story-text light">The owl made it clear — she didn't want to talk to the cat. Not for a while.</p>
            <p className="story-text light">And so the cat sat with it. The guilt. The silence. The depression of knowing you caused the very thing you feared.</p>
            <div style={{ fontSize:28,margin:'20px 0',opacity:0.5,letterSpacing:8 }}>· · · · ·</div>
            <p className="story-text light" style={{ fontStyle:'italic',opacity:0.6 }}>Some nights are just long.</p>
          </div>
        </div>
      </Scene>

      {/* ── S13: He chose the owl ──
      <Scene id="s13" bgClass="scene-s13">
        <div className="bg-blob" style={{ width:280,height:280,background:'#b8e0d8',top:-60,right:-60 }} />
        <div className="bg-blob" style={{ width:200,height:200,background:'#ffd6e0',bottom:-40,left:-40 }} />
        <div className="scene-inner">
          <div className="scene-card">
            <span className="chapter-tag">Chapter 12 — What the cat chose</span>
            <span className="illustration slow">🐱</span>
            <h2>He Chose the Owl</h2>
            <p className="story-text">When his Dhanbad friends said they'd come to his hometown, the cat said no. He went to the metro instead — because that's where his owliee was.</p>
            <p className="story-text">He's not someone who gets attached easily. But somehow, he didn't want to give up. Not on her. Not on this.</p>
            <div className="choice-visual">
              <div className="choice-item faded">
                <span style={{ fontSize:32 }}>👥</span>
                <span className="choice-label">Dhanbad friends</span>
                <span className="choice-no">✗</span>
              </div>
              <div className="choice-arrow">→</div>
              <div className="choice-item chosen">
                <span style={{ fontSize:32 }}>🦉</span>
                <span className="choice-label">owliee</span>
                <span className="choice-yes">✓</span>
              </div>
            </div>
          </div>
        </div>
      </Scene> */}

      {/* ── S14: The letter ── */}
      <Scene id="s14" bgClass="scene-s14">
        <div className="bg-blob" style={{ width:300,height:300,background:'#e8d5f5',top:-80,left:-80 }} />
        <div className="bg-blob" style={{ width:220,height:220,background:'#ffd6e0',bottom:-50,right:-50 }} />
        <div className="scene-inner">
          <div className="letter-card">
            <div className="letter-header">
              <span style={{ fontSize:32 }}>🌸</span>
              <span className="letter-title">A note from the cat</span>
              <span style={{ fontSize:32 }}>🌸</span>
            </div>

            <p className="letter-text">I know you have every right to be mad at me. And I completely understand if you don't want to talk to me.</p>
            <p className="letter-text">Like you, I'm not someone who gets attached easily. But for some reason — <em>I didn't want to give up on you.</em></p>
            <p className="letter-text">That's why, when my Dhanbad friends said they'd come visit, I said no — and went to the land of the metro only to meet owliee.</p>

            <div className="letter-divider">
              {['🌷','🌸','🌼'].map((f,i) => (
                <span key={i} className="flower" style={{ fontSize:20,animationDelay:`${i*0.3}s` }}>{f}</span>
              ))}
            </div>

            <p className="letter-text">The night we spent together was one of the most free, happy and adventurous I've felt in a very long time.</p>
            <p className="letter-text">I will not forget you, owliee. I won't forget that night. And I won't forget the flowers that you gave. 🌹</p>

            <div className="letter-divider"><span style={{ fontSize:24 }}>🌹</span></div>

            <p className="letter-text" style={{ fontStyle:'italic',color:'var(--text-soft)',fontSize:15 }}>That's all this dumb cat has to say.</p>
            <p className="letter-text" style={{ fontWeight:700,color:'var(--text-dark)',fontSize:16 }}>Now it's all up to the owliee to decide. 🦉</p>

            <div className="letter-footer">
              <span style={{ fontSize:28 }}>🐱</span>
              <span className="letter-sig">— yours kitty cat</span>
            </div>
          </div>
        </div>
      </Scene>
    </>
  );
}
