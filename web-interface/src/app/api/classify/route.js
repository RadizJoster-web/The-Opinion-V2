import { NextResponse } from "next/server";
import { classify } from "@/services/classify";

export async function POST(request) {
  // Mengambil file
  const form_data = await request.formData();
  // Ambil label nama yang dikirim dari fronend
  const file = form_data.get("dataset");

  // pastikan file ada
  if (!file) {
    return NextResponse.json(
      {
        success: false,
        message: "Data not uploaded",
        data: [],
      },
      { status: 400 }
    );
  }

  try {
    const result = await classify(file);

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Clasification successfuly",
        data: result,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Clasification faild",
          data: result,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        message: `Clasification faild: ${err.message}`,
      },
      { status: 500 }
    );
  }
}
