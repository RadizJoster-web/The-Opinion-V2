import { spawn } from "child_process";
import path from "path";

export async function req_machine_learning(data, file_py) {
  return new Promise((resolve, reject) => {
    try {
      // Direktori venv untuk menjalankan python3
      const python_executable = path.join(
        process.cwd(),
        "..",
        "machine_learning",
        "venv",
        "bin",
        "python3"
      );

      // Direktori machine learning untuk menjalankan file py
      const pythonScriptPath = path.join(
        process.cwd(),
        "..",
        "machine_learning",
        file_py
      );

      // Tentukan posisi direktori ML
      // Inisialisasi proses Python menggunakan path interpreter yang ditentukan
      const python_process = spawn(python_executable, [pythonScriptPath]);

      let python_result = "";
      let python_error = "";

      console.log("-> Node.js starting Python process...");

      // Mengirimkan data ke Python
      // Mengonversi data JavaScript menjadi string JSON dan mengirimkannya ke stdin Python
      python_process.stdin.write(JSON.stringify(data));
      python_process.stdin.end();

      // Menangkap output data sukses dari stdout Python
      python_process.stdout.on("data", (data) => {
        python_result += data.toString();
      });

      // Menangkap pesan kesalahan atau log error dari stderr Python
      python_process.stderr.on("data", (data) => {
        python_error += data.toString();
      });

      // Event listener saat proses Python selesai/ditutup
      python_process.on("close", (code) => {
        // Jika exit code bukan 0, berarti terjadi error pada eksekusi skrip Python
        if (code !== 0) {
          console.error(`<- Python process exited with code ${code}.`);
          console.error("Error Details:", python_error);

          return reject(
            new Error(
              `Python process exited with code ${code}. Error: ${python_error}`
            )
          );
        }

        try {
          // Parse JSON output dari Python
          // Catatan: Pastikan variabel 'python_result' sesuai dengan penampung string (python_result)
          const result = JSON.parse(python_result);

          console.log("<- Python process finished successfully.");

          // Selesaikan Promise dengan hasil (JSON yang sudah diparse atau string mentah)
          resolve(result);
        } catch (e) {
          // Menangani kegagalan jika output Python bukan format JSON yang valid
          reject(
            new Error({
              status: 404,
              message: "Process faild",
            })
          );
        }
      });
    } catch (err) {
      // Menangani error fatal saat mencoba menjalankan (spawn) proses
      console.log(err);
      reject(err);
    }
  });
}
