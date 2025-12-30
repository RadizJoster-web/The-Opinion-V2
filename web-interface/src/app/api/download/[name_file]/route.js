import fs from "fs";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

// PERBAIKAN 1: Argumen pertama harus 'request' (meski tidak dipakai),
// params ada di argumen kedua.
export async function GET(request, { params }) {
  // PERBAIKAN 2: Jika pakai Next.js 15, tambahkan 'await'
  const { name_file } = await params;
  console.log(name_file);

  // Contoh validasi sederhana: pastikan file_name hanya teks dan titik
  if (!/^[a-zA-Z0-9._-]+$/.test(name_file)) {
    return NextResponse.json(
      { message: "Nama file tidak valid" },
      { status: 400 }
    );
  }

  const file_path = path.join(
    process.cwd(),
    "..",
    "machine_learning",
    "tweets-data",
    name_file
  );

  try {
    if (!fs.existsSync(file_path)) {
      return NextResponse.json(
        { success: false, message: "File tidak ditemukan" },
        { status: 404 }
      );
    }

    const file_buffer = await readFile(file_path);

    return new NextResponse(file_buffer, {
      status: 200,
      headers: {
        // PERBAIKAN 3: Pastikan nama variabel konsisten (tadi tertulis file_name)
        "Content-Disposition": `attachment; filename="${name_file}"`,
        "Content-Type": "text/csv",
      },
    });
  } catch (err) {
    console.error("Download Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
