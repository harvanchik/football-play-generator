// define penalty object
class Penalty {
  name: string;
  types: string[];
  who: string[];
  signals: number[];
  playTypes: string[];
  distance: number;
  enforcementSpots: string[];
  isLossOfDown: boolean;
  isAutomaticFirst: boolean;
  isDisqualification: boolean;

  constructor(
    name: string,
    types: string[],
    who: string[],
    signals: number[] = [19],
    playTypes: string[] = ['loose', 'run', 'change'],
    distance: number = 5,
    enforcementSpots: string[] = ['previous'],
    isLossOfDown: boolean = false,
    isAutomaticFirst: boolean = false,
    isDisqualification: boolean = false
  ) {
    this.name = name;
    this.types = types;
    this.who = who;
    this.signals = signals;
    this.playTypes = playTypes;
    this.distance = distance;
    this.enforcementSpots = enforcementSpots;
    this.isLossOfDown = isLossOfDown;
    this.isAutomaticFirst = isAutomaticFirst;
    this.isDisqualification = isDisqualification;
  }
}

// note: any play that is not dead ball can be running or loose or after team change of possession

// list of quarters
const quarters = ['1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter', 'Overtime'];
// list of downs
const downs = ['1st Down', '2nd Down', '3rd Down', '4th Down', 'PAT'];
// list of PAT points
const pats = ['1 PT', '2 PTS', '3 PTS'];
// list results
const looseResults = ['Completed Pass (1st Down)', 'Completed Pass (Short)', 'Incomplete Pass', 'Touchdown', 'Interception'];
const runningResults = ['Deflagged (1st Down)', 'Deflagged (1st Down)', 'Deflagged (Short)', 'Deflagged (Short)', 'Touchdown', 'Touchdown', 'Safety'];
// list of penalties
const penalties = [
  new Penalty('Failure to Wear Required Equipment', ['live'], ['offense', 'defense'], [23]),
  new Penalty('Delay of Game', ['dead'], ['offense'], [7, 21]),
  new Penalty('Illegally Consuming Time', ['live'], ['offense'], [19], ['run']),
  new Penalty('Illegal Substitution', ['dead', 'live'], ['offense', 'defense'], [22]),
  new Penalty('Illegal Procedure', ['live'], ['offense', 'kicking']),
  new Penalty('Encroachment', ['dead'], ['defense'], [7, 18]),
  new Penalty('False Start', ['dead'], ['offense']),
  new Penalty('Illegal Snap', ['dead'], ['offense']),
  new Penalty('Disconcerting Act', ['dead'], ['defense'], [7, 23]),
  new Penalty('Illegal Formation', ['live'], ['offense'], [19], ['loose']),
  new Penalty('Illegal Motion', ['live'], ['offense'], [20], ['loose']),
  new Penalty('Illegal Shift', ['live'], ['offense'], [20], ['loose']),
  new Penalty('Illegal Advancement (Co-Rec)', ['live'], ['offense'], [19], ['run']),
  new Penalty('Illegal Backward Pass', ['live'], ['offense'], [35, 9], ['run', 'change'], 5, ['spot'], true),
  new Penalty('Illegal Forward Pass', ['live'], ['offense'], [35, 9], ['run', 'change'], 5, ['spot'], true),
  new Penalty('Intentional Grounding', ['live'], ['offense'], [36, 9], ['run'], 5, ['spot'], true),
  new Penalty('Illegal Reception (Co-Rec)', ['live'], ['offense'], [19, 9], ['run'], 5, ['previous'], true),
  new Penalty('Help the Runner', ['live'], ['offense'], [44], ['run', 'change'], 5, ['spot']),
  new Penalty('Unsportsmanlike Conduct', ['live', 'dead'], ['offense', 'defense'], [27], ['run', 'loose', 'change'], 10, ['succeeding']),
  new Penalty('Illegal Player Equipment', ['dead'], ['offense', 'defense'], [27], ['run'], 10, ['succeeding']),
  new Penalty('Illegal Kick', ['live'], ['offense'], [31], ['run', 'change'], 10),
  new Penalty('Kick Catching Interference', ['live'], ['kicking'], [33], ['loose'], 10, ['spot']),
  new Penalty('Encroachment (2nd)', ['dead'], ['defense'], [7, 18], ['loose'], 10),
  new Penalty('Pass Interference', ['live'], ['offense', 'defense'], [33], ['loose'], 10),
  new Penalty('Personal Foul, Strip or Attempt to Strip Ball', ['live'], ['defense'], [38], ['run', 'change'], 10, ['spot']),
  new Penalty('Personal Foul, Hurdling', ['live'], ['offense'], [38], ['run', 'change'], 10, ['spot']),
  new Penalty('Roughing the Passer', ['live'], ['defense'], [34, 8], ['loose'], 10, ['succeeding'], false, true),
  new Penalty('Personal Foul, Illegal Contact', ['live'], ['offense', 'defense'], [38], ['run', 'change'], 10, ['spot']),
  new Penalty('Personal Foul, Interlocked Blocking', ['live'], ['offense'], [38, 44], ['run', 'change'], 10, ['spot']),
  new Penalty('Illegal Flag Belt Removal', ['live'], ['offense', 'defense'], [38], ['run', 'loose', 'change'], 10, ['spot']),
  new Penalty('Flag Guarding', ['live'], ['offense'], [24], ['run', 'change'], 10, ['spot']),
  new Penalty('Holding', ['live'], ['offense', 'defense'], [42], ['run', 'loose', 'change'], 10, ['spot']),
  new Penalty('Illegal Batting', ['live'], ['offense'], [31], ['run', 'loose', 'change'], 10, ['spot']),
  new Penalty('Illegal Kicking', ['live'], ['offense', 'defense'], [31], ['run', 'change'], 10, ['spot']),
  new Penalty('Illegal Participation', ['live'], ['offense', 'defense'], [28], ['run', 'loose', 'change'], 10, ['previous']),
  new Penalty('Personal Foul, Tampering w/ Flag Belt', ['dead'], ['offense', 'defense'], [38, 47, 8, 9], ['run'], 10, ['previous', 'succeeding'], true, true, true),
  new Penalty('Unsportsmanlike Conduct, Contacting an Official', ['dead'], ['offense', 'defense'], [27, 47], ['run'], 10, ['succeeding'], false, false, true),
  new Penalty('Personal Foul, Tackling the Runner', ['live'], ['defense'], [38, 47], ['run', 'change'], 10, ['spot'], false, false, true),
  new Penalty('Personal Foul, Fighting an Opponent', ['dead'], ['offense', 'defense'], [38, 47], ['run'], 10, ['succeeding'], false, false, true),
];

function getRandom(list: any[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function getPlayType(penalty: Penalty): string {
  switch (getRandom(penalty.playTypes)) {
    case 'run':
      return 'Running Play';
    case 'loose':
      return 'Loose Ball';
    case 'change':
      return 'After Change of Team Possession';
    default:
      return 'Unknown';
  }
}

function getRandomClockTime(): string {
  // generate a random number between 1 and 719 (12 minutes * 60 seconds - 1 second)
  const seconds = Math.floor(Math.random() * 719) + 1;

  // convert the number of seconds into minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = seconds % 60;

  // return the clock time as a string in the format M:SS
  return `${minutes}:${secondsRemainder.toString().padStart(2, '0')}`;
}

function isUnderTwoMinutes(clockTime: string): boolean {
  // split the clock time into minutes and seconds
  const [mins, secs] = clockTime.split(':');

  // convert the minutes and seconds into numbers
  const minutesInSeconds: number = parseInt(mins) * 60;
  const seconds: number = parseInt(secs);

  // return true if the time is at 2 minutes or below, false otherwise
  return minutesInSeconds + seconds <= 120;
}

// run this in console to compile to javascript: tsc ./assets/js/football.ts
