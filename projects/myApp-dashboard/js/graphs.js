/*****************************/
/************Charts***********/
/*****************************/

/********Traffic chart********/

const chartMenu = document.querySelector(".traffic-header");    //Get menu list for event listener
const trafficCanvas = document.getElementById("traffic-chart"); //Get canvas to display chart
const liItems = document.querySelectorAll(".traffic-header li"); //Get list items

/********Traffic chart data and labels********/

let dailyTrafficLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]; 
let dailyTrafficData = [600, 200, 260, 260, 300, 500, 580 ];

let hourlyTrafficLabels = ["17", "18", "19", "20", "21", "22", "23", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16" ];
let hourlyTrafficData = [ 40, 50, 50, 60, 60, 50, 40, 40, 40, 10, 10, 10, 5, 5, 5, 5, 5, 8, 10, 20, 15, 20, 30, 40];

let weeklyTrafficLabels = ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"];
let weeklyTrafficData = [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500];

let monthlyTrafficLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
let monthlyTrafficData = [8850, 9325, 5214, 4505, 5323, 6435, 6954, 6630, 9345, 10324, 9954, 8765];



let trafficData = {

    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],

    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],

    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    }]
};

let trafficOptions = {

    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    },
    legend: {
        display: false
    }
};

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
    
});


/*********** Chart Menu Event Listener ************/

chartMenu.addEventListener('click', function(e) {
    /*******Remove active class *******/
    for (let i = 0; i < liItems.length; i++) {
        if (liItems[i].classList.contains("active")) {
            liItems[i].classList.remove("active");
        }
    } 
     
    /***********Display correct graph ************/
    if (e.target.textContent == 'Hourly'){
        trafficData.datasets[0].data = hourlyTrafficData;
        trafficData.labels = hourlyTrafficLabels;
    } else if (e.target.textContent == 'Daily'){
        trafficData.datasets[0].data = dailyTrafficData;
        trafficData.labels = dailyTrafficLabels;
    } else if (e.target.textContent == 'Weekly') {
        trafficData.datasets[0].data = weeklyTrafficData;
        trafficData.labels = weeklyTrafficLabels;
    } else if (e.target.textContent == 'Monthly') {
        trafficData.datasets[0].data = monthlyTrafficData;
        trafficData.labels = monthlyTrafficLabels;
    }

    /******* Add Active Class to Choice *********/
    e.target.classList.add('active');

    /************* Create New Chart *************/
    let trafficChart = new Chart(trafficCanvas, {
        type: 'line',
        data: trafficData,
        options: trafficOptions
    });

});


/*************** Daily Bar Chart ***************/

const dailyCanvas = document.getElementById("daily-chart");

const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: "# of Hits",
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1
    }]
};

const dailyOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    },
    legend: {
        display: false
    }
};

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});


/************* Mobile Doughnut Chart **********/

const mobileCanvas = document.getElementById("mobile-chart");

const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
        label: "# of Users",
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8'
        ]
    }]
};

const mobileOptions = {
    legend: {
        position: 'right',
        labels: {
            boxWidth: 20,
            fontStyle: 'bold'
        }
    }
};

let mobileChart = new Chart(mobileCanvas, {
    type: "doughnut",
    data: mobileData,
    options: mobileOptions
});