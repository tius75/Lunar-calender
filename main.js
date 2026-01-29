import { Solar, Lunar } from 'https://esm.run/lunar-javascript';

const grid = document.getElementById('calendarGrid');
const monthDisplay = document.getElementById('monthDisplay');

let currentViewDate = new Date(); // Tanggal yang sedang dilihat

function renderCalendar(date) {
    grid.innerHTML = '';
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-11

    // 1. Tambahkan Nama Hari
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    days.forEach(d => {
        grid.innerHTML += `<div class="day-name">${d}</div>`;
    });

    // 2. Hitung Tanggal
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 3. Tambahkan Blank Space (Awal Bulan)
    for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div class="day-cell"></div>`;
    }

    // 4. Render Tanggal & Info Lunar
    for (let d = 1; d <= daysInMonth; d++) {
        const solar = Solar.fromYmd(year, month + 1, d);
        const lunar = solar.getLunar();
        
        const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

        grid.innerHTML += `
            <div class="day-cell ${isToday ? 'today' : ''}">
                <span class="solar-date">${d}</span>
                <span class="lunar-date">${lunar.getDayInChinese()}</span>
            </div>
        `;
    }

    monthDisplay.innerText = `${new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(date)}`;
}

// Inisialisasi
renderCalendar(currentViewDate);

// Event listener untuk tombol Next/Prev (opsional)
document.getElementById('prevMonth').onclick = () => {
    currentViewDate.setMonth(currentViewDate.getMonth() - 1);
    renderCalendar(currentViewDate);
};
document.getElementById('nextMonth').onclick = () => {
    currentViewDate.setMonth(currentViewDate.getMonth() + 1);
    renderCalendar(currentViewDate);
};
