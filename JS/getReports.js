$(document).ready(function() {
    function getItemName(itemID) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: './PHP/getItem.php',
                dataType:'json',
                data: {
                    prodId: itemID
                },
                    success: function (data) {
                        let prodName = data.prodName
                        resolve(prodName);
                },
                    error: function (error) {
                    reject(error);
                }
            });
        });
    }
    $.ajax({
        type: 'POST',
        url: './PHP/getDeliveredOrders.php',
        dataType: 'json',
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        },
        success:async function(data) {
            var xValues = [];
            var yValues = [];
            var solds = {};
            var lastMonthSales = 0;
            let highSalesItem = '';
            var highSalesItemValue = 0;
            let highSoldItem = '';
            var highSoldItemValue = 0;
            var barColor = '#F55139';
  
            if (data.status == 'ok') {
                var currentDate = new Date();
                var currentMonth = currentDate.getMonth() + 1;
                var currentYear = currentDate.getFullYear();
                var numDays = new Date(currentYear, currentMonth, 0).getDate();
    
                for (let i = 1; i <= numDays; i++) {
                    xValues.push(i);
                    yValues.push(0);
                }
        
                for (let i = 0; i < data.rows.length; i++) {
                    let day = null;
                    let month = null;
                    if (data.rows[i][10] == 'DONE') {
                        var dateObj = new Date(data.rows[i][9]);
                        year = dateObj.getFullYear();
                        month = dateObj.getMonth()+1;
                        day = dateObj.getDate();
                    }
                    if (data.rows[i][10] == 'Delivered') {
                        var dateObj = new Date(data.rows[i][8]);
                        year = dateObj.getFullYear();
                        month = dateObj.getMonth()+1;
                        day = dateObj.getDate();
                    }
                    if (month==currentMonth&&year==currentYear) {
                        if (parseInt(highSalesItemValue)<parseInt(data.rows[i][4])) {
                            var itemID = [data.rows[i][1]]
                            highSalesItem = await Promise.all(itemID.map(itemID => getItemName(itemID)));   
                            highSalesItemValue = data.rows[i][4]
                        }
                        if(data.rows[i][1] in solds){
                            solds[data.rows[i][1]] += parseInt(data.rows[i][3])
                        }else{
                            solds[data.rows[i][1]] = parseInt(data.rows[i][3])
                        }
                        var values = Object.values(solds);
                        var keys = Object.keys(solds);
                        var itemID = [parseInt(keys[highestValueIndex])];
                        highSoldItemValue = Math.max(...values);
                        var highestValueIndex = values.indexOf(highSoldItem);
                        highSoldItem = await Promise.all(itemID.map(itemID => getItemName(itemID)));   
                        // if (parseInt(highSoldItemValue)<parseInt(data.rows[i][4])) {
                        //     var itemID = [data.rows[i][1]]
                        //     highSalesItem = await Promise.all(itemID.map(itemID => getItemName(itemID)));   
                        //     highSalesItemValue = data.rows[i][4]
                        //     console.log(highSalesItem)
                        // }
                        yValues[day - 1] += parseInt(data.rows[i][4]);                        
                    }
                    if (currentMonth==1) {
                        if (month==12&&currentYear-1) {
                            lastMonthSales += parseInt(data.rows[i][4])   
                        }
                    }
                    else{
                        if (month==currentMonth-1&&year==currentYear) {
                            lastMonthSales += parseInt(data.rows[i][4])   
                        }    
                    }
                    
                }
                const monthName = new Date(0, currentMonth-1).toLocaleString('default', { month: 'long' });
                new Chart('barGraph', {
                    type: 'bar',
                    data: {
                        labels: xValues,
                        datasets: [{
                            backgroundColor: barColor,
                            data: yValues
                        }]
                    },
                    options: {
                        legend: { display: false },
                        title: {
                            display: true,
                            text: 'Sales For The Month of '+monthName+' '+currentYear
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontSize: 10,
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    stepSize: yValues,
                                    callback: function(value) {
                                        var ranges = [
                                            { divider: 1e6, suffix: 'M' },
                                            { divider: 1e3, suffix: 'k' }
                                        ];
                                        function formatNumber(n) {
                                            for (var i = 0; i < ranges.length; i++) {
                                                if (n >= ranges[i].divider) {
                                                    return (n / ranges[i].divider).toString() + ranges[i].suffix;
                                                }
                                            }
                                            return n;
                                        }
                                        return 'P' + formatNumber(value);
                                    },
                                    fontSize: 10,
                                }
                            }]
                        }
                    }
                });
            }
            const monthName = new Date(0, currentMonth-1).toLocaleString('default', { month: 'long' });
            document.getElementById('totalSalesTitle').innerHTML = 'Total Sales For The<br>Month of '+ monthName
            document.getElementById('totalSales').textContent = "P"+parseInt(yValues.reduce((a, b) => a + b, 0)).toLocaleString()
            document.getElementById('totalLastSales').textContent = "P"+lastMonthSales.toLocaleString()
            document.getElementById('totalIncrease').textContent = ((parseInt((yValues.reduce((a, b) => a + b, 0))-parseInt(lastMonthSales))/parseInt(lastMonthSales))*100).toFixed(2)+'%'
            if (document.getElementById('totalIncrease').textContent == 'Infinity%') {
                document.getElementById('totalIncrease').innerHTML = 'No Current Sales/<br>No Past Sales'
                document.getElementById('totalIncrease').style.fontSize = '4vw'
            }
            document.getElementById('itemHighSales').textContent = "Highest sales: "+highSalesItem+" - P"+parseInt(highSalesItemValue).toLocaleString()
            document.getElementById('itemHighSold').textContent = "Highest quantity sold: "+highSoldItem+" - "+parseInt(highSoldItemValue).toLocaleString()+" pcs"
        }
    });
});
  