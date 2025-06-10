type DatePickerOptions = {
  onSelect?: (date: Date) => void;
  trigger?: HTMLElement;
};

export default class DatePicker {
  private container: HTMLElement;
  private currentDate: Date; // 현재 날짜
  private today: Date; // 오늘 날짜
  private selectedDate: Date | null = null; // 선택된 날짜
  private options: DatePickerOptions;

  /* 생성자 함수 */
  constructor(container: HTMLElement, options: DatePickerOptions = {}) {
    this.container = container;
    this.options = options;
    this.today = this.stripTime(new Date());
    this.currentDate = new Date(this.today);

    this.init();
  }

  private init() {
    this.render(); // 캘린더 그리기
    this.hide(); // 트리거 전에는 숨기기

    this.attachOutsideClickHandler(); // 외부 클릭 이벤트 핸들러 등록
    // 트리거 이벤트 핸들러 등록
    if (this.options.trigger) {
      this.options.trigger.addEventListener('click', e => {
        e.stopPropagation();

        this.container.style.display === 'block' ? this.hide() : this.show();
      });
    }
  }

  /* 캘린더 그리기 함수*/
  private render() {
    this.container.innerHTML = '';
    const calendar = this.createCalendar();
    this.container.appendChild(calendar);
  }

  /* 캘린더 생성 함수 */
  private createCalendar(): HTMLElement {
    const calendar = document.createElement('div');
    calendar.className = 'datepicker-calendar';

    calendar.appendChild(this.createHeader());
    calendar.appendChild(this.createDaysOfWeek());
    calendar.appendChild(this.createDays());

    return calendar;
  }

  /* 헤더 생성 함수 */
  private createHeader(): HTMLElement {
    const header = document.createElement('div');
    header.className = 'datepicker-header';

    // 이전, 다음 버튼 생성
    const prev = document.createElement('button');
    prev.classList.add('datepicker-header-prev-button');
    prev.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.render();
    });

    const next = document.createElement('button');
    next.classList.add('datepicker-header-next-button');
    next.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.render();
    });

    const title = document.createElement('span');
    title.textContent = `${this.currentDate.getFullYear()}년 ${this.currentDate.getMonth() + 1}월`;

    header.append(prev, title, next);

    return header;
  }

  /* 요일 생성 함수 */
  private createDaysOfWeek(): HTMLElement {
    const dayRow = document.createElement('div');
    dayRow.className = 'datepicker-weekdays';

    const days = ['일', '월', '화', '수', '목', '금', '토'];

    days.forEach(day => {
      const cell = document.createElement('div');
      cell.className = 'datepicker-weekday';
      cell.textContent = day;
      dayRow.appendChild(cell);
    });

    return dayRow;
  }

  /* 날짜 생성 함수 */
  private createDays(): HTMLElement {
    const dayGrid = document.createElement('div');
    dayGrid.className = 'datepicker-days';

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay(); // 현재 달의 첫번째 날짜의 요일
    const lastDate = new Date(year, month + 1, 0).getDate(); // 현재 달의 마지막 날짜
    const prevMonthLastDate = new Date(year, month, 0).getDate(); // 지난 달의 마지막 날짜

    const totalDays = firstDay + lastDate; // 현재 달이 며칠인지
    const totalRows = Math.ceil(totalDays / 7); // 필요한 열의 수

    for (let i = 0; i < totalRows * 7; i++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'datepicker-day';

      const dateOffset = i - firstDay;

      if (dateOffset < 0) {
        // 이전 달 날짜
        const day = prevMonthLastDate + dateOffset + 1;
        dayCell.textContent = String(day);
        dayCell.classList.add('disabled');
      } else if (dateOffset >= lastDate) {
        // 다음 달 날짜
        dayCell.textContent = String(dateOffset - lastDate + 1);
        dayCell.classList.add('disabled');
      } else {
        // 현재 달 날짜
        const day = dateOffset + 1;
        const thisDate = new Date(year, month, day);
        dayCell.textContent = String(day);

        // 오늘 날짜
        if (this.isSameDate(thisDate, this.today)) {
          dayCell.classList.add('today');
        }

        // 일요일
        if (new Date(year, month, day).getDay() === 0)
          dayCell.classList.add('sunday');

        if (thisDate < this.today) {
          // 오늘보다 이전인 날짜는 disabled
          dayCell.classList.add('disabled');
        } else {
          dayCell.addEventListener('click', () => {
            this.selectDate(thisDate);
          });
        }

        if (this.selectedDate && this.isSameDate(thisDate, this.selectedDate)) {
          dayCell.classList.add('selected');
        }
      }

      dayGrid.appendChild(dayCell);
    }

    return dayGrid;
  }

  private selectDate(date: Date) {
    if (date < this.today) return;

    this.selectedDate = date;
    this.options.onSelect?.(date);
    this.render();
    this.hide();
  }

  /* 달력 보이기 */
  public show() {
    this.container.style.display = 'block';
  }

  /* 달력 숨기기 */
  public hide() {
    this.container.style.display = 'none';
  }

  /* 시간 제거 순수 날짜(년, 월, 일)만 추출 */
  private stripTime(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  /* 날짜 비교 */
  private isSameDate(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  /* 외부 클릭 함수 */
  private attachOutsideClickHandler() {
    document.addEventListener('click', e => {
      if (!this.container.contains(e.target as Node)) {
        this.hide();
      }
    });
  }
}
