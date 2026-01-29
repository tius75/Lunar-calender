import { Solar, Lunar } from 'https://esm.run/lunar-javascript';

const grid = document.getElementById('calendarGrid');
const monthDisplay = document.getElementById('monthDisplay');

// 1. Kamus Penamaan Tanggal Lunar Indonesia
const tglIndo = ["", "Ce It", "Ji It", "Sa It", "Si It", "Go It", "Lak It", "Tjit It", "Puek It", "Kauw It", "Tjap It", "Tjap Tji", "Tjap Sa", "Tjap Si", "Tjap Go", "Tjap Lak", "Tjit It", "Puek It", "Kauw It", "Ji Tjap", "Ji It", "Ji Tji", "Ji Sa", "Ji Si", "Ji Go", "Ji Lak", "Ji Tjit", "Ji Puek", "Ji Kauw", "Sa Tjap"];

let currentViewDate = new Date(); 

function renderCalendar(date) {
    grid.innerHTML = '';
    const year = date.getFullYear();
    const month = date.getMonth(); 

    // 1. Tambahkan Nama Hari
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    days.forEach(d => {
        grid.innerHTML += `<div class="day-name">${d}</div>`;
    });

    // 2. Hitung Tanggal
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 3. Tambahkan Blank Space
    for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div class="day-cell"></div>`;
    }

    // 4. Render Tanggal & Info Lunar
    for (let d = 1; d <= daysInMonth; d++) {
        const solar = Solar.fromYmd(year, month + 1, d);
        const lunar = solar.getLunar();
        
        // AMBIL TANGGAL LUNAR (1-30)
        const dayLunar = lunar.getDay(); 
        // TERJEMAHKAN KE ISTILAH INDONESIA
        const lunarText = tglIndo[dayLunar] || "";

        const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

        grid.innerHTML += `
            <div class="day-cell ${isToday ? 'today' : ''}">
                <span class="solar-date">${d}</span>
                <span class="lunar-date" style="color: #d32f2f; font-size: 0.7rem;">${lunarText}</span>
            </div>
        `;
    }

    monthDisplay.innerText = `${new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(date)}`;
}

// Inisialisasi
renderCalendar(currentViewDate);

// Event listener
document.getElementById('prevMonth').onclick = () => {
    currentViewDate.setMonth(currentViewDate.getMonth() - 1);
    renderCalendar(currentViewDate);
};
document.getElementById('nextMonth').onclick = () => {
    currentViewDate.setMonth(currentViewDate.getMonth() + 1);
    renderCalendar(currentViewDate);
};