// Laboratório de Sistemas de Informação Espacial - Projeto Agrolearning
// novembro de 2024,  Wallace Silva, wallacevds22@gmail.com
// Ferramenta para gerar conjuntos de estatísticas e mapas dos dados e região de interesse (ROKU), Script Earth Engine
// --- --- --- datasets
var lulc_col = ee.Image('projects/mapbiomas-public/assets/brazil/lulc/collection9/mapbiomas_collection90_integration_v1');
lulc_col = lulc_col
.select(lulc_col.bandNames(),lulc_col.bandNames().map(function(str){return ee.String(str).slice(-4);}));

//////////////////////////////////////////////////////

var lulc__s2_beta = ee.Image('projects/mapbiomas-public/assets/brazil/lulc/collection_S2_beta/collection_LULC_S2_beta');
lulc__s2_beta = lulc__s2_beta
.select(lulc__s2_beta.bandNames(),lulc__s2_beta.bandNames().map(function(str){return ee.String(str).slice(-4);}));

//////////////////////////////////////////////////////

var annual_burned = ee.Image('projects/mapbiomas-public/assets/brazil/fire/collection3_1/mapbiomas_fire_collection31_annual_burned_v1');
// renomeando bandas
annual_burned = annual_burned.select(annual_burned.bandNames(),annual_burned.bandNames().map(function(str){return ee.String(str).slice(-4)}));
print('annual_burned',annual_burned);

/////////////////////////////////////////////////////
var desmPRODES_original = ee.Image('projects/ee-ipam/assets/CCAL/DATASETS/PRODES/BR_prodes_2012_2022_stack');
var desmPRODES = desmPRODES_original.gte(1).unmask();

// print(desmPRODES_original,desmPRODES);

/////////////////////////////////////////////////////
var mb_pivots_original = ee.Image('projects/mapbiomas-public/assets/brazil/lulc/collection9/mapbiomas_collection90_irrigated_agriculture_v1');

var mb_pivots = mb_pivots_original.divide(100).int().eq(1).selfMask();
mb_pivots = mb_pivots.select(mb_pivots.bandNames(),mb_pivots.bandNames().map(function(str){return ee.String(str).slice(-4)}));

/////////////////////////////////////////////////////

function intensification_of_agriculture (period) {

  var mapbiomas = ee.Image('projects/mapbiomas-public/assets/brazil/lulc/collection9/mapbiomas_collection90_integration_v1');
  
  // lavouras temporarias
  // 39, '#f5b3c8', 'Soja',
  // 20, '#db7093', 'Cana',
  // 40, '#c71585', 'Arroz',
  // 62, '#ff69b4', 'Algodão (beta)',
  // 41, '#f54ca9', 'Outras Lavouras Temporárias',
  
  // lavouras perenes
  // 46, '#d68fe2', 'Café',
  // 47, '#9932cc', 'Citrus',
  // 35, '#9065d0', 'Dendê (beta)',
  // 48, '#e6ccff', 'Outras Lavouras Perenes',
      
  var agricultura1985 =mapbiomas
                        .select(ee.String('classification_').cat(ee.Number(period[0])))
                        .remap([39,20,40,62,41,46,47,35,48], [1,1,1,1,1,1,1,1,1])
                        .eq(1)
                        .unmask();
  
  var agricultura2020 = mapbiomas
                        .select(ee.String('classification_').cat(ee.Number(period[1]))) 
                         .remap([39,20,40,62,41,46,47,35,48], [1,1,1,1,1,1,1,1,1])
                         .eq(1)
                         .unmask();
  
  var natural1985 = mapbiomas
                        .select(ee.String('classification_').cat(ee.Number(period[0])) )
                        .remap([1,3,4,5,6,49,10,11,12,32,29,13, 23,33], [1,1,1,1,1,1,1,1,1,1,1,1,1,1])
                        .eq(1)
                        .selfMask();

  var natural2020 = mapbiomas
                        .select(ee.String('classification_').cat(ee.Number(period[1])) )
                        .remap([1,3,4,5,6,49,10,11,12,32,29,13, 23, 33], [1,1,1,1,1,1,1,1,1,1,1,1,1,1])
                        .eq(1)
                        .selfMask();

  var total_agricultura =        agricultura2020.unmask().updateMask(agricultura1985.unmask().not()).unmask();
  var agricultura_natual =       agricultura2020.unmask().updateMask(agricultura1985.unmask().not()).selfMask().updateMask(natural1985);
  
  var pastagem1985 = mapbiomas
                  .select(ee.String('classification_').cat(ee.Number(period[0])) )
                  .eq(15)
                  .selfMask()
                  .updateMask(total_agricultura)
                  .remap([1], [4])
                  .rename('b1');
                  
                  
  var pastagem2020 = mapbiomas
                  .select(ee.String('classification_').cat(ee.Number(period[1])) )
                  .eq(15)
                  .selfMask()
                  // .updateMask(total_agricultura)
                  .remap([1], [4])
                  .rename('b1');
                  
  var pastagem_natual = pastagem2020.unmask().updateMask(pastagem1985.unmask().not()).selfMask().updateMask(natural1985).eq(4);

  // Map.addLayer(pastagem_natual)


  var _years = ee.List.sequence(1985,2022,1);
  var pastagem_total_col = mapbiomas.eq(15).slice(_years.indexOf(period[0]),_years.indexOf(period[1]).add(1));

  var pastagem_total = pastagem_total_col.reduce('max').selfMask();
  var pastagem_agricultura_natural = pastagem_total.updateMask(agricultura_natual);
 

  var area_natual_para_agricultura =  agricultura_natual.unmask().updateMask(pastagem_agricultura_natural.unmask().not()).selfMask().remap([1], [3]);
  var area_natural_para_pastagem =  pastagem_natual.remap([1], [7]);
 
  var transition_for_period =  total_agricultura
    .unmask()
    .add(area_natual_para_agricultura.unmask())
    .add(pastagem1985.unmask())
    .add(pastagem_agricultura_natural.remap([1], [2]).unmask())
    .add(area_natural_para_pastagem.unmask())
    .updateMask(natural2020.unmask().not())
    .remap([1, 3, 4, 5, 7], [1, 2, 3, 4, 5])
    .rename(''+period[0]+'_'+period[1])
    .unmask();
    
    return transition_for_period;
}

var intencification = ee.Image().select();

var periodos = [
  1985,1986,1987,1988,1989,
  1990,1991,1992,1993,1994,
  1995,1996,1997,1998,1999,
  2000,2001,2002,2003,2004,
  2005,2006,2007,2008,2009,
  2010,2011,2012,2013,2014,
  2015,2016,2017,2018,2019,
  2020,2021,2022
].map(function(i){return [1985,i]});
print(periodos);

periodos.forEach(function(periodo){
  var img = intensification_of_agriculture(periodo).selfMask();
  intencification = intencification.addBands(img);
});

//////////////////////////////////////////////////////
var options = {
  dataFilters:[
      // {
      //   name: 'Regiões Administrativas',
      //   ft: 'projects/earthengine-legacy/assets/users/wallacesilva/sisdia_df-coplan_ra_2019',
      //   aggregate_array: 'ra'
      // },
      {
        name: 'Unidades EMATER',
        ft: 'users/wallacesilva/Unidades_Emater_Olericulas',
        aggregate_array: 'UL'
      },
      {
        name: 'Municipios da RIDE',
        ft: 'projects/earthengine-legacy/assets/users/wallacesilva/sisdia_df-municipios_da_ride',
        aggregate_array: 'nome'
      },

    ],
    initTrueFilter:[
      'Abadiânia',
      'Alexânia',
      'Alto Paraíso de Goiás',
      'Alvorada do Norte',
      'Arinos',
      'Barro Alto',
      'Brasília',
      'Buritis',
      'Cabeceira Grande',
      'Cabeceiras',
      'Cavalcante',
      'Cidade Ocidental',
      'Cocalzinho de Goiás',
      'Corumbá de Goiás',
      'Cristalina',
      'Flores de Goiás',
      'Formosa',
      'Goianésia',
      'Luziânia',
      'Mimoso de Goiás',
      'Niquelândia',
      'Novo Gama',
      'Padre Bernardo',
      'Pirenópolis',
      'Planaltina',
      'Santo Antônio do Descoberto',
      'Simolândia',
      "São João D'aliança",
      'Unaí',
      'Valparaíso de Goiás',
      'Vila Boa',
      'Vila Propício',
      'Água Fria de Goiás',
      'Águas Lindas de Goiás',
],
    dataLayers:[
      {
        name: 'Cobertura e uso da terra (MB-10m Beta)',
        image: lulc__s2_beta,
        params:[
          {
            name:'nivel3',
            visParams:{
              palette:require('users/mapbiomas/modules:Palettes.js').get('classification9'),
              min:0,
              max:69
            },
            valueLabels: [
              {value:3,label:"Formação Florestal"},
              {value:4,label:"Formação Savânica"},
              {value:5,label:"Mangue"},
              {value:6,label:"Floresta Alagável"},
              {value:49,label:"Restinga Arbórea"},
              {value:11,label:"Campo Alagado e Área Pantanosa"},
              {value:12,label:"Formação Campestre"},
              {value:32,label:"Apicum"},
              {value:29,label:"Afloramento Rochoso"},
              {value:50,label:"Restinga herbácea"},
              {value:13,label:"Outras Formações não Florestais"},
              {value:15,label:"Pastagem"},
              {value:19,label:"Lavoura Temporária"},
              {value:36,label:"Lavoura Perene"},
              {value:9,label:"Silvicultura"},
              {value:21,label:"Mosaico de Usos"},
              {value:23,label:"Praia e Duna"},
              {value:24,label:"Área Urbanizada"},
              {value:30,label:"Mineração"},
              {value:25,label:"Outras Áreas não Vegetadas"},
              {value:33,label:"Rios, Lagos e Oceano"},
              {value:31,label:"Aquicultura"},
              {value:27,label:"Não observado"},
            ],
          },
          {
            name:'nivel2',
            visParams:{
              palette:require('users/mapbiomas/modules:Palettes.js').get('classification9'),
              min:0,
              max:69
            },
            valueLabels: [
              {value:3,label:"Formação Florestal"},
              {value:4,label:"Formação Savânica"},
              {value:5,label:"Mangue"},
              {value:6,label:"Floresta Alagável"},
              {value:49,label:"Restinga Arbórea"},
              {value:11,label:"Campo Alagado e Área Pantanosa"},
              {value:12,label:"Formação Campestre"},
              {value:32,label:"Apicum"},
              {value:29,label:"Afloramento Rochoso"},
              {value:50,label:"Restinga herbácea"},
              {value:13,label:"Outras Formações não Florestais"},
              {value:15,label:"Pastagem"},
              {value:19,label:"Agricultura"},
              {value:36,label:"Agricultura"},
              {value:9,label:"Silvicultura"},
              {value:21,label:"Mosaico de Usos"},
              {value:23,label:"Praia e Duna"},
              {value:24,label:"Área Urbanizada"},
              {value:30,label:"Mineração"},
              {value:25,label:"Outras Áreas não Vegetadas"},
              {value:33,label:"Rios, Lagos e Oceano"},
              {value:31,label:"Aquicultura"},
              {value:27,label:"Não observado"},
            ],
          },
          {
            name:'nivel1',
            visParams:{
              palette:require('users/mapbiomas/modules:Palettes.js').get('classification9'),
              min:0,
              max:69
            },
            valueLabels: [
              {value:3,label:"Floresta"},
              {value:4,label:"Floresta"},
              {value:5,label:"Floresta"},
              {value:6,label:"Floresta"},
              {value:49,label:"Floresta"},
              {value:11,label:"Formação Natural não Florestal"},
              {value:12,label:"Formação Natural não Florestal"},
              {value:32,label:"Formação Natural não Florestal"},
              {value:29,label:"Formação Natural não Florestal"},
              {value:50,label:"Formação Natural não Florestal"},
              {value:13,label:"Formação Natural não Florestal"},
              {value:15,label:"Agropecuária"},
              {value:19,label:"Agropecuária"},
              {value:36,label:"Agropecuária"},
              {value:9,label:"Agropecuária"},
              {value:21,label:"Agropecuária"},
              {value:23,label:"Área não vegetada"},
              {value:24,label:"Área não vegetada"},
              {value:30,label:"Área não vegetada"},
              {value:25,label:"Área não vegetada"},
              {value:33,label:"Corpos D´água"},
              {value:31,label:"Corpos D´água"},
              {value:27,label:"Não observado"},
            ],
          },
          {
            name:'nivel0',
            visParams:{
              palette:require('users/mapbiomas/modules:Palettes.js').get('classification9'),
              min:0,
              max:69
            },
            valueLabels: [
              {value:3,label:"Natural"},
              {value:4,label:"Natural"},
              {value:5,label:"Natural"},
              {value:6,label:"Natural"},
              {value:49,label:"Natural"},
              {value:11,label:"Natural"},
              {value:12,label:"Natural"},
              {value:32,label:"Natural"},
              {value:29,label:"Natural"},
              {value:50,label:"Natural"},
              {value:13,label:"Natural"},
              {value:15,label:"Antrópico"},
              {value:19,label:"Antrópico"},
              {value:36,label:"Antrópico"},
              {value:9,label:"Antrópico"},
              {value:21,label:"Antrópico"},
              {value:23,label:"Antrópico"},
              {value:24,label:"Antrópico"},
              {value:30,label:"Antrópico"},
              {value:25,label:"Antrópico"},
              {value:33,label:"Antrópico"},
              {value:31,label:"Antrópico"},
              {value:27,label:"Natural"},
            ],
          },
        ]
      },         
      {
        name: 'Cobertura e uso da terra (MB-col9)',
        image: lulc_col,
        params:[
          {
            name:'nivel4',
            visParams:{
              palette:require('users/mapbiomas/modules:Palettes.js').get('classification9'),
              min:0,
              max:69
            },
            valueLabels: [
              {value:3,label:"Formação Florestal"},
              {value:4,label:"Formação Savânica"},
              {value:5,label:"Mangue"},
              {value:6,label:"Floresta Alagável"},
              {value:49,label:"Restinga Arbórea"},
              {value:11,label:"Campo Alagado e Área Pantanosa"},
              {value:12,label:"Formação Campestre"},
              {value:32,label:"Apicum"},
              {value:29,label:"Afloramento Rochoso"},
              {value:50,label:"Restinga herbácea"},
              {value:13,label:"Outras Formações não Florestais"},
              {value:15,label:"Pastagem"},
              {value:39,label:"Soja"},
              {value:20,label:"Cana"},
              {value:40,label:"Arroz"},
              {value:62,label:"Algodão"},
              {value:41,label:"Outras Lavouras Temporárias"},
              {value:46,label:"Café"},
              {value:47,label:"Citrus"},
              {value:35,label:"Dendê"},
              {value:48,label:"Outras Lavouras Perenes"},
              {value:9,label:"Silvicultura"},
              {value:21,label:"Mosaico de Usos"},
              {value:23,label:"Praia e Duna"},
              {value:24,label:"Área Urbanizada"},
              {value:30,label:"Mineração"},
              {value:25,label:"Outras Áreas não Vegetadas"},
              {value:33,label:"Rios, Lagos e Oceano"},
              {value:31,label:"Aquicultura"},
              {value:27,label:"Não observado"},
            ],
          },
          
          {
            name:'nivel3',
            visParams:{
              palette:require('users/mapbiomas/modules:Palettes.js').get('classification9'),
              min:0,
              max:69
            },
            valueLabels: [
              {value:3,label:"Formação Florestal"},
              {value:4,label:"Formação Savânica"},
              {value:5,label:"Mangue"},
              {value:6,label:"Floresta Alagável"},
              {value:49,label:"Restinga Arbórea"},
              {value:11,label:"Campo Alagado e Área Pantanosa"},
              {value:12,label:"Formação Campestre"},
              {value:32,label:"Apicum"},
              {value:29,label:"Afloramento Rochoso"},
              {value:50,label:"Restinga herbácea"},
              {value:13,label:"Outras Formações não Florestais"},
              {value:15,label:"Pastagem"},
              {value:39,label:"Lavoura Temporária"},
              {value:20,label:"Lavoura Temporária"},
              {value:40,label:"Lavoura Temporária"},
              {value:62,label:"Lavoura Temporária"},
              {value:41,label:"Lavoura Temporária"},
              {value:46,label:"Lavoura Perene"},
              {value:47,label:"Lavoura Perene"},
              {value:35,label:"Lavoura Perene"},
              {value:48,label:"Lavoura Perene"},
              {value:9,label:"Silvicultura"},
              {value:21,label:"Mosaico de Usos"},
              {value:23,label:"Praia e Duna"},
              {value:24,label:"Área Urbanizada"},
              {value:30,label:"Mineração"},
              {value:25,label:"Outras Áreas não Vegetadas"},
              {value:33,label:"Rios, Lagos e Oceano"},
              {value:31,label:"Aquicultura"},
              {value:27,label:"Não observado"},
            ],
          },
          {
            name:'nivel2',
            visParams:{
              palette:require('users/mapbiomas/modules:Palettes.js').get('classification9'),
              min:0,
              max:69
            },
            valueLabels: [
              {value:3,label:"Formação Florestal"},
              {value:4,label:"Formação Savânica"},
              {value:5,label:"Mangue"},
              {value:6,label:"Floresta Alagável"},
              {value:49,label:"Restinga Arbórea"},
              {value:11,label:"Campo Alagado e Área Pantanosa"},
              {value:12,label:"Formação Campestre"},
              {value:32,label:"Apicum"},
              {value:29,label:"Afloramento Rochoso"},
              {value:50,label:"Restinga herbácea"},
              {value:13,label:"Outras Formações não Florestais"},
              {value:15,label:"Pastagem"},
              {value:39,label:"Agricultura"},
              {value:20,label:"Agricultura"},
              {value:40,label:"Agricultura"},
              {value:62,label:"Agricultura"},
              {value:41,label:"Agricultura"},
              {value:46,label:"Agricultura"},
              {value:47,label:"Agricultura"},
              {value:35,label:"Agricultura"},
              {value:48,label:"Agricultura"},
              {value:9,label:"Silvicultura"},
              {value:21,label:"Mosaico de Usos"},
              {value:23,label:"Praia e Duna"},
              {value:24,label:"Área Urbanizada"},
              {value:30,label:"Mineração"},
              {value:25,label:"Outras Áreas não Vegetadas"},
              {value:33,label:"Rios, Lagos e Oceano"},
              {value:31,label:"Aquicultura"},
              {value:27,label:"Não observado"},
            ],
          },
          {
            name:'nivel1',
            visParams:{
              palette:require('users/mapbiomas/modules:Palettes.js').get('classification9'),
              min:0,
              max:69
            },
            valueLabels: [
              {value:3,label:"Floresta"},
              {value:4,label:"Floresta"},
              {value:5,label:"Floresta"},
              {value:6,label:"Floresta"},
              {value:49,label:"Floresta"},
              {value:11,label:"Formação Natural não Florestal"},
              {value:12,label:"Formação Natural não Florestal"},
              {value:32,label:"Formação Natural não Florestal"},
              {value:29,label:"Formação Natural não Florestal"},
              {value:50,label:"Formação Natural não Florestal"},
              {value:13,label:"Formação Natural não Florestal"},
              {value:15,label:"Agropecuária"},
              {value:39,label:"Agropecuária"},
              {value:20,label:"Agropecuária"},
              {value:40,label:"Agropecuária"},
              {value:62,label:"Agropecuária"},
              {value:41,label:"Agropecuária"},
              {value:46,label:"Agropecuária"},
              {value:47,label:"Agropecuária"},
              {value:35,label:"Agropecuária"},
              {value:48,label:"Agropecuária"},
              {value:9,label:"Agropecuária"},
              {value:21,label:"Agropecuária"},
              {value:23,label:"Área não vegetada"},
              {value:24,label:"Área não vegetada"},
              {value:30,label:"Área não vegetada"},
              {value:25,label:"Área não vegetada"},
              {value:33,label:"Corpos D´água"},
              {value:31,label:"Corpos D´água"},
              {value:27,label:"Não observado"},
            ],
          },
          {
            name:'nivel0',
            visParams:{
              palette:require('users/mapbiomas/modules:Palettes.js').get('classification9'),
              min:0,
              max:69
            },
            valueLabels: [
              {value:3,label:"Natural"},
              {value:4,label:"Natural"},
              {value:5,label:"Natural"},
              {value:6,label:"Natural"},
              {value:49,label:"Natural"},
              {value:11,label:"Natural"},
              {value:12,label:"Natural"},
              {value:32,label:"Natural"},
              {value:29,label:"Natural"},
              {value:50,label:"Natural"},
              {value:13,label:"Natural"},
              {value:15,label:"Antrópico"},
              {value:39,label:"Antrópico"},
              {value:20,label:"Antrópico"},
              {value:40,label:"Antrópico"},
              {value:62,label:"Antrópico"},
              {value:41,label:"Antrópico"},
              {value:46,label:"Antrópico"},
              {value:47,label:"Antrópico"},
              {value:35,label:"Antrópico"},
              {value:48,label:"Antrópico"},
              {value:9,label:"Antrópico"},
              {value:21,label:"Antrópico"},
              {value:23,label:"Antrópico"},
              {value:24,label:"Antrópico"},
              {value:30,label:"Antrópico"},
              {value:25,label:"Antrópico"},
              {value:33,label:"Antrópico"},
              {value:31,label:"Antrópico"},
              {value:27,label:"Natural"},
            ],
          },
          
        ],
        // initTrueBandsLayer:['2022'/*,'2005'*/],
      },
      {
        name: 'Área queimada (MB-col3.1)',
        image: annual_burned,
        params:[
          {
            name:'vinho',
            valueLabels: [
                {value:1, label:"fogo"}, 
              ],
            visParams:{
              palette:['000000','800000'],
              min:0,
              max:1
            },
          },
          /*
          {
            name:'azul',
            valueLabels: [
                {value:1, label:"fogo"}, 
              ],
            visParams:{
              palette:['000000','000080'],
              min:0,
              max:1
            },
          },
          {
            name:'cinza escuro',
            valueLabels: [
                {value:1, label:"fogo"}, 
              ],
            visParams:{
              palette:['000000','303030'],
              min:0,
              max:1
            },
          },
          {
            name:'rosa branco',
            valueLabels: [
                {value:1, label:"fogo"}, 
              ],
            visParams:{
              palette:['000000','ffaaaa'],
              min:0,
              max:1
            },
          },
          */
       ],
        // initTrueBandsLayer:['2022'],

     },
      {
        name: 'Desmatamento (INPE-Prodes)',
        image: desmPRODES.selfMask(),
        params:[
          {
            name:'PRODES',
            valueLabels: [
                {value:1, label:"PRODES"}, 
              ],
            visParams:{
              palette:['000000','000080'],
              min:0,
              max:1
            },
          },
       ],
        // initTrueBandsLayer:['2022'],

     },
      {
        name: 'Pivo de Irrigação (MB-col9)',
        image: mb_pivots,
        params:[
          {
            name:'Pivos',
            valueLabels: [
                {value:1, label:"pivos"}, 
              ],
            visParams:{
              palette:['000000','ff6080'],
              min:0,
              max:1
            },
          },
       ],
        initTrueBandsLayer:['2022'],

     },
      {
        name: 'Intensificação da agricultura (MB-col9',
        image: intencification,
        params:[
          {
            name:'Intensificaçao',
            valueLabels: [
              {value:1,label: 'Demais áreas antropizadas para agricultura'}, 
              {value:2,label: 'Vegetação nativa para pastagem para agricultura'},
              {value:3,label: 'Vegetação nativa para agricultura'}, 
              {value:4,label: 'Pastagem para agricultura'}, 
              {value:5,label: 'Vegetação nativa para pastagem'},
              ],
            visParams:{palette: ['000000', 'ffff80', 'E974ED', '008000', 'ff8080', '#aaffaa'], min:0, max: 5},
          },
       ],
        // initTrueBandsLayer:['2022'],

     },
     

      // Adicione mais camadas conforme necessário
    ],
    dataSatLayers:[
      {
        name:'Mosaics (MB-col9)',
        collection:ee.ImageCollection('projects/nexgenmap/MapBiomas2/LANDSAT/BRAZIL/mosaics-2'),
        propertie_list:[
              2023,2022,2021,2020,
          2019,2018,2017,2016,2015,
          2014,2013,2012,2011,2010,
          2009,2008,2007,2006,2005,
          2004,2003,2002,2001,2000,
          1999,1998,1997,1996,1995,
          1994,1993,1992,1991,1990,
          1989,1988,1987,1986,1985,

        ],
        reduce:function(col){return col.mosaic()},
        propertie:'year',
        visParams:[
          {
            name:'false_color',
            visParams:{
              bands: ['swir1_median', 'nir_median', 'red_median'],
              gain: [0.08, 0.06, 0.2],
              gamma: 0.85
            },
          },
          {
            name:'ndvi_median',
            visParams:{
              bands: ['ndvi_median'],
              min: 5000,
              max:20000,
            },
          },
        ]
      },

    ]
  
};
// require('users/workspaceipam/packpages:toolkits/roku/production').start(options);
require('users/workspaceipam/packpages:toolkits/roku/staging').start(options);
