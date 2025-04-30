Phase 1:

1. Project Setup & Environment - (9 issues)

Error #1: Tailwind CSS failed to install (multiple tries)

Context: Happened during the initial frontend setup in Phase 1, while configuring the project with React + Vite. Tailwind CSS was chosen for styling due to its popularity.
Issue: Tailwind CSS consistently failed to install and compile correctly. Errors were thrown during plugins build/start(vite dev server crash for style not being applied at all)
Root Cause: A mismatch between Tailwind's version, PostCSS configuration and Vite's plugin compatibility. Some official docs used outdated tailwind.config.js formats or missing PostCSS setup required by Vite.
Fix: After multiple unsuccessful attempts (clean installs, plugin trials, config rewrites), I made the decision to drop the Tailwind entirely to avoid wasting time early in the project.
Reflection: Valuable realization that tooling should not delay development goals. Flexibility and pragmatism matter more than trends - I shifted to React Bootstrap later for faster progress and easier integration.


Error #2: Conflicts between Vite and Tailwind plugins

Context: During Tailwind integration attempts, additional conflicts emerged between Vite's plugin system and Tailwind/PostCSS.
Issue: Installing and configuring required Vite plugins (vite-plugin-tailwind, @vitejs/plugin-react) created build-time errors and stylesheet injection failures.
Root Cause: incompatible plugin versions and incorrect plugin order in vite.config.js . Also,  some guides assumed Create React App structure, not Vite's module-based config.
Fix: Rather than debugging every single layer(plugin, config, CSS not applying), I decided to stop using Tailwind, which resolved this entire category of issues.
Reflection: I don't see the decision as a defeat, it was strategic. Sometimes, walking away is the smartest fix. I refocused my efforts toward learning component-based design using Bootstrp, which better aligned with my timeline.


Error #3: React Router DOM version mismatch

Context: occured when setting up routes between pages like Home, Signup, Login, etc. I was following older tutorials fro router setup.
Issue: routing didn't work properly - app crashed and navigation didn't render expected components. Elements like <Switch> and direct component={} usage threw warnings and errors
Root Cause: I had installed react-router-dom@6, but followed syntax for v5. Version 6 removed <Switch> in favor of <ROutes>, and changed how elements are passed (element={<Component />} instead of component={}).
Fix: I updated the router logic across all pages to use React Router v6 syntax, including replacing <Switch> with <Routes> and passing JSX in element props.
Reflection: key takeaway: Always check version-specific docs, especially for core libraries like Router. I now double check NPM versions and update my code accordingly, saving time and confusion.


Error #4: Bootstrap CSS not applying initially 

Context: After switching from Tailwind to React Bootstrap, I expected styles to be visible right after installing the package and importing components.
Issue: The UI appeared unstyled - Bootstrap classes had no visible effect on components like Navbar, Button, etc.
Root Cause: I forgot to manually import the Bootstrap CSS file in my main entry point (main.jsx). React Bootstrap doesn't auto-apply styles, unlike some other UI kits.
Fix: I added this line at the top of my main.jsx file:
import 'bootstrap/dist/css/bootstrap.min.css';
Reflection: A reminder that UI component libraries often require their own CSS imports separately. Now I double-check library setup and read official install guides more carefully.


Error #5: Improper React ROuter structure (no <Routes> wrapper)

Context: I was adding multiple routes (Home, Login, Signup, Dashboard) but didn't wrap them correctly in the newer routing structure.
Issue: Navigation was inconsistent - routes didn't render anything, threw console warnings like "no routes matched location." I had used multiple <Route> components without a <Routes> wrapper.
Root Cause: In React Router v6, all <Route> components must be children of a <Routes> component. The new system replaces the <Switch> block from v5.
Fix: I refactored the routing block like this:
<BrowserRoute>
    <Routes>
        <Route path="/" element={<Home />}/>
        <ROute path="/login" element={<Login />}/>
        ...
    </Routes>
</BrowserRouter>
Reflection: I gained a solid understanding of React Router v6 structure. It also taught me to verify the latest usage patterns instead of relying on outdated tutorials or StackOverflow snippets.


Error #6: Missing dependencies due to incorrect npm install steps
Context: After restarting the frontend multiple times, I faced issues like "module not found" , vite failing to compile due to missing packages (e.g. ReactROuter, Bootstrap, etc.).
Issue: Core dependencies were either missing, outdated, or improperly linked in the project. Running npm run dev triggered build errors.
Root Cause: I had interrupted or partially completed npm installs (due to switching terminals, deleting node_modules, or corrupted cache). Sometimes, packages were globally installed but not present in package.json.
Fix: I deleted node_modules/, deleted package-lock.json & ran:
npm cache clean --force
npm install
Reflection: This helped me to learn the full reset and reinstallation cycle in npm. I now take care to always run fresh installs properly and check the dependency list in package.json.


Error #7: Vite dev server not running (port conflict)

Context: I was trying to run Vite development server using npm run dev, but it wasn't launching - terminal showed portal already in use or simply hung without output.
Issue: The Vite server failed to start due to a port conflict, possibly from another dev server or a crashed instance still occupying the default port (5173).
Root Cause: Vite defaults to a specific port, and if that's already in use, it won't start cleanly unless explicitly told to use another. Also, lingering background background processes or stale cache prevent fresh runs.
Fix: I manually killed the port, restarted the system.
Ran: npm run dev -- --port=5174
Cleared cache usong: npm cache clean --force
Reflection: I learned how to handle port conflict in local dev environments, and how Vite behaves with custom ports. This experience will help across future React/Node/Django setups.


Error #8: Page reloads giving blank screen

Context: App worked fine with navigation, but refreshing the page on any route except / showed a white screen or 404 error.
Issue: Refreshing a route like /login or /dashboard caused the app to crash, display nothing. I didn't get proper fallback or routing behaviour.
Root Cause: I was using Vite + React Router without configuring BrowserRouter properly. Vite handles SPA differently than Create React App, so I needed to ensure routing is understood both by React and the server.
Fix: I switched from HashRouter to: import { BrowserRouter } from "react-router-dom";
Added correct base handling in Vite if needed.
Made sure all route components were loaded under <Routes>.
Reflection: Now I understand that SPA routing and browser refresh are different probems, especially in modern builds like Vite. I'll be able to handlle this in any frontend project or production deployment.


Error #9: Navbar not loading due to folder structure error

Context: After setting up the AppNavbar.jsx component, my app compiled correctly but no Navbar was rendering on screen.
Issue: Despite being imported, the Navbar didn't show - i assumed it was a logic or auth state bug.
Root Cause: The navbar component was either:
placed in wrong folder(components/ vs pages/)
imported with the wrong path(case-sensitive path in Linux-based systems)
Not correctly included inside my App.jsx
Fix: I corrected the import: import AppNavbar from "../../components/AppNavbar";
Ensured the component file existed and was correctly named
Verified that <AppNavbar /> was placed above <Routes> inside App.jsx
Reflection: I became more cautious about component structure, imports and naming - especially in Vite where fast reloads don't always show path errors. Now my component hierarchy is cleaned and better organized.


### Section Summary: Project Setup & Environment
- understood toolchain behavior (Vite, React, Tailwind, Router).
- learned how version mismatches and config missteps cause cascading issues.
- gained confidence in debugging dev server issues and CSS/framework integration.
- realized the importance of structured folder setup and clear component imports.
- shifted mindset: setup isn't just a hurdle - it's part of becoming a pro dev.
- lesson learned: 
   - know your tools inside out- every framework has quirks.
   - Tailwind and VIte need special setup; not every stack plays well together.
   - Page reloads in SPAs require proper Router setup (BrowserRouter, base URL).


2. Folder Structure & Component Design - (4 Issues)

Error #1: Inconsistent file naming (camelCase vs PascalCase)

Context: while creating components like AppNavbar.js, loginPage.js, and Dashboard.jsx, there was no enforced naming convention initially. This led to a messy mix of camelCase (loginPage.js) and PascalCase (AppNavbar.js)
Issue: Component files didn't follow a single naming convention, causing confusion during imports and increasing chances of human error - especially on case-sensitive systems like linux.
Root Cause: lack of agreed upon naming convention at the start. No linter/prettier config to eforce file casing rules.
Fix: Renamed all component files to follow PascalCase, which is standard for React Components (e.g., LoginPage.js, Dashboard.js)
Reflection: Consistency isn't just about aesthetics - it directly affects clarity, debugging, and scalability. From now, all component files will use PascalCase, utility/helper functions can follow camelCase.


Error #2: Missing index.js for exports

Context: while importing components or utilities, multiple nested import paths. (../../components/Navbar/AppNavbar) were becoming repetitive and cluttered.
Issue: Absence of index.js files in folders like /components and /pages caused unnecessary long import paths and poor scalability.
Root Cause: Didn't initially include barrel files (index.js) to centralize exports. This is common when building quickly without thinking long-term.
Fix: added index.js files in key folders: 
// components/index.js
export { default as AppNavbar } from './AppNavbar';
export { default as Footer } from './Footer';
Now imports look cleaner: import { AppNavbar } from '../components';
Reflection: barrel exports improve structure, save time and make the codebase feel professional. Will continue this practice for all core folders(e.g., pages, context, utils).


Error #3: Components placed directly in /src

Context: During early prototyping, components like AppNavbar.js and Login.js were placed directly inside /src.
Issue: This cluttered the main source directory and made it hard to distinguish between core logic, components, pages and utilities.
Root Cause: Initial focus was on getting components working quickly without setting up folders for separation of concerns.
Fix: moved all components into /src/components and ensured /src/pages is used for full-page views. Updated all import paths accordingly.
Reflection: Folder discipline helps in long-term maintenance. Clean file separation means easier onboarding for collaborators and a smoother development flow.


Error #4: Circular import issue in early tests

Context: while importing AuthContext inside a component that also had a shared utility, a circular dependency warning popped up, breaking the build in dev server.
Issue: circular imports between components and context/util folders caused unpredictable behaviour and import errors.
Root Cause: mututal dependencies and poor planning of shared logic between files - e.g., AuthContext,js using a function that also  imported a component using the context
Fix: Refactored the shared function out into a separate utils/authHelpers.js file, ensuring AuthContext.js and components didn't directly depend on each other.
Reflection: Circular imports are dangerous, especially in React where modules resolution order matters. Learned to isolate logic and keep components context-agnostic when possible.


3. Authentication System -(12 issues)

Error #1: