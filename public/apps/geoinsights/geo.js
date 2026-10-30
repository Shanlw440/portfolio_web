(()=>{'use strict';
const $=id=>document.getElementById(id);
let map=null,layer=null,focus=null,points=[],unresolved=[],mode='none';
const API='https://api.postcodes.io';
const clean=s=>String(s||'').trim().toUpperCase().replace(/\s+/g,'');
const isCoord=p=>Number.isFinite(p?.latitude)&&Number.isFinite(p?.longitude);
const status=(text,type='')=>{$('status').textContent=text;$('status').className='status '+type};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function request(url,options){
 const control=new AbortController();
 const timer=setTimeout(()=>control.abort(),16000);
 try{const response=await fetch(url,{...options,signal:control.signal});let data;
 try{data=await response.json()}catch{throw Error('Geodata provider returned an invalid response.')}
 if(!response.ok||data.status>=400)throw Error(data.error||'Postcode service returned HTTP '+response.status);
 return data.result;
 }finally{clearTimeout(timer)}
}
function initMap(){
 if(!window.L){$('map').innerHTML='<div class="empty">The interactive map could not load. Check your internet connection.</div>';status('Map library is unavailable. Geocoding still works when the postcode service is reachable.','warn');return}
 map=L.map('map',{scrollWheelZoom:false}).setView([54.2,-2.5],5);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>'}).addTo(map);
 layer=L.layerGroup().addTo(map);
}
function makeProfile(p){
 $('profile').replaceChildren();
 if(!p){$('profile').innerHTML='<div class="empty">No postcode selected.</div>';return}
 const title=document.createElement('div');title.className='postcode';title.textContent=p.postcode;$('profile').append(title);
 const entries=[
 ['Local authority',p.admin_district||'Not reported'],
 ['Ward',p.admin_ward||'Not reported'],
 ['Region / country',(p.region||p.country||'Not reported')],
 ['Constituency',p.parliamentary_constituency_2024||p.parliamentary_constituency||'Not reported'],
 ['Coordinates',p.latitude.toFixed(5)+', '+p.longitude.toFixed(5)]
 ];
 entries.forEach(([label,value])=>{const d=document.createElement('div');d.className='detail';const small=document.createElement('small'),strong=document.createElement('strong');small.textContent=label.toUpperCase();strong.textContent=value;d.append(small,strong);$('profile').append(d)});
}
function render(){
 $('mapped').textContent=points.length.toLocaleString('en-GB');
 $('authorities').textContent=new Set(points.map(p=>p.admin_district||'Unknown')).size;
 $('countries').textContent=new Set(points.map(p=>p.country||'Unknown')).size;
 $('unresolved').textContent=unresolved.length;
 $('export').disabled=points.length===0;
 $('map-mode').textContent=(mode==='nearest'?'NEAREST POSTCODES':mode==='batch'?'BATCH GEOCODING':mode==='single'?'POSTCODE LOOKUP':'AWAITING LOCATION SIGNAL')+' / '+points.length+' POINTS';
 $('map-summary').textContent=points.length+' mapped postcode centroid'+(points.length===1?'':'s')+(unresolved.length?' / '+unresolved.length+' unresolved':'')+'. Select a map marker or a record to inspect its area.';
 if(map){layer.clearLayers();const bounds=[];
 points.forEach((p,i)=>{
  const marker=L.circleMarker([p.latitude,p.longitude],{radius:mode==='single'?10:7,color:'#0c1d26',weight:2,fillColor:p===focus?'#70f4df':'#baadff',fillOpacity:.95}).addTo(layer);
  marker.bindPopup('<strong>'+esc(p.postcode)+'</strong><br>'+esc(p.admin_district||'Unknown district'));
  marker.on('click',()=>select(i));
  bounds.push([p.latitude,p.longitude]);
 });
 if(bounds.length===1)map.setView(bounds[0],12);
 else if(bounds.length>1)map.fitBounds(bounds,{padding:[26,26],maxZoom:12});
 else map.setView([54.2,-2.5],5);
 setTimeout(()=>map.invalidateSize(),60);
 }
 makeProfile(focus||points[0]||null);
 const list=$('records');list.replaceChildren();
 if(!points.length)list.innerHTML='<div class="empty">No mapped records yet.</div>';
 points.forEach((p,i)=>{const b=document.createElement('button');b.type='button';b.className='record';b.style.width='100%';b.style.textAlign='left';b.style.cursor='pointer';b.setAttribute('aria-label','Inspect postcode '+p.postcode);const left=document.createElement('span'),right=document.createElement('b');left.textContent=p.postcode;right.textContent=p.admin_district||'Unknown';b.append(left,right);b.addEventListener('click',()=>select(i));list.append(b)});
 const counts=new Map();points.forEach(p=>{const k=p.admin_district||'Unknown district';counts.set(k,(counts.get(k)||0)+1)});
 const chart=$('district-chart');chart.replaceChildren();
 if(!counts.size){chart.className='empty';chart.textContent='Area frequencies will appear here.';return}
 chart.className='';const sorted=[...counts.entries()].sort((a,b)=>b[1]-a[1]),max=sorted[0][1];
 sorted.forEach(([name,count])=>{const line=document.createElement('div');line.className='district-row';const text=document.createElement('span'),bar=document.createElement('div'),fill=document.createElement('b'),value=document.createElement('strong');text.textContent=name;bar.className='district-bar';fill.style.width=(count/max*100)+'%';bar.append(fill);value.textContent=count;line.append(text,bar,value);chart.append(line)});
}
function select(i){focus=points[i];makeProfile(focus);if(map)map.panTo([focus.latitude,focus.longitude]);}
function setData(list,unknown,kind){points=list.filter(isCoord);unresolved=unknown;mode=kind;focus=points[0]||null;render();}
async function single(){
 const pc=clean($('postcode').value);if(pc.length<5){status('Please enter a complete UK postcode.','warn');return}
 $('lookup').disabled=true;status('Looking up '+pc+' ...');
 try{const result=await request(API+'/postcodes/'+encodeURIComponent(pc));if(!isCoord(result))throw Error('Postcode was found but does not have usable coordinates.');
 setData([result],[],'single');$('nearby').disabled=false;status('Located '+result.postcode+' in '+(result.admin_district||result.country)+'.','good');
 }catch(err){status('Lookup failed: '+err.message,'error')}finally{$('lookup').disabled=false}
}
async function nearest(){
 const pc=clean($('postcode').value),radius=$('radius').value;
 if(!pc){status('Look up a postcode first.','warn');return}
 $('nearby').disabled=true;status('Finding postcode centroids within '+radius+' metres...');
 try{const result=await request(API+'/postcodes/'+encodeURIComponent(pc)+'/nearest?limit=30&radius='+encodeURIComponent(radius));
 if(!Array.isArray(result))throw Error('Unexpected nearest-location data.');
 setData(result,[],'nearest');status('Mapped '+points.length+' nearby postcode centroids.','good');
 }catch(err){status('Nearby search failed: '+err.message,'error')}finally{$('nearby').disabled=false}
}
async function batch(){
 const pcs=[...new Set($('batch').value.split(/[,;\n\r]+/).map(clean).filter(Boolean))];
 if(!pcs.length){status('Paste one or more UK postcodes first.','warn');return}
 if(pcs.length>30){status('Please analyse at most 30 distinct postcodes at a time.','warn');return}
 $('batch-run').disabled=true;status('Geocoding '+pcs.length+' postcodes through Postcodes.io ...');
 try{
 const results=await request(API+'/postcodes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({postcodes:pcs})});
 if(!Array.isArray(results))throw Error('Unexpected batch response.');
 const found=[],missing=[];
 for(const r of results){if(isCoord(r.result))found.push(r.result);else missing.push(r.query||'Unknown')}
 setData(found,missing,'batch');$('nearby').disabled=true;
 status('Batch complete: '+found.length+' mapped, '+missing.length+' unresolved.',missing.length?'warn':'good');
 }catch(err){status('Batch lookup failed: '+err.message,'error')}finally{$('batch-run').disabled=false}
}
function exportCsv(){
 const columns=['postcode','latitude','longitude','country','region','admin_district','admin_ward','parliamentary_constituency_2024'];
 const safe=v=>{let t=String(v??'');if(/^[\s]*[=+@]/.test(t)||/^[\s]*-[^\d]/.test(t))t="'"+t;return '"'+t.replace(/"/g,'""')+'"'};
 const output=[columns.map(safe).join(','),...points.map(p=>columns.map(k=>safe(p[k])).join(','))].join('\r\n');
 const blob=new Blob(['\uFEFF'+output],{type:'text/csv;charset=utf-8'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='geoinsights-postcodes.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
}
$('lookup').addEventListener('click',single);$('nearby').addEventListener('click',nearest);
$('postcode').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();single()}});
$('batch-run').addEventListener('click',batch);
$('example').addEventListener('click',()=>{$('batch').value='SW1A 1AA\nNW1 9HZ\nEC1A 1BB\nBR8 7RE';batch()});
$('clear').addEventListener('click',()=>{$('batch').value='';$('postcode').value='';$('nearby').disabled=true;setData([],[],'none');status('Map cleared. Enter a postcode to begin.')});
$('export').addEventListener('click',exportCsv);
initMap();
})();
