const { execFile } = require("child_process");
const path = require("path");

exports.runAnalytics = (filePath) => {
  return new Promise((resolve, reject) => {
    const pythonExecutable =
      "C:\\Users\\Admin\\AppData\\Local\\Programs\\Python\\Python311\\python.exe";
    const pythonScriptPath = path.join(
      __dirname,
      "../../analysis/analyze.py"
    );
    execFile(
      pythonExecutable,
      [pythonScriptPath, filePath],
      (error, stdout, stderr) => {
        if (error) {
          let errorMessage = "Analytics execution failed";

          if (stderr && stderr.includes("ValueError")) {
            const parts = stderr.split("ValueError:");
            errorMessage = parts[parts.length - 1].trim();
          }
          return reject(new Error(errorMessage));
        }
        try {
          const parsedResult = JSON.parse(stdout);
          return resolve(parsedResult);
        } catch (parseError) {
          return reject(
            new Error("Invalid JSON received from analytics script")
          );
        }
      }
    );
  });
};


