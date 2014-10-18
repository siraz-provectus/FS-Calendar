var FlCalendar = window.FlCalendar = {

  initialize: function () {
     
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },

      height: 500,
      minTime: 9,
      maxTime: 19,
      axisFormat: 'H(:mm)',
      editable: false,
      allDaySlot: false,

      monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
      monthNamesShort: ['Янв.','Фев.','Март','Апр.','Май','Июнь','Июль','Авг.','Сент.','Окт.','Ноя.','Дек.'],
      dayNames: ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],
      dayNamesShort: ["ВС","ПН","ВТ","СР","ЧТ","ПТ","СБ"],

      buttonText: {
        prev: "&nbsp;&#9668;&nbsp;",
        next: "&nbsp;&#9658;&nbsp;",
        prevYear: "&nbsp;&lt;&lt;&nbsp;",
        nextYear: "&nbsp;&gt;&gt;&nbsp;",
        today: "Сегодня",
        month: "Месяц",
        week: "Неделя",
        day: "День"
      },

      events: function(start, end, callback) {
          $.ajax({
              url: '/events',
              dataType: 'json',
              data: {
                  // our hypothetical feed requires UNIX timestamps
                  event: {
                    start_date: new Date(start.getTime()),
                    end_date: new Date(end.getTime()),
                    user_id: $('#user_id').val()
                  }
              },
              success: function(collection) {
                  var events = [];
                  collection.forEach(function(element, index, array) {
                    var date = new Date(element['start_date'])
                    var end_date = new Date(element['end_date'])
                    var timezone = date.getTimezoneOffset();
                    var h_start = date.getHours();
                    var minut_start = date.getMinutes();
                    var h_end = end_date.getHours();
                    var minut_end = end_date.getMinutes();
                    var delta = end_date.getTime() - date.getTime();
                    if (element['repeat'] != 0){
                      var one_day = (24 * 60 * 60 * 1000);
                      for (loop = start.getTime();
                           loop <= end.getTime();
                           loop = loop + one_day) {
                        var column_date = new Date(loop);
                        var start_temp = new Date(column_date.setHours(h_start, minut_start));
                        var end_temp = start_temp.getTime() + delta;
                        if (new Date(column_date) >= date) {
                          if (element['repeat'] == 1){
                            events.push({
                              id: element['id'],
                              title: element['name'],
                              start: start_temp,
                              end: new Date(end_temp)
                            });
                          } else if (element['repeat'] == 2) {
                            day = date.getDay();
                            if (column_date.getDay() == day) {
                              events.push({
                                id: element['id'],
                                title: element['name'],
                                start: start_temp,
                                end: new Date(end_temp)
                              });
                            }
                          } else if (element['repeat'] == 3) {
                            month = date.getDate();
                            if (column_date.getDate() == month) {
                              events.push({
                                id: element['id'],
                                title: element['name'],
                                start: start_temp,
                                end: new Date(end_temp)
                              });
                            }
                          } 
                          else {
                            year = date.getYear();
                            month = date.getMonth();
                            day = date.getDate();
                            if ((column_date.getYear() >= year) &&
                               (column_date.getMonth() == month) && 
                               (column_date.getDate() == day)) {
                              events.push({
                                id: element['id'],
                                title: element['name'],
                                start: start_temp,
                                end: new Date(end_temp)
                              });
                            }
                          }
                        }
                      }
                    } else {
                      events.push({
                        id: element['id'],
                        title: element['name'],
                        start: new Date(date),
                        end: new Date(end_date)
                      });
                    }
                  });
                  callback(events);
              }
          });
      },

      dayClick: function(date, allDay, jsEvent, view) {

        var d = date.getDate();
        var m = date.getMonth()+1;
        var y = date.getFullYear();
        var h = date.getHours();
        var minut = date.getMinutes(); 
        if (m<10)
          {
            m = '0' + m;
        }
        if (d<10)
          {
            d = '0' + d;
        }
        if (minut<10)
          {
            minut = '0' + minut;
        }
        if(h==0){
          h = '09'
        }
        var h2 = parseInt(h) + 1

        event = {event: {start_date: y+'-'+m+'-'+d+' '+h+':'+minut+':00', end_date: y+'-'+m+'-'+d+' '+h2+':'+minut+':00'} }
        $.get('/events/new', event );

      },

      eventClick: function(calEvent, jsEvent, view) {
        $.get('/events/'+calEvent.id+'/edit');
      }
    });
  }
};
