(()=>{'use strict';
const $=id=>document.getElementById(id);
const state={a:null,b:null,dataA:null,dataB:null,results:[],stats:{},filter:'all',warnings:[]};
const LIMIT=20000,FILE_LIMIT=15*1024*1024;
const clean=v=>String(v??'').trim();
const escCsv=v=>{let t=String(v??'');if(/^[\t\r\n ]*[=+@]/.test(t)||/^[\t\r\n ]*-[^\d]/.test(t))t="'"+t;return '"'+t.replace(/"/g,'""')+'"';};
const setStatus=(s,type='')=>{$('status').textContent=s;$('status').className='status '+type};
function parseCsv(s){const out=[];let row=[],cell='',q=false;
for(let i=0;i<s.length;i++){const c=s[i];if(c==='"'){if(q&&s[i+1]==='"'){cell+='"';i++}else q=!q;}else if(c===','&&!q){row.push(cell);cell=''}else if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&s[i+1]==='\n')i++;row.push(cell);if(row.some(v=>v!==''))out.push(row);row=[];cell=''}else cell+=c;}
if(q)throw new Error('CSV has an unclosed quoted value.');
row.push(cell);if(row.some(v=>v!==''))out.push(row);return out;}
async function upload(side,file){
 if(!file)return;if(file.size>FILE_LIMIT){setStatus('File too large. Maximum size is 15 MB per input.','error');return;}
 try{
  setStatus('Reading '+file.name+' ...');
  const sheets={};
  const ext=(file.name.split('.').pop()||'').toLowerCase();
  if(ext==='csv'){sheets['CSV data']=parseCsv(await file.text());}
  else if(['xlsx','xls','xlsm'].includes(ext)){
   if(!window.XLSX)throw new Error('Excel reader could not load. Check internet access or use CSV.');
   const bytes=await file.arrayBuffer();
   const book=window.XLSX.read(bytes,{type:'array',cellDates:false});
   for(const name of book.SheetNames){sheets[name]=window.XLSX.utils.sheet_to_json(book.Sheets[name],{header:1,raw:false,defval:'',blankrows:false});}
  } else throw new Error('Please choose a supported CSV or Excel workbook.');
  if(!Object.keys(sheets).length)throw new Error('No readable worksheets found.');
  state[side]={name:file.name,sheets,sheetNames:Object.keys(sheets)};
  refreshSheet(side);
  setStatus('Loaded '+file.name+'. Choose the matching key and run comparison.','good');
 }catch(err){state[side]=null;refreshSheet(side);setStatus('Could not open file: '+err.message,'error')}
 sync();
}
function refreshSheet(side){
 const obj=state[side],sel=$('sheet-'+side);
 sel.innerHTML='';
 if(!obj){sel.disabled=true;sel.add(new Option('Choose a workbook',''));$('file-'+side+'-name').textContent='No workbook loaded';return}
 obj.sheetNames.forEach(n=>sel.add(new Option(n,n)));
 sel.disabled=false;$('file-'+side+'-name').textContent=obj.name+' / '+obj.sheetNames.length+' sheet(s)';
}
function sheetData(side){
 const obj=state[side];if(!obj)return null;
 const matrix=obj.sheets[$('sheet-'+side).value]||[];
 if(!matrix.length)throw new Error('Selected worksheet has no data.');
 const headers=matrix[0].map(clean);const accepted=headers.filter(Boolean);
 if(accepted.length!==new Set(accepted).size)throw new Error('Duplicate column headings in '+obj.name+'. Rename these headings before comparing.');
 if(!headers.some(Boolean))throw new Error('Header row is empty in '+obj.name+'.');
 const rows=[];
 let count=0;
 for(const arr of matrix.slice(1)){
   if(!arr.some(c=>clean(c)!==''))continue;
   if(++count>LIMIT)throw new Error('More than 20,000 data rows in '+obj.name+'. Please split the worksheet.');
   const record={};headers.forEach((name,i)=>{if(name)record[name]=clean(arr[i]);});rows.push(record);
 }
 return {headers:accepted,rows,name:obj.name};
}
function sync(){
 $('run').disabled=true;const select=$('key');const previous=select.value;select.innerHTML='';select.disabled=true;
 if(!state.a||!state.b){select.add(new Option('Load both files first',''));return}
 try{
  state.dataA=sheetData('a');state.dataB=sheetData('b');
  const shared=state.dataA.headers.filter(x=>state.dataB.headers.includes(x));
  if(!shared.length){select.add(new Option('No matching columns',''));setStatus('Files have no common column names.','warn');return}
  shared.forEach(h=>select.add(new Option(h,h)));
  if(shared.includes(previous))select.value=previous;
  else{const preferred=shared.find(x=>/^(id|record[_ ]?id|sku|key|invoice[_ ]?(number|id)|order[_ ]?(number|id))$/i.test(x));select.value=preferred||shared[0];}
  select.disabled=false;$('run').disabled=false;
 }catch(err){select.add(new Option('Cannot read worksheet',''));setStatus(err.message,'error')}
}
function collect(data,key,label){
 const group=new Map(),blank=[];
 data.rows.forEach((r,i)=>{const id=clean(r[key]);if(!id){blank.push({status:'duplicate',key:'(blank)',field:key,old:label==='OLDER'?'row '+(i+2):'',new:label==='NEWER'?'row '+(i+2):'',note:label+' row '+(i+2)+' has no matching key'});return}
 if(!group.has(id))group.set(id,[]);group.get(id).push(r)});
 const valid=new Map(),bad=[];
 for(const [id,rows] of group){if(rows.length>1){bad.push({status:'duplicate',key:id,field:key,old:label==='OLDER'?rows.length+' occurrences':'',new:label==='NEWER'?rows.length+' occurrences':'',note:'Non-unique '+label.toLowerCase()+' key. Excluded from matching.'})}else valid.set(id,rows[0]);}
 return {valid,bad:[...blank,...bad],badKeys:new Set([...group].filter(([,arr])=>arr.length>1).map(([k])=>k))};
}
function compare(){
 try{
  if(!state.dataA||!state.dataB)return;
  const key=$('key').value;const A=collect(state.dataA,key,'OLDER'),B=collect(state.dataB,key,'NEWER');
  const excluded=new Set([...A.badKeys,...B.badKeys]);
  const fields=[...new Set([...state.dataA.headers,...state.dataB.headers])].filter(x=>x!==key);
  const results=[...A.bad,...B.bad];const stats={added:0,removed:0,changed:0,same:0,duplicate:A.bad.length+B.bad.length};
  for(const [id,old] of A.valid){if(excluded.has(id))continue;
   const newer=B.valid.get(id);
   if(!newer){stats.removed++;results.push({status:'removed',key:id,field:'(record)',old:'Present',new:'',note:'Record removed'});continue}
   let n=0;
   for(const field of fields){const from=old[field]??'',to=newer[field]??'';if(from!==to){n++;results.push({status:'changed',key:id,field,old:from,new:to,note:'Field updated'})}}
   if(n)stats.changed++;else stats.same++;
  }
  for(const [id] of B.valid){if(!A.valid.has(id)&&!excluded.has(id)){stats.added++;results.push({status:'added',key:id,field:'(record)',old:'',new:'Present',note:'New record'})}}
  results.sort((a,b)=>{const order={changed:0,added:1,removed:2,duplicate:3};return order[a.status]-order[b.status]||a.key.localeCompare(b.key)});
  state.results=results;state.stats=stats;
  ['added','removed','changed','same'].forEach(x=>$('count-'+x).textContent=stats[x].toLocaleString('en-GB'));
  $('export').disabled=!results.length;
  $('report-meta').textContent=(state.dataA.rows.length+' older rows / '+state.dataB.rows.length+' newer rows / '+fields.length+' comparison fields / key: '+key+' / '+stats.duplicate+' key issues');
  $('report-note').textContent=stats.duplicate?'Warning: '+stats.duplicate+' missing or duplicate key issues were excluded from record matching. Resolve them before treating the totals as a full audit.':'Match keys are unique and populated. All other common or newly added columns are compared using displayed text, with leading and trailing spaces trimmed.';
  render();
  setStatus('Comparison complete. '+stats.changed+' changed, '+stats.added+' added, '+stats.removed+' removed, '+stats.duplicate+' key issues.','good');
 }catch(err){setStatus('Comparison failed: '+err.message,'error')}
}
function render(){
 document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===state.filter));
 const filtered=state.results.filter(x=>state.filter==='all'||state.filter===x.status);
 const tbody=$('report-rows');tbody.replaceChildren();
 if(!filtered.length){const tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=5;td.className='empty';td.textContent=state.results.length?'Nothing in this filter.':'No differences found. The records may match.';tr.append(td);tbody.append(tr);return;}
 filtered.slice(0,1200).forEach(r=>{const tr=document.createElement('tr');
 [r.status.toUpperCase(),r.key,r.field,r.old,r.new].forEach((v,i)=>{const td=document.createElement('td');td.textContent=v;if(i===0){const tag=document.createElement('span');tag.className='tag '+r.status;tag.textContent=v;td.textContent='';td.append(tag)}tr.append(td)});tbody.append(tr)});
 if(filtered.length>1200){const tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=5;td.className='empty';td.textContent='Showing the first 1,200 result rows. Export CSV for the full report ('+filtered.length+' rows).';tr.append(td);tbody.append(tr);}
}
function exportCsv(){
 const fields=['status','key','field','old','new','note'];const lines=[fields.map(escCsv).join(',')];
 state.results.forEach(r=>lines.push(fields.map(k=>escCsv(r[k])).join(',')));
 const blob=new Blob(['\uFEFF'+lines.join('\r\n')],{type:'text/csv;charset=utf-8;'});
 const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='spreadsheet-comparison-differences.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
}
function demo(){
 const old=[['Record ID','Item','Quantity','Unit Price','Owner'],['ST-001','Sensors',100,18.5,'Alex'],['ST-002','Power leads',50,12,'Bruna'],['ST-003','Boxes',220,1.8,'Jaz'],['ST-004','Filters',90,8.2,'Dan']];
 const newer=[['Record ID','Item','Quantity','Unit Price','Owner'],['ST-001','Sensors',125,18.5,'Alex'],['ST-002','Power leads',50,12,'Bruna'],['ST-004','Filters',90,9.1,'Dan'],['ST-005','Packaging',130,2.25,'Jaz']];
 state.a={name:'example_old.csv',sheets:{'CSV data':old},sheetNames:['CSV data']};state.b={name:'example_new.csv',sheets:{'CSV data':newer},sheetNames:['CSV data']};
 refreshSheet('a');refreshSheet('b');sync();$('key').value='Record ID';compare();
}
$('file-a').addEventListener('change',e=>upload('a',e.target.files[0]));
$('file-b').addEventListener('change',e=>upload('b',e.target.files[0]));
$('sheet-a').addEventListener('change',sync);$('sheet-b').addEventListener('change',sync);
$('run').addEventListener('click',compare);$('demo').addEventListener('click',demo);$('export').addEventListener('click',exportCsv);
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{state.filter=b.dataset.filter;render()}));
})();
