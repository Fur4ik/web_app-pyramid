import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

export class TestComponent {

  @ViewChild('selectorMenu') selectorMenu!: ElementRef;
  @ViewChild('selectorItems') selectorItems!: ElementRef;
  @ViewChild('selector') selector!: ElementRef;

  showMenu() {
    if (this.selectorMenu.nativeElement.style.display === 'flex') {
      this.selectorMenu.nativeElement.style.display = 'none'
    } else (this.selectorMenu.nativeElement.style.display = 'flex')
  }

  ngOnInit() {
    this.reloadMonth(1);
    document.addEventListener('click', (event) => {
      // @ts-ignore
      if (!event.target!.closest('.selector'))
        this.selectorMenu.nativeElement.style.display = 'none';
    })

    // console.log(this.generateMonth(2025, 1))
    // console.log(new Date(2024,0,32).getDate ());

    // console.log(this.generateYears(2025))

      console.log(new Date().getDate(), new Date().getMonth()+1, new Date().getFullYear());

    console.log(new Date().getTimezoneOffset());
  }





  clickItem(idMonth: number) {
    this.selectorMenu.nativeElement.style.display = 'none';
    this.months.forEach((month) => {
      if (month.idMonth == idMonth) {
        this.reloadMonth(month.idMonth)
      }
    })
  }


  reloadMonth(idMon: number) {
    this.months.forEach((month) => {
      if (month.idMonth == idMon) {
        this.currentMonth.idMonth = month.idMonth;
        this.currentMonth.nameMonth = month.nameMonth;
        this.currentMonth.countDays = month.countDays;
      }
    })
  }


  weekday = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

  generateMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const amountDays = lastDay.getDate() - firstDay.getDate() + 1;

    return {
      year,
      month: this.month[month - 1],
      amountDays,
      firstDayOfMonth: this.weekday[firstDay.getDay()],
      lastDayOfMonth: this.weekday[lastDay.getDay()],
    }
  }

  generateYears = (year: number) => {
    let currentYear = []
    for (let i = 1; i <= 12; i++) {
      currentYear.push(this.generateMonth(year, i))
    }
    return currentYear;
  }


  months = [
    {
      idMonth: 1,
      nameMonth: 'January',
      countDays: 31,
    },
    {
      idMonth: 2,
      nameMonth: 'February',
      countDays: 28,
    },
    {
      idMonth: 3,
      nameMonth: 'March',
      countDays: 31,
    },
    {
      idMonth: 4,
      nameMonth: 'April',
      countDays: 30,
    }
  ]

  currentMonth = {
    idMonth: 0,
    nameMonth: 'Month',
    countDays: 0,
  }




  monthLeft(idMonth: number) {
    if (idMonth == 1) {
      this.reloadMonth(4)
    } else {
      this.reloadMonth(idMonth -= 1)
    }
  }


  monthRight(idMonth: number) {
    if (idMonth == 4) {
      this.reloadMonth(1)
    } else {
      this.reloadMonth(idMonth += 1)
    }
  }

  get daysArray() {
    return Array.from({length: this.currentMonth.countDays}, (_, i) => i + 1)
  }


  activeDay1: number | null = null;
  activeDay2: number | null = null;

  //делает активным дату
  toggleActive(day: number): void {
    if (!this.activeDay1 && !this.activeDay2 ||
      (this.activeDay1 && this.activeDay2 && this.activeDay1 > day) ||
      (!this.activeDay1 && this.activeDay2 && this.activeDay2 !== day)) {
      this.activeDay1 = day;
      if (this.activeDay2) {
        this.switchActiveDays(this.activeDay1, this.activeDay2);
      }
    } else if (this.activeDay1 && this.activeDay1 !== day &&
      this.activeDay2 !== day) {
      this.activeDay2 = day;
      this.switchActiveDays(this.activeDay1, this.activeDay2);
    } else if (this.activeDay1 === day) {
      if (this.activeDay2) {
        this.switchActiveDays(this.activeDay1, this.activeDay2);
      }
      this.activeDay1 = null;
    } else if (this.activeDay2 === day) {
      if (this.activeDay1) {
        this.switchActiveDays(this.activeDay1, this.activeDay2);
      }
      this.activeDay2 = null;
    }
  }

  //менять большее с меньшим
  switchActiveDays(day1: number, day2: number) {
    if (day2 < day1) {
      this.activeDay1 = day2;
      this.activeDay2 = day1;
    }
  }

  //для подсвечивания области, которая входит в промежуток
  isArea(day: number): boolean {
    if (this.activeDay1 && !this.activeDay2) {
      return this.activeDay1 === day;
    } else if (this.activeDay2 && !this.activeDay1) {
      return this.activeDay2 === day;
    } else if (this.activeDay1 && this.activeDay2) {
      const start = Math.min(this.activeDay1, this.activeDay2);
      const end = Math.max(this.activeDay1, this.activeDay2);
      return day >= start && day <= end;
    }
    return false;
  }

  //фильтрация для вывода
  get filteredDaysArray(): number[] {
    return this.daysArray.filter(day => this.isArea(day))
  }

  hoveredDay: number | null = null;
  highlightsDay: number[] = [];

  //функция при наведении мышкой
  onMouseEnter(day: number) {
    this.hoveredDay = day;
    this.updateHighlightsDays(day)
  }

  //функция для отвода мышкой
  onMouseLeave() {
    this.hoveredDay = null;
    this.highlightsDay = [];
  }

  //подсвечивание потенциальный области
  updateHighlightsDays(day: number) {
    if (this.activeDay1 && this.hoveredDay) {
      this.highlightsDay = this.daysArray.filter(day =>
          this.hoveredDay && (
            (this.activeDay1 &&
              ((this.hoveredDay < day && day < this.activeDay1)
                || (this.hoveredDay > day && day > this.activeDay1)))
          )
      )
    } else if (this.activeDay2 && this.hoveredDay) {
      this.highlightsDay = this.daysArray.filter(day =>
          this.hoveredDay && (
            (this.activeDay2 &&
              ((this.hoveredDay < day && day < this.activeDay2)
                || (this.hoveredDay > day && day > this.activeDay2)))

          )
      )
    }
    return false;
  }






  constructor() {
    this.startClock();
  }
  private timer: any;
  currentTime={
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
  getTime(){
    return {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds()
    };
  }
  startClock(){
    this.timer = setInterval(() => {
      this.currentTime = this.getTime();
    })
  }
  ngOnDestroy(){
    if(this.timer){
      clearInterval(this.timer);
    }
  }
}


