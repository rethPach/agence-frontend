Chart.pluginService.register({
  afterDraw: function(chart) {
      if (typeof chart.config.options.lineAt != 'undefined') {
        var lineAt = chart.config.options.lineAt;
        var ctxPlugin = chart.chart.ctx;
        var xAxe = chart.scales[chart.config.options.scales.xAxes[0].id];
        var yAxe = chart.scales[chart.config.options.scales.yAxes[0].id];
        
        if(yAxe.min != 0) return;
        
        ctxPlugin.strokeStyle = "red";
        ctxPlugin.beginPath();
        lineAt = (lineAt - yAxe.min) * (100 / yAxe.max);
        lineAt = (100 - lineAt) / 100 * (yAxe.height) + yAxe.top;
        ctxPlugin.moveTo(xAxe.left, lineAt);
        ctxPlugin.lineTo(xAxe.right, lineAt);
        ctxPlugin.stroke();
      }
  }
});