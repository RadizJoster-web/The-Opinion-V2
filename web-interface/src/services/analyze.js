import { req_machine_learning } from "@/lib/req_machine_learning";

export async function analyze(file_name) {
  // Pastikan jika data adalah CSV
  const type_file_arry = file_name.split(".");
  const extensi_file = type_file_arry.pop();
  if (extensi_file != "csv") {
    return {
      success: false,
      message: "Type of file must csv",
    };
  }

  try {
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
