import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarEvent} from 'calendar-utils';
import {CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Subject} from 'rxjs';
import {addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../shared/service/api.service';
import {LoadCheckin} from '../../../shared/model/load-checkin';
import {NhatCheckinEnti} from '../../../shared/model/nhat-checkin-enti';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-checkin-load',
  templateUrl: './checkin-load.component.html',
  styleUrls: ['./checkin-load.component.css']
})
export class CheckinLoadComponent implements OnInit {
  @ViewChild('clickElem') ele: ElementRef<HTMLElement>;
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  usernameLoad = '';

  maTheLoad = '';

  roleLoad = 0;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  loadCheckIn: LoadCheckin;

  nhatKyEnti: NhatCheckinEnti[];
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  pEvent = {
    start: null,
    title: '',
    color: colors.yellow,
    actions: this.actions,
  };
  eve = [];
  pTime = [];
  timeParse = '';
  pCount = 0;
  ADMIN = 'ADMIN';
  TEACHER = 'GIÁO VIÊN';
  STUDENT = 'HỌC SINH';
  CUSTOMER = 'KHÁCH';
  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(2), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: null,
    //   title: 'Checkin',
    //   color: colors.yellow,
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen = true;

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private api: ApiService
  ) {
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.ele.nativeElement.click();
    }, 200);
    this.eve = [];
    this.events = [];
    this.pTime = [];
    this.route.params.subscribe(params => {
      const idThe = params.id;
      this.api.get('/api/checkin/load-checkin/' + idThe).subscribe(data => {
        this.loadCheckIn = data;
        this.usernameLoad = this.loadCheckIn.userName;
        this.maTheLoad = this.loadCheckIn.maThe;
        this.roleLoad = this.loadCheckIn.idRole;
        this.nhatKyEnti = this.loadCheckIn.nhatcheckins;
        this.pCount = this.nhatKyEnti.length;
        this.nhatKyEnti.forEach((key, nk) => {
          // @ts-ignore
          this.timeParse = key.thoigianvao[0] + '-' + key.thoigianvao[1] + '-' + key.thoigianvao[2];
          this.pTime.push(this.timeParse);
        });
        for (let i = 0; i < this.pTime.length; i++) {
          this.pEvent.start = startOfDay(new Date(this.pTime[i]));
          this.pEvent.title = '';
          this.eve.push(this.pEvent);
          this.pEvent = {
            start: null,
            title: null,
            actions: this.actions,
            color: colors.yellow
          };
        }
        this.events = this.eve;
      });
    });


  }
}
