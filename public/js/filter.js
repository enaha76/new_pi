

  
  
function fill(data,etats) {
tables=[];
for (let index = 1; index <=7; index++) {
    tables.push(createtbody(etats,data,index));
    
}
    $('div[id*="div"]').hide();

    document.getElementById("buttons-table-preview 1").innerHTML+= '<a href="javascript:ExportToExcel("'+tables[0].id+'","xlsx")" class="btn btn-sm btn-link float-end">Export<i class="mdi mdi-download ms-1"></i></a>'
    
    document.getElementById("buttons-table-preview 1").appendChild(tables[0]);
    document.getElementById("myChart 1").appendChild(chrt(tables[0]));

    document.getElementById("buttons-table-preview 2").innerHTML+= '<a href="javascript:ExportToExcel("'+tables[1].id+'","xlsx")" class="btn btn-sm btn-link float-end">Export<i class="mdi mdi-download ms-1"></i></a>'
    document.getElementById("buttons-table-preview 2").appendChild(tables[1]);
    document.getElementById("buttons-table-preview 3").innerHTML+= '<a href="javascript:ExportToExcel("'+tables[2].id+'","xlsx")" class="btn btn-sm btn-link float-end">Export<i class="mdi mdi-download ms-1"></i></a>'
    document.getElementById("buttons-table-preview 3").appendChild(tables[2]);
    document.getElementById("myChart 3").appendChild(chrt(tables[2]));
    document.getElementById("buttons-table-preview 4").innerHTML+= '<a href="javascript:ExportToExcel("'+tables[4].id+'","xlsx")" class="btn btn-sm btn-link float-end">Export<i class="mdi mdi-download ms-1"></i></a>'
    document.getElementById("buttons-table-preview 4").appendChild(tables[4]);
    document.getElementById("buttons-table-preview 4").innerHTML+="<br><br><br>"
    document.getElementById("buttons-table-preview 4").innerHTML+= '<a href="javascript:ExportToExcel("'+tables[5].id+'","xlsx")" class="btn btn-sm btn-link float-end">Export<i class="mdi mdi-download ms-1"></i></a>'
    document.getElementById("buttons-table-preview 4").appendChild(tables[5]);
    document.getElementById("buttons-table-preview 5").innerHTML+= '<a href="javascript:ExportToExcel("'+tables[6].id+'","xlsx")" class="btn btn-sm btn-link float-end">Export<i class="mdi mdi-download ms-1"></i></a>'
    document.getElementById("buttons-table-preview 5").appendChild(tables[6]);
   
    
}
function generateRandomColor( ) {
   let usedColors=[]
    let letters = '0123456789ABCDEF';
    
    j=0;
    while (j<20) {
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        usedColors.push(color)
        j++;
    }
    
     return usedColors

}
function chrt(table) {
    var labels = [];

//Select the header cells
var headers = table.getElementsByTagName("th");

//Extract the text content of each cell and add it to the labels array
for (var i = 0; i < headers.length; i++) {
    labels.push(headers[i].textContent);
}
   let colorin=generateRandomColor()
    console.log(colorin,"fffff");
    var data = {
        labels: [],
        datasets: []
    };

    var numDatasets = table.rows[0].cells.length - 1; // number of datasets is the number of columns - 1 (for the labels column)

    // create empty datasets
    for (var i = 0; i < numDatasets; i++) {
        data.datasets.push({
            label: "",
            data: [],
             backgroundColor:[],
            borderWidth: 1,
            barThickness: 30,
            maxBarThickness: 30
        });
    }

    // add labels and data to the datasets
    for (var i = 1; i < table.rows.length; i++) {
        data.labels.push(table.rows[i].cells[0].innerHTML);
        
            for (var j = 1; j <= numDatasets; j++) {
                data.datasets[j-1].data.push(table.rows[i].cells[j].innerHTML);
                
                if (numDatasets>1) { data.datasets[j-1].backgroundColor.push(colorin[j-1]);
                    data.datasets[j-1].label=labels[j];}
                
            } 
            if (numDatasets==1) {
               
                    data.datasets[0].backgroundColor.push(colorin[i])
                    
             
            }
        
        
    }

    var ctx = document.createElement("canvas");

    new Chart(ctx, {
        type: 'bar',
  data: data,
  options: {
    "hover": {
      "animationDuration": 0
    },
    "animation": {
      "duration": 1,
      "onComplete": function() {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;

        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function(dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function(bar, index) {
            var data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    },
    scales: {
      yAxes: [{
   
       
        ticks: {
          max: Math.max(...data.datasets[0].data) + 10,
          
          beginAtZero: true
        }
      }],
      xAxes: [{
       
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
  
    return ctx;
}

    

function createtbody(etablissements, data,j) {


switch (j) {
    case 7:
                
        var instituts = etablissements.filter(
            (e) => e.identifiant === null && e.type === "Institut" 
          );
        var subEtablissments = etablissements.filter(
            (e) => e.identifiant !== null 
          );
          subEtablissments = subEtablissments.concat(instituts);
          
        var allCombinations = getAllCombinations({
            
           age:['< 19',19,20,21,22,23,24,25,26,27,28,29,30,'> 30','NR'],
            GENRE: ['T','F'],
            
        });
        thead = createhead(allCombinations,2);
        thead.style.textAlign = "center";
        var table = document.createElement("table");
        table.id="datatable-buttons "+j
        table.className="table table-centered mb-0"
        table.appendChild(thead);
        var tbody = document.createElement("tbody");
        tbody.style.textAlign = "center";
        var Totale = document.createElement("tr");
        t_cell = document.createElement("td");
        t_cell.innerHTML="TOTAL";
        t_cell.setAttribute("colspan", 2);
        t_cell.className="bg-dark"
        Totale.appendChild(t_cell)
        Totale.className="text-light"
        
        var t={};
        var m=0,f=0;
       
        for (let i = 0; i < subEtablissments.length; i++) {
            students=data.filter(e => e.id_etablissement==subEtablissments[i].id)
         
            count = countByCombination(allCombinations, students)
            let row = document.createElement("tr");
            cell = document.createElement("td");
                    cell.innerHTML = subEtablissments[i].abrev;
                    if (getAbrev( subEtablissments[i].identifiant,etablissements)) {
                    cell1 = document.createElement("td");
                    cell1.innerHTML = getAbrev( subEtablissments[i].identifiant,etablissements);
                    row.appendChild(cell1); 
                    row.appendChild(cell); 
                    } else {
                        cell.setAttribute("colspan", 2);
                        row.appendChild(cell);
                    }
                    
                   
                    var first=true
            Object.keys(count).forEach(key => {
                
                cell = document.createElement("td");
                    cell.innerHTML = count[key];
                    if (t[key]) {
                        t[key]+=count[key]
                    }else{
                        t[key]=count[key]
                    }
                    if (first) {
                        m+=count[key]
                    }
                    else{
                        f+=count[key]
                    }
                    first=!first
                    row.appendChild(cell);
            });
                
            cell = document.createElement("td");
                    cell.innerHTML = m; 
                    row.appendChild(cell)
                    cell = document.createElement("td");
                    cell.innerHTML = f;
                    row.appendChild(cell)
 if(t['m']) {                  
t['m']+=m;
t['f']+=f;
m=0;
f=0;
 }else{
    t['m']=m;
t['f']=f;
m=0;
f=0;
 }
            
            tbody.appendChild(row);
        }

            
           
   
        Object.keys(t).forEach((key) => {
            cell = document.createElement("td");
            cell.innerHTML=t[key];
            cell.className="bg-dark"
            Totale.appendChild(cell)
        })
        sortTbody(tbody);
        mergetbody(tbody);
        tbody.appendChild(Totale)
        table.appendChild(tbody);
       
        return table;  
    case 6:
                
        var instituts = etablissements.filter(
            (e) => e.identifiant === null && e.type === "Institut" && e.id_cycle == 3
          );
        var subEtablissments = etablissements.filter(
            (e) => e.identifiant !== null &&  e.id_cycle == 3
          );
          subEtablissments = subEtablissments.concat(instituts);
          
        var allCombinations = getAllCombinations({
            
            'NOM_DU_(TRONC/FILIRERE)' : ['Classe Préparatoire/Licence'	,'Cycle ingénieur'],
            Niveau: ['1A','2A','3A','T'],
            GENRE: ['T','F'],
            
        });
        thead = createhead(allCombinations,2);
        thead.style.textAlign = "center";
        var table = document.createElement("table");
        table.id="datatable-buttons "+j
        table.className="table table-centered mb-0"
        table.appendChild(thead);
        var tbody = document.createElement("tbody");
        tbody.style.textAlign = "center";
        var Totale = document.createElement("tr");
        t_cell = document.createElement("td");
        t_cell.innerHTML="TOTAL";
        t_cell.setAttribute("colspan", 2);
        t_cell.className="bg-dark"
        Totale.appendChild(t_cell)
        Totale.className="text-light"
        var t={};
        var m=0,f=0;
       
        for (let i = 0; i < subEtablissments.length; i++) {
            students=data.filter(e => e.id_etablissement==subEtablissments[i].id)
         
            count = countByCombination(allCombinations, students)
            let row = document.createElement("tr");
            cell = document.createElement("td");
                    cell.innerHTML = subEtablissments[i].abrev;
                    if (getAbrev( subEtablissments[i].identifiant,etablissements)) {
                    cell1 = document.createElement("td");
                    cell1.innerHTML = getAbrev( subEtablissments[i].identifiant,etablissements);
                    row.appendChild(cell1); 
                    row.appendChild(cell); 
                    } else {
                        cell.setAttribute("colspan", 2);
                        row.appendChild(cell);
                    }
                    
                   
                    var first=true
            Object.keys(count).forEach(key => {
                
                cell = document.createElement("td");
                    cell.innerHTML = count[key];
                    if (t[key]) {
                        t[key]+=count[key]
                    }else{
                        t[key]=count[key]
                    }
                    if (first) {
                        m+=count[key]
                    }
                    else{
                        f+=count[key]
                    }
                    first=!first
                    row.appendChild(cell);
            });
                
            cell = document.createElement("td");
                    cell.innerHTML = m; 
                    row.appendChild(cell)
                    cell = document.createElement("td");
                    cell.innerHTML = f;
                    row.appendChild(cell)
 if(t['m']) {                  
t['m']+=m;
t['f']+=f;
m=0;
f=0;
 }else{
    t['m']=m;
t['f']=f;
m=0;
f=0;
 }
            
            tbody.appendChild(row);
        }

            
           
   
        Object.keys(t).forEach((key) => {
            cell = document.createElement("td");
            cell.innerHTML=t[key];
            cell.className="bg-dark"
            Totale.appendChild(cell)
        })
        sortTbody(tbody);
        mergetbody(tbody);
        tbody.appendChild(Totale)
        table.appendChild(tbody);
       
        return table;
    case 5:
                
        var instituts = etablissements.filter(
            (e) => e.identifiant === null && e.type === "Institut" && e.id_cycle == 1
          );
        var subEtablissments = etablissements.filter(
            (e) => e.identifiant !== null &&  e.id_cycle == 1
          );
          subEtablissments = subEtablissments.concat(instituts);
          
        var allCombinations = getAllCombinations({
            Niveau: ['L1','L2','L3','M1','M2','D1','D2','D3','D4','D5'],
            GENRE: ['T','F'],
            
        });
        thead = createhead(allCombinations,2);
        thead.style.textAlign = "center";
        var table = document.createElement("table");
        table.id="datatable-buttons "+j
        table.className="table table-centered mb-0"
        table.appendChild(thead);
        var tbody = document.createElement("tbody");
        tbody.style.textAlign = "center";
        var Totale = document.createElement("tr");
        t_cell = document.createElement("td");
        t_cell.innerHTML="TOTAL";
        t_cell.setAttribute("colspan", 2);
        t_cell.className="bg-dark"
        Totale.appendChild(t_cell)
        Totale.className="text-light"
        var t={};
        var m=0,f=0;
       
        for (let i = 0; i < subEtablissments.length; i++) {
            students=data.filter(e => e.id_etablissement==subEtablissments[i].id)
         
            count = countByCombination(allCombinations, students)
            let row = document.createElement("tr");
            cell = document.createElement("td");
                    cell.innerHTML = subEtablissments[i].abrev;
                    if (getAbrev( subEtablissments[i].identifiant,etablissements)) {
                    cell1 = document.createElement("td");
                    cell1.innerHTML = getAbrev( subEtablissments[i].identifiant,etablissements);
                    row.appendChild(cell1); 
                    row.appendChild(cell); 
                    } else {
                        cell.setAttribute("colspan", 2);
                        row.appendChild(cell);
                    }
                    
                   
                    var first=true
            Object.keys(count).forEach(key => {
                
                cell = document.createElement("td");
                    cell.innerHTML = count[key];
                    if (t[key]) {
                        t[key]+=count[key]
                    }else{
                        t[key]=count[key]
                    }
                    if (first) {
                        m+=count[key]
                    }
                    else{
                        f+=count[key]
                    }
                    first=!first
                    row.appendChild(cell);
            });
                
            cell = document.createElement("td");
                    cell.innerHTML = m; 
                    row.appendChild(cell)
                    cell = document.createElement("td");
                    cell.innerHTML = f;
                    row.appendChild(cell)
 if(t['m']) {                  
t['m']+=m;
t['f']+=f;
m=0;
f=0;
 }else{
    t['m']=m;
t['f']=f;
m=0;
f=0;
 }
            
            tbody.appendChild(row);
        }

            
           
   
        Object.keys(t).forEach((key) => {
            cell = document.createElement("td");
            cell.innerHTML=t[key];
            cell.className="bg-dark"
            Totale.appendChild(cell)
        })
        sortTbody(tbody);
        mergetbody(tbody);
        tbody.appendChild(Totale)
        table.appendChild(tbody);
       
        return table;
    case 3:
        
        
        var instituts = etablissements.filter(
            (e) => e.identifiant === null && e.type === "Institut" && e.privee == 0
          );
        var subEtablissments = etablissements.filter(
            (e) => e.identifiant !== null && e.privee == 0
          );
          subEtablissments = subEtablissments.concat(instituts);
          
        var allCombinations = getAllCombinations({
            
            GENRE: ['EFFECTIFS','F']
        });
        thead = createhead(allCombinations);
        thead.style.textAlign = "center";
        var table = document.createElement("table");
        table.id="datatable-buttons "+j
        table.className="table table-centered mb-0"
        table.appendChild(thead);
        var tbody = document.createElement("tbody");
        tbody.style.textAlign = "center";
        var Totale = document.createElement("tr");
        t_cell = document.createElement("td");
        t_cell.innerHTML="TOTAL";
        t_cell.setAttribute("colspan", 2);
        t_cell.className="bg-dark"
        Totale.appendChild(t_cell)
        Totale.className="text-light"
        var t={};
        var bigEtablissmentsCounts = {};
for (var i = 0; i < subEtablissments.length; i++) {
    students = data.filter(
        (e) => e.id_etablissement == subEtablissments[i].id
    );

    count = countByCombination(allCombinations, students);
   if (getAbrev(subEtablissments[i].identifiant, etablissements)) {
    var bigEtablissmentAbrev = getAbrev(subEtablissments[i].identifiant, etablissements);
    if (!bigEtablissmentsCounts[bigEtablissmentAbrev]) {
        bigEtablissmentsCounts[bigEtablissmentAbrev] = {
            abrev: bigEtablissmentAbrev,
            counts: count
        }
    } else {
        Object.keys(count).forEach((key) => {
            bigEtablissmentsCounts[bigEtablissmentAbrev].counts[key] += count[key];
        });
    }
   }
}
console.log(bigEtablissmentsCounts);
Object.values(bigEtablissmentsCounts).forEach((bigEtablissment) => {
    var row = document.createElement("tr");
    cell = document.createElement("td");
    cell.innerHTML = bigEtablissment.abrev;
    cell.setAttribute("colspan", 2);
    row.appendChild(cell);

    Object.keys(bigEtablissment.counts).forEach((key) => {
        cell = document.createElement("td");
        cell.innerHTML = bigEtablissment.counts[key];
        if (t[key]) {
            t[key]+=count[key]
        }else{
            t[key]=count[key]
        }
        row.appendChild(cell);
    });
console.log(row);
    tbody.appendChild(row);
});

for (var i = 0; i < instituts.length; i++) {
    students=data.filter(e => e.id_etablissement==instituts[i].id)
    
    count = countByCombination(allCombinations, students)
    var row = document.createElement("tr");
    cell = document.createElement("td");
            cell.innerHTML = instituts[i].abrev;
            if (getAbrev( instituts[i].identifiant,etablissements)) {
            cell1 = document.createElement("td");
            cell1.innerHTML = getAbrev( instituts[i].identifiant,etablissements);
            row.appendChild(cell1); 
            row.appendChild(cell); 
            } else {
                cell.setAttribute("colspan", 2);
                row.appendChild(cell);
            }
            
           
            
    Object.keys(count).forEach(key => {
        cell = document.createElement("td");
            cell.innerHTML = count[key];
            
            if (t[key]) {
                t[key]+=count[key]
            }else{
                t[key]=count[key]
            }
            row.appendChild(cell);
    });
        
         
        
    
    tbody.appendChild(row);
}
        Object.keys(t).forEach((key) => {
            cell = document.createElement("td");
            cell.innerHTML=t[key];
            cell.className="bg-dark"
            Totale.appendChild(cell)
        })
        sortTbody(tbody);
        mergetbody(tbody);
        tbody.appendChild(Totale)
        table.appendChild(tbody);
        console.log(chrt(table));
        return table;
    case 2:
        var instituts = etablissements.filter(
            (e) => e.identifiant === null && e.type === "Institut" 
          );
        var subEtablissments = etablissements.filter(
            (e) => e.identifiant !== null 
          );
          subEtablissments = subEtablissments.concat(instituts);
          
        var allCombinations = getAllCombinations({
            NATIONALITE: [ 'MAURITANIE', 'ETRANGES'],
            GENRE: ['T', 'F']
        });
        thead = createhead(allCombinations,2);
        thead.style.textAlign = "center";
        var table = document.createElement("table");
        table.id="datatable-buttons "+j
        table.className="table table-centered mb-0"
        table.appendChild(thead);
        var tbody = document.createElement("tbody");
        tbody.style.textAlign = "center";
        var Totale = document.createElement("tr");
        t_cell = document.createElement("td");
        t_cell.innerHTML="TOTAL";
        t_cell.setAttribute("colspan", 2);
        t_cell.className="bg-dark"
        Totale.appendChild(t_cell)
        Totale.className="text-light"
        var t={};
        var m=0,f=0;
       
        for (let i = 0; i < subEtablissments.length; i++) {
            students=data.filter(e => e.id_etablissement==subEtablissments[i].id)
         
            count = countByCombination(allCombinations, students)
            let row = document.createElement("tr");
            cell = document.createElement("td");
                    cell.innerHTML = subEtablissments[i].abrev;
                    if (getAbrev( subEtablissments[i].identifiant,etablissements)) {
                    cell1 = document.createElement("td");
                    cell1.innerHTML = getAbrev( subEtablissments[i].identifiant,etablissements);
                    row.appendChild(cell1); 
                    row.appendChild(cell); 
                    } else {
                        cell.setAttribute("colspan", 2);
                        row.appendChild(cell);
                    }
                    
                   
                    var first=true
            Object.keys(count).forEach(key => {
                
                cell = document.createElement("td");
                    cell.innerHTML = count[key];
                    if (t[key]) {
                        t[key]+=count[key]
                    }else{
                        t[key]=count[key]
                    }
                    if (first) {
                        m+=count[key]
                    }
                    else{
                        f+=count[key]
                    }
                    first=!first
                    row.appendChild(cell);
            });
                
            cell = document.createElement("td");
                    cell.innerHTML = m; 
                    row.appendChild(cell)
                    cell = document.createElement("td");
                    cell.innerHTML = f;
                    row.appendChild(cell)
 if(t['m']) {                  
t['m']+=m;
t['f']+=f;
m=0;
f=0;
 }else{
    t['m']=m;
t['f']=f;
m=0;
f=0;
 }
            
            tbody.appendChild(row);
        }

            
           
   
        Object.keys(t).forEach((key) => {
            cell = document.createElement("td");
            cell.innerHTML=t[key];
            cell.className="bg-dark"
            Totale.appendChild(cell)
        })
        sortTbody(tbody);
        mergetbody(tbody);
        tbody.appendChild(Totale)
        table.appendChild(tbody);
       
        return table;
    case 1:
        var instituts = etablissements.filter(
            (e) => e.identifiant === null && e.type === "Institut" && e.privee == 0
          );
        var subEtablissments = etablissements.filter(
            (e) => e.identifiant !== null && e.privee == 0
          );
          subEtablissments = subEtablissments.concat(instituts);
          
        var allCombinations = getAllCombinations({
            
            GENRE: ['EFFECTIFS']
        });
        thead = createhead(allCombinations);
        thead.style.textAlign = "center";
        var table = document.createElement("table");
        table.id="datatable-buttons "+j
        table.className="table table-centered mb-0"
        table.appendChild(thead);
        var tbody = document.createElement("tbody");
        tbody.style.textAlign = "center";
        var Totale = document.createElement("tr");
        t_cell = document.createElement("td");
        t_cell.innerHTML="TOTAL";
        t_cell.setAttribute("colspan", 2);
        t_cell.className="bg-dark"
        t_cell.className="bg-dark"
        Totale.appendChild(t_cell)
        Totale.className="text-light"
        Totale.className="text-light"
        
        var t={};
        var bigEtablissmentsCounts = {};
for (var i = 0; i < subEtablissments.length; i++) {
    students = data.filter(
        (e) => e.id_etablissement == subEtablissments[i].id
    );

    count = countByCombination(allCombinations, students);
   if (getAbrev(subEtablissments[i].identifiant, etablissements)) {
    var bigEtablissmentAbrev = getAbrev(subEtablissments[i].identifiant, etablissements);
    if (!bigEtablissmentsCounts[bigEtablissmentAbrev]) {
        bigEtablissmentsCounts[bigEtablissmentAbrev] = {
            abrev: bigEtablissmentAbrev,
            counts: count
        }
    } else {
        Object.keys(count).forEach((key) => {
            bigEtablissmentsCounts[bigEtablissmentAbrev].counts[key] += count[key];
        });
    }
   }
}
console.log(bigEtablissmentsCounts);
Object.values(bigEtablissmentsCounts).forEach((bigEtablissment) => {
    var row = document.createElement("tr");
    cell = document.createElement("td");
    cell.innerHTML = bigEtablissment.abrev;
    cell.setAttribute("colspan", 2);
    row.appendChild(cell);

    Object.keys(bigEtablissment.counts).forEach((key) => {
        cell = document.createElement("td");
        cell.innerHTML = bigEtablissment.counts[key];
        if (t[key]) {
            t[key]+=count[key]
        }else{
            t[key]=count[key]
        }
        row.appendChild(cell);
    });
console.log(row);
    tbody.appendChild(row);
});

for (var i = 0; i < instituts.length; i++) {
    students=data.filter(e => e.id_etablissement==instituts[i].id)
    
    count = countByCombination(allCombinations, students)
    var row = document.createElement("tr");
    cell = document.createElement("td");
            cell.innerHTML = instituts[i].abrev;
            if (getAbrev( instituts[i].identifiant,etablissements)) {
            cell1 = document.createElement("td");
            cell1.innerHTML = getAbrev( instituts[i].identifiant,etablissements);
            row.appendChild(cell1); 
            row.appendChild(cell); 
            } else {
                cell.setAttribute("colspan", 2);
                row.appendChild(cell);
            }
            
           
            
    Object.keys(count).forEach(key => {
        cell = document.createElement("td");
            cell.innerHTML = count[key];
            
            if (t[key]) {
                t[key]+=count[key]
            }else{
                t[key]=count[key]
            }
            row.appendChild(cell);
    });
        
         
        
    
    tbody.appendChild(row);
}
        Object.keys(t).forEach((key) => {
            cell = document.createElement("td");
            cell.innerHTML=t[key];
            cell.className="bg-dark"
            Totale.appendChild(cell)
        })
        sortTbody(tbody);
        mergetbody(tbody);
        tbody.appendChild(Totale)
        table.appendChild(tbody);
      
        return table;
    default:
        break;
}




//     var subEtablissments = etablissements.filter(
//         (e) =>
//             e.identifiant !== null ||
//             (e.identifiant === null && e.type === "Institut")
//     );
//     let allCombinations = getAllCombinations({
//         NATIONALITE: ["ETRANGES", "MAURITANIE"],
//         Niveau: ["L1", "L2", "L3"],
//         GENRE: ["T", "F"],
//     });
//     thead = createhead(allCombinations);

    
//     let table = document.createElement("table");
//     table.id="datatable-buttons"
//     table.className="table table-centered mb-0"
//     table.appendChild(thead);
//     let tbody = document.createElement("tbody");
//     tbody.style.textAlign = "center";
//     for (let i = 0; i < subEtablissments.length; i++) {
//         students = data.filter(
//             (e) => e.id_etablissement == subEtablissments[i].id
//         );

//         count = countByCombination(allCombinations, students);
//         let row = document.createElement("tr");
//         cell = document.createElement("td");
//         cell.innerHTML = subEtablissments[i].abrev;
//         if (getAbrev(subEtablissments[i].identifiant, etablissements)) {
//             cell1 = document.createElement("td");
//             cell1.innerHTML = getAbrev(
//                 subEtablissments[i].identifiant,
//                 etablissements
//             );
//             row.appendChild(cell1);
//             row.appendChild(cell);
//         } else {
//             cell.setAttribute("colspan", 2);
//             row.appendChild(cell);
//         }

//         Object.keys(count).forEach((key) => {
//             cell = document.createElement("td");
//             cell.innerHTML = count[key];
//             if (count[key] > 0) {
//                 cell.style.background = "red";
//             }
//             row.appendChild(cell);
//         });

//         tbody.appendChild(row);
//     }
//     sortTbody(tbody);
//     mergetbody(tbody);

//     table.appendChild(tbody);
//  return table;
}

function groupEtablissmentRows(etablissments, tbody) {
    let currentEtablissmentId;
    let currentEtablissmentRowCount = 0;
    for (let i = 0; i < tbody.rows.length; i++) {
        let etablissmentId = etablissments[tbody.rows[i].cells[0].innerHTML];
        if (etablissmentId !== currentEtablissmentId) {
            if (currentEtablissmentRowCount > 0) {
                tbody.rows[
                    i - currentEtablissmentRowCount
                ].cells[0].setAttribute("rowspan", currentEtablissmentRowCount);
            }
            currentEtablissmentId = etablissmentId;
            currentEtablissmentRowCount = 1;
        } else {
            tbody.rows[i].deleteCell(0);
            currentEtablissmentRowCount++;
        }
    }
    if (currentEtablissmentRowCount > 0) {
        tbody.rows[
            tbody.rows.length - currentEtablissmentRowCount
        ].cells[0].setAttribute("rowspan", currentEtablissmentRowCount);
    }
}

function createhead(objArray ,t=0) {
    if(objArray.length==1 && Object.keys(objArray[0]).length==1){
        let keys = Object.keys(objArray[0]);
        td = document.createElement("th");
        tr = document.createElement("tr");
        td.innerHTML = "INSTITUTIONS";
        td.className="bg-dark text-light"
        td.setAttribute("colspan", 2);
        tr.appendChild(td);
        td = document.createElement("th");
        
        td.innerHTML = objArray[0][keys[0]];
        td.className="bg-dark text-light"
        
        tr.appendChild(td);
        let thead = document.createElement("thead");
    thead.id = "thead";
    thead.appendChild(tr);
    return thead;
    }
    
    let keys = Object.keys(objArray[0]);
    let trs = [];
    for (let key of keys) {
        td = document.createElement('th');
        tr = document.createElement('tr');
        td.innerHTML = key;
        td.className="bg-dark text-light"
        td.setAttribute("colspan", 2);

        tr.appendChild(td);
        trs.push(tr);
    }

    let objKeys = Object.keys(objArray[0])
    for (let i = 0; i < objKeys.length; i++) {

        for (let j = 0; j < objArray.length; j++) {
            td = document.createElement('th');
            td.innerHTML = objArray[j][objKeys[i]]
            td.className="bg-dark text-light"
            td.id = j
            console.log(td);
            trs[i].appendChild(td)
        }

    }
console.log(objArray);
    let thead = document.createElement('thead');
    thead.id = "thead";
    for (let i = 0; i < trs.length; i++) {
        thead.appendChild(trs[i]);
    }

    thead = mergeCells(thead,t);
    
    return thead;

}

function getAllCombinations(criteria) {
    let combinations = [];
    let keys = Object.keys(criteria);

    function generateCombinations(combination, remainingKeys) {
        if (remainingKeys.length === 0) {
            combinations.push(combination);
            return;
        }

        let currentKey = remainingKeys[0];
        let currentValues = criteria[currentKey];

        for (let i = 0; i < currentValues.length; i++) {
            let newCombination = {
                ...combination,
            };
            newCombination[currentKey] = currentValues[i];
            generateCombinations(newCombination, remainingKeys.slice(1));
        }
    }

    generateCombinations({}, keys);
    return combinations;
}

function countByCombination(combinations, data) {
    let count = {};
    for (let combination of combinations) {
        var l = "";

        Object.keys(combination).forEach((element) => {
            l += combination[element] + " ";
        });

        count[l] = 0;

        data.forEach((student) => {
            let match = true;
            i = 1;
            for (let criteria in combination) {
                if(criteria=='age'){
                   if(combination[criteria] =="< 19" && getAge( student.date_DE_NAISSANCE) &&getAge( student.date_DE_NAISSANCE)<19){
                    continue
                   }
                   else if(combination[criteria] =="> 30" && getAge( student.date_DE_NAISSANCE) &&getAge( student.date_DE_NAISSANCE)>30){
                    continue
                   }
                  else if(combination[criteria] =="NR" && !getAge( student.date_DE_NAISSANCE)){
                    continue
                   }
                   else if(combination[criteria]==student[criteria]){
                     continue
                   }
                   else {
                    match = false;
                    break;
                }
                }
                if (student[criteria] != combination[criteria]) {
                    if (
                        combination[criteria] == "ETRANGES" &&
                        student[criteria] != "MAURITANIE"
                    ) {
                        continue;
                    }
                    if (
                        (combination[criteria] === "T" || combination[criteria] === "EFFECTIFS" )
                    ) {
                        continue;
                    }
                    if (
                        (criteria === "Niveau" && combination[criteria] === "T" )
                        
                    ) {
                        continue;
                    } else {
                        match = false;
                        break;
                    }
                }
            }
            if (match) {
                count[l]++;
            }
        });
    }

    return count;
}

function mergeCells(thead,t=0) {
    let currentCell;
    let colspanCount = 1;
    for (let i = 0; i < thead.rows.length; i++) {
        currentCell = thead.rows[i].cells[1];
        for (let j = thead.rows[i].cells.length - 1; j > 0; j--) {
            if (currentCell.innerHTML == thead.rows[i].cells[j].innerHTML) {
                colspanCount++;
                thead.rows[i].removeChild(thead.rows[i].cells[j]);
            } else {
                if (colspanCount > 1) {
                    console.log(j,thead.rows[i]);
                    thead.rows[i].cells[j + 1].setAttribute(
                        "colspan",
                        colspanCount
                    );
                }
                colspanCount = 1;
                currentCell = thead.rows[i].cells[j];
            }
        }

        if (colspanCount > 1) {
            currentCell.setAttribute("colspan", colspanCount);
        }
        colspanCount = 1;
    }
    if(t){
        td = document.createElement("th");
        td.innerHTML = "TOTAL";
        td.className="bg-dark text-light"
        td.style.textAlign="center"
        td.setAttribute("colspan", t);
                td.setAttribute("rowspan", thead.rows.length);
                thead.rows[0].appendChild(td)}
            
    return thead;
}

function mergetbody(tbody) {
    let currentCell;
    let rowspanCount = 1;
    for (let i = 0; i < tbody.rows.length; i++) {
        currentCell = tbody.rows[i].cells[0];
        for (let j = i + 1; j < tbody.rows.length; j++) {
            if (currentCell.innerHTML === tbody.rows[j].cells[0].innerHTML) {
                rowspanCount++;
                tbody.rows[j].removeChild(tbody.rows[j].cells[0]);
            } else {
                if (rowspanCount > 1) {
                    currentCell.setAttribute("rowspan", rowspanCount);
                }
                rowspanCount = 1;
                currentCell = tbody.rows[j].cells[0];
            }
        }
        if (rowspanCount > 1) {
            currentCell.setAttribute("rowspan", rowspanCount);
        }
        rowspanCount = 1;
    }
    return tbody;
}

function getAbrev(id, etablissements) {
    for (let i = 0; i < etablissements.length; i++) {
        if (etablissements[i].id === id) {
            return etablissements[i].abrev;
        }
    }
    return null;
}

function sortTbody(tbody) {
    const rows = tbody.rows;
    const rowsArray = Array.from(rows);
    rowsArray.sort((a, b) => {
        const firstCellA = a.cells[0].textContent;
        const firstCellB = b.cells[0].textContent;
        if (firstCellA < firstCellB) {
            return 1;
        } else if (firstCellA > firstCellB) {
            return -1;
        } else {
            return 0;
        }
    });
    for (let i = 0; i < rowsArray.length; i++) {
        tbody.appendChild(rowsArray[i]);
    }
}

function getAge(dateOfBirth) {
    if (!dateOfBirth) return false; // return false if date is non-renseigner
    var today = new Date();
    var birthDate = new Date(dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function generateRandomLetter() {
  let randomIndex = Math.floor(Math.random() * letters.length);
  let randomLetter = letters[randomIndex];
  letters.splice(randomIndex, 1);
  return randomLetter;
}
 function ExportToExcel(id, type, fn, dl ) {
            var elt = document.getElementById(id);
            var wb = XLSX.utils.table_to_book(elt, {
                sheet: "sheet1"
            });
            return dl ?
                XLSX.write(wb, {
                    bookType: type,
                    bookSST: true,
                    type: 'base64'
                }) :
                XLSX.writeFile(wb, fn || ('one.' + (type || 'xlsx')));
        }