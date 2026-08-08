(function(){
if(document.getElementById('cvOverlay')){document.getElementById('cvOverlay').style.display='flex';return;}

/* ============================================================
   BASE DE CONVÊNIOS
   ------------------------------------------------------------
   validade   : número de dias | null (indeterminada) | 'sem'
   aceitaCopia: true | false | 'parcial'
   copiaObs   : texto que aparece quando é 'parcial'
   aceita     : [{s:'CRM', d:'Médico', r:'texto da restrição'}]
                (o campo r é opcional — quando existe aparece
                 o botão "ver restrição")
   naoAceita  : [{s:'CRN'}, {s:'COREN'}]
   anexos     : null  -> botão fica desativado
                {pedidos:[...], pedidosObs:'', capas:[...],
                 capasObs:'', faturamento:true|false, obs:''}
   obs        : observação geral do convênio
   ============================================================ */

var CONV=[

{nome:'AFFEGO',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'COREN'}],anexos:null},

{nome:'AFEB',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'AGF ALLIANZ',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'COREN'}],anexos:null},

{nome:'AMIL',validade:180,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico',r:'CRO aceito somente para os exames: Cre, Ure, Hem, TAP, TTPA, COA, EAS, Cultura, TGO, TGP e Hemo1.'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'ASSEDF / VIDA CARD FIDELIDADE',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'ASSEFAZ',validade:60,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico',r:'CRO aceito somente quando o solicitante for Cirurgião-Dentista.'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'BANCO CENTRAL',validade:60,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'BRADESCO',validade:60,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],
 anexos:{
   pedidos:['PM NOMEDOCLIENTE','PM2 NOMEDOCLIENTE','PM3 NOMEDOCLIENTE'],
   pedidosObs:'Obrigatório: use o formato "PM NOMEDOCLIENTE" para renomear. Adicione sufixo numérico para múltiplos pedidos.',
   capas:['GU NOMEDOCLIENTE'],
   capasObs:'Obrigatório: use o formato "GU NOMEDOCLIENTE" para renomear.',
   faturamento:false
 }},

{nome:'BRASIL MED',validade:'sem',aceitaCopia:null,
 aceita:[],naoAceita:[],anexos:null,
 obs:'Não há regras de pedido médico. O paciente traz e assina o encaminhamento.'},

{nome:'BRB',validade:30,aceitaCopia:'parcial',
 copiaObs:'Cópia aceita com ressalvas.',
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico',r:'CRO aceito somente para os exames: HEM, GLI, HBGLI, URE, NA, K, TGO, TGP, GGT, BTF, PTF, CULTSEC, EAS, EPF, TC, TS e TAP.'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'CAESAN',validade:90,aceitaCopia:'parcial',
 copiaObs:'Não aceita cópia de pedido externo — somente se o pedido for da própria Caesan.',
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[],anexos:null},

{nome:'CÂMARA DOS DEPUTADOS / PRÓ-SAÚDE',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[],anexos:null},

{nome:'CAPESAÚDE',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'CARE PLUS',validade:180,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'CASEMBRAPA',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'},{s:'CRN',d:'Nutricionista',r:'CRN aceito com ressalvas — há restrição de exames.'}],
 naoAceita:[],anexos:null},

{nome:'CASSI',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'CIGNA',validade:60,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[],anexos:null,
 obs:'Fazer orçamento e conferir a cotação do dólar no dia. Orçamento menor que 500 dólares: pegar elegibilidade. Orçamento maior: Carta de Garantia (GOP). Se o paciente não tiver, solicite pelo e-mail authorization@cigna.com.'},

{nome:'CNU UNIMED',validade:60,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'CODEVASF',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'CONAB',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'CORPO DE BOMBEIROS',validade:60,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'},
         {s:'CRN',d:'Nutricionista',r:'CRN aceito somente se o pedido estiver em papel timbrado do CBMDF.'},
         {s:'COREN',d:'Enfermeiro',r:'COREN aceito somente se o pedido estiver em papel timbrado do CBMDF.'}],
 naoAceita:[],anexos:null},

{nome:'E VIDA / ELETRONORTE / LUMINAR',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'EVO SAÚDE',validade:60,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'},{s:'CRN',d:'Nutricionista',r:'CRN aceito com restrição de exames.'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'FASCAL',validade:60,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[],anexos:null},

{nome:'FUSEX',validade:null,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[],anexos:null},

{nome:'GEAP',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'HOSPITAL NAVAL / FUSMA',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[],anexos:null},

{nome:'INAS',validade:60,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'COREN'}],anexos:null},

{nome:'INTERMEDICA',validade:180,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'RMS',d:'Residente'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'COREN'}],anexos:null},

{nome:'IPASGO',validade:null,aceitaCopia:'parcial',
 copiaObs:'Cópia aceita com ressalvas.',
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'IPASVAL',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[{s:'CRO'}],anexos:null},

{nome:'JUSTIÇA FEDERAL DO DF',validade:90,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},
         {s:'CRN',d:'Nutricionista',r:'CRN aceito com restrição de exames.'},
         {s:'CRO',d:'Dentista/Biomédico',r:'CRO aceito com restrição de exames.'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'LIFE EMPRESARIAL SAÚDE',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'COREN'}],anexos:null},

{nome:'MEDISERVICE',validade:60,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'MEDSENIOR',validade:null,aceitaCopia:'parcial',
 copiaObs:'Cópia aceita com ressalvas.',
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'}],
 naoAceita:[{s:'CRO'},{s:'COREN'}],anexos:null},

{nome:'NOTRE DAME',validade:180,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'RMS',d:'Residente'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'COREN'}],anexos:null},

{nome:'OMINT SAÚDE',validade:90,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'PASA VALE',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'RMS',d:'Residente'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'PETROBRAS',validade:180,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'PF SAÚDE / POLÍCIA FEDERAL',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'PLAN ASSISTE / MPU',validade:null,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'PLENUM SAÚDE',validade:60,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'RMS',d:'Residente'},
         {s:'CRN',d:'Nutricionista',r:'CRN aceito com ressalvas.'},
         {s:'CRO',d:'Dentista/Biomédico',r:'CRO aceito com ressalvas.'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'POLÍCIA MILITAR',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'RMS',d:'Residente'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[],anexos:null},

{nome:'PORTO SEGURO',validade:null,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'POSTAL SAÚDE / CORREIOS',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'PREVENT SENIOR',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'PROASA',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'REDE TOTAL / ADM SAÚDE',validade:60,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'RMS'},{s:'COREN'}],anexos:null},

{nome:'SAÚDE CAIXA',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[],anexos:null},

{nome:'SELECT',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'}],
 naoAceita:[{s:'CRO'},{s:'COREN'}],anexos:null},

{nome:'SERPRO',validade:60,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico',r:'CRO aceito somente quando o solicitante for Cirurgião-Dentista.'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'SIS SENADO',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'},{s:'CRN',d:'Nutricionista',r:'CRN aceito com ressalvas.'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'STF-MED',validade:60,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'STJ',validade:null,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'STM / PLAS / JMU',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'SUL AMÉRICA',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico',r:'CRO aceito com ressalvas.'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'TJDFT',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'TRE',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'TRF',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},
         {s:'CRN',d:'Nutricionista',r:'CRN aceito com ressalvas.'},
         {s:'CRO',d:'Dentista/Biomédico',r:'CRO aceito com ressalvas.'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'TRT',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'TST',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'UNAFISCO',validade:null,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'UNIMED SEGUROS',validade:null,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'UNITY',validade:60,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico',r:'CRO aceito com ressalvas.'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null}

];

/* ============================================================
   ÍCONES
   ============================================================ */
var IC={};
IC.clip='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 13h6M9 17h4"/></svg>';
IC.stetho='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3V7a4.2 4.2 0 0 0 8.4 0V2.3"/><path d="M3.2 2.3h3.2M11.6 2.3h3.2"/><path d="M9 11.2v3.3a5 5 0 0 0 10 0v-2"/><circle cx="19" cy="8.4" r="2.4"/></svg>';
IC.calCheck='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M8.8 15.2l2.2 2.2 4.2-4.4"/></svg>';
IC.shield='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.6l7.4 3v6c0 4.6-3.1 8.4-7.4 9.8-4.3-1.4-7.4-5.2-7.4-9.8v-6z"/><path d="M9.2 11.9l2 2 3.6-3.8"/></svg>';
IC.doc='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2.6H6.8a2 2 0 0 0-2 2v14.8a2 2 0 0 0 2 2h10.4a2 2 0 0 0 2-2V7.6z"/><path d="M14.5 2.6v5h4.7"/><path d="M8.4 12.4h7M8.4 16h4.6"/></svg>';
IC.doctor='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6.6" r="3.6"/><path d="M4.6 21.4v-1.8a5.6 5.6 0 0 1 5.6-5.6h3.6a5.6 5.6 0 0 1 5.6 5.6v1.8"/><path d="M9.6 14.2l2.4 3.2 2.4-3.2"/></svg>';
IC.check='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.6l5 5 10-10.6"/></svg>';
IC.x='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
IC.paperclip='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5l-8.9 8.9a5.6 5.6 0 0 1-7.9-7.9l8.9-8.9a3.7 3.7 0 0 1 5.3 5.3l-8.9 8.9a1.9 1.9 0 0 1-2.6-2.6l8.2-8.2"/></svg>';
IC.calc='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2.6" width="16" height="18.8" rx="2.4"/><path d="M8 7.2h8M8.4 12h.01M12 12h.01M15.6 12h.01M8.4 16.4h.01M12 16.4h.01M15.6 16.4h.01"/></svg>';
IC.cal='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>';
IC.reset='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 11.5a8.5 8.5 0 1 1-2.6-6.1"/><path d="M20.5 3.6v5.2h-5.2"/></svg>';
IC.info='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.4"/><path d="M12 11.4v5.2M12 7.8h.01"/></svg>';
IC.chev='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9.5l6 6 6-6"/></svg>';
IC.files='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2.6H6.8a2 2 0 0 0-2 2v14.8a2 2 0 0 0 2 2h10.4a2 2 0 0 0 2-2V7.6z"/><path d="M14.5 2.6v5h4.7M8.4 12.4h7M8.4 16h4.6"/></svg>';
IC.layers='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.6l9.2 4.7L12 12 2.8 7.3z"/><path d="M2.8 12.2L12 16.9l9.2-4.7M2.8 16.9L12 21.6l9.2-4.7"/></svg>';
IC.warn='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.6L1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0z"/><path d="M12 9.2v4.4M12 17.4h.01"/></svg>';

/* ============================================================
   ESTILO
   ============================================================ */
var CSS=''
+'#cvOverlay{position:fixed;inset:0;z-index:2147483640;background:rgba(15,25,45,.55);display:flex;align-items:flex-start;justify-content:center;padding:26px 16px;overflow-y:auto;font-family:"Segoe UI",Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased;}'
+'#cvOverlay *{box-sizing:border-box;margin:0;padding:0;}'
+'#cvOverlay svg{width:1em;height:1em;display:block;}'
+'#cvBox{position:relative;width:100%;max-width:470px;background:#fff;border-radius:22px;box-shadow:0 24px 70px rgba(0,0,0,.42);overflow:hidden;animation:cvUp .22s ease;}'
+'@keyframes cvUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}'

/* aviso */
+'#cvAviso{display:none;background:#ffcf3d;color:#3a2c00;padding:12px 34px 12px 14px;font-size:12.5px;line-height:1.5;position:relative;border-bottom:1px solid #d9a800;}'
+'#cvAviso.on{display:block;}'
+'#cvAviso b{display:flex;align-items:center;gap:6px;font-size:12.5px;margin-bottom:3px;}'
+'#cvAviso b svg{font-size:14px;}'
+'#cvAvisoX{position:absolute;top:7px;right:9px;background:none;border:0;color:#3a2c00;font-size:16px;line-height:1;cursor:pointer;font-weight:700;}'

/* header */
+'#cvOverlay .cv-head{background:linear-gradient(120deg,#1b52ad 0%,#1668ce 55%,#1877d8 100%);padding:17px 18px;display:flex;align-items:center;gap:13px;position:relative;overflow:hidden;}'
+'#cvOverlay .cv-hbadge{width:44px;height:44px;border-radius:13px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;color:#fff;font-size:23px;flex:0 0 auto;}'
+'#cvOverlay .cv-htxt{flex:1;min-width:0;}'
+'#cvOverlay .cv-htxt h1{font-size:16.5px;font-weight:800;color:#fff;letter-spacing:.6px;line-height:1.2;}'
+'#cvOverlay .cv-htxt p{font-size:11px;color:rgba(255,255,255,.82);margin-top:3px;line-height:1.35;}'
+'#cvOverlay .cv-hart{flex:0 0 auto;display:flex;align-items:center;gap:5px;color:rgba(255,255,255,.55);}'
+'#cvOverlay .cv-hart .a1{font-size:27px;}'
+'#cvOverlay .cv-hart .a2{font-size:22px;}'

/* corpo */
+'#cvOverlay .cv-body{padding:16px 18px 18px;}'
+'#cvOverlay .cv-lbl{font-size:10.5px;font-weight:700;color:#8b93a4;letter-spacing:.4px;margin-bottom:5px;display:block;}'
+'#cvOverlay .cv-inwrap{position:relative;}'
+'#cvOverlay .cv-in{width:100%;padding:12px 38px 12px 14px;border:1.6px solid #ccd6e6;border-radius:11px;font-size:14.5px;font-weight:600;color:#17264a;background:#fff;outline:none;font-family:inherit;transition:border-color .15s,box-shadow .15s;}'
+'#cvOverlay .cv-in::placeholder{font-weight:400;color:#9aa4b6;}'
+'#cvOverlay .cv-in:focus{border-color:#1668ce;box-shadow:0 0 0 3px rgba(22,104,206,.13);}'
+'#cvOverlay .cv-chev{position:absolute;right:13px;top:50%;transform:translateY(-50%);color:#7d879b;font-size:17px;pointer-events:none;}'
+'#cvOverlay .cv-drop{display:none;margin-top:5px;border:1.5px solid #ccd6e6;border-radius:11px;background:#fff;max-height:210px;overflow-y:auto;box-shadow:0 10px 24px rgba(20,40,80,.14);}'
+'#cvOverlay .cv-drop.on{display:block;}'
+'#cvOverlay .cv-item{padding:10px 14px;font-size:13.5px;color:#2b3852;cursor:pointer;border-bottom:1px solid #eef2f7;font-weight:600;}'
+'#cvOverlay .cv-item:last-child{border-bottom:0;}'
+'#cvOverlay .cv-item:hover{background:#eaf2fd;color:#1152a8;}'
+'#cvOverlay .cv-vazio{padding:12px 14px;font-size:12.5px;color:#98a2b3;}'

/* banner validade */
+'#cvOverlay .cv-val{display:flex;align-items:center;gap:12px;margin-top:14px;padding:14px 15px;border-radius:13px;background:linear-gradient(96deg,#e9f8ec,#f2fbf3);border:1.4px solid #b9e5c3;}'
+'#cvOverlay .cv-val .vi{font-size:24px;color:#1f8a3c;flex:0 0 auto;}'
+'#cvOverlay .cv-val .vt{flex:1;min-width:0;}'
+'#cvOverlay .cv-val .vt h2{font-size:17px;font-weight:800;color:#15662d;line-height:1.2;}'
+'#cvOverlay .cv-val .vt p{font-size:11px;color:#4d8a5f;margin-top:2px;}'
+'#cvOverlay .cv-val .vs{font-size:21px;color:#7ec894;flex:0 0 auto;}'
+'#cvOverlay .cv-val.indet{background:linear-gradient(96deg,#f3eee8,#f9f4ef);border-color:#dfcbb4;}'
+'#cvOverlay .cv-val.indet .vi{color:#96662c;}#cvOverlay .cv-val.indet .vt h2{color:#7a5320;}'
+'#cvOverlay .cv-val.indet .vt p{color:#96774d;}#cvOverlay .cv-val.indet .vs{color:#cfae86;}'
+'#cvOverlay .cv-val.sem{background:linear-gradient(96deg,#eceff4,#f4f6fa);border-color:#c9d2e0;}'
+'#cvOverlay .cv-val.sem .vi{color:#4c5a72;}#cvOverlay .cv-val.sem .vt h2{color:#33405a;}'
+'#cvOverlay .cv-val.sem .vt p{color:#6a768c;}#cvOverlay .cv-val.sem .vs{color:#a9b4c6;}'

/* cards */
+'#cvOverlay .cv-card{display:flex;align-items:stretch;gap:11px;margin-top:10px;padding:11px;border:1.4px solid #dde4ee;border-radius:14px;background:#fff;}'
+'#cvOverlay .cv-cl{display:flex;align-items:center;gap:9px;flex:0 0 auto;width:132px;}'
+'#cvOverlay .cv-cl.solo{width:66px;justify-content:center;}'
+'#cvOverlay .cv-av{width:44px;height:44px;border-radius:12px;background:#eef4fd;color:#1668ce;display:flex;align-items:center;justify-content:center;font-size:23px;flex:0 0 auto;}'
+'#cvOverlay .cv-cl h3{font-size:12.5px;font-weight:800;color:#22304c;line-height:1.2;}'
+'#cvOverlay .cv-cl span{font-size:9.5px;color:#8b93a4;line-height:1.3;display:block;margin-top:2px;}'
+'#cvOverlay .cv-cr{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px;justify-content:center;}'

/* pílulas verde/vermelho */
+'#cvOverlay .cv-pill{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:11px;}'
+'#cvOverlay .cv-pill.ok{background:#eaf8ee;border:1.3px solid #b7e5c4;}'
+'#cvOverlay .cv-pill.no{background:#fdecef;border:1.3px solid #f6c3cc;}'
+'#cvOverlay .cv-pill .b{width:23px;height:23px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;flex:0 0 auto;}'
+'#cvOverlay .cv-pill.ok .b{background:#20a145;}'
+'#cvOverlay .cv-pill.no .b{background:#e0364f;}'
+'#cvOverlay .cv-pill .t{flex:1;min-width:0;}'
+'#cvOverlay .cv-pill .t strong{display:block;font-size:12.5px;font-weight:800;line-height:1.25;}'
+'#cvOverlay .cv-pill .t em{display:block;font-style:normal;font-size:9.5px;margin-top:2px;opacity:.82;}'
+'#cvOverlay .cv-pill.ok .t{color:#177a34;}'
+'#cvOverlay .cv-pill.no .t{color:#c0273e;}'

/* linha de especialidades */
+'#cvOverlay .cv-esp{display:flex;align-items:flex-start;gap:9px;padding:9px 11px;border-radius:11px;}'
+'#cvOverlay .cv-esp.ok{background:#eaf8ee;border:1.3px solid #b7e5c4;}'
+'#cvOverlay .cv-esp.no{background:#fdecef;border:1.3px solid #f6c3cc;}'
+'#cvOverlay .cv-esp .b{width:23px;height:23px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;flex:0 0 auto;margin-top:1px;}'
+'#cvOverlay .cv-esp.ok .b{background:#20a145;}#cvOverlay .cv-esp.no .b{background:#e0364f;}'
+'#cvOverlay .cv-esp .k{font-size:12.5px;font-weight:800;flex:0 0 auto;padding-top:3px;}'
+'#cvOverlay .cv-esp .k{color:#1a1a1a;}'
+'#cvOverlay .cv-esp .lst{flex:1;min-width:0;border-left:1.3px solid rgba(0,0,0,.09);padding-left:9px;display:flex;flex-direction:column;gap:3px;}'
+'#cvOverlay .cv-sig{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:12.5px;font-weight:800;line-height:1.3;}'
+'#cvOverlay .cv-esp.ok .cv-sig{color:#177a34;}#cvOverlay .cv-esp.no .cv-sig{color:#c0273e;}'
+'#cvOverlay .cv-sig i{font-style:normal;font-weight:500;font-size:10.5px;opacity:.78;}'
+'#cvOverlay .cv-rbtn{border:1.2px solid #e79a1f;background:#fff5e0;color:#a8690a;font-size:9.5px;font-weight:800;padding:2px 7px;border-radius:20px;cursor:pointer;font-family:inherit;letter-spacing:.2px;white-space:nowrap;}'
+'#cvOverlay .cv-rbtn:hover{background:#ffe9c2;}'
+'#cvOverlay .cv-nada{font-size:11px;color:#98a2b3;font-style:italic;padding-top:3px;}'

/* botão anexos */
+'#cvOverlay .cv-anx{display:flex;align-items:center;justify-content:center;gap:9px;margin:12px auto 0;padding:11px 20px;border-radius:30px;background:linear-gradient(180deg,#f4f6fa,#e7ecf4);border:1.5px solid #ccd6e6;color:#2b3852;font-size:12.5px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 2px 5px rgba(20,40,80,.07);transition:.15s;}'
+'#cvOverlay .cv-anx:hover:not(:disabled){background:linear-gradient(180deg,#eaf1fb,#d9e5f6);border-color:#9dbbe4;}'
+'#cvOverlay .cv-anx:disabled{opacity:.45;cursor:not-allowed;}'
+'#cvOverlay .cv-anx .ci{width:26px;height:26px;border-radius:50%;background:#fff;border:1.3px solid #ccd6e6;display:flex;align-items:center;justify-content:center;font-size:13px;color:#5b6880;}'

/* observação geral */
+'#cvOverlay .cv-obs{margin-top:11px;padding:10px 12px;border-radius:11px;background:#fff8e6;border-left:4px solid #eea93a;font-size:11.5px;color:#7a5a11;line-height:1.5;display:none;}'
+'#cvOverlay .cv-obs.on{display:block;}'

/* divisor / calculadora */
+'#cvOverlay .cv-hr{height:1px;background:#e6ebf3;margin:15px 0 13px;}'
+'#cvOverlay .cv-calch{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:800;color:#1152a8;margin-bottom:10px;}'
+'#cvOverlay .cv-calch .ci{width:24px;height:24px;border-radius:7px;background:#eaf2fd;display:flex;align-items:center;justify-content:center;font-size:14px;}'
+'#cvOverlay .cv-dline{display:flex;align-items:center;gap:11px;}'
+'#cvOverlay .cv-dlbl{display:flex;align-items:center;gap:7px;font-size:12.5px;font-weight:700;color:#3c4a66;white-space:nowrap;}'
+'#cvOverlay .cv-dlbl svg{font-size:15px;color:#c0392b;}'
+'#cvOverlay .cv-date{flex:1;padding:10px 12px;border:1.6px solid #ccd6e6;border-radius:11px;font-size:13.5px;font-weight:600;color:#17264a;outline:none;font-family:inherit;background:#fff;}'
+'#cvOverlay .cv-date:focus{border-color:#1668ce;box-shadow:0 0 0 3px rgba(22,104,206,.13);}'

/* resultado da validade */
+'#cvOverlay .cv-res{display:none;margin-top:11px;}'
+'#cvOverlay .cv-res.on{display:block;}'
+'#cvOverlay .cv-resrow{display:flex;align-items:center;gap:9px;}'
+'#cvOverlay .cv-dias{flex:1;display:flex;align-items:center;gap:8px;padding:10px 12px;border:1.4px solid #dde4ee;border-radius:11px;font-size:12.5px;color:#3c4a66;background:#f8fafd;}'
+'#cvOverlay .cv-dias b{color:#1152a8;font-weight:800;}'
+'#cvOverlay .cv-badge{padding:10px 18px;border-radius:11px;font-size:13px;font-weight:900;letter-spacing:1px;display:flex;align-items:center;justify-content:center;min-width:100px;}'
+'#cvOverlay .cv-badge.v{background:#eaf8ee;color:#15662d;border:1.7px solid #46b866;}'
+'#cvOverlay .cv-badge.x{background:#fdecef;color:#a01a30;border:1.7px solid #e0364f;}'
+'#cvOverlay .cv-datas{display:flex;gap:9px;margin-top:9px;}'
+'#cvOverlay .cv-dbox{flex:1;padding:9px 12px;border-radius:11px;background:#f2f6fb;border:1.3px solid #e0e8f3;}'
+'#cvOverlay .cv-dbox span{display:block;font-size:9.5px;font-weight:700;color:#8b93a4;letter-spacing:.2px;}'
+'#cvOverlay .cv-dbox strong{display:block;font-size:14px;font-weight:800;color:#1152a8;margin-top:2px;}'

/* botões */
+'#cvOverlay .cv-acts{display:flex;gap:10px;margin-top:15px;}'
+'#cvOverlay .cv-b{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 10px;border:0;border-radius:12px;color:#fff;font-size:13px;font-weight:800;letter-spacing:.4px;cursor:pointer;font-family:inherit;transition:.12s;}'
+'#cvOverlay .cv-b small{font-weight:500;font-size:9.5px;opacity:.85;letter-spacing:0;}'
+'#cvOverlay .cv-b:active{transform:scale(.98);}'
+'#cvOverlay .cv-b.r{background:linear-gradient(135deg,#1b52ad,#1877d8);box-shadow:0 4px 12px rgba(22,82,173,.3);}'
+'#cvOverlay .cv-b.f{background:linear-gradient(135deg,#e0364f,#c0273e);box-shadow:0 4px 12px rgba(224,54,79,.3);}'
+'#cvOverlay .cv-b.r:hover{background:linear-gradient(135deg,#1877d8,#2a8ae8);}'
+'#cvOverlay .cv-b.f:hover{background:linear-gradient(135deg,#c0273e,#a01a30);}'

/* rodapé */
+'#cvOverlay .cv-foot{display:flex;align-items:center;gap:9px;margin-top:13px;padding:10px 12px;border-radius:11px;background:#f6f9fd;border:1.2px solid #e3eaf4;}'
+'#cvOverlay .cv-foot .fi{font-size:16px;color:#1668ce;flex:0 0 auto;}'
+'#cvOverlay .cv-foot p{flex:1;font-size:9.8px;color:#7d879b;line-height:1.5;}'
+'#cvOverlay .cv-foot .fs{font-size:16px;color:#9dbbe4;flex:0 0 auto;}'

/* modais */
+'#cvOverlay .cv-mod{position:absolute;inset:0;background:rgba(15,25,45,.5);display:none;align-items:center;justify-content:center;padding:18px;border-radius:22px;}'
+'#cvOverlay .cv-mod.on{display:flex;}'
+'#cvOverlay .cv-mbox{width:100%;max-width:390px;max-height:100%;overflow-y:auto;background:#fff;border-radius:15px;box-shadow:0 18px 46px rgba(0,0,0,.35);}'
+'#cvOverlay .cv-mhead{display:flex;align-items:center;gap:9px;padding:13px 15px;border-bottom:1.4px solid #e6ebf3;}'
+'#cvOverlay .cv-mhead h3{flex:1;font-size:13.5px;font-weight:800;color:#22304c;}'
+'#cvOverlay .cv-mx{background:none;border:0;color:#8b93a4;font-size:19px;line-height:1;cursor:pointer;font-family:inherit;padding:0 2px;}'
+'#cvOverlay .cv-mx:hover{color:#e0364f;}'
+'#cvOverlay .cv-mbody{padding:14px 15px;}'
+'#cvOverlay .cv-sect{display:flex;align-items:center;gap:7px;font-size:12px;font-weight:800;color:#22304c;margin-bottom:8px;}'
+'#cvOverlay .cv-sect svg{font-size:15px;color:#1668ce;}'
+'#cvOverlay .cv-file{display:flex;align-items:center;gap:9px;padding:9px 11px;border:1.4px solid #dde4ee;border-radius:9px;background:#fbfcfe;font-size:12px;font-weight:600;color:#2b3852;margin-bottom:6px;}'
+'#cvOverlay .cv-file span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
+'#cvOverlay .cv-file svg{font-size:14px;color:#7d879b;flex:0 0 auto;}'
+'#cvOverlay .cv-note{font-size:9.8px;color:#8b93a4;line-height:1.5;margin:5px 0 14px;font-style:italic;}'
+'#cvOverlay .cv-fat{padding:10px 12px;border-radius:10px;font-size:12px;font-weight:800;text-align:center;margin-bottom:13px;}'
+'#cvOverlay .cv-fat.sim{background:#eaf8ee;color:#15662d;border:1.4px solid #b7e5c4;}'
+'#cvOverlay .cv-fat.nao{background:#fdecef;color:#a01a30;border:1.4px solid #f6c3cc;}'
+'#cvOverlay .cv-macts{display:flex;gap:9px;}'
+'#cvOverlay .cv-mb{flex:1;padding:10px;border:0;border-radius:9px;color:#fff;font-size:12px;font-weight:800;letter-spacing:.4px;cursor:pointer;font-family:inherit;}'
+'#cvOverlay .cv-mb.ret{background:#1b3f7a;}#cvOverlay .cv-mb.ret:hover{background:#12305f;}'
+'#cvOverlay .cv-mb.fec{background:#8e1d2c;}#cvOverlay .cv-mb.fec:hover{background:#6f1521;}'
+'#cvOverlay .cv-rtxt{font-size:12.5px;color:#3c4a66;line-height:1.6;padding:11px 13px;border-radius:10px;background:#fff8e6;border-left:4px solid #eea93a;margin-bottom:13px;}'
;

/* ============================================================
   MONTAGEM
   ============================================================ */
var st=document.createElement('style');st.id='cvStyle';st.textContent=CSS;document.head.appendChild(st);

var ov=document.createElement('div');ov.id='cvOverlay';

var H=''
+'<div id="cvBox">'
+' <div id="cvAviso"><button id="cvAvisoX">&times;</button><b>'+IC.warn+' ATENÇÃO</b><span id="cvAvisoT"></span></div>'
+' <div class="cv-head">'
+'   <div class="cv-hbadge">'+IC.clip+'</div>'
+'   <div class="cv-htxt"><h1>VERIFICADOR DE CONVÊNIOS</h1><p>Consulte a validade e as regras de aceitação de pedidos médicos</p></div>'
+'   <div class="cv-hart"><span class="a1">'+IC.files+'</span><span class="a2">'+IC.stetho+'</span></div>'
+' </div>'
+' <div class="cv-body">'
+'   <label class="cv-lbl">Convênio</label>'
+'   <div class="cv-inwrap"><input class="cv-in" id="cvInput" autocomplete="off" placeholder="Digite o nome do convênio..."><span class="cv-chev">'+IC.chev+'</span></div>'
+'   <div class="cv-drop" id="cvDrop"></div>'
+'   <div id="cvRes" style="display:none">'
+'     <div class="cv-val" id="cvVal"><div class="vi">'+IC.calCheck+'</div><div class="vt"><h2 id="cvValT"></h2><p id="cvValS"></p></div><div class="vs">'+IC.shield+'</div></div>'
+'     <div class="cv-card"><div class="cv-cl"><div class="cv-av">'+IC.doc+'</div><div><h3>Pedido Médico</h3><span>Aceitação de cópia de pedido médico</span></div></div><div class="cv-cr" id="cvCopia"></div></div>'
+'     <div class="cv-card"><div class="cv-cl solo"><div class="cv-av">'+IC.doctor+'</div></div><div class="cv-cr" id="cvEsp"></div></div>'
+'     <button class="cv-anx" id="cvAnx"><span class="ci">'+IC.paperclip+'</span>Documentos anexos na Shift</button>'
+'     <div class="cv-obs" id="cvObs"></div>'
+'   </div>'
+'   <div class="cv-hr"></div>'
+'   <div class="cv-calch"><span class="ci">'+IC.calc+'</span>Calculadora de validade do Pedido Médico</div>'
+'   <div class="cv-dline"><span class="cv-dlbl">'+IC.cal+' Data do pedido:</span><input type="date" class="cv-date" id="cvDate"></div>'
+'   <div class="cv-res" id="cvCalcRes">'
+'     <div class="cv-resrow"><div class="cv-dias">Pedido tem <b id="cvDias">—</b></div><div class="cv-badge" id="cvBadge">—</div></div>'
+'     <div class="cv-datas"><div class="cv-dbox"><span>Data do pedido recebido</span><strong id="cvD1">—</strong></div><div class="cv-dbox"><span>Data limite de validade</span><strong id="cvD2">—</strong></div></div>'
+'   </div>'
+'   <div class="cv-acts"><button class="cv-b r" id="cvReset">'+IC.reset+' RESETAR <small>Zerar tudo</small></button><button class="cv-b f" id="cvFechar">'+IC.x+' FECHAR <small>Fecha a ferramenta</small></button></div>'
+'   <div class="cv-foot"><span class="fi">'+IC.info+'</span><p>As informações podem variar conforme atualização das operadoras.<br>Sempre consulte as regras oficiais do convênio.</p><span class="fs">'+IC.shield+'</span></div>'
+' </div>'
+' <div class="cv-mod" id="cvModA"><div class="cv-mbox">'
+'   <div class="cv-mhead"><h3 id="cvModATit">Gerenciador de Documentos da Shift</h3><button class="cv-mx" id="cvModAX">&times;</button></div>'
+'   <div class="cv-mbody" id="cvModABody"></div>'
+' </div></div>'
+' <div class="cv-mod" id="cvModR"><div class="cv-mbox">'
+'   <div class="cv-mhead"><h3 id="cvModRTit">Restrição</h3><button class="cv-mx" id="cvModRX">&times;</button></div>'
+'   <div class="cv-mbody"><div class="cv-rtxt" id="cvModRTxt"></div><div class="cv-macts"><button class="cv-mb ret" id="cvModRRet">RETORNAR</button></div></div>'
+' </div></div>'
+'</div>';

ov.innerHTML=H;
document.body.appendChild(ov);

var $=function(i){return document.getElementById(i);};
var atual=null;

/* ---------- fechar ---------- */
function fechar(){var o=$('cvOverlay');if(o)o.remove();var s=$('cvStyle');if(s)s.remove();}
ov.addEventListener('click',function(e){if(e.target===ov)fechar();});
$('cvFechar').addEventListener('click',fechar);

/* ---------- aviso dinâmico ---------- */
try{
 fetch('https://sandrolimadf1984.github.io/Convenios/aviso.txt?t='+Date.now())
  .then(function(r){return r.ok?r.text():'';})
  .then(function(t){
    if(t&&t.trim()!==''&&t.trim().indexOf('<')!==0){
      $('cvAvisoT').textContent=t.trim();
      $('cvAviso').className='on';
    }
  }).catch(function(){});
}catch(e){}
$('cvAvisoX').addEventListener('click',function(){$('cvAviso').className='';});

/* ---------- busca ---------- */
function norm(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();}
var inp=$('cvInput'),drop=$('cvDrop');

function filtrar(){
  var q=norm(inp.value);
  if(!q){drop.className='cv-drop';return;}
  var f=CONV.filter(function(c){return norm(c.nome).indexOf(q)>=0;});
  if(!f.length){drop.innerHTML='<div class="cv-vazio">Nenhum convênio encontrado.</div>';drop.className='cv-drop on';return;}
  var h='';
  for(var i=0;i<f.length;i++){h+='<div class="cv-item" data-n="'+f[i].nome.replace(/"/g,'&quot;')+'">'+f[i].nome+'</div>';}
  drop.innerHTML=h;drop.className='cv-drop on';
  var its=drop.querySelectorAll('.cv-item');
  for(var k=0;k<its.length;k++){
    its[k].addEventListener('click',function(){selecionar(this.getAttribute('data-n'));});
  }
}
inp.addEventListener('input',filtrar);
inp.addEventListener('focus',filtrar);
document.addEventListener('click',function(e){
  if(!drop.contains(e.target)&&e.target!==inp)drop.className='cv-drop';
});

/* ---------- render ---------- */
function selecionar(nome){
  var c=null;
  for(var i=0;i<CONV.length;i++){if(CONV[i].nome===nome){c=CONV[i];break;}}
  if(!c)return;
  atual=c;
  inp.value=c.nome;
  drop.className='cv-drop';
  render(c);
}

function render(c){
  $('cvRes').style.display='block';

  /* validade */
  var vb=$('cvVal'),vt=$('cvValT'),vs=$('cvValS');
  if(c.validade==='sem'){
    vb.className='cv-val sem';
    vt.textContent='Sem regras de Pedido Médico';
    vs.textContent='Veja a observação abaixo.';
  }else if(c.validade===null){
    vb.className='cv-val indet';
    vt.textContent='Validade do PM: Indeterminada';
    vs.textContent='Regras do pedido médico para '+c.nome+'.';
  }else{
    vb.className='cv-val';
    vt.textContent='Validade do PM: '+c.validade+' dias';
    vs.textContent='Regras do pedido médico para '+c.nome+'.';
  }

  /* cópia */
  var cx=$('cvCopia'),ch='';
  if(c.aceitaCopia===true){
    ch='<div class="cv-pill ok"><span class="b">'+IC.check+'</span><span class="t"><strong>Aceita cópia de pedido médico</strong><em>Cópia de pedido médico permitida</em></span></div>';
  }else if(c.aceitaCopia===false){
    ch='<div class="cv-pill no"><span class="b">'+IC.x+'</span><span class="t"><strong>Não aceita cópia de pedido médico</strong><em>Cópia de pedido médico não permitida</em></span></div>';
  }else if(c.aceitaCopia==='parcial'){
    ch='<div class="cv-pill ok"><span class="b">'+IC.check+'</span><span class="t"><strong>Aceita cópia com ressalvas</strong><em>'+(c.copiaObs||'Consulte a regra do convênio')+'</em></span></div>';
  }else{
    ch='<div class="cv-pill no"><span class="b">'+IC.x+'</span><span class="t"><strong>Sem regra definida</strong><em>Consulte a observação abaixo</em></span></div>';
  }
  cx.innerHTML=ch;

  /* especialidades */
  var ex=$('cvEsp'),eh='';
  var ac=c.aceita||[],na=c.naoAceita||[];

  if(ac.length){
    eh+='<div class="cv-esp ok"><span class="b">'+IC.check+'</span><span class="k">Aceita</span><span class="lst">';
    for(var i=0;i<ac.length;i++){
      eh+='<span class="cv-sig">'+ac[i].s+' <i>('+ac[i].d+')</i>';
      if(ac[i].r){eh+='<button class="cv-rbtn" data-r="'+i+'">ver restrição</button>';}
      eh+='</span>';
    }
    eh+='</span></div>';
  }
  if(na.length){
    eh+='<div class="cv-esp no"><span class="b">'+IC.x+'</span><span class="k">Não aceita</span><span class="lst"><span class="cv-sig">';
    var ns=[];for(var j=0;j<na.length;j++){ns.push(na[j].s);}
    eh+=ns.join(', ')+'</span></span></div>';
  }else if(ac.length){
    eh+='<div class="cv-esp no"><span class="b">'+IC.x+'</span><span class="k">Não aceita</span><span class="lst"><span class="cv-nada">Aceita todas as especialidades</span></span></div>';
  }
  ex.innerHTML=eh;

  var rb=ex.querySelectorAll('.cv-rbtn');
  for(var m=0;m<rb.length;m++){
    rb[m].addEventListener('click',function(){
      var it=atual.aceita[parseInt(this.getAttribute('data-r'),10)];
      $('cvModRTit').textContent='Restrição — '+it.s;
      $('cvModRTxt').textContent=it.r;
      $('cvModR').className='cv-mod on';
    });
  }

  /* anexos */
  $('cvAnx').disabled=!c.anexos;

  /* observação */
  var ob=$('cvObs');
  if(c.obs){ob.textContent=c.obs;ob.className='cv-obs on';}
  else{ob.className='cv-obs';ob.textContent='';}

  /* limpa calculadora */
  $('cvDate').value='';
  $('cvCalcRes').className='cv-res';
}

/* ---------- modal anexos ---------- */
$('cvAnx').addEventListener('click',function(){
  if(!atual||!atual.anexos)return;
  var a=atual.anexos,h='';
  $('cvModATit').textContent='Gerenciador de Documentos da Shift';

  if(a.pedidos&&a.pedidos.length){
    h+='<div class="cv-sect">'+IC.files+' Pedidos Médicos (Renomeados)</div>';
    for(var i=0;i<a.pedidos.length;i++){
      h+='<div class="cv-file"><span>'+a.pedidos[i]+'</span>'+IC.paperclip+'</div>';
    }
    if(a.pedidosObs)h+='<div class="cv-note">* '+a.pedidosObs+'</div>';
  }
  if(a.capas&&a.capas.length){
    h+='<div class="cv-sect">'+IC.layers+' Capas de Convênio (Renomeadas)</div>';
    for(var j=0;j<a.capas.length;j++){
      h+='<div class="cv-file"><span>'+a.capas[j]+'</span>'+IC.paperclip+'</div>';
    }
    if(a.capasObs)h+='<div class="cv-note">* '+a.capasObs+'</div>';
  }
  if(a.faturamento===true){h+='<div class="cv-fat sim">* Guia enviada ao Faturamento</div>';}
  else if(a.faturamento===false){h+='<div class="cv-fat nao">* Guia fica na Unidade</div>';}
  if(a.obs)h+='<div class="cv-rtxt">'+a.obs+'</div>';

  h+='<div class="cv-macts"><button class="cv-mb ret" id="cvModARet">RETORNAR</button><button class="cv-mb fec" id="cvModAFec">FECHAR</button></div>';
  $('cvModABody').innerHTML=h;
  $('cvModA').className='cv-mod on';
  $('cvModARet').addEventListener('click',function(){$('cvModA').className='cv-mod';});
  $('cvModAFec').addEventListener('click',fechar);
});
$('cvModAX').addEventListener('click',function(){$('cvModA').className='cv-mod';});
$('cvModRX').addEventListener('click',function(){$('cvModR').className='cv-mod';});
$('cvModRRet').addEventListener('click',function(){$('cvModR').className='cv-mod';});

/* ---------- calculadora ---------- */
$('cvDate').addEventListener('change',function(){
  if(!this.value)return;
  if(!atual){alert('Selecione primeiro o convênio.');this.value='';return;}
  if(atual.validade===null||atual.validade==='sem'){
    $('cvDias').textContent='—';
    $('cvD1').textContent=new Date(this.value+'T00:00:00').toLocaleDateString('pt-BR');
    $('cvD2').textContent='Sem prazo';
    var b0=$('cvBadge');b0.textContent='SEM PRAZO';b0.className='cv-badge v';
    $('cvCalcRes').className='cv-res on';
    return;
  }
  var d=new Date(this.value+'T00:00:00');
  var hoje=new Date();hoje.setHours(0,0,0,0);
  var dias=Math.floor((hoje-d)/86400000);
  var lim=new Date(d);lim.setDate(lim.getDate()+atual.validade);
  $('cvDias').textContent=dias+' dias';
  $('cvD1').textContent=d.toLocaleDateString('pt-BR');
  $('cvD2').textContent=lim.toLocaleDateString('pt-BR');
  var b=$('cvBadge');
  if(dias<=atual.validade&&dias>=0){b.textContent='VÁLIDO';b.className='cv-badge v';}
  else{b.textContent='VENCIDO';b.className='cv-badge x';}
  $('cvCalcRes').className='cv-res on';
});

/* ---------- reset ---------- */
$('cvReset').addEventListener('click',function(){
  atual=null;
  inp.value='';
  drop.className='cv-drop';
  $('cvRes').style.display='none';
  $('cvDate').value='';
  $('cvCalcRes').className='cv-res';
  $('cvModA').className='cv-mod';
  $('cvModR').className='cv-mod';
  inp.focus();
});

inp.focus();
})();
