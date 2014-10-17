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
        	  editable: true,
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
            }

        });
    }
};
