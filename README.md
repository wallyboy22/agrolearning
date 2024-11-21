# Relatório de Atividades do Projeto AgroLearning

**Bolsista:** Wallace Vieira da Silva  
**Orientador:** Prof. Dr. Osmar Abílio de Carvalho Júnior  
**Período de Atividades:** Março a Abril de 2024

---

## Título

**Aplicação de Inteligência de Negócios para Análises Agrícolas em Territórios de Interesse da EMATER-DF**

---

## Resumo

Este relatório apresenta as atividades realizadas no âmbito do Projeto AgroLearning, uma iniciativa conjunta entre o Laboratório de Sistemas de Informações Espaciais (LSIE) e a Empresa de Assistência Técnica e Extensão Rural do Distrito Federal (EMATER-DF). O projeto tem como objetivo principal desenvolver análises de dados agrícolas para o Distrito Federal (DF) e a Região Integrada de Desenvolvimento do Distrito Federal e Entorno (RIDE-DF), utilizando técnicas de inteligência de negócios e ferramentas de geoprocessamento.

---

## Introdução

A dinâmica da cobertura e uso da terra é um fator crucial para o planejamento agrícola e ambiental. Neste contexto, o Projeto AgroLearning visa quantificar e analisar a evolução da área agrícola e a intensificação da agropecuária no Distrito Federal e regiões adjacentes. Esta iniciativa é financiada por [inserir nome da agência financiadora] e representa uma colaboração estratégica entre o LSIE e a EMATER-DF.

Este documento relata as atividades desenvolvidas durante o período de março a abril de 2024, incluindo a organização de bases de dados espaciais, análises estatísticas e a criação de painéis interativos para visualização dos resultados.

---

## Objetivos

### Objetivo Geral

Desenvolver análises de dados agrícolas para o DF e a RIDE-DF, aplicando conceitos de inteligência de negócios para subsidiar decisões estratégicas no setor agropecuário.

### Objetivos Específicos

- **Documentação e Disponibilização de Scripts e Dados:** Construir e registrar scripts, garantindo o acesso a arquivos públicos ou gerados que são utilizados nas análises.
- **Integração de Dados da EMATER-DF:** Processar os shapefiles fornecidos pela EMATER-DF e incorporá-los em um painel de dados interativo.
- **Análise de Transições de Uso da Terra:** Adaptar a análise de intensificação agrícola utilizando dados de cobertura do MapBiomas, com foco nas transições entre diferentes usos da terra.

---

## Metodologia

As atividades foram organizadas em três blocos principais:

### Bloco 1: Organização da Base de Dados Espaciais no Google Earth Engine

Consolidamos diversas fontes de dados espaciais na plataforma Google Earth Engine (GEE) para facilitar as análises:

- **Shapefiles da EMATER-DF:**
  - Unidades Olerícolas da EMATER: [Asset no GEE](https://code.earthengine.google.com/?asset=users/wallacesilva/Unidades_Emater_Olericulas)
- **Shapefiles do SISDIA:**
  - Regiões Administrativas do DF: [Asset no GEE](https://code.earthengine.google.com/?asset=users/wallacesilva/sisdia_df-coplan_ra_2019)
  - Municípios da RIDE-DF: [Asset no GEE](https://code.earthengine.google.com/?asset=users/wallacesilva/sisdia_df-municipios_da_ride)
- **Dados do MapBiomas:**
  - Mapas de Uso e Cobertura da Terra (LANDSAT 1985-2022): [Asset no GEE](https://code.earthengine.google.com/?asset=projects/mapbiomas-workspace/public/collection8/mapbiomas_collection80_integration_v1)
  - Mapas de Uso e Cobertura da Terra (SENTINEL-2 2016-2022): [Asset no GEE](https://code.earthengine.google.com/?asset=projects/mapbiomas-workspace/public/collection_S2_beta/collection_LULC_S2_beta)
  - Agricultura Irrigada: [Asset no GEE](https://code.earthengine.google.com/?asset=projects/mapbiomas-workspace/public/collection8/mapbiomas_collection80_irrigated_agriculture_v1)
  - Qualidade da Pastagem (Vigor da Pastagem): [Asset no GEE](https://code.earthengine.google.com/?asset=projects/mapbiomas-workspace/public/collection8/mapbiomas_collection80_pasture_quality_v1)

### Bloco 2: Análise Estatística e Sistematização de Dados

Realizamos análises estatísticas utilizando os dados organizados:

- **Reformulação da Tabela das Unidades Olerícolas:**
  - Convertendo a tabela de formato longo para formato largo para facilitar a análise.
  - [Script no GEE](https://code.earthengine.google.com/89f6358ca08693d38c91cfd36d0bc601?noload=1)
- **Geração de Estatísticas com MapBiomas:**
  - Desenvolvemos um script para extrair estatísticas relevantes dos mapas de uso e cobertura da terra.
  - [Script no GEE](https://code.earthengine.google.com/7488ae42d21c4e929a82973cbb9e5e74?noload=1)
- **Sistematização dos Dados:**
  - Organizamos as estatísticas em uma planilha para análises posteriores.
  - [Planilha no Google Sheets](https://docs.google.com/spreadsheets/d/1ItImDe3VVVx1qKCYnDrNw6sASDORCtJdCEuvCyrfSic/edit#gid=1717070649)

### Bloco 3: Desenvolvimento de Painel Interativo no Google Looker Studio

Para facilitar a interpretação dos resultados, criamos um painel interativo:

- **Painel de Análise:**
  - [Acesse o painel no Looker Studio](https://lookerstudio.google.com/reporting/f57a862d-b59a-4d46-8efa-9bbf0dbbaf0f/page/p_r0hnes2tfd)
  - **Página 1:** Uso e Cobertura da Terra na RIDE-DF
  - **Página 2:** Uso e Cobertura da Terra nas Unidades Olerícolas da EMATER-DF
  - **Página 3:** Produtividade nas Unidades Olerícolas da EMATER-DF

---

## Resultados e Discussão

Os resultados preliminares indicam padrões significativos na dinâmica de uso e cobertura da terra na região estudada:

- **Expansão Agrícola:** Observamos um aumento na área destinada à agricultura nas últimas décadas, especialmente nas unidades olerícolas assistidas pela EMATER-DF.
- **Intensificação da Agropecuária:** Houve uma intensificação das práticas agropecuárias, evidenciada pelas transições de uso da terra e pela qualidade das pastagens.
- **Agricultura Irrigada:** Identificamos áreas com potencial para expansão da agricultura irrigada, o que pode contribuir para o aumento da produtividade.

Os painéis interativos desenvolvidos facilitam a visualização desses resultados, permitindo que gestores e técnicos tomem decisões embasadas.

---

## Conclusões

As atividades desenvolvidas até o momento contribuíram significativamente para o entendimento da dinâmica agrícola no DF e RIDE-DF. A integração de dados espaciais e a aplicação de técnicas de inteligência de negócios possibilitaram a extração de insights valiosos.

---

## Próximas Etapas

- **Refinamento das Análises:** Aprimorar os scripts e metodologias utilizadas, incorporando novos dados e técnicas analíticas.
- **Ampliação do Escopo:** Expandir as análises para outras culturas e áreas de interesse, conforme diretrizes da EMATER-DF.
- **Disseminação dos Resultados:** Preparar artigos científicos e apresentações para divulgação em eventos acadêmicos e técnicos.

---

## Referências

- MapBiomas Project. (2023). Coleção 8 da Série Anual de Mapas de Cobertura e Uso de Solo do Brasil. Disponível em: [MapBiomas](https://mapbiomas.org/).
- Empresa de Assistência Técnica e Extensão Rural do Distrito Federal (EMATER-DF). Disponível em: [EMATER-DF](http://www.emater.df.gov.br/).

---

## Agradecimentos

Agradecemos ao [nome da agência financiadora] pelo suporte financeiro e à EMATER-DF pela parceria e disponibilização dos dados.

---

## Anexos

- **Scripts Utilizados:**
  - Disponíveis na pasta `/scripts` do repositório.
- **Dados e Planilhas:**
  - Disponíveis na pasta `/data` do repositório.
- **Painéis e Visualizações:**
  - Capturas de tela e instruções de acesso na pasta `/visualizacoes`.

---
