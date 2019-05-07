var fs = require('fs');
const { JSDOM } = require('jsdom');
var moment = require('moment');
var $ = require('jquery');

const colors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
let dom = new JSDOM('<!DOCTYPE html><html lang="en"><head><title>Git Report</title>'+
    '<style>#grid .title{height:16px;font-size:12px}#grid #hcol{display:inline-block;vertical-align:top}#grid #hcol .title:first-child{margin-bottom:6px}#grid #hcol .title{margin-right:6px;padding-top:2px}#grid .col{display:inline-block;width:16px;vertical-align:top}#grid .col .title{margin-bottom:6px}#grid .col .day{width:16px;height:16px;border:1px #fff solid}#container{display:inline-block;margin:auto;min-width:900px;border:1px #404040 solid;border-radius:8px;padding:12px 12px 0}#container .info{display:inline-block;width:33.333%;text-align:center;margin:12px 0 12px}</style>'+
    '</head><body></body></html>');
$ = $(dom.window);
let document = dom.window.document;
let argInput = process.argv.slice(2);

process.stdin.resume();
process.stdin.setEncoding('utf8');

var pipeInput = '';
process.stdin.on('data', function(chunk) {
    pipeInput += chunk;
});

process.stdin.on('end', function(){
    render(JSON.parse(pipeInput));
    if(argInput[0] !== undefined)
        fs.writeFileSync(argInput[0], dom.serialize());
    else
        fs.writeFileSync('git-stats.htm', dom.serialize());
    fs.writeFileSync('git-stats.json', pipeInput);
});

function render(data){
    let currentStreakCount = data.cStreak || 0;
    let longestStreakCount = data.lStreak || 0;
    let longestStreakPeriod = data.longestStreak;
    let currentStreakPeriod = data.currentStreak;
    let maxCommitCount = data.max;
    let commits = data.data;
    let container = $('<div id="container"><div id="grid"><div id="hcol"><div class="title"></div><div class="title">'+
        '</div><div class="title">Mon</div><div class="title"></div><div class="title">Wed</div><div class="title"></div>'+
        '<div class="title">Fri</div><div class="title"></div></div></div><div class="info"><strong>Total Commits</strong><br/>'
        +commits.length+' Commits,<br/>from '+moment(data.start).format('YYYY-MM-DD')+' to '+moment(data.end).format('YYYY-MM-DD')
        +'</div><div class="info"><strong>Current Streak</strong><br/>'+currentStreakCount+' Days,<br/>from '
        +moment(currentStreakPeriod.start).format('YYYY-MM-DD')+' to '+moment(currentStreakPeriod.end).format('YYYY-MM-DD')
        +'</div><div class="info"><strong>Longest Streak</strong><br/>'+longestStreakCount+' Days,<br/>from '
        +moment(longestStreakPeriod.start).format('YYYY-MM-DD')+' to '+moment(longestStreakPeriod.end).format('YYYY-MM-DD')
        +'</div></div>');

    let grid = container.find('#grid'), lastMonth = null;
    commits.forEach(function(commit, i){
        let timestamp = moment(commit[0]);
        let record = {
            date: timestamp.format('YYYY-MM-DD'),
            weekday: timestamp.weekday(),
            count: commit[1],
            level: level(commit[1], maxCommitCount)
        };
        let column = (i == 0 || record.weekday == 0)? grid.append('<div class="col"><div class="title"></div></div>').find('.col:last')
            : grid.find('.col:last');
        if(i == 0 && record.weekday != 0)
            for(let j = 0; j < record.weekday; j++)
                column.append('<div class="day">').find('.day:last').css('background-color', colors[0]).attr('title','n/a');
        column.append('<div class="day">').find('.day:last').css('background-color', colors[record.level])
            .attr('title', record.date+': '+record.count);
        let month = moment(record.date).format('MMM');
        if(lastMonth != month){
            lastMonth = month;
            column.find('.title').text(month);
        }
    });

    let body = $(document.getElementsByTagName('body')[0]);
    let title = $(document).find('title');
    title.html(title.text()+' '+moment().format('YYYY-MM-DD hh:mm:ss A'));
    body.append(container);
}

function level(count, max){
    let range = parseFloat(count) / parseFloat(max) * 100.0;
    switch(true){
        case (range < 20):                return 0;
        case (range >= 20 && range < 40): return 1;
        case (range >= 40 && range < 60): return 2;
        case (range >= 60 && range < 80): return 3;
        case (range >= 80):               return 4;
    }
}