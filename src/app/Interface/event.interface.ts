interface IEvent {
  generalId: String;
  name: String;
  deadline_time: String;
  average_entry_score: String;
  finished: Boolean;
  data_checked: Boolean;
  highest_scoring_entry: Number;
  deadline_time_epoch: String;
  highest_score: Number;
  is_current: Boolean;
}

interface IEventFunctions {
  getCurrentWeekInfo(): Promise<IEvent>;
}
