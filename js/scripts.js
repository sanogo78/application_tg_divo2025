
const links = document.querySelectorAll('nav a[data-section]');
const sections = {
    accueil: document.getElementById('accueil'),
    traitement: document.getElementById('traitement'),
    faq: document.getElementById('faq')
};
let isSpeaking = false;
let currentUtterance = null;

// Afficher Accueil par défaut
Object.values(sections).forEach(sec => sec.style.display = 'none');
sections.accueil.style.display = 'block';
// Gestion de la lecture de la page
links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        Object.values(sections).forEach(sec => sec.style.display = 'none');
        const sectionId = link.getAttribute('data-section');
        sections[sectionId].style.display = 'block';
        // Arrêter la lecture si on change de section
        window.speechSynthesis.cancel();
        isSpeaking = false;
    });
});

// Confirmation formulaire
document.getElementById('questionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('confirmation').style.display = 'block';
    this.reset();
});

// Lecture vocale du contenu affiché avec arrêt
document.getElementById('speakBtn').addEventListener('click', function() {
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        return;
    }
    let visibleSection = null;
    Object.values(sections).forEach(sec => {
        if (sec.style.display !== 'none') visibleSection = sec;
    });
    if (visibleSection) {
        const text = visibleSection.innerText;
        currentUtterance = new SpeechSynthesisUtterance(text);
        currentUtterance.lang = 'fr-FR';
        currentUtterance.onend = function() {
            isSpeaking = false;
        };
        window.speechSynthesis.speak(currentUtterance);
        isSpeaking = true;
    }
});