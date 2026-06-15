
(function(){
if(document.getElementById('cvOverlay')){document.getElementById('cvOverlay').style.display='flex';return;}
var st=document.createElement('style');st.id='cvStyle';st.textContent='*{box-sizing:border-box;margin:0;padding:0;}body{font-family:\'Segoe UI\',Arial,sans-serif;background:#f0f4f8;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:20px;}.card{background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.13);width:100%;max-width:520px;overflow:hidden;}.header{background:linear-gradient(135deg,#1a4fa0 0%,#1565c0 100%);color:#fff;padding:22px 24px 18px;display:flex;align-items:center;gap:14px;}.header-icon{background:rgba(255,255,255,0.18);border-radius:50%;width:48px;height:48px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}.header h1{font-size:1.15rem;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;}.input-wrap{padding:18px 24px 0;}.input-wrap input{width:100%;padding:12px 16px;border:2px solid #d0d8e8;border-radius:8px;font-size:1rem;outline:none;transition:border-color 0.2s;background:#f7f9fc;}.input-wrap input:focus{border-color:#1a4fa0;background:#fff;}.dropdown-list{margin:6px 24px 0;border:1.5px solid #d0d8e8;border-radius:8px;overflow:hidden;display:none;max-height:200px;overflow-y:auto;background:#fff;position:relative;z-index:2147483642;}.dropdown-list.show{display:block;}.dropdown-item{padding:10px 16px;cursor:pointer;font-size:0.97rem;border-bottom:1px solid #f0f0f0;}.dropdown-item:last-child{border-bottom:none;}.dropdown-item:hover{background:#e8f0fe;color:#1a4fa0;font-weight:600;}.validade-banner{margin:16px 24px 0;background:linear-gradient(90deg,#e8f5e9,#f1f8e9);border-left:5px solid #2e7d32;border-radius:8px;padding:14px 18px;display:none;}.validade-banner.show{display:block;}.validade-banner h2{font-size:1.3rem;font-weight:800;color:#1b5e20;}.validade-banner p{font-size:0.82rem;color:#388e3c;margin-top:2px;}.validade-indeterminada h2{color:#5d4037!important;}.validade-indeterminada{border-left-color:#8d6e63!important;background:linear-gradient(90deg,#efebe9,#fbe9e7)!important;}.validade-indeterminada p{color:#6d4c41!important;}.sem-regras h2{color:#37474f!important;}.sem-regras{border-left-color:#607d8b!important;background:linear-gradient(90deg,#eceff1,#e3f2fd)!important;}.sem-regras p{color:#546e7a!important;}.regras{margin:12px 24px 0;display:none;}.regras.show{display:block;}.regra-item{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:8px;margin-bottom:7px;font-size:0.97rem;font-weight:600;}.regra-item.ok{background:#f1f8e9;color:#2e7d32;}.regra-item.nao{background:#fce4ec;color:#c62828;}.regra-item.parcial{background:#fff8e1;color:#e65100;}.regra-icon{font-size:1.2rem;flex-shrink:0;}.aviso-especial{margin:8px 24px 0;background:#fff8e1;border-left:4px solid #ffa000;border-radius:0;padding:8px 12px;font-size:0.8rem;color:#6d4c00;display:none;}.aviso-especial.show{display:block;}.data-section{margin:12px 24px 0;display:none;}.data-section.show{display:flex;gap:10px;align-items:center;}.data-section label{font-size:0.85rem;font-weight:600;color:#555;white-space:nowrap;}.data-section input[type=date]{flex:1;padding:9px 12px;border:2px solid #d0d8e8;border-radius:8px;font-size:0.97rem;outline:none;}.data-section input[type=date]:focus{border-color:#1a4fa0;}.status-box{margin:10px 24px 0;display:none;}.status-box.show{display:flex;gap:10px;}.status-dias{flex:1;background:#f7f9fc;border:1.5px solid #d0d8e8;border-radius:8px;padding:10px 14px;font-size:0.92rem;color:#444;display:flex;align-items:center;gap:8px;}.status-dias span{font-weight:700;color:#1a4fa0;}.status-label{padding:10px 20px;border-radius:8px;font-size:1.05rem;font-weight:800;letter-spacing:1px;display:flex;align-items:center;min-width:110px;justify-content:center;}.status-label.valido{background:#e8f5e9;color:#1b5e20;border:2px solid #4caf50;}.status-label.invalido{background:#fce4ec;color:#b71c1c;border:2px solid #e53935;}.datas-box{margin:10px 24px 0;display:none;}.datas-box.show{display:flex;gap:10px;}.data-item{flex:1;background:#f0f4f8;border-radius:8px;padding:10px 14px;font-size:0.82rem;color:#555;display:flex;flex-direction:column;gap:2px;}.data-item .label-d{font-weight:600;font-size:0.78rem;color:#888;}.data-item .valor-d{font-size:1.05rem;font-weight:700;color:#1a4fa0;}.botoes{display:flex;gap:12px;padding:16px 24px 22px;margin-top:6px;}.btn{flex:1;padding:13px 10px;border:none;border-radius:10px;font-size:0.95rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:transform 0.1s;letter-spacing:0.3px;}.btn:active{transform:scale(0.97);}.btn-reset{background:linear-gradient(135deg,#1a4fa0,#1565c0);color:#fff;box-shadow:0 3px 10px rgba(26,79,160,0.25);}.btn-fechar{background:linear-gradient(135deg,#e53935,#c62828);color:#fff;box-shadow:0 3px 10px rgba(229,57,53,0.25);}';document.head.appendChild(st);
var ov=document.createElement('div');ov.id='cvOverlay';
ov.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:2147483640;display:flex;align-items:center;justify-content:center;padding:16px;';
var w=document.createElement('div');
w.style.cssText='position:relative;z-index:2147483641;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,0.35);background:#fff;';
w.innerHTML='<div class="header"><div class="header-icon">📋</div><h1>Verificador de Convênios</h1></div><div class="input-wrap" style="margin-top:4px;"><input type="text" id="cvInputConvenio" placeholder="Digite o nome do convênio..." autocomplete="off"></div><div class="dropdown-list" id="cvDropdownList"></div><div class="validade-banner" id="cvValidadeBanner"><h2 id="cvValidadeTexto"></h2><p id="cvValidadeSubtexto"></p></div><div class="regras" id="cvRegrasBox"></div><div class="aviso-especial" id="cvAvisoEspecial"></div><div class="data-section" id="cvDataSection"><label>📅 Data do pedido:</label><input type="date" id="cvInputData"></div><div class="status-box" id="cvStatusBox"><div class="status-dias">🕐 Pedido tem <span id="cvDiasTexto">—</span> dias</div><div class="status-label" id="cvStatusLabel">—</div></div><div class="datas-box" id="cvDatasBox"><div class="data-item"><span class="label-d">Data do pedido recebido</span><span class="valor-d" id="cvDataRecebido">—</span></div><div class="data-item"><span class="label-d">Data limite de validade</span><span class="valor-d" id="cvDataLimite">—</span></div></div><div class="botoes"><button class="btn btn-reset" id="cvBtnReset">↺ RESETAR<br><small style="font-weight:400;font-size:0.75rem">Zera tudo</small></button><button class="btn btn-fechar" id="cvBtnFechar">✕ FECHAR<br><small style="font-weight:400;font-size:0.75rem">Fecha a ferramenta</small></button></div>';
ov.appendChild(w);document.body.appendChild(ov);
ov.addEventListener('click',function(e){if(e.target===ov){ov.remove();var s=document.getElementById('cvStyle');if(s)s.remove();}});

var convenios=[
{nome:"AFFEGO",validade:30,aceitaCopia:true,crm:true,crn:false,cro:false,coren:false,obs:"Não aceita CRN, CRO e COREN."},
{nome:"AFEB",validade:30,aceitaCopia:true,crm:true,crn:false,cro:true,coren:false,obs:"Não aceita CRN e COREN."},
{nome:"AGF ALLIANZ",validade:30,aceitaCopia:false,crm:true,crn:false,cro:false,coren:false,obs:"Não aceita CRN, CRO e COREN."},
{nome:"AMIL",validade:90,aceitaCopia:true,crm:true,crn:false,cro:"parcial",coren:false,obs:"CRO somente para: Cre, Ure, Hem, TAP, TTPA, COA, EAS, Cultura, TGO, TGP, Hemo1."},
{nome:"ASSEFAZ",validade:60,aceitaCopia:false,crm:true,crn:true,cro:"parcial",coren:false,obs:"CRO aceito somente para Cirurgião-Dentista. Não aceita COREN."},
{nome:"ASSEDF / VIDA CARD FIDELIDADE",validade:30,aceitaCopia:false,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"BANCO CENTRAL",validade:60,aceitaCopia:true,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"BRADESCO",validade:60,aceitaCopia:false,crm:true,crn:false,cro:true,coren:false,obs:"Não aceita CRN e COREN."},
{nome:"BRASIL MED",validade:null,aceitaCopia:null,crm:null,crn:null,cro:null,coren:null,obs:"Sem regras para PM. Paciente traz e assina o encaminhamento."},
{nome:"BRB",validade:30,aceitaCopia:"parcial",crm:true,crn:false,cro:"parcial",coren:false,obs:"Cópia com ressalvas. CRO somente para: HEM,GLI,HBGLI,URE,NA,K,TGO,TGP,GGT,BTF,PTF,CULTSEC,EAS,EPF,TC,TS,TAP."},
{nome:"CAESAN",validade:90,aceitaCopia:"parcial",crm:true,crn:true,cro:true,coren:true,obs:"Não aceita cópia de PM externo — apenas pedido no próprio papel da Caesan."},
{nome:"CÂMARA DOS DEPUTADOS / PRÓ-SAÚDE",validade:30,aceitaCopia:true,crm:true,crn:true,cro:true,coren:true,obs:null},
{nome:"CAPESAÚDE",validade:30,aceitaCopia:true,crm:true,crn:false,cro:true,coren:false,obs:"Não aceita CRN e COREN."},
{nome:"CARE PLUS",validade:180,aceitaCopia:true,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"CASEMBRAPA",validade:90,aceitaCopia:false,crm:true,crn:"parcial",cro:true,coren:true,obs:"CRN com restrição de exames."},
{nome:"CASSI",validade:90,aceitaCopia:false,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"CIGNA",validade:60,aceitaCopia:true,crm:true,crn:true,cro:true,coren:true,obs:"Fazer orçamento: menor que 500 dólares → elegibilidade. Maior → GOP. Sem GOP: authorization@cigna.com"},
{nome:"CNU UNIMED",validade:60,aceitaCopia:false,crm:true,crn:false,cro:true,coren:false,obs:"Não aceita CRN e COREN."},
{nome:"CODEVASF",validade:30,aceitaCopia:true,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"CONAB",validade:30,aceitaCopia:true,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"CORPO DE BOMBEIROS",validade:60,aceitaCopia:false,crm:true,crn:"parcial",cro:true,coren:"parcial",obs:"CRN e COREN aceitos somente em papel timbrado do CBMDF."},
{nome:"E VIDA / ELETRONORTE / LUMINAR",validade:30,aceitaCopia:true,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"EVO SAÚDE",validade:60,aceitaCopia:false,crm:true,crn:"parcial",cro:true,coren:false,obs:"CRN com restrição de exames. Não aceita COREN."},
{nome:"FASCAL",validade:60,aceitaCopia:true,crm:true,crn:true,cro:true,coren:true,obs:null},
{nome:"FUSEX",validade:null,aceitaCopia:true,crm:true,crn:true,cro:true,coren:true,obs:"Validade indeterminada."},
{nome:"GEAP",validade:90,aceitaCopia:false,crm:true,crn:false,cro:true,coren:false,obs:"Não aceita CRN e COREN."},
{nome:"HOSPITAL NAVAL / FUSMA",validade:30,aceitaCopia:true,crm:true,crn:true,cro:true,coren:true,obs:null},
{nome:"INAS",validade:60,aceitaCopia:true,crm:true,crn:false,cro:false,coren:false,obs:"Não aceita CRN, CRO e COREN."},
{nome:"INTERMEDICA",validade:180,aceitaCopia:false,crm:true,crn:false,cro:false,coren:false,obs:"Aceita RMS. Não aceita CRO, CRN e COREN."},
{nome:"IPASGO",validade:null,aceitaCopia:"parcial",crm:true,crn:true,cro:true,coren:false,obs:"Validade indeterminada. Cópia com ressalvas. Não aceita COREN."},
{nome:"IPASVAL",validade:30,aceitaCopia:false,crm:true,crn:true,cro:false,coren:true,obs:"Não aceita CRO."},
{nome:"JUSTIÇA FEDERAL DO DF",validade:90,aceitaCopia:true,crm:true,crn:"parcial",cro:"parcial",coren:false,obs:"CRN e CRO com restrição de exames. Não aceita COREN."},
{nome:"LIFE EMPRESARIAL SAÚDE",validade:30,aceitaCopia:false,crm:true,crn:false,cro:false,coren:false,obs:"Não aceita CRN, CRO e COREN."},
{nome:"MEDISERVICE",validade:60,aceitaCopia:false,crm:true,crn:false,cro:true,coren:false,obs:"Não aceita CRN e COREN."},
{nome:"MEDSENIOR",validade:null,aceitaCopia:"parcial",crm:true,crn:true,cro:false,coren:false,obs:"Validade indeterminada. Cópia com ressalvas. Não aceita CRO e COREN."},
{nome:"NOTRE DAME",validade:180,aceitaCopia:false,crm:true,crn:false,cro:false,coren:false,obs:"Aceita RMS. Não aceita CRO, CRN e COREN."},
{nome:"OMINT SAÚDE",validade:90,aceitaCopia:true,crm:true,crn:false,cro:true,coren:false,obs:"Não aceita CRN e COREN."},
{nome:"PASA VALE",validade:30,aceitaCopia:true,crm:true,crn:true,cro:true,coren:false,obs:"Aceita também RMS. Não aceita COREN."},
{nome:"PETROBRAS",validade:180,aceitaCopia:true,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"PF SAÚDE / POLÍCIA FEDERAL",validade:30,aceitaCopia:false,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"PLAN ASSISTE / MPU",validade:null,aceitaCopia:false,crm:true,crn:true,cro:true,coren:false,obs:"Validade indeterminada. Não aceita COREN."},
{nome:"PLENUM SAÚDE",validade:60,aceitaCopia:false,crm:true,crn:"parcial",cro:"parcial",coren:false,obs:"CRN e CRO com ressalvas. Aceita RMS. Não aceita COREN."},
{nome:"POLÍCIA MILITAR",validade:null,aceitaCopia:false,crm:true,crn:true,cro:true,coren:true,obs:"Validade indeterminada. Aceita também RMS."},
{nome:"PORTO SEGURO",validade:null,aceitaCopia:true,crm:true,crn:false,cro:true,coren:false,obs:"Validade indeterminada. Não aceita CRN e COREN."},
{nome:"POSTAL SAÚDE / CORREIOS",validade:30,aceitaCopia:false,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"PREVENT SENIOR",validade:90,aceitaCopia:false,crm:true,crn:false,cro:true,coren:false,obs:"Não aceita CRN e COREN."},
{nome:"PROASA",validade:90,aceitaCopia:false,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"REDE TOTAL / ADM SAÚDE",validade:60,aceitaCopia:false,crm:true,crn:false,cro:false,coren:false,obs:"Não aceita CRO, RMS, CRN e COREN."},
{nome:"SAÚDE CAIXA",validade:30,aceitaCopia:true,crm:true,crn:true,cro:true,coren:true,obs:null},
{nome:"SELECT",validade:30,aceitaCopia:false,crm:true,crn:true,cro:false,coren:false,obs:"Não aceita CRO e COREN."},
{nome:"SERPRO",validade:60,aceitaCopia:true,crm:true,crn:true,cro:"parcial",coren:false,obs:"CRO somente para Cirurgião-Dentista. Não aceita COREN."},
{nome:"SIS SENADO",validade:30,aceitaCopia:true,crm:true,crn:"parcial",cro:true,coren:false,obs:"CRN com ressalvas. Não aceita COREN."},
{nome:"STF-MED",validade:60,aceitaCopia:true,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"STJ",validade:null,aceitaCopia:true,crm:true,crn:true,cro:true,coren:false,obs:"Validade indeterminada. Não aceita COREN."},
{nome:"STM / PLAS / JMU",validade:30,aceitaCopia:true,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"SUL AMERICA",validade:90,aceitaCopia:false,crm:true,crn:false,cro:"parcial",coren:false,obs:"CRO com ressalvas. Não aceita CRN e COREN."},
{nome:"TJDFT",validade:30,aceitaCopia:false,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"TRE",validade:30,aceitaCopia:true,crm:true,crn:false,cro:true,coren:false,obs:"Não aceita CRN e COREN."},
{nome:"TRF",validade:90,aceitaCopia:false,crm:true,crn:"parcial",cro:"parcial",coren:false,obs:"CRN e CRO com ressalvas. Não aceita COREN."},
{nome:"TRT",validade:90,aceitaCopia:false,crm:true,crn:true,cro:true,coren:false,obs:"Não aceita COREN."},
{nome:"TST",validade:30,aceitaCopia:false,crm:true,crn:false,cro:true,coren:false,obs:"Não aceita CRN e COREN."},
{nome:"UNAFISCO",validade:null,aceitaCopia:true,crm:true,crn:true,cro:true,coren:false,obs:"Validade indeterminada. Não aceita COREN."},
{nome:"UNIMED SEGUROS",validade:null,aceitaCopia:false,crm:true,crn:false,cro:true,coren:false,obs:"Validade indeterminada. Não aceita CRN e COREN."},
{nome:"UNITY",validade:60,aceitaCopia:false,crm:true,crn:false,cro:"parcial",coren:false,obs:"CRO com ressalvas. Não aceita CRN e COREN."}
];

var cvAtual=null;
function cvNorm(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim();}
var cvInput=document.getElementById('cvInputConvenio');
var cvDrop=document.getElementById('cvDropdownList');
cvInput.addEventListener('input',cvFiltrar);
cvInput.addEventListener('focus',cvFiltrar);
function cvFiltrar(){
  var norm=cvNorm(cvInput.value);
  if(!norm){cvDrop.classList.remove('show');return;}
  var f=convenios.filter(function(c){return cvNorm(c.nome).indexOf(norm)>=0;});
  if(!f.length){cvDrop.classList.remove('show');return;}
  cvDrop.innerHTML=f.map(function(c){return '<div class="dropdown-item" data-nome="'+c.nome.replace(/"/g,'&quot;')+'">'+c.nome+'</div>';}).join('');
  cvDrop.classList.add('show');
  cvDrop.querySelectorAll('.dropdown-item').forEach(function(el){
    el.addEventListener('click',function(){cvSelecionar(this.getAttribute('data-nome'));});
  });
}
function cvSelecionar(nome){
  var conv=convenios.find(function(c){return c.nome===nome;});
  if(!conv)return;
  cvAtual=conv;cvInput.value=conv.nome;cvDrop.classList.remove('show');cvMostrar(conv);
}
function cvMostrar(conv){
  var banner=document.getElementById('cvValidadeBanner');
  var h2=document.getElementById('cvValidadeTexto');
  var sub=document.getElementById('cvValidadeSubtexto');
  banner.className='validade-banner show';
  if(conv.validade===null&&conv.aceitaCopia===null){banner.classList.add('sem-regras');h2.textContent='Sem regras definidas para PM';sub.textContent='Veja as observações abaixo.';}
  else if(conv.validade===null){banner.classList.add('validade-indeterminada');h2.textContent='Validade: Indeterminada';sub.textContent='Este convênio não define prazo de validade.';}
  else{h2.textContent='Validade do PM: '+conv.validade+' dias';sub.textContent='Regras do pedido médico para '+conv.nome+'.';}
  var rb=document.getElementById('cvRegrasBox');rb.innerHTML='';rb.classList.remove('show');
  var regras=[];
  if(conv.aceitaCopia===true)regras.push({cls:'ok',icon:'✅',texto:'Aceita cópia de pedido médico'});
  else if(conv.aceitaCopia===false)regras.push({cls:'nao',icon:'❌',texto:'Não aceita cópia de pedido médico'});
  else if(conv.aceitaCopia==='parcial')regras.push({cls:'parcial',icon:'⚠️',texto:'Aceita cópia com ressalvas'});
  if(conv.crm===true)regras.push({cls:'ok',icon:'✅',texto:'Aceita CRM (Médico)'});
  else if(conv.crm===false)regras.push({cls:'nao',icon:'❌',texto:'Não aceita CRM'});
  if(conv.crn===true)regras.push({cls:'ok',icon:'✅',texto:'Aceita CRN (Nutricionista)'});
  else if(conv.crn===false)regras.push({cls:'nao',icon:'❌',texto:'Não aceita CRN'});
  else if(conv.crn==='parcial')regras.push({cls:'parcial',icon:'⚠️',texto:'Aceita CRN com restrições'});
  if(conv.cro===true)regras.push({cls:'ok',icon:'✅',texto:'Aceita CRO (Dentista/Biomédico)'});
  else if(conv.cro===false)regras.push({cls:'nao',icon:'❌',texto:'Não aceita CRO'});
  else if(conv.cro==='parcial')regras.push({cls:'parcial',icon:'⚠️',texto:'Aceita CRO para exames específicos'});
  if(conv.coren===true)regras.push({cls:'ok',icon:'✅',texto:'Aceita COREN (Enfermeiro)'});
  else if(conv.coren===false)regras.push({cls:'nao',icon:'❌',texto:'Não aceita COREN'});
  else if(conv.coren==='parcial')regras.push({cls:'parcial',icon:'⚠️',texto:'Aceita COREN com condições'});
  if(regras.length){regras.forEach(function(r){var el=document.createElement('div');el.className='regra-item '+r.cls;el.innerHTML='<span class="regra-icon">'+r.icon+'</span><span>'+r.texto+'</span>';rb.appendChild(el);});rb.classList.add('show');}
  var av=document.getElementById('cvAvisoEspecial');
  if(conv.obs){av.textContent='📌 '+conv.obs;av.classList.add('show');}else{av.classList.remove('show');av.textContent='';}
  var ds=document.getElementById('cvDataSection');
  if(conv.validade){ds.classList.add('show');}else{ds.classList.remove('show');document.getElementById('cvStatusBox').classList.remove('show');document.getElementById('cvDatasBox').classList.remove('show');}
  document.getElementById('cvInputData').value='';
  document.getElementById('cvStatusBox').classList.remove('show');
  document.getElementById('cvDatasBox').classList.remove('show');
}
document.getElementById('cvInputData').addEventListener('change',function(){
  if(!cvAtual||!cvAtual.validade)return;
  var dataPedido=new Date(this.value+'T00:00:00');
  var hoje=new Date();hoje.setHours(0,0,0,0);
  var dias=Math.floor((hoje-dataPedido)/86400000);
  var lim=new Date(dataPedido);lim.setDate(lim.getDate()+cvAtual.validade);
  var fmt=function(d){return d.toLocaleDateString('pt-BR');};
  document.getElementById('cvDiasTexto').textContent=dias+' dias';
  document.getElementById('cvDataRecebido').textContent=fmt(dataPedido);
  document.getElementById('cvDataLimite').textContent=fmt(lim);
  var lbl=document.getElementById('cvStatusLabel');
  if(dias<=cvAtual.validade){lbl.textContent='VÁLIDO';lbl.className='status-label valido';}
  else{lbl.textContent='VENCIDO';lbl.className='status-label invalido';}
  document.getElementById('cvStatusBox').classList.add('show');
  document.getElementById('cvDatasBox').classList.add('show');
});
document.getElementById('cvBtnReset').addEventListener('click',function(){
  cvAtual=null;cvInput.value='';cvDrop.classList.remove('show');
  ['cvValidadeBanner','cvRegrasBox','cvAvisoEspecial','cvDataSection','cvStatusBox','cvDatasBox'].forEach(function(id){document.getElementById(id).classList.remove('show');});
  document.getElementById('cvRegrasBox').innerHTML='';
  document.getElementById('cvInputData').value='';
});
document.getElementById('cvBtnFechar').addEventListener('click',function(){
  var ov=document.getElementById('cvOverlay');if(ov)ov.remove();
  var st=document.getElementById('cvStyle');if(st)st.remove();
});
document.addEventListener('click',function(e){
  if(!cvDrop.contains(e.target)&&e.target!==cvInput)cvDrop.classList.remove('show');
});
})();
