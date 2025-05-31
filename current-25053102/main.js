import { lovelyProfileData } from './lovely_mock_data.js';

document.addEventListener('DOMContentLoaded', () => {
    const sectionsContainer = document.querySelector('body');

    // Daten dynamisch einfügen (nur als Beispiel für erstes Feld)
    const sliders = document.querySelectorAll('.slider');
    const values = document.querySelectorAll('.value');

    sliders.forEach((slider, index) => {
        slider.addEventListener('input', () => {
            const sectionIndex = index < 5 ? 0 : 1;
            const questionIndex = index < 5 ? index : index - 5;
            lovelyProfileData.sections[sectionIndex].questions[questionIndex].slider = parseInt(slider.value, 10);
        });
    });

    values.forEach((valEl, index) => {
        valEl.setAttribute('contenteditable', 'true');
        valEl.addEventListener('input', () => {
            const sectionIndex = index < 5 ? 0 : 1;
            const questionIndex = index < 5 ? index : index - 5;
            lovelyProfileData.sections[sectionIndex].questions[questionIndex].value = valEl.innerText.trim();
        });
    });

    // Download-Button erzeugen
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Daten speichern';
    saveButton.style.marginTop = '2rem';
    saveButton.style.padding = '0.5rem 1rem';
    saveButton.style.background = '#f7b2d4';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '6px';
    saveButton.style.cursor = 'pointer';

    saveButton.addEventListener('click', () => {
        const dataStr = JSON.stringify(lovelyProfileData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'lovelyProfile.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    sectionsContainer.appendChild(saveButton);
});