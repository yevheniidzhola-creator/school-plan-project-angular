const fs = require('fs');

const subjects = ['Mathematics', 'Geography', 'Physics', 'Chemistry', 'Nature', 'Biology', 'Literature', 'History', 'English', 'PE', 'Art', 'Music', ''];
const years = ['1', '2', '3'];
const letters = ['A', 'B', 'C'];
const schedule = [];

let currentDate = new Date();

for (let i = 0; i < 30; i++) {
    // Pomijamy soboty (6) i niedziele (0)
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        const dateStr = currentDate.toISOString().split('T')[0];

        years.forEach(y => {
            letters.forEach(l => {
                // Generujemy tablicę 8 losowych przedmiotów
                const randomSubjects = Array.from({ length: 8 }, () =>
                    subjects[Math.floor(Math.random() * subjects.length)]
                );

                schedule.push({
                    date: dateStr,
                    letterClass: l,
                    yearClass: y,
                    subjects: randomSubjects // Nowa struktura: tablica zamiast sub_1...
                });
            });
        });
    }
    currentDate.setDate(currentDate.getDate() + 1);
}

// Przygotowanie treści pliku .ts
// Ustaw poprawną ścieżkę
const fileContent = `
import { SchoolIntrfc } from './app/modules; 
export const schoolSheduleData: SchoolIntrfc[] = ${JSON.stringify(schedule, null, 2)};
`;

// Zapis do pliku
fs.writeFileSync('./school.data.ts', fileContent);