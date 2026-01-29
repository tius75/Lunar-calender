export const ramalanShio = {
    "Naga": "Energi Anda sedang kuat, waktu yang tepat untuk memulai bisnis.",
    "Ular": "Tetap rendah hati, ada potensi konflik kecil di pertengahan bulan.",
    // Tambahkan shio lainnya...
};

export function getDetailRamalan(shio) {
    return ramalanShio[shio] || "Ramalan tidak ditemukan.";
}
