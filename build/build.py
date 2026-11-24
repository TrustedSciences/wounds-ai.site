#!/usr/bin/env python3
"""Generates the static Wound Solutions AI site into ../site.
Pages share one header and footer; edit here, re-run, commit the HTML."""
import os, sys, textwrap

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Caladea:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">')

MARK = ('<svg class="brand-mark" viewBox="0 0 30 30" aria-hidden="true">'
        '<circle cx="15" cy="15" r="13.25" fill="none" stroke="#1B2433" stroke-width="1.5"/>'
        '<circle cx="15" cy="15" r="7.5" fill="none" stroke="#1B2433" stroke-width="1"/>'
        '<circle cx="17.2" cy="13.2" r="3.4" fill="#1B2433"/></svg>')

CARET = '<svg class="caret" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'

SOLUTION_PAGES = {'evidence', 'platform', 'solutions', 'woundeye', 'woundeye-health-plans', 'pressure-ulcer-study', 'wound-liability'}

EXT = ' target="_blank" rel="noopener"'
EVIDENCE_PAGES = {'evidence', 'pressure-ulcer-study', 'wound-liability'}

def header(active):
    def cur(p):
        return ' aria-current="page"' if p == active else ''
    drop_cur = ' current' if active in SOLUTION_PAGES - EVIDENCE_PAGES - {'compare'} else ''
    ev_cur = ' current' if active in EVIDENCE_PAGES else ''
    cmp_cur = ' current' if active == 'compare' else ''
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="Wound Solutions AI, home"><img class="brand-logo" src="assets/img/wsa-logo.webp" alt="Wound Solutions AI" width="186" height="44"></a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav class="nav" id="site-nav" aria-label="Main">
      <a href="index.html"{cur('index')}>Home</a>
      <a href="about.html"{cur('about')}>Who we are</a>
      <div class="nav-drop{drop_cur}">
        <button type="button" aria-expanded="false" aria-haspopup="true">Solutions {CARET}</button>
        <div class="drop-panel drop-single">
          <div class="drop-col">
            <p class="drop-head">The platform</p>
            <a href="solutions.html"{cur('solutions')}><strong>All solutions</strong><span>Wound intelligence across the continuum of care</span></a>
            <a href="platform.html"{cur('platform')}><strong>How it fits together</strong><span>WoundRounds, workflow agents and clinical review</span></a>
            <a href="solutions.html#woundrounds"><strong>WoundRounds</strong><span>Clinical workflow and documentation for facilities</span></a>
            <a class="sub" href="https://www.woundrounds.com"{EXT}><strong>Visit woundrounds.com</strong><span>The WoundRounds website, opens in a new tab</span></a>
            <a href="woundeye.html"{cur('woundeye')}><strong>WoundEye</strong><span>Wound capture and care coordination at home</span></a>
            <a class="sub" href="woundeye-health-plans.html"{cur('woundeye-health-plans')}><strong>WoundEye for health plans</strong><span>For Medicare Advantage care management</span></a>
            <a href="solutions.html#wound-qa"><strong>AssureStage</strong><span>Expert review by certified wound specialists</span></a>
          </div>
        </div>
      </div>
      <div class="nav-drop{ev_cur}">
        <button type="button" aria-expanded="false" aria-haspopup="true">Evidence {CARET}</button>
        <div class="drop-panel drop-evidence">
          <div class="drop-col">
            <p class="drop-head">Published studies and posters</p>
            <a href="evidence.html"{cur('evidence')}><strong>All evidence</strong><span>Every study with citation, design and results</span></a>
            <a href="pressure-ulcer-study.html"{cur('pressure-ulcer-study')}><strong>Hospital for Special Care, SAWC 2025</strong><span>78.95% fewer full-thickness HAPIs in a 236-bed LTACH</span></a>
            <a href="https://www.hmpgloballearningnetwork.com/site/wmp/content/observational-study-assess-electronic-point-care-wound-documentation-and-reporting-system-re"{EXT}><strong>Ostomy Wound Management, 2012</strong><span>Peer-reviewed observational study, 51-bed SNF</span></a>
            <a href="https://www.woundrounds.com/?p=1718"{EXT}><strong>Presence Heritage Village, SAWC poster</strong><span>Over 80% fewer facility-acquired pressure ulcers in 7 months</span></a>
            <a href="https://wocn.confex.com/wocn/2014am/webprogram/Paper8660.html"{EXT}><strong>QAPI for Wound Care, WOCN 2014</strong><span>Performance improvement case study in long-term care</span></a>
          </div>
          <div class="drop-col">
            <p class="drop-head">Case studies</p>
            <a href="evidence.html#amg-greenwood"><strong>AMG Specialty Hospital, Greenwood</strong><span>LTACH nursing time study</span></a>
            <a href="evidence.html#amg-lafayette"><strong>AMG Specialty Hospital, Lafayette</strong><span>18% payroll savings</span></a>
            <a href="https://woundrounds.com/wp-content/uploads/2012/11/ROI-Case-Study_Increasing-Revenues-Final.pdf"{EXT}><strong>Burgess Square Healthcare Centre</strong><span>Over $18,000 less overtime nursing cost (PDF)</span></a>
            <a href="evidence.html#acadia"><strong>Acadia St. Landry Guest Home</strong><span>Growing census through wound care</span></a>
            <p class="drop-head" style="margin-top:1rem">Research</p>
            <a href="wound-liability.html"{cur('wound-liability')}><strong>Wounds and liability</strong><span>What public claims data says about post-acute care</span></a>
          </div>
        </div>
      </div>
      <div class="nav-drop{cmp_cur}">
        <button type="button" aria-expanded="false" aria-haspopup="true">Compare {CARET}</button>
        <div class="drop-panel drop-compare">
          <div class="drop-col">
            <p class="drop-head">Why Wound Solutions AI</p>
            <a href="compare.html"{cur('compare')}><strong>Software and specialists, together</strong><span>How our approach differs, side by side</span></a>
            <a href="compare.html#swift"><strong>Compared with Swift Medical</strong><span>Swift Skin &amp; Wound</span></a>
            <a href="compare.html#net-health"><strong>Compared with Net Health</strong><span>WoundExpert and Tissue Analytics</span></a>
            <a href="compare.html#pointclickcare"><strong>Compared with PointClickCare</strong><span>Skin and Wound</span></a>
            <a href="compare.html#checklist"><strong>Questions to ask any vendor</strong><span>A buyer&rsquo;s checklist for wound programs</span></a>
          </div>
        </div>
      </div>
      <a href="contact.html"{cur('contact')}>Contact</a>
      <a class="btn btn-ink" href="contact.html">Request a demo</a>
    </nav>
  </div>
</header>'''

WOUNDEYE_LEGAL = ('WoundEye and WoundAI are products of Wound Solutions AI, LLC. WoundAI is decision support; a clinician confirms every result. '
                  'WoundAI is not cleared or authorized by the FDA. WoundEye does not diagnose, treat, cure or prevent disease. Informational only.')

def footer():
    return f'''<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="brand" href="index.html"><img class="brand-logo" src="assets/img/wsa-logo.webp" alt="Wound Solutions AI" width="186" height="44"></a>
        <p class="mt-1">Wound documentation, risk prevention and clinical oversight, from the hospital bedside to the home.</p>
      </div>
      <div>
        <h4>Solutions</h4>
        <ul>
          <li><a href="platform.html">How it fits together</a></li>
          <li><a href="solutions.html#woundrounds">WoundRounds</a></li>
          <li><a href="https://www.woundrounds.com" target="_blank" rel="noopener">woundrounds.com</a></li>
          <li><a href="woundeye.html">WoundEye</a></li>
          <li><a href="woundeye-health-plans.html">WoundEye for health plans</a></li>
          <li><a href="solutions.html#wound-qa">AssureStage</a></li>
          <li><a href="evidence.html">Evidence and studies</a></li>
          <li><a href="compare.html">Compare platforms</a></li>
          <li><a href="pressure-ulcer-study.html">Pressure ulcer study</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">Who we are</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="privacy.html">Privacy policy</a></li>
          <li><a href="terms.html">Terms</a></li>
        </ul>
      </div>
      <div>
        <h4>Talk to us</h4>
        <ul>
          <li><a href="tel:+18475193500">+1 847.519.3500</a></li>
          <li><a href="mailto:information@woundsolutions.ai">information@woundsolutions.ai</a></li>
          <li><a href="mailto:hello@woundeye.com">hello@woundeye.com</a></li>
          <li><a href="https://www.linkedin.com/company/woundsolutionsai">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <p class="foot-legal">&copy; 2026 Wound Solutions AI, LLC. {WOUNDEYE_LEGAL}</p>
  </div>
</footer>
<script src="assets/site.js"></script>'''

def page(slug, title, desc, body):
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta name="theme-color" content="#ECE3D1">
{FONTS}
<link rel="stylesheet" href="assets/styles.css">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
</head>
<body>
{header(slug)}
<main id="main">
{textwrap.dedent(body).strip()}
</main>
{footer()}
</body>
</html>
'''
    with open(os.path.join(OUT, f'{slug}.html'), 'w') as f:
        f.write(html)

def cta(heading='See it with one of your own wounds.', text='Bring a de-identified wound photograph to a thirty-minute demonstration and watch it assessed.', btn='Request a demo'):
    return f'''<section class="section paper cta-band" style="border-bottom:0">
  <div class="wrap">
    <div><h2>{heading}</h2><p class="lede mt-1">{text}</p></div>
    <div class="btn-row" style="margin-top:0"><a class="btn btn-ink" href="contact.html">{btn}</a><a class="btn btn-line" href="tel:+18475193500">Call +1 847.519.3500</a></div>
  </div>
</section>'''

# ---------------------------------------------------------------- figures
def photo(name, alt, caption=None, ratio='3/2', cls=''):
    cap = f'<figcaption>{caption}</figcaption>' if caption else ''
    return f'<figure class="figure photo {cls}"><img src="assets/img/{name}.webp" alt="{alt}" loading="lazy" style="aspect-ratio:{ratio}">{cap}</figure>'

def foot_plate(caption_id='fig1'):
    # Ink line drawing: left foot, sole view, heel wound with measurement callouts.
    return f'''<svg viewBox="0 0 320 470" role="img" aria-labelledby="{caption_id}-t">
  <title id="{caption_id}-t">Line drawing of a left foot, sole view, with a wound on the heel measured 3.2 by 2.8 centimetres</title>
  <defs>
    <pattern id="hatch-{caption_id}" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="5" stroke="#1B2433" stroke-width="1.1"/>
    </pattern>
  </defs>
  <g fill="none" stroke="#1B2433" stroke-linecap="round" stroke-linejoin="round">
    <!-- toes -->
    <ellipse cx="96" cy="58" rx="19" ry="23" stroke-width="1.6"/>
    <ellipse cx="132" cy="44" rx="12" ry="15" stroke-width="1.4"/>
    <ellipse cx="158" cy="48" rx="10.5" ry="13" stroke-width="1.4"/>
    <ellipse cx="180" cy="60" rx="9.5" ry="11.5" stroke-width="1.4"/>
    <ellipse cx="197" cy="78" rx="8" ry="10" stroke-width="1.4"/>
    <!-- sole outline -->
    <path stroke-width="1.8" d="M84 92 C 70 110 66 140 72 170 C 78 205 98 228 104 262 C 110 298 92 330 90 365 C 87 410 112 440 146 440 C 182 440 202 412 198 372 C 194 332 182 300 190 262 C 198 222 214 190 212 150 C 210 118 204 98 192 90 C 170 80 150 84 128 88 C 112 90 96 86 84 92 Z"/>
    <!-- ball crease and arch contour -->
    <path stroke-width="1" stroke-dasharray="2 4" d="M86 136 C 120 150 170 148 208 132"/>
    <path stroke-width="1" stroke-dasharray="2 4" d="M110 250 C 122 290 116 320 110 345"/>
  </g>
  <!-- wound -->
  <ellipse cx="146" cy="392" rx="23" ry="19" fill="url(#hatch-{caption_id})" stroke="#1B2433" stroke-width="1.4"/>
  <g stroke="#1B2433" stroke-width="1" fill="none">
    <!-- width dimension -->
    <line x1="123" y1="422" x2="123" y2="452"/><line x1="169" y1="422" x2="169" y2="452"/>
    <line x1="123" y1="446" x2="169" y2="446"/>
    <path d="M128 443 123 446 128 449M164 443 169 446 164 449"/>
    <!-- height dimension -->
    <line x1="176" y1="373" x2="236" y2="373"/><line x1="176" y1="411" x2="236" y2="411"/>
    <line x1="230" y1="373" x2="230" y2="411"/>
    <path d="M227 378 230 373 233 378M227 406 230 411 233 406"/>
    <!-- leader -->
    <path d="M128 378 C 90 350 60 330 40 318"/>
  </g>
  <g font-family="Atkinson Hyperlegible, sans-serif" font-size="11" fill="#1B2433">
    <text x="146" y="466" text-anchor="middle">3.2 cm</text>
    <text x="240" y="396">2.8 cm</text>
    <text x="8" y="300">Lt heel</text>
    <text x="8" y="314" fill="#465063">site W-014</text>
  </g>
  <g font-family="Caladea, Cambria, serif" font-style="italic" font-size="12" fill="#465063">
    <text x="236" y="28">sole view</text>
  </g>
</svg>'''

def loop_figure():
    # Patient / carer -> WoundAI first read -> clinician decides -> record & care team
    return '''<svg viewBox="0 0 720 210" role="img" aria-labelledby="loop-t">
  <title id="loop-t">How a wound moves through WoundEye: a photo from home, a first read from WoundAI, a clinician's decision, and a dated record for the care team</title>
  <g font-family="Atkinson Hyperlegible, sans-serif" fill="#1B2433">
    <g fill="none" stroke="#1B2433" stroke-width="1.4">
      <rect x="8" y="40" width="150" height="96" rx="2"/>
      <rect x="192" y="40" width="150" height="96" rx="2" stroke-dasharray="4 3"/>
      <rect x="376" y="40" width="150" height="96" rx="2" stroke-width="2.2"/>
      <rect x="560" y="40" width="150" height="96" rx="2"/>
      <path d="M160 88h28M184 84l4 4-4 4M344 88h28M368 84l4 4-4 4M528 88h28M552 84l4 4-4 4"/>
      <path d="M635 138 C 635 190 83 190 83 140" stroke-dasharray="3 4"/>
      <path d="M79 146 83 138 87 146"/>
    </g>
    <g font-size="13.5" font-weight="700">
      <text x="22" y="72">Photo from home</text>
      <text x="206" y="72">WoundAI first read</text>
      <text x="390" y="72">Clinician decides</text>
      <text x="574" y="72">Record, care team</text>
    </g>
    <g font-size="11.5" fill="#465063">
      <text x="22" y="94">Patient or carer,</text><text x="22" y="111">own mobile device,</text><text x="22" y="128">two taps on a body map</text>
      <text x="206" y="94">Suggests type, class</text><text x="206" y="111">and stage. Labelled</text><text x="206" y="128">"not a diagnosis"</text>
      <text x="390" y="94">Confirms or corrects,</text><text x="390" y="111">assesses, sets follow-up.</text><text x="390" y="128">The record shows who.</text>
      <text x="574" y="94">Photo timeline, trend,</text><text x="574" y="111">flags. PDF, FHIR R4,</text><text x="574" y="128">JSON or CSV</text>
    </g>
    <text x="360" y="202" text-anchor="middle" font-family="Caladea, Cambria, serif" font-style="italic" font-size="13" fill="#465063">Follow-up photos join the same body site, so everyone sees one wound over time</text>
  </g>
</svg>'''


FLOW_WIDGET = """<div class="flow" id="wsa-flow" data-flow>
  <div class="flow-bar">
    <div class="flow-steps" role="group" aria-label="Stages">
      <button type="button" data-stage="0" aria-pressed="true">Whole loop</button>
      <button type="button" data-stage="1">1. Capture</button>
      <button type="button" data-stage="2">2. Worklist</button>
      <button type="button" data-stage="3">3. Clinical review</button>
      <button type="button" data-stage="4">4. Act and record</button>
    </div>
    <div class="flow-modes" role="group" aria-label="Care setting">
      <button type="button" data-mode="fac" aria-pressed="false">Facilities</button>
      <button type="button" data-mode="home" aria-pressed="false">Home</button>
      <button type="button" data-mode="both" aria-pressed="true">Both</button>
    </div>
  </div>
  <div class="flow-body">
    <div class="flow-stage"></div>
    <div class="flow-side">
      <div class="flow-panel" aria-live="polite"><h3 class="panel-title"></h3><p class="panel-body"></p></div>
      <div class="flow-counts">
        <div><b data-count="captured">0</b>Captured</div>
        <div><b data-count="read">0</b>On the specialist worklist</div>
        <div><b data-count="confirmed">0</b>Specialist assessments</div>
        <div class="flag"><b data-count="flagged">0</b>Flagged for follow-up</div>
        <div><b data-count="record">0</b>In the record</div>
        <div class="res"><b data-count="results">0</b>Results back to home</div>
      </div>
      <div class="flow-rate">
        <div class="row"><label for="flow-rate">Assessments per day</label><b data-rate-out>150</b></div>
        <input id="flow-rate" type="range" min="30" max="5000" step="10" value="150" data-rate>
        <div class="row" style="margin-top:.75rem"><span data-day>Simulated day 1</span><span><button type="button" data-play>Pause</button> <button type="button" data-reset>Reset</button></span></div>
      </div>
    </div>
  </div>
  <div class="flow-legend">
    <span><i class="l-raw"></i>Captured, awaiting specialist</span>
    <span><i class="l-read"></i>WoundEye photo queued by agents</span>
    <span><i class="l-ok"></i>Assessed by a certified wound specialist</span>
    <span><i class="l-flag"></i>Flagged: suspected infection, follow-up set</span>
    <span><i class="l-result"></i>Result returned to patient and carer</span>
    <span class="flow-foot">Illustrative simulation, not client data. Select a stage or any box to read about it.</span>
  </div>
</div>"""

FLOW_WE = """<div class="flow flow-we" id="wsa-flow" data-flow data-variant="woundeye">
  <div class="flow-bar">
    <div class="flow-steps" role="group" aria-label="Stages">
      <button type="button" data-stage="0" aria-pressed="true">Whole loop</button>
      <button type="button" data-stage="1">1. Capture</button>
      <button type="button" data-stage="2">2. Worklist</button>
      <button type="button" data-stage="3">3. Clinical review</button>
      <button type="button" data-stage="4">4. Result</button>
    </div>
  </div>
  <div class="flow-body">
    <div class="flow-stage"></div>
    <div class="flow-side">
      <div class="flow-panel" aria-live="polite"><h3 class="panel-title"></h3><p class="panel-body"></p></div>
      <div class="flow-counts">
        <div><b data-count="captured">0</b>Photos sent from home</div>
        <div><b data-count="read">0</b>On the specialist worklist</div>
        <div><b data-count="confirmed">0</b>Specialist assessments</div>
        <div class="res"><b data-count="results">0</b>Results back to home</div>
      </div>
      <div class="flow-rate">
        <div class="row"><label for="flow-rate">Photos per day</label><b data-rate-out>60</b></div>
        <input id="flow-rate" type="range" min="20" max="5000" step="10" value="60" data-rate>
        <div class="row" style="margin-top:.75rem"><span data-day>Simulated day 1</span><span><button type="button" data-play>Pause</button> <button type="button" data-reset>Reset</button></span></div>
      </div>
    </div>
  </div>
  <div class="flow-legend">
    <span><i class="l-raw"></i>Photo sent from home</span>
    <span><i class="l-read"></i>Queued for the specialist by agents</span>
    <span><i class="l-result"></i>Result returned to patient and carer</span>
    <span class="flow-foot">Illustrative simulation, not client data. Select a stage or any box to read about it.</span>
  </div>
</div>"""

FLOW_WR = """<div class="flow flow-wr" id="wsa-flow-wr" data-flow data-variant="woundrounds">
  <div class="flow-bar">
    <div class="flow-steps" role="group" aria-label="Stages">
      <button type="button" data-stage="0" aria-pressed="true">Whole loop</button>
      <button type="button" data-stage="1">1. Bedside documentation</button>
      <button type="button" data-stage="3">2. Clinical review</button>
      <button type="button" data-stage="4">3. Act and record</button>
    </div>
  </div>
  <div class="flow-body">
    <div class="flow-stage"></div>
    <div class="flow-side">
      <div class="flow-panel" aria-live="polite"><h3 class="panel-title"></h3><p class="panel-body"></p></div>
      <div class="flow-counts">
        <div><b data-count="captured">0</b>Documented at the bedside</div>
        <div><b data-count="confirmed">0</b>High-risk wounds reviewed</div>
        <div class="flag"><b data-count="flagged">0</b>Flagged for a second look</div>
        <div><b data-count="record">0</b>In the record</div>
      </div>
      <div class="flow-rate">
        <div class="row"><label for="flow-rate-wr">Assessments per day</label><b data-rate-out>120</b></div>
        <input id="flow-rate-wr" type="range" min="30" max="5000" step="10" value="120" data-rate>
        <div class="row" style="margin-top:.75rem"><span data-day>Simulated day 1</span><span><button type="button" data-play>Pause</button> <button type="button" data-reset>Reset</button></span></div>
      </div>
    </div>
  </div>
  <div class="flow-legend">
    <span><i class="l-raw"></i>Documented at the bedside</span>
    <span><i class="l-ok"></i>High-risk wound reviewed by AssureStage</span>
    <span><i class="l-flag"></i>Flagged for a second look</span>
    <span class="flow-foot">Illustrative simulation, not client data. Select a stage or any box to read about it.</span>
  </div>
</div>"""

FLOW_WRN = """<div class="flow flow-wr" id="wsa-flow-wrn" data-flow data-variant="woundrounds-core">
  <div class="flow-bar">
    <div class="flow-steps" role="group" aria-label="Stages">
      <button type="button" data-stage="0" aria-pressed="true">Whole loop</button>
      <button type="button" data-stage="1">1. Bedside capture and assessment</button>
      <button type="button" data-stage="3">2. Wound record</button>
      <button type="button" data-stage="4">3. Shared with</button>
    </div>
  </div>
  <div class="flow-body">
    <div class="flow-stage"></div>
    <div class="flow-side">
      <div class="flow-panel" aria-live="polite"><h3 class="panel-title"></h3><p class="panel-body"></p></div>
      <div class="flow-counts">
        <div><b data-count="captured">0</b>Photos captured at the bedside</div>
        <div><b data-count="confirmed">0</b>Nurse assessments recorded</div>
        <div class="flag"><b data-count="flagged">0</b>Flagged for follow-up</div>
        <div><b data-count="record">0</b>Shared with EHR and reports</div>
      </div>
      <div class="flow-rate">
        <div class="row"><label for="flow-rate-wrn">Assessments per day</label><b data-rate-out>120</b></div>
        <input id="flow-rate-wrn" type="range" min="30" max="5000" step="10" value="120" data-rate>
        <div class="row" style="margin-top:.75rem"><span data-day>Simulated day 1</span><span><button type="button" data-play>Pause</button> <button type="button" data-reset>Reset</button></span></div>
      </div>
    </div>
  </div>
  <div class="flow-legend">
    <span><i class="l-raw"></i>Photo captured at the bedside</span>
    <span><i class="l-ok"></i>Assessed by the facility nurse</span>
    <span><i class="l-flag"></i>Flagged for follow-up</span>
    <span class="flow-foot">Illustrative simulation, not client data. Select a stage or any box to read about it.</span>
  </div>
</div>"""

FLOW_MA = """<div class="flow flow-ma" id="wsa-flow-ma" data-flow data-variant="ma">
  <div class="flow-bar">
    <div class="flow-steps" role="group" aria-label="Stages">
      <button type="button" data-stage="0" aria-pressed="true">Both paths</button>
      <button type="button" data-stage="1">1. Where it starts</button>
      <button type="button" data-stage="2">2. First look</button>
      <button type="button" data-stage="3">3. Assessment</button>
      <button type="button" data-stage="4">4. Outcome</button>
    </div>
    <div class="flow-modes" role="group" aria-label="Path">
      <button type="button" data-mode="late" aria-pressed="false">Seen late</button>
      <button type="button" data-mode="early" aria-pressed="false">Seen same day</button>
      <button type="button" data-mode="compare" aria-pressed="true">Compare</button>
    </div>
  </div>
  <div class="flow-body">
    <div class="flow-stage"></div>
    <div class="flow-side">
      <div class="flow-panel" aria-live="polite"><h3 class="panel-title"></h3><p class="panel-body"></p></div>
      <div class="flow-counts">
        <div><b data-count="captured">0</b>New wounds at home</div>
        <div><b data-count="read">0</b>Unseen between visits</div>
        <div class="flag"><b data-count="flagged">0</b>Reached care as a costly episode</div>
        <div><b data-count="confirmed">0</b>Assessed by a clinician the same day</div>
        <div><b data-count="record">0</b>In the plan&rsquo;s record</div>
      </div>
      <div class="flow-rate">
        <div class="row"><label for="flow-rate-ma">New wounds per day</label><b data-rate-out>60</b></div>
        <input id="flow-rate-ma" type="range" min="10" max="5000" step="10" value="60" data-rate>
        <div class="row" style="margin-top:.75rem"><span data-day>Simulated day 1</span><span><button type="button" data-play>Pause</button> <button type="button" data-reset>Reset</button></span></div>
      </div>
    </div>
  </div>
  <div class="flow-legend">
    <span><i class="l-raw"></i>A new wound at home</span>
    <span><i class="l-wait"></i>Waiting, unseen</span>
    <span><i class="l-flag"></i>Seen late, larger and harder to treat</span>
    <span><i class="l-ok"></i>Assessed by a licensed clinician the same day</span>
    <span class="flow-foot">Illustrative simulation: each wound is shown on both paths. Figures from the WoundEye brochure. Select a stage or any box to read about it.</span>
  </div>
</div>"""

# ---------------------------------------------------------------- pages
def build():
    os.makedirs(OUT, exist_ok=True)

    # ---------- HOME
    page('index', 'Wound Solutions AI | The intelligent platform for wound care',
         'Integrated wound documentation, risk prevention and clinical oversight that help healthcare teams deliver better care in less time.', f'''
<section class="hero" aria-labelledby="hero-title">
  <img class="hero-img" src="assets/img/hero-carer.webp" alt="" fetchpriority="high">
  <div class="wrap hero-inner">
    <h1 id="hero-title">The Trusted, Intelligent Platform for Wound Care</h1>
    <p class="hero-sub">Integrated wound documentation, risk prevention and clinical oversight that help healthcare teams deliver better care in less time.</p>
    <div class="btn-row">
      <a class="btn btn-light" href="contact.html">Request a demo</a>
      <a class="btn btn-ghost" href="#wsa-flow">See how it works</a>
    </div>
    <ul class="hero-settings" aria-label="Where we work">
      <li>Skilled nursing</li><li>LTACH</li><li>Rehabilitation</li><li>Critical access</li><li>Home</li>
    </ul>
  </div>
</section>

<section class="section flow-intro" id="how-it-fits">
  <div class="wrap">
    <div class="section-head" style="margin-bottom:2rem">
      <h2>One wound, one record, three layers of care</h2>
      <p class="lede">WoundRounds captures the assessment at the bedside. WoundEye captures it at home, and our workflow agents put it on the specialist&rsquo;s worklist. Certified wound specialists review every high-risk wound.</p>
    </div>
  </div>
  <div class="wrap flow-wide">
    {FLOW_WIDGET}
  </div>
</section>

<section class="section slate">
  <div class="wrap">
    <div class="section-head">
      <h2>Efficient and effective</h2>
      <div>
        <p class="lede">We help care teams deliver better outcomes for complex wounds, and reduce risk and liability for the organizations they work for. Precision wound assessment, care optimization and a clinical oversight team support workflows that last.</p>
        <p class="muted">Our commitment is to patient care and to the well-being of providers and their organizations.</p>
      </div>
    </div>
    <div class="photo-band mt-3">
      {photo('bedside-care', 'A nurse tending to a patient at the bedside, with dressing supplies laid out on a tray', 'Precision wound assessment starts at the bedside.', '12/5')}
    </div>
    <dl class="pillars">
      <div><dt>Clinical</dt><dd>Improve wound care quality with real-time data, clinical tools and team oversight.</dd></div>
      <div><dt>Financial</dt><dd>Accurate documentation can mean fewer adverse events, including reportable incidents, citations, rehospitalizations and lawsuits.</dd></div>
      <div><dt>Operational</dt><dd>Streamline wound care and risk prevention workflows, and get it right the first time.</dd></div>
    </dl>
  </div>
</section>

<section class="section paper">
  <div class="wrap">
    <div class="section-head">
      <h2>Wound intelligence across the continuum of care</h2>
      <p class="lede">From the hospital bedside to the facility to the kitchen table, each setting gets the tool built for the person holding the wound.</p>
    </div>
    <div class="products">
      <article class="product" id="woundrounds-home">
        <p class="setting">Hospitals and facilities</p>
        <h3>WoundRounds</h3>
        <p>Our flagship wound management and prevention solution. Clinical workflow and documentation that help wound clinicians deliver better care in less time.</p>
        <a class="more" href="solutions.html#woundrounds">About WoundRounds</a>
      </article>
      <article class="product">
        <p class="setting">Home and health plan populations</p>
        <h3>WoundEye</h3>
        <p>A patient or carer photographs the wound on their own mobile device. A clinician assesses it the same day, and the care team sees the trend.</p>
        <a class="more" href="woundeye.html">How WoundEye works</a>
      </article>
      <article class="product">
        <p class="setting">Any setting</p>
        <h3>AssureStage</h3>
        <p>Expert review of wound documentation by certified wound specialists, so assessments are accurate, complete and defensible.</p>
        <a class="more" href="solutions.html#wound-qa">About AssureStage</a>
      </article>
    </div>

  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <h2>Reducing the cost of care</h2>
      <p class="lede">Our technology and clinical services reduce the cost of care delivery while lowering risk and liability for provider organizations.</p>
    </div>
    <div class="finding mt-3">
      <div class="figure-num">78.9%</div>
      <div>
        <p>reduction in full-thickness hospital-acquired pressure injuries over the most recent two years at The Hospital for Special Care, a 236-bed long-term acute care hospital.</p>
        <a class="sans" href="pressure-ulcer-study.html"><b>Read how one hospital did it</b></a>
      </div>
    </div>
    <div class="split mt-3">
      {photo('tablet-touch', 'A hand touching a tablet screen lit in blue', None, '4/3')}
      <div>
        <h3>We support clinical workflows and improve efficiency</h3>
        <p class="muted mt-1">Clients report saving 8 to 10 nursing hours a week, and clinicians using the technology stay 35% longer.</p>
        <p><a class="sans" href="https://www.woundrounds.com" target="_blank" rel="noopener"><b>Visit woundrounds.com</b></a></p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <h2>Trusted across post-acute care</h2>
      <p class="lede">Deployed nationwide in the settings where wounds are most common and most consequential.</p>
    </div>
    <ul class="ruled mt-2">
      <li><h3>Skilled nursing facilities</h3><p>Daily documentation, risk prevention and survey readiness for long-term and short-stay residents.</p></li>
      <li><h3>Long-term acute care hospitals</h3><p>High-acuity patients and the highest pressure-injury risk in post-acute care.</p></li>
      <li><h3>Rehabilitation hospitals</h3><p>Accurate admission assessments, so wounds present on arrival are recorded as such.</p></li>
      <li><h3>Critical access hospitals</h3><p>Specialist-level wound oversight where specialists are scarce.</p></li>
      <li><h3>Home and health plans</h3><p>With WoundEye, the first look happens where most chronic wounds are first noticed: at home.</p></li>
    </ul>
  </div>
</section>

<section class="section ink">
  <div class="wrap">
    <div class="section-head">
      <h2>For Medicare Advantage plans</h2>
      <div>
        <p class="lede" style="color:#D7CFBE">The wound that costs the most is the one nobody saw in time. WoundEye gives the person who is there a way to get a clinician&rsquo;s eye on it the same day, and gives the plan a dated, clinician-signed record from day one.</p>
        <div class="btn-row"><a class="btn btn-line" style="border-color:#F7F2E8;color:#F7F2E8" href="woundeye-health-plans.html">WoundEye for health plans</a></div>
      </div>
    </div>
  </div>
</section>

{cta('Ready to see the platform?', 'A short demonstration with our clinical team, tailored to your setting.')}
<script src="assets/flow.js"></script>
''')


    # ---------- PLATFORM (flow visual)
    page('platform', 'How it fits together | WoundRounds, Wound Solutions AI and AssureStage Clinical Wound Assessments',
         'An interactive view of how a wound assessment moves from the bedside or home through WoundRounds, Wound Solutions AI and AssureStage Clinical Wound Assessments into the record.', f"""
<section class="title-page compact">
  <div class="wrap">
    <p class="kicker">How it fits together</p>
    <h1>One wound, one record, three layers of care</h1>
    <div class="abstract">
      <p>WoundRounds captures the assessment at the bedside. WoundEye captures it at home, and Wound Solutions AI’s workflow agents put it on the specialist’s worklist. Our certified wound specialists review every high-risk wound. Watch each assessment move through the loop, and select any stage to see what happens there.</p>
    </div>
  </div>
</section>
<section class="section" style="padding-top:2.5rem">
  <div class="wrap flow-wide">
    {FLOW_WIDGET}
  </div>
</section>
<section class="section paper">
  <div class="wrap">
    <div class="section-head">
      <h2>What each layer does</h2>
      <p class="lede">Software, agents and clinicians, each doing the part it does best. Agents run the workflow; specialists make the clinical decisions.</p>
    </div>
    <ol class="steps">
      <li><div><h3>Capture: WoundRounds and WoundEye</h3><p>Nurses document photo, location, measurements and Braden risk at the bedside in WoundRounds, and those assessments go straight to specialist review. At home, patients and carers capture with WoundEye.</p></div></li>
      <li><div><h3>Worklist: Wound Solutions AI workflow agents</h3><p>For WoundEye, agents check each photo in, file it to the right body site, add it to the certified wound specialist’s worklist, track it until it is reviewed, and schedule follow-ups. They simplify, manage and scale the workflow, and make no clinical decisions.</p></div></li>
      <li><div><h3>AssureStage Clinical Wound Assessments</h3><p>Certified wound specialists review WoundRounds assessments and WoundEye submissions, determine type and stage, compute the PUSH score and flag suspected infection. The record shows who decided.</p></div></li>
      <li><div><h3>Act and record</h3><p>Flags and follow-ups reach the care team dashboard. The confirmed assessment becomes a defensible record, exports to the EHR or plan, and extends the healing trend.</p></div></li>
    </ol>
  </div>
</section>
""" + cta('See the loop with your own data.', 'A short demonstration of WoundRounds, WoundEye and our clinical review, tailored to your facilities.') + '<script src="assets/flow.js"></script>')


    # ---------- EVIDENCE
    OWM = 'https://www.hmpgloballearningnetwork.com/site/wmp/content/observational-study-assess-electronic-point-care-wound-documentation-and-reporting-system-re'
    LEARN = 'https://woundrounds.com/learn'
    page('evidence', 'Evidence: WoundRounds studies, posters and case studies | Wound Solutions AI',
         'Published studies, conference posters and customer case studies on WoundRounds, with citations, results and disclosures.', f"""
<div class="wrap subnav" aria-label="Evidence"><span>Evidence:</span><a href="evidence.html" aria-current="page">All evidence</a><a href="pressure-ulcer-study.html">Pressure ulcer study</a><a href="wound-liability.html">Wounds and liability</a></div>
<section class="title-page compact">
  <div class="wrap">
    <p class="kicker">Evidence</p>
    <h1>What the studies show</h1>
    <div class="abstract">
      <p>WoundRounds has been studied in long-term acute care hospitals and skilled nursing facilities since 2008, in a peer-reviewed journal, at national wound care conferences and by customers measuring their own results. Every source is linked below.</p>
    </div>
    <ul class="ev-jump">
      <li><a href="#studies">Published studies and posters <b>4</b></a></li>
      <li><a href="#case-studies">Customer case studies <b>4</b></a></li>
      <li><a href="#research">Industry research <b>1</b></a></li>
    </ul>
  </div>
</section>

<section class="section" id="studies">
  <div class="wrap">
    <div class="section-head"><h2>Published studies and posters</h2><p class="lede">Newest first. Links open the original publication or poster.</p></div>
    <ol class="ev-list">
      <li class="ev-item" id="hsc-2025">
        <div class="ev-meta"><span class="ev-tag">Conference poster</span><b>2025</b><span>Symposium on Advanced Wound Care, Fall</span></div>
        <div class="ev-body">
          <h3>Evaluating the Efficacy of a Hybrid Approach for Wound Management and Risk Prevention in a 236-bed Long Term Acute Hospital</h3>
          <p class="ev-who">Michael Seabock, RN, WCC, The Hospital for Special Care; Rhett A. Gustafson, BA, WoundRounds</p>
          <dl class="ev-facts">
            <div><dt>Setting</dt><dd>236-bed LTACH, New Britain, Connecticut</dd></div>
            <div><dt>Design</dt><dd>Retrospective analysis of 2017&ndash;2024 hospital-acquired pressure injury and Braden risk data</dd></div>
            <div><dt>Findings</dt><dd>Full-thickness HAPI rate down 70.18% against the four-year baseline, and 78.95% in the most recent two years</dd></div>
          </dl>
          <p class="ev-links"><a href="pressure-ulcer-study.html">Read our summary</a><a href="https://www.hmpgloballearningnetwork.com/node/338329"{EXT}>Published abstract (WOUNDS supplement)</a><a href="https://www.woundrounds.com/?p=5896"{EXT}>Full poster</a></p>
        </div>
      </li>
      <li class="ev-item" id="wocn-2014">
        <div class="ev-meta"><span class="ev-tag">Conference poster</span><b>2014</b><span>WOCN Society Annual Conference</span></div>
        <div class="ev-body">
          <h3>QAPI for Wound Care: A Case Study on Quality Assurance Performance Improvement</h3>
          <p class="ev-who">Anne Scheurich, BS, RN, CWOCN, WoundRounds; Michelle Stuercke, BSN, MPA, DNP, NuCare Services</p>
          <dl class="ev-facts">
            <div><dt>Setting</dt><dd>Long-term care facility</dd></div>
            <div><dt>Design</dt><dd>Performance improvement case study with root cause analysis and corrective actions</dd></div>
            <div><dt>Focus</dt><dd>Preventing facility-acquired pressure ulcers under the QAPI requirements of the Affordable Care Act</dd></div>
          </dl>
          <p class="ev-links"><a href="https://wocn.confex.com/wocn/2014am/webprogram/Paper8660.html"{EXT}>Poster abstract (WOCN)</a></p>
        </div>
      </li>
      <li class="ev-item" id="owm-2012">
        <div class="ev-meta"><span class="ev-tag ev-peer">Peer-reviewed</span><b>2012</b><span>Ostomy Wound Management</span></div>
        <div class="ev-body">
          <h3>An Observational Study to Assess an Electronic Point-of-Care Wound Documentation and Reporting System Regarding User Satisfaction and Potential for Improved Care</h3>
          <p class="ev-who">Kurtz, Florczak, Scheurich, Croghan, Sheridan, McGill, McClain</p>
          <dl class="ev-facts">
            <div><dt>Setting</dt><dd>Provena Heritage Village, a 51-bed skilled nursing facility in Kankakee, Illinois</dd></div>
            <div><dt>Design</dt><dd>Two-month prospective observational study of 38 residents with pressure ulcers; nine nurses surveyed before and after</dd></div>
            <div><dt>Findings</dt><dd>Ease of use rose from 3.3 to 4.7 and wound management effectiveness from 3.3 to 4.4 on five-point scales</dd></div>
          </dl>
          <p class="ev-links"><a href="{OWM}"{EXT}>Full article</a></p>
        </div>
      </li>
      <li class="ev-item" id="presence">
        <div class="ev-meta"><span class="ev-tag">Conference poster</span><b>SAWC Fall</b><span>4th Annual Symposium on Advanced Wound Care, Fall</span></div>
        <div class="ev-body">
          <h3>Reducing and sustaining facility-acquired pressure ulcers: Presence Heritage Village</h3>
          <p class="ev-who">Presence Health and WoundRounds</p>
          <dl class="ev-facts">
            <div><dt>Setting</dt><dd>51-bed skilled nursing facility, Presence Health</dd></div>
            <div><dt>Design</dt><dd>Seven-month before-and-after study</dd></div>
            <div><dt>Findings</dt><dd>Facility-acquired pressure ulcers down by over 80%, attributed to better documentation and team communication</dd></div>
          </dl>
          <p class="ev-links"><a href="https://www.woundrounds.com/?p=1718"{EXT}>Study announcement</a><a href="{LEARN}"{EXT}>Poster on woundrounds.com</a></p>
        </div>
      </li>
    </ol>
  </div>
</section>

<section class="section paper" id="case-studies">
  <div class="wrap">
    <div class="section-head"><h2>Customer case studies</h2><p class="lede">Operators measuring what changed in their own facilities after adopting WoundRounds.</p></div>
    <div class="cases">
      <article class="case" id="amg-greenwood">
        <p class="case-where">LTACH &middot; Greenwood, Mississippi</p>
        <h3>AMG Specialty Hospital, Greenwood</h3>
        <p>The CEO ran a nursing time study comparing wound care nursing time before and after implementing WoundRounds.</p>
        <blockquote>&ldquo;Our wound care has improved with WoundRounds.&rdquo; <cite>Jennifer Wallace, RN, BSN, CEO</cite></blockquote>
        <a href="{LEARN}"{EXT}>Read the case study</a>
      </article>
      <article class="case" id="amg-lafayette">
        <p class="case-where">LTACH &middot; Lafayette, Louisiana</p>
        <h3>AMG Specialty Hospital, Lafayette</h3>
        <p>Following its sister hospital&rsquo;s time study, the facility ran a payroll analysis of its own.</p>
        <blockquote>&ldquo;Our payroll reflects an 18% savings after implementing WoundRounds.&rdquo; <cite>Mary Bollich, BSN, Chief Nursing Officer</cite></blockquote>
        <a href="{LEARN}"{EXT}>Read the case study</a>
      </article>
      <article class="case" id="burgess">
        <p class="case-where">Skilled nursing &middot; Westmont, Illinois</p>
        <h3>Burgess Square Healthcare Centre</h3>
        <p>A US News Best Nursing Home grew census while cutting more than $18,000 in annual overtime wound nursing costs.</p>
        <blockquote>&ldquo;Our ROI on annual overtime nursing expenses alone outweighs the cost of our wound management solution.&rdquo; <cite>John Vrba, CEO</cite></blockquote>
        <a href="https://woundrounds.com/wp-content/uploads/2012/11/ROI-Case-Study_Increasing-Revenues-Final.pdf"{EXT}>Read the case study (PDF)</a>
      </article>
      <article class="case" id="acadia">
        <p class="case-where">Skilled nursing &middot; Church Point, Louisiana</p>
        <h3>Acadia St. Landry Guest Home</h3>
        <p>A four-star facility set out to grow patient census by improving the efficiency and reputation of its wound care.</p>
        <blockquote>&ldquo;WoundRounds is providing great clinical and economic outcomes to our facility.&rdquo; <cite>Brian Hensgens, Administrator</cite></blockquote>
        <a href="{LEARN}"{EXT}>Read the case study</a>
      </article>
    </div>
  </div>
</section>

<section class="section" id="research">
  <div class="wrap">
    <div class="section-head"><h2>Industry research</h2><p class="lede">Why wound documentation matters beyond the bedside.</p></div>
    <ul class="ruled mt-2">
      <li><h3><a href="wound-liability.html">Wounds and liability in post-acute care</a></h3><p>What public claims data, carrier studies and verdicts say about pressure injuries, litigation and insurance in skilled nursing, LTACH and sub-acute care.</p></li>
    </ul>
    <p class="small mt-3" style="max-width:52rem">About this evidence: these studies and case studies were produced by or with Wound Solutions AI (formerly Telemedicine Solutions, LLC) and its clinical partners. They are observational and single-site; author affiliations and funding are disclosed in each original publication.</p>
  </div>
</section>
""" + cta('Talk to the team behind the results.', 'A short demonstration with our clinical team, tailored to your facilities.'))


    # ---------- COMPARE
    S = {
      'swift_pcc': 'https://pointclickcare.com/products/skin-wound/',
      'corstrata': 'https://www.businesswire.com/news/home/20230627656194/en/Swift-Medical-Announces-Partnership-with-Corstrata-to-Enhance-Virtual-Wound-Care-Delivery',
      'swift_sw2': 'https://www.canhealth.com/2024/10/23/swift-medical-offers-new-platform-for-wound-care/',
      'nh_sol': 'https://www.nethealth.com/wound-care-software-solutions/',
      'nh_we': 'https://www.nethealth.com/wound-expert-ehr/',
      'nh_call': 'https://go.nethealth.com/woundcall',
      'pcc_app': 'https://apps.apple.com/us/app/-/id1073855679',
      'mc': 'https://www.matrixcare.com/partner-marketplace/woundrounds/',
      'cantata': 'https://cantatahealth.com/?p=713',
    }
    def fn(n): return f'<sup class="fn"><a href="#src-{n}">{n}</a></sup>'
    page('compare', 'Compare wound care platforms: Wound Solutions AI, Swift Medical, Net Health, PointClickCare',
         'How Wound Solutions AI compares with Swift Medical, Net Health and PointClickCare Skin and Wound: software plus certified wound specialists, in one program.', f"""
<section class="title-page compact">
  <div class="wrap">
    <p class="kicker">Compare</p>
    <h1>Most wound platforms give nurses a tool. We give them a tool and a team.</h1>
    <div class="abstract">
      <p>Every serious wound platform now captures photos, measures wounds and tracks healing. The difference is what happens next. With Wound Solutions AI, certified wound specialists review the documentation as part of the same program, from the same company, in the same record.</p>
    </div>
    <ul class="ev-jump">
      <li><a href="#side-by-side">Side by side</a></li>
      <li><a href="#swift">Swift Medical</a></li>
      <li><a href="#net-health">Net Health</a></li>
      <li><a href="#pointclickcare">PointClickCare</a></li>
      <li><a href="#checklist">Buyer&rsquo;s checklist</a></li>
    </ul>
  </div>
</section>

<section class="section" id="what-sets-us-apart">
  <div class="wrap">
    <div class="section-head"><h2>What sets Wound Solutions AI apart</h2><p class="lede">Four things a buyer gets in one contract.</p></div>
    <dl class="pillars pillars-4">
      <div><dt>Specialists, not just software</dt><dd>Our AssureStage Clinical Wound Assessment team of certified wound specialists reviews assessments and catches staging errors and gaps before they reach a survey or a claim.</dd></div>
      <div><dt>Bedside to home</dt><dd>WoundRounds serves skilled nursing, LTACH, rehabilitation and critical access hospitals. WoundEye lets patients and family carers send a photo from their own mobile device to the specialist worklist.</dd></div>
      <div><dt>Clinicians decide</dt><dd>Workflow agents handle intake, worklists, reminders and scheduling. Every clinical determination is made by a certified wound specialist, and the record shows who and when.</dd></div>
      <div><dt>Works with your EHR</dt><dd>WoundRounds integrates with long-term care EHRs including MatrixCare{fn(8)} and Cantata NetSolutions{fn(9)}, and WoundEye exports FHIR R4, JSON, CSV and PDF.</dd></div>
    </dl>
  </div>
</section>

<section class="section paper" id="side-by-side">
  <div class="wrap">
    <div class="section-head"><h2>Side by side</h2><p class="lede">Based on each vendor&rsquo;s own public materials. Select a source number to see where each statement comes from.</p></div>
    <div class="table-scroll">
    <table class="data cmp">
      <thead><tr><th scope="col"></th><th scope="col" class="us">Wound Solutions AI</th><th scope="col">Swift Medical</th><th scope="col">Net Health</th><th scope="col">PointClickCare Skin and Wound</th></tr></thead>
      <tbody>
        <tr><th scope="row">Wound photo, measurement and healing trend</th><td class="us"><b>Yes</b> &middot; WoundRounds and WoundEye</td><td>Yes{fn(3)}</td><td>Yes, Tissue Analytics{fn(4)}</td><td>Yes, powered by Swift Medical{fn(1)}</td></tr>
        <tr><th scope="row">Certified wound specialist review from the same company</th><td class="us"><b>Yes, built in</b> &middot; AssureStage Clinical Wound Assessments and documentation review</td><td>Through a partnership with Corstrata, a separate company{fn(2)}</td><td>Not described; the product page covers software, analytics and patient engagement{fn(4)}</td><td>Not described on the product page{fn(1)}</td></tr>
        <tr><th scope="row">Primary focus</th><td class="us"><b>Facility wound programs and prevention</b>, plus home capture for patients, carers and health plans</td><td>Wound imaging across home health, ambulatory, acute and skilled nursing{fn(3)}</td><td>Wound care EHR for outpatient centers and multi-facility organizations{fn(6)}</td><td>Wound documentation inside the PointClickCare EHR{fn(7)}</td></tr>
        <tr><th scope="row">Use with the EHR you already have</th><td class="us"><b>Yes</b> &middot; MatrixCare and Cantata integrations{fn(8)}{fn(9)}; FHIR R4 export</td><td>Yes, through EHR partners such as Homecare Homebase{fn(3)}</td><td>Yes, including PointClickCare{fn(5)}</td><td>Intended for PointClickCare EHR customers{fn(7)}</td></tr>
        <tr><th scope="row">Published LTACH outcome</th><td class="us"><b>78.95% fewer</b> full-thickness hospital-acquired pressure injuries, 236-bed LTACH, SAWC 2025</td><td colspan="3" class="muted">Each vendor publishes its own studies; see their websites.</td></tr>
      </tbody>
    </table>
    </div>
  </div>
</section>

<section class="section" id="swift">
  <div class="wrap article">
    <h2>Compared with Swift Medical</h2>
    <aside class="note"><b>About Swift.</b> A Toronto-based digital wound care company whose Skin &amp; Wound platform has been used for over 50 million assessments.{fn(3)}</aside>
    <p>Swift is a strong imaging and measurement platform, and its technology also powers PointClickCare&rsquo;s Skin and Wound app.{fn(1)} For access to certified wound nurses, Swift customers work with Corstrata, a separate company, through a partnership announced in 2023.{fn(2)}</p>
    <h3>Where Wound Solutions AI is different</h3>
    <ul>
      <li><b>One program, one accountable partner.</b> Our certified wound specialists are part of Wound Solutions AI, working in the same record as the software.</li>
      <li><b>Built around facility risk.</b> WoundRounds has supported LTACH and skilled nursing wound programs for two decades, with Braden risk, facility-acquired tracking and survey-ready reporting at its core.</li>
      <li><b>Families can start the record.</b> WoundEye lets a patient or carer photograph a wound on their own mobile device and send it straight to a specialist&rsquo;s worklist.</li>
    </ul>
  </div>
</section>

<section class="section paper" id="net-health">
  <div class="wrap article">
    <h2>Compared with Net Health</h2>
    <aside class="note"><b>About Net Health.</b> Offers WoundExpert, a wound care EHR, and Tissue Analytics, an AI wound measurement tool.{fn(4)}</aside>
    <p>Net Health&rsquo;s WoundExpert is a specialty EHR for wound care management, configurable for single outpatient wound centers or multi-facility organizations.{fn(6)} Its wound software page describes software, analytics and patient engagement tools; it does not describe clinical review services.{fn(4)}</p>
    <h3>Where Wound Solutions AI is different</h3>
    <ul>
      <li><b>Made for the facility, not the clinic.</b> WoundRounds is built for nursing teams in skilled nursing and LTACH settings, where wound-related claims and survey citations concentrate.</li>
      <li><b>Specialist oversight included.</b> Our AssureStage Clinical Wound Assessment team reviews documentation, so facilities without a full-time wound nurse still get expert eyes on every wound.</li>
      <li><b>Prevention, not only treatment.</b> Risk dashboards and daily review aim to stop facility-acquired wounds before they start.</li>
    </ul>
  </div>
</section>

<section class="section" id="pointclickcare">
  <div class="wrap article">
    <h2>Compared with PointClickCare Skin and Wound</h2>
    <aside class="note"><b>About PointClickCare.</b> A long-term care EHR vendor. Its Skin and Wound app uses photo recognition and auto-measurement powered by Swift Medical.{fn(1)}</aside>
    <p>Skin and Wound is a capable documentation module for PointClickCare customers, with timestamped images and audit trails.{fn(1)} The app is intended to integrate with the PointClickCare EHR; PointClickCare suggests that non-clients look at Swift instead.{fn(7)}</p>
    <h3>Where Wound Solutions AI is different</h3>
    <ul>
      <li><b>EHR-independent.</b> WoundRounds works alongside the EHR you already use, so a multi-facility operator can standardize wound care even across different systems.</li>
      <li><b>Expert review, not only documentation.</b> Certified wound specialists check the assessments that the bedside team records.</li>
      <li><b>Beyond the building.</b> WoundEye extends the same record to patients at home and to health plan care managers.</li>
    </ul>
  </div>
</section>

<section class="section paper" id="checklist">
  <div class="wrap">
    <div class="section-head"><h2>Questions to ask any wound care vendor</h2><p class="lede">Use these in your next evaluation, including ours.</p></div>
    <ol class="steps">
      <li><div><h3>Who reviews the documentation?</h3><p>Is a certified wound specialist checking assessments, and are they employed by the vendor or a separate company?</p></div></li>
      <li><div><h3>Who makes the clinical decision?</h3><p>Does the record show which clinician confirmed the wound type and stage, and when?</p></div></li>
      <li><div><h3>Does it work with our EHR, and every EHR across our facilities?</h3><p>Ask for named, live integrations, not plans.</p></div></li>
      <li><div><h3>Does it help prevent wounds, or only document them?</h3><p>Look for risk dashboards, facility-acquired tracking and follow-up alerts.</p></div></li>
      <li><div><h3>What happens after discharge?</h3><p>Can patients and families send a wound photo from home, and who sees it?</p></div></li>
      <li><div><h3>What results have been published, and where?</h3><p>Ask for the setting, the time period and who conducted the study.</p></div></li>
    </ol>
  </div>
</section>

<section class="section" style="border-bottom:0">
  <div class="wrap">
    <h2 style="font-size:1.4rem">Sources</h2>
    <ol class="references mt-1">
      <li id="src-1"><a href="{S['swift_pcc']}"{EXT}>PointClickCare, Skin and Wound product page</a></li>
      <li id="src-2"><a href="{S['corstrata']}"{EXT}>Business Wire, Swift Medical announces partnership with Corstrata, 2023</a></li>
      <li id="src-3"><a href="{S['swift_sw2']}"{EXT}>Canadian Healthcare Technology, Swift Medical offers new platform for wound care, October 2024</a></li>
      <li id="src-4"><a href="{S['nh_sol']}"{EXT}>Net Health, wound care software solutions</a></li>
      <li id="src-5"><a href="https://hmpgloballearningnetwork.com/site/twc/news/news-november-2022"{EXT}>Today&rsquo;s Wound Clinic, Net Health integration with PointClickCare, November 2022</a></li>
      <li id="src-6"><a href="{S['nh_call']}"{EXT}>Net Health Wound Care + Tissue Analytics</a></li>
      <li id="src-7"><a href="{S['pcc_app']}"{EXT}>PointClickCare Skin and Wound, App Store listing</a></li>
      <li id="src-8"><a href="{S['mc']}"{EXT}>MatrixCare Partner Marketplace, WoundRounds listing</a></li>
      <li id="src-9"><a href="{S['cantata']}"{EXT}>Cantata Health, data-informed wound care with WoundRounds</a></li>
    </ol>
    <p class="small mt-2" style="max-width:56rem">Comparison based on each company&rsquo;s publicly available materials as of November 2026. Features change; confirm current capabilities with each vendor. Swift Skin &amp; Wound, WoundExpert, Tissue Analytics, PointClickCare and Skin and Wound are trademarks of their respective owners, which do not endorse this comparison.</p>
  </div>
</section>
""" + cta('See the difference with your own wounds.', 'A short demonstration of WoundRounds, WoundEye and our clinical review team.'))

    # ---------- ABOUT
    page('about', 'Who we are | Wound Solutions AI',
         'Wound Solutions AI is a fast-growing health technology company improving patient care with data-driven wound management.', '''
<section class="title-page compact">
  <div class="wrap">
    <p class="kicker">Who we are</p>
    <h1>We are passionate about taking care of our clients</h1>
    <div class="abstract">
      <p>Our mission is to improve patient care and the overall well-being of providers and their organizations. Our flagship product, WoundRounds, is the leading wound management and prevention solution, helping wound clinicians deliver better care in less time.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <h2>Meet our leadership team</h2>
      <p class="lede">Clinicians, operators and technologists who have spent years on one problem: wounds that should have been seen sooner.</p>
    </div>
    <figure class="figure photo ceo-feature"><img src="assets/img/mike-diamond-feature.webp" alt="Mike Diamond, President and CEO of Wound Solutions AI, in the office" loading="lazy"><figcaption>Mike Diamond, President &amp; CEO</figcaption></figure>
    <ul class="team">
      <li><img class="headshot" src="assets/img/rhett-gustafson.webp" alt="Rhett Gustafson" loading="lazy"><span class="name">Rhett Gustafson</span><span class="role-title">Chief Financial Officer</span></li>
      <li><img class="headshot" src="assets/img/betty-czowiecki.webp" alt="Betty Czowiecki" loading="lazy"><span class="name">Betty Czowiecki</span><span class="role-title">Director of Delivery</span></li>
      <li><img class="headshot" src="assets/img/david-karr.webp" alt="David Karr" loading="lazy"><span class="name">David Karr</span><span class="role-title">Director of Product Development</span></li>
      <li><img class="headshot in-color" src="assets/img/kara-stoughton.webp" alt="Kara Stoughton" loading="lazy"><span class="name">Kara Stoughton</span><span class="role-title">VP of Sales</span></li>
    </ul>
  </div>
</section>

<section class="section paper">
  <div class="wrap section-head">
    <h2>Passionate about healthcare</h2>
    <div>
      <p class="lede">We build software and clinical services side by side. Every tool we make is governed by clinicians, and every AI suggestion is confirmed or corrected by one.</p>
      <div class="btn-row"><a class="btn btn-ink" href="solutions.html">View our services</a></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap section-head">
    <div><h2>A place people enjoy working</h2>''' + photo('team-office', 'Colleagues working together on laptops around a shared table in a bright office', None, '3/2', 'mt-2') + '''</div>
    <div>
      <p class="lede">Wound Solutions AI is a fast-growing health technology company that uses data-driven technology to improve patient care.</p>
      <p>Join a team of energetic, capable people who care about improving people&rsquo;s lives. Write to <a href="mailto:information@woundsolutions.ai">information@woundsolutions.ai</a> to introduce yourself.</p>
    </div>
  </div>
</section>
''' + cta())

    # ---------- SOLUTIONS
    page('solutions', 'Solutions | Wound Solutions AI',
         'WoundRounds, WoundEye and AssureStage: AI tools and services for wound documentation, risk management and care team workflow.', '''
<section class="title-page compact">
  <div class="wrap">
    <p class="kicker">Solutions</p>
    <h1>Wound intelligence across the continuum of care</h1>
    <div class="abstract">
      <p>We develop AI tools and clinical services for wound documentation, risk management and care team workflow, at the hospital bedside, in the facility and at home.</p>
    </div>
  </div>
</section>

<section class="section" id="woundrounds">
  <div class="wrap article">
    <h2>WoundRounds</h2>
    <aside class="note"><b>Setting.</b> Skilled nursing, LTACH, rehabilitation and critical access hospitals.<br><br><a href="https://www.woundrounds.com">woundrounds.com</a></aside>
    <p class="lede">Clinical workflow and documentation for facility wound teams.</p>
    <p>WoundRounds gives the bedside nurse an easy way to document, track and trend wounds, and gives leaders dashboards that show each patient&rsquo;s risk drivers for potential harm. It automates quality assurance, risk prevention and regulatory compliance, so fewer wounds are missed and fewer become avoidable.</p>
    <p><a class="sans" href="https://www.woundrounds.com" target="_blank" rel="noopener"><b>Visit woundrounds.com</b></a></p>
    ''' + photo('hero-clinicians', 'Clinicians reviewing wound documentation on a tablet', 'WoundRounds puts the wound record in front of the whole care team.', '5/3') + '''
  </div>
  <div class="wrap flow-wide mt-3">
    <h3 class="flow-title">WoundRounds on its own</h3>
    <p class="flow-intro-text">The facility nurse captures the photo and performs the assessment at the bedside. The assessment updates the wound record and the MDS, and passes to the EHR and other systems.</p>
    ''' + FLOW_WRN + '''
  </div>
</section>

<section class="section paper" id="wound-qa">
  <div class="wrap article">
    <h2 class="product-logo"><img src="assets/img/assurestage-logo.png" alt="AssureStage" width="1000" height="293"></h2>
    <aside class="note"><b>Who reviews.</b> Certified wound specialists on our clinical oversight team.</aside>
    <p class="lede">Expert review of wound documentation.</p>
    <p>Our certified wound specialists review assessments as they are recorded, catching staging errors, missing measurements and gaps before they reach a survey, a claim or a courtroom. For operators, it is a documented risk control an underwriter can credit.</p>
    <p><a class="sans" href="wound-liability.html"><b>Why documentation matters for liability</b></a></p>
  </div>
  <div class="wrap flow-wide mt-3">
    <h3 class="flow-title">WoundRounds with AssureStage</h3>
    <p class="flow-intro-text">Add AssureStage, and each high-risk bedside assessment goes to our certified wound specialists, who flag which wounds might need a second look.</p>
    ''' + FLOW_WR + '''
  </div>
  <div class="wrap article mt-3">
    ''' + photo('bedside-care', 'A nurse caring for a patient at the bedside', None, '3/2') + '''
  </div>
</section>

<section class="section" id="woundeye">
  <div class="wrap article">
    <h2>WoundEye</h2>
    <aside class="note"><b>Setting.</b> Patients at home, family carers, home health and Medicare Advantage care management.</aside>
    <p class="lede">Wound capture and care coordination for individuals and health plan populations.</p>
    <p>A patient or carer photographs the wound on whatever mobile device they already own and marks the spot on a body map. WoundAI, our own model, offers a first read. A clinician confirms or corrects it, and that clinician&rsquo;s assessment becomes the record.</p>
    <div class="btn-row"><a class="btn btn-ink" href="woundeye.html">How WoundEye works</a><a class="btn btn-line" href="woundeye-health-plans.html">For health plans</a></div>
  </div>
</section>

<section class="section paper">
  <div class="wrap">
    <div class="section-head">
      <h2>What healthcare organizations gain</h2>
      <p class="lede">Benefits our clients report across clinical, financial and workforce measures.</p>
    </div>
    <ul class="ruled mt-2">
      <li><h3>Quality outcomes</h3><p>Automated quality assurance, risk prevention and regulatory compliance aimed at fewer avoidable wounds, rehospitalizations, liability losses and fines.</p></li>
      <li><h3>Financial outcomes</h3><p>Faster wound care reimbursement and streamlined workflows that reduce labor hours.</p></li>
      <li><h3>Time savings</h3><p>Clients report saving 8 to 10 nursing hours per week.</p></li>
      <li><h3>Risk and liability</h3><p>Fewer pressure injuries mean less exposure to lawsuits and regulatory sanctions.</p></li>
      <li><h3>Continuum of care</h3><p>Deployed nationwide in skilled nursing, LTACH, rehabilitation and critical access hospitals, and at home through WoundEye.</p></li>
      <li><h3>Staff, patient and family satisfaction</h3><p>Clients report that clinicians using the technology stay 35% longer, and that patients and families are more satisfied.</p></li>
    </ul>
  </div>
</section>

<section class="section ink">
  <div class="wrap">
    <h2>Results our clients report</h2>
    <div class="stats">
      <div class="stat"><div class="v">79%</div><p>fewer acquired pressure injuries</p></div>
      <div class="stat"><div class="v">71%</div><p>fewer fines</p></div>
      <div class="stat"><div class="v">62%</div><p>lower loss rates</p></div>
      <div class="stat"><div class="v">46%</div><p>higher wound healing rates</p></div>
    </div>
    <p class="small mt-2">Client-reported outcomes for WoundRounds. For a peer-reviewed example, see the <a href="pressure-ulcer-study.html">pressure ulcer study</a>.</p>
  </div>
</section>
''' + cta() + '<script src="assets/flow.js"></script>')

    # ---------- WOUNDEYE
    page('woundeye', 'WoundEye | Wound capture and care coordination at home',
         'WoundEye lets a patient or carer photograph a wound on their own mobile device. WoundAI offers a first read and a clinician confirms it the same day.', f'''
<div class="wrap subnav" aria-label="WoundEye"><span>WoundEye:</span><a href="woundeye.html" aria-current="page">How it works</a><a href="woundeye-health-plans.html">For health plans</a><a href="#privacy">Privacy</a><a href="#integrations">Integrations</a><div class="nav-drop sub-drop"><button type="button" aria-expanded="false" aria-haspopup="true">Learn more {CARET}</button><div class="drop-panel drop-docs"><div class="drop-col"><p class="drop-head">Brochures for Medicare Advantage plans (PDF)</p><a href="assets/docs/woundeye-medicare-advantage-brochure-1.pdf" target="_blank" rel="noopener"><strong>The wound that costs the most is the one nobody saw in time</strong><span>One-page brochure &middot; PDF, 2.8 MB</span></a><a href="assets/docs/woundeye-medicare-advantage-brochure-2.pdf" target="_blank" rel="noopener"><strong>Catch the wound at home, before it becomes a claim</strong><span>One-page brochure &middot; PDF, 1.8 MB</span></a></div></div></div></div>
<section class="title-page">
  <div class="wrap title-grid">
    <div>
      <p class="kicker">WoundEye, by Wound Solutions AI</p>
      <h1>A clinician&rsquo;s eye on the wound, the day someone notices it</h1>
      <div class="abstract">
        <p>Most chronic wounds are first noticed at home, by family. WoundEye turns that moment into an assessment: one photo, two taps on a body map, a few plain questions, and a clinician&rsquo;s answer the same day. No clinic visit, no special camera, no kit.</p>
      </div>
      <div class="btn-row"><a class="btn btn-ink" href="contact.html">Request a WoundEye demo</a><a class="btn btn-line" href="woundeye-health-plans.html">For health plans</a></div>
      <p class="doc-inline">Brochures for health plans (PDF): <a href="assets/docs/woundeye-medicare-advantage-brochure-1.pdf" target="_blank" rel="noopener">The wound that costs the most</a> &middot; <a href="assets/docs/woundeye-medicare-advantage-brochure-2.pdf" target="_blank" rel="noopener">Catch the wound at home</a></p>
      <p class="doc-inline">Visit the WoundEye website: <a href="https://woundeye.com/" target="_blank" rel="noopener">woundeye.com</a></p>
    </div>
    <figure class="figure">
      <div class="plate">{foot_plate('fig-we')}</div>
      <figcaption><b>Fig. 1.</b> Body map, sole view. The carer selects <i>Lt heel</i>, so her photo joins the same timeline as the one her father sent that morning.</figcaption>
    </figure>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <h2>How a wound moves through WoundEye</h2>
      <p class="lede">Workflow agents handle the routing. A certified wound specialist makes every clinical decision, and the result comes back to the patient and carer in the app.</p>
    </div>
  </div>
  <div class="wrap flow-wide mt-2">
    {FLOW_WE}
  </div>
  <div class="wrap">
    <ol class="steps">
      <li><div><h3>A guided photograph</h3><p>On any mobile device, from the camera or a photo already taken. Location data and camera details are stripped before anything is saved, and the image goes to secure storage, not the camera roll.</p></div></li>
      <li><div><h3>Two taps to say where</h3><p>First the body region, then the exact spot on a close-up with top and sole views. Every later photo of that spot is filed under the same site.</p></div></li>
      <li><div><h3>How it feels, in plain words</h3><p>A face for pain, a note in the patient&rsquo;s own words, and size compared to something familiar: a dime, a quarter, a golf ball. A ruler is welcome but never required.</p></div></li>
      <li><div><h3>Onto a specialist&rsquo;s worklist</h3><p>Workflow agents check that the photo is usable and filed to the right body site, then place it on a certified wound specialist&rsquo;s worklist and track it until it has been reviewed.</p></div></li>
      <li><div><h3>A specialist assesses, and the result comes back</h3><p>The specialist determines type and stage, completes a structured assessment and sets the follow-up. The result returns through the app in plain language, to the patient and to their carer.</p></div></li>
    </ol>
  </div>
</section>

<section class="section paper">
  <div class="wrap">
    <div class="section-head">
      <h2>Built for the three people around every wound</h2>
      <p class="lede">The same record, seen from three sides. Each person sees what their role needs and nothing more.</p>
    </div>
    <div class="roles">
      <div class="role">
        <p class="who">The patient</p>
        <h3>One button</h3>
        <ul>
          <li>Add wound photo, and a list of wounds already sent. Nothing to set up.</li>
          <li>A first read in seconds and a clinician&rsquo;s answer the same day.</li>
          <li>Plain-language care guidance for tonight, with sources, and the emergency signs that mean call 911.</li>
          <li>Print a report or send a secure link to their own doctor.</li>
        </ul>
      </div>
      <div class="role">
        <p class="who">The family carer</p>
        <h3>One sign-in, everyone she cares for</h3>
        <ul>
          <li>Each person is a separate card, so records never mix.</li>
          <li>She sees only the people linked to her, enforced in the database.</li>
          <li>Her note and her worry travel with the photo to the clinician.</li>
          <li>Request a consultation with the patient&rsquo;s primary care doctor from the record.</li>
        </ul>
      </div>
      <div class="role">
        <p class="who">The clinician</p>
        <h3>A caseload that sorts itself</h3>
        <ul>
          <li>One view across organizations and facilities, with live counts by wound type: flagged, follow-up due, recent.</li>
          <li>Structured assessment with the PUSH Tool 3.0 score computed as you type.</li>
          <li>Infection screening, treatment, follow-up date and referral in one form.</li>
          <li>A photo film strip per body site to judge direction at a glance.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap article">
    <h2>A record that holds up</h2>
    <aside class="note"><b>Language we use.</b> WoundAI gives a first suggestion, which a clinician confirms or corrects. WoundEye is clinician-governed decision support.</aside>
    <p>Allergies sit at the top of every record, so nobody reaches for the wrong dressing or antibiotic. The primary care provider and carer are one tap away. Patient education, AI-assisted or written by the clinician, is kept with the date it was provided.</p>
    <p>When a follow-up assessment clears a suspected infection, the flag on the dashboard clears with it. What a clinician records at the bedside is what the next clinician sees the next morning: nothing is re-typed and nothing is remembered.</p>

    <h2 id="privacy">Privacy</h2>
    <aside class="note"><b>Business Associate Agreement</b> available on request.</aside>
    <ul>
      <li>Encrypted in transit and at rest.</li>
      <li>Access by role and relationship, enforced in the database, not the screen.</li>
      <li>Every change logged by the database itself.</li>
      <li>Photographs never pass through a third-party AI service.</li>
      <li>Shared reports go as secure links, so details never sit in an inbox.</li>
    </ul>

    <h2 id="integrations">Integrations</h2>
    <p>WoundEye connects to what you already run: structured export in FHIR R4, JSON and CSV; a pull API with keys; signed webhooks that push new records on a schedule, with a delivery log; and PDF reports ready for the chart. Where a clinic&rsquo;s scheduling or EHR is connected through FHIR, patients can schedule a visit from their care plan.</p>
    <p class="small">EHR integrations are scoped per customer.</p>
  </div>
</section>
''' + cta() + f'''
<div class="wrap"><p class="small" style="padding:1.5rem 0">{WOUNDEYE_LEGAL}</p></div>
<script src="assets/flow.js"></script>''')

    # ---------- WOUNDEYE FOR HEALTH PLANS
    B1 = 'assets/docs/woundeye-medicare-advantage-brochure-1.pdf'
    B2 = 'assets/docs/woundeye-medicare-advantage-brochure-2.pdf'
    DOCS = f"""<div class="doc-links">
      <p class="doc-head">Download the brochures (PDF)</p>
      <a href="{B1}" target="_blank" rel="noopener"><span class="doc-ico">PDF</span><span><b>The wound that costs the most is the one nobody saw in time</b><small>One-page brochure for Medicare Advantage plans &middot; 2.8 MB</small></span></a>
      <a href="{B2}" target="_blank" rel="noopener"><span class="doc-ico">PDF</span><span><b>Catch the wound at home, before it becomes a claim</b><small>One-page brochure for Medicare Advantage plans &middot; 1.8 MB</small></span></a>
    </div>"""
    LM = f'<div class="nav-drop sub-drop"><button type="button" aria-expanded="false" aria-haspopup="true">Learn more {CARET}</button><div class="drop-panel drop-docs"><div class="drop-col"><p class="drop-head">Brochures for Medicare Advantage plans (PDF)</p><a href="{B1}" target="_blank" rel="noopener"><strong>The wound that costs the most is the one nobody saw in time</strong><span>One-page brochure &middot; PDF, 2.8 MB</span></a><a href="{B2}" target="_blank" rel="noopener"><strong>Catch the wound at home, before it becomes a claim</strong><span>One-page brochure &middot; PDF, 1.8 MB</span></a></div></div></div>'
    def fn(n, first=False):
        return f'<sup class="fn"><a href="#ref-{n}"' + (f' id="r{n}"' if first else '') + f'>{n}</a></sup>'
    page('woundeye-health-plans', 'WoundEye for Medicare Advantage plans | Wound Solutions AI',
         'Catch the wound at home, before it becomes a claim. WoundEye lets members and caregivers photograph a wound and get a licensed wound-care clinician’s assessment the same day.', f"""
<div class="wrap subnav" aria-label="WoundEye"><span>WoundEye:</span><a href="woundeye.html">How it works</a><a href="woundeye-health-plans.html" aria-current="page">For health plans</a><a href="#why">Why it fits</a><a href="#member-story">Member story</a><a href="#pilot">Pilot</a>{LM}</div>
<section class="title-page compact">
  <div class="wrap title-grid" style="align-items:start">
    <div>
      <p class="kicker">For Medicare Advantage plans</p>
      <h1>The wound that costs the most is the one nobody saw in time</h1>
      <div class="abstract">
        <p>Catch the wound at home, before it becomes a claim. WoundEye lets members and family caregivers photograph a wound on any mobile device and get a licensed wound-care clinician&rsquo;s assessment back the same day. Small wounds get seen early, and care managers see them too.</p>
      </div>
      <div class="btn-row"><a class="btn btn-ink" href="contact.html">Book a 30-minute demonstration</a></div>
    </div>
    {DOCS}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="stats" style="margin-top:0">
      <div class="stat"><div class="v">46%</div><p>of Medicare patients discharged to home health get no home health visit within 14 days.{fn(1,True)}</p></div>
      <div class="stat"><div class="v">$11,710</div><p>added health care cost per year for a Medicare patient with a diabetic foot ulcer.{fn(2,True)}</p></div>
      <div class="stat"><div class="v">17.6%</div><p>of Medicare patients hospitalized with a diabetic foot ulcer lost a leg or died within 30 days.{fn(3,True)}</p></div>
      <div class="stat"><div class="v">150,000</div><p>non-traumatic leg amputations in the US each year, most of them in people with diabetes.{fn(4,True)}</p></div>
    </div>
  </div>
</section>

<section class="section paper" id="two-paths">
  <div class="wrap flow-wide">
    <h2 class="flow-title">Two paths for the same wound</h2>
    <p class="flow-intro-text">Every wound below starts the same way, small and at home. Watch it travel the usual path, where nobody clinical sees it until it becomes an episode, and the WoundEye path, where a licensed clinician sees it the same day.</p>
    {FLOW_MA}
  </div>
</section>

<section class="section paper">
  <div class="wrap article">
    <h2>The first person to see a wound is usually someone at home</h2>
    <p>A pressure injury on a heel, or an ulcer on the sole of a diabetic foot, does not announce itself. It starts small, at home, and the people around it are a spouse, a daughter, a home-health aide. By the time it reaches a clinic it has often become the episode every plan knows: an admission, a surgery, sometimes an amputation. Medicare spent as much as $67 billion on wound care in 2019,{fn(5,True)} and the expensive part is almost always the late part.</p>
    <p>WoundEye changes where the first look happens. A member or caregiver photographs the wound on whatever mobile device they already own, marks the spot on a body map and answers a few plain questions. A licensed wound-care clinician reviews the photograph and writes the assessment, and that assessment becomes the record.</p>
    <p>The member gets an answer in plain language the same day. The care manager sees the same record, with a photo timeline, a trend line and the clinician&rsquo;s note when a wound is getting worse.</p>
    <blockquote class="pull mt-2">No clinic visit, no special camera, no kit. The wound gets seen while it is still small enough to be cheap.</blockquote>
  </div>
</section>

<section class="section" id="why">
  <div class="wrap">
    <div class="section-head"><h2>Four reasons it fits a plan</h2><p class="lede">Why care-management teams choose WoundEye for their highest-risk members.</p></div>
    <div class="reasons">
      <div><h3>Reach the wound before the expensive episode</h3><p>A diabetic foot ulcer or pressure injury noticed late can become an admission, a surgery or an amputation. WoundEye brings a clinician&rsquo;s assessment to the wound while it is still small.</p></div>
      <div><h3>Reach members where they are</h3><p>No clinic visit, no special camera, no kit. A guided photo on a mobile device, a tap on a body map and pain in plain language. It fits home-based care, post-discharge follow-up and rural members with no wound clinic nearby.</p></div>
      <div><h3>Support care coordination and member experience</h3><p>Every wound has a photo timeline, a measurement trend and a licensed clinician&rsquo;s sign-off on the record. When a wound is getting worse, the reviewing clinician flags it for the care manager.</p></div>
      <div><h3>Plug into care management</h3><p>Structured export in FHIR R4, JSON and CSV, a pull API and signed webhooks, and PDF reports ready for the chart. Care managers get the member&rsquo;s whole wound history in one place. Pricing is per member per month, scaled to plan size.</p></div>
    </div>
  </div>
</section>

<section class="section paper">
  <div class="wrap">
    <div class="section-head"><h2>How it works</h2><p class="lede">Four steps from the kitchen table to a clinician-signed record.</p></div>
    <ol class="steps">
      <li><div><h3>Capture</h3><p>The member or caregiver photographs the wound on a mobile device. Image metadata is stripped and the photo goes to secure storage.</p></div></li>
      <li><div><h3>Locate</h3><p>Two taps on a clinical body map, region then zone, so the same site is tracked visit after visit.</p></div></li>
      <li><div><h3>Assess</h3><p>A licensed wound-care clinician reviews the photograph and its location and assesses type, severity and stage.</p></div></li>
      <li><div><h3>Respond</h3><p>The clinician completes the structured assessment, gives the member guidance and sets follow-up. The record shows who decided.</p></div></li>
    </ol>
  </div>
</section>

<section class="section" id="member-story">
  <div class="wrap">
    <div class="section-head">
      <h2>Mr. R.&rsquo;s heel was the same wound on day 2. What changed was who saw it.</h2>
      <p class="lede">Mr. R. is 78, has diabetes, and went home four days after a hip repair. On his second day home, his daughter notices a dark purple patch on his right heel. It doesn&rsquo;t hurt. Here is the same month told twice.</p>
    </div>
    <div class="timelines">
      <div class="timeline without">
        <h3>Without a first look</h3>
        <ol>
          <li><b>Day 2</b><span>The family decides to mention it at his two-week follow-up.</span></li>
          <li><b>Day 14</b><span>The skin has opened. The office refers him to a wound clinic; the first slot is two weeks out.</span></li>
          <li><b>Day 30</b><span>The clinic finds a deep, infected wound. He is admitted.</span></li>
          <li><b>After</b><span>The plan&rsquo;s first record of the wound is a hospital claim. Nothing shows when it started or what it looked like.</span></li>
        </ol>
      </div>
      <div class="timeline">
        <h3>With WoundEye</h3>
        <ol>
          <li><b>Day 2</b><span>His daughter photographs the heel. A clinician assesses it that day as a suspected deep pressure injury and flags his care manager.</span></li>
          <li><b>Day 3</b><span>His physician orders the heel offloaded and home wound care.</span></li>
          <li><b>Day 30</b><span>Weekly photos and measurements show the trend, so the care team knows whether the plan is working.</span></li>
          <li><b>After</b><span>The plan holds a dated, clinician-signed record from the first day, whatever care he goes on to need.</span></li>
        </ol>
      </div>
    </div>
    <p class="small mt-1">Mr. R. is an illustrative composite, not a real member and not a WoundEye result; outcomes are measured in pilot.</p>

    <h3 class="mt-3" style="font-weight:400;font-style:italic">Why this story is ordinary, not rare</h3>
    <div class="stats">
      <div class="stat"><div class="v">29.7%</div><p>of high-risk patients who developed a pressure injury in hospital were discharged home.{fn(6,True)}</p></div>
      <div class="stat"><div class="v">59.7%</div><p>of hospitalized stage 2&ndash;4 pressure ulcers had been recorded by the nursing home. Records miss wounds.{fn(7,True)}</p></div>
      <div class="stat"><div class="v">2&times;</div><p>Trained nurses told moisture damage from pressure injury correctly 70.7% of the time, against 35.6% untrained.{fn(8,True)}</p></div>
      <div class="stat"><div class="v">Stage</div><p>decides coverage. Medicare lists treating extensive pressure ulcers as skilled nursing; a small ulcer generally is not.{fn(9,True)}</p></div>
    </div>
  </div>
</section>

<section class="section ink">
  <div class="wrap">
    <h2>What the record does for a plan</h2>
    <dl class="pillars" style="border-top-color:#E9E1D0">
      <div><dt style="color:#F7F2E8">An earlier first look</dt><dd style="color:#C8C1B1">The wound is assessed the day someone at home notices it, where your highest-risk members already are: post-discharge and in rural counties.</dd></div>
      <div style="border-left-color:#4B5468"><dt style="color:#F7F2E8">Evidence for the right level of care</dt><dd style="color:#C8C1B1">Dated photos and measurements show what the wound needs, in either direction, with a licensed clinician&rsquo;s sign-off on every assessment.</dd></div>
      <div style="border-left-color:#4B5468"><dt style="color:#F7F2E8">A decision trail</dt><dd style="color:#C8C1B1">Post-acute coverage decisions are under review by the Senate and the courts.{fn(10,True)} The record, with an audit trail written by the database, shows what each one rested on.</dd></div>
    </dl>
  </div>
</section>

<section class="section paper">
  <div class="wrap article">
    <h2>Privacy and security, by design</h2>
    <ul>
      <li>Encrypted in transit and at rest.</li>
      <li>Access by role and relationship, enforced in the database, not the screen.</li>
      <li>An immutable audit trail of every change, readable only by administrators.</li>
      <li>Photographs never pass through a third-party AI service.</li>
      <li>Emails carry no patient details; exports go by scoped API key.</li>
      <li>A Business Associate Agreement is available.</li>
    </ul>
  </div>
</section>

<section class="section" id="pilot">
  <div class="wrap title-grid" style="align-items:start">
    <div>
      <h2>See it with your own members</h2>
      <p class="lede mt-1">Bring your care-management team to a thirty-minute live demonstration of the member and clinician workflow. If it earns its place, we scope a pilot inside one care-management program and measure what changes.</p>
      <div class="btn-row"><a class="btn btn-ink" href="contact.html">Book a demonstration</a><a class="btn btn-line" href="mailto:hello@woundeye.com">hello@woundeye.com</a></div>
    </div>
    {DOCS}
  </div>
</section>

<section class="section paper" style="border-bottom:0">
  <div class="wrap">
    <h2 style="font-size:1.4rem">Notes</h2>
    <ol class="references mt-1">
      <li id="ref-1">Li, Qi, Werner, <i>JAMA Network Open</i>, 2020 (home health visits after hospital discharge, 2016 Medicare data).</li>
      <li id="ref-2">Rice et al., <i>Diabetes Care</i>, 2014 (cost of diabetic foot ulcers to Medicare).</li>
      <li id="ref-3">Brennan et al., <i>JAMA Network Open</i>, 2022 (Medicare beneficiaries hospitalized with diabetic foot ulcers, 2013&ndash;2014).</li>
      <li id="ref-4">Creager et al., <i>Circulation</i>, 2021 (non-traumatic amputations).</li>
      <li id="ref-5">Carter, Fife, Nusgart et al., <i>Journal of Medical Economics</i>, 2023 (Medicare wound care cost, 2019: the study&rsquo;s high estimate, counting care where a wound was a primary or secondary diagnosis).</li>
      <li id="ref-6">ISPOR 2026 poster, all-payor claims 2023.</li>
      <li id="ref-7">Chen, Gleason, Sanghavi, <i>Medical Care</i>, 2022.</li>
      <li id="ref-8">Beeckman et al., <i>BMJ Quality &amp; Safety</i>.</li>
      <li id="ref-9">42 CFR 409.33; SSA POMS HI 00601.350.</li>
      <li id="ref-10">Senate PSI majority staff report, Oct. 2024; Estate of Lokken v. UnitedHealth Group (D. Minn.), pending.</li>
    </ol>
    <p class="small mt-2">WoundEye is an application that connects members with a licensed wound-care clinician. The app itself does not diagnose, treat, cure or prevent disease; every assessment is made by the reviewing clinician. WoundEye is a product of Wound Solutions AI LLC.</p>
  </div>
</section>
"<script src="assets/flow.js"></script>
""")

    # ---------- PRESSURE ULCER STUDY
    page('pressure-ulcer-study', 'Pressure ulcer study: 78.9% fewer full-thickness HAPIs | Wound Solutions AI',
         'Evaluating a hybrid approach to wound management and risk prevention in a 236-bed long-term acute care hospital, 2017 to 2024.', '''
<div class="wrap subnav" aria-label="Evidence"><span>Evidence:</span><a href="evidence.html">All evidence</a><a href="pressure-ulcer-study.html" aria-current="page">Pressure ulcer study</a><a href="wound-liability.html">Wounds and liability</a></div>
<section class="title-page compact">
  <div class="wrap">
    <p class="kicker">Poster study, The Hospital for Special Care, New Britain, Connecticut</p>
    <h1 style="max-width:26ch;font-size:clamp(2rem,3.8vw,3rem)">Evaluating the efficacy of a hybrid approach for wound management and risk prevention in a 236-bed long-term acute care hospital</h1>
    <p class="sans mt-2" style="font-size:1rem">Michael Seabock, RN, WCC, The Hospital for Special Care &nbsp;&middot;&nbsp; Rhett A. Gustafson, BA, WoundRounds&reg;</p>
    <div class="abstract">
      <p class="abstract-label">Abstract</p>
      <p>A large, high-acuity LTACH combined centralized clinical expertise with decentralized care-team access to a wound management solution. Over eight years, its full-thickness hospital-acquired pressure injury rate fell 70.2% between the four-year baseline and the most recent four years, and 78.9% in the most recent two years.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="stats" style="margin-top:0">
      <div class="stat"><div class="v">78.9%</div><p>improvement in full-thickness HAPI rate, most recent two years</p></div>
      <div class="stat"><div class="v">70.2%</div><p>improvement, four-year baseline against the most recent four years</p></div>
      <div class="stat"><div class="v">58%</div><p>of the 236-patient census in the three highest-risk Braden Scale categories</p></div>
      <div class="stat"><div class="v">8 yrs</div><p>of HAPI and risk data analyzed, 2017 to 2024</p></div>
    </div>
  </div>
</section>

<section class="section paper">
  <div class="wrap article">
    <h2>Introduction</h2>
    <aside class="note"><b>Setting.</b> Long-term acute care hospital, 236 beds, high acuity.</aside>
    <p>The Hospital for Special Care pairs centralized clinical expertise with decentralized care-team access to a wound management solution. The solution supports a culture of transparency, accountability and performance improvement, and reinforces patient safety.</p>
    <p>It provides the technology foundation for wound and skin integrity processes: easy documentation, tracking and trending of wound data, and dashboards that show each patient&rsquo;s risk drivers for potential harm.</p>

    <h2>Objective and methods</h2>
    <p>The study set out to show the benefits for care teams and clinical outcomes of linking a patient safety culture with a wound management solution over eight years.</p>
    <p>Hospital-acquired pressure injury data from 2017 to 2024 was analyzed alongside facility risk data. The authors mapped wound and Braden Scale risk data against the patient safety protocols the facility introduced during the study period.</p>

    <h2>Results</h2>
    <aside class="note"><b>Population risk.</b> 58% of patients in the three highest Braden risk categories indicates a higher-risk population than typical.</aside>
    <ul>
      <li>The full-thickness HAPI rate improved by <b>70.2%</b> from the four-year baseline to the most recent four years.</li>
      <li>The full-thickness HAPI rate improved by <b>78.9%</b> in the most recent two years.</li>
      <li><b>58%</b> of the 236-patient census fell into the three highest-risk Braden Scale categories.</li>
    </ul>

    <h2>Conclusion</h2>
    <p>The facility raised its standards of care and improved wound outcomes by combining its patient safety culture and tested nursing protocols with a wound management system that supports care teams.</p>
    <p class="small">The full poster is available as a PDF. <a href="contact.html">Request a copy</a>.</p>
  </div>
</section>
''' + cta('Bring these results to your facility.', 'Talk to our clinical team about WoundRounds and AssureStage.'))

    # ---------- WOUNDS AND LIABILITY
    page('wound-liability', 'Wounds and liability in post-acute care | Wound Solutions AI',
         'Public claims data on litigation in skilled nursing, assisted living, LTACH and sub-acute care, and why wound documentation matters.', '''
<div class="wrap subnav" aria-label="Evidence"><span>Evidence:</span><a href="evidence.html">All evidence</a><a href="pressure-ulcer-study.html">Pressure ulcer study</a><a href="wound-liability.html" aria-current="page">Wounds and liability</a></div>
<section class="title-page compact">
  <div class="wrap">
    <p class="kicker">Research brief for operators, risk managers and brokers</p>
    <h1>Wounds are the claim you can actually control</h1>
    <div class="abstract">
      <p class="abstract-label">Summary</p>
      <p>Litigation is routine in post-acute and long-term care. A typical nursing home faces about one liability claim a year per 100 beds, and claims average $210,000 to $290,000. Pressure injuries are the second-largest driver after falls, and unlike many falls they come down to assessment and documentation.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap article">
    <h2>How often facilities are sued</h2>
    <aside class="note"><b>Benchmarks</b> come from broker and actuarial studies measured per 100 occupied beds. Peer-reviewed counts per facility end in 2006.</aside>
    <p>Actuarial benchmarks put skilled nursing at about 0.8 to 1.1 claims per 100 occupied beds a year, at roughly $1,700 to $2,400 of liability cost per bed.<sup class="fn"><a href="#ref-1">1</a></sup><sup class="fn"><a href="#ref-2">2</a></sup> In a large study of 1,465 homes, even the best-performing homes carried a 40% annual risk of being sued, against 47% for the worst.<sup class="fn"><a href="#ref-3">3</a></sup> Good survey results alone do not insulate a facility.</p>
    <p>For a 120-bed facility, that means about one claim a year and roughly $200,000 to $290,000 of expected annual liability cost. Severity is rising faster than frequency: one 2024 benchmark projects long-term care severity up 3.7% a year against frequency up 0.3%.<sup class="fn"><a href="#ref-1">1</a></sup></p>
  </div>
</section>

<section class="section paper">
  <div class="wrap article">
    <h2>Pressure injuries: second only to falls</h2>
    <p>Every major dataset ranks wounds and pressure injuries second only to falls, at 16% to 22% of claims and about a fifth of loss dollars.</p>
    <div class="table-scroll">
    <table class="data">
      <caption>Share of claims or losses attributed to wounds</caption>
      <thead><tr><th>Source</th><th>Wounds&rsquo; share</th><th>Average cost</th></tr></thead>
      <tbody>
        <tr><td><a href="https://files.constantcontact.com/fca5db7d701/0dcf9608-2512-4725-a3ec-d53a33dbae32.pdf">CNA Aging Services, 12th ed.</a></td><td class="num">22.2% of closed claims</td><td>$261,678 SNF; $330,196 assisted living</td></tr>
        <tr><td><a href="https://www.wtwco.com/en-us/insights/2025/06/senior-living-claims-benchmarking-study-2025">WTW 2025</a></td><td class="num">20% of total losses</td><td>$145 per exposure</td></tr>
        <tr><td><a href="https://allyouneed.libertymutual.com/wp-content/uploads/2025/05/67-5938_SeniorCareClaimsStudy_FINAL.pdf">Liberty Mutual 2025</a></td><td class="num">16.3% of injury types</td><td>$201.9K per pressure ulcer or skin claim</td></tr>
        <tr><td><a href="https://hcp.hms.harvard.edu/publication/relationship-between-quality-care-and-negligence-litigation-nursing-homes">Studdert et al., NEJM 2011</a></td><td class="num">15.9% of lawsuits</td><td></td></tr>
      </tbody>
    </table>
    </div>
    <p class="mt-2">Plaintiffs usually recover: an older review found residents recovered in 87% of pressure-ulcer cases through verdicts or settlements.<sup class="fn"><a href="#ref-4">4</a></sup> Homes with more pressure-ulcer residents had higher odds of being sued.<sup class="fn"><a href="#ref-3">3</a></sup></p>
  </div>
</section>

<section class="section">
  <div class="wrap article">
    <h2>LTACH and sub-acute care: high exposure, no public benchmark</h2>
    <aside class="note"><b>Proxy, not a claims measure.</b> Clinical pressure-injury rates stand in where public claims data does not exist.</aside>
    <p>No public study measures how often LTACHs or sub-acute units are sued. These settings take the sickest post-acute patients, and develop new or worsened stage 2&ndash;4 pressure injuries at 3.07% of LTCH stays, against 1.56% in inpatient rehabilitation and 1.23% in skilled nursing.<sup class="fn"><a href="#ref-5">5</a></sup></p>
    <p>Short-stay rehab produces large verdicts. Recent pressure-injury cases include a $15.75 million verdict in California (2026) after a missed stage 3 injury during post-stroke rehab, and a $13.2 million verdict in New Jersey (2020) over stage 4 ulcers during a 94-day stay. Several verdicts are under appeal or post-trial motions.</p>
    <p>Carriers price these beds without a public benchmark, so documented wound-assessment controls give an underwriter something concrete to credit.</p>

    <h2>What it does to the insurance market</h2>
    <p>Skilled nursing liability rates are flat to +10% for 2026, with senior living professional liability forecast at +5% to +15% for 2027.<sup class="fn"><a href="#ref-6">6</a></sup><sup class="fn"><a href="#ref-7">7</a></sup> Excess limits are thinning, and carriers are adding abuse sub-limits and punitive-damages exclusions. Buyers are advised to highlight strong risk management at renewal.</p>

    <h2>Where documentation changes the outcome</h2>
    <ul>
      <li><b>Admission.</b> Wounds charted wrong or late at admission are where present-on-admission defenses fail.</li>
      <li><b>The chart.</b> The largest awards turned on charts that did not match the resident. Timestamped expert review closes that gap.</li>
      <li><b>The submission.</b> A documented daily wound review is a concrete control to put in front of an underwriter.</li>
    </ul>
    <div class="btn-row"><a class="btn btn-ink" href="solutions.html#wound-qa">About AssureStage</a></div>
  </div>
</section>

<section class="section paper" style="border-bottom:0">
  <div class="wrap">
    <h2 style="font-size:1.4rem">Notes</h2>
    <ol class="references mt-1">
      <li id="ref-1"><a href="https://www.marsh.com/us/industries/senior-living-long-term-care/insights/gl-pl-benchmark-report.html">Marsh / Oliver Wyman, 2024 GL/PL Benchmark</a>; Oliver Wyman / Marsh 2020 benchmark.</li>
      <li id="ref-2"><a href="https://aon.com/getmedia/69de85a2-5aad-40af-9dc1-0296f09137f1/2019-LTC-Report_Executive-Summary.aspx">Aon 2019 Long-Term Care Benchmark, executive summary</a>.</li>
      <li id="ref-3"><a href="https://hcp.hms.harvard.edu/publication/relationship-between-quality-care-and-negligence-litigation-nursing-homes">Studdert et al., <i>NEJM</i>, 2011</a> (4,716 claims, 1,465 homes, 1998&ndash;2006).</li>
      <li id="ref-4"><a href="https://pubmed.ncbi.nlm.nih.gov/16137292/">Voss et al., Long-term care liability for pressure ulcers</a>.</li>
      <li id="ref-5"><a href="https://rti.org/publication/cross-setting-comparison-risk-factors-pressure-injuries-acquired-post-acute-care">RTI / CMS cross-setting pressure injury study</a>.</li>
      <li id="ref-6"><a href="https://leadingage.org/wp-content/uploads/2026/08/EPIC-Senior-Living_2026-Mid-Year-Market-Review.pdf">EPIC, 2026 Mid-Year Senior Living Market Review</a>.</li>
      <li id="ref-7"><a href="https://www.wtwco.com/en-us/insights/2026/10/insurance-marketplace-realities-2027-senior-living">WTW, Insurance Marketplace Realities 2027: Senior Living</a>.</li>
    </ol>
    <p class="small mt-2">Benchmarks draw on participating providers and cap claims at $1 million, so they understate severe losses. Verdicts are illustrative and may be reduced on appeal. This page is informational and is not legal or insurance advice.</p>
  </div>
</section>
''')

    # ---------- CONTACT
    page('contact', 'Contact | Request a demo | Wound Solutions AI',
         'Request a demo of WoundRounds, WoundEye or AssureStage. Call +1 847.519.3500 or email information@woundsolutions.ai.', '''
<section class="title-page compact">
  <div class="wrap">
    <p class="kicker">Contact</p>
    <h1>Request a demo</h1>
    <div class="abstract"><p>Tell us about your organization and we&rsquo;ll set up a short demonstration with our clinical team. Health plans: bring a de-identified wound photograph and watch it assessed.</p></div>
  </div>
</section>
<section class="section" style="border-bottom:0">
  <div class="wrap contact-grid">
    <form class="form" id="demo-form" novalidate>
      <div class="row">
        <div><label for="f-name">Name</label><input id="f-name" name="name" autocomplete="name" required></div>
        <div><label for="f-org">Organization</label><input id="f-org" name="org" autocomplete="organization"></div>
      </div>
      <div class="row">
        <div><label for="f-email">Work email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
        <div><label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
      </div>
      <div><label for="f-role">Your role</label><input id="f-role" name="role" placeholder="e.g. Director of Nursing, Care management lead"></div>
      <div><label for="f-interest">I&rsquo;m interested in</label>
        <select id="f-interest" name="interest">
          <option>WoundRounds for our facilities</option>
          <option>WoundEye for patients and carers</option>
          <option>WoundEye for our health plan</option>
          <option>AssureStage</option>
          <option>Something else</option>
        </select>
      </div>
      <div><label for="f-msg">Message</label><textarea id="f-msg" name="message"></textarea></div>
      <p class="small mt-0">Please don&rsquo;t include patient information in this form.</p>
      <div><button class="btn btn-ink" type="submit">Send request</button></div>
      <p id="form-status" class="form-status" role="status" aria-live="polite"></p>
    </form>
    <div>
      <ul class="ruled">
        <li><h3>Phone</h3><p><a href="tel:+18475193500">+1 847.519.3500</a></p></li>
        <li><h3>Email</h3><p><a href="mailto:information@woundsolutions.ai">information@woundsolutions.ai</a></p></li>
        <li><h3>WoundEye</h3><p><a href="mailto:hello@woundeye.com">hello@woundeye.com</a></p></li>
        <li><h3>LinkedIn</h3><p><a href="https://www.linkedin.com/company/woundsolutionsai">Wound Solutions AI</a></p></li>
      </ul>
    </div>
  </div>
</section>
''')

    # ---------- LEGAL STUBS
    for slug, name in (('privacy', 'Privacy policy'), ('terms', 'Terms')):
        page(slug, f'{name} | Wound Solutions AI', f'{name} for Wound Solutions AI.', f'''
<section class="title-page compact">
  <div class="wrap">
    <p class="kicker">Legal</p>
    <h1>{name}</h1>
    <div class="abstract"><p>This page will carry the current {name.lower()} from woundsolutions.ai. Questions: <a href="mailto:information@woundsolutions.ai">information@woundsolutions.ai</a>.</p></div>
  </div>
</section>''')

    with open(os.path.join(OUT, 'assets', 'favicon.svg'), 'w') as f:
        f.write(MARK.replace('class="brand-mark" ', 'xmlns="http://www.w3.org/2000/svg" '))

if __name__ == '__main__':
    build()
    print('built', sorted(os.listdir(OUT)))
