var Penalty=function(){return function(e,n,l,o,a,t,s,i,r,f){void 0===o&&(o=[19]),void 0===a&&(a=['loose','run','change']),void 0===t&&(t=5),void 0===s&&(s=['previous']),void 0===i&&(i=!1),void 0===r&&(r=!1),void 0===f&&(f=!1),this.name=e,this.types=n,this.who=l,this.signals=o,this.playTypes=a,this.distance=t,this.enforcementSpots=s,this.isLossOfDown=i,this.isAutomaticFirst=r,this.isDisqualification=f}}(),quarters=['1st Quarter','2nd Quarter','3rd Quarter','4th Quarter','Overtime'],downs=['1st Down','2nd Down','3rd Down','4th Down','PAT'],pats=['1 PT','2 PTS','3 PTS'],playTypes=['Loose Ball','Running Play','After Change of Team Possession'],looseResults=['Completed Pass (1st Down)','Completed Pass (Short)','Incomplete Pass','Touchdown','Interception'],runningResults=['Deflagged (1st Down)','Deflagged (1st Down)','Deflagged (Short)','Deflagged (Short)','Touchdown','Touchdown','Safety'],penalties=[new Penalty('Failure to Wear Required Equipment',['live'],['offense','defense'],[23]),new Penalty('Delay of Game',['dead'],['offense'],[7,21]),new Penalty('Illegally Consuming Time',['live'],['offense'],[19],['run']),new Penalty('Illegal Substitution',['dead','live'],['offense','defense'],[22]),new Penalty('Illegal Procedure',['live'],['offense','kicking']),new Penalty('Encroachment',['dead'],['defense'],[7,18]),new Penalty('False Start',['dead'],['offense']),new Penalty('Illegal Snap',['dead'],['offense']),new Penalty('Disconcerting Act',['dead'],['defense'],[7,23]),new Penalty('Illegal Formation',['live'],['offense'],[19],['loose']),new Penalty('Illegal Motion',['live'],['offense'],[20],['loose']),new Penalty('Illegal Shift',['live'],['offense'],[20],['loose']),new Penalty('Illegal Advancement (Co-Rec)',['live'],['offense'],[19],['run']),new Penalty('Illegal Backward Pass',['live'],['offense'],[35,9],['run','change'],5,['spot'],!0),new Penalty('Illegal Forward Pass',['live'],['offense'],[35,9],['run','change'],5,['spot'],!0),new Penalty('Intentional Grounding',['live'],['offense'],[36,9],['run'],5,['spot'],!0),new Penalty('Illegal Reception (Co-Rec)',['live'],['offense'],[19,9],['run'],5,['previous'],!0),new Penalty('Help the Runner',['live'],['offense'],[44],['run','change'],5,['spot']),new Penalty('Unsportsmanlike Conduct',['live','dead'],['offense','defense'],[27],['run','loose','change'],10,['succeeding']),new Penalty('Illegal Player Equipment',['dead'],['offense','defense'],[27],['run'],10,['succeeding']),new Penalty('Illegal Kick',['live'],['offense'],[31],['run','change'],10),new Penalty('Kick Catching Interference',['live'],['kicking'],[33],['loose'],10,['spot']),new Penalty('Encroachment (2nd)',['dead'],['defense'],[7,18],['loose'],10),new Penalty('Pass Interference',['live'],['offense','defense'],[33],['loose'],10),new Penalty('Personal Foul, Strip or Attempt to Strip Ball',['live'],['defense'],[38],['run','change'],10,['spot']),new Penalty('Personal Foul, Hurdling',['live'],['offense'],[38],['run','change'],10,['spot']),new Penalty('Roughing the Passer',['live'],['defense'],[34,8],['loose'],10,['succeeding'],!1,!0),new Penalty('Personal Foul, Illegal Contact',['live'],['offense','defense'],[38],['run','change'],10,['spot']),new Penalty('Personal Foul, Interlocked Blocking',['live'],['offense'],[38,44],['run','change'],10,['spot']),new Penalty('Illegal Flag Belt Removal',['live'],['offense','defense'],[38],['run','loose','change'],10,['spot']),new Penalty('Flag Guarding',['live'],['offense'],[24],['run','change'],10,['spot']),new Penalty('Holding',['live'],['offense','defense'],[42],['run','loose','change'],10,['spot']),new Penalty('Illegal Batting',['live'],['offense'],[31],['run','loose','change'],10,['spot']),new Penalty('Illegal Kicking',['live'],['offense','defense'],[31],['run','change'],10,['spot']),new Penalty('Illegal Participation',['live'],['offense','defense'],[28],['run','loose','change'],10,['previous']),new Penalty('Personal Foul, Tampering w/ Flag Belt',['dead'],['offense','defense'],[38,47,8,9],['run'],10,['previous','succeeding'],!0,!0,!0),new Penalty('Unsportsmanlike Conduct, Contacting an Official',['dead'],['offense','defense'],[27,47],['run'],10,['succeeding'],!1,!1,!0),new Penalty('Personal Foul, Tackling the Runner',['live'],['defense'],[38,47],['run','change'],10,['spot'],!1,!1,!0),new Penalty('Personal Foul, Fighting an Opponent',['dead'],['offense','defense'],[38,47],['run'],10,['succeeding'],!1,!1,!0)];function getRandom(e){return e[Math.floor(Math.random()*e.length)]}function getPlayType(e){switch(getRandom(e.playTypes)){case'run':return'Running Play';case'loose':return'Loose Ball';case'change':return'After Change of Team Possession';default:return'Unknown'}}function getRandomClockTime(){var e=Math.floor(719*Math.random())+1,n=Math.floor(e/60),l=e%60;return''.concat(n,':').concat(l.toString().padStart(2,'0'))}function isUnderTwoMinutes(e){var n=e.split(':'),l=n[0],o=n[1];return 60*parseInt(l)+parseInt(o)<=120}