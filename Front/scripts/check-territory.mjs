import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import '@angular/compiler';

// Execute the actual Angular service without a browser or a test framework.
const require = createRequire(import.meta.url);
const source = readFileSync(new URL('../src/app/territory.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, experimentalDecorators: true }
}).outputText.replace(/(['"])@angular\/core\1/g, JSON.stringify(pathToFileURL(require.resolve('@angular/core')).href));
const { Territory } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
const area = new Territory();
assert.deepEqual([...area.districts].sort(), ['Ambatofinandrahana', 'Ambositra', 'Fandriana', 'Manandriana']);
assert.equal(new Set(area.reports().map(r => r.id)).size, area.reports().length);
assert.equal(area.visiblePlots().length, 4);
assert.equal(area.visibleReports().length, 4);
for (const district of area.districts) {
  area.select(district);
  assert.equal(area.visiblePlots().length, 1);
  assert.equal(area.visibleReports().length, 1);
  const report = area.visibleReports()[0];
  assert.equal(report.plot, area.visiblePlots()[0].name);
  assert.equal(report.district, district);
  assert.equal(report.crop, area.visiblePlots()[0].crop);
  assert.equal(report.commune, area.visiblePlots()[0].commune);
  assert.ok(area.profiles.find(p=>p.district===district).crops.includes(report.crop));
}
area.select('');
assert.equal(area.visibleReports().filter(r => r.status === 'En attente').length, 2);
assert.equal(area.visibleReports().filter(r => r.status === 'Résolu').length, 1);
assert.equal(area.visiblePlots().filter(p => p.health === 'À surveiller').length, 2);
area.select('district invalide');
assert.equal(area.district(), '');
area.reports.update(items => [{ ...items[0], id: 'DEMO-005' }, ...items]);
assert.equal(area.count('Ambositra'), 2);
area.select('Fandriana');
assert.equal(area.visibleReports().length, 1);
area.select('Ambositra');
assert.equal(area.visibleReports().length, 2);
console.log('OK : quatre districts, liens parcelles/dossiers, compteurs et filtres cohérents.');
assert.equal(area.plots.find(p=>p.crop==='Tomate').commune,'Andina');
assert.deepEqual(area.profiles.find(p=>p.district==='Ambositra').crops,['Riz','Haricot','Orange','Tomate']);
assert.deepEqual(area.profiles.find(p=>p.district==='Manandriana').crops,['Orge','Maïs','Arachide','Riz']);
assert.deepEqual(area.profiles.find(p=>p.district==='Fandriana').crops,['Riz','Fruits variés']);
console.log('OK : cultures par district et tomate d’Andina liées aux parcelles et aux dossiers.');
