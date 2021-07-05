'use strict';(function(){const input=document.querySelector('#gdoc-search-input');const results=document.querySelector('#gdoc-search-results');let showParent=true
if(input){input.addEventListener('focus',init);input.addEventListener('keyup',search);}
function init(){input.removeEventListener('focus',init);loadScript('/js/groupBy-174feb11c7.min.js');loadScript('/js/flexsearch-5e0754c413.min.js',function(){const indexCfgDefaults={tokenize:'forward'}
const indexCfg=indexCfgDefaults;const dataUrl='/en.search-data.min.json'
indexCfg.document={key:'id',index:['title','content'],store:['title','href','parent'],};const index=new FlexSearch.Document(indexCfg);window.geekdocSearchIndex=index;getJson(dataUrl,function(data){data.forEach(obj=>{window.geekdocSearchIndex.add(obj);});});});}
function search(){const searchCfg={enrich:true,limit:10};while(results.firstChild){results.removeChild(results.firstChild);}
if(!input.value){return results.classList.remove('has-hits');}
let searchHits=flattenHits(window.geekdocSearchIndex.search(input.value,searchCfg));if(searchHits.length<1){return results.classList.remove('has-hits');}
results.classList.add('has-hits');if(showParent===true){searchHits=groupBy(searchHits,hit=>hit.parent);}
const items=[];if(showParent===true){for(const section in searchHits){const item=document.createElement('li'),title=item.appendChild(document.createElement('span')),subList=item.appendChild(document.createElement('ul'));title.textContent=section;createLinks(searchHits[section],subList);items.push(item);}}else{const item=document.createElement('li'),title=item.appendChild(document.createElement('span')),subList=item.appendChild(document.createElement('ul'));title.textContent='Results';createLinks(searchHits,subList);items.push(item);}
items.forEach(item=>{results.appendChild(item);})}
function createLinks(pages,target){const items=[];for(const page of pages){const item=document.createElement("li"),entry=item.appendChild(document.createElement("span")),a=entry.appendChild(document.createElement("a"));entry.classList.add('flex')
a.href=page.href;a.textContent=page.title;a.classList.add('gdoc-search__entry')
if(target){target.appendChild(item);continue}
items.push(item);}
return items;}
function fetchErrors(response){if(!response.ok){throw Error(response.statusText);}
return response;}
function getJson(src,callback){fetch(src).then(fetchErrors).then(response=>response.json()).then(json=>callback(json)).catch(function(error){console.log(error);});}
function flattenHits(results){const items=[];const map=new Map();for(const field of results){for(const page of field.result){if(!map.has(page.doc.href)){map.set(page.doc.href,true);items.push(page.doc);}}}
return items}
function loadScript(src,callback){let script=document.createElement('script');script.defer=true;script.async=false;script.src=src;script.onload=callback;document.body.appendChild(script);}})();