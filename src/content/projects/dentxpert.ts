import type { Project } from "./types";

/** DentXpert. Final year project turned award winner: a Flutter dental care
 *  companion with YOLOv8 caries detection. Facts verified against the repo,
 *  screenshots and owner statements; see docs/SOURCE_OF_TRUTH.md. */
export const dentxpert: Project = {
  slug: "dentxpert",
  name: "DentXpert",
  title: "DentXpert, dental care with computer vision",
  station: "Detect",
  index: "01",
  category: "Applied AI research build",
  role: "Final year project, sole designer and developer",
  platform: "Android (Flutter)",
  promise:
    "A dental care companion that checks photos of your teeth for signs of caries using YOLOv8, then helps you learn prevention and find real care.",
  heroShot: "dentxpert/02-model-selection",
  heroAlt:
    "DentXpert model selection screen offering three YOLOv8 tiers and asking for at least five photos from five angles.",
  tags: [
    "YOLOv8 detection in three tiers",
    "Guided five angle photo capture",
    "Prevention library built in",
    "Clinic and dentist directory",
    "Firebase accounts and content",
  ],
  takeaway:
    "This is where my applied AI habits started: give people clear model choices, guide their input, and frame results as a check to act on, never a diagnosis.",
  atAGlance: {
    problem:
      "Tooth decay is one of the most common diseases in the world and it is usually found late, at the dentist, after the damage is done. People need an early, private, low friction way to check and then act.",
    contribution:
      "I designed and built the entire app for my final year project: the guided capture flow, the YOLOv8 model integration with selectable tiers, the results experience, a prevention library, a care directory and Firebase accounts.",
    stack: ["Flutter", "Dart", "YOLOv8", "Firebase"],
    proof:
      "Gold Award at JIIICaS 2024 and a published paper on the detection approach.",
  },
  context: [
    "DentXpert began as my final year project at IIUM and grew into the piece of work that set my direction. The idea is simple to say and hard to do well: let someone photograph their own teeth and get an honest first read on whether caries might be present.",
    "The app wraps that detection moment in a complete care loop. A Learn library teaches prevention, a directory helps people find dentists and clinics, and accounts keep everything in one place. Detection alone is a demo. Detection inside a care journey is a product.",
  ],
  challenge: [
    "Object detection models are only as good as their input, and phone photos of teeth are hostile input: bad light, partial views, motion blur. The interface had to raise input quality without a manual, so the capture flow requires at least five images from five different angles before the model runs.",
    "The second challenge was honesty. A student project that shouts diagnosis is dangerous. Every screen had to hold the line that this is an early check that points you to a professional, which shaped the wording, the results framing and the presence of the education and directory features.",
  ],
  journey: [
    {
      media: "dentxpert/01-home",
      alt: "DentXpert home screen greeting the user with two actions, check for dental caries and search for a dentist or clinic.",
      caption:
        "The home screen keeps the promise plain: check your teeth, or find real care. Two actions, no clutter.",
    },
    {
      media: "dentxpert/02-model-selection",
      alt: "Model selection screen listing YOLOv8 Model 1 lite, Model 2 pro and Model 3 ultra, with a request for at least five photos from five angles.",
      caption:
        "Detection starts with an informed choice. Three YOLOv8 tiers trade speed for thoroughness, and the app asks for at least five photos from five angles so the model actually sees enough to be useful.",
    },
    {
      media: "dentxpert/03-learn",
      alt: "Learn screen explaining dental caries prevention with sections on brushing, flossing and rinsing.",
      caption:
        "Detection without education is a dead end. The Learn library covers prevention properly: brushing, flossing, rinsing, and why each one matters.",
    },
    {
      media: "dentxpert/04-profile",
      alt: "Profile screen with account settings, language, dark mode and privacy policy options.",
      caption:
        "Accounts, language, dark mode and privacy controls run on Firebase, the same platform that serves the learning content.",
    },
  ],
  built: [
    {
      lane: "Detection flow",
      items: [
        "Guided capture that requires at least five photos from five different angles before inference runs.",
        "Three selectable YOLOv8 model tiers, from a fast lite version to a thorough ultra version.",
        "A results experience that presents annotated findings as a first check to discuss with a dentist.",
      ],
    },
    {
      lane: "Care and learning",
      items: [
        "A prevention library covering brushing, flossing and rinsing with plain language guidance.",
        "A directory of dentists and clinics so a worrying result leads somewhere real.",
      ],
    },
    {
      lane: "Platform",
      items: [
        "Flutter app structure with Firebase authentication, profiles and content.",
        "Settings for language, dark mode and privacy, built in from the start rather than bolted on.",
      ],
    },
  ],
  decisions: [
    {
      title: "Three model tiers instead of one hidden model",
      body: "The model picker exposes lite, pro and ultra YOLOv8 variants so the person chooses between speed and thoroughness, and understands that a model is making the call.",
      tradeoff:
        "It adds a decision before the first result, and some users would prefer the app to just pick. I chose transparency over one tap convenience because this is health adjacent territory.",
    },
    {
      title: "Five photos from five angles as a hard requirement",
      body: "Inference will not run on a single blurry photo. The capture flow demands coverage, which measurably improves what the model has to work with.",
      tradeoff:
        "It is real friction, and friction costs completions. I accepted that because a confident answer on bad input is worse than asking for thirty more seconds of effort.",
    },
    {
      title: "A care loop around the model, not a bare detector",
      body: "Learn content and the clinic directory are not filler. They turn a detection result into a next step, which is the actual job.",
      tradeoff:
        "Building education and directory features took time that could have gone into squeezing more accuracy from the model. For a product about health behaviour, I would make the same call again.",
    },
  ],
  underTheHood:
    "Photos move from the guided capture screen into whichever YOLOv8 tier the person selected, and annotated results come back for review. Firebase carries accounts, settings and the learning content.",
  deepDetail: [
    "The three tiers are genuinely different YOLOv8 variants, evaluated during the project with precision, recall and mAP, the standard object detection metrics.",
    "The five angle requirement exists because caries evidence is positional. A single frontal shot hides the surfaces where decay actually starts.",
    "The published paper, Deep Learning Approach for Dental Anomalies X-ray Imaging using YOLOv8, documents the detection approach behind the app.",
  ],
  gallery: [
    {
      media: "dentxpert/01-home",
      alt: "DentXpert home screen with a greeting and two primary actions.",
      caption: "Home: check your teeth or find care.",
    },
    {
      media: "dentxpert/02-model-selection",
      alt: "YOLOv8 model tier selection with capture requirements.",
      caption: "Model selection: three YOLOv8 tiers and a five angle capture requirement.",
    },
    {
      media: "dentxpert/03-learn",
      alt: "Prevention education screen about dental caries.",
      caption: "Learn: prevention guidance on brushing, flossing and rinsing.",
    },
    {
      media: "dentxpert/04-profile",
      alt: "Profile and settings screen with privacy controls.",
      caption: "Profile: accounts, language, dark mode and privacy on Firebase.",
    },
  ],
  quality: [
    "Guided capture raises input quality instead of blaming the user for bad photos.",
    "Results are framed as an early check that points to a professional, never a diagnosis.",
    "Education and a care directory are built in, so a result always has a next step.",
    "The models were evaluated with precision, recall and mAP rather than eyeballed.",
  ],
  proofNow: [
    "Gold Award at JIIICaS 2024.",
    "Published research: Deep Learning Approach for Dental Anomalies X-ray Imaging using YOLOv8.",
    "The habits formed here, guided input, honest framing and human review, carry directly into my later AI work on Grocs and AIMARA.",
  ],
  tech: [
    { name: "Flutter", why: "One codebase with fast iteration for a solo final year timeline, and a clean widget model for the guided capture flow." },
    { name: "Dart", why: "Comes with Flutter and kept the whole app in one language." },
    { name: "YOLOv8", why: "State of the art object detection at the time, with variants small enough to serve in a mobile product." },
    { name: "Firebase", why: "Auth, profiles and content without running my own backend, which kept the focus on the detection experience." },
  ],
  enables: [
    "Computer vision features in mobile apps, from capture UX through model integration to honest results.",
    "AI products in sensitive territory where framing, guardrails and next steps matter as much as accuracy.",
    "Research work carried through to a finished, award winning product rather than a notebook.",
  ],
  next: "naqiverse",
};
