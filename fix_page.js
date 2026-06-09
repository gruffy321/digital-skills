const fs = require('fs');

const newModuleConfig = `const moduleConfig: Record<string, { title: string, tasks: Task[], component: React.ReactNode }> = {
  "1": {
    title: "Introduction to Digital Skills",
    tasks: [
      { title: "Task 1: Login to Workspace", instruction: "Type 'password123' to unlock your workspace.", content: <><p>Welcome to your digital workspace! Let's start by logging in securely.</p></> },
      { title: "Task 2: Open the Settings App", instruction: "Double click the settings icon on the desktop to open it.", content: <><p>Settings help you configure your device.</p></> },
      { title: "Task 3: Minimize the Window", instruction: "Click the minimize button (the dash) on the settings window.", content: <><p>Minimizing hides the window without closing it.</p></> },
      { title: "Task 4: Change Desktop Background", instruction: "Right-click the desktop and select 'Change Background'.", content: <><p>Personalize your workspace.</p></> },
      { title: "Task 5: Keyboard Shortcuts", instruction: "Highlight the code SECRET-CODE-99, copy it (Ctrl+C), and paste it (Ctrl+V) into the box.", content: <><p>Keyboard shortcuts save time!</p></> },
      { title: "Task 6: Module 1 Quiz", instruction: "Complete the knowledge check.", content: <><p>Let's test what you've learned.</p></> },
    ],
    component: <Module1 />
  },
  "2": {
    title: "File Management Essentials",
    tasks: [
      { title: "Task 1: Open File Explorer", instruction: "Double click the folder icon to open the File Explorer.", content: <><p>File Explorer is where your files live.</p></> },
      { title: "Task 2: Create a New Folder", instruction: "Click 'New Folder' and name it 'Science Work'.", content: <><p>Folders help keep you organized.</p></> },
      { title: "Task 3: Rename a File", instruction: "Right-click 'untitled_doc_1.docx', select 'Rename', and rename it to 'Science_Lab_Report.docx'.", content: <><p>Give files descriptive names.</p></> },
      { title: "Task 4: Move a File", instruction: "Click 'Move To' and select the 'Science Work' folder.", content: <><p>Keep related files together.</p></> },
      { title: "Task 5: Delete a File", instruction: "Right-click 'funny_cat_meme.jpg' and select 'Delete'.", content: <><p>Clean up unwanted files.</p></> },
      { title: "Task 6: Module 2 Quiz", instruction: "Answer the quiz question.", content: <><p>Let's test what you've learned.</p></> },
    ],
    component: <Module2 />
  },
  "3": {
    title: "Internet & Online Research",
    tasks: [
      { title: "Task 1: Open the Web Browser", instruction: "Double click the 'Web Browser' icon.", content: <><p>The browser is your gateway to the internet.</p></> },
      { title: "Task 2: Type URL", instruction: "Type exactly 'www.science-facts.edu' into the address bar and press Enter.", content: <><p>URLs are exact addresses.</p></> },
      { title: "Task 3: Perform a Web Search", instruction: "Type exactly 'Climate Change Facts' into the address bar and press Enter.", content: <><p>Search engines help you find information.</p></> },
      { title: "Task 4: Identify Safe Link", instruction: "Click the safe, legitimate .edu link.", content: <><p>Always verify links before clicking.</p></> },
      { title: "Task 5: Bookmark Page", instruction: "Click the Star icon to bookmark the page.", content: <><p>Save pages for later.</p></> },
      { title: "Task 6: Module 3 Quiz", instruction: "Complete the knowledge check.", content: <><p>Let's review your research skills.</p></> },
    ],
    component: <Module3 />
  },
  "4": {
    title: "Digital Citizenship & Social Media",
    tasks: [
      { title: "Task 1: Choose a Strong Password", instruction: "Select the most secure password option.", content: <><p>Strong passwords are your first line of defense.</p></> },
      { title: "Task 2: Privacy Settings", instruction: "Toggle your account to Private.", content: <><p>Protect your personal information.</p></> },
      { title: "Task 3: Unknown Messages", instruction: "Ignore the message from the unknown sender.", content: <><p>Don't engage with strangers online.</p></> },
      { title: "Task 4: Scam Links", instruction: "Report the suspicious 'Free V-Bucks' link.", content: <><p>If it's too good to be true, it probably is.</p></> },
      { title: "Task 5: Cyberbullying", instruction: "Block the user posting mean comments.", content: <><p>Stand up against cyberbullying.</p></> },
      { title: "Task 6: Module 4 Quiz", instruction: "Complete the quiz.", content: <><p>Let's test your digital citizenship.</p></> },
    ],
    component: <Module4 />
  },
  "5": {
    title: "Professional Email & Communication",
    tasks: [
      { title: "Task 1: Write a Subject Line", instruction: "Type a clear, concise subject line.", content: <><p>Subject lines summarize the email.</p></> },
      { title: "Task 2: Professional Greeting", instruction: "Choose the appropriate professional greeting.", content: <><p>Start on the right foot.</p></> },
      { title: "Task 3: Email Body", instruction: "Draft your email message professionally.", content: <><p>Keep it clear and polite.</p></> },
      { title: "Task 4: Module 5 Quiz", instruction: "Complete the quiz.", content: <><p>Test your email etiquette.</p></> },
    ],
    component: <Module5 />
  },
  "6": {
    title: "Basic Word Processing",
    tasks: [
      { title: "Task 1: Type a Sentence", instruction: "Type 'School Sports Day' in the document.", content: <><p>Start drafting your document.</p></> },
      { title: "Task 2: Formatting", instruction: "Highlight the text, then click Bold and Center.", content: <><p>Make your text stand out.</p></> },
      { title: "Task 3: Save File", instruction: "Click File > Save.", content: <><p>Always save your progress.</p></> },
      { title: "Task 4: Print Document", instruction: "Click File > Print.", content: <><p>Get a physical copy.</p></> },
      { title: "Task 5: Module 6 Quiz", instruction: "Complete the quiz.", content: <><p>Test your knowledge.</p></> },
    ],
    component: <Module6 />
  },
  "7": {
    title: "Advanced Word Processing",
    tasks: [
      { title: "Task 1: Open Word Processor", instruction: "Double click the icon.", content: <><p>Let's dive deeper.</p></> },
      { title: "Task 2: Insert Table", instruction: "Click Insert > Table.", content: <><p>Organize data neatly.</p></> },
      { title: "Task 3: Add Header", instruction: "Click Insert > Header.", content: <><p>Add consistent titles.</p></> },
      { title: "Task 4: Page Layout", instruction: "Change orientation to Landscape.", content: <><p>Adjust the page format.</p></> },
      { title: "Task 5: Module 7 Quiz", instruction: "Complete the quiz.", content: <><p>Test your skills.</p></> },
    ],
    component: <Module7 />
  },
  "8": {
    title: "Presentation Skills",
    tasks: [
      { title: "Task 1: Layout Selection", instruction: "Select the 'Title & Content' layout.", content: <><p>Start your presentation.</p></> },
      { title: "Task 2: Add Content", instruction: "Add text to your slide.", content: <><p>Keep it brief.</p></> },
      { title: "Task 3: Slide Transitions", instruction: "Add a 'Fade' transition.", content: <><p>Make it dynamic.</p></> },
      { title: "Task 4: Present Mode", instruction: "Click 'Start Presentation'.", content: <><p>Show your work.</p></> },
      { title: "Task 5: Module 8 Quiz", instruction: "Complete the quiz.", content: <><p>Test your presentation skills.</p></> },
    ],
    component: <Module8 />
  },
  "9": {
    title: "Spreadsheet Basics",
    tasks: [
      { title: "Task 1: Enter Data", instruction: "Type data into the cell.", content: <><p>Spreadsheets organize data.</p></> },
      { title: "Task 2: Basic Formula", instruction: "Use the SUM function.", content: <><p>Automate your math.</p></> },
      { title: "Task 3: Formatting Cells", instruction: "Format the cell as Currency.", content: <><p>Make data readable.</p></> },
      { title: "Task 4: Highlight Data", instruction: "Highlight the important cell.", content: <><p>Draw attention.</p></> },
      { title: "Task 5: Create a Chart", instruction: "Insert a Bar Chart.", content: <><p>Visualize your data.</p></> },
      { title: "Task 6: Sort Data", instruction: "Sort the data alphabetically.", content: <><p>Organize it quickly.</p></> },
      { title: "Task 7: Module 9 Quiz", instruction: "Complete the quiz.", content: <><p>Test your spreadsheet skills.</p></> },
    ],
    component: <Module9 />
  },
  "10": {
    title: "Network & Troubleshooting",
    tasks: [
      { title: "Task 1: Access Local Network", instruction: "Connect to the local network.", content: <><p>Networks connect devices.</p></> },
      { title: "Task 2: Shared Drive", instruction: "Access the shared network drive.", content: <><p>Collaborate efficiently.</p></> },
      { title: "Task 3: Backup File", instruction: "Backup your document.", content: <><p>Never lose your work.</p></> },
      { title: "Task 4: Network Troubleshooting", instruction: "Run the troubleshooter.", content: <><p>Fix connection issues.</p></> },
      { title: "Task 5: Module 10 Quiz", instruction: "Complete the quiz.", content: <><p>Test your IT skills.</p></> },
    ],
    component: <Module10 />
  },
  "11": {
    title: "Video Conferencing & Peripherals",
    tasks: [
      { title: "Task 1: Join Call", instruction: "Click 'Join Meeting'.", content: <><p>Connect virtually.</p></> },
      { title: "Task 2: System Unfreeze", instruction: "Wait for the system to recover.", content: <><p>Handling technical glitches.</p></> },
      { title: "Task 3: Microphone Check", instruction: "Unmute your microphone.", content: <><p>Let them hear you.</p></> },
      { title: "Task 4: Share Screen", instruction: "Click 'Share Screen'.", content: <><p>Present your work.</p></> },
      { title: "Task 5: Print to Network", instruction: "Select the 'FOLLOW_ME' printer.", content: <><p>Print securely.</p></> },
      { title: "Task 6: Module 11 Quiz", instruction: "Complete the quiz.", content: <><p>Test your skills.</p></> },
    ],
    component: <Module11 />
  },
  "12": {
    title: "Advanced Security & IT Policies",
    tasks: [
      { title: "Task 1: Enable MFA", instruction: "Set up Multi-Factor Authentication.", content: <><p>Add a layer of security.</p></> },
      { title: "Task 2: Device Verification", instruction: "Approve the login request.", content: <><p>Verify your identity.</p></> },
      { title: "Task 3: VPN Connection", instruction: "Connect to the VPN.", content: <><p>Secure your connection.</p></> },
      { title: "Task 4: Drive Encryption", instruction: "Encrypt your hard drive.", content: <><p>Protect data at rest.</p></> },
      { title: "Task 5: OS Update", instruction: "Install the latest security patches.", content: <><p>Stay up to date.</p></> },
      { title: "Task 6: Firewall Check", instruction: "Ensure the firewall is active.", content: <><p>Block unauthorized access.</p></> },
      { title: "Task 7: Module 12 Quiz", instruction: "Complete the final quiz.", content: <><p>Test your advanced security knowledge.</p></> },
    ],
    component: <Module12 />
  }
};`;

const content = fs.readFileSync('src/app/dashboard/module/[id]/page.tsx', 'utf8');

// The original moduleConfig spans from `const moduleConfig: Record... = {` down to `};` right before `export default function ModulePage...`
// I will just use regex to replace it.
const regex = /const moduleConfig: Record<string, \{ title: string, tasks: Task\[\], component: React\.ReactNode \}> = \{[\s\S]*?\n};\n\nexport default function ModulePage/m;

const newContent = content.replace(regex, newModuleConfig + '\n\nexport default function ModulePage');
fs.writeFileSync('src/app/dashboard/module/[id]/page.tsx', newContent, 'utf8');
console.log('Successfully updated page.tsx');
