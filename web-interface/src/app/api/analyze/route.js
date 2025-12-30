import { NextResponse } from "next/server";
import { analyze } from "@/services/analyze";

export async function POST(request) {
  const file_name = await request.json();

  // pastikan file_name ada
  if (!file_name) {
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
    const result = await analyze(file_name);

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
