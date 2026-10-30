(()=>{'use strict';
const $=id=>document.getElementById(id);
const snippets={
all:"SELECT order_id, order_date, customer_id,\n       product_id, quantity, status\nFROM orders\nORDER BY order_date DESC\nLIMIT 20;",
revenue:"SELECT c.region,\n       COUNT(*) AS orders,\n       ROUND(SUM(o.quantity * p.unit_price), 2) AS revenue\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id\nJOIN products p ON o.product_id = p.product_id\nWHERE o.status = 'Completed'\nGROUP BY c.region\nORDER BY revenue DESC;",
category:"SELECT p.category,\n       COUNT(o.order_id) AS orders,\n       ROUND(SUM(o.quantity * p.unit_price), 2) AS revenue\nFROM orders o\nJOIN products p ON o.product_id = p.product_id\nWHERE o.status = 'Completed'\nGROUP BY p.category\nORDER BY revenue DESC;",
ranking:"WITH by_customer AS (\n  SELECT c.customer_name,\n         ROUND(SUM(o.quantity * p.unit_price), 2) AS revenue\n  FROM orders o\n  JOIN customers c ON o.customer_id = c.customer_id\n  JOIN products p ON o.product_id = p.product_id\n  WHERE o.status = 'Completed'\n  GROUP BY c.customer_id\n)\nSELECT customer_name, revenue,\n       DENSE_RANK() OVER (ORDER BY revenue DESC) AS rank\nFROM by_customer\nORDER BY rank;",
returns:"SELECT p.category,\n       COUNT(*) AS total_orders,\n       SUM(CASE WHEN o.status = 'Returned' THEN 1 ELSE 0 END) AS returned,\n       ROUND(100.0 * SUM(CASE WHEN o.status = 'Returned' THEN 1 ELSE 0 END) / COUNT(*), 1) AS return_pct\nFROM orders o JOIN products p ON o.product_id = p.product_id\nGROUP BY p.category\nORDER BY return_pct DESC;",
monthly:"SELECT SUBSTR(o.order_date, 1, 7) AS month,\n       COUNT(*) AS completed_orders,\n       ROUND(SUM(o.quantity * p.unit_price), 2) AS revenue\nFROM orders o JOIN products p ON o.product_id = p.product_id\nWHERE o.status = 'Completed'\nGROUP BY SUBSTR(o.order_date, 1, 7)\nORDER BY month;"
};
let engine=null,db=null,latest={columns:[],values:[]},initialized=false;
const status=(text,good=false)=>{$('engine-state').textContent=text;$('engine-state').style.color=good?'#9af5ca':'#ffcc87'};
function buildDatabase(){
 if(!engine)return;
 if(db){db.close();db=null}
 db=new engine.Database();
 db.run('CREATE TABLE customers (customer_id TEXT PRIMARY KEY, customer_name TEXT, region TEXT, segment TEXT);');
 db.run('CREATE TABLE products (product_id TEXT PRIMARY KEY, product_name TEXT, category TEXT, unit_price REAL);');
 db.run('CREATE TABLE orders (order_id TEXT PRIMARY KEY, order_date TEXT, customer_id TEXT, product_id TEXT, quantity INTEGER, status TEXT);');
 const customers=[
 ['C001','Beacon Stores','South','Retail'],['C002','Field & Co','North','Wholesale'],['C003','Cedar Market','East','Retail'],['C004','Nexus Supply','London','Business'],
 ['C005','Harbour Trade','Wales','Wholesale'],['C006','Bright Goods','Midlands','Retail'],['C007','Oakfield Ltd','Scotland','Business'],['C008','Riverside Shop','South','Retail']];
 const products=[
 ['P001','Sensor Kit','Electronics',39.9],['P002','Power Cable','Electronics',14.5],['P003','Planner Notebook','Office',8.25],['P004','Monitor Stand','Office',49.99],['P005','Storage Crate','Warehouse',12.8],
 ['P006','Barcode Labels','Warehouse',3.75],['P007','Safety Gloves','Workwear',6.6],['P008','Hi-vis Vest','Workwear',11.9],['P009','USB Hub','Electronics',29.5],['P010','Dispatch Tape','Warehouse',2.85]];
 const a=db.prepare('INSERT INTO customers VALUES (?,?,?,?)');customers.forEach(row=>a.run(row));a.free();
 const b=db.prepare('INSERT INTO products VALUES (?,?,?,?)');products.forEach(row=>b.run(row));b.free();
 const c=db.prepare('INSERT INTO orders VALUES (?,?,?,?,?,?)');
 for(let i=1;i<=120;i++){
   const id='ORD-'+String(i).padStart(4,'0');
   const month=1+Math.floor((i-1)/15),day=1+(i*7)%28;
   const date='2026-'+String(month).padStart(2,'0')+'-'+String(day).padStart(2,'0');
   const customer=customers[(i*5+Math.floor(i/9))%customers.length][0];
   const product=products[(i*7+Math.floor(i/8))%products.length][0];
   const quantity=1+(i*3)%18;
   const status=i%11===0?'Returned':i%7===0?'Pending':'Completed';
   c.run([id,date,customer,product,quantity,status]);
 }
 c.free();
 db.run('PRAGMA query_only = ON;');
 initialized=true;latest={columns:[],values:[]};
 $('execute').disabled=false;$('export').disabled=true;
 $('result-summary').textContent='DATABASE READY / 138 SYNTHETIC RECORDS';
 status('SQLITE READY / 120 ORDERS',true);
}
function showResult(res){
 const head=$('columns'),body=$('data');head.replaceChildren();body.replaceChildren();
 if(!res.columns.length){const row=document.createElement('tr'),th=document.createElement('th');th.textContent='NO RESULT COLUMNS';row.append(th);head.append(row);const rr=document.createElement('tr'),td=document.createElement('td');td.textContent='The query completed with no tabular results.';rr.append(td);body.append(rr);return}
 const heading=document.createElement('tr');
 res.columns.forEach(name=>{const th=document.createElement('th');th.textContent=name;heading.append(th)});head.append(heading);
 if(!res.values.length){const tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=res.columns.length;td.textContent='No matching rows.';td.className='empty';tr.append(td);body.append(tr);return}
 res.values.slice(0,500).forEach(row=>{const tr=document.createElement('tr');row.forEach(v=>{const td=document.createElement('td');td.textContent=v==null?'NULL':String(v);tr.append(td)});body.append(tr)});
 if(res.values.length>500){const tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=res.columns.length;td.textContent='Displaying the first 500 rows. Export CSV to retrieve all rows in the current result.';tr.append(td);body.append(tr)}
}
function execute(){
 if(!db){status('SQL ENGINE NOT READY');return}
 const query=$('query').value.trim();
 if(query.length>12000){status('QUERY TOO LONG');return}
 let normalized=query.replace(/;\s*$/,'').trim();
 if(!/^(SELECT|WITH)\b/i.test(normalized)||normalized.includes(';')){status('READ-ONLY SELECT OR WITH QUERIES ONLY');$('query-note').textContent='This lab accepts a single SELECT or WITH statement. Data-changing commands are disabled.';return}
 const start=performance.now();
 try{
   const result=db.exec(normalized);
   latest=result[0]?{columns:result[0].columns,values:result[0].values}:{columns:[],values:[]};
   showResult(latest);$('export').disabled=!latest.values.length;
   const ms=Math.round(performance.now()-start);
   $('result-summary').textContent=latest.values.length+' ROWS / '+latest.columns.length+' COLUMNS / '+ms+' MS';
   $('query-note').textContent='Executed locally in SQLite WebAssembly. Synthetic data only. Results are not stored on a server.';
   status('QUERY COMPLETE / '+ms+' MS',true);
 }catch(e){status('SQL ERROR');$('query-note').textContent=e.message}
}
function escapeCsv(v){let text=String(v??'');if(/^[\s]*[=+@]/.test(text)||/^[\s]*-[^\d]/.test(text))text="'"+text;return '"'+text.replace(/"/g,'""')+'"'}
function exportCsv(){
 const rows=[latest.columns,...latest.values];
 const blob=new Blob(['\uFEFF'+rows.map(row=>row.map(escapeCsv).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});
 const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='sql-query-lab-results.csv';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
}
$('execute').addEventListener('click',execute);
$('query').addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();execute()}});
$('format').addEventListener('click',()=>{$('query').value=$('query').value.trim().replace(/\t/g,'  ');$('query').focus()});
document.querySelectorAll('[data-example]').forEach(button=>button.addEventListener('click',()=>{$('query').value=snippets[button.dataset.example];document.querySelectorAll('[data-example]').forEach(b=>b.classList.toggle('active',b===button));execute()}));
$('reset').addEventListener('click',()=>{buildDatabase();$('query').value=snippets.revenue;execute()});
$('export').addEventListener('click',exportCsv);
async function boot(){
 try{
  if(typeof window.initSqlJs!=='function')throw Error('SQLite library is unavailable. Check your internet connection.');
  status('DOWNLOADING SQLITE WEBASSEMBLY...');
  engine=await window.initSqlJs({locateFile:filename=>'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/'+filename});
  buildDatabase();execute();
 }catch(e){status('ENGINE UNAVAILABLE');$('query-note').textContent='Could not start SQLite: '+e.message+'. Refresh with an internet connection to load the WebAssembly engine.';}
}
boot();
})();
