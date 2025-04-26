import * as fs from "fs";
import * as path from "path";

export async function init(options: { output: string }) {
  try {
    // Path to the template config.yaml
    const templatePath = path.join(__dirname, "../templates/config.yaml");
    console.log(`This is template path: ${templatePath}`);
    const outputPath = path.resolve(options.output);

    // Check if output file already exists
    if (fs.existsSync(outputPath)) {
      console.error(
        `Error: File already exists at ${outputPath}. Use a different path or remove the existing file.`
      );
      process.exit(1);
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    fs.mkdirSync(outputDir, { recursive: true });

    // Copy template to output path
    fs.copyFileSync(templatePath, outputPath);

    console.log(`Successfully generated config.yaml at ${outputPath}`);
    console.log(`Edit ${outputPath} with your credentials and configuration.`);
  } catch (error) {
    console.error(`Error generating config.yaml: ${(error as Error).message}`);
    process.exit(1);
  }
}
