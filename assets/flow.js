// How WoundRounds, Wound Solutions AI and AssureStage Clinical Wound Assessments flow together.
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
    cwa:   { label: 'AssureStage', sub: 'Clinical Wound Assessments', sub2: 'Certified wound specialists', stage: 3, kind: 'prod' },
    dash:  { label: 'Care team dashboard', sub: 'Flags and follow-ups', stage: 4, kind: 'out' },
    rec:   { label: 'Defensible record', sub: 'Survey and liability', stage: 4, kind: 'out' },
    ehr:   { label: 'EHR and plan export', sub: 'FHIR R4, PDF, CSV', stage: 4, kind: 'out' },
    trend: { label: 'Healing trend', sub: 'Timeline and PUSH score', stage: 4, kind: 'out' },
    wrn:   { label: 'WoundRounds', sub: 'Bedside photo and', sub2: 'nurse assessment', stage: 1, kind: 'prod', wide: true },
    mds:   { label: 'Wound record', sub: 'Updates the MDS', stage: 3, kind: 'prod' },
    risk:  { label: 'Risk dashboards', sub: 'Braden drivers, alerts', stage: 4, kind: 'out' },
    qa:    { label: 'QA and survey reports', sub: 'Facility risk summary', stage: 4, kind: 'out' },
    mhome: { label: 'Small wound at home', stage: 1, kind: 'src', lane: 'both' },
    late1: { label: 'Nobody clinical sees it', sub: '46% get no visit in 14 days', stage: 2, kind: 'late', lane: 'late' },
    late2: { label: 'Reaches a clinic late', sub: 'Larger, harder to treat', stage: 3, kind: 'late', lane: 'late' },
    late3: { label: 'The costly episode', sub: 'Admission or surgery', stage: 4, kind: 'late', lane: 'late', big: true },
    weh:   { label: 'WoundEye', sub: 'Photo on their own phone', stage: 2, kind: 'prod', lane: 'early' },
    clin:  { label: 'Licensed clinician', sub: 'Assessment the same day', sub2: 'Signs off, sets follow-up', stage: 3, kind: 'prod', lane: 'early' },
    ans:   { label: 'Member answer', sub: 'Plain language, same day', stage: 4, kind: 'out', lane: 'early' },
    cm:    { label: 'Care manager view', sub: 'Photo timeline, trend line', stage: 4, kind: 'out', lane: 'early' },
    exp:   { label: 'Plan systems', sub: 'FHIR R4, JSON, CSV, API', stage: 4, kind: 'out', lane: 'early' },
    aud:   { label: 'Signed record', sub: 'Audit trail on every case', stage: 4, kind: 'out', lane: 'early' },
    hb:    { label: 'Home-based care', stage: 1, kind: 'src' },
    pd:    { label: 'After discharge', stage: 1, kind: 'src' },
    ru:    { label: 'Rural members', stage: 1, kind: 'src' },
    cap:   { label: 'WoundEye', sub: 'Capture: a guided photo', sub2: 'Metadata stripped', stage: 1, kind: 'prod' },
    loc:   { label: 'Body map', sub: 'Region, then zone', sub2: 'Same site every visit', stage: 2, kind: 'prod' },
    asx:   { label: 'Licensed clinician', sub: 'Type, severity, stage', sub2: 'Structured assessment', stage: 3, kind: 'prod' },
    fup:   { label: 'Follow-up set', sub: 'Next photo, same site', stage: 4, kind: 'out' },
    gde:   { label: 'Member guidance', sub: 'Plain language, same day', stage: 4, kind: 'out' },
    cmw:   { label: 'Care manager', sub: 'Whole history, flags', stage: 4, kind: 'out' },
    pex:   { label: 'Plan systems', sub: 'FHIR R4, JSON, CSV, API', stage: 4, kind: 'out' },
    srec:  { label: 'Signed record', sub: 'Shows who decided', stage: 4, kind: 'out' },
    ehr2:  { label: 'EHR and other systems', sub: 'Facility EHR and more', stage: 4, kind: 'out' }
  };

  var STAGES = [
    { n: 0, title: 'The whole loop',
      body: 'Nurses document at the bedside in WoundRounds, and those assessments go straight to our AssureStage Clinical Wound Assessment team. At home, WoundEye captures a photo, and Wound Solutions AI\u2019s workflow agents place it on the specialist\u2019s worklist. Certified wound specialists make every clinical decision. For WoundEye, the specialist\u2019s result goes back through the app to the patient, family carer or home nurse. The result also reaches the care team, the record and the systems that need it, and the next follow-up joins the same wound\u2019s timeline.' },
    { n: 1, title: 'Capture',
      body: 'Nurses document at the bedside in WoundRounds: photo, location, measurements and Braden risk, in the facility\u2019s own workflow. At home, a patient or family carer uses WoundEye: one photo on their own mobile device and two taps on a body map.' },
    { n: 2, title: 'Worklist',
      body: 'For WoundEye submissions, Wound Solutions AI runs workflow agents that do the administrative work. They check that the photo is usable and filed to the right body site, add it to the certified wound specialist\u2019s worklist, track it until it has been reviewed, send reminders and schedule follow-ups. Agents simplify, manage and scale the workflow. They make no clinical decisions.' },
    { n: 3, title: 'AssureStage Clinical Wound Assessment',
      body: 'Certified wound specialists review WoundRounds assessments and WoundEye submissions. They determine wound type and stage, check measurements, compute the PUSH score and screen for infection. A wound with suspected infection is flagged. Every clinical decision is theirs, and the record shows who decided, and when. For WoundEye submissions, the result goes straight back to the patient and carer in the app.' },
    { n: 4, title: 'Act and record',
      body: 'For patients at home, the specialist\u2019s result comes back through WoundEye in plain language: what the wound is, what to do tonight, the signs that mean call 911, and the follow-up date. The same assessment reaches the care team dashboard as flags and follow-up dates. It becomes a dated, clinician-signed record ready for surveys and liability review. It exports to the EHR or health plan as FHIR R4, PDF or CSV, and it adds a point to the wound\u2019s healing trend. The next follow-up starts the loop again.' }
  ];

  var EDGES = [
    ['snf', 'wr'], ['ltach', 'wr'], ['rehab', 'wr'], ['cah', 'wr'], ['home', 'we'],
    ['wr', 'cwa'], ['we', 'ai'], ['ai', 'cwa'],
    ['cwa', 'dash'], ['cwa', 'rec'], ['cwa', 'ehr'], ['cwa', 'trend'],
    ['snf', 'wrn'], ['ltach', 'wrn'], ['rehab', 'wrn'], ['cah', 'wrn'], ['wrn', 'mds'],
    ['mds', 'risk'], ['mds', 'qa'], ['mds', 'ehr2'], ['mds', 'trend'],
    ['mhome', 'late1'], ['late1', 'late2'], ['late2', 'late3'],
    ['hb', 'cap'], ['pd', 'cap'], ['ru', 'cap'], ['cap', 'loc'], ['loc', 'asx'],
    ['asx', 'fup'], ['asx', 'gde'], ['asx', 'cmw'], ['asx', 'pex'], ['asx', 'srec'],
    ['mhome', 'weh'], ['weh', 'clin'], ['clin', 'ans'], ['clin', 'cm'], ['clin', 'exp'], ['clin', 'aud']
  ];

  // ---------------------------------------------------------------- layouts
  var LAYOUTS = {
    h: { W: 1200, H: 724, dir: 'h', loopLabel: [600, 34], resultLabel: [612, 688],
      pos: {
        snf: [95, 130, 150, 44], ltach: [95, 200, 150, 44], rehab: [95, 270, 150, 44], cah: [95, 340, 150, 44], home: [95, 530, 150, 44],
        wr: [345, 235, 190, 76], we: [345, 530, 190, 68],
        ai: [612, 528, 92],
        cwa: [830, 330, 214, 92],
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
      body: 'Nurses document at the bedside in WoundRounds, and each high-risk assessment goes straight to our AssureStage Clinical Wound Assessment team. Certified wound specialists review these high-risk wounds and flag which wounds might need a second look. All final clinical decisions are made by the facility\u2019s clinical staff, not by AssureStage. The result reaches the care team dashboard, the defensible record, the EHR and the healing trend, and the next assessment joins the same wound\u2019s timeline.' },
    { n: 1, num: 1, title: 'Bedside documentation',
      body: 'Nurses in skilled nursing, LTACH, rehabilitation and critical access hospitals document at the bedside in WoundRounds: photo, location, measurements and Braden risk, in the facility\u2019s own workflow. Risk dashboards show each patient\u2019s drivers for potential harm.' },
    { n: 2 },
    { n: 3, num: 2, title: 'Clinical review',
      body: 'High-risk WoundRounds assessments go to our AssureStage Clinical Wound Assessment team. Certified wound specialists review these high-risk wounds and flag which wounds might need a second look. All final clinical decisions are made by the facility\u2019s clinical staff, not by AssureStage.' },
    { n: 4, num: 3, title: 'Act and record',
      body: 'The assessment reaches the care team dashboard as flags and follow-up dates. It becomes a dated, clinician-signed record ready for surveys and liability review, exports to the EHR, and adds a point to the wound\u2019s healing trend. Flagged wounds come back for follow-up, joining the same timeline.' }
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

  // Medicare Advantage variant (health plans page): the same wound on two paths, seen late or seen the same day
  var LAYOUTS_MA = {
    h: { W: 1200, H: 640, dir: 'h',
      caps: [[105, 'Where the wound starts'], [390, 'First look'], [690, 'Assessment'], [1060, 'Outcome']],
      laneLabels: [[600, 52, 'Seen late: the usual path', 'late'], [600, 300, 'Seen the same day: with WoundEye', 'early']],
      pos: {
        mhome: [105, 300, 170, 52],
        late1: [390, 130, 230, 64], late2: [690, 130, 230, 64], late3: [1060, 130, 236, 72],
        weh: [390, 430, 210, 80], clin: [690, 430, 220, 92],
        ans: [1060, 336, 210, 54], cm: [1060, 410, 210, 54], exp: [1060, 484, 210, 54], aud: [1060, 558, 210, 54]
      } },
    v: { W: 400, H: 860, dir: 'v',
      laneLabels: [[100, 128, 'Seen late', 'late'], [300, 128, 'Same day', 'early']],
      pos: {
        mhome: [200, 50, 230, 46],
        late1: [100, 190, 184, 60], late2: [100, 330, 184, 60], late3: [100, 470, 184, 66],
        weh: [300, 190, 184, 70], clin: [300, 330, 184, 84],
        ans: [300, 560, 184, 52], cm: [300, 632, 184, 52], exp: [300, 704, 184, 52], aud: [300, 776, 184, 52]
      } }
  };
  var STAGES_MA = [
    { n: 0, title: 'Two paths for the same wound',
      body: 'A pressure injury on a heel or an ulcer on a diabetic foot starts small, at home. On the usual path, nobody clinical sees it until it reaches a clinic, often as an admission, a surgery or an amputation. With WoundEye, the member or caregiver photographs it on their own phone and a licensed wound-care clinician assesses it the same day, while it is still small.' },
    { n: 1, num: 1, title: 'Where the wound starts',
      body: '10.5 million Medicare beneficiaries have a wound. Between visits, the only people who see it are whoever is at home: a spouse, a daughter, a home-health aide.' },
    { n: 2, num: 2, title: 'First look',
      body: 'On the usual path, the first look waits: 46% of Medicare patients discharged to home health get no home health visit within 14 days. With WoundEye, the first look happens at home: a guided photo on any mobile device, two taps on a body map and a few plain questions. No clinic visit, no special camera, no kit.' },
    { n: 3, num: 3, title: 'Assessment',
      body: 'On the usual path, the wound reaches a clinic once it is larger and harder to treat. With WoundEye, a licensed wound-care clinician reviews the photograph, writes the assessment and sets the follow-up. The record shows who decided. The app itself does not diagnose or treat.' },
    { n: 4, num: 4, title: 'Outcome',
      body: 'Late wounds become the episodes every plan knows: an admission, a surgery, sometimes an amputation. A diabetic foot ulcer adds $11,710 a year in health care costs for a Medicare patient. With WoundEye, the member gets a plain-language answer the same day, and the plan gets a clinician-signed record, a photo timeline and structured exports.' }
  ];
  if (variant === 'ma') STAGES = STAGES_MA;

  // Medicare Advantage "how it works" variant: capture -> locate -> assess -> respond, with follow-up on the same site
  var LAYOUTS_MA2 = {
    h: { W: 1200, H: 600, dir: 'h', loopLabel: [600, 34], loopFrom: 'fup', loopTo: 'cap',
      caps: [[100, 'Where members are'], [340, '1. Capture'], [590, '2. Locate'], [840, '3. Assess'], [1085, '4. Respond']],
      pos: {
        hb: [100, 220, 160, 46], pd: [100, 300, 160, 46], ru: [100, 380, 160, 46],
        cap: [340, 300, 200, 92], loc: [590, 300, 190, 84], asx: [840, 300, 210, 92],
        fup: [1085, 140, 200, 54], gde: [1085, 225, 200, 54], cmw: [1085, 310, 200, 54], pex: [1085, 395, 200, 54], srec: [1085, 480, 200, 54]
      } },
    v: { W: 400, H: 860, dir: 'v', loopLabel: [20, 560], loopFrom: 'fup', loopTo: 'cap',
      pos: {
        hb: [110, 46, 170, 40], pd: [292, 46, 170, 40], ru: [200, 100, 170, 40],
        cap: [200, 215, 230, 84], loc: [200, 350, 230, 78], asx: [200, 485, 230, 84],
        fup: [110, 630, 176, 54], gde: [292, 630, 176, 54], cmw: [110, 706, 176, 54], pex: [292, 706, 176, 54], srec: [200, 790, 176, 54]
      } }
  };
  var STAGES_MA2 = [
    { n: 0, title: 'From the kitchen table to a signed record',
      body: 'A member or family caregiver photographs the wound on any mobile device and taps the spot on a body map. A licensed wound-care clinician assesses it and responds the same day with guidance and a follow-up. Every follow-up photo of the same site joins its timeline, and the care manager sees the whole history.' },
    { n: 1, num: 1, title: 'Capture',
      body: 'The member or caregiver takes a guided photo on a mobile device. No clinic visit, no special camera, no kit. Image metadata is stripped and the photo goes to secure storage. It fits home-based care, post-discharge follow-up and rural members with no wound clinic nearby.' },
    { n: 2, num: 2, title: 'Locate',
      body: 'Two taps on a clinical body map, region then zone, so the same site is tracked visit after visit. The member also records pain in plain language.' },
    { n: 3, num: 3, title: 'Assess',
      body: 'A licensed wound-care clinician reviews the photograph and its location and assesses wound type, severity and stage. When a wound is getting worse, the clinician flags it for the care manager.' },
    { n: 4, num: 4, title: 'Respond',
      body: 'The clinician completes the structured assessment, gives the member guidance and sets the follow-up. The record shows who decided. The plan receives it as structured export, through a pull API and signed webhooks, or as a PDF ready for the chart.' }
  ];
  if (variant === 'ma2') STAGES = STAGES_MA2;

  // ---------------------------------------------------------------- state
  var S = { L: null, mode: variant === 'woundeye' ? 'home' : (variant === 'woundrounds' || variant === 'woundrounds-core') ? 'fac' : variant === 'ma' ? 'compare' : 'both', perDay: (root.querySelector("[data-rate]") ? +root.querySelector("[data-rate]").value : 150), playing: !reduce, stage: 0, focus: null,
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
    var L = (variant === 'woundeye' ? LAYOUTS_WE : variant === 'woundrounds' ? LAYOUTS_WR : variant === 'woundrounds-core' ? LAYOUTS_WRN : variant === 'ma' ? LAYOUTS_MA : variant === 'ma2' ? LAYOUTS_MA2 : LAYOUTS)[wide ? 'h' : 'v'];
    if (S.L === L && svg) return;
    S.L = L;
    stage.innerHTML = '';
    particles.forEach(function (p) { p.el.remove(); }); particles = []; pool = []; paths = {}; nodeEls = {};

    svg = el('svg', { viewBox: '0 0 ' + L.W + ' ' + L.H, role: 'img', 'aria-labelledby': uid + '-title ' + uid + '-desc', 'class': 'is-' + L.dir }, stage);
    el('title', { id: uid + '-title' }, svg).textContent = 'How WoundRounds, Wound Solutions AI and AssureStage Clinical Wound Assessments flow together';
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
    var llx = L.loopLabel[0], lly = L.loopLabel[1];
    if (L.dir === 'h') {  // sit just under the dotted line, centred on its straight run
      var la = anchor(L.loopFrom || 'dash', 't'), lb2 = anchor(L.loopTo || 'wr', 't');
      llx = ((lb2[0] + 140) + (la[0] - 160)) / 2; lly = 74;
    }
    var ll = el('text', { 'class': 'loop-label', x: llx, y: lly, 'text-anchor': L.dir === 'h' ? 'middle' : 'start' }, svg);
    if (L.dir === 'v') ll.setAttribute('transform', 'rotate(-90 ' + L.loopLabel[0] + ' ' + L.loopLabel[1] + ')');
    var core = variant === 'woundrounds-core';
    var loopLines = L.dir === 'h'
      ? (variant === 'ma2' ? ['Follow-up: the next photo of the same site joins its timeline, visit after visit.'] : core ? ['If a wound needs a second look, the nurse can re-assess,', 're-stage or modify the MDS record in WoundRounds.']
              : ['If the assessing nurse agrees with the AssureStage review,', 'the nurse can re-assess, re-stage or modify the MDS record in WoundRounds.'])
      : [variant === 'ma2' ? 'Follow-up: same site, next photo' : 'Nurse can re-assess, re-stage or modify the MDS'];
    loopLines.forEach(function (line, i) {
      var ts = el('tspan', { x: llx, dy: i ? 19 : 0 }, ll); ts.textContent = line;
    });
    ll.setAttribute('tabindex', 0); ll.setAttribute('role', 'button'); ll.classList.add('is-link');
    ll.addEventListener('click', function () { selectSection('loop'); });
    ll.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectSection('loop'); } });
    }

    gParts = el('g', {}, svg);
    var outs = Object.keys(NODES).filter(function (k) { return NODES[k].kind === 'out' && L.pos[k]; });
    if (outs.length) {
      var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      outs.forEach(function (k) { var q = L.pos[k]; x0 = Math.min(x0, q[0] - q[2] / 2); x1 = Math.max(x1, q[0] + q[2] / 2); y0 = Math.min(y0, q[1] - q[3] / 2); y1 = Math.max(y1, q[1] + q[3] / 2); });
      var pad = L.dir === 'h' ? 14 : 8;
      var gx0 = Math.max(2, x0 - pad), gx1 = Math.min(L.W - 2, x1 + pad);
      var og = el('rect', { x: gx0, y: y0 - pad, width: gx1 - gx0, height: y1 - y0 + pad * 2, rx: 6, 'class': 'out-group', tabindex: 0, role: 'button', 'aria-label': 'About this section: ' + sectionTitle('out') }, svg);
      og.addEventListener('click', function () { selectSection('out'); });
      og.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectSection('out'); } });
    }
    if (L.laneLabels) L.laneLabels.forEach(function (ll2) {
      var tl = el('text', { 'class': 'lane-label lane-' + ll2[3], x: ll2[0], y: ll2[1], 'text-anchor': 'middle', 'data-lane': ll2[3] }, svg);
      tl.textContent = ll2[2];
    });
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
      var lg = LOGOS[id];
      if (n.kind === 'src') {
        txt(g, p[0], p[1] + 5, n.label, 'n-src');
      } else if (lg) {
        var subs = [n.sub, n.sub2].filter(Boolean), lh = 17, gap = 9;
        var logoH = Math.min(p[3] * (lg.tall ? 0.42 : 0.34), (p[2] - 26) / lg.ar);
        var total = logoH + (subs.length ? gap + subs.length * lh - 4 : 0);
        var top = p[1] - total / 2, logoW = logoH * lg.ar;
        el('image', { href: lg.src, x: p[0] - logoW / 2, y: top, width: logoW, height: logoH, 'class': 'n-logo', preserveAspectRatio: 'xMidYMid meet' }, g);
        subs.forEach(function (t, i) { txt(g, p[0], top + logoH + gap + 9 + i * lh, t, 'n-sub'); });
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
  // Product logos drawn inside their boxes (width / height ratio of each file)
  var LOGOS = {
    wr:  { src: 'assets/img/woundrounds-logo.png', ar: 387 / 52 },
    wrn: { src: 'assets/img/woundrounds-logo.png', ar: 387 / 52 },
    we:  { src: 'assets/img/woundeye-logo.png', ar: 284 / 46 },
    weh: { src: 'assets/img/woundeye-logo.png', ar: 284 / 46 },
    cap: { src: 'assets/img/woundeye-logo.png', ar: 284 / 46 },
    cwa: { src: 'assets/img/assurestage-logo.png', ar: 1000 / 293, tall: true }
  };
  var NODE_NOTES = {
    hb: 'Members already receiving care at home, where a wound is usually first noticed by family or a home-health aide.',
    pd: 'Post-discharge follow-up: 46% of Medicare patients discharged to home health get no home health visit within 14 days.',
    ru: 'Members in rural counties with no wound clinic nearby.',
    cap: 'A guided photo on whatever mobile device the member already owns. Image metadata is stripped and the photo goes to secure storage. Photographs never pass through a third-party AI service.',
    loc: 'Two taps on a clinical body map, region then zone, so the same site is tracked visit after visit.',
    asx: 'A licensed wound-care clinician reviews the photograph and its location and assesses type, severity and stage. The app itself does not diagnose or treat; every assessment is made by the reviewing clinician.',
    fup: 'The clinician sets the follow-up. The next photo of the same site joins its timeline, building a measurement trend visit by visit.',
    gde: 'The member and caregiver get the clinician\u2019s guidance in plain language the same day.',
    cmw: 'Care managers get the member\u2019s whole wound history in one place. When a wound is getting worse, the reviewing clinician flags it for them.',
    pex: 'Structured export in FHIR R4, JSON and CSV, a pull API and signed webhooks, and PDF reports ready for the chart. Exports use scoped API keys.',
    srec: 'Every assessment carries a licensed clinician\u2019s sign-off, and an immutable audit trail records every change.',
    mhome: 'A pressure injury on a heel, or an ulcer on the sole of a diabetic foot, does not announce itself. It starts small, at home, and the people around it are family and home-health aides.',
    late1: 'Between visits, nobody clinical looks at the wound. 46% of Medicare patients discharged to home health get no home health visit within 14 days (JAMA Network Open, 2020).',
    late2: 'By the time the wound reaches a clinic, it is often larger and harder to treat. The expensive part of wound care is almost always the late part.',
    late3: 'The episode every plan knows: an admission, a surgery, sometimes an amputation. Medicare spent as much as $67 billion on wound care in 2019, and there are about 150,000 non-traumatic leg amputations in the US each year, most in people with diabetes.',
    weh: 'The member or caregiver photographs the wound on whatever mobile device they already own, marks the spot on a body map and answers a few plain questions.',
    clin: 'A licensed wound-care clinician reviews the photograph, writes the assessment and sets the follow-up. That assessment becomes the record, and the record shows who decided. The app itself does not diagnose or treat.',
    ans: 'The member gets an answer in plain language the same day, while the wound is still small enough to be cheap.',
    cm: 'The care manager sees the same record, with a photo timeline, a trend line and the clinician\u2019s note when a wound is getting worse.',
    exp: 'Structured export in FHIR R4, JSON and CSV, a pull API with signed webhooks, and PDF reports ready for the chart.',
    aud: 'Every assessment carries a licensed clinician\u2019s sign-off and an audit trail written by the database itself.',
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
    wr: 'WoundRounds is the bedside tool: easy documentation, tracking and trending, and dashboards of each patient\u2019s risk drivers. Assessments go straight to the AssureStage Clinical Wound Assessment team for review.',
    we: 'WoundEye: one photo on the mobile device the family already owns, two taps on a body map, and a few plain questions. Workflow agents pass the photo to the certified wound specialist\u2019s worklist, and route the specialist\u2019s result back to the patient and carer in the app.',
    ai: 'Workflow agents for WoundEye. They check each photo in, file it to the right body site, build and track the specialist\u2019s worklist, send reminders and schedule follow-ups. They make no clinical decisions. Photographs never pass through a third-party AI service.',
    cwa: 'AssureStage: our certified wound specialists review WoundRounds assessments and WoundEye submissions, determine type and stage, and flag suspected infection. For WoundRounds, every final clinical decision is made by the facility\u2019s clinical staff; for WoundEye, by the specialist.',
    dash: 'Live counts by wound type: flagged, follow-up due and recent. A flag clears only when a later assessment clears it.',
    rec: 'A dated, clinician-signed record with an audit trail written by the database. This is what holds up in a survey or a lawsuit.',
    ehr: 'Structured export to the EHR or health plan: FHIR R4, JSON and CSV, signed webhooks, and PDF reports for the chart.',
    trend: 'Every follow-up photo lands on the same body site’s film strip, with the PUSH score, so direction is visible at a glance.'
  }
  if (variant === 'woundrounds') NODE_NOTES.cwa = 'AssureStage: high-risk WoundRounds assessments go to our certified wound specialists, who review these high-risk wounds and flag which wounds might need a second look. All final clinical decisions are made by the facility\u2019s clinical staff, not by AssureStage.';

  function selectStage(n) { S.stage = n; S.focus = null; S.section = null; applyFocus(); }
  function selectNode(id) { S.section = null; S.focus = (S.focus === id) ? null : id; S.stage = S.focus ? NODES[id].stage : S.stage; applyFocus(); }
  function selectSection(k) { S.focus = null; S.section = (S.section === k) ? null : k; applyFocus(); }
  function sectionTitle(k) {
    if (k === 'loop') return 'Follow-up loop';
    return variant === 'woundrounds-core' ? 'Shared with' : (variant === 'ma' || variant === 'ma2') ? 'What the plan gets' : 'Act and record';
  }
  var SECTION_NOTES = {
    loop: variant === 'ma2'
      ? 'The clinician sets the follow-up. The member photographs the same site again, tagged to the same spot on the body map, so every visit adds to one wound\u2019s photo timeline and measurement trend.'
      : variant === 'woundrounds-core'
      ? 'If a wound needs a second look, the nurse can re-assess it, re-stage it or modify the MDS record in WoundRounds. The new assessment joins the same wound\u2019s timeline, so the team can see whether it is healing, stalled or getting worse.'
      : 'If the assessing nurse agrees with the AssureStage review, the nurse can re-assess the wound, re-stage it or modify the MDS record in WoundRounds. The new assessment joins the same wound\u2019s timeline, so the team can see whether it is healing, stalled or getting worse.',
    out: (variant === 'ma' || variant === 'ma2')
      ? 'Every WoundEye assessment carries a licensed clinician\u2019s sign-off and an audit trail written by the database. The care manager sees the same record as the member, with a photo timeline and a trend line. Structured exports in FHIR R4, JSON and CSV, a pull API with signed webhooks and chart-ready PDF reports connect it to the systems the plan already runs. Pricing is per member per month, scaled to the size of the plan.'
      : variant === 'woundrounds-core'
      ? 'The wound record does not stay in one place. It feeds risk dashboards that show who needs attention first, QA and survey reports for the facility, the EHR and other systems the facility already uses, and the healing trend for each wound.'
      : 'Once a wound is assessed, the result goes where people act on it. The care team dashboard shows flags and follow-up dates; the defensible record keeps a dated history for surveys and liability review; the EHR export keeps other systems up to date; and the healing trend tracks each wound over time.'
  };

  var FAC = ['snf', 'ltach', 'rehab', 'cah', 'wr'];
  function offMode(id) { if (variant === 'ma') return (S.mode === 'late' && NODES[id].lane === 'early') || (S.mode === 'early' && NODES[id].lane === 'late'); return (S.mode === 'fac' && NODES[id].home) || (S.mode === 'home' && FAC.indexOf(id) > -1); }

  function applyFocus() {
    var st = S.stage, f = S.focus, sec = S.section;
    var lf = S.L.loopFrom || 'dash', lt = S.L.loopTo || 'wr';
    Object.keys(nodeEls).forEach(function (id) {
      var n = NODES[id];
      var hidden = offMode(id);
      var on = f ? (id === f) : sec === 'loop' ? (id === lf || id === lt) : sec === 'out' ? n.kind === 'out' : (st === 0 || n.stage === st);
      if (variant === 'woundeye' && !f && st === 4) on = (id === 'home' || id === 'we');
      nodeEls[id].classList.toggle('dim', !on || hidden);
      nodeEls[id].classList.toggle('hidden-mode', hidden);
      nodeEls[id].classList.toggle('focus', id === f);
    });
    svg.querySelectorAll('.edge, .edge-flow').forEach(function (p) {
      var a = p.getAttribute('data-a'), b = p.getAttribute('data-b');
      var on = f ? (a === f || b === f) : sec === 'loop' ? p.classList.contains('loop') : sec === 'out' ? (NODES[b] && NODES[b].kind === 'out') : (st === 0 || NODES[a].stage === st || NODES[b].stage === st);
      if (variant === 'woundeye' && !f && st) on = st === 4 ? p.classList.contains('result') : (!p.classList.contains('result') && on);
      var hidden = offMode(a) || offMode(b);
      p.classList.toggle('dim', !on || hidden);
      p.classList.toggle('off', hidden);
    });
    root.querySelectorAll('.flow-steps button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(+b.dataset.stage === st && !f && !sec));
    });
    var s = STAGES[st];
    var head = f ? (NODES[f].label + (NODES[f].label2 ? ' ' + NODES[f].label2 : '')) : sec ? sectionTitle(sec) : (st ? (s.num || st) + '. ' + s.title : s.title);
    var body = f ? NODE_NOTES[f] : sec ? SECTION_NOTES[sec] : s.body;
    svg.querySelectorAll('.lane-label').forEach(function (t) { var ln = t.getAttribute('data-lane'); t.classList.toggle('dim', (S.mode === 'late' && ln === 'early') || (S.mode === 'early' && ln === 'late')); });
    var lbl = svg.querySelector('.loop-label'); if (lbl) lbl.classList.toggle('active', sec === 'loop');
    var ogr = svg.querySelector('.out-group'); if (ogr) ogr.classList.toggle('active', sec === 'out');
    panel.querySelector('.panel-title').textContent = head;
    panel.querySelector('.panel-body').textContent = body;
  }

  // ---------------------------------------------------------------- particles
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function spawnMA() {
    var flag = false, made = [];
    var lanes = S.mode === 'late' ? ['late'] : S.mode === 'early' ? ['early'] : ['late', 'early'];
    lanes.forEach(function (lane) {
      var route = lane === 'late' ? ['mhome-late1', 'late1-late2', 'late2-late3'] : ['mhome-weh', 'weh-clin', pick(['clin-ans', 'clin-ans', 'clin-cm', 'clin-exp', 'clin-aud'])];
      route = route.filter(function (id) { return paths[id]; });
      var c = pool.pop() || el('circle', {}, gParts);
      c.setAttribute('r', S.L.dir === 'h' ? 5 : 5.5); c.style.display = '';
      setState(c, 'raw');
      var pp = { el: c, route: route, i: 0, d: 0, late: lane === 'late', speed: lane === 'late' ? 95 + Math.random() * 30 : 165 + Math.random() * 50 };
      particles.push(pp); made.push(pp);
    });
    S.counts.captured++;
    return made;
  }
  function spawn() {
    if (variant === 'ma') { spawnMA(); return; }
    if (variant === 'ma2') {
      var fl = Math.random() < 0.12, r2 = [pick(['hb', 'pd', 'pd', 'ru']) + '-cap', 'cap-loc', 'loc-asx'];
      if (fl) r2.push('asx-cmw'); else { var o = pick(['asx-gde', 'asx-gde', 'asx-fup', 'asx-pex', 'asx-srec', 'asx-cmw']); r2.push(o); if (o === 'asx-fup') r2.push('loop'); }
      r2 = r2.filter(function (id) { return paths[id]; });
      var c2 = pool.pop() || el('circle', {}, gParts);
      c2.setAttribute('r', S.L.dir === 'h' ? 5 : 5.5); c2.style.display = ''; setState(c2, 'raw');
      particles.push({ el: c2, route: r2, i: 0, d: 0, flag: fl, speed: 150 + Math.random() * 60 });
      S.counts.captured++; return;
    }
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
    var c = pool.pop() || el('circle', {}, gParts);
    c.setAttribute('r', S.L.dir === 'h' ? 5 : 5.5);
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
    if (n && !reduce && !p.virtual) { n.classList.remove('ping'); void n.getBBox(); n.classList.add('ping'); }
    if (variant === 'ma') {
      var base = S.L.dir === 'h' ? 5 : 5.5;
      if (to === 'late1') { setState(p.el, 'wait'); p.el.setAttribute('r', base + 1.5); if (!p.seed) S.counts.read++; }
      if (to === 'late2') { setState(p.el, 'flag'); p.el.setAttribute('r', base + 3.5); }
      if (to === 'late3') { p.el.setAttribute('r', base + 6); if (!p.seed) S.counts.flagged++; }
      if (to === 'clin') { setState(p.el, 'ok'); if (!p.seed) S.counts.confirmed++; }
      return;
    }
    if (variant === 'ma2') {
      if (to === 'loc') { setState(p.el, 'read'); if (!p.seed) S.counts.read++; }
      if (to === 'asx') { setState(p.el, p.flag ? 'flag' : 'ok'); if (!p.seed) { S.counts.confirmed++; if (p.flag) S.counts.flagged++; } }
      return;
    }
    if (to === 'ai') { setState(p.el, 'read'); if (!p.seed) S.counts.read++; }
    if (to === 'mds') { setState(p.el, p.flag ? 'flag' : 'ok'); if (!p.seed) { S.counts.confirmed++; if (p.flag) S.counts.flagged++; } }
    if (to === 'cwa' && !p.isResult) {
      setState(p.el, p.flag ? 'flag' : 'ok'); if (!p.seed) { S.counts.confirmed++; if (p.flag) S.counts.flagged++; }
      if (p.home && !p.virtual) spawnResult(p.seed);
    }
  }

  // Above this many moving dots, extra assessments are counted without being drawn, so high rates stay smooth.
  var MAX_DOTS = 140;
  function spawnVirtual() {
    if (variant === 'ma') {
      spawnMA().forEach(function (p) {
        particles.splice(particles.indexOf(p), 1); p.el.style.display = 'none'; pool.push(p.el); p.virtual = true;
        for (var i = 0; i < p.route.length; i++) arrive(p, p.route[i]);
        if (!p.late) S.counts.record++;
      });
      return;
    }
    spawn();
    var p = particles.pop(); p.el.style.display = 'none'; pool.push(p.el); p.virtual = true;
    for (var i = 0; i < p.route.length; i++) arrive(p, p.route[i]);
    S.counts.record++; if (p.home) S.counts.results++;
  }
  function tick(t) {
    var dt = last ? Math.min(0.05, (t - last) / 1000) : 0; last = t;
    if (S.playing) {
      S.simSeconds += dt;
      spawnAcc += dt * (S.perDay / 30);  // one simulated day = 30 seconds
      while (spawnAcc >= 1) { spawnAcc -= 1; if (particles.length < MAX_DOTS) spawn(); else spawnVirtual(); }
      for (var k = particles.length - 1; k >= 0; k--) {
        var p = particles[k], e = paths[p.route[p.i]];
        p.d += p.speed * dt;
        if (p.d >= e.len) {
          arrive(p, p.route[p.i]);
          p.d -= e.len; p.i++;
          if (p.i >= p.route.length) { if (!p.seed && !p.late) { if (p.isResult) S.counts.results++; else S.counts.record++; } p.el.style.display = 'none'; pool.push(p.el); particles.splice(k, 1); continue; }
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
  // Analog clock: one simulated day = 30 seconds; the counters show today's totals and reset at midnight.
  var DAY_SECONDS = 30, clock = null, curDay = 0;
  (function buildClock() {
    var host = root.querySelector('.flow-rate'); if (!host) return;
    var wrap = document.createElement('div'); wrap.className = 'flow-clock';
    var NS = svgNS, c = document.createElementNS(NS, 'svg');
    c.setAttribute('viewBox', '0 0 100 100'); c.setAttribute('aria-hidden', 'true'); c.setAttribute('class', 'clock-face');
    function mk(tag, at) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); c.appendChild(e); return e; }
    mk('circle', { cx: 50, cy: 50, r: 46, 'class': 'cf-rim' });
    for (var i = 0; i < 60; i++) {
      var a = i * Math.PI / 30, big = i % 5 === 0, r1 = big ? 36 : 40;
      mk('line', { x1: 50 + r1 * Math.sin(a), y1: 50 - r1 * Math.cos(a), x2: 50 + 43 * Math.sin(a), y2: 50 - 43 * Math.cos(a), 'class': big ? 'cf-tick big' : 'cf-tick' });
    }
    var hh = mk('line', { x1: 50, y1: 50, x2: 50, y2: 26, 'class': 'cf-hour' });
    var mh = mk('line', { x1: 50, y1: 50, x2: 50, y2: 14, 'class': 'cf-min' });
    mk('circle', { cx: 50, cy: 50, r: 3.2, 'class': 'cf-pin' });
    var txt = document.createElement('div'); txt.className = 'clock-text';
    txt.innerHTML = '<span class="clock-day"></span><b class="clock-time"></b><span class="clock-note">Totals reset at midnight</span>';
    wrap.appendChild(c); wrap.appendChild(txt);
    host.insertBefore(wrap, host.firstChild);
    if (dayEl) dayEl.style.display = 'none';
    clock = { hh: hh, mh: mh, day: txt.querySelector('.clock-day'), time: txt.querySelector('.clock-time'), wrap: wrap };
  })();
  function renderClock() {
    if (!clock) return;
    var day = Math.floor(S.simSeconds / DAY_SECONDS), hours = (S.simSeconds % DAY_SECONDS) / DAY_SECONDS * 24;
    clock.hh.setAttribute('transform', 'rotate(' + ((hours % 12) * 30).toFixed(2) + ' 50 50)');
    clock.mh.setAttribute('transform', 'rotate(' + ((hours % 1) * 360).toFixed(2) + ' 50 50)');
    var h = Math.floor(hours), m = Math.floor((hours % 1) * 60), h12 = h % 12 === 0 ? 12 : h % 12;
    clock.day.textContent = 'Simulated day ' + (day + 1);
    clock.time.textContent = h12 + ':' + (m < 10 ? '0' : '') + m + (h < 12 ? ' AM' : ' PM');
    clock.wrap.setAttribute('aria-label', 'Simulated day ' + (day + 1) + ', ' + clock.time.textContent);
  }
  function renderCounts() {
    var day = Math.floor(S.simSeconds / DAY_SECONDS);
    if (day !== curDay) { curDay = day; for (var k0 in S.counts) S.counts[k0] = 0; }
    for (var k in countEls) countEls[k].textContent = S.counts[k].toLocaleString('en-US');
    if (dayEl && !clock) dayEl.textContent = 'Simulated day ' + (day + 1);
    renderClock();
  }

  // ---------------------------------------------------------------- controls
  root.querySelectorAll('.flow-steps button').forEach(function (b) {
    b.addEventListener('click', function () { selectStage(+b.dataset.stage); });
  });
  var playBtn = root.querySelector('[data-play]');
  function syncPlay() { playBtn.textContent = S.playing ? 'Pause' : 'Play'; playBtn.setAttribute('aria-pressed', String(!S.playing)); root.classList.toggle('paused', !S.playing); }
  playBtn.addEventListener('click', function () { S.playing = !S.playing; last = 0; syncPlay(); });
  root.querySelector('[data-reset]').addEventListener('click', function () {
    for (var k in S.counts) S.counts[k] = 0; S.simSeconds = 0; curDay = 0;
    particles.forEach(function (p) { p.el.style.display = 'none'; pool.push(p.el); }); particles = [];
    renderCounts();
  });
  var rate = root.querySelector('[data-rate]'), rateOut = root.querySelector('[data-rate-out]');
  rate.addEventListener('input', function () { S.perDay = +rate.value; rateOut.textContent = (+rate.value).toLocaleString('en-US'); });
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
  if (variant === 'ma') { for (var j = 0; j < 8; j++) spawnMA().forEach(function (p) { p.seed = true; p.i = Math.floor(Math.random() * p.route.length); p.d = Math.random() * paths[p.route[p.i]].len; for (var q = 0; q < p.i; q++) arrive(p, p.route[q]); var pt = paths[p.route[p.i]].el.getPointAtLength(p.d); p.el.setAttribute('cx', pt.x); p.el.setAttribute('cy', pt.y); }); }
  else for (var i = 0; i < 18; i++) { spawn(); var p = particles[particles.length - 1]; p.seed = true; p.i = Math.floor(Math.random() * (p.route.length)); p.d = Math.random() * paths[p.route[p.i]].len;
    var atCwa = p.route.indexOf('ai-cwa') > -1 ? 3 : 2; if (p.i >= 2 && atCwa === 3) setState(p.el, 'read'); if (p.i >= atCwa) setState(p.el, p.flag ? 'flag' : 'ok');
    var pt = paths[p.route[p.i]].el.getPointAtLength(p.d); p.el.setAttribute('cx', pt.x); p.el.setAttribute('cy', pt.y); }
  S.counts = { captured: 0, read: 0, confirmed: 0, flagged: 0, record: 0, results: 0 }; renderCounts();
  requestAnimationFrame(tick);
}
document.querySelectorAll('.flow[data-flow]').forEach(initFlow);
})();
