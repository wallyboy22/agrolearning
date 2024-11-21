# Projeto AgroLearning

**Bolsista:** Wallace Vieira da Silva  
**Orientador:** Prof. Dr. Osmar Abílio de Carvalho Júnior  
**Período de Atividades:** Março a Maio de 2024

---

## Título

**Aplicação de Inteligência de Negócios para Análises Agrícolas em Territórios de Interesse da EMATER-DF**

---

## Resumo

Este projeto é uma iniciativa conjunta entre o Laboratório de Sistemas de Informações Espaciais (LSIE) e a Empresa de Assistência Técnica e Extensão Rural do Distrito Federal (EMATER-DF). O objetivo principal é desenvolver análises de dados agrícolas para o Distrito Federal (DF) e a Região Integrada de Desenvolvimento do Distrito Federal e Entorno (RIDE-DF), utilizando técnicas de inteligência de negócios e ferramentas de geoprocessamento.

---

## Introdução

A dinâmica da cobertura e uso da terra é crucial para o planejamento agrícola e ambiental. O Projeto AgroLearning visa quantificar e analisar a evolução da área agrícola e a intensificação da agropecuária no Distrito Federal e regiões adjacentes. Esta iniciativa é financiada por **[inserir nome da agência financiadora]** e representa uma colaboração estratégica entre o LSIE e a EMATER-DF.

Este repositório contém scripts, dados e documentação relacionados ao projeto, facilitando a replicação das análises e promovendo a transparência dos métodos utilizados.

---

## Objetivos

### Objetivo Geral

Desenvolver análises de dados agrícolas para o DF e a RIDE-DF, aplicando conceitos de inteligência de negócios para subsidiar decisões estratégicas no setor agropecuário.

### Objetivos Específicos

- **Documentação e Disponibilização de Scripts e Dados:** Construir e registrar scripts, garantindo o acesso a arquivos públicos ou gerados utilizados nas análises.
- **Integração de Dados da EMATER-DF:** Processar os shapefiles fornecidos pela EMATER-DF e incorporá-los em um painel de dados interativo.
- **Análise de Transições de Uso da Terra:** Adaptar a análise de intensificação agrícola utilizando dados de cobertura do MapBiomas, focando nas transições entre diferentes usos da terra.

---

## Estrutura do Repositório

- **`/scripts`**  
  Contém os scripts desenvolvidos para processamento e análise dos dados.

- **`/data`**  
  Inclui referências aos dados utilizados (por exemplo, shapefiles e planilhas).  
  **Nota:** Dados sensíveis ou com restrições não são disponibilizados diretamente.

- **`/notebooks`**  
  Notebooks Jupyter ou similares utilizados nas análises.

- **`/visualizacoes`**  
  Imagens, gráficos e capturas de tela dos painéis desenvolvidos.

- **`/docs`**  
  Documentação adicional, como manuais de usuário ou guias de instalação.

- **`README.md`**  
  Este arquivo, com informações gerais sobre o projeto.

- **`LICENSE`**  
  Licença do projeto.

- **`.gitignore`**  
  Arquivo para especificar arquivos ou pastas a serem ignorados pelo Git.

---

## Atividades Desenvolvidas

### Março de 2024

- **06/03/2024:**  
  Reunião inicial para definição das demandas principais.

- **09/03/2024:**
  - **Estruturação do Painel de Análise:**  
    Início da criação de um painel para analisar os dados agrícolas das Unidades da EMATER e dos municípios da RIDE-DF.
  - **Upload de Shapefiles no GEE:**  
    - *Unidades Olerícolas da EMATER:* Asset criado no GEE.
      - [`users/wallacesilva/Unidades_Emater_Olericulas`](https://code.earthengine.google.com/?asset=users/wallacesilva/Unidades_Emater_Olericulas)
    - *Municípios da RIDE e Regiões Administrativas do SISDIA:* Assets criados no GEE.
      - [`users/wallacesilva/sisdia_df-coplan_ra_2019`](https://code.earthengine.google.com/?asset=users/wallacesilva/sisdia_df-coplan_ra_2019)
      - [`users/wallacesilva/sisdia_df-municipios_da_ride`](https://code.earthengine.google.com/?asset=users/wallacesilva/sisdia_df-municipios_da_ride)
  - **Geração de Estatísticas com MapBiomas:**  
    Desenvolvimento de scripts para extrair estatísticas dos mapas de uso e cobertura da terra.
  - **Desenvolvimento do Painel no Looker Studio:**  
    Criação de um painel como prova de conceito para uso de BI na análise dos dados.

### Abril de 2024

- **20/03/2024:**
  - **Reformulação da Tabela das Unidades Olerícolas:**  
    Conversão da tabela de atributos para formato adequado à análise.
    - [Script no GEE](https://code.earthengine.google.com/89f6358ca08693d38c91cfd36d0bc601?noload=1)
  - **Atualização das Análises com MapBiomas:**  
    Inclusão de dados do MapBiomas SENTINEL-2 (Coleção Beta) e análises de intensificação das paisagens agrícolas.
  - **Atualização do Painel no Looker Studio:**  
    Revisão da formatação e padronização das páginas.

- **27/04/2024:**
  - **Atualização das Páginas do Painel:**  
    Separação das análises da RIDE-DF e das Unidades da EMATER-DF em páginas distintas.

### Maio de 2024

- **16/05/2024:**
  - **Criação de Apresentação Sintetizada:**  
    Desenvolvimento de uma apresentação com a síntese das principais análises.
    - [Link para a apresentação](https://docs.google.com/presentation/d/1rXtUjAXXfs_77gb0algonvQPlVmGHB7HnYmyjs0lMig/edit)

---

## Resultados

- **Expansão Agrícola:**  
  Aumento significativo na área destinada à agricultura nas últimas décadas.

- **Intensificação Agropecuária:**  
  Intensificação das práticas agropecuárias, evidenciada pelas transições de uso da terra e melhoria na qualidade das pastagens.

- **Agricultura Irrigada:**  
  Identificação de áreas com potencial para expansão da agricultura irrigada.

---

## Painel Interativo

Acesse o painel interativo no Google Looker Studio para visualizar os resultados das análises:

- **Painel de Análise no Looker Studio:**  
  [Acesse aqui](https://lookerstudio.google.com/reporting/f57a862d-b59a-4d46-8efa-9bbf0dbbaf0f/page/p_r0hnes2tfd)

---

## Como Contribuir

- **Issues:**  
  Utilize a seção de issues para reportar bugs ou sugerir melhorias.

- **Pull Requests:**  
  Envie pull requests com melhorias, correções ou novas funcionalidades.

---

## Referências

- **MapBiomas Project.** (2023). *Coleção 8 da Série Anual de Mapas de Cobertura e Uso de Solo do Brasil*.  
  Disponível em: [https://mapbiomas.org/](https://mapbiomas.org/)

- **EMATER-DF.**  
  Empresa de Assistência Técnica e Extensão Rural do Distrito Federal.  
  Disponível em: [http://www.emater.df.gov.br/](http://www.emater.df.gov.br/)

---

## Licença

Este projeto está licenciado sob a **[inserir tipo de licença, por exemplo, MIT License]**.  
Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Agradecimentos

Agradecimentos especiais a **[nome da agência financiadora]** pelo suporte financeiro e à EMATER-DF pela parceria e disponibilização dos dados. Também agradeço ao Prof. Dr. Osmar Abílio de Carvalho Júnior pela orientação e apoio no desenvolvimento deste projeto.

