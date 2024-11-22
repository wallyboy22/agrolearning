// Laboratório de Sistemas de Informação Espacial - Projeto Agrolearning
// novembro de 2024,  Wallace Silva, wallacevds22@gmail.com
// Reformulação da tabela longa das Unidades Olerícolas da EMATER para uma tabela larga, visando uma melhor exploração dos dados em um BI, Script Earth Engine

var emater= ee.FeatureCollection('users/wallacesilva/Unidades_Emater_Olericulas');
print('emater',emater);
emater.first().propertyNames().sort().evaluate(function(propertiesNames){
  print('propertiesNames',propertiesNames);
  
  var f = propertiesNames.filter(function(a){return a.slice(0,1) == 'F'});
  var f_class = f.map(function(a){return a.slice(1)});
  print('F - filter inti F',f,f_class);
  
  var cultura = propertiesNames.filter(function(a){
    var vipList = ['_h', 'ha'];
    var excption = ['ha_']; 
    var block = 'area_ha';
    return (vipList.indexOf(a.slice(-2)) !== -1 || excption.indexOf(a.slice(-3)) !== -1) && a !== 'area_ha';
  });
  
  var cultura_class = [
    'Abobora','Alface','Batata Doce','Berinjela','Brocolis','Cebola','Chuchu','Couve','Mandioca','Milho Verde','Morango','Outras','Pimentão','Repolho','Tomate','Total',
  ];
  print('cultura - filter final ha, _ha or ha_', cultura,cultura_class);

  var num_agric = propertiesNames.filter(function(a){return 'Num_Agric' === a.slice(0,9);});
  var num_agric_class = num_agric.map(function(a){a = a.slice(-2) === "ic" ? '0' : a; return a})
  print('num_agric - filter init Num_Agric',num_agric,num_agric_class);

  var num_agri = propertiesNames.filter(function(a){return a.slice(0,8) === 'Num_Agri' && 'Num_Agric' !== a.slice(0,9);});
  var num_agri_class = num_agri.map(function(a){return a.slice(9)})
  print('num_agri - filter init Num_Agri',num_agri,num_agri_class);

  var producao = propertiesNames.filter(function(a){return a.slice(0,7) === 'Produca'});
  var producao_class = producao.map(function(a){return a.slice(8).replace('_',"")})
  print('producao - filter init Producao',producao,producao_class);

  var properties = [
    // [f,f_class,'f','count'],
    [cultura,cultura_class,'cultura','ha'],
    [num_agric,num_agric_class,'num_agric','count'],
    [num_agri,num_agri_class,'num_agri','count'],
    [producao,producao_class,'producao','count'],
  ];
  
  emater.aggregate_array('UL').evaluate(function(uls){
    
      
    properties.forEach(function(prop,i){
      var fc = [];

      uls.forEach(function(ul){
        
        var ft = emater.filter(ee.Filter.eq('UL',ul)).first();
        prop[0].forEach(function(_prop,i){
          fc.push(ee.Feature(null)
            .set('UL',ul)
            .set(prop[2],prop[1][i])
            .set(prop[2] + ' ' + prop[3],ft.get(_prop) !== undefined ? ft.get(_prop) : 0)
          );
        });
      });
      fc = ee.FeatureCollection(fc);
      
      var description = 'unidade_emater_reorganizado_' + prop[2] + '-v4';
      Export.table.toDrive({
        collection:fc, 
        description:description,
        folder:'lsie_agriculture',
        fileNamePrefix:description,
        fileFormat:'csv',
        // selectors:,
        // maxVertices:,
        priority:1
      });
      
      print(description,fc.first(),fc);

    });
  });
  
});

// print('emater',emater);

