import { req_machine_learning } from "@/lib/req_machine_learning";
// Kita asumsikan fungsi generate_date_from() diimpor dari lib
import { generate_date_from } from "@/lib/generate_date_from";
import { generate_date_until } from "@/lib/generate_date_until";

const TWEET_TOKEN = process.env.TWEET_TOKEN;

export async function crawling(data) {
  // Pastikan user mengisi topik karena ini hal yang paling penting
  if (data.topic === "") {
    return {
      success: false,
      message: "Tolong masukan topic yang ingin di crawling",
    };
  }

  // Mengubah tweet_limit dari string ke integer
  const limit_tweet_int = parseInt(data.limit);

  // Gunakan "Mutable Copy" atau langsung update properti objek
  // Kita buat objek baru agar data asli tidak rusak (Immutability)
  const validate_data = {
    topic: data.topic,

    // Gunakan fungsi helper yang sudah kita buat sebelumnya
    date_from: data.date_from || generate_date_from(),

    date_until: data.date_until || generate_date_until(),

    // Pastikan limit_tweet adalah angka dan punya default
    limit_tweet:
      !isNaN(limit_tweet_int) && limit_tweet_int > 0 ? limit_tweet_int : 100,

    // Cek bahasa: jika bukan 'id' atau 'en', paksa ke 'en'
    lang: data.lang === "id" || data.lang === "en" ? data.lang : "en",

    TWEET_TOKEN: TWEET_TOKEN,
  };

  try {
    // Crawling
    const result_crawling = await req_machine_learning(
      validate_data,
      "crawling.py"
    );

    const result = { result_crawling };

    // Kembalikan data yang sudah di dapat
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}
