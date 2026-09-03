(function(){
if(document.getElementById('cvOverlay')){document.getElementById('cvOverlay').style.display='flex';return;}

/* ============================================================
   BASE DE CONVÊNIOS
   ------------------------------------------------------------
   validade   : dias (número) | null (indeterminada) | 'sem'
   validadeTxt/validadeSub : (opcional) sobrescrevem o banner
   aceitaCopia: true | false | 'parcial' | null
   copiaObs   : (opcional) gera o botão "obs" ao lado do Pedido
                Médico. Aceita texto simples OU {t:'',l:[],a:''}
   aceita     : [{s:'CRM', d:'Médico', r:<ressalva>}]
                r gera o botão "ver ressalva".
                r aceita texto simples OU {t:'',l:[],a:''}
                  t = texto introdutório
                  l = lista de itens (um por linha)
                  a = alerta em destaque vermelho
   naoAceita  : [{s:'CRN'},{s:'COREN'}]
   anexos     : null -> botão "Documentos anexos na Shift" off
                {docs:[{n:'NOME DO DOC',
                        ren:'COMO RENOMEAR',
                        obs:<texto ou {t,l,a}>}],
                 faturamento:true  -> Guia enviada ao Faturamento
                 faturamento:false -> Guia fica na Unidade
                 faturamentoObs:'' -> linha extra dentro da tarja
                                      (ex.: prazo de envio da guia)}
   obs        : observação geral do convênio
   ============================================================ */

var CONV=[

{nome:'AFFEGO',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'COREN'}],
 anexos:{docs:[{n:'PEDIDO MÉDICO'},{n:'GUIA DE AUTORIZAÇÃO DO CONVÊNIO'}],faturamento:true}},

{nome:'AFEB',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'AGF ALLIANZ',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'COREN'}],anexos:null},

{nome:'AMIL',validade:180,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico',r:{
   t:'CRO aceito desde que a indicação clínica seja compatível com a especialidade.',
   l:['Exames pré-operatórios aceitos: Cre, Ure, Hem, TAP, TTPA, COA, EAS, Cultura, TGO, TGP e Hemo1.'],
   a:'NÃO aceita pedido de CRO para COVID-19.'}}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO',ren:'PM NOMEDOPACIENTECOMPLETO NºGUIA',
    obs:{t:'Havendo 2 ou mais pedidos médicos, renomear assim:',
         l:['PM 1 NOMEDOPACIENTECOMPLETO NºGUIA','PM 2 NOMEDOPACIENTECOMPLETO NºGUIA','PM 3 NOMEDOPACIENTECOMPLETO NºGUIA']}},
   {n:'ELEGIBILIDADE'}],
  faturamento:true}},

{nome:'ASSEDF / VIDA CARD FIDELIDADE',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'GUIA DE AUTORIZAÇÃO DO CONVÊNIO'}],
  faturamento:true,faturamentoObs:'Prazo de envio da guia: 72 horas'}},

{nome:'ASSEFAZ',validade:60,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico',r:'CRO aceito somente quando o solicitante for Cirurgião-Dentista.'}],
 naoAceita:[{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'ELEGIBILIDADE'},
   {n:'GUIA DE AUTORIZAÇÃO DO CONVÊNIO'}],
  faturamento:true}},

{nome:'BANCO CENTRAL',validade:60,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'ELEGIBILIDADE'},
   {n:'CARTEIRINHA DO CONVÊNIO'},
   {n:'GUIA DA SHIFT'}],
  faturamento:true}},

{nome:'BRADESCO',validade:60,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO',ren:'PM NOMEDOPACIENTECOMPLETO',
    obs:{t:'Obrigatório que o pedido esteja renomeado. Havendo mais de um pedido médico:',
         l:['PM  NOMEDOPACIENTECOMPLETO','PM2  NOMEDOPACIENTECOMPLETO','PM3  NOMEDOPACIENTECOMPLETO']}},
   {n:'CAPA BRADESCO',ren:'GU NOMEDOPACIENTECOMPLETO',
    obs:{t:'Obrigatório que a capa esteja renomeada:',
         l:['GU  NOMEDOPACIENTECOMPLETO']}}],
  faturamento:false}},

{nome:'BRASIL MED',validade:'sem',aceitaCopia:null,
 aceita:[],naoAceita:[],anexos:null,
 obs:'Não há regras de pedido médico. O paciente traz e assina o encaminhamento.'},

{nome:'BRB',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico',r:{
   t:'CRO aceito somente para os exames abaixo:',
   l:['HEM, GLI, HBGLI, URE, NA, K, TGO, TGP, GGT, BTF, PTF, CULTSEC, EAS, EPF, TC, TS e TAP.']}}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'ELEGIBILIDADE'},
   {n:'GUIA DE AUTORIZAÇÃO DO CONVÊNIO'}],
  faturamento:true}},

{nome:'CAESAN',validade:90,aceitaCopia:false,
 copiaObs:{t:'Não aceita cópia de pedido médico.',
           l:['Apenas em casos excepcionais, e somente se o pedido for da própria Caesan.']},
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'ELEGIBILIDADE'},
   {n:'GUIA DE AUTORIZAÇÃO DO CONVÊNIO'}],
  faturamento:true}},

{nome:'CÂMARA DOS DEPUTADOS / PRÓ-SAÚDE',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[],
 anexos:{docs:[{n:'PEDIDO MÉDICO'}],faturamento:true}},

{nome:'CAMED',validade:'sem',validadeTxt:'Regras de PM ainda não cadastradas',
 validadeSub:'Por enquanto só está registrado o destino da guia.',
 aceitaCopia:null,aceita:[],naoAceita:[],
 anexos:{docs:[],faturamento:false}},

{nome:'CAPESAÚDE',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'ELEGIBILIDADE'}],
  faturamento:true,faturamentoObs:'Prazo de envio da guia: 72 horas'}},

{nome:'CARE PLUS',validade:180,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},
         {s:'CRO',d:'Dentista/Biomédico',r:{
   t:'CRO aceito, porém com uma condição obrigatória:',
   a:'É necessária autorização de atendimento para 100% dos exames solicitados por profissionais com CRO.'}},
         {s:'CRN',d:'Nutricionista',r:{
   t:'O CRN poderá solicitar apenas os exames abaixo:',
   l:['Cálcio','Fósforo','Magnésio','Zinco','Hemograma','Glicose','Insulina',
      'Hemoglobina glicada','Colesterol','Triglicérides','Ureia','Ferritina',
      'Ácido fólico','Vitamina B12','Homocisteína','Proteínas totais','Ferro',
      'Vitamina C','Vitamina A']}}],
 naoAceita:[{s:'COREN'}],
 anexos:{docs:[{n:'PEDIDO MÉDICO'}],faturamento:true}},

{nome:'CASEMBRAPA',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'},{s:'CRN',d:'Nutricionista',r:'CRN aceito com ressalvas.'}],
 naoAceita:[],
 anexos:{docs:[],faturamento:false}},

{nome:'CASSI',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],
 anexos:{docs:[{n:'PEDIDO MÉDICO'}],faturamento:true}},

{nome:'CASSI PERIÓDICO',validade:'sem',
 validadeTxt:'Não aceitar encaminhamento vencido',
 validadeSub:'Verificar sempre a validade da guia da Cassi.',
 aceitaCopia:null,aceita:[],naoAceita:[],
 anexos:{docs:[{n:'GUIA PERIÓDICO CASSI'}],faturamento:true},
 obs:'O beneficiário deve apresentar o encaminhamento da Cassi.'},

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
 naoAceita:[],
 anexos:{docs:[],faturamento:false}},

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
 naoAceita:[{s:'CRN'},{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'ELEGIBILIDADE'},
   {n:'DOCUMENTAÇÃO PESSOAL + CARTEIRINHA',
    obs:{t:'O documento pessoal precisa ser:',l:['Com foto','Frente e verso']}}],
  faturamento:true}},

{nome:'HOSPITAL NAVAL / FUSMA',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[],anexos:null},

{nome:'INAS',validade:60,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO',obs:'Assinado conforme documento.'},
   {n:'GUIA DE AUTORIZAÇÃO DO CONVÊNIO',obs:'Assinado conforme documento.'},
   {n:'DOCUMENTAÇÃO PESSOAL + CARTEIRINHA',
    obs:{t:'O documento pessoal precisa ser:',
         l:['Com foto','Frente e verso'],
         a:'Se for menor de idade, anexar também a documentação do responsável.'}}],
  faturamento:true}},

{nome:'INTERMEDICA',validade:180,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'RMS',d:'Residente'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'COREN'}],anexos:null},

{nome:'IPASGO',validade:null,aceitaCopia:'parcial',
 copiaObs:'Cópia de pedido médico aceita com ressalvas.',
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

{nome:'MEDSENIOR',validade:null,aceitaCopia:true,
 copiaObs:{t:'Regras para aceite de pedido médico em CÓPIA. Para atender beneficiários da MedSenior com pedido em cópia:',
           l:['Solicitar a autorização normalmente',
              'Depois enviar o número da guia autorizada e o pedido em anexo para o e-mail adm_callcenter@medsenior.com.br',
              'Aguardar a resposta autorizando o atendimento'],
           a:'IMPORTANTE: imprimir e grampear a resposta do e-mail junto com as guias enviadas para o faturamento, e anexar na Shift.'},
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'COMPROVANTE MÉDICO HOSPITALAR'},
   {n:'GUIA DE AUTORIZAÇÃO DO CONVÊNIO'}],
  faturamento:true}},

{nome:'NOTRE DAME',validade:180,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'RMS',d:'Residente'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'COREN'}],anexos:null},

{nome:'OMINT SAÚDE',validade:90,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico',r:{
   t:'CRO aceito somente para Cirurgiões-Dentistas. São aceitos apenas os exames autorizados para essa especialidade:',
   l:['Biópsia',
      'Sorologia para Hepatite A, B e C',
      'HIV',
      'Hemograma',
      'Coagulograma',
      'CD4 e CD8',
      'Hbgli',
      'Glicose',
      'Fosfatase ácida',
      'Fosfatase alcalina',
      'Culturas de punção de líquidos de lesões maxilo-mandibulares']}}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'ELEGIBILIDADE'}],
  faturamento:true}},

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
 copiaObs:{t:'Regras específicas do pedido médico no Postal Saúde:',
           l:['Pedido médico digitalizado com acréscimo a caneta: só é aceito o que está digitalizado. O acréscimo a caneta não pode ser realizado.',
              'Aceita pedido médico do SUS com inclusão de caneta.'],
           a:'Em hipótese alguma cadastrar exames acrescentados a caneta.'},
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'},
         {s:'CRN',d:'Nutricionista',r:{
   t:'Avaliação do estado geral do paciente. O CRN poderá solicitar apenas os exames abaixo:',
   l:['Hemograma completo',
      'Albumina sérica',
      'Cálcio',
      'Cálcio iônico',
      'Zinco sérico',
      'Zinco eritrocitário',
      'Magnésio',
      'Cromo',
      'Ácido fólico',
      'Cortisol',
      'EAS',
      'Coprológico funcional',
      'Pesquisa de sangue oculto',
      'Fósforo',
      'Potássio',
      'Sódio',
      'Ferro',
      'Transferrina',
      'Ferritina sérica',
      'Saturação de transferrina',
      'TODAS as vitaminas',
      'Glicemia em jejum',
      'Hemoglobina glicada',
      'Frutosamina',
      'Curva glicêmica e insulínica',
      'Insulina basal (HOMA IR e beta)',
      'Glicemia pós-prandial',
      'Teste de tolerância à lactose',
      'Teste de intolerância alimentar (para 220 alimentos)',
      'IGA, IGG e IGE para alimentos',
      'Anti-endomísio (IGA)',
      'Anti-gliadina (IGA, IGG)',
      'Anti-transglutaminase (IGA)',
      'IGA e IGG totais',
      'Perfil lipídico',
      'PCR ultrassensível',
      'APO a',
      'APO b',
      'Lipoproteína A',
      'Homocisteína',
      'Creatinina sérica',
      'Sódio sérico',
      'Potássio sérico',
      'Uréia',
      'PTH',
      'TGO',
      'TGP',
      'Gama GT',
      'Fosfatase alcalina',
      'Minerais e mineralograma',
      'T3',
      'T4 livre e total',
      'TSH',
      'Anti TPO',
      'Anticorpos antitireoglobulinas']}}],
 naoAceita:[{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'ELEGIBILIDADE'},
   {n:'GUIA DE AUTORIZAÇÃO DO CONVÊNIO'}],
  faturamento:true}},

{nome:'PREVENT SENIOR',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],
 anexos:{docs:[],faturamento:false}},

{nome:'PROASA',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],
 anexos:{docs:[],faturamento:false}},

{nome:'REDE TOTAL / ADM SAÚDE',validade:60,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'}],
 naoAceita:[{s:'CRN'},{s:'CRO'},{s:'RMS'},{s:'COREN'}],anexos:null},

{nome:'RISA SERVIÇOS EM SAÚDE',validade:'sem',validadeTxt:'Regras de PM ainda não cadastradas',
 validadeSub:'Por enquanto só está registrado o destino da guia.',
 aceitaCopia:null,aceita:[],naoAceita:[],
 anexos:{docs:[],faturamento:false}},

{nome:'SAÚDE CAIXA',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'},{s:'COREN',d:'Enfermeiro'}],
 naoAceita:[],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'CARTEIRINHA DO CONVÊNIO'}],
  faturamento:true}},

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
 copiaObs:{t:'Aceita pedido médico impresso com complemento de solicitação de exames manuscritos, desde que:',
           l:['Sem rasuras','Escrito com caneta da mesma cor da assinatura do médico']},
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'},
         {s:'CRN',d:'Nutricionista',r:{
   t:'O CRN poderá solicitar apenas os seguintes exames laboratoriais:',
   l:['Hemograma completo',
      'Proteínas totais e frações',
      'Proteína ligadora de retinol',
      'Triglicérides, colesterol total e frações',
      'Glicemia, teste oral de tolerância à glicose, insulina, peptídeo C e hemoglobina glicada',
      'Tiroxina total e livre, triiodotironina, globulina ligadora de tiroxina (TBG) e TSH',
      'Gasometria arterial',
      'Ureia e creatinina',
      'Sódio, cálcio total e iônico, potássio sérico, fósforo sérico e magnésio sérico',
      'Ácido úrico, oxalato e citrato',
      'TGO, TGP e GGT',
      'Ferro sérico, transferrina, ferritina e capacidade total de ligação do ferro',
      'Vitamina B12, ácido fólico e vitamina D']}}],
 naoAceita:[{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'GUIA DE AUTORIZAÇÃO DO CONVÊNIO',obs:'Anexar somente se houver autorização que alerta na Shift.'}],
  faturamento:true}},

{nome:'STJ',validade:null,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'STM / PLAS / JMU',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'SUL AMÉRICA',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico',r:'CRO aceito com ressalvas.'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],
 anexos:{docs:[],faturamento:false}},

{nome:'TJDFT',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'TRE',validade:30,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'GUIA DE AUTORIZAÇÃO DO CONVÊNIO'}],
  faturamento:true}},

{nome:'TRF',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},
         {s:'CRN',d:'Nutricionista',r:'CRN aceito com ressalvas.'},
         {s:'CRO',d:'Dentista/Biomédico',r:'CRO aceito com ressalvas.'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'TRT',validade:90,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'ELEGIBILIDADE'},
   {n:'GUIA DE AUTORIZAÇÃO DO CONVÊNIO'}],
  faturamento:true}},

{nome:'TST',validade:30,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],anexos:null},

{nome:'UNAFISCO',validade:null,aceitaCopia:true,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRN',d:'Nutricionista'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'COREN'}],anexos:null},

{nome:'UNIMED SEGUROS',validade:null,aceitaCopia:false,
 aceita:[{s:'CRM',d:'Médico'},{s:'CRO',d:'Dentista/Biomédico'}],
 naoAceita:[{s:'CRN'},{s:'COREN'}],
 anexos:{docs:[
   {n:'PEDIDO MÉDICO'},
   {n:'ELEGIBILIDADE'},
   {n:'GUIA DE AUTORIZAÇÃO UNIMED SEGUROS'}],
  faturamento:true}},

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
+'#cvAviso{display:none;background:#ffcf3d;color:#3a2c00;padding:12px 34px 12px 14px;font-size:12.5px;line-height:1.5;position:relative;border-bottom:1px solid #d9a800;}'
+'#cvAviso.on{display:block;}'
+'#cvAviso b{display:flex;align-items:center;gap:6px;font-size:12.5px;margin-bottom:3px;}'
+'#cvAviso b svg{font-size:14px;}'
+'#cvAvisoX{position:absolute;top:7px;right:9px;background:none;border:0;color:#3a2c00;font-size:16px;line-height:1;cursor:pointer;font-weight:700;}'
+'#cvOverlay .cv-head{background:linear-gradient(120deg,#1b52ad 0%,#1668ce 55%,#1877d8 100%);padding:17px 18px;display:flex;align-items:center;gap:13px;position:relative;overflow:hidden;}'
+'#cvOverlay .cv-hbadge{width:44px;height:44px;border-radius:13px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;color:#fff;font-size:23px;flex:0 0 auto;}'
+'#cvOverlay .cv-htxt{flex:1;min-width:0;}'
+'#cvOverlay .cv-htxt h1{font-size:16.5px;font-weight:800;color:#fff;letter-spacing:.6px;line-height:1.2;}'
+'#cvOverlay .cv-htxt p{font-size:11px;color:rgba(255,255,255,.82);margin-top:3px;line-height:1.35;}'
+'#cvOverlay .cv-hart{flex:0 0 auto;display:flex;align-items:center;gap:5px;color:rgba(255,255,255,.55);}'
+'#cvOverlay .cv-hart .a1{font-size:27px;}#cvOverlay .cv-hart .a2{font-size:22px;}'
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
+'#cvOverlay .cv-card{display:flex;align-items:stretch;gap:11px;margin-top:10px;padding:11px;border:1.4px solid #dde4ee;border-radius:14px;background:#fff;}'
+'#cvOverlay .cv-cl{display:flex;align-items:center;gap:9px;flex:0 0 auto;width:132px;}'
+'#cvOverlay .cv-cl.solo{width:66px;justify-content:center;}'
+'#cvOverlay .cv-av{width:44px;height:44px;border-radius:12px;background:#eef4fd;color:#1668ce;display:flex;align-items:center;justify-content:center;font-size:23px;flex:0 0 auto;}'
+'#cvOverlay .cv-cl h3{font-size:12.5px;font-weight:800;color:#22304c;line-height:1.2;}'
+'#cvOverlay .cv-cl span{font-size:9.5px;color:#8b93a4;line-height:1.3;display:block;margin-top:2px;}'
+'#cvOverlay .cv-cr{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px;justify-content:center;}'
+'#cvOverlay .cv-pill{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:11px;}'
+'#cvOverlay .cv-pill.ok{background:#eaf8ee;border:1.3px solid #b7e5c4;}'
+'#cvOverlay .cv-pill.no{background:#fdecef;border:1.3px solid #f6c3cc;}'
+'#cvOverlay .cv-pill .b{width:23px;height:23px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;flex:0 0 auto;}'
+'#cvOverlay .cv-pill.ok .b{background:#20a145;}#cvOverlay .cv-pill.no .b{background:#e0364f;}'
+'#cvOverlay .cv-pill .t{flex:1;min-width:0;}'
+'#cvOverlay .cv-pill .t strong{display:flex;align-items:center;gap:7px;flex-wrap:wrap;font-size:12.5px;font-weight:800;line-height:1.25;}'
+'#cvOverlay .cv-pill .t em{display:block;font-style:normal;font-size:9.5px;margin-top:2px;opacity:.82;}'
+'#cvOverlay .cv-pill.ok .t{color:#177a34;}#cvOverlay .cv-pill.no .t{color:#c0273e;}'
+'#cvOverlay .cv-esp{display:flex;align-items:flex-start;gap:9px;padding:9px 11px;border-radius:11px;}'
+'#cvOverlay .cv-esp.ok{background:#eaf8ee;border:1.3px solid #b7e5c4;}'
+'#cvOverlay .cv-esp.no{background:#fdecef;border:1.3px solid #f6c3cc;}'
+'#cvOverlay .cv-esp .b{width:23px;height:23px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;flex:0 0 auto;margin-top:1px;}'
+'#cvOverlay .cv-esp.ok .b{background:#20a145;}#cvOverlay .cv-esp.no .b{background:#e0364f;}'
+'#cvOverlay .cv-esp .k{font-size:12.5px;font-weight:800;flex:0 0 auto;padding-top:3px;color:#1a1a1a;}'
+'#cvOverlay .cv-esp .lst{flex:1;min-width:0;border-left:1.3px solid rgba(0,0,0,.09);padding-left:9px;display:flex;flex-direction:column;gap:3px;}'
+'#cvOverlay .cv-sig{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:12.5px;font-weight:800;line-height:1.3;}'
+'#cvOverlay .cv-esp.ok .cv-sig{color:#177a34;}#cvOverlay .cv-esp.no .cv-sig{color:#c0273e;}'
+'#cvOverlay .cv-sig i{font-style:normal;font-weight:500;font-size:10.5px;opacity:.78;}'
+'#cvOverlay .cv-rbtn{border:1.2px solid #e79a1f;background:#fff5e0;color:#a8690a;font-size:9.5px;font-weight:800;padding:2px 8px;border-radius:20px;cursor:pointer;font-family:inherit;letter-spacing:.2px;white-space:nowrap;}'
+'#cvOverlay .cv-rbtn:hover{background:#ffe9c2;}'
+'#cvOverlay .cv-nada{font-size:11px;color:#98a2b3;font-style:italic;padding-top:3px;}'
+'#cvOverlay .cv-anx{display:flex;align-items:center;justify-content:center;gap:9px;margin:12px auto 0;padding:11px 20px;border-radius:30px;background:linear-gradient(180deg,#f4f6fa,#e7ecf4);border:1.5px solid #ccd6e6;color:#2b3852;font-size:12.5px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 2px 5px rgba(20,40,80,.07);transition:.15s;}'
+'#cvOverlay .cv-anx:hover:not(:disabled){background:linear-gradient(180deg,#eaf1fb,#d9e5f6);border-color:#9dbbe4;}'
+'#cvOverlay .cv-anx:disabled{opacity:.45;cursor:not-allowed;}'
+'#cvOverlay .cv-anx .ci{width:26px;height:26px;border-radius:50%;background:#fff;border:1.3px solid #ccd6e6;display:flex;align-items:center;justify-content:center;font-size:13px;color:#5b6880;}'
+'#cvOverlay .cv-obs{margin-top:11px;padding:10px 12px;border-radius:11px;background:#fff8e6;border-left:4px solid #eea93a;font-size:11.5px;color:#7a5a11;line-height:1.5;display:none;}'
+'#cvOverlay .cv-obs.on{display:block;}'
+'#cvOverlay .cv-hr{height:1px;background:#e6ebf3;margin:15px 0 13px;}'
+'#cvOverlay .cv-calch{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:800;color:#1152a8;margin-bottom:10px;}'
+'#cvOverlay .cv-calch .ci{width:24px;height:24px;border-radius:7px;background:#eaf2fd;display:flex;align-items:center;justify-content:center;font-size:14px;}'
+'#cvOverlay .cv-dline{display:flex;align-items:center;gap:11px;}'
+'#cvOverlay .cv-dlbl{display:flex;align-items:center;gap:7px;font-size:12.5px;font-weight:700;color:#3c4a66;white-space:nowrap;}'
+'#cvOverlay .cv-dlbl svg{font-size:15px;color:#c0392b;}'
+'#cvOverlay .cv-date{flex:1;padding:10px 12px;border:1.6px solid #ccd6e6;border-radius:11px;font-size:13.5px;font-weight:600;color:#17264a;outline:none;font-family:inherit;background:#fff;}'
+'#cvOverlay .cv-date:focus{border-color:#1668ce;box-shadow:0 0 0 3px rgba(22,104,206,.13);}'
+'#cvOverlay .cv-res{display:none;margin-top:11px;}'
+'#cvOverlay .cv-res.on{display:block;}'
+'#cvOverlay .cv-resrow{display:flex;align-items:center;gap:9px;}'
+'#cvOverlay .cv-dias{flex:1;padding:10px 12px;border:1.4px solid #dde4ee;border-radius:11px;font-size:12px;color:#3c4a66;background:#f8fafd;line-height:1.5;}'
+'#cvOverlay .cv-dias b{color:#1152a8;font-weight:800;}'
+'#cvOverlay .cv-dias b.hoje{color:#1f8a3c;letter-spacing:.3px;}'
+'#cvOverlay .cv-dias b.cad{color:#1152a8;letter-spacing:.3px;}'
+'#cvOverlay .cv-cadbloco{display:none;margin-top:13px;padding-top:13px;border-top:1.5px dashed #d5dde9;}'
+'#cvOverlay .cv-cadbloco.on{display:block;}'
+'#cvOverlay .cv-cadline{display:flex;align-items:center;gap:11px;}'
+'#cvOverlay .cv-cadlbl{display:flex;align-items:center;gap:7px;font-size:12.5px;font-weight:700;color:#3c4a66;white-space:nowrap;}'
+'#cvOverlay .cv-cadlbl svg{font-size:15px;color:#1152a8;}'
+'#cvOverlay .cv-cadres{display:none;margin-top:10px;}'
+'#cvOverlay .cv-cadres.on{display:block;}'
+'#cvOverlay .cv-badge{padding:10px 18px;border-radius:11px;font-size:13px;font-weight:900;letter-spacing:1px;display:flex;align-items:center;justify-content:center;min-width:100px;}'
+'#cvOverlay .cv-badge.v{background:#eaf8ee;color:#15662d;border:1.7px solid #46b866;}'
+'#cvOverlay .cv-badge.x{background:#fdecef;color:#a01a30;border:1.7px solid #e0364f;}'
+'#cvOverlay .cv-badge.n{background:#fff5e0;color:#a8690a;border:1.7px solid #e79a1f;font-size:11px;letter-spacing:.5px;}'
+'#cvOverlay .cv-datas{display:flex;gap:9px;margin-top:9px;}'
+'#cvOverlay .cv-dbox{flex:1;padding:9px 12px;border-radius:11px;background:#f2f6fb;border:1.3px solid #e0e8f3;}'
+'#cvOverlay .cv-dbox span{display:block;font-size:9.5px;font-weight:700;color:#8b93a4;letter-spacing:.2px;}'
+'#cvOverlay .cv-dbox strong{display:block;font-size:14px;font-weight:800;color:#1152a8;margin-top:2px;}'
+'#cvOverlay .cv-acts{display:flex;gap:10px;margin-top:15px;}'
+'#cvOverlay .cv-b{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 10px;border:0;border-radius:12px;color:#fff;font-size:13px;font-weight:800;letter-spacing:.4px;cursor:pointer;font-family:inherit;transition:.12s;}'
+'#cvOverlay .cv-b small{font-weight:500;font-size:9.5px;opacity:.85;letter-spacing:0;}'
+'#cvOverlay .cv-b:active{transform:scale(.98);}'
+'#cvOverlay .cv-b.r{background:linear-gradient(135deg,#1b52ad,#1877d8);box-shadow:0 4px 12px rgba(22,82,173,.3);}'
+'#cvOverlay .cv-b.f{background:linear-gradient(135deg,#e0364f,#c0273e);box-shadow:0 4px 12px rgba(224,54,79,.3);}'
+'#cvOverlay .cv-b.r:hover{background:linear-gradient(135deg,#1877d8,#2a8ae8);}'
+'#cvOverlay .cv-b.f:hover{background:linear-gradient(135deg,#c0273e,#a01a30);}'
+'#cvOverlay .cv-sug{margin-top:15px;text-align:center;font-size:11.5px;font-weight:700;color:#1152a8;line-height:1.75;}'
+'#cvOverlay .cv-sug span{color:#8e1d2c;font-weight:800;}'
+'#cvOverlay .cv-cred{text-align:center;margin-top:11px;font-size:11.5px;font-weight:800;color:#a08a45;letter-spacing:.2px;}'

/* ---- MODAIS ---- */
+'#cvOverlay .cv-mod{position:absolute;inset:0;background:rgba(15,25,45,.5);display:none;align-items:center;justify-content:center;padding:18px;border-radius:22px;}'
+'#cvOverlay .cv-mod.on{display:flex;}'
+'#cvOverlay .cv-mbox{width:100%;max-width:418px;max-height:100%;overflow-y:auto;background:#fff;border-radius:15px;box-shadow:0 18px 46px rgba(0,0,0,.35);}'
+'#cvOverlay .cv-mhead{display:flex;align-items:center;gap:9px;padding:13px 15px;border-bottom:1.4px solid #e6ebf3;position:sticky;top:0;background:#fff;border-radius:15px 15px 0 0;}'
+'#cvOverlay .cv-mhead h3{flex:1;font-size:13.5px;font-weight:800;color:#22304c;}'
+'#cvOverlay .cv-mx{background:none;border:0;color:#8b93a4;font-size:19px;line-height:1;cursor:pointer;font-family:inherit;padding:0 2px;}'
+'#cvOverlay .cv-mx:hover{color:#e0364f;}'
+'#cvOverlay .cv-mbody{padding:14px 15px;}'
+'#cvOverlay .cv-sect{display:flex;align-items:center;gap:7px;font-size:12px;font-weight:800;color:#22304c;margin-bottom:10px;}'
+'#cvOverlay .cv-sect svg{font-size:15px;color:#1668ce;}'

/* barra roxa do documento */
+'#cvOverlay .cv-docbar{display:flex;align-items:center;gap:9px;padding:10px 13px;border:1.4px solid #b9a9e6;border-radius:9px;background:#ded6f5;font-size:13px;font-weight:800;color:#382c63;letter-spacing:.2px;}'
+'#cvOverlay .cv-docbar span{flex:1;min-width:0;}'
+'#cvOverlay .cv-docbar svg{font-size:15px;color:#6b5aa6;flex:0 0 auto;}'
+'#cvOverlay .cv-ren{font-size:9.8px;color:#8b93a4;font-style:italic;margin:4px 0 0 3px;letter-spacing:.1px;}'
+'#cvOverlay .cv-ren b{color:#5b6880;font-style:normal;font-weight:700;}'

/* caixa amarela de observação do documento */
+'#cvOverlay .cv-dobs{margin:7px 0 0 3px;padding:10px 13px;border-left:4px solid #eea93a;border-radius:0 9px 9px 0;background:#fdf6e3;}'
+'#cvOverlay .cv-dobs p{font-size:11.3px;color:#6b5320;line-height:1.55;}'
+'#cvOverlay .cv-dobs ul{list-style:none;margin:6px 0 0 0;padding:0;}'
+'#cvOverlay .cv-dobs li{font-size:11.5px;color:#4a3a12;font-weight:700;line-height:1.75;padding-left:12px;position:relative;letter-spacing:.2px;}'
+'#cvOverlay .cv-dobs li:before{content:"";position:absolute;left:1px;top:9px;width:4px;height:4px;border-radius:50%;background:#c9922a;}'
+'#cvOverlay .cv-dobs ul.cols{column-count:2;column-gap:16px;}'
+'#cvOverlay .cv-dobs ul.cols li{break-inside:avoid;-webkit-column-break-inside:avoid;font-size:10.8px;line-height:1.6;font-weight:600;}'
+'#cvOverlay .cv-dobs .al{margin-top:8px;padding:7px 10px;border-radius:7px;background:#fdecef;color:#a01a30;font-size:11px;font-weight:700;line-height:1.5;}'
+'#cvOverlay .cv-docwrap{margin-bottom:14px;}'
+'#cvOverlay .cv-fat{padding:11px 12px;border-radius:10px;font-size:12.5px;font-weight:800;text-align:center;margin:4px 0 13px;}'
+'#cvOverlay .cv-fat.sim{background:#eaf8ee;color:#15662d;border:1.4px solid #b7e5c4;}'
+'#cvOverlay .cv-fat.nao{background:#fdecef;color:#a01a30;border:1.4px solid #f6c3cc;}'
+'#cvOverlay .cv-fat small{display:block;font-size:10.5px;font-weight:700;margin-top:4px;opacity:.82;letter-spacing:.2px;}'
+'#cvOverlay .cv-macts{display:flex;gap:9px;}'
+'#cvOverlay .cv-mb{flex:1;padding:11px;border:0;border-radius:9px;color:#fff;font-size:12px;font-weight:800;letter-spacing:.6px;cursor:pointer;font-family:inherit;}'
+'#cvOverlay .cv-mb.ret{background:#1b3f7a;}#cvOverlay .cv-mb.ret:hover{background:#12305f;}'
+'#cvOverlay .cv-mb.fec{background:#8e1d2c;}#cvOverlay .cv-mb.fec:hover{background:#6f1521;}'
+'#cvOverlay .cv-vazioanx{font-size:11.5px;color:#98a2b3;font-style:italic;padding:12px;text-align:center;border:1.4px dashed #d5dde9;border-radius:9px;margin-bottom:14px;}'
;

/* ============================================================
   MONTAGEM
   ============================================================ */
var st=document.createElement('style');st.id='cvStyle';st.textContent=CSS;document.head.appendChild(st);
var ov=document.createElement('div');ov.id='cvOverlay';

ov.innerHTML=''
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
+'     <div class="cv-card" id="cvCardEsp"><div class="cv-cl solo"><div class="cv-av">'+IC.doctor+'</div></div><div class="cv-cr" id="cvEsp"></div></div>'
+'     <button class="cv-anx" id="cvAnx"><span class="ci">'+IC.paperclip+'</span>Documentos anexos na Shift</button>'
+'     <div class="cv-obs" id="cvObs"></div>'
+'   </div>'
+'   <div class="cv-hr"></div>'
+'   <div class="cv-calch"><span class="ci">'+IC.calc+'</span>Calculadora de validade do Pedido Médico</div>'
+'   <div class="cv-dline"><span class="cv-dlbl">'+IC.cal+' Data do pedido:</span><input type="date" class="cv-date" id="cvDate"></div>'
+'   <div class="cv-res" id="cvCalcRes">'
+'     <div class="cv-resrow"><div class="cv-dias">De acordo com o dia de <b class="hoje">HOJE</b>, o pedido tem <b id="cvDias">—</b></div><div class="cv-badge" id="cvBadge">—</div></div>'
+'     <div class="cv-datas"><div class="cv-dbox"><span>Data do pedido recebido</span><strong id="cvD1">—</strong></div><div class="cv-dbox"><span>Data limite de validade</span><strong id="cvD2">—</strong></div></div>'
+'     <div class="cv-cadbloco on" id="cvCadBloco">'
+'       <div class="cv-cadline"><span class="cv-cadlbl">'+IC.cal+' Data do cadastro:</span><input type="date" class="cv-date" id="cvDateCad"></div>'
+'       <div class="cv-cadres" id="cvCadRes"><div class="cv-resrow"><div class="cv-dias" id="cvCadTxt">—</div><div class="cv-badge" id="cvCadBadge">—</div></div></div>'
+'     </div>'
+'   </div>'
+'   <div class="cv-acts"><button class="cv-b r" id="cvReset">'+IC.reset+' RESETAR <small>Zerar tudo</small></button><button class="cv-b f" id="cvFechar">'+IC.x+' FECHAR <small>Fecha a ferramenta</small></button></div>'
+'   <div class="cv-sug">*Tem alguma sugestão ou ideia para melhorar o sistema?<br>Envie para: <span>sandro.pereira@sabin.com.br</span></div>'
+'   <div class="cv-cred">criado por Sandro de Lima Pereira</div>'
+' </div>'
+' <div class="cv-mod" id="cvModA"><div class="cv-mbox">'
+'   <div class="cv-mhead"><h3 id="cvModATit">Gerenciador de Documentos da Shift</h3><button class="cv-mx" id="cvModAX">&times;</button></div>'
+'   <div class="cv-mbody" id="cvModABody"></div>'
+' </div></div>'
+' <div class="cv-mod" id="cvModR"><div class="cv-mbox">'
+'   <div class="cv-mhead"><h3 id="cvModRTit">Ressalva</h3><button class="cv-mx" id="cvModRX">&times;</button></div>'
+'   <div class="cv-mbody"><div id="cvModRTxt"></div><div class="cv-macts" style="margin-top:13px"><button class="cv-mb ret" id="cvModRRet">RETORNAR</button></div></div>'
+' </div></div>'
+'</div>';

document.body.appendChild(ov);
var $=function(i){return document.getElementById(i);};
var atual=null;

/* ---------- helper: monta texto simples ou {t,l,a} ---------- */
function bloco(o){
  if(!o)return '';
  var h='<div class="cv-dobs">';
  if(typeof o==='string'){h+='<p>'+o+'</p>';}
  else{
    if(o.t)h+='<p>'+o.t+'</p>';
    if(o.l&&o.l.length){h+='<ul'+(o.l.length>12?' class="cols"':'')+'>';for(var i=0;i<o.l.length;i++){h+='<li>'+o.l[i]+'</li>';}h+='</ul>';}
    if(o.a)h+='<div class="al">'+o.a+'</div>';
  }
  return h+'</div>';
}

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

function selecionar(nome){
  var c=null;
  for(var i=0;i<CONV.length;i++){if(CONV[i].nome===nome){c=CONV[i];break;}}
  if(!c)return;
  atual=c;inp.value=c.nome;drop.className='cv-drop';render(c);
}

/* ---------- abre o modal de ressalva/obs ---------- */
function abrirRessalva(titulo,conteudo){
  $('cvModRTit').textContent=titulo;
  $('cvModRTxt').innerHTML=bloco(conteudo);
  $('cvModR').className='cv-mod on';
}

/* ---------- render ---------- */
function render(c){
  $('cvRes').style.display='block';

  var vb=$('cvVal'),vt=$('cvValT'),vs=$('cvValS');
  if(c.validade==='sem'){
    vb.className='cv-val sem';
    vt.textContent=c.validadeTxt||'Sem regras de Pedido Médico';
    vs.textContent=c.validadeSub||'Veja a observação abaixo.';
  }else if(c.validade===null){
    vb.className='cv-val indet';
    vt.textContent='Validade do PM: Indeterminada';
    vs.textContent='Regras do pedido médico para '+c.nome+'.';
  }else{
    vb.className='cv-val';
    vt.textContent='Validade do PM: '+c.validade+' dias';
    vs.textContent='Regras do pedido médico para '+c.nome+'.';
  }

  /* --- cópia de pedido médico --- */
  var cx=$('cvCopia'),ch='',btnObs=c.copiaObs?'<button class="cv-rbtn" id="cvBtnCopiaObs">obs</button>':'';
  if(c.aceitaCopia===true){
    ch='<div class="cv-pill ok"><span class="b">'+IC.check+'</span><span class="t"><strong>Aceita cópia de pedido médico'+btnObs+'</strong><em>Cópia de pedido médico permitida</em></span></div>';
  }else if(c.aceitaCopia===false){
    ch='<div class="cv-pill no"><span class="b">'+IC.x+'</span><span class="t"><strong>Não aceita cópia de pedido médico'+btnObs+'</strong><em>Cópia de pedido médico não permitida</em></span></div>';
  }else if(c.aceitaCopia==='parcial'){
    ch='<div class="cv-pill ok"><span class="b">'+IC.check+'</span><span class="t"><strong>Aceita cópia com ressalvas'+btnObs+'</strong><em>Cópia permitida sob condições</em></span></div>';
  }else{
    ch='<div class="cv-pill no"><span class="b">'+IC.x+'</span><span class="t"><strong>Sem regra definida'+btnObs+'</strong><em>Consulte a observação abaixo</em></span></div>';
  }
  cx.innerHTML=ch;
  if(c.copiaObs){
    $('cvBtnCopiaObs').addEventListener('click',function(){
      abrirRessalva('Observação — Pedido Médico',atual.copiaObs);
    });
  }

  /* --- especialidades --- */
  var ex=$('cvEsp'),eh='';
  var ac=c.aceita||[],na=c.naoAceita||[];
  if(ac.length){
    eh+='<div class="cv-esp ok"><span class="b">'+IC.check+'</span><span class="k">Aceita</span><span class="lst">';
    for(var i=0;i<ac.length;i++){
      eh+='<span class="cv-sig">'+ac[i].s+' <i>('+ac[i].d+')</i>';
      if(ac[i].r)eh+='<button class="cv-rbtn" data-r="'+i+'">ver ressalva</button>';
      eh+='</span>';
    }
    eh+='</span></div>';
  }
  if(na.length){
    var ns=[];for(var j=0;j<na.length;j++){ns.push(na[j].s);}
    eh+='<div class="cv-esp no"><span class="b">'+IC.x+'</span><span class="k">Não aceita</span><span class="lst"><span class="cv-sig">'+ns.join(', ')+'</span></span></div>';
  }else if(ac.length){
    eh+='<div class="cv-esp no"><span class="b">'+IC.x+'</span><span class="k">Não aceita</span><span class="lst"><span class="cv-nada">Aceita todas as especialidades</span></span></div>';
  }
  ex.innerHTML=eh;
  $('cvCardEsp').style.display=(ac.length||na.length)?'flex':'none';

  var rb=ex.querySelectorAll('.cv-rbtn');
  for(var m=0;m<rb.length;m++){
    rb[m].addEventListener('click',function(){
      var it=atual.aceita[parseInt(this.getAttribute('data-r'),10)];
      abrirRessalva('Ressalva — '+it.s+' ('+it.d+')',it.r);
    });
  }

  $('cvAnx').disabled=!c.anexos;

  var ob=$('cvObs');
  if(c.obs){ob.textContent='📌 '+c.obs;ob.className='cv-obs on';}
  else{ob.className='cv-obs';ob.textContent='';}

  $('cvDate').value='';
  $('cvDateCad').value='';
  $('cvCalcRes').className='cv-res';
  $('cvCadRes').className='cv-cadres';
}

/* ---------- modal de anexos ---------- */
$('cvAnx').addEventListener('click',function(){
  if(!atual||!atual.anexos)return;
  var a=atual.anexos,h='';
  $('cvModATit').textContent='Gerenciador de Documentos da Shift';
  h+='<div class="cv-sect">'+IC.files+' Documentos a anexar na Shift</div>';

  if(a.docs&&a.docs.length){
    for(var i=0;i<a.docs.length;i++){
      var d=a.docs[i];
      h+='<div class="cv-docwrap">';
      h+='<div class="cv-docbar"><span>'+d.n+'</span>'+IC.paperclip+'</div>';
      if(d.ren)h+='<div class="cv-ren">* Renomear: <b>'+d.ren+'</b></div>';
      if(d.obs)h+=bloco(d.obs);
      h+='</div>';
    }
  }else{
    h+='<div class="cv-vazioanx">Lista de anexos ainda não cadastrada para este convênio.</div>';
  }

  var extra=a.faturamentoObs?'<small>'+a.faturamentoObs+'</small>':'';
  if(a.faturamento===true)h+='<div class="cv-fat sim">* Guia enviada ao Faturamento'+extra+'</div>';
  else if(a.faturamento===false)h+='<div class="cv-fat nao">* Guia fica na Unidade'+extra+'</div>';

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
function fmt(d){return d.toLocaleDateString('pt-BR');}
function dataDe(v){return new Date(v+'T00:00:00');}

/* calcula em relacao ao dia de HOJE */
function calcularHoje(){
  var v=$('cvDate').value;
  if(!v||!atual)return;
  var d=dataDe(v);
  $('cvD1').textContent=fmt(d);

  if(atual.validade===null||atual.validade==='sem'){
    $('cvDias').textContent='sem prazo definido';
    $('cvD2').textContent='Sem prazo';
    var b0=$('cvBadge');b0.textContent='SEM PRAZO';b0.className='cv-badge v';
    $('cvCalcRes').className='cv-res on';
    calcularCadastro();
    return;
  }

  var hoje=new Date();hoje.setHours(0,0,0,0);
  var dias=Math.floor((hoje-d)/86400000);
  var lim=new Date(d);lim.setDate(lim.getDate()+atual.validade);

  $('cvDias').textContent=dias+' dias';
  $('cvD2').textContent=fmt(lim);

  var b=$('cvBadge');
  if(dias>=0&&dias<=atual.validade){b.textContent='VÁLIDO';b.className='cv-badge v';}
  else if(dias<0){b.textContent='VERIFIQUE';b.className='cv-badge n';}
  else{b.textContent='VENCIDO';b.className='cv-badge x';}

  $('cvCalcRes').className='cv-res on';
  calcularCadastro();
}

/* calcula em relacao a DATA DO CADASTRO */
function calcularCadastro(){
  var vp=$('cvDate').value, vc=$('cvDateCad').value;
  var cx=$('cvCadRes'), txt=$('cvCadTxt'), bg=$('cvCadBadge');

  if(!vp||!vc||!atual){cx.className='cv-cadres';return;}

  var dp=dataDe(vp), dc=dataDe(vc);
  var hoje=new Date();hoje.setHours(0,0,0,0);
  var ehHoje=(dc.getTime()===hoje.getTime());
  var verbo=ehHoje?'tem':'tinha';

  if(atual.validade===null||atual.validade==='sem'){
    txt.innerHTML='De acordo com a data do <b class="cad">CADASTRO</b>, este convênio não define prazo de validade.';
    bg.textContent='SEM PRAZO';bg.className='cv-badge v';
    cx.className='cv-cadres on';
    return;
  }

  var dias=Math.floor((dc-dp)/86400000);

  if(dias<0){
    txt.innerHTML='A data do cadastro é <b>anterior</b> à data do pedido médico. Confira as duas datas.';
    bg.textContent='VERIFIQUE';bg.className='cv-badge n';
    cx.className='cv-cadres on';
    return;
  }

  txt.innerHTML='De acordo com a data do <b class="cad">CADASTRO</b>, o pedido '+verbo+' <b>'+dias+' dias</b>';
  if(dias<=atual.validade){bg.textContent='VÁLIDO';bg.className='cv-badge v';}
  else{bg.textContent='VENCIDO';bg.className='cv-badge x';}
  cx.className='cv-cadres on';
}

$('cvDate').addEventListener('change',function(){
  if(!this.value)return;
  if(!atual){alert('Selecione primeiro o convênio.');this.value='';return;}
  calcularHoje();
});

$('cvDateCad').addEventListener('change',function(){
  if(!atual){alert('Selecione primeiro o convênio.');this.value='';return;}
  if(!$('cvDate').value){alert('Informe primeiro a data do pedido médico.');this.value='';return;}
  calcularCadastro();
});

/* ---------- reset ---------- */
$('cvReset').addEventListener('click',function(){
  atual=null;inp.value='';drop.className='cv-drop';
  $('cvRes').style.display='none';
  $('cvDate').value='';
  $('cvDateCad').value='';
  $('cvCalcRes').className='cv-res';
  $('cvCadRes').className='cv-cadres';
  $('cvModA').className='cv-mod';
  $('cvModR').className='cv-mod';
  inp.focus();
});

inp.focus();
})();
