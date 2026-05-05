// Menu mobile : on affiche/cache les liens.
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });
}

// ===============================
// Modal produits
// ===============================

// Données de chaque produit pour le modal
var produitsData = {
  paracetamol: {
    titre: "Paracétamol 500mg",
    badge: "Médicament",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    desc: "Le paracétamol est l'antalgique et antipyrétique le plus utilisé au monde. Il soulage efficacement les douleurs légères à modérées (maux de tête, douleurs musculaires, fièvre) sans effets anti-inflammatoires.",
    infos: ["✅ Sans ordonnance", "⚠️ Max 3 g/jour", "🕐 Toutes les 6h min.", "⏱️ Max 5 jours"]
  },
  ibuprofen: {
    titre: "Ibuprofène 400mg",
    badge: "Médicament",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
    desc: "L'ibuprofène est un anti-inflammatoire non stéroïdien (AINS). Il réduit la douleur, la fièvre et l'inflammation. À prendre avec de la nourriture pour protéger l'estomac.",
    infos: ["⚠️ Avec repas", "🚫 Déconseillé grossesse", "⏱️ Max 5 jours", "💊 Sans ordonnance"]
  },
  vitamines: {
    titre: "Vitamines C & D",
    badge: "Complément",
    img: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80",
    desc: "Un complexe vitaminé combinant la vitamine C (immunité et antioxydant) et la vitamine D (os, muscles, système immunitaire). Idéal en prévention, surtout en hiver.",
    infos: ["✅ Usage quotidien", "🌞 Matin de préférence", "💊 1 comprimé/jour", "🧒 Adultes & enfants +12"]
  },
  antiacide: {
    titre: "Antiacide Rapide",
    badge: "Médicament",
    img: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=600&q=80",
    desc: "Agit rapidement contre les brûlures d'estomac, les remontées acides et les indigestions. La formule tamponnante neutralise l'excès d'acide en quelques minutes.",
    infos: ["⚡ Action rapide", "✅ Sans ordonnance", "🕐 Après les repas", "⚠️ Max 3/jour"]
  },
  sirop: {
    titre: "Sirop Pédiatrique",
    badge: "Médicament",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
    desc: "Sirop doux formulé pour les enfants contre la toux sèche et grasse. Sans alcool, sans colorants artificiels, goût fruité agréable pour faciliter la prise.",
    infos: ["👶 Dès 2 ans", "🍓 Goût fruits rouges", "✅ Sans alcool", "🕐 3x par jour"]
  },
  magnesium: {
    titre: "Magnésium Marin",
    badge: "Complément",
    img: "https://images.unsplash.com/photo-1612957624007-2b8fdada4d6b?auto=format&fit=crop&w=600&q=80",
    desc: "Le magnésium marin est extrait naturellement de l'eau de mer. Il contribue à réduire la fatigue, soutient le système nerveux et aide à la récupération musculaire.",
    infos: ["🌊 Origine naturelle", "😴 Réduit la fatigue", "💪 Muscles & nerfs", "💊 2 gélules/jour"]
  }
};

var modalOverlay = document.getElementById("productModal");

// Ouvre le modal avec les données du produit choisi
function openModal(id) {
  var data = produitsData[id];
  if (!data || !modalOverlay) return;

  document.getElementById("modalImg").src = data.img;
  document.getElementById("modalImg").alt = data.titre;
  document.getElementById("modalTitre").textContent = data.titre;
  document.getElementById("modalBadge").textContent = data.badge;
  document.getElementById("modalDesc").textContent = data.desc;

  // Remplir la liste d'informations
  var listeEl = document.getElementById("modalInfos");
  listeEl.innerHTML = "";
  data.infos.forEach(function (info) {
    var li = document.createElement("li");
    li.textContent = info;
    listeEl.appendChild(li);
  });

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden"; // empêche le défilement derrière le modal
}

// Ferme le modal
function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// Clic sur le fond du modal → fermer
if (modalOverlay) {
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) closeModal();
  });
}

// Touche Échap → fermer
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

// ===============================
// Filtre onglets produits
// ===============================

var filterTabs = document.querySelectorAll(".filter-tab");
var productCards = document.querySelectorAll(".product-card");

filterTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    // Retirer l'état actif de tous les onglets
    filterTabs.forEach(function (t) { t.classList.remove("active"); });
    this.classList.add("active");

    var filtre = this.dataset.filter;

    // Afficher ou cacher les cartes selon la catégorie
    productCards.forEach(function (card) {
      if (filtre === "all" || card.dataset.category === filtre) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ===============================
// Chatbot pharmaceutique (v2)
// ===============================

var chatToggle   = document.getElementById("chatToggle");
var chatBox      = document.getElementById("chatBox");
var chatClose    = document.getElementById("chatClose");
var chatInput    = document.getElementById("chatInput");
var chatSend     = document.getElementById("chatSend");
var chatMessages = document.getElementById("chatMessages");
var chatOpened   = false; // message de bienvenue affiché une seule fois

// Symptômes proposés en chips
var symptoms = [
  "🤒 Fièvre", "🤕 Mal de tête", "🤧 Rhume / Nez",
  "😤 Toux", "🤢 Nausées", "💪 Douleurs musculaires",
  "😴 Fatigue", "😰 Stress / Anxiété"
];

// Base de réponses : { text, chips }
function getBotReply(input) {
  var t = input.toLowerCase().trim();

  // Salutations
  if (t.includes("bonjour") || t.includes("salut") || t.includes("hello")) {
    return { text: "Bonjour 😊 Je suis votre assistant PharmaCop. Choisissez un symptôme ou posez votre question !", chips: symptoms };
  }

  // Fièvre
  if (t.includes("fièvre") || t.includes("fievre") || t.includes("température") || t.includes("chaud")) {
    return { text: "Pour la fièvre légère, le paracétamol (500mg-1g) ou l’ibuprofène peuvent aider. Hydratez-vous beaucoup et reposez-vous.\n\n⚠️ Consultez un médecin si la fièvre dépasse 39,5 °C ou dure plus de 3 jours.", chips: ["🔁 Autre symptôme", "💊 Voir les produits"] };
  }

  // Mal de tête / migraine
  if (t.includes("tête") || t.includes("migraine") || t.includes("mal de tête") || t.includes("céphalée")) {
    return { text: "Le paracétamol est l’antalgique le plus adapté aux maux de tête courants. Reposez-vous, réduisez la lumière et hydratez-vous.\n\n⚠️ Si la douleur est soudaine, très intense ou accompagnée de troubles visuels, consultez un médecin.", chips: ["🔁 Autre symptôme", "💊 Voir les produits"] };
  }

  // Rhume / nez
  if (t.includes("rhume") || t.includes("nez") || t.includes("congestion") || t.includes("éternuement")) {
    return { text: "Le rhume est viral — les antibiotiques ne servent à rien. La vitamine C, les décongestionnants nasaux et le repos sont vos meilleurs alliés. Guérison naturelle en 7-10 jours.\n\n⚠️ Consultez si les symptômes s’aggravent après 10 jours.", chips: ["🔁 Autre symptôme", "💊 Voir les produits"] };
  }

  // Toux
  if (t.includes("toux") || t.includes("tousse")) {
    return { text: "• Toux sèche → sirop antitussif\n• Toux grasse → expectorant pour libérer les voies\n\nRestez hydraté et aérez la pièce.\n\n⚠️ Toux persistante depuis +3 semaines ou avec sang → consultez un médecin.", chips: ["🔁 Autre symptôme", "💊 Voir les produits"] };
  }

  // Nausées / vomissements
  if (t.includes("nausée") || t.includes("nausee") || t.includes("vomi") || t.includes("mal au c")) {
    return { text: "Buvez de l’eau à petites gorgées, mangez léger (riz, pain sec). Le gingembre et les antiémétiques en vente libre peuvent aider.\n\n⚠️ Si les vomissements durent plus de 24h ou s’accompagnent de forte fièvre, consultez.", chips: ["🔁 Autre symptôme"] };
  }

  // Douleurs musculaires
  if (t.includes("douleur") || t.includes("muscle") || t.includes("musculaire") || t.includes("courbature") || t.includes("mal aux")) {
    return { text: "L’ibuprofène est efficace contre les douleurs musculaires et inflammations. Un gel anti-inflammatoire appliqué localement peut aussi soulager rapidement.\n\n⚠️ Pour des douleurs intenses, prolongées ou après un traumatisme, consultez.", chips: ["🔁 Autre symptôme", "💊 Voir les produits"] };
  }

  // Fatigue
  if (t.includes("fatigue") || t.includes("fatigué") || t.includes("épuisé") || t.includes("epuise")) {
    return { text: "La fatigue peut venir d’un manque de magnésium, de fer ou de vitamines B/D. Une cure de magnésium marin peut aider rapidement.\n\n⚠️ Fatigue chronique inexpliquée → bilan sanguin chez votre médecin recommandé.", chips: ["🔁 Autre symptôme", "💊 Voir les produits"] };
  }

  // Stress / anxiété
  if (t.includes("stress") || t.includes("anxiété") || t.includes("anxiete") || t.includes("angoisse") || t.includes("nerveux")) {
    return { text: "Le magnésium réduit la tension nerveuse. Des plantes comme la valériane ou la passiflore peuvent calmer l’anxiété légère. La cohérence cardiaque (3 fois/jour) est aussi très efficace.\n\n⚠️ Pour un stress sévère ou persistant, parlez-en à un professionnel de santé.", chips: ["🔁 Autre symptôme"] };
  }

  // Paracétamol par texte
  if (t.includes("paracetamol") || t.includes("paracétamol")) {
    return { text: "Paracétamol 500mg : antalgique et antipyrétique. Dose adulte : 500mg à 1g toutes les 6h, max 3g/jour. Ne pas dépasser la dose recommandée.", chips: ["🔁 Autre symptôme"] };
  }

  // Ibuprofène par texte
  if (t.includes("ibuprofen") || t.includes("ibuprofène") || t.includes("ibuprofene")) {
    return { text: "Ibuprofène 400mg : anti-inflammatoire. À prendre avec un repas. Déconseillé en cas de grossesse, ulcère ou insuffisance rénale.", chips: ["🔁 Autre symptôme"] };
  }

  // Merci
  if (t.includes("merci")) {
    return { text: "Avec plaisir 😊 Prenez soin de vous ! N’oubliez pas de consulter un professionnel pour tout diagnostic sérieux.", chips: ["🔁 Autre symptôme"] };
  }

  // "Autre symptôme" ou retour menu
  if (t.includes("autre") || t.includes("retour") || t.includes("menu")) {
    return { text: "Bien sûr ! Quel symptôme souhaitez-vous explorer ?", chips: symptoms };
  }

  // Redirection produits
  if (t.includes("produit") || t.includes("voir les produits")) {
    window.location.href = "products.html";
    return null;
  }

  // Réponse par défaut
  return { text: "Je ne reconnais pas ce symptôme 🤔 Choisissez un symptôme dans la liste ou consultez directement un pharmacien.", chips: symptoms };
}

// Crée et ajoute un message + ses chips dans la conversation
function addMessage(text, who, chips) {
  var wrap = document.createElement("div");
  wrap.className = "chat-msg-wrap " + who;

  var bubble = document.createElement("div");
  bubble.className = "chat-msg " + who;
  // Supporte les sauts de ligne dans les réponses
  bubble.style.whiteSpace = "pre-line";
  bubble.textContent = text;
  wrap.appendChild(bubble);

  // Ajouter les chips cliquables si fournis
  if (chips && chips.length > 0) {
    var chipsEl = document.createElement("div");
    chipsEl.className = "chat-chips";
    chips.forEach(function (chip) {
      var btn = document.createElement("button");
      btn.className = "chat-chip";
      btn.textContent = chip;
      btn.addEventListener("click", function () {
        handleChip(chip);
      });
      chipsEl.appendChild(btn);
    });
    wrap.appendChild(chipsEl);
  }

  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Clic sur une chip : retire les chips existantes et envoie
function handleChip(text) {
  chatMessages.querySelectorAll(".chat-chips").forEach(function (el) {
    el.remove();
  });
  addMessage(text, "user", null);
  setTimeout(function () {
    var reply = getBotReply(text);
    if (reply) addMessage(reply.text, "bot", reply.chips);
  }, 380);
}

// Envoi par le champ texte
function sendMessage() {
  if (!chatInput) return;
  var userText = chatInput.value.trim();
  if (userText === "") return;
  chatMessages.querySelectorAll(".chat-chips").forEach(function (el) { el.remove(); });
  addMessage(userText, "user", null);
  chatInput.value = "";
  setTimeout(function () {
    var reply = getBotReply(userText);
    if (reply) addMessage(reply.text, "bot", reply.chips);
  }, 400);
}

// Ouvrir / fermer + message de bienvenue au 1er clic
if (chatToggle && chatBox) {
  chatToggle.addEventListener("click", function () {
    chatBox.classList.toggle("open");
    if (chatBox.classList.contains("open") && !chatOpened) {
      chatOpened = true;
      setTimeout(function () {
        addMessage("Bonjour 👋 Je suis votre assistant PharmaCop.", "bot", null);
        setTimeout(function () {
          addMessage("Je peux vous orienter sur vos symptômes. ⚠️ Je ne remplace pas un médecin — consultez toujours un professionnel pour un diagnostic.", "bot", null);
          setTimeout(function () {
            addMessage("Quel symptôme souhaitez-vous explorer ?", "bot", symptoms);
          }, 700);
        }, 600);
      }, 350);
    }
  });
}

if (chatClose) {
  chatClose.addEventListener("click", function () { chatBox.classList.remove("open"); });
}

if (chatSend) {
  chatSend.addEventListener("click", sendMessage);
}

if (chatInput) {
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });
}

// Formulaire contact : message simple (pas de backend).
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Merci ! Votre message a ete envoye.");
    contactForm.reset();
  });
}
