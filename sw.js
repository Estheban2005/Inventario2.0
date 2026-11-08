const C='inv-v20',X='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{await c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png']);try{await c.add(new Request(X,{mode:'no-cors'}))}catch(err){}}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>clients.claim())));
const put=(r,res)=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 const same=new URL(r.url).origin===location.origin;if(!same&&r.url!==X)return;
 e.respondWith(same?fetch(r).then(res=>put(r,res)).catch(()=>caches.match(r)):caches.match(r).then(x=>x||fetch(r).then(res=>put(r,res))))});
