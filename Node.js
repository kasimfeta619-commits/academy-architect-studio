const functions = require('firebase-functions');
const admin = require('firebase-admin');
if (!admin.apps.length) {
    admin.initializeApp();
}

// Създаване на защитен HTTP endpoint за календара
exports.calendarFeed = functions.https.onRequest(async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('studioBookings').get();
        
        let icsData = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Architecture Studio Calendar//BG",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH"
        ];

        snapshot.forEach(doc => {
            const b = doc.data();
            // Очакваме поле за дата и час във формат, напр. '2026-06-15 10:00' или ISO
            if (b.datetime) {
                // Преобразуваме датата в подходящ за iCalendar формат (YYYYMMDDTHHMMSSZ)
                const cleanDate = b.datetime.replace(/[-:]/g, '').replace(' ', 'T') + '00Z';
                
                icsData.push("BEGIN:VEVENT");
                icsData.push(`UID:${doc.id}@yoursite.com`);
                icsData.push(`SUMMARY:Консултация: ${b.name || 'Клиент'}`);
                icsData.push(`DESCRIPTION:Услуга: ${b.service || 'Обща'} | Тел: ${b.phone || 'Няма'}`);
                icsData.push(`DTSTART:${cleanDate}`);
                // Приемаме продължителност от 1 час по подразбиране
                icsData.push(`DTEND:${cleanDate}`); 
                icsData.push("END:VEVENT");
            }
        });

        icsData.push("END:VCALENDAR");

        // Задаваме правилните хедъри, за да разпознае устройството файла като календар
        res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="calendar.ics"');
        res.status(200).send(icsData.join('\r\n'));

    } catch (error) {
        console.error("Грешка при генериране на календара:", error);
        res.status(500).send("Грешка при зареждане на календара");
    }
});