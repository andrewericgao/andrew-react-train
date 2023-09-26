export const interpretMeetingSchedule = (meetingStr) => {
    if (meetingStr === "") return { weekDays: "", begin: 0, finish: 0 };
  
    const [weekDays, duration] = meetingStr.split(" ");
    const [startHour, endHour] = duration.split("-").map(t => {
      const [hr, min] = t.split(":").map(Number);
      return hr * 60 + min;
    });
  
    return { weekDays, begin: startHour, finish: endHour };
  };
  
  export const doDaysIntersect = (daysA, daysB) => {
    for (const day of daysA) {
      if (daysB.includes(day)) return true;
    }
    return false;
  };
  
  export const isTimeIntersecting = (startA, endA, startB, endB) => {
    return startA < endB && startB < endA;
  };
  
  export const isCourseConflict = (subject1, subject2) => {
    if (subject1.term !== subject2.term) return false;
  
    const schedule1 = interpretMeetingSchedule(subject1.meets);
    const schedule2 = interpretMeetingSchedule(subject2.meets);
  
    return (
      doDaysIntersect(schedule1.weekDays, schedule2.weekDays) &&
      isTimeIntersecting(schedule1.begin, schedule1.finish, schedule2.begin, schedule2.finish)
    );
  };
  