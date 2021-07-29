import React, { Component } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
  DemoData,
} from 'react-big-scheduler';
import withDragDropContext from './withDnDContext';
import 'react-big-scheduler/lib/css/style.css';

const moment = extendMoment(Moment);

const views = {
  0: 'days',
  1: 'weeks',
  2: 'months',
};

const getDates = (startDate, endDate, events) => {
  const range = moment().range(startDate, endDate);
  return events.filter(
    (event) =>
      range.contains(moment(event['Start Date'])) ||
      range.contains(moment(event['End Date'])),
  );
};
class Basic extends Component {
  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData(
      moment().format('YYYY-MM-DD'),
      ViewTypes.Week,
      false,
      false,
    );
    schedulerData.setResources(props.resources);
    schedulerData.setEvents(props.events);
    this.state = {
      viewModel: schedulerData,
    };
  }

  render() {
    const { viewModel } = this.state;
    return (
      <div>
        <div>
          <Scheduler
            schedulerData={viewModel}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            eventItemClick={this.eventClicked}
            viewEventClick={this.ops1}
            viewEventText="Ops 1"
            viewEvent2Text="Ops 2"
            viewEvent2Click={this.ops2}
            updateEventStart={this.updateEventStart}
            updateEventEnd={this.updateEventEnd}
            moveEvent={this.moveEvent}
            newEvent={this.newEvent}
          />
        </div>
      </div>
    );
  }

  prevClick = (schedulerData) => {
    const { startDate, endDate, viewType } = schedulerData;

    const prevStartDate = moment(startDate)
      .subtract(1, views[viewType])
      .format();
    const prevEndDate = moment(endDate).subtract(1, views[viewType]).format();

    const events = getDates(prevStartDate, prevEndDate, this.props.events);
    schedulerData.prev();
    schedulerData.setEvents(events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  nextClick = (schedulerData) => {
    const { startDate, endDate, viewType } = schedulerData;

    const nextStartDate = moment(startDate).add(1, views[viewType]).format();
    const nextEndDate = moment(endDate).add(1, views[viewType]).format();

    const events = getDates(nextStartDate, nextEndDate, this.props.events);
    schedulerData.next();
    schedulerData.setEvents(events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onViewChange = (
    schedulerData,
    { viewType, showAgenda, isEventPerspective },
  ) => {
    const { startDate, endDate } = schedulerData;

    const viewStartDate = moment(startDate).startOf(views[viewType]).format();
    const viewEndDate = moment(endDate).endOf(views[viewType]).format();

    const events = getDates(viewStartDate, viewEndDate, this.props.events);
    schedulerData.setViewType(viewType, showAgenda, isEventPerspective);
    schedulerData.setEvents(events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onSelectDate = (schedulerData, date) => {
    const { viewType } = schedulerData;

    const startDate = date.startOf(views[viewType]).format();
    const endDate = date.endOf(views[viewType]).format();

    const events = getDates(startDate, endDate, this.props.events);
    schedulerData.setDate(date);
    schedulerData.setEvents(events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`,
    );
  };

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`,
    );
  };

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`,
    );
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    let newFreshId = 0;
    schedulerData.events.forEach((item) => {
      if (item.id >= newFreshId) newFreshId = item.id + 1;
    });

    let newEvent = {
      id: newFreshId,
      title: 'New event you just created',
      start: start,
      end: end,
      resourceId: slotId,
      bgColor: 'purple',
    };
    schedulerData.addEvent(newEvent);
    this.setState({
      viewModel: schedulerData,
    });
  };

  updateEventStart = (schedulerData, event, newStart) => {
    schedulerData.updateEventStart(event, newStart);
    this.setState({
      viewModel: schedulerData,
    });
  };

  updateEventEnd = (schedulerData, event, newEnd) => {
    schedulerData.updateEventEnd(event, newEnd);
    this.setState({
      viewModel: schedulerData,
    });
  };

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    schedulerData.moveEvent(event, slotId, slotName, start, end);
    this.setState({
      viewModel: schedulerData,
    });
  };
}

export default withDragDropContext(Basic);
