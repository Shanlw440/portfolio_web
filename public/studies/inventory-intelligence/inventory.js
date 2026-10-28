/* INVENTORY / OS — analytical sandbox, not a production inventory system.
   All example item data is SYNTHETIC. No personal, employer or live operational data.
   Deterministic safety stock: ceil(z * sigma_daily * sqrt(lead_time)).
   Simple order-up-to policy: trigger if on_hand <= ROP; target = demand*(L+14) + buffer(L+14).
   This demonstrates a fixed-lead-time, independent, normally distributed daily-demand approximation.
*/
(() => {
  "use strict";
  const ITEMS = [
    {id:"A1",sku:"DEMO-001",name:"Solar Chargers",class:"ENERGY",daily:42,sigma:13,stock:430,unitCost:29,col:0,row:0},
    {id:"B2",sku:"DEMO-002",name:"Sensor Modules",class:"COMPONENTS",daily:24,sigma:6,stock:170,unitCost:95,col:1,row:0},
    {id:"C3",sku:"DEMO-003",name:"Smart Valves",class:"AUTOMATION",daily:18,sigma:7,stock:410,unitCost:38,col:2,row:0},
    {id:"D4",sku:"DEMO-004",name:"Medical Kits",class:"SUPPLIES",daily:31,sigma:11,stock:210,unitCost:64,col:3,row:0},
    {id:"E5",sku:"DEMO-005",name:"Battery Packs",class:"ENERGY",daily:54,sigma:19,stock:690,unitCost:31,col:0,row:1},
    {id:"F6",sku:"DEMO-006",name:"Optical Lenses",class:"PRECISION",daily:14,sigma:5,stock:120,unitCost:112,col:1,row:1},
    {id:"G7",sku:"DEMO-007",name:"Control Boards",class:"ELECTRONICS",daily:22,sigma:9,stock:345,unitCost:72,col:2,row:1},
    {id:"H8",sku:"DEMO-008",name:"Filter Cartridges",class:"SUPPLIES",daily:64,sigma:16,stock:375,unitCost:14,col:3,row:1}
  ];
  const SERVICE_Z = {90:1.2816,95:1.6449,98:2.0537,99:2.3263};
  const REVIEW_DAYS=14, HORIZON=42;
  const ROOT=document.documentElement;
  const fmt = n=>Math.round(n).toLocaleString("en-GB");
  const $=id=>document.getElementById(id);
  const state={selected:"A1",demand:100,lead:9,service:95,receipts:true,overrides:{}};

  function model(item){
    const d=item.daily*state.demand/100;
    const sigma=item.sigma*state.demand/100;
    const L=state.lead;
    const z=SERVICE_Z[state.service];
    const onHand=Object.hasOwn(state.overrides,item.id)?state.overrides[item.id]:item.stock;
    const safety=Math.ceil(z*sigma*Math.sqrt(L));
    const rop=Math.ceil(d*L+safety);
    const target=Math.ceil(d*(L+REVIEW_DAYS)+z*sigma*Math.sqrt(L+REVIEW_DAYS));
    const cover=onHand/d;
    const needsOrder=onHand<=rop;
    const quantity=needsOrder?Math.max(0,target-onHand):0;
    const status=cover<L?"CRITICAL":needsOrder?"REORDER":"HEALTHY";
    return {item,d,sigma,safety,rop,target,onHand,cover,quantity,status,needsOrder,L,unitCost:item.unitCost};
  }
  function current(){return model(ITEMS.find(item=>item.id===state.selected));}
  function all(){return ITEMS.map(model);}
  function statusColor(status){return status==="CRITICAL"?"#ff765f":status==="REORDER"?"#ebc170":"#d6f08d";}
  function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function select(id,scroll=false){
    if(!ITEMS.some(item=>item.id===id))return;
    state.selected=id;
    const item=ITEMS.find(x=>x.id===id);
    $("stock-slider").value=Object.hasOwn(state.overrides,id)?state.overrides[id]:item.stock;
    render();
    if(scroll)$("planner").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
  }
  function renderList(){
    $("node-list").innerHTML=all().map(m=>'<button type="button" class="node-button" data-select="'+m.item.id+'" aria-pressed="'+(m.item.id===state.selected)+'" aria-label="Select '+esc(m.item.name)+'"><span class="node-code">'+m.item.id+'</span><span class="node-text">'+esc(m.item.name)+'</span><span class="node-indicator '+m.status+'"></span></button>').join("");
  }
  function warehouseFloor(){
    let grid='';
    for(let i=0;i<10;i++){
      const x=165+i*62;
      grid+='<path d="M'+x+' 166 L'+(x-320)+' 390" stroke="#8fb65f" stroke-opacity=".11" stroke-width="1"/>';
      grid+='<path d="M'+(175+i*55)+' 500 L'+(520+i*55)+' 300" stroke="#8fb65f" stroke-opacity=".11" stroke-width="1"/>';
    }
    return '<defs><linearGradient id="floorSurface" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#252b1c"/><stop offset=".53" stop-color="#13190f"/><stop offset="1" stop-color="#222717"/></linearGradient><linearGradient id="rackFace" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#4b5735"/><stop offset="1" stop-color="#252d20"/></linearGradient><radialGradient id="radar"><stop stop-color="#baf789" stop-opacity=".14"/><stop offset="1" stop-color="#baf789" stop-opacity="0"/></radialGradient></defs>'+
      '<circle cx="465" cy="272" r="250" fill="url(#radar)"/>'+
      '<path d="M72 355 L468 130 L864 358 L468 566 Z" fill="url(#floorSurface)" stroke="#99bd70" stroke-opacity=".6" stroke-width="1.8"/>'+
      '<path d="M90 355 L467 143 L844 357 L468 550 Z" fill="none" stroke="#e2eeb1" stroke-dasharray="5 10" stroke-opacity=".15"/>'+
      grid+
      '<path d="M468 134L468 556M81 355L850 355" stroke="#d3f6a1" stroke-dasharray="4 9" stroke-opacity=".24"/>'+
      '<g fill="none" stroke="#e4f6ac" stroke-opacity=".25"><circle cx="468" cy="350" r="140"/><circle cx="468" cy="350" r="220" stroke-dasharray="3 12"/></g>'+
      '<g stroke="#7e9e5e" fill="#1c2519"><path d="M67 360l36-18 35 18-36 18Z"/><path d="M807 367l38-19 35 19-38 20Z"/></g>'+
      '<g font-family="monospace" font-size="11" fill="#7e9c6d" letter-spacing="2"><text x="122" y="493">ZONE / 01</text><text x="700" y="491">WAREHOUSE / A</text></g>';
  }
  function rackSvg(m){
    const c=m.item.col,r=m.item.row;
    const x=324+(c-r)*117,y=198+(c+r)*54;
    const h=60 + Math.min(23,Math.round(m.onHand/90));
    const top=y-h;
    const t1=[x,top],t2=[x+58,top-27],t3=[x+116,top],t4=[x+58,top+27];
    const frontBottom=y+27;
    const color=statusColor(m.status),selected=m.item.id===state.selected;
    const pts=arr=>arr.join(",");
    const topPts=[t1,t2,t3,t4].map(pts).join(" ");
    const leftPts=[[x,top],[x+58,top+27],[x+58,y+27],[x,y]].map(pts).join(" ");
    const rightPts=[[x+58,top+27],[x+116,top],[x+116,y],[x+58,y+27]].map(pts).join(" ");
    let shelves='';
    for(let i=1;i<=3;i++){
      const yy=top+27+(h/4)*i;
      shelves+='<path d="M'+(x+58)+' '+yy+'L'+(x+116)+' '+(yy-27)+' M'+(x+58)+' '+yy+'L'+x+' '+(yy-27)+'" stroke="#829d68" stroke-opacity=".45" stroke-width="1"/>';
    }
    let crates='';
    for(let j=0;j<3;j++)for(let k=0;k<2;k++){
      const cx=x+64+j*14,cy=top+35+k*22+j*(-7);
      crates+='<path d="M'+cx+' '+cy+'l11 -5v12l-11 5Z" fill="'+color+'" fill-opacity=".14" stroke="'+color+'" stroke-opacity=".37" stroke-width=".7"/>';
    }
    return '<g class="rack-node'+(selected?' selected':'')+'" data-node="'+m.item.id+'" role="button" tabindex="0" aria-label="Select '+esc(m.item.name)+' inventory, '+m.status.toLowerCase()+'" aria-pressed="'+selected+'">'+
       '<ellipse cx="'+(x+62)+'" cy="'+(y+26)+'" rx="83" ry="28" fill="'+color+'" opacity=".07"/>'+
       '<polygon points="'+leftPts+'" fill="#22291c" stroke="#657c52" stroke-width="1.2"/>'+
       '<polygon points="'+rightPts+'" fill="url(#rackFace)" stroke="#7f9d67" stroke-width="1.2"/>'+
       '<polygon points="'+topPts+'" fill="'+(selected?'#586540':'#3e4932')+'" stroke="'+color+'" stroke-opacity=".86" stroke-width="'+(selected?2.6:1.2)+'"/>'+
       shelves+crates+
       '<polygon class="rack-outline" points="'+topPts+'" fill="none" stroke="#fcffd1" stroke-width="3"/>'+
       '<path d="M'+(x+12)+' '+(y-14)+'h24v18h-24Z" fill="#121a10" stroke="'+color+'" stroke-width="1"/>'+
       '<text x="'+(x+24)+'" y="'+(y-1)+'" fill="'+color+'" font-family="monospace" font-size="12" text-anchor="middle">'+m.item.id+'</text>'+
       '<circle cx="'+(x+105)+'" cy="'+(top+8)+'" r="4.2" fill="'+color+'"/>'+
       (selected?'<path d="M'+(x+58)+' '+(top-33)+'v-23m-11 8h22" stroke="'+color+'" stroke-width="1.5"/><rect x="'+(x+15)+'" y="'+(top-74)+'" width="91" height="18" rx="2" fill="#202a15" stroke="'+color+'"/><text x="'+(x+60)+'" y="'+(top-62)+'" fill="#ebfdac" font-family="monospace" font-size="10" text-anchor="middle">SELECTED / '+m.item.id+'</text>':'')+
       '</g>';
  }
  function renderWarehouse(){
    const models=all().sort((a,b)=>(a.item.col+a.item.row)-(b.item.col+b.item.row));
    $("warehouse-svg").innerHTML=warehouseFloor()+models.map(rackSvg).join("")+
      '<g pointer-events="none" opacity=".76"><path d="M166 430L214 403L254 426" stroke="#e5f38c" stroke-dasharray="3 8" fill="none" stroke-width="1.6"/><circle cx="213" cy="403" r="5" fill="#e2f789"/><path d="M215 376l-10 20h20Z" fill="#e4f48e"/></g>';
    $("stage-risk").textContent=all().filter(m=>m.status!=="HEALTHY").length.toString().padStart(2,"0");
    $("selection-foot").textContent="NODE "+state.selected+" / SELECTED";
  }
  function renderInspector(m){
    $("sku-id").textContent=m.item.id;
    $("sku-name").textContent=m.item.name;
    $("sku-meta").textContent=m.item.sku+" / "+m.item.class;
    $("inspector-status").textContent=m.status==="CRITICAL"?"CRITICAL · STOCKOUT RISK":m.status==="REORDER"?"REORDER TRIGGERED":"STABLE · MONITOR";
    $("inspector-status").className="inspector-status "+m.status;
    $("node-stock").textContent=fmt(m.onHand);
    $("node-demand").textContent=m.d.toFixed(1);
    $("node-cover").textContent=m.cover.toFixed(1);
    $("node-action").textContent=m.needsOrder?"ORDER "+fmt(m.quantity)+" UNITS":"NO ORDER YET";
    $("node-reason").textContent=m.status==="CRITICAL"?"Expected stock runs out before the next delivery could arrive. An urgent exception needs review.":m.status==="REORDER"?"On-hand is at/below the reorder point. Simulate a replenishment order.":"Current inventory is above the modelled trigger; monitor demand and lead time.";
  }
  function renderControls(m){
    $("control-id").textContent=m.item.id;
    $("control-name").textContent=m.item.name;
    $("demand-out").textContent=state.demand+"%";
    $("lead-out").textContent=state.lead+" DAYS";
    $("stock-out").textContent=fmt(m.onHand)+" U";
    $("demand-slider").value=state.demand;
    $("lead-slider").value=state.lead;
    $("stock-slider").value=m.onHand;
    $("order-toggle").checked=state.receipts;
    const target=document.querySelector('input[name="service"][value="'+state.service+'"]');
    if(target)target.checked=true;
    $("result-rop").textContent=fmt(m.rop);
    $("result-safety").textContent=fmt(m.safety);
    $("result-order").textContent=fmt(m.quantity);
    const decision=$("decision-message");
    decision.textContent=m.status==="CRITICAL"?"ESCALATE STOCKOUT RISK":m.needsOrder?"REPLENISH NOW":"MONITOR / NO ORDER";
    decision.className=m.status==="CRITICAL"?"critical-text":m.status==="REORDER"?"warn-text":"";
    $("decision-detail").textContent=m.status==="CRITICAL"
      ?"Cover "+m.cover.toFixed(1)+"d is shorter than lead time "+m.L+"d. Even the simulated order arrives after a projected shortage. Review expediting or alternatives."
      :m.needsOrder
        ?"On hand "+fmt(m.onHand)+" ≤ reorder "+fmt(m.rop)+". Order "+fmt(m.quantity)+" to the model's "+fmt(m.target)+"-unit order-up-to level."
        :"On hand "+fmt(m.onHand)+" exceeds reorder "+fmt(m.rop)+". This model does not trigger a purchase order yet.";
  }
  function renderChart(m){
    const w=960,h=325,left=57,right=24,top=31,bottom=43;
    const iw=w-left-right,ih=h-top-bottom;
    const arrival=state.receipts&&m.quantity>0?m.L:null;
    function inv(t){return m.onHand-m.d*t+(arrival!==null&&t>=arrival?m.quantity:0);}
    let points=[];
    for(let t=0;t<=HORIZON;t++){
      if(arrival!==null&&t===arrival)points.push([Math.max(0,t-.001),m.onHand-m.d*t]);
      points.push([t,inv(t)]);
    }
    const vals=points.map(x=>x[1]);
    const lo=Math.min(0,...vals),hi=Math.max(m.rop,...vals,100);
    const pad=Math.max(20,(hi-lo)*.08);
    const minY=lo-pad,maxY=hi+pad;
    const X=t=>left+t/HORIZON*iw, Y=v=>top+(maxY-v)/(maxY-minY)*ih;
    let s='<defs><linearGradient id="inv-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e7f983" stop-opacity=".24"/><stop offset="1" stop-color="#d5ee8d" stop-opacity="0"/></linearGradient></defs>';
    const baseY=Y(0);
    s+='<rect x="'+left+'" y="'+Math.max(top,baseY)+'" width="'+iw+'" height="'+Math.max(0,top+ih-Math.max(top,baseY))+'" fill="#ff705c" fill-opacity=".055"/>';
    for(let i=0;i<=4;i++){
      const val=minY+(maxY-minY)*i/4; const y=Y(val);
      s+='<line x1="'+left+'" y1="'+y.toFixed(2)+'" x2="'+(w-right)+'" y2="'+y.toFixed(2)+'" stroke="#8e977a" stroke-opacity=".22" stroke-dasharray="3 7"/><text x="'+(left-10)+'" y="'+(y+4).toFixed(2)+'" text-anchor="end" font-size="13" font-family="monospace" fill="#999f8a">'+fmt(val)+'</text>';
    }
    for(let day=0;day<=42;day+=7){const x=X(day);s+='<line x1="'+x+'" y1="'+top+'" x2="'+x+'" y2="'+(top+ih)+'" stroke="#929a7c" stroke-opacity=".10"/><text x="'+x+'" y="'+(h-18)+'" text-anchor="middle" font-size="13" font-family="monospace" fill="#a0a590">D'+day+'</text>';}
    const rpY=Y(m.rop);s+='<line x1="'+left+'" y1="'+rpY.toFixed(2)+'" x2="'+(w-right)+'" y2="'+rpY.toFixed(2)+'" stroke="#f0be70" stroke-width="2" stroke-dasharray="10 7"/>';
    s+='<rect x="'+(w-192)+'" y="'+(rpY-24)+'" width="165" height="20" fill="#27261e" opacity=".96"/><text x="'+(w-110)+'" y="'+(rpY-10)+'" text-anchor="middle" fill="#f3bf7b" font-size="11" font-family="monospace">REORDER '+fmt(m.rop)+'</text>';
    s+='<line x1="'+left+'" y1="'+baseY.toFixed(2)+'" x2="'+(w-right)+'" y2="'+baseY.toFixed(2)+'" stroke="#ff846e" stroke-opacity=".72" stroke-width="1.2"/>';
    if(arrival!==null){const x=X(arrival);s+='<line x1="'+x+'" y1="'+top+'" x2="'+x+'" y2="'+(top+ih)+'" stroke="#f98c77" stroke-width="2" stroke-dasharray="7 7"/><text x="'+Math.min(w-155,x+7)+'" y="'+(top+18)+'" fill="#ffaf94" font-size="12" font-family="monospace">ARRIVAL D'+arrival+'</text>';}
    const line=points.map((p,i)=>(i===0?'M':'L')+X(p[0]).toFixed(2)+' '+Y(p[1]).toFixed(2)).join(' ');
    const area=line+' L'+X(HORIZON).toFixed(2)+' '+Math.min(top+ih,baseY).toFixed(2)+' L'+X(0).toFixed(2)+' '+Math.min(top+ih,baseY).toFixed(2)+' Z';
    s+='<path d="'+area+'" fill="url(#inv-fill)"/><path d="'+line+'" fill="none" stroke="#e9fa83" stroke-width="3.8" stroke-linejoin="round" stroke-linecap="round"/>';
    const last=points[points.length-1];s+='<circle cx="'+X(last[0]).toFixed(2)+'" cy="'+Y(last[1]).toFixed(2)+'" r="5" fill="#eafa85" stroke="#121713" stroke-width="2"/>';
    $("forecast-chart").innerHTML=s;
    $("forecast-chart").setAttribute("aria-label","42-day expected stock projection for "+m.item.name+". On hand "+fmt(m.onHand)+" units; expected demand "+m.d.toFixed(1)+" units daily, reorder point "+fmt(m.rop)+"; "+(arrival!==null?"a suggested order of "+fmt(m.quantity)+" units arrives on day "+arrival:"no replenishment added")+". Values below zero indicate theoretical unmet demand, not physical negative stock.");
    $("forecast-badge").textContent=arrival!==null?"SUGGESTED RECEIPT / DAY "+arrival:state.receipts?"NO TRIGGERED RECEIPT":"DELIVERY SCENARIO OFF";
  }
  function renderTable(){
    $("planner-rows").innerHTML=all().map(m=>
      '<tr class="plan-row'+(m.item.id===state.selected?' active':'')+'" data-select="'+m.item.id+'" tabindex="0" role="button" aria-label="Select '+esc(m.item.name)+'">'+
      '<td class="item-name"><b>'+m.item.id+'</b>'+esc(m.item.name)+'</td>'+
      '<td>'+fmt(m.onHand)+'</td><td>'+m.d.toFixed(1)+'</td><td>'+fmt(m.safety)+'</td><td>'+fmt(m.rop)+'</td><td>'+fmt(m.quantity)+'</td><td>'+m.cover.toFixed(1)+'d</td>'+
      '<td><span class="status-chip '+m.status+'">'+m.status+'</span></td></tr>'
    ).join("");
  }
  function render(){
    const m=current();
    renderList();
    renderWarehouse();
    renderInspector(m);
    renderControls(m);
    renderChart(m);
    renderTable();
  }
  function csv(){
    const rows=[["node","sku","product","category","on_hand_units","daily_demand_units","daily_demand_sd_units","demand_shift_pct","lead_days","cycle_service_target_pct","safety_stock_units","reorder_point_units","order_up_to_units","suggested_order_units","days_cover","status","unit_cost_gbp","synthetic_demo"]];
    for(const m of all()){
      rows.push([m.item.id,m.item.sku,m.item.name,m.item.class,m.onHand,m.d.toFixed(2),m.sigma.toFixed(2),state.demand,m.L,state.service,m.safety,m.rop,m.target,m.quantity,m.cover.toFixed(2),m.status,m.unitCost,"YES"]);
    }
    const text=rows.map(row=>row.map(val=>'"'+String(val).replace(/"/g,'""')+'"').join(',')).join('\r\n');
    const blob=new Blob([text],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download="inventory-os-synthetic-plan.csv";document.body.append(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
  }
  function reset(){
    state.selected="A1";state.demand=100;state.lead=9;state.service=95;state.receipts=true;state.overrides={};render();
  }
  $("node-list").addEventListener("click",e=>{const b=e.target.closest("[data-select]");if(b)select(b.dataset.select)});
  $("warehouse-svg").addEventListener("click",e=>{const g=e.target.closest("[data-node]");if(g)select(g.dataset.node)});
  $("warehouse-svg").addEventListener("keydown",e=>{const g=e.target.closest("[data-node]");if(g&&(e.key==="Enter"||e.key===" ")){e.preventDefault();select(g.dataset.node)}});
  $("planner-rows").addEventListener("click",e=>{const tr=e.target.closest("[data-select]");if(tr)select(tr.dataset.select)});
  $("planner-rows").addEventListener("keydown",e=>{const tr=e.target.closest("[data-select]");if(tr&&(e.key==="Enter"||e.key===" ")){e.preventDefault();select(tr.dataset.select)}});
  $("inspect-button").addEventListener("click",()=>select(state.selected,true));
  $("demand-slider").addEventListener("input",e=>{state.demand=Number(e.target.value);render()});
  $("lead-slider").addEventListener("input",e=>{state.lead=Number(e.target.value);render()});
  $("stock-slider").addEventListener("input",e=>{state.overrides[state.selected]=Number(e.target.value);render()});
  document.querySelectorAll('input[name="service"]').forEach(input=>input.addEventListener("change",e=>{state.service=Number(e.target.value);render()}));
  $("order-toggle").addEventListener("change",e=>{state.receipts=e.target.checked;render()});
  $("reset-button").addEventListener("click",reset);
  $("export-button").addEventListener("click",csv);
  const progress=document.querySelector(".site-progress");
  let pending=false;
  function onScroll(){
    if(pending)return;pending=true;
    requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?(scrollY/max)*100:100)+"%";pending=false});
  }
  addEventListener("scroll",onScroll,{passive:true});
  onScroll();
  render();
})();
