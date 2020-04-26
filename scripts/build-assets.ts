import glob from 'glob';
import { basename, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const base = '../src/assets';
const folder = join(base, 'cards');

generateIndex();
buildSvgFiles();

async function buildSvgFiles() {
   join(base);

   await exportSvgToTs(folder);
}

async function exportSvgToTs(baseFolder: string) {
   const matches = await asyncGlob(`${baseFolder}/*.svg`);
   matches.forEach(match => {
      const svgContent = readFileSync(match);
      const fileName = basename(match, '.svg');
      const name = toCamelCase(fileName);
      writeFileSync(
         join(baseFolder, fileName + '-svg.ts'),
         `export const card${name} = \`\n${svgContent}\n\`;`
      );
   });
}

function generateIndex() {
   const path = `${folder}/*.svg`;

   const cards = writeIndexStr(path);

   Promise.all([cards]).then(([icon]) => {
      const exportStr = icon.export;
      writeFileSync(`${base}/index.ts`, exportStr.trim() + '\n');
   });
}

async function writeIndexStr(path: string): Promise<ScriptingModel> {
   let exportStr = '';
   const subfolder = 'cards';

   const matches = await asyncGlob(path);
   exportStr = matches
      .map(file => {
         const fileName = basename(file, '.svg');
         const name = fileName
            .split(/[-_\s]/g)
            .map((x, i) => (i <= 0 ? x : capitalizeFirstLetter(x)))
            .join('');

         const itemExportStr = `export { card${name} } from './${subfolder}/${fileName}-svg';`;

         return itemExportStr;
      })
      .join('\n');

   return {
      import: '',
      export: exportStr
   } as ScriptingModel;
}

function capitalizeFirstLetter(term: string) {
   return term.charAt(0).toUpperCase() + term.slice(1);
}

function toCamelCase(name: string) {
   return name
      .split(/[-_\s]/)
      .map((x, i) => (i <= 0 ? x : capitalizeFirstLetter(x)))
      .join('');
}

function asyncGlob(path: string) {
   return new Promise<string[]>((res, rej) => {
      glob(path, (err, matches) => {
         if (err) {
            rej(err);
            return;
         }
         res(matches);
      });
   });
}

export interface ScriptingModel {
   import: string;
   export: string;
}
