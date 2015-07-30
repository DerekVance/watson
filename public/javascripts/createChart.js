var traits = document.getElementById('traits').innerHTML;
var categories = JSON.parse(traits);
var personality = document.getElementById('personality').innerHTML;
var temp = personality.split(',');
var colors = ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", '#056233']
var highlights = ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", '#CC7400']

var data = temp.map(function (index, i) {
  var arr = index.split(' ');
  if(arr[0] === 'Emotional')
    return {value: arr[2], color: colors[i], highlight: highlights[i] , label: arr[0]}
  else
    return {value: arr[1], color: colors[i], highlight: highlights[i] , label: arr[0]}
});

  console.log(data);
var ctx1 = document.getElementById("myChart").getContext("2d");
var myNewChart = new Chart(ctx1).PolarArea(data);

ctx1.canvas.addEventListener('mousedown', function (event) {
    var activePoints = myNewChart.getSegmentsAtEvent(event);
    var category = activePoints[0].label;
    var index = 0;
    categories.forEach(function (cat, i) {
      if(cat.bigF == category)
        index += i;
    })
    console.log(category);
    // console.log(categories[index]);
    var data2 = {
      labels: categories[index].labels,
      datasets: [
          {
              label: "Children",
              fillColor: colors[index],
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              data: categories[index].datasets
          }
      ]
    };
    // console.log(data2);
    var ctx2 = document.getElementById('barChart').getContext("2d");
      ctx2.canvas.addEventListener('click', function () {
        myBarChart.destroy();
      })

    var myBarChart = new Chart(ctx2).Bar(data2);


});
