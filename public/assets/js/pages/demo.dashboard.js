// console.log(j);
// $one->abrev!="UNA" && $one->abrev!="AN" && $one->abrev!="ENS" && $one->abrev!="ESP" && $one->abrev!="USIA"

let ar=[];
let nombr=[];
let zer=[];
for (let index3 = 0; index3 < list_et.length; index3++) {
    if(list_et[index3].abrev!="UNA" && list_et[index3].abrev!="AN" && list_et[index3].abrev!="ENS" && list_et[index3].abrev!="ESP" && list_et[index3].abrev!="USIA"){
   ar.push(list_et[index3].abrev)
   nombr.push(Number(list_et[index3].total)) 
   zer.push(0);
    }
}
// nombr[1]=156;
const cars = [Number(j[0].Université),Number(j[0].institut),Number(j[0].Ecole),Number(j[0].Academie),Number(j[0].Faculté)];
console.log(cars)
!function(o){"use strict";function e(){this.$body=o("body"),this.charts=[]}e.prototype.initCharts=function(){window.Apex={chart:{parentHeightOffset:0,toolbar:{show:!1}},grid:{padding:{left:0,right:0}},colors:["#727cf5","#0acf97","#fa5c7c","#ffbc00"]};
var e=["#727cf5","#0acf97","#fa5c7c","#ffbc00"],t=o("#revenue-chart").data("colors");
t&&(e=t.split(","));
var r={chart:{height:364,type:"line",dropShadow:{enabled:!0,opacity:.2,blur:7,left:-7,top:7}},dataLabels:{enabled:!1},stroke:{curve:"smooth",width:4},series:[{name:"Current Week",data:[10,20,15,25,20,30,20]},{name:"Previous Week",data:[0,15,10,30,15,35,25]}],colors:e,zoom:{enabled:!1},legend:{show:!1},xaxis:{type:"string",categories:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],tooltip:{enabled:!1},axisBorder:{show:!1}},yaxis:{labels:{formatter:function(e){return e+"k"},offsetX:-15}}};
new ApexCharts(document.querySelector("#revenue-chart"),r).render();e=["#727cf5","#e3eaef"];

(t=o("#high-performing-product").data("colors"))&&(e=t.split(","));
r={chart:{height:257,type:"bar",stacked:!0},plotOptions:{bar:{horizontal:!1,columnWidth:"20%"}},dataLabels:{enabled:!1},stroke:{show:!0,width:2,colors:["transparent"]},series:[{name:"Effectif",data:nombr},{name:"Projection",data:zer}],zoom:{enabled:!1},legend:{show:!1},colors:e,xaxis:{categories:ar,axisBorder:{show:!1}},yaxis:{labels:{formatter:function(e){return e+" E"},offsetX:-15}},fill:{opacity:1},tooltip:{y:{formatter:function(e){return""+e+" Etudient"}}}};
new ApexCharts(document.querySelector("#high-performing-product"),r).render();
e=["#a2a3a0","#727cf5","#0acf97","#fa5c7c","#ffbc00"];
//pie
(
    t=o("#average-sales").data("colors"))&&(e=t.split(","));
r={chart:{height:208,type:"donut"},
legend:{show:!1},stroke:{colors:["transparent"]},

series:cars,

// instit
// Ecole
// Academie
// institut
// Faculté


labels:["Université","Instit","Ecole","Academie","Faculté"],
colors:e,
responsive:[{breakpoint:480,options:{chart:{width:200},
    legend:{position:"bottom"}}}]};
new ApexCharts(document.querySelector("#average-sales"),r).render()},

//end pie
// e.prototype.initMaps = function() { 0<o("#world-map-markers").length&&o("#world-map-markers").vectorMap({map: "mr_mill_en",normalizeFunction: "polynomial",hoverOpacity: .7,hoverColor: !1,regionStyle: {initial: {fill: "#e3eaef" }},markerStyle: {initial: {r: 9,fill: "#727cf5","fill-opacity": .9,stroke: "#fff","stroke-width": 7,"stroke-opacity": .4},hover: {stroke: "#fff","fill-opacity": 1, "stroke-width": 1.5}},backgroundColor: "transparent",markers: [{latLng:[18.0973,-15.9785], name: "Nouakchott"},{latLng:[20.9292,-17.0326], name: "Nouadhibou"},{latLng:[15.5951,-0.1462], name: "Ayoun el Atrous"} ],zoomOnScroll:!1})},
e.prototype.initMaps=function(){0<o("#world-map-markers").length&&o("#world-map-markers").vectorMap({map:"mr_mill_en",normalizeFunction:"polynomial",hoverOpacity:.7,hoverColor:!1,regionStyle:{initial:{fill:"#e3eaef"}},zoomOnScroll:!1})},
e.prototype.init=function(){o("#dash-daterange").daterangepicker({singleDatePicker:!0}),this.initCharts(),this.initMaps()},o.Dashboard=new e,o.Dashboard.Constructor=e}(window.jQuery),function(t){"use strict";
t(document).ready(function(e){t.Dashboard.init()})}(window.jQuery);
// console.log(chartOptions);
e.prototype.initMaps = function() { 0<o("#world-map-markers").vectorMap({map: "mr_mill_en",normalizeFunction: "polynomial",hoverOpacity: 0.7,hoverColor: false,regionStyle: {initial: {fill: "#e3eaef" }},markerStyle: {initial: {r: 9,fill: "#727cf5","fill-opacity": 0.9,stroke: "#fff","stroke-width": 7,"stroke-opacity": 0.4},hover: {stroke: "#fff","fill-opacity": 1, "stroke-width": 1.5}},backgroundColor: "transparent",markers: [{latLng:[18.0973,-15.9785], name: "Nouakchott"},{latLng:[20.9292,-17.0326], name: "Nouadhibou"},{latLng:[15.5951,-0.1462], name: "Ayoun el Atrous"} ],zoomOnScroll: false});};
