import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

export const loadTemplate = (templateName, replacements) => {
  const templatePath = path.join(
    __dirname,
    "emailTemplates",
    `${templateName}.html`
  );
  let template = fs.readFileSync(templatePath, "utf8");

  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{{${key}}}`, "g");
    template = template.replace(regex, value);
  }

  return template;
};
