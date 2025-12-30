import path from "path";
import fs from "fs/promises";

import { req_machine_learning } from "@/lib/req_machine_learning";

export async function classify(data) {
  // Pastikan jika data adalah CSV
  const type_file_arry = data.type.split("/");
  const extensi_file = type_file_arry.pop();
  if (extensi_file != "csv") {
    return {
      success: false,
      message: "Type of file must csv",
    };
  }

  try {
    // Simpan file di tweets-data (di machine learning)
    // Tempat penyimpanan sementara file (Tempat yang sama kaya crawling)
    const dir_safe_file = path.join(
      process.cwd(),
      "..",
      "machine_learning",
      "tweets-data"
    );

    const file_name = data.name;

    const file_path = path.join(dir_safe_file, file_name);

    // Simpan file
    const bytes_file = await data.arrayBuffer();
    const buffer_file = Buffer.from(bytes_file);
    await fs.writeFile(file_path, buffer_file);

    // Bungkus direktori file ke dalam bentuk json
    const obj_file_name = { dataset_name_file: file_name };

    // Jalankan child process
    const result_classify = await req_machine_learning(
      obj_file_name,
      "classify.py"
    );

    return result_classify;
  } catch (err) {
    console.log(err);
    return null;
  }
}
