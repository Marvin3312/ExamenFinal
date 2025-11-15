2025-11-15T16:43:33.636403084Z ==> Cloning from https://github.com/Marvin3312/ExamenFinal
2025-11-15T16:43:34.33058858Z ==> Checking out commit 30a4413724c397c11fd9ffb77a5e89723463872c in branch main
2025-11-15T16:43:35.678956236Z ==> Running build command 'cd vue-auth-app && npm install && npm run build'...
2025-11-15T16:43:35.916531431Z ==> Requesting Node.js version ^20.19.0 || >=22.12.0
2025-11-15T16:43:36.410137745Z ==> Using Node.js version 25.2.0 via ./package.json
2025-11-15T16:43:36.461366909Z ==> Docs on specifying a Node.js version: https://render.com/docs/node-version
2025-11-15T16:43:44.213161436Z
2025-11-15T16:43:44.213213147Z added 123 packages, and audited 124 packages in 5s
2025-11-15T16:43:44.213232427Z
2025-11-15T16:43:44.213532651Z 30 packages are looking for funding
2025-11-15T16:43:44.213708594Z   run `npm fund` for details
2025-11-15T16:43:44.216257169Z
2025-11-15T16:43:44.216281479Z found 0 vulnerabilities
2025-11-15T16:43:44.625378981Z
2025-11-15T16:43:44.625417162Z > vue-auth-app@0.0.0 build
2025-11-15T16:43:44.625425852Z > vite build
2025-11-15T16:43:44.625432192Z
2025-11-15T16:43:45.432372893Z failed to load config from /opt/render/project/src/vue-auth-app/vite.config.js
2025-11-15T16:43:45.436367598Z error during build:
2025-11-15T16:43:45.436400828Z SecurityError: Cannot initialize local storage without a `--localstorage-file` path
2025-11-15T16:43:45.436408178Z     at Object.get [as localStorage] (node:internal/webstorage:28:17)
2025-11-15T16:43:45.436415788Z     at get localStorage (node:internal/util:660:20)
2025-11-15T16:43:45.436423918Z     at getTimelineLayersStateFromStorage (file:///opt/render/project/src/vue-auth-app/node_modules/@vue/devtools-kit/dist/index.js:626:2)
2025-11-15T16:43:45.436432388Z     at initStateFactory (file:///opt/render/project/src/vue-auth-app/node_modules/@vue/devtools-kit/dist/index.js:888:24)
2025-11-15T16:43:45.436439789Z     at file:///opt/render/project/src/vue-auth-app/node_modules/@vue/devtools-kit/dist/index.js:891:23
2025-11-15T16:43:45.436445869Z     at ModuleJob.run (node:internal/modules/esm/module_job:413:25)
2025-11-15T16:43:45.436451619Z     at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:654:26)
2025-11-15T16:43:45.436457159Z     at async loadConfigFromBundledFile (file:///opt/render/project/src/vue-auth-app/node_modules/vite/dist/node/chunks/config.js:36521:12)
2025-11-15T16:43:45.436462739Z     at async bundleAndLoadConfigFile (file:///opt/render/project/src/vue-auth-app/node_modules/vite/dist/node/chunks/config.js:36415:17)
2025-11-15T16:43:45.436468609Z     at async loadConfigFromFile (file:///opt/render/project/src/vue-auth-app/node_modules/vite/dist/node/chunks/config.js:36382:42)
2025-11-15T16:43:45.549255792Z ==> Build failed 😞
2025-11-15T16:43:45.549288042Z ==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
2025-11-15T16:43:45.823870333Z ==> Requesting Node.js version ^20.19.0 || >=22.12.0
2025-11-15T16:43:46.083104733Z ==> Using Node.js version 25.2.0 via ./vue-auth-app/package.json
2025-11-15T16:43:46.132016947Z ==> Docs on specifying a Node.js version: https://render.com/docs/node-version