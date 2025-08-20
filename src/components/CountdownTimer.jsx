import React, { useEffect, useState } from "react";
import "./CountdownTimer.css";

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-09-13T00:00:00");
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { expired: true };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Google Calendar Link Generator
  const getGoogleCalendarLink = () => {
    const event = {
      title: "Franmax Event 2025",
      startDate: "20250914T000000Z",
      endDate: "20250914T235900Z",
      details: "Join us for the exciting Franmax Event 2025!",
      location: "Taj Skyline, Ahmedabad, Taj Skyline Ahmedabad, Sankalp Square III, Opp. Saket 3, Sindhubhavan Road, nr. Neelkanth Green, Shilaj, Gujarat 380059",
    };

    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const url = `${baseUrl}&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
    return url;
  };

  if (timeLeft.expired) {
    return (
      <div className="countdown-box">
        <h3>Event Started!</h3>
        <a
          href={getGoogleCalendarLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="add-calendar-button"
        >
          Add to Google Calendar
        </a>
      </div>
    );
  }

  return (
    <div className="countdown-box">
      <h3>Countdown to Event</h3>
      <div className="countdown-timer">
        <div className="time-segment">
          <span>{timeLeft.days}</span>
          <small>Days</small>
        </div>
        <div className="time-segment">
          <span>{timeLeft.hours}</span>
          <small>Hours</small>
        </div>
        <div className="time-segment">
          <span>{timeLeft.minutes}</span>
          <small>Minutes</small>
        </div>
        <div className="time-segment">
          <span>{timeLeft.seconds}</span>
          <small>Seconds</small>
        </div>
      </div>
      <a
        href={getGoogleCalendarLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="add-calendar-button"
      >
        Add to Google Calendar
      </a>
    </div>
  );
};

export default CountdownTimer;
