// Laboratório de Sistemas de Informação Espacial - Projeto Agrolearning
// novembro de 2024,  Wallace Silva, wallacevds22@gmail.com
// Download simples e rápido das tabelas CSV geradas com o toolkit ROKU, Script Earth Engine

var list = [
  'projects/mapbiomas-workspace/FOGO_COL3/roku-stats/unidades_emater_municipios_da_ride/cobertura_e_uso_da_terra__mb_10m_beta_',
  'projects/mapbiomas-workspace/FOGO_COL3/roku-stats/unidades_emater_municipios_da_ride/cobertura_e_uso_da_terra__mb_col9_',
  'projects/mapbiomas-workspace/FOGO_COL3/roku-stats/unidades_emater_municipios_da_ride/area_queimada__mb_col31_',
  'projects/mapbiomas-workspace/FOGO_COL3/roku-stats/unidades_emater_municipios_da_ride/desmatamento__inpe_prodes_',
  'projects/mapbiomas-workspace/FOGO_COL3/roku-stats/unidades_emater_municipios_da_ride/pivo_de_irrigacao__mb_col9_',
];

list.forEach(function(id){
  var split = id.split('/');
  var name = split.slice(-1)[0];
  var table = ee.FeatureCollection(id);
  print('table',name, table.limit(10), table.size());
  
  Export.table.toDrive({
    collection:table,
    description:name,
    folder:'agrolearning',
    fileNamePrefix:name,
    fileFormat:'csv',
    // selectors:,
    // maxVertices:,
    // priority:
  });
});
