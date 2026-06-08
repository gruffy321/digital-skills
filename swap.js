const fs = require('fs');

// 1. Swap the physical files and their internal component names
function swapFiles(fileA, fileB, compA, compB) {
    const aContent = fs.readFileSync(fileA, 'utf8');
    const bContent = fs.readFileSync(fileB, 'utf8');
    
    // Replace component exports
    const newA = bContent.replace(new RegExp(compB, 'g'), compA);
    const newB = aContent.replace(new RegExp(compA, 'g'), compB);
    
    fs.writeFileSync(fileA, newA, 'utf8');
    fs.writeFileSync(fileB, newB, 'utf8');
}

// Swap Module4 (WP) <-> Module6 (DC)
swapFiles('src/modules/Module4.tsx', 'src/modules/Module6.tsx', 'Module4', 'Module6');
swapFiles('src/modules/Module4.module.css', 'src/modules/Module6.module.css', 'Module4', 'Module6');

// Swap Module5 (IWP) <-> Module7 (Email)
swapFiles('src/modules/Module5.tsx', 'src/modules/Module7.tsx', 'Module5', 'Module7');
swapFiles('src/modules/Module5.module.css', 'src/modules/Module7.module.css', 'Module5', 'Module7');

// 2. Restore dashboard/page.tsx to HEAD
const { execSync } = require('child_process');
execSync('git checkout HEAD -- src/app/dashboard/page.tsx');

// 3. We also need to fix module/[id]/page.tsx
// Currently, "4" is my new WP, "6" is DC.
// Let's just grab the current module/[id]/page.tsx, and swap the object keys!
let pageContent = fs.readFileSync('src/app/dashboard/module/[id]/page.tsx', 'utf8');

// The easiest way is to rename the keys:
pageContent = pageContent.replace(/  "4": \{/g, '  "TEMP_4": {');
pageContent = pageContent.replace(/  "6": \{/g, '  "TEMP_6": {');
pageContent = pageContent.replace(/  "TEMP_4": \{/g, '  "6": {');
pageContent = pageContent.replace(/  "TEMP_6": \{/g, '  "4": {');

// And swap components for them since we swapped the keys but the component pointers need to match the new file locations.
// Actually, if we swapped the physical files, Module4 is now DC, Module6 is WP.
// In the current pageContent, "6" (which was WP) currently points to <Module4 />!
// Let's just do a clean replace of the component tags inside the whole file to make sure they point to the right place.
// Wait, before the swap:
// "4" (WP) pointed to <Module4 />.
// "6" (DC) pointed to <Module6 />.
// If we just swap keys, "6" (WP) points to <Module4 />. 
// But we physically moved WP to Module6! So it should point to <Module6 />.
// Let's just restore module/[id]/page.tsx to HEAD, and then inject the NEW WP tasks into "6" and "7".
execSync('git checkout HEAD -- src/app/dashboard/module/[id]/page.tsx');
let originalPage = fs.readFileSync('src/app/dashboard/module/[id]/page.tsx', 'utf8');

// Extract the NEW WP tasks from the CURRENT pageContent before we overwrite it.
// Wait, I already have the new WP tasks in pageContent under "4" and "5"!
const newWP4Match = pageContent.match(/  "4": \{\r?\n    title: "Word Processing Basics",[\s\S]*?component: <Module4 \/>\r?\n  \},/);
const newWP5Match = pageContent.match(/  "5": \{\r?\n    title: "Intermediate Word Processing",[\s\S]*?component: <Module5 \/>\r?\n  \},/);

const newWP6Block = newWP4Match[0].replace(/"4":/, '"6":').replace(/<Module4 \/>/, '<Module6 />');
const newWP7Block = newWP5Match[0].replace(/"5":/, '"7":').replace(/<Module5 \/>/, '<Module7 />');

// Now in originalPage, replace the old "6" and "7" blocks.
const old6Match = originalPage.match(/  "6": \{\r?\n    title: "Word Processing Basics",[\s\S]*?component: <Module6 \/>\r?\n  \},/);
const old7Match = originalPage.match(/  "7": \{\r?\n    title: "Intermediate Word Processing",[\s\S]*?component: <Module7 \/>\r?\n  \},/);

originalPage = originalPage.replace(old6Match[0], newWP6Block);
originalPage = originalPage.replace(old7Match[0], newWP7Block);

fs.writeFileSync('src/app/dashboard/module/[id]/page.tsx', originalPage, 'utf8');

console.log("Success");
