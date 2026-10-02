# Verificador de Convênios

**As regras de pedido médico de 67 convênios numa consulta só — com calculadora de validade do pedido.**

---

## Por que eu fiz

No atendimento, cada convênio tem sua própria regra: por quantos dias o pedido médico vale, se aceita cópia, quais profissionais podem pedir exames (médicos, dentistas, nutricionistas, enfermeiros) e quais documentos precisam ser anexados. Essa informação vivia espalhada em manuais, planilhas e na memória de quem estava há mais tempo.

O resultado era sempre o mesmo: o paciente esperando enquanto alguém procurava a regra — e, às vezes, um pedido recusado depois por prazo vencido.

Então juntei tudo num lugar só, com busca.

---

## O que ele faz

**Busca rápida** — digite o nome do convênio e as regras aparecem na hora. A busca ignora acento e diferença de maiúscula, porque ninguém tem tempo de digitar certinho com paciente na frente.

**Regras do pedido médico** — validade em dias (ou indeterminada), se aceita cópia e quais registros profissionais são aceitos (CRM, CRO, CRN, COREN), com as ressalvas de cada convênio a um clique.

**Documentos a anexar** — para cada convênio, a lista do que precisa ser anexado e como renomear cada arquivo, além de onde a guia vai parar: no faturamento ou na unidade.

**Calculadora de validade** — informe a data do pedido e a ferramenta mostra quantos dias ele tem e se está VÁLIDO ou VENCIDO. Dá para conferir também pela data do cadastro, que é o que importa quando uma guia volta para correção.

**Avisos para a equipe** — o que eu escrevo no arquivo `aviso.txt` aparece no topo da ferramenta para todo mundo.

---

## O ganho

Menos consulta a manual, menos pedido recusado por prazo vencido e menos dependência de quem tem a informação na cabeça. A regra fica no sistema, não na memória de uma pessoa.

---

## Como foi construído

JavaScript puro, carregado por um favorito do navegador (bookmarklet). Ao clicar, o favorito busca o arquivo `convenios2.js` deste repositório e abre a ferramenta por cima da página que estiver aberta — sem instalar nada.

Como o código vem do GitHub a cada clique, qualquer correção numa regra chega à equipe inteira no clique seguinte.

A parte mais interessante de resolver foi a normalização da busca: transformar o que a pessoa digita e o que está cadastrado num formato comparável, para que "Unimed", "unimed" e "UNIMÉD" caiam no mesmo lugar.

| Arquivo | Função |
|---|---|
| `convenios2.js` | Base com os 67 convênios e toda a lógica da ferramenta |
| `index.html` e `instalar.html` | Páginas de instalação, publicadas no GitHub Pages |
| `aviso.txt` | Aviso exibido no topo da ferramenta (vazio = sem aviso) |

---

## Tecnologias

`JavaScript` · `HTML5` · `CSS3` · `GitHub Pages`

---

## Autor

Desenvolvido por **Sandro de Lima Pereira** — [@sandrolimadf1984](https://github.com/sandrolimadf1984)

Analista de sistemas de Brasília, com atuação em análise de sistemas, desenvolvimento e automação de processos.
