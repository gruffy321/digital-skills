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
        instruction: "Double click the folder icon to open the File Explorer.",
        content: (
          <>
            <p>Your computer stores millions of files, from documents to family photos. To find them, we use a tool called the <strong>File Explorer</strong>.</p>
            <p>The File Explorer organizes everything into a hierarchy of folders, much like a real filing cabinet. On the left side (the sidebar), you'll see major categories like Documents, Downloads, and Pictures.</p>
          </>
        )
      },
      { 
        title: "Task 2: Create a New Folder", 
        instruction: "Click 'New Folder', name it, and press Enter.",
        content: (
          <>
            <p>Keeping your files organized is crucial. If you save everything to your Desktop, it will quickly become a messy, unsearchable pile.</p>
            <p>You can create <strong>Folders</strong> to group related files together. For example, you might create a folder called "Tax Returns 2025" to keep all your financial documents in one safe place.</p>
            <p><em>Tip:</em> Give your folders clear, descriptive names so you always know what's inside them.</p>
          </>
        )
      },
      { 
        title: "Task 3: Delete a File", 
        instruction: "Right-click the dummy file and select 'Delete'.",
        content: (
          <>
            <p>When you no longer need a file, you should delete it to free up storage space on your hard drive.</p>
            <p><strong>The Context Menu:</strong> Clicking the right mouse button (Right-Click) on any item will open a secret menu of options specific to that item. This is where you'll usually find the 'Delete' option.</p>
            <p><em>Safety Warning:</em> When you delete a file, it goes to the <strong>Recycle Bin</strong> on your desktop. If you accidentally delete something, you can open the Recycle Bin and restore it! But once you empty the Recycle Bin, the file is gone forever.</p>
          </>
        )
      },
    ],
    component: <Module2 />
  },
  "3": {
    title: "Internet & Online Research",
    tasks: [
      { 
        title: "Task 1: Open the Web Browser", 
        instruction: "Double click the 'Web Browser' icon on the desktop.",
        content: (
          <>
            <p>A <strong>Web Browser</strong> (like Google Chrome, Safari, or Microsoft Edge) is your vehicle for traveling the Internet. Without it, you can't view websites!</p>
          </>
        )
      },
      { 
        title: "Task 2: Use the Address Bar", 
        instruction: "Type exactly 'www.learn-digital.org' into the address bar at the top and press Enter.",
        content: (
          <>
            <p>Every website has a unique address, called a <strong>URL</strong> (e.g., www.google.com). Just like a house address, if you know the exact URL, you can type it directly into the <strong>Address Bar</strong> at the top of the browser to go straight there.</p>
            <p><em>Tip:</em> Modern browsers combine the Address Bar and the Search Box into one thing called an "Omnibox". If you type something with dots in it (like a .com or .org), it assumes you are typing a URL and tries to take you to that exact website.</p>
          </>
        )
      },
      { 
        title: "Task 3: Perform a Web Search", 
        instruction: "Now let's do a search! Type exactly 'digital security' into the address bar and press Enter.",
        content: (
          <>
            <p>What if you don't know the exact URL of the website you want? That is what <strong>Search Engines</strong> are for!</p>
            <p>If you type a phrase without dots (like "best pizza near me") into the same Address Bar, the browser assumes it is a <strong>Search Term</strong>. It will ask a Search Engine (like Google or Bing) to find websites related to that term.</p>
            <p>It is crucial to know the difference! Scammers often create fake websites with names that are very similar to real ones. If you try to search for "bank of america" but accidentally click a fake link, you could be in danger. It is always safer to type the exact URL (www.bankofamerica.com) if you know it.</p>
          </>
        )
      },
      { 
        title: "Task 4: Identify a Safe Link", 
        instruction: "Look closely at the search results. Find and click the safe, legitimate educational link.",
        content: (
          <>
            <p><strong>Phishing & Malicious Links</strong></p>
            <p>Search engines aren't perfect. Sometimes scammers pay money to have their fake, dangerous websites show up at the very top of your search results as "Sponsored" links.</p>
            <p>Before you click a link, always read the small green or black text underneath the blue title. This shows you the actual URL you are about to visit. If the URL looks strange, suspicious, or has weird spelling, <strong>DO NOT CLICK IT</strong>.</p>
            <p><em>Golden Rule:</em> If a link promises you a free iPhone, a huge lottery winning, or uses high-pressure language ("CLAIM NOW!"), it is almost certainly a scam to steal your information.</p>
          </>
        )
      },
    ],
    component: <Module3 />
  },
  "4": {
    title: "Digital Citizenship & Social Media",
    tasks: [
      {
        title: "Task 1: Stranger Danger",
        instruction: "Double click SocialNet to open it. Find the Friend Request from 'JohnDoe45' and click Deny.",
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
        title: "Task 2: Cyberbullying",
        instruction: "Go to your Feed. Find the mean post about the teacher, click the three dots (...), and Report it for Cyberbullying.",
        content: (
          <>
            <p><strong>Digital Citizenship & Your Digital Footprint</strong></p>
            <p>Everything you post online is permanent. Even if you delete it, someone might have taken a screenshot. This is your <strong>Digital Footprint</strong>.</p>
            <p>Posting rumors, insults, or private information about your peers or school staff is called <strong>Cyberbullying</strong>. It is illegal, causes severe emotional harm, and schools take it extremely seriously. It can lead to suspension or expulsion.</p>
            <p>If you see cyberbullying on your feed, do not "Like" it or comment on it. Use the platform's reporting tools to flag it so moderators can remove it.</p>
          </>
        )
      },
      {
        title: "Task 3: Privacy Settings",
        instruction: "Go to your Settings tab. Click the switch to turn on your 'Private Account'.",
        content: (
          <>
            <p><strong>Locking Down Your Information</strong></p>
            <p>When you create a new social media account, it is usually "Public" by default. This means that anyone in the entire world can see your photos, your school name, and your location.</p>
            <p>At a school age, your account should <strong>always</strong> be set to Private. A private account ensures that only people you have approved as friends can see what you post, keeping you safe from data scrapers and predators.</p>
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
        title: "Task 1: Check Your Email",
        instruction: "Double click the Outlook icon to open it. Find the unread email from Mr. Johnson and click it to read the message.",
        content: (
          <>
            <p><strong>Professional Communication</strong></p>
            <p>While you might use text messages or Snapchat to talk to your friends, schools and businesses use <strong>Email</strong> (like Microsoft Outlook or Gmail) for official communication.</p>
            <p>An email inbox is divided into three main parts:</p>
            <ul>
              <li><strong>Folders (Left):</strong> Where you organize your mail (Inbox, Sent, Junk).</li>
              <li><strong>Message List (Middle):</strong> A list of emails you have received. Unread ones are usually bold!</li>
              <li><strong>Reading Pane (Right):</strong> Where you can actually read the contents of the selected email.</li>
            </ul>
          </>
        )
      },
      {
        title: "Task 2: Email Etiquette",
        instruction: "Read Mr. Johnson's email. Use the text box at the bottom to type a polite, professional reply, then click 'Send'.",
        content: (
          <>
            <p><strong>Replying to Staff & Teachers</strong></p>
            <p>When you write an email to a teacher or an employer, you must use <strong>Professional Etiquette</strong>.</p>
            <ul>
              <li><strong>Do not use text-speak:</strong> Words like "idk", "thx", or "lol" are unprofessional. Write in full, clear sentences.</li>
              <li><strong>Be polite:</strong> Start with a greeting ("Hello Mr. Johnson,") and end with a sign-off ("Best regards, [Your Name]").</li>
            </ul>
            <p>Try typing a professional reply to his question about the lab report.</p>
          </>
        )
      },
      {
        title: "Task 3: Email Phishing Scams",
        instruction: "A new, urgent email just arrived from the 'IT Helpdesk'. Select it, and click the 'Delete' (Trash) button at the top to safely dispose of it.",
        content: (
          <>
            <p><strong>Identifying Email Phishing</strong></p>
            <p>Scammers use email to steal passwords in an attack called <strong>Phishing</strong>. They pretend to be your school, a bank, or a company you trust, and provide a fake link for you to log into.</p>
            <p><strong>Red Flags of a Phishing Email:</strong></p>
            <ul>
              <li><strong>Urgency/Panic:</strong> They claim your account will be deleted "IMMEDIATELY" if you don't click the link. They want you to panic so you don't think clearly.</li>
              <li><strong>Suspicious Sender Address:</strong> Always check the actual email address of the sender. Scammers often use strange domains (like "admin@suspicious-domain.com").</li>
              <li><strong>Never click the link:</strong> IT departments will never email you a random link and ask for your password. If you get an email like this, delete it immediately or report it to your school's real IT staff.</li>
            </ul>
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
        title: "Task 1: Document Formatting",
        instruction: "Type the sentence 'Digital skills are important'. Then, use your mouse to highlight (select) just the word 'important', and click the 'B' (Bold) button to make it bold.",
        content: (
          <>
            <p><strong>Selecting and Formatting Text</strong></p>
            <p>Applications like Microsoft Word allow you to format documents. However, computers need to know exactly <em>which</em> part of the text you want to change.</p>
            <p>To change a word, you must first <strong>Highlight (Select)</strong> it:</p>
            <ol>
              <li>Click and hold the left mouse button at the beginning of the word.</li>
              <li>Drag the cursor to the end of the word.</li>
              <li>Let go of the mouse button. The text should now have a blue background.</li>
              <li>Now you can click a button on the Toolbar (like <strong>B</strong> for Bold) to change only the highlighted text!</li>
            </ol>
          </>
        )
      },
      {
        title: "Task 2: The Save As Function",
        instruction: "Click 'File' in the top menu bar, and then click 'Save As...'",
        content: (
          <>
            <p><strong>Saving Your Work</strong></p>
            <p>If you turn off your computer without saving, everything you typed will be lost forever!</p>
            <ul>
              <li><strong>Save:</strong> Updates an existing file that you have already named.</li>
              <li><strong>Save As:</strong> Creates a brand new file, allows you to choose what folder to put it in, and lets you give it a specific name.</li>
            </ul>
            <p>Whenever you start a new homework assignment, you should immediately use "Save As" so you don't lose your work.</p>
          </>
        )
      },
      {
        title: "Task 3: Naming Conventions",
        instruction: "Enter a descriptive name for your document and click Save. Do not use bad words, strange symbols, or lazy names like 'document'.",
        content: (
          <>
            <p><strong>File Naming Conventions</strong></p>
            <p>How you name a file is extremely important. If you name all your homework "document", you will never be able to find the right one!</p>
            <p><strong>Rules for naming files:</strong></p>
            <ol>
              <li><strong>Be Descriptive:</strong> Use subjects and dates (e.g., "Science_Lab_Report_May25").</li>
              <li><strong>No Special Symbols:</strong> Never use `\ / : * ? " &lt; &gt; |` in a filename. The computer uses these symbols for system paths, so putting them in a filename will cause errors.</li>
              <li><strong>Keep it Clean:</strong> Your school's acceptable use policy applies to filenames. Never use profanity or inappropriate language.</li>
            </ol>
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
        instruction: "Open the document. Click 'Insert' in the top menu and select 'Table (3x3)' to add it to your report.",
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
        instruction: "Click 'Insert' again and select 'Header & Page Number' to add a professional header to the document.",
        content: (
          <>
            <p><strong>Headers and Footers</strong></p>
            <p>If you are writing a long essay or report, you want to make sure your name and the page number are on every single page.</p>
            <p>You can use the <strong>Header</strong> (the space at the very top of the page) or the <strong>Footer</strong> (the space at the very bottom) to automatically display this information on every page of your document.</p>
          </>
        )
      },
      {
        title: "Task 3: Collaboration & Peer Review",
        instruction: "Look at the Comments panel on the right. Jane left a suggestion. Click 'Accept & Resolve' to automatically update your document with her suggestion.",
        content: (
          <>
            <p><strong>Collaborating with Peers</strong></p>
            <p>Modern word processors allow multiple people to work on the same document. Your teachers or classmates can leave <strong>Comments</strong> on your work to suggest improvements without deleting your text.</p>
            <p>Reviewing and accepting feedback is a critical skill for both school and professional environments!</p>
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
        instruction: "Double click the 'Slides' icon. Click 'Home' in the top menu and select 'New Title & Content Slide'.",
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
        instruction: "Click 'Insert' in the top menu and select 'Image' to add a graphic to your new slide.",
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
        instruction: "Type a short bullet point into the text box. Then, click 'Transitions' and select 'Fade'. Do NOT type a massive paragraph of text, or the system will block you!",
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
        instruction: "Click 'Slide Show' in the top menu to view your presentation in full screen and see your transition in action!",
        content: (
          <>
            <p><strong>Presenting Your Work</strong></p>
            <p>When you are ready to present to your class, you don't want them to see all your editing tools and sidebars. You want them to focus entirely on your slides.</p>
            <p>Running a <strong>Slide Show</strong> puts your presentation into full-screen mode, hiding all distractions and activating any animations or transitions you added.</p>
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
        instruction: "Double click the 'Spreadsheets' icon. Let's make a School Trip Budget! Type 'Transport', 'Food', and 'Tickets' into cells A2, A3, and A4. Then type their costs (e.g. 150, 50, 30) into B2, B3, and B4.",
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
        instruction: "Let's calculate the total cost! Click on cell B5. Type EXACTLY this formula into the cell or the formula bar at the top: `=SUM(B2:B4)`",
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
        instruction: "How many items are in our budget? Click on cell B6. Type EXACTLY this formula: `=COUNTA(A2:A4)`",
        content: (
          <>
            <p><strong>Counting Items</strong></p>
            <p>While <code>SUM</code> adds numbers together, <code>COUNTA</code> counts how many cells actually have words or numbers inside them.</p>
            <p>This is incredibly useful if you have a list of 5,000 students and need to know exactly how many names are on the list without counting them one by one!</p>
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
        title: "Task 1: Local vs Network Storage",
        instruction: "Double click 'File Explorer'. Your 'History_Essay.docx' is currently trapped on this specific computer. Click on 'My Documents' in the sidebar to find it.",
        content: (
          <>
            <p><strong>Thin Clients and Your Work</strong></p>
            <p>In school, you don't always use the exact same computer every day. If you save a file to <code>My Documents</code>, it gets stuck on that physical machine. If you log into a computer in the Library tomorrow, your file won't be there!</p>
          </>
        )
      },
      {
        title: "Task 2: Saving to OneDrive",
        instruction: "Click on your 'History_Essay.docx' to select it. Then, look at the top menu ribbon and click 'Move to OneDrive' to send it to the school network.",
        content: (
          <>
            <p><strong>The Magic of Cloud Sync</strong></p>
            <p>By moving your file into your <code>OneDrive - Student</code> folder, you are uploading it to the school's servers in the cloud.</p>
            <p>This means your file is safely backed up, and you can access it from <em>any</em> computer in the entire school just by logging in!</p>
          </>
        )
      },
      {
        title: "Task 3: Reading Sync Icons",
        instruction: "Open your OneDrive folder from the sidebar. Notice the blue spinning arrows on your file? This means it is currently uploading! Click 'Refresh Sync' in the top menu to wait for it to finish.",
        content: (
          <>
            <p><strong>Don't Log Off Too Early!</strong></p>
            <p>A blue spinning arrow means the computer is still talking to the server. If you turn off the computer now, your file will be corrupted or lost forever.</p>
            <p>You must <strong>ALWAYS</strong> wait until you see the solid Green Checkmark. The Green Checkmark guarantees your work is safely backed up and you are allowed to log off.</p>
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
        title: "Task 1: Basic Troubleshooting (Audio & Network)",
        instruction: "Your video has no sound and a webpage won't load! Click the Volume and Wi-Fi icons in the bottom right corner (System Tray) to unmute your speakers and connect to 'School_WiFi'.",
        content: (
          <>
            <p><strong>Check the Basics First</strong></p>
            <p>Before raising your hand for a teacher or IT support, always check the basics! Is it plugged in? Is it muted? Is the Wi-Fi turned on?</p>
            <p>The System Tray in the bottom right corner of your screen is the quickest way to solve 90% of audio and internet problems.</p>
          </>
        )
      },
      {
        title: "Task 2: Frozen Software",
        instruction: "Oh no, the Word Processor has frozen! Because you are on a restricted school account, you cannot open Task Manager. Click the Start Menu (bottom left) -> Power Icon -> Restart.",
        content: (
          <>
            <p><strong>Soft Restart vs Hard Reboot</strong></p>
            <p>When an app freezes, never just hold down the physical power button on the computer. That is a "Hard Reboot" and it can severely damage your files!</p>
            <p>Instead, use the Start Menu to perform a safe "Soft Restart", which tells the computer to safely close everything and reboot itself.</p>
          </>
        )
      },
      {
        title: "Task 3: Account Accountability",
        instruction: "The bell just rang for break! Do not walk away from your computer. Click the Start Menu -> Profile Icon (👤) -> Lock to secure your account.",
        content: (
          <>
            <p><strong>Protect Your Digital Identity</strong></p>
            <p>If you leave your computer unlocked, anyone can sit down and delete your coursework or send rude emails pretending to be you. You are responsible for everything that happens on your account.</p>
            <p>Always Lock your screen (or use the shortcut <code>Windows Key + L</code>) before stepping away!</p>
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
