import { getLunarData } from './converter.js';
import { getDetailRamalan } from './fortune.js';

document.getElementById('btnCek').addEventListener('click', () => {
    const tgl = document.getElementById('inputTgl').value;
    if(!tgl) return;

    const data = getLunarData(tgl);
    const teksRamalan = getDetailRamalan(data.shio);

    document.getElementById('output').innerHTML = `
        <h3>${data.tanggal} ${data.bulan} ${data.tahun}</h3>
        <p>Shio: <strong>${data.shio}</strong></p>
        <p>Ramalan: ${teksRamalan}</p>
    `;
});
