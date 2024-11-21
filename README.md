# **Projeto AgroLearning**

**Bolsista**: Wallace Vieira da Silva  
**Orientador**: Prof. Dr. Osmar Abílio de Carvalho Júnior  

---

## **Descrição do Projeto**

O **Projeto AgroLearning** é uma colaboração entre o Laboratório de Sistemas de Informações Espaciais (LSIE) e a Empresa de Assistência Técnica e Extensão Rural do Distrito Federal (EMATER-DF). O objetivo principal é analisar a dinâmica agrícola no Distrito Federal (DF) e na Região Integrada de Desenvolvimento do Distrito Federal e Entorno (RIDE-DF) por meio de ferramentas de inteligência de negócios e geotecnologias.

A iniciativa busca integrar dados espaciais, realizar análises estatísticas e desenvolver painéis interativos e mapas que facilitem a tomada de decisões estratégicas no setor agropecuário, com foco na sustentabilidade e eficiência.

---

## **Objetivos**

### **Objetivo Geral**
Subsidiar decisões estratégicas no setor agropecuário por meio de análises de dados agrícolas e ferramentas de inteligência de negócios aplicadas ao DF e à RIDE-DF.

### **Objetivos Específicos**
1. **Organização e Documentação de Dados Espaciais**  
   Consolidar e sistematizar bases de dados no **Google Earth Engine (GEE)**, incluindo shapefiles da EMATER-DF e outras fontes, com foco na padronização, acessibilidade e reprodutibilidade.  

2. **Desenvolvimento de Ferramentas de Visualização Interativa**  
   Criar painéis no **Google Looker Studio** para apresentar informações agrícolas e de uso da terra de forma clara e acessível, facilitando análises e tomadas de decisão.  

3. **Análise de Transições e Intensificação do Uso da Terra**  
   Aplicar análises com dados do **MapBiomas** para identificar padrões de transição de uso do solo e intensificação agrícola, avaliando impactos ambientais e econômicos.  

4. **Automatização e Compartilhamento de Scripts e Dados**  
   Desenvolver scripts automatizados para processamento de dados, garantindo a reprodutibilidade das análises e a disponibilização de dados públicos ou gerados no projeto.

---

## **Como Utilizar os Recursos do Projeto**

O **Projeto AgroLearning** disponibiliza ferramentas e dados para explorar a dinâmica agrícola no DF e na RIDE-DF. Abaixo estão os principais recursos e instruções de acesso:

### **1. Scripts e Ferramentas**
- **Reformulação de Tabelas de Atributos**  
  Script para ajustar tabelas em formatos adequados às análises.  
  [Acesse no GitHub](https://github.com/wallyboy22/agrolearning/blob/main/scripts/Reformula%C3%A7%C3%A3o%20da%20Tabela.js).  

- **Toolkit de Estatísticas e Processamento**  
  Ferramenta para extração e automação de análises estatísticas no **Google Earth Engine**.  
  [Acesse no GitHub](https://github.com/wallyboy22/agrolearning/blob/main/scripts/roku%20toolkit%20agrolearning.js).  

- **Painel Interativo no Google Looker Studio**  
  Visualização de dados sobre uso do solo e produtividade agrícola.  
  [Acesse o painel](https://lookerstudio.google.com/reporting/f57a862d-b59a-4d46-8efa-9bbf0dbbaf0f/page/p_ozuqli3tfd).  

### **2. Mapas Interativos**
- **Editor de Códigos no Google Earth Engine (GEE)**  
  Scripts e mapas interativos desenvolvidos no GEE.  
  [Acesse o editor de códigos](https://code.earthengine.google.com/24903ee39d9ae2f3266cda542c2bf54b).  

- **Aplicativo GEE para Visualização**  
  Interface para explorar mapas dinâmicos do projeto.  
  [Acesse o aplicativo GEE](https://workspace-ipam.projects.earthengine.app/view/agrolearning-ride).  

### **3. Planilhas de Dados**
- **Tabelas de Área e Análises Estatísticas**  
  Dados organizados e analisados disponíveis em planilhas do Google.  
  [Acesse as planilhas](https://docs.google.com/spreadsheets/d/1ItImDe3VVVx1qKCYnDrNw6sASDORCtJdCEuvCyrfSic/edit?gid=1717070649#gid=1717070649).  

---

## **Datasets Utilizados**

Os dados utilizados foram extraídos de fontes confiáveis e organizados no **Google Earth Engine**. Abaixo estão os links dos principais datasets:  

### **Shapefiles**
- **Unidades da EMATER - Olerícolas**  
  [Acesse aqui](https://code.earthengine.google.com/?asset=users/wallacesilva/Unidades_Emater_Olericulas).  

- **Regiões Administrativas e Municípios da RIDE-DF**  
  - [Regiões Administrativas do DF](https://code.earthengine.google.com/?asset=users/wallacesilva/sisdia_df-coplan_ra_2019).  
  - [Municípios da RIDE-DF](https://code.earthengine.google.com/?asset=users/wallacesilva/sisdia_df-municipios_da_ride).  

### **Catálogo de Dados MapBiomas**
- [Uso e Cobertura da Terra (LANDSAT 1985-2022)](https://code.earthengine.google.com/?asset=projects/mapbiomas-workspace/public/collection8/mapbiomas_collection80_integration_v1).  
- [Uso e Cobertura da Terra (SENTINEL-2 2016-2022)](https://code.earthengine.google.com/?asset=projects/mapbiomas-workspace/public/collection_S2_beta/collection_LULC_S2_beta).  
- [Agricultura Irrigada](https://code.earthengine.google.com/?asset=projects/mapbiomas-workspace/public/collection8/mapbiomas_collection80_irrigated_agriculture_v1).  
- [Qualidade da Pastagem](https://code.earthengine.google.com/?asset=projects/mapbiomas-workspace/public/collection8/mapbiomas_collection80_pasture_quality_v1).  

---

## **Metodologia**

O projeto foi dividido em três etapas principais:  

1. **Organização de Bases de Dados**  
   - Importação de shapefiles no GEE para integrar unidades da EMATER e áreas da RIDE-DF.  
   - Uso de dados do **MapBiomas** para análises históricas de uso e cobertura do solo.  

2. **Análises Estatísticas e Processamento**  
   - Reformulação de tabelas de atributos para análises.  
   - Criação de scripts para extração de estatísticas espaciais e temporais.  

3. **Desenvolvimento de Painéis Interativos**  
   - Construção de painéis no **Google Looker Studio**, permitindo análises e interpretação dos dados de maneira acessível.  

---

## **Principais Resultados**

1. **Unidades da EMATER**: Expansão agrícola significativa, com destaque para Rio Preto, PAD-DF e Planaltina.  
2. **RIDE-DF**: Municípios como Cristalina e Luziânia lideraram em áreas agrícolas.  
3. **Produtividade**: Brazlândia foi destaque em diversidade de cultivos e alta produtividade.  
4. **Visualizações**: Painéis e mapas interativos foram cruciais para a análise e comunicação dos dados.  

---

## **Contato**

Dúvidas ou contribuições podem ser enviadas pelo repositório no [GitHub](https://github.com/wallyboy22/agrolearning) ou via e-mail: **wallacevds22@gmail.com**.  

---
