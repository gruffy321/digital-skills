const { execSync } = require('child_process');
const fs = require('fs');

execSync('git checkout HEAD -- "src/app/dashboard/module/[id]/page.tsx"');

let content = fs.readFileSync('src/app/dashboard/module/[id]/page.tsx', 'utf8');

const new6 = `  "6": {
    title: "Word Processing Basics",
    tasks: [
      {
        title: "Task 1: Creating a Document",
        instruction: "Open the Word Processor from the desktop and type 'School Sports Day' as your flyer title.",
        content: (
          <>
            <p><strong>Creating Documents</strong></p>
            <p>A word processor is an application used to create, edit, and print documents. Examples include Microsoft Word and Google Docs.</p>
            <p>To start, you just need to open the application and begin typing on the blank page!</p>
          </>
        )
      },
      {
        title: "Task 2: Text Formatting",
        instruction: "Highlight the title 'School Sports Day'. Click the 'B' (Bold) button and the 'Align Center' button to make it stand out.",
        content: (
          <>
            <p><strong>Selecting and Formatting Text</strong></p>
            <p>To change how text looks, you must first <strong>Highlight (Select)</strong> it:</p>
            <ol>
              <li>Click and hold the left mouse button at the beginning of the word.</li>
              <li>Drag the cursor to the end of the word and let go.</li>
              <li>Now you can click buttons on the Toolbar (like <strong>B</strong> for Bold or <strong>Align Center</strong>) to change only the highlighted text!</li>
            </ol>
          </>
        )
      },
      {
        title: "Task 3: Saving the Document",
        instruction: "Click 'File' -> 'Save As...'. Name your file 'Sports_Flyer' and click Save. Make sure you don't use any special characters like / or *.",
        content: (
          <>
            <p><strong>Saving Your Work</strong></p>
            <p>If you turn off your computer without saving, everything you typed will be lost forever!</p>
            <ul>
              <li><strong>Save As:</strong> Creates a brand new file, allows you to choose what folder to put it in, and lets you give it a specific name.</li>
            </ul>
            <p><strong>File Naming Rules:</strong></p>
            <ul>
              <li>Be Descriptive (e.g., "Science_Lab_Report_May25").</li>
              <li>Never use symbols like \`\\ / : * ? " &lt; &gt; |\` in a filename.</li>
            </ul>
          </>
        )
      },
      {
        title: "Task 4: Module 6 Quiz",
        instruction: "Complete the knowledge check quiz to finish this module.",
        content: (
          <>
            <p><strong>Knowledge Check</strong></p>
            <p>Let's review what you've learned about basic word processing and formatting.</p>
          </>
        )
      }
    ],
    component: <Module6 />
  },`;

const new7 = `  "7": {
    title: "Intermediate Word Processing",
    tasks: [
      {
        title: "Task 1: Inserting Tables",
        instruction: "Open the Word Processor. Click 'Insert' -> 'Table' and insert a 2x2 table for your revision guide.",
        content: (
          <>
            <p><strong>Organizing with Tables</strong></p>
            <p>Tables are an excellent way to organize information into rows and columns. They are especially useful for revision guides, comparisons, or schedules.</p>
          </>
        )
      },
      {
        title: "Task 2: Inserting Images",
        instruction: "Click 'Insert' -> 'Image' and select the 'School Logo' to add it to your document.",
        content: (
          <>
            <p><strong>Adding Visuals</strong></p>
            <p>Documents don't have to be just text! You can insert images, shapes, and charts to make your work more engaging and professional.</p>
          </>
        )
      },
      {
        title: "Task 3: Spellcheck",
        instruction: "Type the misspelled word 'definately'. Then, right-click the red squiggly line and select the correct spelling 'definitely'.",
        content: (
          <>
            <p><strong>Spellcheck and Grammar Tools</strong></p>
            <p>Word processors have built-in tools to help you avoid embarrassing typos.</p>
            <ul>
              <li><strong>Red squiggly line:</strong> Usually means a spelling error.</li>
              <li><strong>Blue or Green squiggly line:</strong> Usually means a grammar error.</li>
            </ul>
            <p>You can right-click the underlined word to see suggestions!</p>
          </>
        )
      },
      {
        title: "Task 4: Module 7 Quiz",
        instruction: "Complete the knowledge check quiz to finish this module.",
        content: (
          <>
            <p><strong>Knowledge Check</strong></p>
            <p>Let's review what you've learned about intermediate word processing tools.</p>
          </>
        )
      }
    ],
    component: <Module7 />
  },`;

const old6Match = content.match(/  "6": \{\r?\n    title: "Word Processing Basics",[\s\S]*?component: <Module6 \/>\r?\n  \},/);
const old7Match = content.match(/  "7": \{\r?\n    title: "Intermediate Word Processing",[\s\S]*?component: <Module7 \/>\r?\n  \},/);

content = content.replace(old6Match[0], new6);
content = content.replace(old7Match[0], new7);

fs.writeFileSync('src/app/dashboard/module/[id]/page.tsx', content, 'utf8');
console.log("Success");
