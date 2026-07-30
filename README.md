# Verificador de Convênios

**Consulta rápida das regras de cada convênio, com calculadora de prazos e validação de pedidos médicos.**

---

## Por que eu fiz

No atendimento, cada convênio tem sua própria regra: quantos dias vale o pedido médico, qual especialidade atende ( Médicos, Dentistas, Nutricionistas, Enfermeira ). Essa informação vivia espalhada em manual de cada convênio, planilha e na memória de quem estava há mais tempo.

O resultado disso é sempre o mesmo: demora para procurar caso o paciente chega apenas com duvidas, para pesquisar levava muito tempo, então recolhi nromalmente as informações iniciais que mais são importantes para começar um atendimento

Então centralizei tudo num só lugar, com busca.

---

## O que ele faz

**Busca rápida** — digite o nome do convênio ou uma palavra do procedimento e as regras aparecem na hora.

**Busca que perdoa o jeito de digitar** — a consulta ignora acento e diferença de maiúscula, porque ninguém tem tempo de digitar certinho com paciente esperando na frente.

**Calculadora de prazos** — informe a data do pedido médico e a ferramenta calcula a validade, dizendo se ainda está dentro do prazo.

**Validação de pedidos** — confere se o pedido atende aos requisitos daquele convênio antes de o atendimento seguir adiante.

---

## O ganho

Menos consulta a manual, menos pedido negado por prazo vencido e menos dependência de quem tem a informação na cabeça. A regra fica no sistema, não na memória de uma pessoa.

---

## Como foi construído

Aplicação web em HTML, CSS e JavaScript, com a lógica de processamento das consultas e das regras de negócio escrita em Python. Roda direto no navegador, sem instalação.

A parte mais interessante de resolver foi a normalização da busca: transformar o que a pessoa digita e o que está cadastrado num formato comparável, para que "Unimed", "unimed" e "UNIMÉD" caiam todos no mesmo lugar.

---

## Tecnologias

`JavaScript` · `HTML5` · `CSS3` · `Python`

---

## Autor

Desenvolvido por **Sandro de Lima Pereira** — [@sandrolimadf1984](https://github.com/sandrolimadf1984)

Analista de sistemas e desenvolvedor, de Brasília. Atuação em desenvolvimento Full Stack, análise de sistemas e automação de processos.
