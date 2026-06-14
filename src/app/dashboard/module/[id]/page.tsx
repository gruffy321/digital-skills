"use client";

import { use } from "react";
import ModuleWrapper, { Task } from "@/components/ModuleWrapper";
import Module1 from "@/modules/Module1";
import Module2 from "@/modules/Module2";
import Module3 from "@/modules/Module3";
import Module4 from "@/modules/Module4";
import Module5 from "@/modules/Module5";
import Module6 from "@/modules/Module6";
import Module7 from "@/modules/Module7";
import Module8 from "@/modules/Module8";
import Module9 from "@/modules/Module9";
import Module10 from "@/modules/Module10";
import Module11 from "@/modules/Module11";
import Module12 from "@/modules/Module12";

const moduleConfig: Record<string, { title: string, tasks: Task[], component: React.ReactNode }> = {
  "1": {
    title: "Introduction to Digital Skills",
    tasks: [
      { 
        title: "Task 1: Log In Securely", 
        instruction: "Click anywhere on the lock screen, then type 'password123' and click the arrow to log into your Windows Workspace.",
        content: (
          <>
            <p>Welcome to your new digital workspace! Before you can access a computer, you must prove you are the authorized user.</p>
            <p>In school and in the workplace, you will always be required to log in securely. The lock screen protects your files and privacy from unauthorized access.</p>
          </>
        )
      },
      { 
        title: "Task 2: Desktop Scavenger Hunt", 
        instruction: "Double-click the 'Web Browser' icon and the 'Word Processor' icon to open both applications.",
        content: (
          <>
            <p>This main screen is called the <strong>Desktop</strong>. It is your home base.</p>
            <p>Icons on the desktop represent <strong>Applications</strong> (programs that do things) or <strong>Folders</strong> (places to store things).</p>
            <p>To open an application, use your mouse to move the cursor over the icon, and quickly click the left mouse button twice. This is called a <strong>Double Click</strong>.</p>
          </>
        )
      },
      { 
        title: "Task 3: System Settings & Volume", 
        instruction: "Open the 'Settings' app. On the Sound page, click and drag the Volume slider to change the audio level.",
        content: (
          <>
            <p>Your computer allows you to customize how it works. You can change everything from the background picture to how loud the speakers are.</p>
            <p>These options are found in the <strong>Settings</strong> app. If your sound isn't working, or your screen is too bright, Settings is the first place you should look!</p>
          </>
        )
      },
      { 
        title: "Task 4: Create a Shortcut", 
        instruction: "Right-click anywhere on the empty desktop background, and click 'New Shortcut' from the context menu.",
        content: (
          <>
            <p><strong>The Context Menu:</strong> Clicking the right mouse button (Right-Click) on any item will open a secret menu of options specific to that item.</p>
            <p>If you have a folder or application buried deep in your files, you can create a <strong>Shortcut</strong> on your desktop. A shortcut is just a quick link to the real file, saving you time!</p>
          </>
        )
      },
      { 
        title: "Task 5: Screenshots & Keyboard Shortcuts", 
        instruction: "Open the Snipping Tool. Click 'PrtScn'. Then, highlight 'SECRET-CODE-99', press Ctrl+C to copy, and paste it below using Ctrl+V.",
        content: (
          <>
            <p>While the mouse is great, using your keyboard can be much faster! <strong>Keyboard Shortcuts</strong> are combinations of keys that perform specific commands.</p>
            <p>The most common shortcut in the world is <strong>Copy and Paste</strong> (Ctrl+C and Ctrl+V).</p>
            <p>Another powerful tool is the <strong>Print Screen</strong> button (PrtScn). It takes a digital photograph of whatever is currently on your monitor, which is incredibly useful for capturing error messages to show IT support.</p>
          </>
        )
      },
      { 
        title: "Task 6: Module 1 Knowledge Check", 
        instruction: "Answer the 4 quiz questions correctly to complete this module.",
        content: (
          <>
            <p>Let's review what we've learned about the Desktop, Hardware, Software, and basic navigation.</p>
          </>
        )
      },
    ],
    component: <Module1 />
  },
  "2": {
    title: "File Management Essentials",
    tasks: [
      { 
        title: "Task 1: Open File Explorer", 
        instruction: "Double click the folder icon on the desktop (or click it on the taskbar) to open the File Explorer.",
        content: (
          <>
            <p>Your computer stores millions of files, from documents to family photos. To find them, we use a tool called the <strong>File Explorer</strong>.</p>
            <p>The File Explorer organizes everything into a hierarchy of folders, much like a real filing cabinet. On the left side (the sidebar), you'll see major categories like Documents, Downloads, and your connected USB Drives.</p>
          </>
        )
      },
      { 
        title: "Task 2: Create a Folder Structure", 
        instruction: "Click 'New Folder' in the top menu to create a folder. Name it exactly 'Science Work' and press Enter.",
        content: (
          <>
            <p>Keeping your files organized is crucial. If you save everything to your 'Downloads' folder, it will quickly become a messy, unsearchable pile.</p>
            <p>You can create <strong>Folders</strong> to group related files together. For example, you should create separate folders for different school subjects to keep your coursework organized.</p>
            <p><em>Tip:</em> Give your folders clear, descriptive names so you always know what's inside them.</p>
          </>
        )
      },
      { 
        title: "Task 3: Rename Files Correctly", 
        instruction: "Right-click 'untitled_doc_1.docx', select 'Rename', and change it to exactly 'Science_Lab_Report.docx'.",
        content: (
          <>
            <p><strong>File Naming Conventions</strong></p>
            <p>A file named "untitled" is useless. You must always rename files so you know what they contain without having to open them!</p>
            <p><strong>Rules for naming files:</strong></p>
            <ul>
              <li><strong>Be Descriptive:</strong> Use subjects and dates.</li>
              <li><strong>No Special Symbols:</strong> Never use `\ / : * ? " &lt; &gt; |` in a filename.</li>
            </ul>
            <p><em>Note:</em> The `.docx` at the end is a <strong>File Extension</strong>. It tells the computer this is a Word Document. Never delete the extension when renaming!</p>
          </>
        )
      },
      { 
        title: "Task 4: Organise the Chaos", 
        instruction: "Drag and drop the 'Science_Lab_Report.docx' into your new 'Science Work' folder. Then, right-click the funny cat meme and select 'Delete'.",
        content: (
          <>
            <p>Now that your folder is created and your file is properly named, it's time to organize the chaos!</p>
            <p>You can move files by clicking and holding the left mouse button, dragging the file over a folder, and letting go. This is called <strong>Drag and Drop</strong>.</p>
            <p>If you find files that don't belong in your school workspace (like a funny cat meme), you should <strong>Delete</strong> them to free up storage space. Deleted files go to the Recycle Bin.</p>
          </>
        )
      },
      { 
        title: "Task 5: USB Drives", 
        instruction: "Click on the 'Science Work' folder to open it. Right-click the Lab Report, select 'Copy to USB', and safely back it up.",
        content: (
          <>
            <p><strong>Removable Storage</strong></p>
            <p>A USB Drive (sometimes called a thumb drive or flash drive) is a portable storage device you plug into your computer.</p>
            <p>It's always a good idea to back up important coursework to a USB drive or Cloud Storage so you don't lose it if your computer breaks.</p>
          </>
        )
      },
      { 
        title: "Task 6: Knowledge Check", 
        instruction: "Answer the quiz question correctly to complete this module.",
        content: (
          <>
            <p>Let's review what we've learned about folders, file extensions, and organization.</p>
          </>
        )
      }
    ],
    component: <Module2 />
  },
  "3": {
    title: "Internet & Online Research",
    tasks: [
      { 
        title: "Task 1: Open the Web Browser", 
        instruction: "Double click the 'Microsoft Edge' icon on the desktop or taskbar to open the browser.",
        content: (
          <>
            <p>A <strong>Web Browser</strong> (like Microsoft Edge, Google Chrome, or Safari) is your vehicle for traveling the Internet. Without it, you can't view websites!</p>
          </>
        )
      },
      { 
        title: "Task 2: Use the Address Bar", 
        instruction: "Type EXACTLY 'www.science-facts.edu' into the address bar at the top and press Enter.",
        content: (
          <>
            <p>Every website has a unique address, called a <strong>URL</strong> (e.g., www.google.com). Just like a house address, if you know the exact URL, you can type it directly into the <strong>Address Bar</strong> at the top of the browser to go straight there.</p>
            <p><em>Tip:</em> Modern browsers combine the Address Bar and the Search Box into one thing called an "Omnibox". If you type something with dots in it (like a .com or .org), it assumes you are typing a URL.</p>
          </>
        )
      },
      { 
        title: "Task 3: Perform a Web Search", 
        instruction: "Now let's do a search! Type exactly 'climate change facts' into the address bar and press Enter.",
        content: (
          <>
            <p>What if you don't know the exact URL of the website you want? That is what <strong>Search Engines</strong> are for!</p>
            <p>If you type a phrase without dots (like "best pizza near me") into the same Address Bar, the browser assumes it is a <strong>Search Term</strong>. It will ask a Search Engine (like Google or Bing) to find websites related to that term.</p>
          </>
        )
      },
      { 
        title: "Task 4: Identify a Safe Link", 
        instruction: "Look closely at the search results. Click on the safe, legitimate educational link, avoiding the sponsored scam.",
        content: (
          <>
            <p><strong>Phishing & Malicious Links</strong></p>
            <p>Search engines aren't perfect. Sometimes scammers pay money to have their fake, dangerous websites show up at the very top of your search results as "Sponsored" links.</p>
            <p>Before you click a link, always read the small green or black text underneath the blue title. This shows you the actual URL you are about to visit. If the URL looks strange, suspicious, or has weird spelling, <strong>DO NOT CLICK IT</strong>.</p>
          </>
        )
      },
      { 
        title: "Task 5: Bookmarking", 
        instruction: "Click the Star icon (☆) next to the address bar to bookmark this page for later.",
        content: (
          <>
            <p><strong>Saving Your Research</strong></p>
            <p>If you find a great website and want to use it for an essay later, you should <strong>Bookmark</strong> it. This saves the URL to a special list in your browser so you never lose it!</p>
          </>
        )
      },
      { 
        title: "Task 6: Fact or Fake Quiz", 
        instruction: "Answer the quiz question correctly to complete the module.",
        content: (
          <>
            <p>When researching online, it's critical to evaluate your sources.</p>
          </>
        )
      }
    ],
    component: <Module3 />
  },
  "4": {
    title: "Digital Citizenship & Social Media",
    tasks: [
      {
        title: "Task 1: Secure Login",
        instruction: "Double click SocialNet to open it. Create a strong password (at least 8 characters, 1 number, 1 symbol) and login.",
        content: (
          <>
            <p><strong>Password Security</strong></p>
            <p>Your password is the only thing protecting your personal information from hackers. Always use a strong, unique password for every account.</p>
          </>
        )
      },
      {
        title: "Task 2: Stranger Danger",
        instruction: "Find the Friend Request from 'JohnDoe45' and click Deny.",
        content: (
          <>
            <p><strong>Social Media Safety</strong></p>
            <p>Social media allows you to connect with friends, but it also allows strangers to try and connect with you. People online are not always who their profile pictures say they are.</p>
            <p><strong>Online Predators</strong> often create fake profiles or use real profiles to contact school-aged students.</p>
            <p><em>The Golden Rule:</em> Never accept a friend request from an adult or someone you do not personally know in real life. If a stranger messages you, ignore them, block them, and tell a trusted adult.</p>
          </>
        )
      },
      {
        title: "Task 3: Phishing Scams",
        instruction: "Go to your Feed. Find the post offering free V-Bucks, click the three dots (...), and Report it for Phishing.",
        content: (
          <>
            <p><strong>Identifying Scams</strong></p>
            <p>Scammers often promise free gifts, game currency, or money. If you click these links, they will steal your passwords or install viruses.</p>
          </>
        )
      },
      {
        title: "Task 4: Cyberbullying",
        instruction: "Find the mean post about Mr. Johnson, click the three dots (...), and Report it for Bullying.",
        content: (
          <>
            <p><strong>Your Digital Footprint</strong></p>
            <p>Everything you post online is permanent. Even if you delete it, someone might have taken a screenshot.</p>
            <p>Posting rumors, insults, or private information about your peers or school staff is called <strong>Cyberbullying</strong>. It is illegal, causes severe emotional harm, and schools take it extremely seriously.</p>
            <p>If you see cyberbullying on your feed, do not "Like" it or comment on it. Use the platform's reporting tools to flag it.</p>
          </>
        )
      },
      {
        title: "Task 5: Privacy Settings",
        instruction: "Go to your Settings tab. Click the switch to turn on your 'Private Account'.",
        content: (
          <>
            <p><strong>Locking Down Your Information</strong></p>
            <p>When you create a new social media account, it is usually "Public" by default. This means that anyone in the entire world can see your photos, your school name, and your location.</p>
            <p>At a school age, your account should <strong>always</strong> be set to Private. A private account ensures that only people you have approved as friends can see what you post, keeping you safe from data scrapers and predators.</p>
          </>
        )
      },
      {
        title: "Task 6: Knowledge Check",
        instruction: "Complete the quiz to finish this module.",
        content: (
          <>
            <p>Let's review what you've learned about Digital Citizenship!</p>
          </>
        )
      }
    ],
    component: <Module4 />
  },
  "5": {
    title: "Professional Email & Outlook",
    tasks: [
      {
        title: "Task 1: Open Outlook",
        instruction: "Double-click the Outlook app icon on the desktop to launch your email client.",
        content: (
          <>
            <p><strong>Professional Communication</strong></p>
            <p>While you might use text messages or social media to talk to friends, schools and businesses use <strong>Email</strong> (like Microsoft Outlook or Gmail) for official communication.</p>
          </>
        )
      },
      {
        title: "Task 2: Check Your Email",
        instruction: "Find the unread email from Mr. Johnson in your Inbox and click it to read the message.",
        content: (
          <>
            <p>An email interface is divided into main parts:</p>
            <ul>
              <li><strong>Navigation (Bottom):</strong> Switch between Mail, Calendar, and Apps.</li>
              <li><strong>Message List (Middle):</strong> A list of emails you have received. Unread ones are bolded with a blue dot!</li>
              <li><strong>Reading Pane (Right):</strong> Where you can actually read the contents of the selected email.</li>
            </ul>
          </>
        )
      },
      {
        title: "Task 3: Reply & Attach",
        instruction: "Click 'Reply'. Type a professional reply to Mr. Johnson. Ensure you start with a professional greeting (e.g., 'Dear Mr. Johnson,') and end with a professional sign-off (e.g., 'Best regards,'). Then click the Paperclip to attach 'Homework.docx' from your Documents folder, and finally click Send.",
        content: (
          <>
            <p><strong>Email Etiquette & Attachments</strong></p>
            <p>When you write an email to a teacher or employer, you must use professional etiquette. Always include a proper greeting ("Dear Mr. Johnson,") and sign-off ("Best regards,").</p>
            <p>If you need to send work, you use the <strong>Attachment</strong> feature (the paperclip). Always double-check that you attached the correct file before hitting Send!</p>
          </>
        )
      },
      {
        title: "Task 4: Calendar Basics",
        instruction: "Click the 'Calendar' icon at the bottom of the screen. Find the 'Online Assembly' invitation and click RSVP to accept it.",
        content: (
          <>
            <p><strong>Managing Your Time</strong></p>
            <p>Professional email clients also include a <strong>Calendar</strong>. When someone invites you to a meeting or event, you will receive an invitation.</p>
            <p>You should always RSVP (respond) to let the organiser know if you will be attending.</p>
          </>
        )
      },
      {
        title: "Task 5: Knowledge Check",
        instruction: "Complete the quiz to finish this module.",
        content: (
          <>
            <p>Let's review what you've learned about Professional Communication!</p>
          </>
        )
      }
    ],
    component: <Module5 />
  },
  "6": {
    title: "Word Processing Basics",
    tasks: [
      {
        title: "Task 1: Open Word",
        instruction: "Double-click the 'Word' icon on your desktop to open the word processor.",
        content: (
          <>
            <p><strong>Creating Documents</strong></p>
            <p>Whether you need to write an essay, build a resume, or design a flyer, you will use a Word Processor like Microsoft Word or Google Docs.</p>
          </>
        )
      },
      {
        title: "Task 2: Format the Heading",
        instruction: "Click the 'Insert' tab and select 'Header'. Type 'School Disco' in the header area. Use the 'Home' tab toolbar to make it Bold, Center Aligned, and size 24 or larger.",
        content: (
          <>
            <p><strong>Headers and Formatting</strong></p>
            <p>A <strong>Header</strong> is a special section at the very top of the page that repeats on every page. It is perfect for titles or your name.</p>
            <p>The toolbar at the top of the screen (often called the Ribbon) contains all your formatting tools.</p>
            <ul>
              <li><strong>Alignment:</strong> You can align text to the Left, Center, or Right of the page. Titles are usually centered.</li>
              <li><strong>Emphasis:</strong> Use Bold, Italic, or Underline to make important words stand out.</li>
            </ul>
          </>
        )
      },
      {
        title: "Task 3: Add Bullet Points",
        instruction: "Click the 'Bullet Points' button (•—) on the toolbar, then type details like 'Friday 7 PM', press Enter, and type 'School Gym'.",
        content: (
          <>
            <p><strong>Organising Information</strong></p>
            <p>When creating a flyer or presenting facts, big blocks of text are hard to read. Using <strong>Bullet Points</strong> makes your information clear and easy to digest.</p>
          </>
        )
      },
      {
        title: "Task 4: Insert an Image",
        instruction: "Click the 'Insert' tab at the top. Then click 'Pictures' to add a graphic to your flyer.",
        content: (
          <>
            <p><strong>Visual Appeal</strong></p>
            <p>Documents with only text can be boring. You can use the 'Insert' menu to add images, shapes, and charts to make your work visually interesting.</p>
          </>
        )
      },
      {
        title: "Task 5: Save As",
        instruction: "Click the 'File' menu, select 'Save As', name your document 'Disco_Flyer.docx', and click Save.",
        content: (
          <>
            <p><strong>Saving Your Work</strong></p>
            <p>Always save your work early and often! If you lose power or your computer crashes, unsaved work is gone forever.</p>
          </>
        )
      },
      {
        title: "Task 6: Knowledge Check",
        instruction: "Complete the quiz to finish this module.",
        content: (
          <>
            <p>Let's review what you've learned about Word Processing!</p>
          </>
        )
      }
    ],
    component: <Module6 />
  },
  "7": {
    title: "Intermediate Word Processing",
    tasks: [
      {
        title: "Task 1: Inserting Tables",
        instruction: "Open the Word application on your desktop. Click the 'Insert' tab and click 'Table (3x3)' to add it to your document.",
        content: (
          <>
            <p><strong>Organizing Data with Tables</strong></p>
            <p>Sometimes writing paragraphs isn't the best way to show information. If you are doing a science experiment or comparing items, you should use a <strong>Table</strong>.</p>
            <p>Tables organize information into rows (horizontal) and columns (vertical). They make complex information very easy to read!</p>
          </>
        )
      },
      {
        title: "Task 2: Headers & Page Numbers",
        instruction: "Click the 'Insert' tab and select 'Header & Page No.' to add a professional header to the document.",
        content: (
          <>
            <p><strong>Headers and Footers</strong></p>
            <p>If you are writing a long essay or report, you want to make sure your name and the page number are on every single page.</p>
            <p>You can use the <strong>Header</strong> (the space at the very top of the page) or the <strong>Footer</strong> (the space at the very bottom) to automatically display this information on every page of your document.</p>
          </>
        )
      },
      {
        title: "Task 3: Running Spell Check",
        instruction: "Click the 'Review' tab at the top, then click 'Spell Check'. When it highlights the misspelled word, click 'Change' to fix it.",
        content: (
          <>
            <p><strong>Checking Your Work</strong></p>
            <p>Nobody is perfect, and typos happen! Word processors have built-in dictionaries to help you catch spelling and grammar mistakes.</p>
            <p>You should <strong>always</strong> run a spell check before handing in an assignment or sending a professional document.</p>
          </>
        )
      },
      {
        title: "Task 4: Printing to FOLLOW_ME",
        instruction: "Click 'File' > 'Print'. Change the selected printer to 'FOLLOW_ME', then click the big Print button.",
        content: (
          <>
            <p><strong>Printing at School</strong></p>
            <p>When printing at school or in a large office, you usually don't print to one specific machine. Instead, you print to a central queue (like <strong>FOLLOW_ME</strong>).</p>
            <p>After sending the document to the FOLLOW_ME queue, you can walk up to <em>any</em> printer in the building, log in using your unique print code (found on your desktop) or your full school login, and your document will print right there!</p>
          </>
        )
      },
      {
        title: "Task 5: Knowledge Check",
        instruction: "Complete the quiz to finish this module.",
        content: (
          <>
            <p>Let's review what you've learned about Intermediate Word Processing!</p>
          </>
        )
      }
    ],
    component: <Module7 />
  },
  "8": {
    title: "Presentation Skills",
    tasks: [
      {
        title: "Task 1: Slide Layouts",
        instruction: "Open the Slides application on your desktop. Click 'Home' in the top menu and select 'New Title & Content Slide'.",
        content: (
          <>
            <p><strong>Building a Presentation</strong></p>
            <p>Slide decks (like PowerPoint or Google Slides) are visual aids for when you are speaking to an audience.</p>
            <p>Presentations are built using different <strong>Slide Layouts</strong>. The first slide is usually a "Title Slide". For the rest of your presentation, you usually want to add "Title and Content" slides to hold your information.</p>
          </>
        )
      },
      {
        title: "Task 2: Visual Communication",
        instruction: "Click 'Insert' in the top menu, click 'Pictures', and use the file picker to add the 'science_graph.png' image to your new slide.",
        content: (
          <>
            <p><strong>A Picture is Worth a Thousand Words</strong></p>
            <p>The biggest mistake people make is not using enough pictures! Your audience wants to <em>look</em> at things while they listen to you talk.</p>
            <p>Always try to include a relevant image, graph, or icon on your slides to support your point.</p>
          </>
        )
      },
      {
        title: "Task 3: The Wall of Text",
        instruction: "Type a short bullet point into the text box (like 'Q1 Sales were up'). Then, click 'Transitions' and select 'Fade'. Note: You cannot type a massive paragraph of text!",
        content: (
          <>
            <p><strong>The Golden Rule of Presentations</strong></p>
            <p>Never write a "Wall of Text" on a slide. If you put 5 paragraphs of text on the screen, your audience will stop listening to you and just read the screen instead.</p>
            <p><strong>The 6x6 Rule:</strong> Try to use no more than 6 bullet points per slide, and no more than 6 words per bullet point. You are the speaker; the slide is just the summary!</p>
            <p><em>Transitions:</em> A transition is the animation that plays when moving from one slide to the next. Use simple ones like "Fade" to look professional.</p>
          </>
        )
      },
      {
        title: "Task 4: Run the Presentation",
        instruction: "Click the 'Slide Show' tab in the top menu and click 'From Beginning' to view your presentation in full screen and see your transition in action!",
        content: (
          <>
            <p><strong>Presenting Your Work</strong></p>
            <p>When you are ready to present to your class, you don't want them to see all your editing tools and sidebars. You want them to focus entirely on your slides.</p>
            <p>Running a <strong>Slide Show</strong> puts your presentation into full-screen mode, hiding all distractions and activating any animations or transitions you added.</p>
          </>
        )
      },
      {
        title: "Task 5: Knowledge Check",
        instruction: "Complete the quiz to finish this module.",
        content: (
          <>
            <p>Let's review what you've learned about Presentation Skills!</p>
          </>
        )
      }
    ],
    component: <Module8 />
  },
  "9": {
    title: "Spreadsheet Basics",
    tasks: [
      {
        title: "Task 1: Data Entry",
        instruction: "Open the Spreadsheets app. Type 'Transport', 'Food', and 'Tickets' into cells A1, A2, and A3. Type their costs (150, 50, 30) into B1, B2, and B3. (Tip: Use Enter to move down, Tab to move right).",
        content: (
          <>
            <p><strong>What is a Spreadsheet?</strong></p>
            <p>Applications like Microsoft Excel or Google Sheets organize information using a massive grid. The grid is made up of <strong>Columns</strong> (letters) and <strong>Rows</strong> (numbers).</p>
            <p>The boxes where you type are called <strong>Cells</strong>. Every cell has a unique name based on its column and row, like <code>B2</code>.</p>
          </>
        )
      },
      {
        title: "Task 2: The SUM Formula",
        instruction: "Click on cell B4. Type EXACTLY this formula to calculate the total budget: `=SUM(B1:B3)`",
        content: (
          <>
            <p><strong>Calculating with Formulas</strong></p>
            <p>You never have to use a calculator if you have a spreadsheet! You can tell the computer to do the math for you using a <strong>Formula</strong>.</p>
            <p>All formulas must start with an equals sign (<code>=</code>). The <code>SUM</code> formula adds up all the numbers in a range of cells.</p>
          </>
        )
      },
      {
        title: "Task 3: The COUNTA Formula",
        instruction: "Click on cell A5. Type EXACTLY this formula to count how many items we are bringing: `=COUNTA(A1:A3)`",
        content: (
          <>
            <p><strong>Counting Items</strong></p>
            <p>While <code>SUM</code> adds numbers together, <code>COUNTA</code> counts how many cells actually have words or numbers inside them.</p>
            <p>This is incredibly useful if you have a huge list and need to know exactly how many items there are.</p>
          </>
        )
      },
      {
        title: "Task 4: The MAX Formula",
        instruction: "Click on cell B5. Type EXACTLY this formula to find the highest cost: `=MAX(B1:B3)`",
        content: (
          <>
            <p><strong>Finding the Highest Value</strong></p>
            <p>The <code>MAX</code> formula looks at a range of cells and returns the largest number it finds.</p>
          </>
        )
      },
      {
        title: "Task 5: The MIN Formula",
        instruction: "Click on cell B6. Type EXACTLY this formula to find the lowest cost: `=MIN(B1:B3)`",
        content: (
          <>
            <p><strong>Finding the Lowest Value</strong></p>
            <p>The <code>MIN</code> formula looks at a range of cells and returns the smallest number it finds.</p>
          </>
        )
      },
      {
        title: "Task 6: The AVERAGE Formula",
        instruction: "Click on cell B7. Type EXACTLY this formula to find the average cost: `=AVERAGE(B1:B3)`",
        content: (
          <>
            <p><strong>Finding the Average Value</strong></p>
            <p>The <code>AVERAGE</code> formula calculates the mathematical mean of the numbers in a range.</p>
          </>
        )
      },
      {
        title: "Task 7: Knowledge Check",
        instruction: "Complete the quiz to finish this module.",
        content: (
          <>
            <p>Let's review what you've learned about Spreadsheets!</p>
          </>
        )
      }
    ],
    component: <Module9 />
  },
  "10": {
    title: "Cloud Storage & Collaboration",
    tasks: [
      {
        title: "Task 1: Sharing Permissions",
        instruction: "Open the 'OneDrive' folder. Right-click on 'Group_Project.docx', click 'Share', and give 'Editor' access to your classmate.",
        content: (
          <>
            <p><strong>Sharing Your Work</strong></p>
            <p>Cloud storage like OneDrive or Google Drive allows you to share files with others without emailing copies back and forth.</p>
            <p>You can choose to give someone <strong>View</strong> access (they can only read it) or <strong>Editor</strong> access (they can make changes to the original file).</p>
          </>
        )
      },
      {
        title: "Task 2: Editing Simultaneously",
        instruction: "Double-click 'Group_Project.docx' to open it in the browser. Type a new sentence at the bottom while your classmate types at the top.",
        content: (
          <>
            <p><strong>Real-Time Collaboration</strong></p>
            <p>When you share a cloud document, multiple people can edit the exact same file at the exact same time. You will see their cursor moving around the screen!</p>
          </>
        )
      },
      {
        title: "Task 3: Leaving Comments",
        instruction: "Highlight a sentence and click 'New Comment' in the top right to leave feedback for your group.",
        content: (
          <>
            <p><strong>Constructive Feedback</strong></p>
            <p>If you disagree with something in a group project, it's often better to leave a <strong>Comment</strong> instead of just deleting their work.</p>
            <p>Comments sit on the side of the document, allowing your team to discuss the change before making it.</p>
          </>
        )
      },
      {
        title: "Task 4: Version History",
        instruction: "Someone accidentally deleted a paragraph! Click 'File' > 'Version History' and restore the older version from 10 minutes ago.",
        content: (
          <>
            <p><strong>The Ultimate Undo Button</strong></p>
            <p>Because the cloud saves automatically, it keeps a historical record of every change made to a document.</p>
            <p>If a group member completely messes up the file, you don't need to panic! You can simply roll back time and <strong>Restore</strong> an older version.</p>
          </>
        )
      },
      {
        title: "Task 5: Knowledge Check",
        instruction: "Complete the quiz to finish this module.",
        content: (
          <>
            <p>Let's review what you've learned about Cloud Collaboration!</p>
          </>
        )
      }
    ],
    component: <Module10 />
  },
  "11": {
    title: "Problem Solving & Troubleshooting",
    tasks: [
      {
        title: "Task 1: Missing Files",
        instruction: "Double-click 'Microsoft Edge' on the desktop and go to your OneDrive. Click 'Recycle bin' in the left menu, then right-click 'Lost_Homework.docx' and select 'Restore' to get it back. Finally, close the browser window.",
        content: (
          <>
            <p><strong>Don't Panic!</strong></p>
            <p>If you accidentally delete a file, it isn't gone forever right away. Because your files are saved in the cloud, they go to your online OneDrive Recycle bin.</p>
            <p>You can always open the Recycle bin on the web to rescue files you didn't mean to throw away.</p>
          </>
        )
      },
      {
        title: "Task 2: Audio & Network Issues",
        instruction: "Click the System Tray (bottom right). Click the Wi-Fi icon to connect to 'School_WiFi', and click the Speaker icon to unmute the audio.",
        content: (
          <>
            <p><strong>Check the Basics First</strong></p>
            <p>Before raising your hand for a teacher or IT support, always check the basics! Is it plugged in? Is it muted? Is the Wi-Fi turned on?</p>
            <p>The System Tray in the bottom right corner of your screen is the quickest way to solve 90% of audio and internet problems.</p>
          </>
        )
      },
      {
        title: "Task 3: Printer Issues",
        instruction: "The printer is jammed! Click the Printer icon in the System Tray to open the print queue. Right-click the stuck document and click 'Cancel'.",
        content: (
          <>
            <p><strong>Clearing the Queue</strong></p>
            <p>If a printer stops working, clicking 'Print' 50 more times will only make the problem worse!</p>
            <p>Always open the Print Queue to see if there is an error, and cancel any stuck jobs before trying again.</p>
          </>
        )
      },
      {
        title: "Task 4: Frozen Software",
        instruction: "Oh no, the software has frozen! Click the Start Menu (bottom left) -> Power Icon -> Restart.",
        content: (
          <>
            <p><strong>Soft Restart vs Hard Reboot</strong></p>
            <p>When an app freezes, never just hold down the physical power button on the computer. That is a "Hard Reboot" and it can severely damage your files!</p>
            <p>Instead, use the Start Menu to perform a safe "Soft Restart", which tells the computer to safely close everything and reboot itself.</p>
          </>
        )
      },
      {
        title: "Task 5: Account Accountability",
        instruction: "The bell just rang for break! Do not walk away from your computer. Click the Start Menu -> Profile Icon (👤) -> Lock to secure your account.",
        content: (
          <>
            <p><strong>Protect Your Digital Identity</strong></p>
            <p>If you leave your computer unlocked, anyone can sit down and delete your coursework or send rude emails pretending to be you. You are responsible for everything that happens on your account.</p>
            <p>Always Lock your screen before stepping away!</p>
          </>
        )
      },
      {
        title: "Task 6: Knowledge Check",
        instruction: "Complete the quiz to finish this module.",
        content: (
          <>
            <p>Let's review what you've learned about troubleshooting!</p>
          </>
        )
      }
    ],
    component: <Module11 />
  },
  "12": {
    title: "Final Digital Skills Project",
    tasks: [
      {
        title: "The Final Exam",
        instruction: "This is your final test! You will use the real software on your computer to build a Student Survival Pack. Read the checklist and check off the boxes as you complete them.",
        content: (
          <>
            <p><strong>Welcome to the Real World!</strong></p>
            <p>You have learned how to use Word Processors, Spreadsheets, Presentations, and Cloud Storage using our simulators.</p>
            <p>Now, it is time to prove your skills! Open Microsoft Word, Excel, PowerPoint, and File Explorer on your computer to complete the final project.</p>
            <p>Good luck!</p>
          </>
        )
      }
    ],
    component: <Module12 />
  }
};

export default function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const moduleId = unwrappedParams.id;
  const config = moduleConfig[moduleId];

  if (!config) {
    return (
      <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
        <h2>Module Not Found or Coming Soon</h2>
        <p>We are currently building this module.</p>
      </div>
    );
  }

  return (
    <ModuleWrapper moduleId={moduleId} tasks={config.tasks}>
      {config.component}
    </ModuleWrapper>
  );
}
