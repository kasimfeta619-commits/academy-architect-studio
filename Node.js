const functions = require('firebase-functions');
const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp();
}

const ADMIN_EMAIL = 'admin@architect.bg';

function escapeICalText(value) {
    return String(value ?? '')
        .replace(/\\/g, '\\\\')
        .replace(/\r\n|\r|\n/g, '\\n')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;');
}

function parseSofiaDateTime(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/.exec(String(value || ''));
    if (!match) return null;

    const [, year, month, day, hour, minute, second = '0'] = match;
    const wallClockUtc = Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
    const sofiaParts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Sofia',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    }).formatToParts(new Date(wallClockUtc));
    const localParts = Object.fromEntries(sofiaParts.map(({ type, value: partValue }) => [type, partValue]));
    const sofiaOffset = Date.UTC(
        Number(localParts.year),
        Number(localParts.month) - 1,
        Number(localParts.day),
        Number(localParts.hour),
        Number(localParts.minute),
        Number(localParts.second)
    ) - wallClockUtc;

    return new Date(wallClockUtc - sofiaOffset);
}

function formatICalUtc(date) {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

exports.calendarFeed = functions.https.onRequest(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');

    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).send('Method not allowed');
    }

    const authorization = req.get('authorization') || '';
    const tokenMatch = authorization.match(/^Bearer\s+(.+)$/i);
    if (!tokenMatch) {
        return res.status(401).send('Authentication required');
    }

    let decodedToken;
    try {
        decodedToken = await admin.auth().verifyIdToken(tokenMatch[1], true);
    } catch {
        return res.status(401).send('Authentication required');
    }

    if (
        decodedToken.email !== ADMIN_EMAIL ||
        decodedToken.firebase?.sign_in_second_factor !== 'totp'
    ) {
        return res.status(403).send('Administrator TOTP required');
    }

    try {
        const snapshot = await admin.firestore().collection('studioBookings').get();
        const icsData = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Academy Architect Studio//BG',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH'
        ];

        snapshot.forEach((bookingDoc) => {
            const booking = bookingDoc.data();
            const startDate = parseSofiaDateTime(booking.datetime);
            if (!startDate || Number.isNaN(startDate.getTime())) return;

            const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
            icsData.push(
                'BEGIN:VEVENT',
                `UID:${bookingDoc.id}@architect-studio.bg`,
                `SUMMARY:${escapeICalText(`Консултация: ${booking.name || 'Клиент'}`)}`,
                `DESCRIPTION:${escapeICalText(`Услуга: ${booking.service || 'Обща'} | Тел: ${booking.phone || 'Няма'}`)}`,
                `DTSTART:${formatICalUtc(startDate)}`,
                `DTEND:${formatICalUtc(endDate)}`,
                'END:VEVENT'
            );
        });

        icsData.push('END:VCALENDAR');
        res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="calendar.ics"');
        return res.status(200).send(icsData.join('\r\n'));
    } catch (error) {
        console.error('Грешка при генериране на календара:', error);
        return res.status(500).send('Грешка при зареждане на календара');
    }
});
