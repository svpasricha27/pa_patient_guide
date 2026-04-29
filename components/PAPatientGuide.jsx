import { useState, useEffect, useRef } from "react";
import { 
  Heart, Shield, Pill, Syringe, ChevronDown, ChevronRight, 
  AlertTriangle, CheckCircle, ArrowRight, Brain, Droplets,
  Activity, Stethoscope, Zap, Clock, Users, ChevronLeft,
  Info, X, CircleDot, Minus, Plus, BookOpen, Scale,
  Scissors, Hospital, TrendingUp, ShieldCheck, Gauge,
  HelpCircle, Star, ArrowLeft, Home, Menu, ChevronUp,
  Search, Eye, FlaskConical, Scan, TestTube, FileText,
  MessageSquare, Send, Loader
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "understand", label: "What is Primary Aldosteronism?", icon: BookOpen },
  { id: "diagnosis", label: "How is the Diagnosis Made?", icon: Search },
  { id: "imaging", label: "The Role of Imaging", icon: Scan },
  { id: "dex-test", label: "Dexamethasone Suppression Test", icon: FlaskConical },
  { id: "why-treat", label: "Why Treat It", icon: Heart },
  { id: "decisions", label: "Treatment Options", icon: Scale },
  { id: "medications", label: "Medications", icon: Pill },
  { id: "avs", label: "Adrenal Vein Sampling", icon: Activity },
  { id: "surgery", label: "Surgery Guide", icon: Hospital },
];

function FadeIn({ children, delay = 0, className = "" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (<div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>{children}</div>);
}

function Accordion({ title, children, icon: Icon, defaultOpen = false, accent = "var(--teal)" }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", marginBottom: 12, background: "var(--card)", transition: "box-shadow 0.3s ease", boxShadow: open ? `0 4px 20px ${accent}15` : "none" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "18px 20px", background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 600, color: "var(--text)", fontFamily: "inherit", textAlign: "left" }}>
        {Icon && <Icon size={20} color={accent} />}
        <span style={{ flex: 1 }}>{title}</span>
        <ChevronDown size={18} color="var(--text-muted)" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }} />
      </button>
      <div style={{ maxHeight: open ? 2000 : 0, overflow: "hidden", transition: "max-height 0.5s ease" }}>
        <div style={{ padding: "0 20px 20px", color: "var(--text-secondary)", lineHeight: 1.7, fontSize: 15 }}>{children}</div>
      </div>
    </div>
  );
}

function InfoCallout({ children, type = "info" }) {
  const styles = { info: { bg: "var(--teal-light)", border: "var(--teal)", icon: Info, color: "var(--teal-dark)" }, warning: { bg: "#FFF8E7", border: "#D4A017", icon: AlertTriangle, color: "#8B6914" }, success: { bg: "#F0FAF0", border: "#2E7D32", icon: CheckCircle, color: "#1B5E20" }, tip: { bg: "#F3EEFF", border: "#6B48C8", icon: Star, color: "#4A2D8B" } };
  const s = styles[type]; const IC = s.icon;
  return (<div style={{ display: "flex", gap: 12, padding: "16px 18px", borderRadius: 12, background: s.bg, borderLeft: `4px solid ${s.border}`, margin: "16px 0", alignItems: "flex-start" }}><IC size={18} color={s.color} style={{ flexShrink: 0, marginTop: 2 }} /><div style={{ fontSize: 14, lineHeight: 1.65, color: s.color }}>{children}</div></div>);
}

function ProgressDots({ total, current }) {
  return (<div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "20px 0" }}>{Array.from({ length: total }).map((_, i) => (<div key={i} style={{ width: i === current ? 28 : 10, height: 10, borderRadius: 5, background: i === current ? "var(--teal)" : i < current ? "var(--teal-dark)" : "var(--border)", transition: "all 0.3s ease" }} />))}</div>);
}

function NavButton({ onClick, children, variant = "primary" }) {
  const isPrimary = variant === "primary";
  return (<button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: isPrimary ? "var(--teal)" : "transparent", color: isPrimary ? "white" : "var(--teal)", border: isPrimary ? "none" : "2px solid var(--teal)", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s ease" }} onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"; }} onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>{children}</button>);
}

function SectionTitle({ children, subtitle }) {
  return (<div style={{ marginBottom: 32, textAlign: "center" }}><h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "var(--text)", lineHeight: 1.2, fontFamily: "'Source Serif 4', Georgia, serif", marginBottom: subtitle ? 12 : 0 }}>{children}</h2>{subtitle && <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>{subtitle}</p>}</div>);
}

function PageNav({ prev, next, navigate }) {
  return (<div style={{ display: "flex", justifyContent: "center", marginTop: 32, gap: 12, flexWrap: "wrap" }}>{prev && <NavButton onClick={() => navigate(prev.id)} variant="secondary"><ArrowLeft size={16} /> {prev.label}</NavButton>}{next && <NavButton onClick={() => navigate(next.id)}>{next.label} <ArrowRight size={16} /></NavButton>}</div>);
}

function HomePage({ navigate }) {
  const cards = [
    { id: "understand", icon: BookOpen, color: "#2E86AB", title: "What is Primary Aldosteronism?", desc: "Understand your condition in plain language" },
    { id: "diagnosis", icon: Search, color: "#15807C", title: "How is the Diagnosis Made?", desc: "Blood tests, screening, and what the results mean" },
    { id: "imaging", icon: Scan, color: "#5C6BC0", title: "The Role of Imaging", desc: "What a CT scan can — and can't — tell you" },
    { id: "dex-test", icon: FlaskConical, color: "#8E44AD", title: "Dexamethasone Suppression Test", desc: "Checking if your adrenal also makes too much cortisol" },
    { id: "why-treat", icon: Heart, color: "#C0392B", title: "Why Treatment Matters", desc: "It's about more than just blood pressure" },
    { id: "decisions", icon: Scale, color: "#6B48C8", title: "Treatment Options", desc: "Compare medical therapy vs. surgery" },
    { id: "medications", icon: Pill, color: "#E67E22", title: "Medications", desc: "Compare medications and their side effects" },
    { id: "avs", icon: Activity, color: "#D4A017", title: "Adrenal Vein Sampling", desc: "The test that finds which adrenal is the cause" },
    { id: "surgery", icon: Hospital, color: "#2E7D32", title: "Surgery Guide", desc: "What to expect before, during, and after" },
  ];
  return (
    <div>
      <div style={{ textAlign: "center", padding: "48px 20px 40px", background: "linear-gradient(175deg, var(--teal-light) 0%, var(--bg) 70%)", borderRadius: "0 0 40px 40px", marginBottom: 40 }}>
        <FadeIn><div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)", marginBottom: 20, boxShadow: "0 8px 24px rgba(21,128,124,0.3)" }}><Shield size={32} color="white" /></div></FadeIn>
        <FadeIn delay={0.1}><h1 style={{ fontSize: "clamp(30px, 5vw, 44px)", fontWeight: 700, color: "var(--text)", lineHeight: 1.15, fontFamily: "'Source Serif 4', Georgia, serif", marginBottom: 16 }}>Your Guide to<br /><span style={{ color: "var(--teal)" }}>Primary Aldosteronism</span></h1></FadeIn>
        <FadeIn delay={0.2}><p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto 28px" }}>You've been diagnosed with primary aldosteronism — a treatable condition where your adrenal glands make too much of a hormone called aldosterone. This guide will help you understand your condition, your options, and what to expect.</p></FadeIn>
        <FadeIn delay={0.3}><div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", padding: "10px 18px", borderRadius: 30, fontSize: 13, color: "var(--teal-dark)", fontWeight: 600, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}><BookOpen size={15} />Based on the 2025 Endocrine Society Guidelines</div></FadeIn>
        <FadeIn delay={0.4}><p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 14, maxWidth: 460, margin: "14px auto 0", lineHeight: 1.5 }}>This tool is for educational purposes only and does not constitute medical advice. See full disclaimer below.</p></FadeIn>
      </div>
      <div style={{ padding: "0 20px", maxWidth: 700, margin: "0 auto" }}>
        <FadeIn><p style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--teal)", fontWeight: 700, marginBottom: 20, textAlign: "center" }}>Explore Topics</p></FadeIn>
        {cards.map((item, i) => (
          <FadeIn key={item.id} delay={0.05 * i}>
            <button onClick={() => navigate(item.id)} style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", padding: "18px 20px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, cursor: "pointer", marginBottom: 10, textAlign: "left", fontFamily: "inherit", transition: "all 0.2s ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.borderColor = item.color; e.currentTarget.style.boxShadow = `0 4px 16px ${item.color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><item.icon size={22} color={item.color} /></div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{item.title}</div><div style={{ fontSize: 13, color: "var(--text-muted)" }}>{item.desc}</div></div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </button>
          </FadeIn>
        ))}
        <FadeIn delay={0.5}><InfoCallout type="tip"><strong>Tip:</strong> You can read these sections in any order. Start with what matters most to you right now, or read them all from top to bottom.</InfoCallout></FadeIn>
      </div>
    </div>
  );
}

function UnderstandPage({ navigate }) {
  return (
    <div style={{ padding: "32px 20px", maxWidth: 700, margin: "0 auto" }}>
      <SectionTitle subtitle="A clear explanation of what's happening in your body">What is Primary Aldosteronism?</SectionTitle>
      <FadeIn>
        <div style={{ background: "linear-gradient(135deg, var(--teal-light) 0%, #E8F5F0 100%)", borderRadius: 20, padding: "28px 24px", marginBottom: 28, border: "1px solid var(--teal)20" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--teal-dark)", marginBottom: 12 }}>🧂 The Simple Explanation</h3>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-secondary)" }}>You have two small glands sitting on top of your kidneys called <strong>adrenal glands</strong>. They make a hormone called <strong>aldosterone</strong>, which tells your kidneys how much salt and water to hold onto.</p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-secondary)", marginTop: 12 }}>In primary aldosteronism, one or both adrenal glands make <strong>too much aldosterone</strong>. This causes your body to retain too much salt and water, which raises your blood pressure. It may also cause you to lose potassium, which can make you feel tired, weak, or give you muscle cramps — though many people with this condition have normal potassium levels.</p>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}><h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Key Facts</h3></FadeIn>
      {[
        { icon: Users, fact: "Primary aldosteronism affects 5–14% of people with high blood pressure — it's far more common than most doctors realize." },
        { icon: Activity, fact: "Most people with primary aldosteronism have normal potassium levels. You don't need low potassium to have this condition." },
        { icon: Zap, fact: "It is caused by overactivity in one or both adrenal glands — this can be due to a small benign growth (adenoma) or enlargement of the gland tissue (hyperplasia), on one side or both." },
        { icon: ShieldCheck, fact: "Primary aldosteronism is treatable. With the right treatment, excess cardiovascular risk can be greatly reduced, and some people are cured entirely." },
      ].map((item, i) => (
        <FadeIn key={i} delay={0.15 + i * 0.05}>
          <div style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center" }}><item.icon size={18} color="var(--teal)" /></div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>{item.fact}</p>
          </div>
        </FadeIn>
      ))}
      <FadeIn delay={0.3}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", margin: "32px 0 16px" }}>One Gland or Both?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>◐</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: "var(--text)" }}>Unilateral (One Side)</div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>One adrenal gland is the dominant source of excess aldosterone — due to a benign growth (adenoma) or gland overactivity (hyperplasia). This type can potentially be <strong>cured with surgery</strong>.</p>
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>◉</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: "var(--text)" }}>Bilateral (Both Sides)</div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>Both glands are overactive. This type is managed effectively with <strong>medication</strong> that blocks aldosterone's effects.</p>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.35}><InfoCallout type="info">Figuring out whether one or both glands are the source is a key step in choosing the right treatment for you. We'll cover that in the sections ahead.</InfoCallout></FadeIn>
      <PageNav next={{ id: "diagnosis", label: "How is the Diagnosis Made?" }} navigate={navigate} />
    </div>
  );
}

function DiagnosisPage({ navigate }) {
  return (
    <div style={{ padding: "32px 20px", maxWidth: 700, margin: "0 auto" }}>
      <SectionTitle subtitle="Understanding the blood tests used to diagnose primary aldosteronism">How is the Diagnosis Made?</SectionTitle>
      <FadeIn>
        <div style={{ background: "linear-gradient(135deg, #E8F5F4 0%, #D4EDEC 100%)", borderRadius: 20, padding: "28px 24px", marginBottom: 28, border: "1px solid #B2D8D6" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--teal-dark)", marginBottom: 12 }}>🩸 It Starts With a Simple Blood Test</h3>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-secondary)" }}>Primary aldosteronism is diagnosed through a blood test that measures two hormones: <strong>aldosterone</strong> (the hormone your adrenal glands are overproducing) and <strong>renin</strong> (a hormone from your kidneys that normally controls aldosterone). The relationship between these two — called the <strong>aldosterone-to-renin ratio (ARR)</strong> — is the key to diagnosis.</p>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>How Normal Regulation Works — and What Goes Wrong</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <div style={{ background: "#F0FAF0", borderRadius: 16, padding: 20, border: "1px solid #C8E6C9" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#2E7D32", marginBottom: 10 }}>✅ Normal</div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: "#2E5A2E" }}>Renin acts like a thermostat. When aldosterone is high enough, renin turns down. When more aldosterone is needed, renin turns up. They work in balance.</p>
          </div>
          <div style={{ background: "#FFF4F4", borderRadius: 16, padding: 20, border: "1px solid #F5C6C6" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#C0392B", marginBottom: 10 }}>⚠️ In Primary Aldosteronism</div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: "#5A2020" }}>The adrenal gland ignores the thermostat. It keeps making aldosterone even though renin is very low, signalling "stop!" The hallmark is <strong>high aldosterone + low renin</strong>.</p>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <Accordion title="What does the screening blood test involve?" icon={TestTube} defaultOpen={true} accent="var(--teal)">
          <p>A blood sample is taken — ideally in the <strong>morning</strong> while you are <strong>seated</strong>. The lab measures three things:</p>
          <div style={{ margin: "16px 0" }}>
            {[
              { label: "Aldosterone", desc: "The hormone being overproduced. Should be measured by a reliable method (immunoassay or the more precise LC-MS/MS)." },
              { label: "Renin", desc: "The regulatory hormone from your kidneys. In primary aldosteronism this is typically low or suppressed — this is the hallmark of the diagnosis." },
              { label: "Potassium", desc: "Not used for screening itself, but important because low potassium can falsely lower your aldosterone result and mask the diagnosis." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: "var(--teal)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{i + 1}</div>
                <div><strong style={{ color: "var(--text)" }}>{item.label}:</strong> <span>{item.desc}</span></div>
              </div>
            ))}
          </div>
          <p>The doctor then calculates the <strong>aldosterone-to-renin ratio (ARR)</strong>. A positive screen typically means renin is suppressed <em>and</em> the ARR is elevated above a certain threshold.</p>
        </Accordion>
      </FadeIn>
      <FadeIn delay={0.2}>
        <Accordion title="What makes a screening test positive?" icon={CheckCircle} accent="#2E7D32">
          <p>A positive screen generally requires <strong>both</strong> of the following:</p>
          <div style={{ margin: "12px 0" }}>
            <div style={{ background: "var(--teal-light)", borderRadius: 10, padding: 14, marginBottom: 8 }}>
              <strong style={{ color: "var(--teal-dark)" }}>1. Low/suppressed renin</strong>
              <span style={{ fontSize: 14, display: "block", marginTop: 4 }}>This is the hallmark. If your renin is not suppressed, primary aldosteronism is unlikely (with rare exceptions).</span>
            </div>
            <div style={{ background: "var(--teal-light)", borderRadius: 10, padding: 14 }}>
              <strong style={{ color: "var(--teal-dark)" }}>2. Elevated aldosterone relative to renin (high ARR)</strong>
              <span style={{ fontSize: 14, display: "block", marginTop: 4 }}>The exact thresholds vary depending on the lab and the type of assay used. Your doctor will interpret the results using cut-offs appropriate for your local laboratory.</span>
            </div>
          </div>
          <InfoCallout type="info">No single number is perfect — there is always a trade-off between catching every case and avoiding false alarms. Your doctor will interpret results in the context of your overall clinical picture.</InfoCallout>
        </Accordion>
      </FadeIn>
      <FadeIn delay={0.25}>
        <Accordion title="Can my medications affect the results?" icon={Pill} accent="#E67E22">
          <p>Yes — some blood pressure medications can affect aldosterone and renin levels, potentially causing false-positive or false-negative results:</p>
          <div style={{ margin: "12px 0" }}>
            <div style={{ background: "#FFF8E7", borderRadius: 10, padding: 14, marginBottom: 8 }}>
              <strong style={{ color: "#8B6914" }}>Medications that can cause false positives</strong>
              <span style={{ fontSize: 14, display: "block", marginTop: 4 }}>Beta-blockers and clonidine can lower renin, making the ARR appear artificially high. If you screen positive on these, your doctor may repeat the test after stopping them for 2 weeks (if safe).</span>
            </div>
            <div style={{ background: "#FFF4F4", borderRadius: 10, padding: 14 }}>
              <strong style={{ color: "#8B2020" }}>Medications that can cause false negatives</strong>
              <span style={{ fontSize: 14, display: "block", marginTop: 4 }}>ACE inhibitors, ARBs, diuretics (including spironolactone and amiloride), and SGLT2 inhibitors can raise renin or lower aldosterone, potentially masking primary aldosteronism. If your screen is negative but your doctor suspects the condition, they may repeat the test after adjusting medications.</span>
            </div>
          </div>
          <p>Your doctor may choose one of three approaches: <strong>no medication withdrawal</strong> (simplest, but requires careful interpretation), <strong>minimal withdrawal</strong> (stopping only the strongest confounders), or <strong>full withdrawal</strong> (most accurate, but not always safe or practical).</p>
          <InfoCallout type="tip"><strong>Good news:</strong> Screening can still be reasonably accurate even if you stay on most of your medications. The 2025 guidelines provide your doctor with practical pathways for interpreting results on medications.</InfoCallout>
        </Accordion>
      </FadeIn>
      <FadeIn delay={0.3}>
        <Accordion title="What if my test is negative but my doctor still suspects PA?" icon={HelpCircle} accent="#6B48C8">
          <p>A negative screening test doesn't always rule out primary aldosteronism. Your doctor may recommend <strong>repeating the test</strong> on a different day if:</p>
          <div style={{ margin: "8px 0" }}>
            {["You have low potassium (which can falsely lower aldosterone)", "You are on medications that raise renin or lower aldosterone", "You have resistant hypertension (blood pressure not controlled on 3+ medications)", "Your renin is suppressed but aldosterone is borderline (just below the threshold)"].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><ChevronRight size={14} color="#6B48C8" style={{ flexShrink: 0, marginTop: 3 }} /><span style={{ fontSize: 14 }}>{item}</span></div>
            ))}
          </div>
          <p style={{ marginTop: 8 }}>If potassium is low, it should be corrected before retesting. If you're on strongly interfering medications, stopping them for a period (4 weeks for spironolactone/amiloride/diuretics; 2 weeks for ACE inhibitors/ARBs) may be recommended.</p>
        </Accordion>
      </FadeIn>
      <FadeIn delay={0.35}>
        <Accordion title="When should I be re-screened in the future?" icon={Clock} accent="#2E86AB">
          <p>Even if your initial screen was negative, your doctor may re-screen you if you develop any of the following:</p>
          <div style={{ margin: "8px 0" }}>
            {["Worsening hypertension or new resistant hypertension", "New spontaneous or diuretic-induced low potassium", "Atrial fibrillation (irregular heart rhythm) without another clear cause"].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><AlertTriangle size={14} color="#2E86AB" style={{ flexShrink: 0, marginTop: 3 }} /><span style={{ fontSize: 14 }}>{item}</span></div>
            ))}
          </div>
        </Accordion>
      </FadeIn>
      <FadeIn delay={0.4}><InfoCallout type="success"><strong>Remember:</strong> Getting diagnosed is the most important first step. Primary aldosteronism is one of the most under-diagnosed conditions in medicine — fewer than 2% of people who should be tested actually are. If you've been tested and diagnosed, you're already ahead of the curve.</InfoCallout></FadeIn>
      <PageNav prev={{ id: "understand", label: "What is Primary Aldosteronism?" }} next={{ id: "imaging", label: "The Role of Imaging" }} navigate={navigate} />
    </div>
  );
}

function ImagingPage({ navigate }) {
  return (
    <div style={{ padding: "32px 20px", maxWidth: 700, margin: "0 auto" }}>
      <SectionTitle subtitle="What a CT scan can — and can't — tell you about your adrenal glands">The Role of Imaging</SectionTitle>
      <FadeIn>
        <div style={{ background: "linear-gradient(135deg, #EDE7F6 0%, #E1D5F5 100%)", borderRadius: 20, padding: "28px 24px", marginBottom: 28, border: "1px solid #C5B3E6" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#4A2D8B", marginBottom: 12 }}>🔍 Why Imaging is Done</h3>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "#3A2570" }}>Once primary aldosteronism is diagnosed (or strongly suspected), your doctor will likely order a <strong>CT scan</strong> of your adrenal glands. This is a quick, non-invasive scan that takes detailed pictures of your adrenal glands. It helps your medical team understand the anatomy — but it has important limitations you should know about.</p>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#2E7D32", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><CheckCircle size={20} color="#2E7D32" /> What a CT Scan CAN Tell You</h3>
          {["Whether there is a visible growth (nodule or adenoma) on one or both adrenal glands", "The size and appearance of any nodules found", "Whether the adrenal glands look normal, enlarged, or have other abnormalities", "It helps rule out very large masses that might need different evaluation", "It provides a 'road map' that helps plan adrenal vein sampling or surgery"].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}><div style={{ width: 6, height: 6, borderRadius: 3, flexShrink: 0, background: "#2E7D32", marginTop: 8 }} /><span style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)" }}>{item}</span></div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div style={{ background: "var(--card)", border: "2px solid #C0392B30", borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#C0392B", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}><AlertTriangle size={20} color="#C0392B" /> What a CT Scan CANNOT Tell You</h3>
          {[
            { text: "It cannot tell which gland is actually producing the excess aldosterone", bold: true },
            { text: "A visible nodule might NOT be the source — it could be a non-functioning 'incidentaloma' (a benign bump that doesn't produce hormones)", bold: false },
            { text: "A small aldosterone-producing adenoma may be too tiny to see on CT", bold: false },
            { text: "What looks like a one-sided problem on CT may actually be bilateral disease, and vice versa", bold: false },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}><X size={15} color="#C0392B" style={{ flexShrink: 0, marginTop: 2 }} /><span style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)", fontWeight: item.bold ? 600 : 400 }}>{item.text}</span></div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.2}><InfoCallout type="warning"><strong>This is critical:</strong> Studies show that CT scans alone misidentify the source of excess aldosterone in about <strong>38% of cases</strong>. That means relying on CT alone would lead to the wrong treatment decision in roughly 4 out of 10 people. This is why, for patients considering surgery, adrenal vein sampling is usually needed in addition to CT.</InfoCallout></FadeIn>
      <FadeIn delay={0.25}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", margin: "28px 0 16px" }}>Common CT Scan Scenarios</h3>
        {[
          { scenario: "CT shows a nodule on one side, nothing on the other", icon: "◐", explain: "This looks like it could be a one-sided problem — but it isn't proof. The nodule might be a non-functioning incidentaloma (especially if you're over 35), or there could be a tiny adenoma on the other side that CT missed. Adrenal vein sampling is still recommended before surgery in most cases." },
          { scenario: "CT shows nodules on both sides", icon: "◉", explain: "This could mean bilateral disease, but not necessarily. One nodule could be the source and the other non-functioning. Again, adrenal vein sampling can sort this out if surgery is being considered." },
          { scenario: "CT shows normal-looking adrenal glands", icon: "○", explain: "This doesn't rule out primary aldosteronism. Some aldosterone-producing adenomas are very small (under 1 cm) and invisible on CT. Or the excess production could come from microscopic areas of overactivity across both glands." },
        ].map((s, i) => (
          <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}><span style={{ fontSize: 24 }}>{s.icon}</span><span style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{s.scenario}</span></div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>{s.explain}</p>
          </div>
        ))}
      </FadeIn>
      <FadeIn delay={0.3}>
        <div style={{ background: "#F0FAF0", border: "1px solid #C8E6C9", borderRadius: 16, padding: 20, marginTop: 8 }}>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: "#2E7D32", marginBottom: 10 }}>🎯 When CT might be enough on its own</h4>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: "#2E5A2E" }}>There is one notable exception: in <strong>young patients (under 35 years old)</strong> with severe primary aldosteronism (low potassium, very high aldosterone, suppressed renin) who have a <strong>clear single adrenal nodule larger than 1 cm</strong> on CT — adrenal vein sampling may not be necessary. This is because non-functioning adrenal bumps are very rare in young people (under 0.3%), so a visible nodule in this setting is very likely to be the source.</p>
        </div>
      </FadeIn>
      <FadeIn delay={0.35}><InfoCallout type="info"><strong>Bottom line:</strong> A CT scan is an important piece of the puzzle, but for most patients it's just the starting point — not the final answer. Think of it as a map of the territory. To know which gland is actually the source, adrenal vein sampling provides the functional information that CT cannot.</InfoCallout></FadeIn>
      <PageNav prev={{ id: "diagnosis", label: "Diagnosis" }} next={{ id: "dex-test", label: "Dexamethasone Suppression Test" }} navigate={navigate} />
    </div>
  );
}

function DexTestPage({ navigate }) {
  return (
    <div style={{ padding: "32px 20px", maxWidth: 700, margin: "0 auto" }}>
      <SectionTitle subtitle="Why this simple overnight test matters if you have primary aldosteronism and an adrenal adenoma">Dexamethasone Suppression Test</SectionTitle>
      <FadeIn>
        <div style={{ background: "linear-gradient(135deg, #F3E5F5 0%, #E8D0F0 100%)", borderRadius: 20, padding: "28px 24px", marginBottom: 28, border: "1px solid #CE93D8" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#6A1B9A", marginBottom: 12 }}>💊 What Is This Test For?</h3>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4A148C" }}>Your adrenal glands make several hormones — not just aldosterone. One of the most important is <strong>cortisol</strong>, sometimes called the "stress hormone." In some people with primary aldosteronism and an adrenal adenoma (a benign growth), the adenoma produces <strong>both aldosterone and cortisol</strong>. This happens in roughly <strong>5–27%</strong> of cases. The dexamethasone suppression test checks whether your adrenal adenoma is also making too much cortisol.</p>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Why Does This Matter?</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { icon: Heart, color: "#C0392B", title: "Extra health risks", desc: "Excess cortisol (even mild amounts) can worsen blood sugar control, increase cardiovascular risk, weaken bones, and affect blood pressure — on top of the effects from excess aldosterone." },
            { icon: Activity, color: "#D4A017", title: "Affects adrenal vein sampling interpretation", desc: "If one adrenal is also overproducing cortisol, it can confuse the results of adrenal vein sampling (AVS). Knowing about this in advance helps your team plan the procedure correctly — for example, they may measure an additional substance called metanephrine during AVS to get accurate results." },
            { icon: Hospital, color: "#2E7D32", title: "Critical for surgical planning", desc: "If your adenoma is making both aldosterone and cortisol, removing that adrenal gland means your body will temporarily lose its source of cortisol. Your remaining adrenal gland may have been \"asleep\" (suppressed by the excess cortisol) and needs time to wake up. You may need temporary cortisol replacement medication after surgery to stay safe." },
          ].map((item, i) => (
            <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}><item.icon size={18} color={item.color} /></div>
              <div><div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 4 }}>{item.title}</div><p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", margin: "32px 0 16px" }}>How the Test Works</h3>
        <div style={{ background: "var(--card)", border: "2px solid var(--teal)", borderRadius: 20, padding: 24 }}>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-secondary)", marginBottom: 16 }}>The 1-mg overnight dexamethasone suppression test is simple, safe, and can be done at home:</p>
          {[
            { time: "11:00 PM – Midnight", icon: "🌙", action: "Take 1 mg of dexamethasone (a small tablet) by mouth. Your doctor will give you a prescription for this." },
            { time: "Go to sleep", icon: "😴", action: "The dexamethasone works overnight. In a healthy person, it tells the brain to stop stimulating cortisol production." },
            { time: "8:00 – 9:00 AM next morning", icon: "🌅", action: "Go to the lab for a blood draw to measure your cortisol level. This should be done before eating if possible." },
            { time: "Results", icon: "📊", action: "Your doctor reviews the cortisol result. If cortisol suppresses to a low level, it's reassuring. If it stays elevated, further evaluation may be needed." },
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < 3 ? 16 : 0, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: "var(--teal-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{step.icon}</div>
              <div><div style={{ fontWeight: 700, fontSize: 14, color: "var(--teal-dark)", marginBottom: 2 }}>{step.time}</div><p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>{step.action}</p></div>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.25}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", margin: "28px 0 16px" }}>Interpreting the Results</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: "#F0FAF0", borderRadius: 16, padding: 20, border: "1px solid #C8E6C9", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#2E7D32", marginBottom: 8 }}>Cortisol ≤ 1.8 μg/dL</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#2E5A2E" }}><strong>Normal suppression.</strong> Your adenoma is likely producing only aldosterone, not excess cortisol. No further cortisol workup typically needed.</p>
          </div>
          <div style={{ background: "#FFF8E7", borderRadius: 16, padding: 20, border: "1px solid #E8D5A0", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>⚠️</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#8B6914", marginBottom: 8 }}>{"Cortisol > 1.8 μg/dL"}</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#5A4510" }}><strong>Incomplete suppression.</strong> This suggests the adenoma may also be producing cortisol autonomously. Further evaluation (24-hour urine cortisol, midnight salivary cortisol) is recommended.</p>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.3}>
        <Accordion title="What if my test is positive (cortisol doesn't suppress)?" icon={HelpCircle} accent="#8E44AD">
          <p>Don't panic — this is a common finding, and it's much better to know about it before surgery than after. Here's what happens next:</p>
          <div style={{ margin: "12px 0" }}>
            {["Your doctor will likely order additional confirmatory tests (24-hour urine free cortisol, late-night salivary cortisol) to understand the degree of cortisol excess", "If adrenal vein sampling is planned, the team may measure metanephrine in addition to cortisol and aldosterone to get accurate lateralization results", "If you proceed to surgery, your surgeon and hypertension specialist will plan for possible temporary adrenal insufficiency — you may need to take cortisol replacement (hydrocortisone) for weeks to months after surgery until your remaining adrenal gland 'wakes up'", "Your morning cortisol level will be checked after surgery to determine when it's safe to stop the cortisol replacement"].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}><ChevronRight size={14} color="#8E44AD" style={{ flexShrink: 0, marginTop: 3 }} /><span style={{ fontSize: 14 }}>{item}</span></div>
            ))}
          </div>
        </Accordion>
      </FadeIn>
      <FadeIn delay={0.35}>
        <Accordion title="Are there any downsides to this test?" icon={AlertTriangle} accent="#D4A017">
          <p>The test is very safe. You're taking a single low dose of dexamethasone — side effects from one dose are extremely rare. The main considerations are:</p>
          <div style={{ margin: "8px 0" }}>
            {["False positives can occur if you forgot to take the dexamethasone, or if you take certain medications that break down dexamethasone faster (like some anti-seizure medications)", "Obesity, major depression, significant alcohol use, or acute illness can occasionally cause false positive results", "Oral estrogen (e.g., birth control pills) can raise the protein that carries cortisol, leading to a falsely elevated result — let your doctor know if you take these"].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><Info size={14} color="#D4A017" style={{ flexShrink: 0, marginTop: 3 }} /><span style={{ fontSize: 14 }}>{item}</span></div>
            ))}
          </div>
          <p style={{ marginTop: 8 }}>If there's any question about the result, your doctor can check whether dexamethasone was adequately absorbed by measuring the dexamethasone level in the blood sample.</p>
        </Accordion>
      </FadeIn>
      <FadeIn delay={0.4}><InfoCallout type="success"><strong>Key takeaway:</strong> The 2025 guidelines recommend that <strong>all patients with primary aldosteronism and an adrenal adenoma</strong> have this simple overnight test. It's quick, safe, low-cost, and the information it provides can meaningfully change how your care is managed — especially if you're heading toward surgery.</InfoCallout></FadeIn>
      <PageNav prev={{ id: "imaging", label: "Role of Imaging" }} next={{ id: "why-treat", label: "Why Treatment Matters" }} navigate={navigate} />
    </div>
  );
}

function WhyTreatPage({ navigate }) {
  const [showCompare, setShowCompare] = useState(false);
  return (
    <div style={{ padding: "32px 20px", maxWidth: 700, margin: "0 auto" }}>
      <SectionTitle subtitle="Treating the excess aldosterone — not just the high blood pressure — is essential">Why Treatment Matters</SectionTitle>
      <FadeIn>
        <div style={{ background: "linear-gradient(135deg, #FFF4F4 0%, #FFEAEA 100%)", borderRadius: 20, padding: "28px 24px", marginBottom: 28, border: "1px solid #F5C6C6" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#8B2020", marginBottom: 12 }}>⚠️ It's Not Just About Blood Pressure</h3>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "#5A2020" }}>Too much aldosterone does harm to your body <strong>beyond</strong> raising your blood pressure. Even if your blood pressure is controlled with standard medications, the excess aldosterone continues to damage your heart, blood vessels, and kidneys. That's why getting the aldosterone itself under control — not just the blood pressure — is so important.</p>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}><h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Aldosterone's Effects on Your Body</h3></FadeIn>
      {[
        { icon: Heart, color: "#C0392B", title: "Heart", items: ["Thickens and stiffens the heart muscle", "Increases risk of heart failure (about 2× higher)", "Increases risk of atrial fibrillation (about 3.5× higher)"] },
        { icon: Brain, color: "#6B48C8", title: "Brain & Blood Vessels", items: ["Increases risk of stroke (about 2.5× higher)", "Stiffens and damages blood vessel walls", "Increases risk of coronary artery disease"] },
        { icon: Droplets, color: "#2E86AB", title: "Kidneys", items: ["Causes protein to leak into urine (kidney damage)", "Can lead to progressive kidney disease over time"] },
        { icon: Zap, color: "#D4A017", title: "Overall Wellbeing", items: ["Fatigue, muscle weakness, and cramps if potassium is low (not everyone has low potassium)", "Reduced quality of life and psychological wellbeing", "More anxiety and lower mood reported by many patients"] },
      ].map((group, i) => (
        <FadeIn key={i} delay={0.15 + i * 0.05}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><group.icon size={20} color={group.color} /><span style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>{group.title}</span></div>
            {group.items.map((item, j) => (<div key={j} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><div style={{ width: 6, height: 6, borderRadius: 3, flexShrink: 0, background: group.color, marginTop: 8 }} /><span style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)" }}>{item}</span></div>))}
          </div>
        </FadeIn>
      ))}
      <FadeIn delay={0.35}><InfoCallout type="success"><strong>The good news:</strong> When primary aldosteronism is treated properly — with the right medication or surgery — these excess risks can be significantly reduced, and in many surgical cases, effectively eliminated.</InfoCallout></FadeIn>
      <FadeIn delay={0.4}>
        <div style={{ background: "var(--card)", border: "2px solid var(--teal)", borderRadius: 20, padding: "24px", marginTop: 24 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--teal-dark)", marginBottom: 12 }}>Standard BP Meds vs. PA-Specific Treatment</h3>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-secondary)", marginBottom: 16 }}>Standard blood pressure medications (like ACE inhibitors or ARBs) can lower your blood pressure, but they don't block the damage that excess aldosterone causes directly to your organs. PA-specific treatment targets the aldosterone itself.</p>
          <button onClick={() => setShowCompare(!showCompare)} style={{ background: "var(--teal-light)", border: "none", borderRadius: 10, padding: "10px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "var(--teal-dark)", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
            {showCompare ? "Hide" : "Show"} Comparison <ChevronDown size={16} style={{ transform: showCompare ? "rotate(180deg)" : "none", transition: "0.3s" }} />
          </button>
          {showCompare && (<div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#FFF4F4", borderRadius: 12, padding: 16 }}><div style={{ fontWeight: 700, fontSize: 14, color: "#8B2020", marginBottom: 8 }}>❌ Standard BP Meds Alone</div><div style={{ fontSize: 13, lineHeight: 1.6, color: "#5A2020" }}>Lowers blood pressure but excess aldosterone still damages heart, kidneys, and blood vessels. Cardiovascular risk remains elevated.</div></div>
            <div style={{ background: "#F0FAF0", borderRadius: 12, padding: 16 }}><div style={{ fontWeight: 700, fontSize: 14, color: "#1B5E20", marginBottom: 8 }}>✅ PA-Specific Treatment</div><div style={{ fontSize: 13, lineHeight: 1.6, color: "#1B5E20" }}>Blocks aldosterone's effects (medication) or removes the source (surgery). Reduces excess cardiovascular risk and corrects potassium.</div></div>
          </div>)}
        </div>
      </FadeIn>
      <PageNav prev={{ id: "dex-test", label: "Dexamethasone Test" }} next={{ id: "decisions", label: "Treatment Options" }} navigate={navigate} />
    </div>
  );
}

function DecisionsPage({ navigate }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: "user_role", q: "Before we begin — how are you using this tool today?", options: ["I'm a healthcare professional exploring the tool", "I'm a patient previewing or testing the tool", "I'm a patient using this to help with my own care decisions"] },
    { id: "age", q: "How old are you?", options: ["Under 35", "35–50", "51–65", "Over 65"] },
    { id: "htn_duration", q: "How long have you had high blood pressure?", options: ["Less than 5 years", "5–10 years", "More than 10 years", "I'm not sure"] },
    { id: "bp_meds", q: "How many blood pressure medications are you currently taking?", options: ["0–1 medications", "2 medications", "3 or more medications"] },
    { id: "potassium", q: "Have you ever been told you have low potassium (hypokalemia)?", options: ["Yes — I've needed potassium supplements", "Yes — it was mildly low once or twice", "No / I don't think so"] },
    { id: "bp_control", q: "What is your blood pressure typically on your current medications?", options: ["Well controlled (under 140/90 most of the time)", "Somewhat controlled (140–160 / 90–100 range)", "Poorly controlled (often above 160/100 despite medications)"] },
    { id: "surgery_feel", q: "How do you feel about the idea of surgery?", options: ["I'd welcome it if it could cure me — I'd love to stop medications", "I'm open to it if the benefits are clearly worth it", "I'd rather avoid surgery and manage with medication if possible", "I'm not sure yet — I need to learn more"] },
    { id: "meds_feel", q: "How do you feel about taking a daily medication long-term?", options: ["I'm fine with it — I already take other medications daily", "I'd accept it, but I'd prefer not to if there's an alternative", "I really want to avoid lifelong medication if possible"] },
    { id: "health", q: "How would you describe your overall health and fitness?", options: ["Generally healthy — I'm active and have few other medical problems", "Some health issues, but I manage day-to-day activities well", "Multiple significant health conditions or I'm quite frail"] },
  ];

  const getScore = () => {
    // PASO-aligned: likelihood of good surgical outcome
    let surgicalBenefit = 0; // higher = more likely to benefit from surgery
    let surgicalFit = 0; // higher = better candidate physically
    let prefSurgery = 0; // higher = more desire for surgery

    // Age (younger = better surgical outcomes)
    const age = answers.age;
    if (age === 0) surgicalBenefit += 3;
    else if (age === 1) surgicalBenefit += 2;
    else if (age === 2) surgicalBenefit += 1;

    // HTN duration (shorter = much better outcomes — key PASO factor)
    const dur = answers.htn_duration;
    if (dur === 0) surgicalBenefit += 3;
    else if (dur === 1) surgicalBenefit += 1;
    else if (dur === 2) surgicalBenefit += 0;
    else surgicalBenefit += 1; // unsure, neutral

    // BP meds (fewer = better PASO outcomes, but more = more to gain)
    const meds = answers.bp_meds;
    if (meds === 0) surgicalBenefit += 2;
    else if (meds === 1) surgicalBenefit += 1;
    // 3+ meds also means more severe PA = possibly more to gain from surgery
    else surgicalBenefit += 1;

    // Low potassium (suggests more severe/lateralized PA)
    const k = answers.potassium;
    if (k === 0) surgicalBenefit += 2;
    else if (k === 1) surgicalBenefit += 1;

    // BP control (poor control = more incentive to pursue surgery)
    const bp = answers.bp_control;
    if (bp === 2) surgicalBenefit += 2;
    else if (bp === 1) surgicalBenefit += 1;

    // Surgery preference
    const sf = answers.surgery_feel;
    if (sf === 0) prefSurgery += 3;
    else if (sf === 1) prefSurgery += 2;
    else if (sf === 2) prefSurgery += 0;
    else prefSurgery += 1;

    // Med preference (inverse — disliking meds pushes toward surgery)
    const mf = answers.meds_feel;
    if (mf === 2) prefSurgery += 2;
    else if (mf === 1) prefSurgery += 1;

    // Health/fitness for surgery
    const h = answers.health;
    if (h === 0) surgicalFit += 3;
    else if (h === 1) surgicalFit += 1;
    else surgicalFit += -2;

    return { surgicalBenefit, surgicalFit, prefSurgery, total: surgicalBenefit + surgicalFit + prefSurgery };
  };

  const getResult = () => {
    const s = getScore();
    // Not fit for surgery
    if (s.surgicalFit < 0) return "medical-fitness";
    // Strong preference to avoid surgery
    if (s.prefSurgery === 0 && s.surgicalBenefit < 6) return "medical-preference";
    // Great surgical candidate
    if (s.total >= 12 && s.surgicalFit >= 1) return "strong-surgical";
    // Moderate candidate — AVS worth pursuing
    if (s.total >= 7 && s.prefSurgery >= 1 && s.surgicalFit >= 1) return "consider-avs";
    // Leaning medical but could explore
    if (s.prefSurgery >= 2 && s.surgicalFit >= 1) return "explore-avs";
    // Default to medical
    return "medical-default";
  };

  const results = {
    "strong-surgical": {
      icon: Hospital, color: "#2E7D32", tagline: "Surgery could be a great option for you",
      title: "You have several factors that favour good surgical outcomes",
      body: "Based on your answers, you're relatively young and/or have had high blood pressure for a shorter time, you may have features suggesting more severe disease (like low potassium or difficult-to-control blood pressure), and you're open to surgery. These are all factors associated with better chances of blood pressure cure after adrenalectomy.",
      detail: "The next step would be adrenal vein sampling (AVS) to determine whether one adrenal gland is the source. If AVS confirms one-sided disease, surgery offers you the best chance of cure. In the meantime, your doctor may start you on medical therapy — this is safe and doesn't affect your surgical options.",
      actions: [{ label: "Learn About AVS", page: "avs" }, { label: "Surgery Guide", page: "surgery" }],
    },
    "consider-avs": {
      icon: Activity, color: "#D4A017", tagline: "Worth exploring whether surgery could help",
      title: "Investigating surgery is reasonable for you",
      body: "Your answers suggest you have some factors that could lead to a good surgical outcome, and you're at least open to the possibility. Adrenal vein sampling (AVS) would help determine if one adrenal is the source — if it is, surgery is an option worth discussing seriously with your hypertension specialist.",
      detail: "Even if AVS shows bilateral disease (meaning surgery isn't the answer), that's still valuable information — it confirms that medical therapy with an MRA is the right path, and you'll know you've explored every option. Starting medication while awaiting AVS is very reasonable.",
      actions: [{ label: "Learn About AVS", page: "avs" }, { label: "View Medications", page: "medications" }],
    },
    "explore-avs": {
      icon: Search, color: "#2E86AB", tagline: "You're motivated — let's see if surgery is possible",
      title: "Your motivation to avoid long-term medication is understandable",
      body: "While some of your clinical factors may mean the chance of complete blood pressure cure is more modest, your strong preference to explore alternatives to lifelong medication is completely valid. Adrenal vein sampling can help determine if surgery is a realistic option for you.",
      detail: "Be aware that even with successful surgery, patients with longer-standing or more difficult-to-control hypertension may still need some blood pressure medications afterward — though usually fewer. Discuss realistic expectations with your hypertension specialist.",
      actions: [{ label: "Learn About AVS", page: "avs" }, { label: "View Medications", page: "medications" }],
    },
    "medical-preference": {
      icon: Pill, color: "#15807C", tagline: "Medical therapy is an excellent choice",
      title: "Medical therapy can work very well for you",
      body: "You prefer to manage your condition with medication rather than surgery, and that's a completely valid and effective approach. Mineralocorticoid receptor antagonists (MRAs) are specifically designed to block the effects of excess aldosterone throughout your body — not just in the kidneys.",
      detail: "Many patients do extremely well on MRA therapy long-term, with excellent blood pressure control, normalized potassium, and reduced cardiovascular risk. If you ever change your mind, surgery remains an option in the future.",
      actions: [{ label: "View Medications", page: "medications" }],
    },
    "medical-fitness": {
      icon: Pill, color: "#E67E22", tagline: "Medical therapy is the safest approach for you",
      title: "Medication is the recommended path given your health",
      body: "Given your current health status, medical therapy with an MRA is the safest and most practical approach. Surgery, while minimally invasive, still carries risks that may not be justified when effective medication is available.",
      detail: "The good news is that MRA therapy is highly effective at controlling primary aldosteronism. Your doctor will titrate the dose carefully based on your blood pressure, potassium, kidney function, and renin levels. Many patients achieve excellent control with medication alone.",
      actions: [{ label: "View Medications", page: "medications" }],
    },
    "medical-default": {
      icon: Pill, color: "#6B48C8", tagline: "Starting with medication makes good sense",
      title: "Medical therapy is a strong starting point",
      body: "Based on your answers, starting with medical therapy is a very reasonable first step. MRA medications are effective for all types of primary aldosteronism, can be started right away, and don't close any doors — if you decide later you'd like to explore surgery, that remains an option.",
      detail: "You can always revisit the surgery question later once you've experienced how well medication controls your condition. Some people find medication works so well they never feel the need to pursue surgery; others decide after starting treatment that they'd like to explore a potential cure.",
      actions: [{ label: "View Medications", page: "medications" }, { label: "Learn About AVS", page: "avs" }],
    },
  };

  const showResult = showQuiz && step >= questions.length;
  const result = showResult ? results[getResult()] : null;
  const score = showResult ? getScore() : null;

  const OptionBtn = ({ text, onClick }) => (
    <button onClick={onClick}
      style={{ padding: "14px 18px", borderRadius: 12, border: "2px solid var(--border)", background: "var(--bg)", cursor: "pointer", fontSize: 15, color: "var(--text)", textAlign: "left", fontFamily: "inherit", transition: "all 0.2s ease", width: "100%" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--teal)"; e.currentTarget.style.background = "var(--teal-light)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg)"; }}>{text}</button>
  );

  return (
    <div style={{ padding: "32px 20px", maxWidth: 700, margin: "0 auto" }}>
      <SectionTitle subtitle="Understanding your two main treatment paths and which might be right for you">Treatment Options</SectionTitle>

      {/* SECTION 1: Unilateral vs Bilateral */}
      <FadeIn>
        <div style={{ background: "linear-gradient(135deg, #F3EEFF 0%, #EDE3FF 100%)", borderRadius: 20, padding: "28px 24px", marginBottom: 28, border: "1px solid #D1C4E9" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#4A2D8B", marginBottom: 12 }}>🔑 The Key Question: One Gland or Both?</h3>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "#3A2570" }}>The single most important factor in deciding between surgery and medication is whether <strong>one</strong> or <strong>both</strong> adrenal glands are overproducing aldosterone. This determines which treatment path makes sense for you.</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>◐</div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Unilateral Disease</h4>
            <div style={{ fontSize: 13, color: "var(--teal)", fontWeight: 600, marginBottom: 10 }}>~30% of diagnosed cases</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>One adrenal gland has a benign growth (adenoma) producing excess aldosterone. This type can potentially be <strong>cured with surgery</strong> to remove the affected gland.</p>
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>◉</div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Bilateral Disease</h4>
            <div style={{ fontSize: 13, color: "var(--teal)", fontWeight: 600, marginBottom: 10 }}>~70% of diagnosed cases</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>Both adrenal glands are overactive. Surgery won't help because you can't remove both. This type is managed very effectively with <strong>medication</strong>.</p>
          </div>
        </div>
      </FadeIn>

      {/* SECTION 2: How to know — AVS */}
      <FadeIn delay={0.15}>
        <div style={{ background: "var(--card)", border: "2px solid #D4A017", borderRadius: 20, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#8B6914", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><Activity size={20} color="#D4A017" />How Do You Know Which Type You Have?</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 12 }}>A CT scan shows the <em>anatomy</em> of your adrenal glands but <strong>cannot reliably tell which gland is the source</strong> — it gets it wrong about 38% of the time. The definitive way to determine if you have one-sided vs. two-sided disease is a procedure called <strong>adrenal vein sampling (AVS)</strong>.</p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 12 }}>AVS is a specialized procedure where blood is sampled directly from the veins of each adrenal gland to measure which one is producing excess aldosterone. If one side is clearly dominant (producing 4× or more aldosterone than the other), surgery on that side may cure your condition.</p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)" }}>However, AVS is an invasive test that requires an experienced interventional radiologist, and surgery itself is a significant decision. So the question becomes: <strong>is pursuing AVS and potentially surgery the right path for you, or is starting medication the better choice?</strong></p>
        </div>
      </FadeIn>

      {/* SECTION 3: Pros & Cons Comparison */}
      <FadeIn delay={0.2}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", margin: "8px 0 16px", textAlign: "center" }}>Comparing Your Two Main Paths</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 8 }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🏥</div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#2E7D32", marginBottom: 10 }}>Pursue AVS → Possible Surgery</h4>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#2E7D32", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Potential benefits</div>
            {["Chance of cure — stop PA medications entirely", "Virtually all patients see biochemical cure of excess aldosterone", "~50% achieve complete blood pressure cure (no BP meds needed)", "Most others see significant improvement — fewer meds, better control", "Quality of life improvement consistently reported"].map((p, i) => (<div key={i} style={{ display: "flex", gap: 6, marginBottom: 5, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}><Plus size={13} color="#2E7D32" style={{ flexShrink: 0, marginTop: 2 }} />{p}</div>))}
            <div style={{ fontSize: 12, fontWeight: 700, color: "#C0392B", marginBottom: 8, marginTop: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>Considerations</div>
            {["Only works if disease is one-sided (~30% of patients)", "Requires AVS first — an invasive procedure", "General anesthesia and 1–3 day hospital stay", "Surgery carries small risks (bleeding, infection)", "Not guaranteed to cure blood pressure completely", "Best outcomes in younger patients with shorter HTN history"].map((p, i) => (<div key={i} style={{ display: "flex", gap: 6, marginBottom: 5, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}><Minus size={13} color="#C0392B" style={{ flexShrink: 0, marginTop: 2 }} />{p}</div>))}
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>💊</div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--teal)", marginBottom: 10 }}>Start Medical Therapy (MRA)</h4>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#2E7D32", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Potential benefits</div>
            {["No surgery or invasive testing needed", "Effective for ALL types of PA — unilateral or bilateral", "Can start right away — no waiting for procedures", "Blocks aldosterone damage to heart, kidneys, blood vessels", "Potassium normalizes quickly (usually within days)", "Low cost (especially spironolactone)", "Doesn't close doors — surgery remains an option later"].map((p, i) => (<div key={i} style={{ display: "flex", gap: 6, marginBottom: 5, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}><Plus size={13} color="#2E7D32" style={{ flexShrink: 0, marginTop: 2 }} />{p}</div>))}
            <div style={{ fontSize: 12, fontWeight: 700, color: "#C0392B", marginBottom: 8, marginTop: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>Considerations</div>
            {["Lifelong daily medication required", "Spironolactone can cause breast tenderness/enlargement in men", "Menstrual changes possible in women", "Dose titration takes weeks to months to optimize", "Ongoing monitoring of potassium, kidney function, and renin"].map((p, i) => (<div key={i} style={{ display: "flex", gap: 6, marginBottom: 5, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}><Minus size={13} color="#C0392B" style={{ flexShrink: 0, marginTop: 2 }} />{p}</div>))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.25}>
        <InfoCallout type="info"><strong>Important:</strong> Both paths are effective treatments for primary aldosteronism. Neither is "wrong." The right choice depends on your individual situation, preferences, and what matters most to you. The questionnaire below can help you think through this.</InfoCallout>
      </FadeIn>

      {/* SECTION 4: Interactive Questionnaire */}
      <FadeIn delay={0.3}>
        <div style={{ marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 8, textAlign: "center" }}>Which Path Might Be Right for Me?</h3>
          <p style={{ fontSize: 14, color: "var(--text-muted)", textAlign: "center", marginBottom: 20, lineHeight: 1.6 }}>Answer a few questions about yourself to get a personalized starting point for discussion with your doctor. These questions are designed so <strong>you</strong> can answer them — no lab results needed.</p>

          {!showQuiz ? (
            <div style={{ textAlign: "center" }}>
              <NavButton onClick={() => setShowQuiz(true)}>Start the Questionnaire <ArrowRight size={16} /></NavButton>
            </div>
          ) : !showResult ? (
            <FadeIn key={step}>
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: "28px 24px" }}>
                <ProgressDots total={questions.length} current={step} />
                <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", marginBottom: 4 }}>Question {step + 1} of {questions.length}</p>
                <p style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", textAlign: "center", margin: "12px 0 24px", lineHeight: 1.5 }}>{questions[step].q}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {questions[step].options.map((opt, i) => (
                    <OptionBtn key={i} text={opt} onClick={() => { setAnswers({ ...answers, [questions[step].id]: i }); setStep(step + 1); }} />
                  ))}
                </div>
                {step > 0 && <button onClick={() => setStep(step - 1)} style={{ marginTop: 16, background: "none", border: "none", color: "var(--text-muted)", fontSize: 14, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}><ArrowLeft size={14} /> Back</button>}
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <div style={{ background: "var(--card)", border: `2px solid ${result.color}`, borderRadius: 20, padding: "28px 24px" }}>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${result.color}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><result.icon size={26} color={result.color} /></div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: result.color, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{result.tagline}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{result.title}</h3>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 16 }}>{result.body}</p>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 20 }}>{result.detail}</p>

                {/* Surgical outcome factors summary */}
                {score && score.surgicalFit >= 0 && (
                  <div style={{ background: "var(--bg)", borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Your factors at a glance:</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Surgical Benefit</div>
                        <div style={{ display: "flex", gap: 3, justifyContent: "center" }}>{[0,1,2].map(i => (<div key={i} style={{ width: 24, height: 8, borderRadius: 4, background: i < (score.surgicalBenefit >= 8 ? 3 : score.surgicalBenefit >= 5 ? 2 : 1) ? "#2E7D32" : "var(--border)" }} />))}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{score.surgicalBenefit >= 8 ? "Higher" : score.surgicalBenefit >= 5 ? "Moderate" : "Lower"}</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Surgical Fitness</div>
                        <div style={{ display: "flex", gap: 3, justifyContent: "center" }}>{[0,1,2].map(i => (<div key={i} style={{ width: 24, height: 8, borderRadius: 4, background: i < (score.surgicalFit >= 3 ? 3 : score.surgicalFit >= 1 ? 2 : 1) ? "#2E86AB" : "var(--border)" }} />))}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{score.surgicalFit >= 3 ? "Good" : score.surgicalFit >= 1 ? "Moderate" : "Limited"}</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Your Preference</div>
                        <div style={{ display: "flex", gap: 3, justifyContent: "center" }}>{[0,1,2].map(i => (<div key={i} style={{ width: 24, height: 8, borderRadius: 4, background: i < (score.prefSurgery >= 4 ? 3 : score.prefSurgery >= 2 ? 2 : 1) ? "#6B48C8" : "var(--border)" }} />))}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{score.prefSurgery >= 4 ? "Favours surgery" : score.prefSurgery >= 2 ? "Open to either" : "Favours medication"}</div>
                      </div>
                    </div>
                  </div>
                )}

                <InfoCallout type="tip"><strong>Bring this to your appointment.</strong> This result is a starting point for conversation with your hypertension specialist — not a final answer. Your doctor will also consider your blood test results, imaging, and other clinical factors to help you decide together.</InfoCallout>

                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
                  {result.actions.map((a, i) => (<NavButton key={i} onClick={() => navigate(a.page)} variant={i === 0 ? "primary" : "secondary"}>{a.label}</NavButton>))}
                </div>
                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <button onClick={() => { setStep(0); setAnswers({}); setShowQuiz(false); }} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 14, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>Start over</button>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </FadeIn>

      {/* Key factors box */}
      <FadeIn delay={0.35}>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginTop: 28 }}>
          <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 14 }}>📋 Factors that predict better surgical outcomes</h4>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 14 }}>Research shows that the following factors are associated with a higher chance of complete blood pressure cure after adrenalectomy:</p>
          {[
            { factor: "Younger age", detail: "Patients under 50 tend to have better outcomes" },
            { factor: "Shorter duration of hypertension", detail: "The less time you've had high blood pressure, the better — this is one of the strongest predictors" },
            { factor: "Fewer blood pressure medications before surgery", detail: "Needing fewer meds suggests less chronic vascular damage" },
            { factor: "Presence of low potassium", detail: "Paradoxically, this suggests more severe one-sided disease, which responds better to surgery" },
            { factor: "Female sex", detail: "Women have slightly better outcomes on average" },
            { factor: "No family history of hypertension", detail: "Suggests the blood pressure is entirely due to PA rather than also having an inherited tendency" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
              <CheckCircle size={15} color="var(--teal)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div><strong style={{ fontSize: 14, color: "var(--text)" }}>{item.factor}:</strong> <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{item.detail}</span></div>
            </div>
          ))}
          <InfoCallout type="warning"><strong>Remember:</strong> Even without these ideal factors, surgery can still significantly improve blood pressure control and reduce medications. And even <em>with</em> all of these factors, not every patient achieves complete cure. These are probabilities, not guarantees — your doctor can help put them in context for your specific situation.</InfoCallout>
        </div>
      </FadeIn>

      <PageNav prev={{ id: "why-treat", label: "Why Treat It" }} next={{ id: "medications", label: "Medications" }} navigate={navigate} />
    </div>
  );
}

function MedicationsPage({ navigate }) {
  const [selectedMed, setSelectedMed] = useState(null);
  const meds = [
    { name: "Spironolactone", type: "MRA (First-line)", badge: "Most Common", badgeColor: "#2E7D32", cost: "$", startDose: "12.5–25 mg/day", typicalDose: "50–100 mg/day", maxDose: "Up to 200 mg/day", pros: ["Lowest cost — very affordable", "Most widely available worldwide", "Decades of clinical experience", "Most clinical evidence for primary aldosteronism"], cons: ["Anti-androgen effects (because it also blocks testosterone)", "Breast tenderness or enlargement in men (gynecomastia) — dose-related", "Menstrual irregularities in women", "Sexual side effects possible"], notes: "Spironolactone is recommended as first-line because of its low cost and wide availability. Side effects are dose-dependent — starting low and increasing slowly helps. If side effects occur, switching to another MRA is an option." },
    { name: "Eplerenone", type: "MRA (Alternative)", badge: "Fewer Side Effects", badgeColor: "#2E86AB", cost: "$$–$$$", startDose: "25–50 mg twice daily", typicalDose: "50–100 mg twice daily", maxDose: "Up to 200 mg twice daily", pros: ["More selective — far fewer anti-androgen side effects", "Very low rate of gynecomastia", "Better tolerated by many patients", "Good option for men experiencing spironolactone side effects"], cons: ["More expensive than spironolactone", "May require higher doses (less potent mg-for-mg)", "Needs to be taken twice daily", "Less available in some regions"], notes: "Eplerenone is a good choice when spironolactone side effects are problematic. When dosed appropriately, it is believed to be equally effective at blocking aldosterone's effects." },
    { name: "Finerenone", type: "MRA (Newer)", badge: "Emerging", badgeColor: "#6B48C8", cost: "$$$$", startDose: "10–20 mg/day", typicalDose: "Under study for PA", maxDose: "Under study", pros: ["Non-steroidal MRA — very selective for the mineralocorticoid receptor", "Minimal anti-androgen side effects", "Strong evidence for kidney and heart protection in diabetes studies", "Once-daily dosing"], cons: ["Most expensive option", "Limited data specifically in primary aldosteronism patients (trials ongoing)", "May not be available in all regions", "Optimal dosing for PA not yet fully established"], notes: "Finerenone is a promising newer MRA. While it has strong evidence for heart and kidney protection in diabetic kidney disease, specific studies in primary aldosteronism are still limited. Early data suggest comparable blood pressure lowering to low-dose spironolactone." },
    { name: "Amiloride", type: "ENaC Inhibitor (Second-line)", badge: "Alternative", badgeColor: "#E67E22", cost: "$", startDose: "5–10 mg/day", typicalDose: "10–20 mg/day", maxDose: "Up to 40 mg/day", pros: ["Low cost — similar to spironolactone", "No anti-androgen side effects at all", "Good blood pressure lowering in studies", "Useful when MRAs aren't tolerated"], cons: ["Does NOT block aldosterone's direct organ damage", "Only blocks the sodium channel in the kidney", "Less evidence in primary aldosteronism specifically", "May not provide the same cardiovascular protection as MRAs", "Guidelines recommend MRAs as first choice over amiloride"], notes: "Amiloride works differently — it blocks the sodium channel that aldosterone activates, rather than the aldosterone receptor itself. While effective for blood pressure and potassium, it doesn't block aldosterone's direct damaging effects on the heart and blood vessels. It's a reasonable option when MRAs can't be used." },
  ];
  return (
    <div style={{ padding: "32px 20px", maxWidth: 700, margin: "0 auto" }}>
      <SectionTitle subtitle="Compare medications used to treat primary aldosteronism">Medication Guide</SectionTitle>
      <FadeIn><InfoCallout type="info"><strong>Key principle:</strong> The 2025 guidelines recommend <strong>mineralocorticoid receptor antagonists (MRAs)</strong> as first-line treatment. MRAs block aldosterone's effects throughout your body — not just in the kidneys. Your doctor will monitor your blood pressure, potassium, kidney function, and a hormone called <strong>renin</strong> to make sure the dose is right.</InfoCallout></FadeIn>
      {meds.map((med, i) => (
        <FadeIn key={i} delay={0.05 * i}>
          <div style={{ background: "var(--card)", border: selectedMed === i ? `2px solid ${med.badgeColor}` : "1px solid var(--border)", borderRadius: 16, marginBottom: 14, overflow: "hidden", transition: "all 0.2s ease", boxShadow: selectedMed === i ? `0 4px 20px ${med.badgeColor}15` : "none" }}>
            <button onClick={() => setSelectedMed(selectedMed === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${med.badgeColor}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Pill size={20} color={med.badgeColor} /></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}><span style={{ fontSize: 17, fontWeight: 700, color: "var(--text)" }}>{med.name}</span><span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6, background: `${med.badgeColor}15`, color: med.badgeColor, textTransform: "uppercase", letterSpacing: 0.5 }}>{med.badge}</span></div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{med.type} · Cost: {med.cost}</div>
              </div>
              <ChevronDown size={18} color="var(--text-muted)" style={{ transform: selectedMed === i ? "rotate(180deg)" : "none", transition: "0.3s" }} />
            </button>
            <div style={{ maxHeight: selectedMed === i ? 1200 : 0, overflow: "hidden", transition: "max-height 0.5s ease" }}>
              <div style={{ padding: "0 20px 20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                  {[{ label: "Starting Dose", value: med.startDose }, { label: "Typical Dose", value: med.typicalDose }, { label: "Maximum", value: med.maxDose }].map((d, j) => (
                    <div key={j} style={{ background: "var(--bg)", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}><div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{d.label}</div><div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{d.value}</div></div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div><div style={{ fontSize: 13, fontWeight: 700, color: "#2E7D32", marginBottom: 8 }}>✅ Advantages</div>{med.pros.map((p, j) => (<div key={j} style={{ display: "flex", gap: 6, marginBottom: 4, fontSize: 13, lineHeight: 1.5, color: "var(--text-secondary)" }}><Plus size={13} color="#2E7D32" style={{ flexShrink: 0, marginTop: 2 }} />{p}</div>))}</div>
                  <div><div style={{ fontSize: 13, fontWeight: 700, color: "#C0392B", marginBottom: 8 }}>⚠️ Disadvantages</div>{med.cons.map((c, j) => (<div key={j} style={{ display: "flex", gap: 6, marginBottom: 4, fontSize: 13, lineHeight: 1.5, color: "var(--text-secondary)" }}><Minus size={13} color="#C0392B" style={{ flexShrink: 0, marginTop: 2 }} />{c}</div>))}</div>
                </div>
                <div style={{ background: "var(--teal-light)", borderRadius: 10, padding: 14, fontSize: 13, lineHeight: 1.65, color: "var(--teal-dark)" }}><strong>Note:</strong> {med.notes}</div>
              </div>
            </div>
          </div>
        </FadeIn>
      ))}
      <FadeIn delay={0.3}>
        <div style={{ background: "var(--card)", border: "2px solid var(--teal)", borderRadius: 20, padding: "24px", marginTop: 24 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--teal-dark)", marginBottom: 16 }}>📊 What Your Doctor Will Monitor</h3>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-secondary)", marginBottom: 16 }}>Once you start medication, your doctor will check these at 2–3 months (and after every dose change), then annually:</p>
          {[{ label: "Blood Pressure", desc: "The primary goal — getting this controlled" }, { label: "Potassium", desc: "Should normalize, even at low MRA doses. Watch for it going too high." }, { label: "Kidney Function", desc: "A small decrease in kidney function can occur initially — this is often a sign the medication is working, not a problem" }, { label: "Renin", desc: "A rising renin level indicates the aldosterone blockade is working. Your doctor may increase the MRA dose to get renin to rise, especially if blood pressure isn't controlled." }].map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}><Gauge size={16} color="var(--teal)" style={{ flexShrink: 0, marginTop: 3 }} /><div><div style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>{m.label}</div><div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{m.desc}</div></div></div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.35}><InfoCallout type="tip"><strong>Dietary tip:</strong> Reducing salt intake (less than 5 grams per day) is a critical part of treatment. A high-salt diet is a very common reason why medications may seem to not be working well enough.</InfoCallout></FadeIn>
      <FadeIn delay={0.4}><InfoCallout type="warning"><strong>About gynecomastia (breast changes) with spironolactone:</strong> This side effect is dose-related and usually appears after 6+ months. If it occurs, reducing the dose to 50 mg/day or less often helps. Switching to eplerenone or another MRA almost always resolves it completely if caught early.</InfoCallout></FadeIn>
      <PageNav prev={{ id: "decisions", label: "Treatment Options" }} next={{ id: "avs", label: "Adrenal Vein Sampling" }} navigate={navigate} />
    </div>
  );
}

function AVSPage({ navigate }) {
  return (
    <div style={{ padding: "32px 20px", maxWidth: 700, margin: "0 auto" }}>
      <SectionTitle subtitle="Understanding the test that helps determine if surgery could help you">Adrenal Vein Sampling (AVS)</SectionTitle>
      <FadeIn>
        <div style={{ background: "linear-gradient(135deg, #FFF8E7 0%, #FFF3D1 100%)", borderRadius: 20, padding: "28px 24px", marginBottom: 28, border: "1px solid #E8D5A0" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#8B6914", marginBottom: 12 }}>🎯 Why Is This Test Needed?</h3>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "#5A4510" }}>A CT scan can show the <em>shape</em> of your adrenal glands, but it can't tell which gland is actually making too much aldosterone. Small growths can be invisible on CT, and not every visible bump is the culprit. CT scans alone misidentify the source in about <strong>38%</strong> of cases. AVS measures aldosterone directly from each adrenal gland's blood supply — it's the most reliable way to know.</p>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <Accordion title="What happens during the procedure?" icon={Stethoscope} defaultOpen={true} accent="#D4A017">
          <p>AVS is performed by a specialized radiologist (interventional radiologist) in a hospital procedure room. Here's what to expect:</p>
          <div style={{ margin: "16px 0" }}>
            {[{ step: "1", text: "A thin tube (catheter) is inserted through a vein in your groin, similar to other vein-based procedures." }, { step: "2", text: "Using X-ray guidance, the radiologist carefully guides the catheter to the veins draining each adrenal gland." }, { step: "3", text: "Small blood samples are collected from each adrenal vein and from a general vein (usually near the kidney area)." }, { step: "4", text: "These samples are analyzed to compare aldosterone levels between the two sides." }, { step: "5", text: "You may receive a medication called cosyntropin (synthetic ACTH) during the procedure to make the results clearer." }].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}><div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: "var(--teal)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{s.step}</div><p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>{s.text}</p></div>
            ))}
          </div>
        </Accordion>
      </FadeIn>
      <FadeIn delay={0.15}><Accordion title="How long does it take?" icon={Clock} accent="#2E86AB"><p>The procedure typically takes 30–60 minutes. You'll usually rest for a few hours afterward and can often go home the same day. Results usually take a few days to a week.</p></Accordion></FadeIn>
      <FadeIn delay={0.2}>
        <Accordion title="Is it painful or risky?" icon={AlertTriangle} accent="#C0392B">
          <p>Most people feel only mild discomfort from the catheter insertion (similar to a blood draw in your groin). You may be given local anesthesia and mild sedation.</p>
          <p style={{ marginTop: 8 }}>Serious complications are rare. The main risk is adrenal vein rupture, which occurs in less than 1% of procedures and is less common at experienced centers. This is why it's important that AVS is done at a center where the radiologist has significant experience.</p>
        </Accordion>
      </FadeIn>
      <FadeIn delay={0.25}>
        <Accordion title="What do the results mean?" icon={TrendingUp} accent="#6B48C8">
          <p>The lab compares aldosterone levels between your two adrenal veins:</p>
          <div style={{ margin: "12px 0" }}>
            <div style={{ background: "#F0FAF0", borderRadius: 10, padding: 14, marginBottom: 8 }}><strong style={{ color: "#2E7D32" }}>Lateralized (one side dominant):</strong><span style={{ fontSize: 14 }}> When one adrenal produces significantly more aldosterone (4× or more). Surgery on that side may be an option.</span></div>
            <div style={{ background: "#FFF8E7", borderRadius: 10, padding: 14 }}><strong style={{ color: "#8B6914" }}>Bilateral (both sides):</strong><span style={{ fontSize: 14 }}> Both glands contribute similarly. Medical therapy is the recommended path.</span></div>
          </div>
        </Accordion>
      </FadeIn>
      <FadeIn delay={0.3}>
        <Accordion title="When might AVS NOT be needed?" icon={HelpCircle} accent="#2E7D32">
          <p>In some cases, AVS can be skipped:</p>
          <div style={{ marginTop: 8 }}>
            {["Young patients (under 35) with severe primary aldosteronism (low potassium, very high aldosterone) and a clear single adrenal nodule larger than 1 cm on CT — this combination strongly suggests one-sided disease.", "If you have a known genetic/familial form of primary aldosteronism (these are bilateral).", "If you prefer to start medical therapy regardless and aren't considering surgery."].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><CheckCircle size={15} color="#2E7D32" style={{ flexShrink: 0, marginTop: 2 }} /><span style={{ fontSize: 14 }}>{item}</span></div>
            ))}
          </div>
        </Accordion>
      </FadeIn>
      <PageNav prev={{ id: "medications", label: "Medications" }} next={{ id: "surgery", label: "Surgery Guide" }} navigate={navigate} />
    </div>
  );
}

function SurgeryPage({ navigate }) {
  return (
    <div style={{ padding: "32px 20px", maxWidth: 700, margin: "0 auto" }}>
      <SectionTitle subtitle="What to expect if you choose adrenalectomy">Surgery Guide</SectionTitle>
      <FadeIn>
        <div style={{ background: "linear-gradient(135deg, #F0FAF0 0%, #E8F5E9 100%)", borderRadius: 20, padding: "28px 24px", marginBottom: 28, border: "1px solid #C8E6C9" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1B5E20", marginBottom: 12 }}>🏥 Laparoscopic Adrenalectomy</h3>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: "#2E5A2E" }}>Surgery for primary aldosteronism involves removing the adrenal gland that is overproducing aldosterone. This is almost always done <strong>laparoscopically</strong> (keyhole surgery) — meaning small incisions, a camera, and specialized instruments. It removes the entire affected adrenal gland. Your other adrenal gland takes over its functions fully.</p>
        </div>
      </FadeIn>
      <FadeIn delay={0.1}><h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>Your Journey Through Surgery</h3></FadeIn>
      {[
        { phase: "Before Surgery", icon: "📋", color: "#2E86AB", items: ["Complete pre-operative assessments (blood work, imaging, possibly an ECG)", "Your surgeon and hypertension specialist will review your AVS results and confirm the plan", "A dexamethasone suppression test will have been done to check for cortisol co-secretion — if positive, special preparations are needed (see the Dexamethasone Suppression Test section)", "Discuss anesthesia with your anesthesiologist", "You may need to adjust some medications beforehand", "Surgery is typically done at centers experienced with adrenal surgery — outcomes are better at high-volume centers"] },
        { phase: "Day of Surgery", icon: "🏥", color: "#6B48C8", items: ["Surgery usually takes 1–3 hours under general anesthesia", "3–4 small incisions (each about 1 cm) are typically made", "You'll be monitored closely afterward in a recovery area", "Most people stay in hospital for 1–3 days"] },
        { phase: "First Weeks After", icon: "🏠", color: "#D4A017", items: ["Mild pain at incision sites, managed with simple pain medication", "Most people return to light activities within 1–2 weeks", "Full recovery typically takes 2–4 weeks", "Blood pressure and potassium will be closely monitored", "Your other blood pressure medications may be reduced or stopped gradually", "If your adenoma also produced cortisol, you may need temporary cortisol replacement — your doctor will test for this"] },
        { phase: "Long-Term Outcomes", icon: "🎯", color: "#2E7D32", items: ["Virtually all patients see biochemical cure of the excess aldosterone", "About 50% of patients achieve complete blood pressure cure (off all medications)", "Most others see significant improvement — fewer medications, better control", "Potassium normalizes in nearly all patients", "Quality of life improvements are consistently reported", "The younger you are and the shorter you've had hypertension, the better the chance of complete BP cure"] },
      ].map((phase, i) => (
        <FadeIn key={i} delay={0.1 + i * 0.05}>
          <div style={{ display: "flex", gap: 16, marginBottom: 4, paddingLeft: 4 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${phase.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{phase.icon}</div>
              {i < 3 && <div style={{ width: 2, flex: 1, background: "var(--border)", marginTop: 4 }} />}
            </div>
            <div style={{ paddingBottom: 24 }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: phase.color, marginBottom: 10 }}>{phase.phase}</h4>
              {phase.items.map((item, j) => (<div key={j} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}><div style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, background: phase.color, marginTop: 7 }} /><span style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)" }}>{item}</span></div>))}
            </div>
          </div>
        </FadeIn>
      ))}
      <FadeIn delay={0.35}><InfoCallout type="warning"><strong>Important:</strong> Factors that predict better chances of complete blood pressure cure include younger age, shorter duration of hypertension, fewer medications before surgery, and no family history of hypertension.</InfoCallout></FadeIn>
      <PageNav prev={{ id: "avs", label: "Adrenal Vein Sampling" }} next={{ id: "home", label: "Back to Home" }} navigate={navigate} />
    </div>
  );
}

// ─── FEEDBACK WIDGET ──────────────────────────────────────
const GOOGLE_SHEET_WEBHOOK = "https://script.google.com/macros/s/AKfycbxoaHr982_We-U8motbsuGnLv5KSIsCYRJYkiF7B4wT0hMlxS4DxV9TSHDLqhNXGotz/exec";

function FeedbackWidget({ currentPage }) {
  const [open, setOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");
  const [userType, setUserType] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const reset = () => { setFeedbackType(""); setUserType(""); setMessage(""); setStatus("idle"); };
  const close = () => { setOpen(false); setTimeout(reset, 300); };

  const submit = async () => {
    if (!feedbackType || !userType || !message.trim()) return;
    setStatus("sending");
    const payload = {
      timestamp: new Date().toISOString(),
      page: currentPage,
      type: feedbackType,
      userType: userType,
      message: message.trim(),
      userAgent: navigator.userAgent,
    };
    try {
      // Create hidden iframe target
      const iframe = document.createElement("iframe");
      iframe.name = "feedback-frame-" + Date.now();
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      // Create and submit form targeting the hidden iframe
      const form = document.createElement("form");
      form.method = "GET";
      form.action = GOOGLE_SHEET_WEBHOOK;
      form.target = iframe.name;

      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      form.remove();
      setTimeout(() => iframe.remove(), 10000);

      setStatus("sent");
      setTimeout(close, 2000);
    } catch (e) {
      setStatus("error");
    }
  };

  const typeOptions = [
    { value: "bug", label: "🐛 Bug", color: "#C0392B" },
    { value: "content-error", label: "📝 Content Error", color: "#D4A017" },
    { value: "suggestion", label: "💡 Suggestion", color: "#2E86AB" },
    { value: "praise", label: "⭐ Praise", color: "#2E7D32" },
    { value: "other", label: "💬 Other", color: "#6B48C8" },
  ];

  const userOptions = [
    { value: "physician", label: "Physician" },
    { value: "hcp", label: "Other Healthcare Professional" },
    { value: "patient", label: "Patient" },
  ];

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", top: 62, left: 12, zIndex: 90,
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 14px", borderRadius: 20,
          background: "#6B48C8", color: "white",
          border: "none", cursor: "pointer",
          fontSize: 12, fontWeight: 600, fontFamily: "inherit",
          boxShadow: "0 2px 10px rgba(107,72,200,0.35)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(107,72,200,0.45)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(107,72,200,0.35)"; }}
      >
        <MessageSquare size={13} />
        Feedback
      </button>

      {/* Modal overlay */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          padding: "80px 16px 40px",
          animation: "fadeIn 0.2s ease",
        }}
          onClick={e => { if (e.target === e.currentTarget) close(); }}
        >
          <div style={{
            background: "white", borderRadius: 20, padding: "28px 24px",
            width: "100%", maxWidth: 440, maxHeight: "calc(100vh - 120px)",
            overflowY: "auto",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            animation: "fadeIn 0.3s ease",
          }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1A2332", marginBottom: 2 }}>Share Your Feedback</h3>
                <p style={{ fontSize: 12, color: "#8896A6" }}>Page: {currentPage}</p>
              </div>
              <button onClick={close} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#8896A6" }}><X size={20} /></button>
            </div>

            {status === "sent" ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#F0FAF0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <CheckCircle size={28} color="#2E7D32" />
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 700, color: "#1A2332", marginBottom: 6 }}>Thank you!</h4>
                <p style={{ fontSize: 14, color: "#8896A6" }}>Your feedback has been submitted.</p>
              </div>
            ) : (
              <>
                {/* Feedback Type */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#1A2332", display: "block", marginBottom: 8 }}>Type of feedback</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {typeOptions.map(opt => (
                      <button key={opt.value} onClick={() => setFeedbackType(opt.value)}
                        style={{
                          padding: "6px 12px", borderRadius: 8, fontSize: 13, fontFamily: "inherit",
                          border: feedbackType === opt.value ? `2px solid ${opt.color}` : "2px solid #E2E8F0",
                          background: feedbackType === opt.value ? `${opt.color}10` : "white",
                          color: feedbackType === opt.value ? opt.color : "#4A5568",
                          fontWeight: feedbackType === opt.value ? 600 : 400,
                          cursor: "pointer", transition: "all 0.15s ease",
                        }}>{opt.label}</button>
                    ))}
                  </div>
                </div>

                {/* User Type */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#1A2332", display: "block", marginBottom: 8 }}>I am a...</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {userOptions.map(opt => (
                      <button key={opt.value} onClick={() => setUserType(opt.value)}
                        style={{
                          padding: "6px 14px", borderRadius: 8, fontSize: 13, fontFamily: "inherit",
                          border: userType === opt.value ? "2px solid #15807C" : "2px solid #E2E8F0",
                          background: userType === opt.value ? "#E6F5F4" : "white",
                          color: userType === opt.value ? "#0D5C59" : "#4A5568",
                          fontWeight: userType === opt.value ? 600 : 400,
                          cursor: "pointer", transition: "all 0.15s ease",
                        }}>{opt.label}</button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#1A2332", display: "block", marginBottom: 8 }}>Your feedback</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what you think, found, or would improve..."
                    rows={4}
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: 12,
                      border: "2px solid #E2E8F0", fontSize: 14, fontFamily: "inherit",
                      color: "#1A2332", resize: "vertical", lineHeight: 1.5,
                      outline: "none", transition: "border-color 0.2s ease",
                    }}
                    onFocus={e => e.target.style.borderColor = "#15807C"}
                    onBlur={e => e.target.style.borderColor = "#E2E8F0"}
                  />
                </div>

                {/* Submit */}
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button onClick={close} style={{
                    padding: "10px 18px", borderRadius: 10, border: "1px solid #E2E8F0",
                    background: "white", color: "#8896A6", fontSize: 14, fontWeight: 500,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>Cancel</button>
                  <button
                    onClick={submit}
                    disabled={!feedbackType || !userType || !message.trim() || status === "sending"}
                    style={{
                      padding: "10px 20px", borderRadius: 10, border: "none",
                      background: (!feedbackType || !userType || !message.trim()) ? "#E2E8F0" : "#6B48C8",
                      color: (!feedbackType || !userType || !message.trim()) ? "#8896A6" : "white",
                      fontSize: 14, fontWeight: 600, cursor: (!feedbackType || !userType || !message.trim()) ? "not-allowed" : "pointer",
                      fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {status === "sending" ? <><Loader size={14} style={{ animation: "spin 1s linear infinite" }} /> Sending...</> : <><Send size={14} /> Submit</>}
                  </button>
                </div>

                {status === "error" && (
                  <p style={{ fontSize: 13, color: "#C0392B", marginTop: 10, textAlign: "center" }}>Something went wrong. Please try again.</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function PAPatientGuide() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const topRef = useRef(null);
  const navigate = (p) => { setPage(p); setMenuOpen(false); topRef.current?.scrollIntoView({ behavior: "smooth" }); };
  const currentLabel = NAV_ITEMS.find(n => n.id === page)?.label || "Home";
  const pages = { home: HomePage, understand: UnderstandPage, diagnosis: DiagnosisPage, imaging: ImagingPage, "dex-test": DexTestPage, "why-treat": WhyTreatPage, decisions: DecisionsPage, medications: MedicationsPage, avs: AVSPage, surgery: SurgeryPage };
  const PageComponent = pages[page] || HomePage;
  return (
    <div style={{ "--bg": "#F7F9FB", "--card": "#FFFFFF", "--border": "#E2E8F0", "--text": "#1A2332", "--text-secondary": "#4A5568", "--text-muted": "#8896A6", "--teal": "#15807C", "--teal-dark": "#0D5C59", "--teal-light": "#E6F5F4", fontFamily: "'DM Sans', 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif", background: "var(--bg)", minHeight: "100vh", color: "var(--text)", maxWidth: "100%", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Source+Serif+4:wght@600;700&display=swap" rel="stylesheet" />
      <div ref={topRef} />
      <FeedbackWidget currentPage={currentLabel} />
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(247,249,251,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", padding: "0 16px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
          {page !== "home" ? (
            <button onClick={() => navigate("home")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "var(--teal)", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}><Home size={16} /> Home</button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Shield size={18} color="var(--teal)" /><span style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>PA Guide</span></div>
          )}
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", maxWidth: 180, textAlign: "center", lineHeight: 1.2 }}>{currentLabel}</span>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--text-secondary)" }}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        <div style={{ maxHeight: menuOpen ? 600 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", paddingBottom: menuOpen ? 12 : 0 }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => navigate(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 8px", background: page === item.id ? "var(--teal-light)" : "none", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: page === item.id ? 600 : 400, color: page === item.id ? "var(--teal-dark)" : "var(--text-secondary)" }}><item.icon size={16} />{item.label}</button>
            ))}
          </div>
        </div>
      </div>
      <div key={page} style={{ animation: "fadeIn 0.4s ease", paddingBottom: 60 }}><PageComponent navigate={navigate} /></div>
      <div style={{ textAlign: "center", padding: "24px 20px 12px", borderTop: "1px solid var(--border)", maxWidth: 700, margin: "0 auto" }}>
        <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 12 }}>Based on the <strong>2025 Endocrine Society Clinical Practice Guidelines</strong> for Primary Aldosteronism. Adler GK, Stowasser M, et al. <em>J Clin Endocrinol Metab.</em> 2025.</p>
      </div>
      <div style={{ background: "#F1F3F5", padding: "20px 20px 28px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#5A6577", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Important Medical Disclaimer</p>
          <p style={{ fontSize: 11.5, color: "#6B7785", lineHeight: 1.7, marginBottom: 8 }}>This tool is intended for <strong>educational and informational purposes only</strong>. It does not constitute medical advice, diagnosis, or treatment, and should not be used as a substitute for professional medical care. The content provided is general in nature and may not apply to your individual circumstances.</p>
          <p style={{ fontSize: 11.5, color: "#6B7785", lineHeight: 1.7, marginBottom: 8 }}>Always seek the advice of your physician, hypertension specialist, or other qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or interacted with on this tool.</p>
          <p style={{ fontSize: 11.5, color: "#6B7785", lineHeight: 1.7, marginBottom: 8 }}>The questionnaire results, treatment comparisons, and educational content are based on published clinical guidelines and medical literature but are simplified for patient understanding. Individual treatment decisions should be made in consultation with your healthcare team, who can account for your complete medical history, test results, and personal preferences.</p>
          <p style={{ fontSize: 11.5, color: "#6B7785", lineHeight: 1.7 }}>The authors and developers of this tool accept no liability for any harm, loss, or damage arising from the use of or reliance on the information provided herein.</p>
          <p style={{ fontSize: 11, color: "#A8B2BE", marginTop: 12 }}>© {new Date().getFullYear()} Dr. Sachin Pasricha. All rights reserved.</p>
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } * { box-sizing: border-box; margin: 0; } button:focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; } ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }`}</style>
    </div>
  );
}
