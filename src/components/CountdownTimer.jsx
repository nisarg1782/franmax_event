// import React, { useEffect, useState, useRef } from "react";
// import "./CountdownTimer.css";

// const CountdownTimer = () => {
//     // State for the countdown timer
//     const calculateTimeLeft = () => {
//         const targetDate = new Date("2025-09-13T00:00:00");
//         const now = new Date();
//         const difference = targetDate - now;

//         let timeLeft = {};
//         if (difference > 0) {
//             timeLeft = {
//                 days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//                 hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//                 minutes: Math.floor((difference / 1000 / 60) % 60),
//                 seconds: Math.floor((difference / 1000) % 60),
//             };
//         } else {
//             timeLeft = { expired: true };
//         }
//         return timeLeft;
//     };

//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//     // State and Refs for drag functionality
//     const [isDragging, setIsDragging] = useState(false);
//     const [position, setPosition] = useState({ x: 20, y: 20 });
//     const dragStart = useRef({ x: 0, y: 0 });
//     const boxRef = useRef(null);

//     // Effect for the countdown timer
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTimeLeft(calculateTimeLeft());
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);

//     // Effect for handling drag-and-drop
//     useEffect(() => {
//         const handleMouseMove = (e) => {
//             if (!isDragging) return;

//             const newX = e.clientX - dragStart.current.x;
//             const newY = e.clientY - dragStart.current.y;

//             const boxWidth = boxRef.current.offsetWidth;
//             const boxHeight = boxRef.current.offsetHeight;
//             const viewportWidth = window.innerWidth;
//             const viewportHeight = window.innerHeight;

//             // Clamp the position to stay within the viewport
//             const clampedX = Math.max(0, Math.min(newX, viewportWidth - boxWidth));
//             const clampedY = Math.max(0, Math.min(newY, viewportHeight - boxHeight));

//             setPosition({ x: clampedX, y: clampedY });
//         };

//         const handleMouseUp = () => {
//             if (isDragging) {
//                 setIsDragging(false);
//             }
//         };

//         if (isDragging) {
//             window.addEventListener('mousemove', handleMouseMove);
//             window.addEventListener('mouseup', handleMouseUp);
//         }

//         // Cleanup function to remove event listeners
//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove);
//             window.removeEventListener('mouseup', handleMouseUp);
//         };
//     }, [isDragging]);

//     const handleMouseDown = (e) => {
//         setIsDragging(true);
//         const rect = boxRef.current.getBoundingClientRect();
//         dragStart.current = {
//             x: e.clientX - rect.left,
//             y: e.clientY - rect.top,
//         };
//         e.preventDefault(); // Prevent default browser behavior like text selection
//     };

//     // Google Calendar Link Generator
//     const getGoogleCalendarLink = () => {
//         const event = {
//             title: "Franmax Event 2025",
//             startDate: "20250914T000000Z",
//             endDate: "20250914T235900Z",
//             details: "Join us for the exciting Franmax Event 2025!",
//             location: "Taj Skyline, Ahmedabad, Taj Skyline Ahmedabad, Sankalp Square III, Opp. Saket 3, Sindhubhavan Road, nr. Neelkanth Green, Shilaj, Gujarat 380059",
//         };

//         const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
//         const url = `${baseUrl}&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
//         return url;
//     };

//     if (timeLeft.expired) {
//         return (
//             <div
//                 ref={boxRef}
//                 className={`countdown-box ${isDragging ? 'dragging' : ''}`}
//                 style={{
//                     left: `${position.x}px`,
//                     top: `${position.y}px`,
//                 }}
//                 onMouseDown={handleMouseDown}
//             >
//                 <h3>Event Started!</h3>
//                 <a
//                     href={getGoogleCalendarLink()}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="add-calendar-button"
//                 >
//                     Add to Google Calendar
//                 </a>
//             </div>
//         );
//     }

//     return (
//         <div
//             ref={boxRef}
//             className={`countdown-box ${isDragging ? 'dragging' : ''}`}
//             style={{
//                 left: `${position.x}px`,
//                 top: `${position.y}px`,
//             }}
//             onMouseDown={handleMouseDown}
//         >
//             <h3>Countdown to Event</h3>
//             <div className="countdown-timer">
//                 <div className="time-segment">
//                     <span>{String(timeLeft.days).padStart(2, '0')}</span>
//                     <small>Days</small>
//                 </div>
//                 <div className="time-segment">
//                     <span>{String(timeLeft.hours).padStart(2, '0')}</span>
//                     <small>Hours</small>
//                 </div>
//                 <div className="time-segment">
//                     <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
//                     <small>Minutes</small>
//                 </div>
//                 <div className="time-segment">
//                     <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
//                     <small>Seconds</small>
//                 </div>
//             </div>
//             <a
//                 href={getGoogleCalendarLink()}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="add-calendar-button"
//             >
//                 Add to Google Calendar
//             </a>
//         </div>
//     );
// };

// export default CountdownTimer;

import React, { useEffect, useState, useRef } from "react";
import "./CountdownTimer.css";

const CountdownTimer = () => {
  // Countdown calculation
  const calculateTimeLeft = () => {
  const targetDate = new Date("2025-09-14T10:00:00");
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) return { expired: true };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Draggable state
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    x: 20,
    y: window.innerHeight - 160,
  });
  const dragOffset = useRef({ x: 0, y: 0 });
  const boxRef = useRef(null);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Drag functions
  const startDrag = (clientX, clientY) => {
    setIsDragging(true);
    const rect = boxRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const doDrag = (clientX, clientY) => {
    if (!isDragging) return;
    const boxWidth = boxRef.current.offsetWidth;
    const boxHeight = boxRef.current.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const newX = clientX - dragOffset.current.x;
    const newY = clientY - dragOffset.current.y;

    setPosition({
      x: Math.max(0, Math.min(newX, viewportWidth - boxWidth)),
      y: Math.max(0, Math.min(newY, viewportHeight - boxHeight)),
    });
  };

  const stopDrag = () => setIsDragging(false);

  // Mouse & touch events
  useEffect(() => {
    const handleMouseMove = (e) => doDrag(e.clientX, e.clientY);
    const handleMouseUp = stopDrag;
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      doDrag(touch.clientX, touch.clientY);
    };
    const handleTouchEnd = stopDrag;

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  // Google Calendar Link
  const getGoogleCalendarLink = () => {
    const event = {
      title: "Franmax Event 2025",
      startDate: "20250914T000000Z",
      endDate: "20250914T235900Z",
      details: "Join us for the exciting Franmax Event 2025!",
      location:
        "Taj Skyline Ahmedabad, Sankalp Square III, Opp. Saket 3, Sindhubhavan Road, Shilaj, Gujarat 380059",
    };
    const baseUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE";
    return `${baseUrl}&text=${encodeURIComponent(event.title)}&dates=${
      event.startDate
    }/${event.endDate}&details=${encodeURIComponent(
      event.details
    )}&location=${encodeURIComponent(event.location)}`;
  };

  return (
    <div
      ref={boxRef}
      className={`countdown-wrapper ${isDragging ? "dragging" : ""}`}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        e.preventDefault(); // Prevent page scroll
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
      }}
      onTouchMove={(e) => {
        e.preventDefault(); // Prevent page scroll
        const touch = e.touches[0];
        doDrag(touch.clientX, touch.clientY);
      }}
    >
      <div className="countdown-box">
        {timeLeft.expired ? (
          <>
            <h3>Event Started!</h3>
            <a
              href={getGoogleCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="add-calendar-button"
              onTouchStart={(e) => e.stopPropagation()} // Allow calendar button touch without breaking drag
            >
              Add to Google Calendar
            </a>
          </>
        ) : (
          <>
            <h3>Countdown to Event</h3>
            <div className="countdown-timer">
              {["days", "hours", "minutes", "seconds"].map((unit) => (
                <div key={unit} className="time-segment">
                  <span>{String(timeLeft[unit]).padStart(2, "0")}</span>
                  <small>{unit.charAt(0).toUpperCase() + unit.slice(1)}</small>
                </div>
              ))}
            </div>
            <a
              href={getGoogleCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="add-calendar-button"
              onTouchStart={(e) => e.stopPropagation()} // Allow calendar button touch without breaking drag
            >
              Add to Google Calendar
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
