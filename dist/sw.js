if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let o={};const u=s=>i(s,r),t={module:{uri:r},exports:o,require:u};e[r]=Promise.all(l.map((s=>t[s]||u(s)))).then((s=>(n(...s),o)))}}define(["./workbox-5ffe50d4"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/404-Dk-os4k8.css",revision:null},{url:"assets/404-oxKs-NuC.js",revision:null},{url:"assets/BankinfoView-CLp--kC8.js",revision:null},{url:"assets/BankinfoView-VzQcBMTS.css",revision:null},{url:"assets/DashboardView-BTRfLILK.js",revision:null},{url:"assets/DashboardView-lX30qcWb.css",revision:null},{url:"assets/failed-DEzGETbE.css",revision:null},{url:"assets/failed-iOw-cYeL.js",revision:null},{url:"assets/GoldboxNewView-DMtDF4Sv.js",revision:null},{url:"assets/GoldboxNewView-mkqTJHrb.css",revision:null},{url:"assets/GoldBoxView-CrCiclt4.css",revision:null},{url:"assets/GoldBoxView-w-cN-xs6.js",revision:null},{url:"assets/index-BC5YHPvh.css",revision:null},{url:"assets/index-DaoqoAV-.js",revision:null},{url:"assets/persian-tools.esm-CBI2Czng.js",revision:null},{url:"assets/PersonalInfoView-BdBf6nWH.css",revision:null},{url:"assets/PersonalInfoView-CGfWCgNR.js",revision:null},{url:"assets/success-D_oT_4Ni.js",revision:null},{url:"assets/success-ua6vR7PD.css",revision:null},{url:"assets/TimerIcon-Cuk4PI5b.js",revision:null},{url:"assets/trade-BXUTWyne.js",revision:null},{url:"assets/TransactionView-BG0BkGlj.js",revision:null},{url:"index.html",revision:"8ee23e8f05685126316626d4dcf9197d"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"icons/web-app-manifest-192x192.png",revision:"3983aa2448bbc2f0040124c016a756f9"},{url:"icons/web-app-manifest-512x512.png",revision:"5c9c4f47993991e8552cf7a1e6503423"},{url:"manifest.webmanifest",revision:"0e75442e95514fefccf7969bb4034465"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
