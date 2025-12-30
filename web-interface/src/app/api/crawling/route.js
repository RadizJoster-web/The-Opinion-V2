import { NextResponse } from "next/server";

// Fungsi untuk mevalidasi data untuk di crawling
import { crawling } from "@/services/crawling";

// API untuk mengambil data crawling + analyze
export async function POST(request) {
  const data = await request.json();

  // Validasi keberadaan data utama
  if (!data || Object.keys(data).length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "Data tidak ditemukan",
      },
      { status: 400 }
    );
  }

  try {
    const result = await crawling(data);

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Crawling data tweet successfull",
        data: result,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Tweets not found",
          data: [],
        },
        { status: 404 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        message: `Crawling faild: ${err.message}`,
      },
      { status: 500 }
    );
  }
}
