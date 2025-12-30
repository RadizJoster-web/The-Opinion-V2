export function generate_date_until() {
  const now = new Date();

  // Ambil Tahun sekarang
  const this_year = now.getFullYear();
  // Ambil bulan sekarang
  const this_month = String(now.getMonth() + 1).padStart(2, "0");
  // Ambil tanggal sekarang
  const this_date = String(now.getDate()).padStart(2, "0");

  // Satukan semua
  const today = `${this_year}-${this_month}-${this_date}`;

  return today;
}
