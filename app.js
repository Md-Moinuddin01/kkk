const WAITING_TEXT = "Waiting for sign...";
const WAITING_RESPONSE = "Response will appear here.";
const CUSTOM_RESPONSES_KEY = "signspeak-custom-responses";
const COMMUNITY_SIGNS_KEY = "signspeak-community-signs";
const FEEDBACK_EMAIL = "moin26795@gmail.com";

const signs = [
  {
    name: "Hello",
    category: "Greeting",
    shape: "Open palm",
    tip: "Open all fingers and face your palm toward the camera.",
    response: "Hello, I would like to communicate.",
    detectable: true
  },
  {
    name: "Yes",
    category: "Answer",
    shape: "Closed fist",
    tip: "Fold all fingers into a clear fist.",
    response: "Yes.",
    detectable: true
  },
  {
    name: "No",
    category: "Answer",
    shape: "Two fingers",
    tip: "Extend index and middle fingers, then bring the thumb close.",
    response: "No.",
    detectable: true
  },
  {
    name: "Help",
    category: "Safety",
    shape: "Thumb up",
    tip: "Make a fist with the thumb raised.",
    response: "I need help, please.",
    detectable: true
  },
  {
    name: "Water",
    category: "Need",
    shape: "W hand",
    tip: "Extend index, middle, and ring fingers while folding the pinky.",
    response: "I need water, please.",
    detectable: true
  },
  {
    name: "Food",
    category: "Need",
    shape: "Pinch",
    tip: "Bring the thumb and fingertips together.",
    response: "I need food, please.",
    detectable: true
  },
  {
    name: "Thank You",
    category: "Social",
    shape: "Flat hand",
    tip: "Hold a flat hand with the thumb close to the palm.",
    response: "Thank you.",
    detectable: true
  },
  {
    name: "Please",
    category: "Social",
    shape: "Flat hand on chest",
    tip: "A common polite request sign used before asking for something.",
    response: "Please.",
    detectable: false
  },
  {
    name: "Sorry",
    category: "Social",
    shape: "Closed hand circle",
    tip: "A common sign for apology.",
    response: "I am sorry.",
    detectable: false
  },
  {
    name: "More",
    category: "Need",
    shape: "Fingertips together",
    tip: "Used when someone wants more of an item or activity.",
    response: "I want more, please.",
    detectable: false
  },
  {
    name: "Stop",
    category: "Safety",
    shape: "Flat hand stop",
    tip: "Used to ask someone to stop an action.",
    response: "Please stop.",
    detectable: false
  },
  {
    name: "Bathroom",
    category: "Care",
    shape: "Letter T shake",
    tip: "Used to ask for a restroom or toileting help.",
    response: "I need to use the bathroom.",
    detectable: false
  },
  {
    name: "Pain",
    category: "Health",
    shape: "Pointing fingers",
    tip: "Used to tell someone that something hurts.",
    response: "I am in pain.",
    detectable: false
  },
  {
    name: "Medicine",
    category: "Health",
    shape: "Middle finger to palm",
    tip: "Used when medicine or medical help is needed.",
    response: "I need my medicine, please.",
    detectable: false
  },
  {
    name: "Doctor",
    category: "Health",
    shape: "Fingers on wrist",
    tip: "Used to ask for medical support.",
    response: "I need a doctor.",
    detectable: false
  },
  {
    name: "Emergency",
    category: "Safety",
    shape: "Urgent raised hand",
    tip: "Used for urgent help or danger.",
    response: "This is an emergency. I need help now.",
    detectable: false
  },
  {
    name: "Happy",
    category: "Feeling",
    shape: "Open hands upward",
    tip: "Used to share a positive feeling.",
    response: "I feel happy.",
    detectable: false
  },
  {
    name: "Sad",
    category: "Feeling",
    shape: "Hands moving down face",
    tip: "Used to share sadness.",
    response: "I feel sad.",
    detectable: false
  },
  {
    name: "Tired",
    category: "Feeling",
    shape: "Hands down body",
    tip: "Used when rest is needed.",
    response: "I am tired and need rest.",
    detectable: false
  },
  {
    name: "Home",
    category: "Place",
    shape: "Fingers to cheek",
    tip: "Used to talk about home.",
    response: "I want to go home.",
    detectable: false
  },
  {
    name: "Family",
    category: "People",
    shape: "F hands circle",
    tip: "Used to talk about family.",
    response: "I want my family.",
    detectable: false
  },
  {
    name: "Phone",
    category: "Care",
    shape: "Call hand",
    tip: "Used to ask to call someone.",
    response: "Please call someone for me.",
    detectable: false
  },
  {
    name: "Sleep",
    category: "Need",
    shape: "Hand closing near face",
    tip: "Used when someone is sleepy or wants to sleep.",
    response: "I want to sleep.",
    detectable: false
  },
  {
    name: "Good",
    category: "Feeling",
    shape: "Flat hand from mouth",
    tip: "Used to say something is good.",
    response: "That is good.",
    detectable: false
  },
  {
    name: "Bad",
    category: "Feeling",
    shape: "Flat hand turns down",
    tip: "Used to say something is bad or uncomfortable.",
    response: "That is bad or uncomfortable.",
    detectable: false
  },
  {
    name: "Finished",
    category: "Action",
    shape: "Hands turn outward",
    tip: "Used when an activity is complete.",
    response: "I am finished.",
    detectable: false
  },
  {
    name: "Again",
    category: "Action",
    shape: "Curved hand to palm",
    tip: "Used to ask for repetition.",
    response: "Please do that again.",
    detectable: false
  },
  {
    name: "I Love You",
    category: "Social",
    shape: "ILY hand",
    tip: "Used to express affection and connection.",
    response: "I love you.",
    detectable: false
  }
];

const detectableSigns = signs.filter((sign) => sign.detectable);

const refs = {};
const state = {
  stream: null,
  detector: null,
  detectorReady: false,
  cameraActive: false,
  processingFrame: false,
  frameRequest: null,
  selectedPractice: "Hello",
  currentBaseSign: null,
  currentSign: null,
  currentResponse: null,
  customResponses: [],
  communitySigns: [],
  recentSigns: [],
  lastSpokenText: "",
  lastSpokenAt: 0,
  lastError: ""
};

document.addEventListener("DOMContentLoaded", () => {
  bindRefs();
  state.customResponses = loadCustomResponses();
  state.communitySigns = loadCommunitySigns();
  renderPracticePicker();
  renderSignLibrary();
  renderCustomControls();
  renderCommunitySigns();
  setupTheme();
  setupEvents();
  prepareHandModel();
  updatePracticeResult(null);
  refs.speakButton.disabled = !canSpeak();
});

function bindRefs() {
  refs.themeToggle = document.querySelector("#themeToggle");
  refs.startCamera = document.querySelector("#startCamera");
  refs.stopCamera = document.querySelector("#stopCamera");
  refs.cameraPreview = document.querySelector("#cameraPreview");
  refs.landmarkCanvas = document.querySelector("#landmarkCanvas");
  refs.cameraEmptyState = document.querySelector("#cameraEmptyState");
  refs.cameraStatus = document.querySelector("#cameraStatus");
  refs.modelStatus = document.querySelector("#modelStatus");
  refs.trackingStatus = document.querySelector("#trackingStatus");
  refs.detectedText = document.querySelector("#detectedText");
  refs.responseText = document.querySelector("#responseText");
  refs.sourceShapeText = document.querySelector("#sourceShapeText");
  refs.confidenceText = document.querySelector("#confidenceText");
  refs.speakButton = document.querySelector("#speakButton");
  refs.autoSpeak = document.querySelector("#autoSpeak");
  refs.practicePicker = document.querySelector("#practicePicker");
  refs.practiceButtons = [];
  refs.selectedPractice = document.querySelector("#selectedPractice");
  refs.practiceResult = document.querySelector("#practiceResult");
  refs.practiceCard = document.querySelector(".practice-result");
  refs.signLibrary = document.querySelector("#signLibrary");
  refs.customSignForm = document.querySelector("#customSignForm");
  refs.detectedShapeSelect = document.querySelector("#detectedShapeSelect");
  refs.customSignName = document.querySelector("#customSignName");
  refs.customSignResponse = document.querySelector("#customSignResponse");
  refs.customSignStatus = document.querySelector("#customSignStatus");
  refs.customSignList = document.querySelector("#customSignList");
  refs.publicSignForm = document.querySelector("#publicSignForm");
  refs.publicNameInput = document.querySelector("#publicNameInput");
  refs.publicEmailInput = document.querySelector("#publicEmailInput");
  refs.publicSignName = document.querySelector("#publicSignName");
  refs.publicSignCategory = document.querySelector("#publicSignCategory");
  refs.publicSignMeaning = document.querySelector("#publicSignMeaning");
  refs.publicSignDescription = document.querySelector("#publicSignDescription");
  refs.publicSignStatus = document.querySelector("#publicSignStatus");
  refs.communitySignList = document.querySelector("#communitySignList");
  refs.feedbackForm = document.querySelector("#feedbackForm");
  refs.feedbackStatus = document.querySelector("#feedbackStatus");
  refs.nameInput = document.querySelector("#nameInput");
  refs.emailInput = document.querySelector("#emailInput");
  refs.messageInput = document.querySelector("#messageInput");
}

function setupTheme() {
  const savedTheme = localStorage.getItem("signspeak-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");
  setTheme(theme);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  refs.themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  refs.themeToggle.setAttribute("aria-pressed", String(isDark));
  localStorage.setItem("signspeak-theme", theme);
}

function setupEvents() {
  refs.themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });

  refs.startCamera.addEventListener("click", startCamera);
  refs.stopCamera.addEventListener("click", stopCamera);
  refs.speakButton.addEventListener("click", () => speakText(state.currentResponse));

  refs.practiceButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("is-selected")));
    button.addEventListener("click", () => {
      state.selectedPractice = button.dataset.practiceSign;
      refs.practiceButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      refs.selectedPractice.textContent = state.selectedPractice;
      updatePracticeResult(state.currentSign);
    });
  });

  refs.customSignForm.addEventListener("submit", saveCustomResponse);
  refs.publicSignForm.addEventListener("submit", registerPublicSign);
  refs.customSignList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-custom]");
    if (!button) {
      return;
    }

    removeCustomResponse(button.dataset.removeCustom);
  });

  refs.feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = refs.messageInput.value.trim();
    if (!message) {
      refs.feedbackStatus.textContent = "Please add a short message before sending.";
      refs.messageInput.focus();
      return;
    }

    const payload = {
      name: refs.nameInput.value.trim() || "Anonymous",
      email: refs.emailInput.value.trim() || "Not provided",
      message
    };
    openMailDraft(
      "SignSpeak AI feedback",
      [
        "New SignSpeak AI feedback",
        "",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        "",
        "Message:",
        payload.message
      ].join("\n")
    );

    refs.feedbackForm.reset();
    refs.feedbackStatus.textContent =
      `Thank you. An email draft was opened for ${FEEDBACK_EMAIL}.`;
  });

  window.addEventListener("beforeunload", stopCamera);
}

function renderPracticePicker() {
  refs.practicePicker.innerHTML = detectableSigns
    .map(
      (sign, index) => `
        <button
          class="practice-chip${index === 0 ? " is-selected" : ""}"
          type="button"
          data-practice-sign="${escapeHtml(sign.name)}"
        >
          ${escapeHtml(sign.name)}
        </button>
      `
    )
    .join("");
  refs.practiceButtons = Array.from(refs.practicePicker.querySelectorAll("[data-practice-sign]"));
}

function renderSignLibrary() {
  refs.signLibrary.innerHTML = signs
    .map(
      (sign) => `
        <article class="sign-card${sign.detectable ? " detectable" : ""}">
          <span class="card-meta">${escapeHtml(sign.category)}</span>
          <h3>${escapeHtml(sign.name)}</h3>
          <span class="hand-shape">${escapeHtml(sign.shape)}</span>
          <p>${escapeHtml(sign.tip)}</p>
          <p class="response-line"><strong>Response:</strong> ${escapeHtml(sign.response)}</p>
          <span class="library-badge${sign.detectable ? " detectable" : ""}">
            ${sign.detectable ? "Detectable now" : "Library response"}
          </span>
        </article>
      `
    )
    .join("");
}

function renderCustomControls() {
  refs.detectedShapeSelect.innerHTML = detectableSigns
    .map(
      (sign) => `
        <option value="${escapeHtml(sign.name)}">
          ${escapeHtml(sign.name)} - ${escapeHtml(sign.shape)}
        </option>
      `
    )
    .join("");
  renderCustomResponses();
}

function renderCustomResponses() {
  if (!state.customResponses.length) {
    refs.customSignList.innerHTML = `
      <p class="empty-custom">No personal responses yet. Save one to make a detected hand shape speak your own words.</p>
    `;
    return;
  }

  refs.customSignList.innerHTML = state.customResponses
    .map((item) => {
      const source = findSign(item.sourceSign);
      const shape = source ? source.shape : item.sourceSign;
      return `
        <article class="custom-card">
          <span class="hand-shape">Detected: ${escapeHtml(shape)}</span>
          <strong>${escapeHtml(item.name)}</strong>
          <p>${escapeHtml(item.response)}</p>
          <button class="remove-custom" type="button" data-remove-custom="${escapeHtml(item.sourceSign)}">
            Remove
          </button>
        </article>
      `;
    })
    .join("");
}

function saveCustomResponse(event) {
  event.preventDefault();
  const sourceSign = refs.detectedShapeSelect.value;
  const name = refs.customSignName.value.trim();
  const response = refs.customSignResponse.value.trim();

  if (!name || !response) {
    refs.customSignStatus.textContent = "Add both a sign name and a response.";
    return;
  }

  const nextItem = {
    sourceSign,
    name,
    response,
    updatedAt: new Date().toISOString()
  };

  state.customResponses = state.customResponses
    .filter((item) => item.sourceSign !== sourceSign)
    .concat(nextItem);
  persistCustomResponses();
  refs.customSignForm.reset();
  refs.customSignStatus.textContent = `Saved. When ${sourceSign} is detected, SignSpeak AI will say: ${response}`;
  renderCustomResponses();

  if (state.currentBaseSign === sourceSign) {
    updateDetectedSign({ label: sourceSign, confidence: 0.85 });
  }
}

function removeCustomResponse(sourceSign) {
  state.customResponses = state.customResponses.filter((item) => item.sourceSign !== sourceSign);
  persistCustomResponses();
  renderCustomResponses();
  refs.customSignStatus.textContent = "Personal response removed.";

  if (state.currentBaseSign === sourceSign) {
    updateDetectedSign({ label: sourceSign, confidence: 0.85 });
  }
}

function loadCustomResponses() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CUSTOM_RESPONSES_KEY) || "[]");
    return Array.isArray(parsed)
      ? parsed.filter((item) => item.sourceSign && item.name && item.response)
      : [];
  } catch (error) {
    console.warn("Could not load custom responses", error);
    return [];
  }
}

function persistCustomResponses() {
  localStorage.setItem(CUSTOM_RESPONSES_KEY, JSON.stringify(state.customResponses));
}

function registerPublicSign(event) {
  event.preventDefault();
  const sign = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: refs.publicSignName.value.trim(),
    category: refs.publicSignCategory.value,
    meaning: refs.publicSignMeaning.value.trim(),
    description: refs.publicSignDescription.value.trim(),
    contributor: refs.publicNameInput.value.trim() || "Anonymous",
    email: refs.publicEmailInput.value.trim() || "Not provided",
    createdAt: new Date().toISOString()
  };

  if (!sign.name || !sign.meaning || !sign.description) {
    refs.publicSignStatus.textContent =
      "Please add the sign name, meaning, and how to show the sign.";
    return;
  }

  state.communitySigns = [sign, ...state.communitySigns].slice(0, 12);
  persistCommunitySigns();
  renderCommunitySigns();
  openMailDraft(`New sign registration: ${sign.name}`, formatPublicSignEmail(sign));
  refs.publicSignForm.reset();
  refs.publicSignStatus.textContent =
    `Registered locally. An email draft was opened for ${FEEDBACK_EMAIL}.`;
}

function loadCommunitySigns() {
  try {
    const parsed = JSON.parse(localStorage.getItem(COMMUNITY_SIGNS_KEY) || "[]");
    return Array.isArray(parsed)
      ? parsed.filter((item) => item.name && item.meaning && item.description)
      : [];
  } catch (error) {
    console.warn("Could not load community sign ideas", error);
    return [];
  }
}

function persistCommunitySigns() {
  localStorage.setItem(COMMUNITY_SIGNS_KEY, JSON.stringify(state.communitySigns));
}

function renderCommunitySigns() {
  if (!state.communitySigns.length) {
    refs.communitySignList.innerHTML = `
      <p class="empty-custom">No public sign ideas registered on this device yet.</p>
    `;
    return;
  }

  refs.communitySignList.innerHTML = state.communitySigns
    .map(
      (sign) => `
        <article class="community-card">
          <span class="card-meta">${escapeHtml(sign.category)}</span>
          <h4>${escapeHtml(sign.name)}</h4>
          <p><strong>Response:</strong> ${escapeHtml(sign.meaning)}</p>
          <p><strong>How to show:</strong> ${escapeHtml(sign.description)}</p>
          <p><strong>By:</strong> ${escapeHtml(sign.contributor)}</p>
        </article>
      `
    )
    .join("");
}

function formatPublicSignEmail(sign) {
  return [
    "New public sign registration for SignSpeak AI",
    "",
    `Sign name: ${sign.name}`,
    `Category: ${sign.category}`,
    `Meaning / response: ${sign.meaning}`,
    "",
    "How to show the sign:",
    sign.description,
    "",
    `Submitted by: ${sign.contributor}`,
    `Email: ${sign.email}`,
    `Submitted at: ${new Date(sign.createdAt).toLocaleString()}`
  ].join("\n");
}

function openMailDraft(subject, body) {
  const href = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const link = document.createElement("a");
  link.href = href;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function prepareHandModel() {
  if (!window.Hands) {
    setModelStatus("Model unavailable", "error");
    state.lastError =
      "Hand-tracking script could not load. Check your internet connection, then refresh.";
    return;
  }

  try {
    refs.modelStatus.textContent = "Loading hand model";
    const detector = new window.Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    detector.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.68,
      minTrackingConfidence: 0.68
    });

    detector.onResults(handleHandResults);
    state.detector = detector;
    state.detectorReady = true;
    setModelStatus("Model ready", "ready");
  } catch (error) {
    console.error(error);
    setModelStatus("Model error", "error");
    state.lastError =
      "Hand tracking could not start. The camera preview can still work, but signs cannot be detected.";
  }
}

function setModelStatus(text, mode) {
  refs.modelStatus.textContent = text;
  refs.modelStatus.classList.toggle("ready", mode === "ready");
  refs.modelStatus.classList.toggle("error", mode === "error");
}

async function startCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setCameraStatus("This browser does not support camera access.", true);
    return;
  }

  refs.startCamera.disabled = true;
  refs.stopCamera.disabled = true;
  setCameraStatus("Requesting camera permission...", false);

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    });

    state.stream = stream;
    state.cameraActive = true;
    refs.cameraPreview.srcObject = stream;
    await refs.cameraPreview.play();

    refs.cameraPreview.classList.add("is-active");
    refs.cameraEmptyState.classList.add("is-hidden");
    refs.stopCamera.disabled = false;
    setCameraStatus("Camera is on. Show your hand sign in front of the camera.", false);
    setTrackingStatus("Watching", "ready");
    updateDetectedSign(null);
    startDetectionLoop();
  } catch (error) {
    if (isCameraPermissionError(error)) {
      console.warn("Camera permission was not granted.");
    } else {
      console.error(error);
    }
    refs.startCamera.disabled = false;
    refs.stopCamera.disabled = true;
    handleCameraError(error);
  }
}

function isCameraPermissionError(error) {
  const name = error && error.name ? error.name : "";
  return name === "NotAllowedError" || name === "PermissionDeniedError";
}

function handleCameraError(error) {
  const name = error && error.name ? error.name : "";
  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    setCameraStatus(
      "Camera permission was denied. Allow camera access in your browser settings and try again.",
      true
    );
    return;
  }

  if (name === "NotFoundError" || name === "DevicesNotFoundError") {
    setCameraStatus("No camera was found on this device.", true);
    return;
  }

  if (name === "NotReadableError") {
    setCameraStatus("The camera is already in use by another app or tab.", true);
    return;
  }

  setCameraStatus("Camera could not start. Please refresh and try again.", true);
}

function stopCamera() {
  if (state.frameRequest) {
    cancelAnimationFrame(state.frameRequest);
    state.frameRequest = null;
  }

  if (state.stream) {
    state.stream.getTracks().forEach((track) => track.stop());
    state.stream = null;
  }

  state.cameraActive = false;
  refs.cameraPreview.pause();
  refs.cameraPreview.srcObject = null;
  refs.cameraPreview.classList.remove("is-active");
  refs.cameraEmptyState.classList.remove("is-hidden");
  refs.startCamera.disabled = false;
  refs.stopCamera.disabled = true;
  clearCanvas();
  updateDetectedSign(null);
  setTrackingStatus("Waiting", "soft");
  setCameraStatus("Camera is off.", false);
}

function setCameraStatus(message, isError) {
  refs.cameraStatus.textContent = message;
  refs.cameraStatus.style.color = isError ? "var(--error)" : "var(--muted)";
}

function setTrackingStatus(text, mode) {
  refs.trackingStatus.textContent = text;
  refs.trackingStatus.classList.toggle("ready", mode === "ready");
  refs.trackingStatus.classList.toggle("error", mode === "error");
  refs.trackingStatus.classList.toggle("soft", mode === "soft");
}

function startDetectionLoop() {
  const loop = async () => {
    if (!state.cameraActive) {
      return;
    }

    if (state.detectorReady && state.detector && refs.cameraPreview.readyState >= 2) {
      await sendVideoFrame();
    } else if (state.lastError) {
      setTrackingStatus("Model unavailable", "error");
      refs.confidenceText.textContent = state.lastError;
    }

    state.frameRequest = requestAnimationFrame(loop);
  };

  state.frameRequest = requestAnimationFrame(loop);
}

async function sendVideoFrame() {
  if (state.processingFrame) {
    return;
  }

  state.processingFrame = true;
  try {
    await state.detector.send({ image: refs.cameraPreview });
  } catch (error) {
    console.error(error);
    setTrackingStatus("Tracking paused", "error");
    refs.confidenceText.textContent = "Hand tracking paused. Stop and restart the camera.";
  } finally {
    state.processingFrame = false;
  }
}

function handleHandResults(results) {
  resizeCanvas();
  const ctx = refs.landmarkCanvas.getContext("2d");
  ctx.clearRect(0, 0, refs.landmarkCanvas.width, refs.landmarkCanvas.height);

  const landmarks = results.multiHandLandmarks && results.multiHandLandmarks[0];
  if (!landmarks) {
    updateDetectedSign(null);
    return;
  }

  drawLandmarkOverlay(ctx, landmarks);
  const rawSign = classifySign(landmarks);
  const sign = smoothSign(rawSign);
  updateDetectedSign(sign);
}

function resizeCanvas() {
  const video = refs.cameraPreview;
  const canvas = refs.landmarkCanvas;
  const width = video.videoWidth || canvas.clientWidth || 640;
  const height = video.videoHeight || canvas.clientHeight || 480;

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

function drawLandmarkOverlay(ctx, landmarks) {
  if (window.drawConnectors && window.drawLandmarks && window.HAND_CONNECTIONS) {
    window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, {
      color: "#4ed3c7",
      lineWidth: 4
    });
    window.drawLandmarks(ctx, landmarks, {
      color: "#ff8a7f",
      lineWidth: 2,
      radius: 4
    });
    return;
  }

  ctx.fillStyle = "#4ed3c7";
  landmarks.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x * ctx.canvas.width, point.y * ctx.canvas.height, 5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function classifySign(landmarks) {
  const wrist = landmarks[0];
  const palm = Math.max(distance(landmarks[0], landmarks[9]), 0.05);
  const extended = {
    thumb: isThumbExtended(landmarks, palm),
    index: isFingerExtended(landmarks, 8, 6),
    middle: isFingerExtended(landmarks, 12, 10),
    ring: isFingerExtended(landmarks, 16, 14),
    pinky: isFingerExtended(landmarks, 20, 18)
  };

  const fingersUp = [extended.index, extended.middle, extended.ring, extended.pinky].filter(Boolean)
    .length;
  const thumbIndexGap = distance(landmarks[4], landmarks[8]) / palm;
  const thumbMiddleGap = distance(landmarks[4], landmarks[12]) / palm;
  const thumbRingGap = distance(landmarks[4], landmarks[16]) / palm;
  const thumbPinkyGap = distance(landmarks[4], landmarks[20]) / palm;
  const allFingertipsNearThumb =
    [thumbIndexGap, thumbMiddleGap, thumbRingGap, thumbPinkyGap].filter((gap) => gap < 0.85)
      .length >= 3;
  const thumbIsRaised = landmarks[4].y < wrist.y - palm * 0.55;

  if (allFingertipsNearThumb && fingersUp <= 2) {
    return { label: "Food", confidence: 0.82 };
  }

  if (extended.thumb && fingersUp === 0 && thumbIsRaised) {
    return { label: "Help", confidence: 0.84 };
  }

  if (fingersUp === 0) {
    return { label: "Yes", confidence: 0.8 };
  }

  if (
    extended.index &&
    extended.middle &&
    !extended.ring &&
    !extended.pinky &&
    (thumbIndexGap < 1.35 || thumbMiddleGap < 1.35)
  ) {
    return { label: "No", confidence: 0.78 };
  }

  if (extended.index && extended.middle && extended.ring && !extended.pinky) {
    return { label: "Water", confidence: 0.83 };
  }

  if (fingersUp >= 4 && extended.thumb) {
    return { label: "Hello", confidence: 0.88 };
  }

  if (fingersUp >= 4 && !extended.thumb) {
    return { label: "Thank You", confidence: 0.76 };
  }

  return null;
}

function isFingerExtended(landmarks, tipIndex, pipIndex) {
  const wrist = landmarks[0];
  const tipDistance = distance(landmarks[tipIndex], wrist);
  const pipDistance = distance(landmarks[pipIndex], wrist);
  return tipDistance > pipDistance * 1.12 && landmarks[tipIndex].y < landmarks[pipIndex].y + 0.05;
}

function isThumbExtended(landmarks, palm) {
  const thumbTip = landmarks[4];
  const thumbIp = landmarks[3];
  const indexBase = landmarks[5];
  const pinkyBase = landmarks[17];
  const spread = distance(thumbTip, indexBase);
  const palmWidth = Math.max(distance(indexBase, pinkyBase), 0.05);
  return distance(thumbTip, thumbIp) > palm * 0.28 && spread > palmWidth * 0.58;
}

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = (a.z || 0) - (b.z || 0);
  return Math.hypot(dx, dy, dz);
}

function smoothSign(sign) {
  state.recentSigns.push(sign ? sign.label : null);
  if (state.recentSigns.length > 5) {
    state.recentSigns.shift();
  }

  const counts = state.recentSigns.reduce((map, label) => {
    if (label) {
      map[label] = (map[label] || 0) + 1;
    }
    return map;
  }, {});

  const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (!best || best[1] < 2) {
    return sign;
  }

  return sign && sign.label === best[0] ? sign : { label: best[0], confidence: 0.75 };
}

function updateDetectedSign(sign) {
  state.currentSign = sign ? sign.label : null;
  state.currentBaseSign = sign ? sign.label : null;
  const message = state.currentBaseSign ? getResponseForSign(state.currentBaseSign) : null;

  state.currentSign = message ? message.name : null;
  state.currentResponse = message ? message.response : null;
  refs.detectedText.textContent = state.currentSign || WAITING_TEXT;
  refs.responseText.textContent = state.currentResponse || WAITING_RESPONSE;
  refs.sourceShapeText.textContent = message
    ? `Detected hand shape: ${message.shape}`
    : "Hand shape will appear here.";
  refs.speakButton.disabled = !state.currentResponse || !canSpeak();

  if (!sign) {
    refs.confidenceText.textContent = state.cameraActive
      ? "Keep your hand centered and hold a clear sign."
      : "Confidence will appear here.";
    setTrackingStatus(state.cameraActive ? "Waiting" : "Waiting", "soft");
    updatePracticeResult(null);
    return;
  }

  refs.confidenceText.textContent = `Estimated confidence: ${Math.round(sign.confidence * 100)}%`;
  setTrackingStatus("Detected", "ready");
  updatePracticeResult(state.currentBaseSign);

  if (refs.autoSpeak.checked) {
    speakText(state.currentResponse, true);
  }
}

function getResponseForSign(baseSign) {
  const custom = state.customResponses.find((item) => item.sourceSign === baseSign);
  const sign = findSign(baseSign);

  if (custom) {
    return {
      name: custom.name,
      response: custom.response,
      shape: sign ? sign.shape : baseSign
    };
  }

  if (sign) {
    return sign;
  }

  return {
    name: baseSign,
    response: baseSign,
    shape: baseSign
  };
}

function findSign(name) {
  return signs.find((sign) => sign.name === name);
}

function updatePracticeResult(detectedSign) {
  refs.practiceCard.classList.remove("correct", "try-again");

  if (!state.cameraActive) {
    refs.practiceResult.textContent = `Start the camera and show ${state.selectedPractice}.`;
    return;
  }

  if (!detectedSign) {
    refs.practiceResult.textContent = `Show ${state.selectedPractice}.`;
    return;
  }

  if (detectedSign === state.selectedPractice) {
    refs.practiceCard.classList.add("correct");
    refs.practiceResult.textContent = "Correct";
    return;
  }

  refs.practiceCard.classList.add("try-again");
  refs.practiceResult.textContent = `Try Again. I see ${detectedSign}.`;
}

function canSpeak() {
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function speakText(text, fromAutoSpeak = false) {
  if (!text || !canSpeak()) {
    refs.confidenceText.textContent = "Speech is not supported in this browser.";
    return;
  }

  const now = Date.now();
  if (fromAutoSpeak && text === state.lastSpokenText && now - state.lastSpokenAt < 3500) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  state.lastSpokenText = text;
  state.lastSpokenAt = now;
}

function clearCanvas() {
  const canvas = refs.landmarkCanvas;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
