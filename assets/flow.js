// How WoundRounds, Wound Solutions AI and Clinical Wound Assessments flow together.
// Self-contained: needs a <div id="wsa-flow"> with the markup from platform.html.
(function () {
var FLOW_N = 0;
function initFlow(root) {
  var uid = 'f' + (FLOW_N++);
  var svgNS = 'http://www.w3.org/2000/svg';
  var stage = root.querySelector('.flow-stage');
  var panel = root.querySelector('.flow-panel');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var C = { ink: '#1B2433', line: '#4A5670', sand: '#ECE3D1', paper: '#F7F2E8', brass: '#C9A45C', red: '#E08A74', muted: '#A9A293' };

  // ---------------------------------------------------------------- content
  var NODES = {
    snf:   { label: 'Skilled nursing', stage: 1, kind: 'src' },
    ltach: { label: 'LTACH', stage: 1, kind: 'src' },
    rehab: { label: 'Rehab hospital', stage: 1, kind: 'src' },
    cah:   { label: 'Critical access', stage: 1, kind: 'src' },
    home:  { label: 'Home and family', stage: 1, kind: 'src', home: true },
    wr:    { label: 'WoundRounds', sub: 'Bedside documentation', stage: 1, kind: 'prod' },
    we:    { label: 'WoundEye', sub: 'Capture at home', stage: 1, kind: 'prod', home: true },
    ai:    { label: 'Wound Solutions AI', sub: 'Workflow agents', sub2: 'Intake, worklist, routing', stage: 2, kind: 'core', home: true },
    cwa:   { label: 'Clinical Wound', label2: 'Assessments', sub: 'Certified wound specialists', stage: 3, kind: 'prod' },
    dash:  { label: 'Care team dashboard', sub: 'Flags and follow-ups', stage: 4, kind: 'out' },
    rec:   { label: 'Defensible record', sub: 'Survey and liability', stage: 4, kind: 'out' },
    ehr:   { label: 'EHR and plan export', sub: 'FHIR R4, PDF, CSV', stage: 4, kind: 'out' },
    trend: { label: 'Healing trend', sub: 'Timeline and PUSH score', stage: 4, kind: 'out' },
    wrn:   { label: 'WoundRounds', sub: 'Bedside photo and', sub2: 'nurse assessment', stage: 1, kind: 'prod', wide: true },
    mds:   { label: 'Wound record', sub: 'Updates the MDS', stage: 3, kind: 'prod' },
    risk:  { label: 'Risk dashboards', sub: 'Braden drivers, alerts', stage: 4, kind: 'out' },
    qa:    { label: 'QA and survey reports', sub: 'Facility risk summary', stage: 4, kind: 'out' },
    ehr2:  { label: 'EHR and other systems', sub: 'Facility EHR and more', stage: 4, kind: 'out' }
  };

  var STAGES = [
    { n: 0, title: 'The whole loop',
      body: 'Nurses document at the bedside in WoundRounds, and those assessments go straight to our Clinical Wound Assessment team. At home, WoundEye captures a photo, and Wound Solutions AI\u2019s workflow agents place it on the specialist\u2019s worklist. Certified wound specialists make every clinical decision. For WoundEye, the specialist\u2019s result goes back through the app to the patient, family carer or home nurse. The result also reaches the care team, the record and the systems that need it, and the next follow-up joins the same wound\u2019s timeline.' },
    { n: 1, title: 'Capture',
      body: 'Nurses document at the bedside in WoundRounds: photo, location, measurements and Braden risk, in the facility\u2019s own workflow. At home, a patient or family carer uses WoundEye: one photo on their own mobile device and two taps on a body map.' },
    { n: 2, title: 'Worklist',
      body: 'For WoundEye submissions, Wound Solutions AI runs workflow agents that do the administrative work. They check that the photo is usable and filed to the right body site, add it to the certified wound specialist\u2019s worklist, track it until it has been reviewed, send reminders and schedule follow-ups. Agents simplify, manage and scale the workflow. They make no clinical decisions.' },
    { n: 3, title: 'Clinical Wound Assessment',
      body: 'Certified wound specialists review WoundRounds assessments and WoundEye submissions. They determine wound type and stage, check measurements, compute the PUSH score and screen for infection. A wound with suspected infection is flagged. Every clinical decision is theirs, and the record shows who decided, and when. For WoundEye submissions, the result goes straight back to the patient and carer in the app.' },
    { n: 4, title: 'Act and record',
      body: 'For patients at home, the specialist\u2019s result comes back through WoundEye in plain language: what the wound is, what to do tonight, the signs that mean call 911, and the follow-up date. The same assessment reaches the care team dashboard as flags and follow-up dates. It becomes a dated, clinician-signed record ready for surveys and liability review. It exports to the EHR or health plan as FHIR R4, PDF or CSV, and it adds a point to the wound\u2019s healing trend. The next follow-up starts the loop again.' }
  ];

  var EDGES = [
    ['snf', 'wr'], ['ltach', 'wr'], ['rehab', 'wr'], ['cah', 'wr'], ['home', 'we'],
    ['wr', 'cwa'], ['we', 'ai'], ['ai', 'cwa'],
    ['cwa', 'dash'], ['cwa', 'rec'], ['cwa', 'ehr'], ['cwa', 'trend'],
    ['snf', 'wrn'], ['ltach', 'wrn'], ['rehab', 'wrn'], ['cah', 'wrn'], ['wrn', 'mds'],
    ['mds', 'risk'], ['mds', 'qa'], ['mds', 'ehr2'], ['mds', 'trend']
  ];

  // ---------------------------------------------------------------- layouts
  var LAYOUTS = {
    h: { W: 1200, H: 724, dir: 'h', loopLabel: [600, 34], resultLabel: [612, 688],
      pos: {
        snf: [95, 130, 150, 44], ltach: [95, 200, 150, 44], rehab: [95, 270, 150, 44], cah: [95, 340, 150, 44], home: [95, 530, 150, 44],
        wr: [345, 235, 190, 76], we: [345, 530, 190, 68],
        ai: [612, 528, 92],
        cwa: [880, 370, 214, 92],
        dash: [1110, 150, 168, 58], rec: [1110, 300, 168, 58], ehr: [1110, 450, 168, 58], trend: [1110, 590, 168, 58]
      } },
    v: { W: 400, H: 980, dir: 'v', loopLabel: [20, 720], resultLabel: null,
      pos: {
        snf: [110, 46, 170, 40], ltach: [292, 46, 170, 40], rehab: [110, 100, 170, 40], cah: [292, 100, 170, 40], home: [292, 170, 170, 40],
        wr: [110, 270, 178, 66], we: [292, 270, 160, 66],
        ai: [288, 440, 78],
        cwa: [200, 630, 250, 84],
        dash: [110, 800, 172, 56], rec: [292, 800, 172, 56], ehr: [110, 880, 172, 56], trend: [292, 880, 172, 56]
      } }
  };

  // WoundEye-only variant (used on the WoundEye page): home -> WoundEye -> agents -> specialist -> result back home
  var variant = root.getAttribute('data-variant');
  var LAYOUTS_WE = {
    h: { W: 1200, H: 400, dir: 'h', resultLabel: [640, 352],
      caps: [[105, 'At home'], [355, 'Capture'], [650, 'Workflow agents'], [975, 'Clinical review']],
      pos: { home: [105, 180, 170, 48], we: [355, 180, 200, 76], ai: [650, 180, 92], cwa: [975, 180, 230, 96] } },
    v: { W: 400, H: 640, dir: 'v', resultLabel: null,
      pos: { home: [190, 50, 210, 46], we: [190, 160, 210, 68], ai: [190, 340, 82], cwa: [190, 540, 250, 86] } }
  };
  var STAGES_WE = [
    { n: 0, title: 'The WoundEye loop',
      body: 'A patient, family carer or home nurse photographs the wound in WoundEye. Wound Solutions AI\u2019s workflow agents check the photo in and place it on a certified wound specialist\u2019s worklist. The specialist makes the assessment, and the result goes back through the app to the patient and carer.' },
    { n: 1, title: 'Capture',
      body: 'One guided photo on any mobile device, two taps on a body map to mark the spot, and a few plain questions about pain and size. Location data and camera details are stripped before the photo is stored.' },
    { n: 2, title: 'Worklist',
      body: 'Workflow agents do the administrative work. They check that the photo is usable and filed to the right body site, add it to the specialist\u2019s worklist, track it until it has been reviewed, send reminders and schedule follow-ups. They make no clinical decisions.' },
    { n: 3, title: 'Clinical review',
      body: 'A certified wound specialist reviews the photograph and its location, determines wound type and stage, screens for infection and sets the follow-up. Every clinical decision is theirs, and the record shows who decided, and when.' },
    { n: 4, title: 'Result',
      body: 'The specialist\u2019s result comes back through WoundEye in plain language: what the wound is, what to do tonight, the signs that mean call 911, and the follow-up date. The carer sees it too, and every follow-up photo joins the same wound\u2019s timeline.' }
  ];
  if (variant === 'woundeye') STAGES = STAGES_WE;

  // WoundRounds-only variant (used on the Solutions page): facilities -> WoundRounds -> specialists -> outputs
  var LAYOUTS_WR = {
    h: { W: 1200, H: 560, dir: 'h', loopLabel: [600, 34],
      caps: [[110, 'Where wounds are seen'], [400, 'Bedside documentation'], [730, 'Clinical review'], [1060, 'Act and record']],
      pos: {
        snf: [110, 150, 160, 46], ltach: [110, 230, 160, 46], rehab: [110, 310, 160, 46], cah: [110, 390, 160, 46],
        wr: [400, 270, 200, 80], cwa: [730, 300, 230, 96],
        dash: [1060, 140, 190, 60], rec: [1060, 250, 190, 60], ehr: [1060, 360, 190, 60], trend: [1060, 470, 190, 60]
      } },
    v: { W: 400, H: 720, dir: 'v', loopLabel: [20, 470],
      pos: {
        snf: [110, 46, 170, 40], ltach: [292, 46, 170, 40], rehab: [110, 100, 170, 40], cah: [292, 100, 170, 40],
        wr: [200, 230, 220, 70], cwa: [200, 420, 250, 84],
        dash: [110, 590, 172, 56], rec: [292, 590, 172, 56], ehr: [110, 670, 172, 56], trend: [292, 670, 172, 56]
      } }
  };
  var STAGES_WR = [
    { n: 0, title: 'The WoundRounds loop',
      body: 'Nurses document at the bedside in WoundRounds, and each assessment goes straight to our Clinical Wound Assessment team. Certified wound specialists review it, flag what needs attention and sign the record. The result reaches the care team dashboard, the defensible record, the EHR and the healing trend, and the next assessment joins the same wound\u2019s timeline.' },
    { n: 1, num: 1, title: 'Bedside documentation',
      body: 'Nurses in skilled nursing, LTACH, rehabilitation and critical access hospitals document at the bedside in WoundRounds: photo, location, measurements and Braden risk, in the facility\u2019s own workflow. Risk dashboards show each patient\u2019s drivers for potential harm.' },
    { n: 2 },
    { n: 3, num: 2, title: 'Clinical review',
      body: 'Certified wound specialists on our Clinical Wound Assessment team review WoundRounds assessments. They check staging and measurements, compute the PUSH score and screen for infection. A wound with suspected infection is flagged. The record shows who decided, and when.' },
    { n: 4, num: 3, title: 'Act and record',
      body: 'The reviewed assessment reaches the care team dashboard as flags and follow-up dates. It becomes a dated, clinician-signed record ready for surveys and liability review, exports to the EHR, and adds a point to the wound\u2019s healing trend. Flagged wounds come back for follow-up, joining the same timeline.' }
  ];
  if (variant === 'woundrounds') STAGES = STAGES_WR;

  // WoundRounds on its own: the facility nurse captures and assesses; the record feeds the MDS and EHR
  var LAYOUTS_WRN = {
    h: { W: 1200, H: 560, dir: 'h', loopLabel: [600, 34], loopFrom: 'risk', loopTo: 'wrn',
      caps: [[110, 'Where wounds are seen'], [400, 'Bedside capture and assessment'], [730, 'Wound record'], [1060, 'Shared with']],
      pos: {
        snf: [110, 150, 160, 46], ltach: [110, 230, 160, 46], rehab: [110, 310, 160, 46], cah: [110, 390, 160, 46],
        wrn: [400, 270, 210, 92], mds: [730, 300, 210, 84],
        risk: [1060, 140, 200, 60], qa: [1060, 250, 200, 60], ehr2: [1060, 360, 200, 60], trend: [1060, 470, 200, 60]
      } },
    v: { W: 400, H: 720, dir: 'v', loopLabel: [20, 470], loopFrom: 'risk', loopTo: 'wrn',
      pos: {
        snf: [110, 46, 170, 40], ltach: [292, 46, 170, 40], rehab: [110, 100, 170, 40], cah: [292, 100, 170, 40],
        wrn: [200, 230, 230, 84], mds: [200, 420, 230, 76],
        risk: [110, 590, 172, 56], qa: [292, 590, 172, 56], ehr2: [110, 670, 172, 56], trend: [292, 670, 172, 56]
      } }
  };
  var STAGES_WRN = [
    { n: 0, title: 'WoundRounds on its own',
      body: 'The facility nurse photographs the wound at the bedside on the WoundRounds mobile app and completes the assessment: location, measurements, wound bed, Braden risk and treatment. The assessment updates the wound record, which feeds the MDS, and passes to the EHR and the dashboards and reports the care team works from. Follow-up assessments join the same wound\u2019s timeline.' },
    { n: 1, num: 1, title: 'Bedside capture and assessment',
      body: 'At the bedside, the nurse captures the photo on the WoundRounds mobile app and records the assessment with standard tools such as the Braden Scale and the PUSH score. WoundRounds is built to capture complete, non-conflicting wound data in the facility\u2019s own workflow.' },
    { n: 2 },
    { n: 3, num: 2, title: 'Wound record',
      body: 'The nurse\u2019s assessment updates the resident\u2019s wound record in WoundRounds, the wound-dedicated EHR, and supports the wound items in the MDS. Every photo and measurement for the same site stays on one timeline.' },
    { n: 4, num: 3, title: 'Shared with',
      body: 'The record flows to the facility\u2019s EHR and other systems, to risk dashboards that show each patient\u2019s drivers for harm, and to QA and survey reports. Wounds that need another look come back for follow-up.' }
  ];
  if (variant === 'woundrounds-core') STAGES = STAGES_WRN;

  // ---------------------------------------------------------------- state
  var S = { L: null, mode: variant === 'woundeye' ? 'home' : (variant === 'woundrounds' || variant === 'woundrounds-core') ? 'fac' : 'both', perDay: (root.querySelector("[data-rate]") ? +root.querySelector("[data-rate]").value : 150), playing: !reduce, stage: 0, focus: null,
            counts: { captured: 0, read: 0, confirmed: 0, flagged: 0, record: 0, results: 0 }, simSeconds: 0 };
  var svg, gEdges, gFlow, gNodes, gParts, paths = {}, nodeEls = {}, particles = [], pool = [];
  var spawnAcc = 0, last = 0;

  function el(name, attrs, parent) {
    var e = document.createElementNS(svgNS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  // anchor points on a node, by side
  function anchor(id, side) {
    var p = S.L.pos[id];
    if (NODES[id].kind === 'core') {
      var r = p[2];
      return { r: [p[0] + r, p[1]], l: [p[0] - r, p[1]], b: [p[0], p[1] + r], t: [p[0], p[1] - r] }[side];
    }
    var w = p[2] / 2, h = p[3] / 2;
    return { r: [p[0] + w, p[1]], l: [p[0] - w, p[1]], b: [p[0], p[1] + h], t: [p[0], p[1] - h] }[side];
  }

  function edgePath(a, b) {
    var h = S.L.dir === 'h';
    var s = anchor(a, h ? 'r' : 'b'), e = anchor(b, h ? 'l' : 't');
    if (h) { var dx = (e[0] - s[0]) * 0.5; return 'M' + s + ' C' + (s[0] + dx) + ',' + s[1] + ' ' + (e[0] - dx) + ',' + e[1] + ' ' + e; }
    var dy = (e[1] - s[1]) * 0.5; return 'M' + s + ' C' + s[0] + ',' + (s[1] + dy) + ' ' + e[0] + ',' + (e[1] - dy) + ' ' + e;
  }

  function resultPath() {
    var L = S.L;
    if (L.dir === 'h') {
      var s0 = anchor('cwa', 'b'), w = anchor('we', 'b'), h = anchor('home', 'b'), a = S.L.pos.ai;
      var yLow = a[1] + a[2] + 32;
      return 'M' + s0 + ' C' + s0[0] + ',' + (yLow - 20) + ' ' + (a[0] + 150) + ',' + yLow + ' ' + a[0] + ',' + yLow +
             ' C' + (a[0] - 150) + ',' + yLow + ' ' + (w[0] + 60) + ',' + (w[1] + 20) + ' ' + w[0] + ',' + (w[1] + 6) +
             ' C' + (w[0] - 70) + ',' + (w[1] + 40) + ' ' + (h[0] + 40) + ',' + (h[1] + 40) + ' ' + h[0] + ',' + h[1];
    }
    var c = anchor('cwa', 'r'), hm = anchor('home', 'r');
    return 'M' + c + ' C' + (c[0] + 55) + ',' + c[1] + ' 392,' + (c[1] - 20) + ' 392,' + (c[1] - 70) + ' L392,' + (hm[1] + 50) + ' C392,' + (hm[1] + 10) + ' ' + (hm[0] + 10) + ',' + hm[1] + ' ' + hm;
  }

  function loopPath() {
    var L = S.L;
    if (L.dir === 'h') {
      var s = anchor(L.loopFrom || 'dash', 't'), e = anchor(L.loopTo || 'wr', 't');
      return 'M' + s + ' C' + s[0] + ',40 ' + (s[0] - 60) + ',52 ' + (s[0] - 160) + ',52 L' + (e[0] + 140) + ',52 C' + (e[0] + 40) + ',52 ' + e[0] + ',60 ' + e;
    }
    var s2 = anchor(L.loopFrom || 'dash', 'l'), e2 = anchor(L.loopTo || 'wr', 'l');
    return 'M' + s2 + ' C' + 8 + ',' + s2[1] + ' ' + 8 + ',' + (s2[1] - 30) + ' 8,' + (s2[1] - 90) + ' L8,' + (e2[1] + 60) + ' C8,' + (e2[1] + 10) + ' 12,' + e2[1] + ' ' + e2;
  }

  // ---------------------------------------------------------------- build
  function build() {
    var wide = root.clientWidth >= 760;
    var L = (variant === 'woundeye' ? LAYOUTS_WE : variant === 'woundrounds' ? LAYOUTS_WR : variant === 'woundrounds-core' ? LAYOUTS_WRN : LAYOUTS)[wide ? 'h' : 'v'];
    if (S.L === L && svg) return;
    S.L = L;
    stage.innerHTML = '';
    particles.forEach(function (p) { p.el.remove(); }); particles = []; pool = []; paths = {}; nodeEls = {};

    svg = el('svg', { viewBox: '0 0 ' + L.W + ' ' + L.H, role: 'img', 'aria-labelledby': uid + '-title ' + uid + '-desc', 'class': 'is-' + L.dir }, stage);
    el('title', { id: uid + '-title' }, svg).textContent = 'How WoundRounds, Wound Solutions AI and Clinical Wound Assessments flow together';
    el('desc', { id: uid + '-desc' }, svg).textContent = STAGES[0].body;

    var defs = el('defs', {}, svg);
    var pat = el('pattern', { id: uid + '-grid', width: 24, height: 24, patternUnits: 'userSpaceOnUse' }, defs);
    el('path', { d: 'M24 0H0V24', fill: 'none', stroke: '#24304A', 'stroke-width': 1 }, pat);
    el('rect', { width: L.W, height: L.H, fill: 'url(#' + uid + '-grid)' }, svg);

    // column captions
    var cap = el('g', { 'class': 'flow-caps' }, svg);
    var caps = L.caps ? L.caps : L.dir === 'h'
      ? [[95, 'Where wounds are seen'], [345, 'Capture'], [612, 'Workflow agents'], [880, 'Clinical review'], [1110, 'Act and record']]
      : [];
    caps.forEach(function (c) { var t = el('text', { x: c[0], y: L.H - 14, 'text-anchor': 'middle' }, cap); t.textContent = c[1]; });

    gEdges = el('g', {}, svg);
    gFlow = el('g', {}, svg);
    EDGES.forEach(function (e) {
      if (!L.pos[e[0]] || !L.pos[e[1]]) return;
      var id = e[0] + '-' + e[1], d = edgePath(e[0], e[1]);
      var base = el('path', { d: d, 'class': 'edge', 'data-a': e[0], 'data-b': e[1] }, gEdges);
      var flow = el('path', { d: d, 'class': 'edge-flow', 'data-a': e[0], 'data-b': e[1] }, gFlow);
      paths[id] = { el: base, flow: flow, len: base.getTotalLength(), a: e[0], b: e[1] };
    });
    var lf = L.loopFrom || 'dash', lt = L.loopTo || 'wr';
    if (L.pos[lf] && L.pos[lt]) {
      var lp = loopPath();
      var lb = el('path', { d: lp, 'class': 'edge loop', 'data-a': lf, 'data-b': lt }, gEdges);
      el('path', { d: lp, 'class': 'edge-flow loop', 'data-a': lf, 'data-b': lt }, gFlow);
      paths['loop'] = { el: lb, len: lb.getTotalLength(), a: lf, b: lt };
    }
    if (L.pos.home && L.pos.we && L.pos.ai) {
    var rp = resultPath();
    var rb = el('path', { d: rp, 'class': 'edge result', 'data-a': 'cwa', 'data-b': 'home' }, gEdges);
    el('path', { d: rp, 'class': 'edge-flow result', 'data-a': 'cwa', 'data-b': 'home' }, gFlow);
    paths['result'] = { el: rb, len: rb.getTotalLength(), a: 'cwa', b: 'home' };
    if (L.resultLabel) { var rl = el('text', { 'class': 'result-label', x: L.resultLabel[0], y: L.resultLabel[1], 'text-anchor': 'middle' }, svg); rl.textContent = 'Result: the specialist\u2019s assessment goes back through WoundEye to the patient and carer'; }
    }
    if (L.loopLabel) {
    var ll = el('text', { 'class': 'loop-label', x: L.loopLabel[0], y: L.loopLabel[1], 'text-anchor': L.dir === 'h' ? 'middle' : 'start' }, svg);
    if (L.dir === 'v') ll.setAttribute('transform', 'rotate(-90 ' + L.loopLabel[0] + ' ' + L.loopLabel[1] + ')');
    ll.textContent = L.dir === 'h' ? 'Follow-up: the next assessment joins the same wound’s timeline' : 'Follow-up joins the same timeline';
    }

    gParts = el('g', {}, svg);
    gNodes = el('g', {}, svg);
    Object.keys(NODES).forEach(function (id) { if (L.pos[id]) drawNode(id); });

    applyFocus();
  }

  function drawNode(id) {
    var n = NODES[id], p = S.L.pos[id];
    var g = el('g', { 'class': 'node node-' + n.kind + (n.home ? ' is-home' : ''), tabindex: 0, role: 'button', 'data-id': id,
                      'aria-label': n.label + (n.label2 ? ' ' + n.label2 : '') + (n.sub ? ', ' + n.sub : '') }, gNodes);
    if (n.kind === 'core') {
      el('circle', { cx: p[0], cy: p[1], r: p[2] + 14, 'class': 'core-pulse' }, g);
      el('circle', { cx: p[0], cy: p[1], r: p[2] + 6, 'class': 'core-ring' }, g);
      el('circle', { cx: p[0], cy: p[1], r: p[2], 'class': 'shape' }, g);
      txt(g, p[0], p[1] - 10, n.label, 'n-label core-label');
      txt(g, p[0], p[1] + 14, n.sub, 'n-sub');
      txt(g, p[0], p[1] + 32, n.sub2, 'n-sub');
    } else {
      el('rect', { x: p[0] - p[2] / 2, y: p[1] - p[3] / 2, width: p[2], height: p[3], rx: 3, 'class': 'shape' }, g);
      if (n.kind === 'src') {
        txt(g, p[0], p[1] + 5, n.label, 'n-src');
      } else if (n.sub2) {
        txt(g, p[0], p[1] - 14, n.label, 'n-label');
        txt(g, p[0], p[1] + 8, n.sub, 'n-sub');
        txt(g, p[0], p[1] + 25, n.sub2, 'n-sub');
      } else if (n.label2) {
        txt(g, p[0], p[1] - 12, n.label, 'n-label');
        txt(g, p[0], p[1] + 10, n.label2, 'n-label');
        txt(g, p[0], p[1] + 30, n.sub, 'n-sub');
      } else {
        txt(g, p[0], p[1] - (n.sub ? 4 : -5), n.label, n.kind === 'out' ? 'n-out' : 'n-label');
        if (n.sub) txt(g, p[0], p[1] + 16, n.sub, 'n-sub');
      }
    }
    g.addEventListener('click', function () { selectNode(id); });
    g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectNode(id); } });
    nodeEls[id] = g;
  }

  function txt(g, x, y, s, cls) { var t = el('text', { x: x, y: y, 'text-anchor': 'middle', 'class': cls }, g); t.textContent = s; return t; }

  // ---------------------------------------------------------------- focus / panel
  var NODE_NOTES = {
    wrn: 'The WoundRounds mobile app at the bedside. The nurse photographs the wound and completes the assessment: location, measurements, wound bed, Braden risk and treatment.',
    mds: 'The nurse\u2019s assessment updates the resident\u2019s wound record in WoundRounds, the wound-dedicated EHR, and supports the wound items in the MDS.',
    risk: 'Dashboards that show each patient\u2019s risk drivers for potential harm, so the team knows who needs attention first. Flagged wounds come back for follow-up.',
    qa: 'Quality assurance and survey-ready reporting, including the facility risk summary and facility-acquired wound tracking.',
    ehr2: 'The wound record passes to the facility\u2019s EHR and other systems.',
    snf: 'Daily documentation, risk prevention and survey readiness for long-term and short-stay residents.',
    ltach: 'The highest-acuity patients in post-acute care, and the highest rate of new pressure injuries.',
    rehab: 'Accurate admission assessments, so wounds present on arrival are recorded as such.',
    cah: 'Specialist-level wound oversight where wound specialists are scarce.',
    home: 'Patients at home, family carers and home nurses. They send the photo through WoundEye, and the specialist\u2019s result comes back to them in the app, in plain language, with guidance and the follow-up date.',
    wr: 'WoundRounds is the bedside tool: easy documentation, tracking and trending, and dashboards of each patient\u2019s risk drivers. Assessments go straight to the Clinical Wound Assessment team for review.',
    we: 'WoundEye: one photo on the mobile device the family already owns, two taps on a body map, and a few plain questions. Workflow agents pass the photo to the certified wound specialist\u2019s worklist, and route the specialist\u2019s result back to the patient and carer in the app.',
    ai: 'Workflow agents for WoundEye. They check each photo in, file it to the right body site, build and track the specialist\u2019s worklist, send reminders and schedule follow-ups. They make no clinical decisions. Photographs never pass through a third-party AI service.',
    cwa: 'Our certified wound specialists review WoundRounds assessments and WoundEye submissions, determine type and stage, and flag suspected infection. Every clinical decision is made by a specialist.',
    dash: 'Live counts by wound type: flagged, follow-up due and recent. A flag clears only when a later assessment clears it.',
    rec: 'A dated, clinician-signed record with an audit trail written by the database. This is what holds up in a survey or a lawsuit.',
    ehr: 'Structured export to the EHR or health plan: FHIR R4, JSON and CSV, signed webhooks, and PDF reports for the chart.',
    trend: 'Every follow-up photo lands on the same body site’s film strip, with the PUSH score, so direction is visible at a glance.'
  };

  function selectStage(n) { S.stage = n; S.focus = null; applyFocus(); }
  function selectNode(id) { S.focus = (S.focus === id) ? null : id; S.stage = S.focus ? NODES[id].stage : S.stage; applyFocus(); }

  var FAC = ['snf', 'ltach', 'rehab', 'cah', 'wr'];
  function offMode(id) { return (S.mode === 'fac' && NODES[id].home) || (S.mode === 'home' && FAC.indexOf(id) > -1); }

  function applyFocus() {
    var st = S.stage, f = S.focus;
    Object.keys(nodeEls).forEach(function (id) {
      var n = NODES[id];
      var hidden = offMode(id);
      var on = f ? (id === f) : (st === 0 || n.stage === st);
      if (variant === 'woundeye' && !f && st === 4) on = (id === 'home' || id === 'we');
      nodeEls[id].classList.toggle('dim', !on || hidden);
      nodeEls[id].classList.toggle('hidden-mode', hidden);
      nodeEls[id].classList.toggle('focus', id === f);
    });
    svg.querySelectorAll('.edge, .edge-flow').forEach(function (p) {
      var a = p.getAttribute('data-a'), b = p.getAttribute('data-b');
      var on = f ? (a === f || b === f) : (st === 0 || NODES[a].stage === st || NODES[b].stage === st);
      if (variant === 'woundeye' && !f && st) on = st === 4 ? p.classList.contains('result') : (!p.classList.contains('result') && on);
      var hidden = offMode(a) || offMode(b);
      p.classList.toggle('dim', !on || hidden);
      p.classList.toggle('off', hidden);
    });
    root.querySelectorAll('.flow-steps button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(+b.dataset.stage === st && !f));
    });
    var s = STAGES[st];
    var head = f ? (NODES[f].label + (NODES[f].label2 ? ' ' + NODES[f].label2 : '')) : (st ? (s.num || st) + '. ' + s.title : s.title);
    var body = f ? NODE_NOTES[f] : s.body;
    panel.querySelector('.panel-title').textContent = head;
    panel.querySelector('.panel-body').textContent = body;
  }

  // ---------------------------------------------------------------- particles
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function spawn() {
    var home = S.mode === 'home' || (S.mode === 'both' && Math.random() < 0.28);
    var route = home ? ['home-we', 'we-ai', 'ai-cwa'] : [pick(['snf', 'snf', 'ltach', 'rehab', 'cah']) + '-wr', 'wr-cwa'];
    var flag = Math.random() < 0.12;
    if (variant === 'woundrounds-core') {
      route = [pick(['snf', 'snf', 'ltach', 'rehab', 'cah']) + '-wrn', 'wrn-mds'];
      if (flag) route.push('mds-risk', 'loop');
      else route.push(pick(['mds-ehr2', 'mds-ehr2', 'mds-qa', 'mds-risk', 'mds-trend']));
    }
    else if (flag) { route.push('cwa-dash'); if (!home) route.push('loop'); }
    else route.push(pick(['cwa-dash', 'cwa-rec', 'cwa-rec', 'cwa-ehr', 'cwa-trend']));
    route = route.filter(function (id) { return paths[id]; });
    var c = pool.pop() || el('circle', { r: S.L.dir === 'h' ? 5 : 5.5 }, gParts);
    c.style.display = '';
    setState(c, 'raw');
    particles.push({ el: c, route: route, i: 0, d: 0, flag: flag, home: home, speed: 150 + Math.random() * 60 });
    S.counts.captured++;
  }

  function spawnResult(seed) {
    var c = pool.pop() || el('circle', { r: S.L.dir === 'h' ? 5 : 5.5 }, gParts);
    c.style.display = '';
    setState(c, 'result');
    particles.push({ el: c, route: ['result'], i: 0, d: 0, isResult: true, seed: seed, speed: 170 });
  }

  function setState(c, s) {
    c.setAttribute('class', 'pt pt-' + s);
  }

  function arrive(p, edgeId) {
    var to = paths[edgeId].b;
    var n = nodeEls[to];
    if (n && !reduce) { n.classList.remove('ping'); void n.getBBox(); n.classList.add('ping'); }
    if (to === 'ai') { setState(p.el, 'read'); if (!p.seed) S.counts.read++; }
    if (to === 'mds') { setState(p.el, p.flag ? 'flag' : 'ok'); if (!p.seed) { S.counts.confirmed++; if (p.flag) S.counts.flagged++; } }
    if (to === 'cwa' && !p.isResult) {
      setState(p.el, p.flag ? 'flag' : 'ok'); if (!p.seed) { S.counts.confirmed++; if (p.flag) S.counts.flagged++; }
      if (p.home) spawnResult(p.seed);
    }
  }

  function tick(t) {
    var dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t;
    if (S.playing) {
      S.simSeconds += dt;
      spawnAcc += dt * (S.perDay / 30);  // one simulated day = 30 seconds
      while (spawnAcc >= 1) { spawnAcc -= 1; spawn(); }
      for (var k = particles.length - 1; k >= 0; k--) {
        var p = particles[k], e = paths[p.route[p.i]];
        p.d += p.speed * dt;
        if (p.d >= e.len) {
          arrive(p, p.route[p.i]);
          p.d -= e.len; p.i++;
          if (p.i >= p.route.length) { if (!p.seed) { if (p.isResult) S.counts.results++; else S.counts.record++; } p.el.style.display = 'none'; pool.push(p.el); particles.splice(k, 1); continue; }
          e = paths[p.route[p.i]];
        }
        var pt = e.el.getPointAtLength(Math.min(p.d, e.len));
        p.el.setAttribute('cx', pt.x.toFixed(1)); p.el.setAttribute('cy', pt.y.toFixed(1));
      }
      renderCounts();
    }
    requestAnimationFrame(tick);
  }

  var countEls = {};
  root.querySelectorAll('[data-count]').forEach(function (e) { countEls[e.dataset.count] = e; });
  var dayEl = root.querySelector('[data-day]');
  function renderCounts() {
    for (var k in countEls) countEls[k].textContent = S.counts[k].toLocaleString('en-US');
    if (dayEl) dayEl.textContent = 'Simulated day ' + (Math.floor(S.simSeconds / 30) + 1);
  }

  // ---------------------------------------------------------------- controls
  root.querySelectorAll('.flow-steps button').forEach(function (b) {
    b.addEventListener('click', function () { selectStage(+b.dataset.stage); });
  });
  var playBtn = root.querySelector('[data-play]');
  function syncPlay() { playBtn.textContent = S.playing ? 'Pause' : 'Play'; playBtn.setAttribute('aria-pressed', String(!S.playing)); root.classList.toggle('paused', !S.playing); }
  playBtn.addEventListener('click', function () { S.playing = !S.playing; last = 0; syncPlay(); });
  root.querySelector('[data-reset]').addEventListener('click', function () {
    for (var k in S.counts) S.counts[k] = 0; S.simSeconds = 0;
    particles.forEach(function (p) { p.el.style.display = 'none'; pool.push(p.el); }); particles = [];
    renderCounts();
  });
  var rate = root.querySelector('[data-rate]'), rateOut = root.querySelector('[data-rate-out]');
  rate.addEventListener('input', function () { S.perDay = +rate.value; rateOut.textContent = rate.value; });
  root.querySelectorAll('[data-mode]').forEach(function (b) {
    b.addEventListener('click', function () {
      S.mode = b.dataset.mode;
      root.querySelectorAll('[data-mode]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      applyFocus();
    });
  });

  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 150); });
  build(); syncPlay(); renderCounts();
  // seed a few dots so a paused / reduced-motion view still shows the flow
  for (var i = 0; i < 18; i++) { spawn(); var p = particles[particles.length - 1]; p.seed = true; p.i = Math.floor(Math.random() * (p.route.length)); p.d = Math.random() * paths[p.route[p.i]].len;
    var atCwa = p.route.indexOf('ai-cwa') > -1 ? 3 : 2; if (p.i >= 2 && atCwa === 3) setState(p.el, 'read'); if (p.i >= atCwa) setState(p.el, p.flag ? 'flag' : 'ok');
    var pt = paths[p.route[p.i]].el.getPointAtLength(p.d); p.el.setAttribute('cx', pt.x); p.el.setAttribute('cy', pt.y); }
  S.counts = { captured: 0, read: 0, confirmed: 0, flagged: 0, record: 0, results: 0 }; renderCounts();
  requestAnimationFrame(tick);
}
document.querySelectorAll('.flow[data-flow]').forEach(initFlow);
})();
