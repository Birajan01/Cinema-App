import React, { useState, useEffect, useCallback } from "react";
import { FaChair, FaWheelchair, FaHeart, FaTimes, FaTicketAlt, FaHome, FaCheck, FaEdit, FaBan, FaUsers, FaUserShield, FaFilm, FaRegSadCry, FaInfoCircle, FaSearch, FaStar, FaClock } from "react-icons/fa";
import { MdKingBed, MdEventSeat } from "react-icons/md";


const ROWS = 9;
const COLS = 12;
const SEAT_TYPES = {
  STANDARD: "standard",
  VIP: "vip",
  ACCESSIBLE: "accessible",
  BROKEN: "broken",
  AGE_RESTRICTED: "ageRestricted",
  RESERVED_ADMIN: "reservedAdmin",
};


const THEME = {
  primary: "#800020", 
  secondary: "#5D001E", 
  accent: "#FFD700", 
  background: "#0a0a0a", 
  textLight: "#f5f5f5",
  textDark: "#121212",
  success: "#388E3C",
  error: "#D32F2F",
  admin: "#007bff",
  accessible: "#4CAF50",
  screenGradient: "linear-gradient(to bottom, #2a2a2a, #1a1a1a)",
};


const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg",
    rating: 4.8,
    duration: "2h 46m",
    genre: "Sci-Fi",
    halls: [1, 3],
    showtimes: ["10:00", "14:30", "19:00"]
  },
  {
    id: 2,
    title: "The Batman",
    poster: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
    rating: 4.5,
    duration: "2h 56m",
    genre: "Action",
    halls: [2, 4],
    showtimes: ["11:15", "15:45", "20:30"]
  },
  {
    id: 3,
    title: "No Time To Die",
    poster: "https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg",
    rating: 4.3,
    duration: "2h 43m",
    genre: "Thriller",
    halls: [1, 2, 3],
    showtimes: ["09:30", "13:15", "18:00", "21:45"]
  },
  {
    id: 4,
    title: "Spider-Man: No Way Home",
    poster: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
    rating: 4.7,
    duration: "2h 28m",
    genre: "Adventure",
    halls: [4],
    showtimes: ["10:45", "16:00", "19:30"]
  }
];


const halls = [
  { id: 1, name: "Hall 1 - IMAX", totalSeats: 180, availableSeats: 124 },
  { id: 2, name: "Hall 2 - Dolby Atmos", totalSeats: 150, availableSeats: 87 },
  { id: 3, name: "Hall 3 - Premium", totalSeats: 120, availableSeats: 45 },
  { id: 4, name: "Hall 4 - Standard", totalSeats: 200, availableSeats: 156 }
];


function generateSeatingLayout() {
  const seating = [];
  
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      let type = SEAT_TYPES.STANDARD;
      
      
      if (r >= 3 && r <= 5 && c >= 4 && c <= 7) {
        type = SEAT_TYPES.VIP;
      }
      
      
      if ((r === 0 && (c === 0 || c === COLS - 1)) || 
          (r === Math.floor(ROWS/2) && (c === 0 || c === COLS - 1))) {
        type = SEAT_TYPES.ACCESSIBLE;
      }
      
      
      if (r >= ROWS - 2) {
        type = SEAT_TYPES.AGE_RESTRICTED;
      }
      
      row.push({
        id: `seat-${r}-${c}`,
        booked: false,
        occupantType: null,
        type,
        originalType: type,
      });
    }
    seating.push(row);
  }
  
  
  let brokenCount = 0;
  while (brokenCount < 5) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (seating[r][c].type !== SEAT_TYPES.ACCESSIBLE) {
      seating[r][c].type = SEAT_TYPES.BROKEN;
      brokenCount++;
    }
  }
  
  return seating;
}


const HomeScreen = ({ setCurrentPage }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  useEffect(() => {
    const interval = setInterval(() => {
      halls.forEach(hall => {
        hall.availableSeats = Math.max(0, 
          hall.availableSeats - Math.floor(Math.random() * 3)
        );
      });
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={{ color: "#800020" }}>UWL</span>
          <span style={{ color: "#fff" }}>Cinema</span>
        </div>
        <div style={styles.nav}>
          <button style={styles.navButton}>
            <FaHome /> Home
          </button>
          <button style={styles.navButton}>
            <FaFilm /> Movies
          </button>
          <button 
            style={styles.navButton}
            onClick={() => setCurrentPage("admin")}
          >
            <FaUserShield /> Admin
          </button>
        </div>
      </header>

     
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Experience Movies Like Never Before here in UWL</h1>
          <p style={styles.heroSubtitle}>Premium seating, crystal clear sound, and breathtaking visuals</p>
          
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for movies..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Now Showing Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Now Showing</h2>
        
        <div style={styles.movieGrid}>
          {filteredMovies.map(movie => (
            <div 
              key={movie.id} 
              style={{
                ...styles.movieCard,
                border: selectedMovie?.id === movie.id ? "2px solid #800020" : "2px solid transparent"
              }}
              onClick={() => setSelectedMovie(movie)}
            >
              <img 
                src={movie.poster} 
                alt={movie.title} 
                style={styles.moviePoster}
              />
              <div style={styles.movieInfo}>
                <h3 style={styles.movieTitle}>{movie.title}</h3>
                <div style={styles.movieMeta}>
                  <span style={styles.movieRating}>
                    <FaStar style={{ color: "#FFD700" }} /> {movie.rating}
                  </span>
                  <span style={styles.movieDuration}>
                    <FaClock /> {movie.duration}
                  </span>
                </div>
                <div style={styles.movieGenre}>{movie.genre}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hall Selection */}
      {selectedMovie && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Select Hall</h2>
          
          <div style={styles.hallContainer}>
            {halls.filter(hall => selectedMovie.halls.includes(hall.id)).map(hall => (
              <div 
                key={hall.id}
                style={{
                  ...styles.hallCard,
                  border: selectedHall?.id === hall.id ? "2px solid #800020" : "2px solid #333"
                }}
                onClick={() => setSelectedHall(hall)}
              >
                <h3 style={styles.hallName}>{hall.name}</h3>
                <div style={styles.seatAvailability}>
                  <div style={styles.seatProgressContainer}>
                    <div 
                      style={{
                        ...styles.seatProgress,
                        width: `${(hall.availableSeats / hall.totalSeats) * 100}%`,
                        backgroundColor: hall.availableSeats < 20 ? "#D32F2F" : "#4CAF50"
                      }}
                    />
                  </div>
                  <span style={styles.seatCount}>
                    {hall.availableSeats}/{hall.totalSeats} seats available
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Showtime Selection */}
      {selectedMovie && selectedHall && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Select Showtime</h2>
          
          <div style={styles.showtimeContainer}>
            {selectedMovie.showtimes.map(time => (
              <button
                key={time}
                style={{
                  ...styles.showtimeButton,
                  backgroundColor: selectedShowtime === time ? "#800020" : "#333"
                }}
                onClick={() => setSelectedShowtime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Book Now Button */}
      {selectedMovie && selectedHall && selectedShowtime && (
        <div style={styles.bookNowContainer}>
          <button 
            style={styles.bookNowButton}
            onClick={() => setCurrentPage("booking")}
          >
            <FaTicketAlt /> Book Now for {selectedMovie.title} at {selectedShowtime}
          </button>
        </div>
      )}

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>UWL Cinema</h3>
            <p>Premium movie experience since 2025</p>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Contact</h3>
            <p>info@UWLcinema.com</p>
            <p>+44 7857189971</p>
          </div>
        </div>
        <div style={styles.copyright}>
          © 2025 UWL Cinema. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

// Main component
export default function TheaterBooking() {
  const [seating, setSeating] = useState(generateSeatingLayout());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [adminMode, setAdminMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [occupantType, setOccupantType] = useState("adult");
  const [groupSize, setGroupSize] = useState(1);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [editingSeat, setEditingSeat] = useState(null);

  // Notification helper
  const showNotification = useCallback((message, type = "info", duration = 3000) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), duration);
  }, []);

  // Seat selection handler
  const handleSeatClick = (row, col) => {
    const seat = seating[row][col];
    
    if (adminMode) {
      setEditingSeat({ row, col, currentType: seat.type });
      return;
    }
    
    if (seat.type === SEAT_TYPES.BROKEN) {
      showNotification("This seat is unavailable", "error");
      return;
    }
    
    if (seat.booked) {
      const isSelected = selectedSeats.some(s => s.row === row && s.col === col);
      setSelectedSeats(prev => 
        isSelected 
          ? prev.filter(s => !(s.row === row && s.col === col))
          : [...prev, { row, col, id: seat.id }]
      );
    } else {
      showNotification("Please use 'Book Group' to reserve seats", "info");
    }
  };

  // Enhanced booking algorithm that prevents seat scattering
  const bookGroup = () => {
    if (groupSize < 1 || groupSize > 8) {
      showNotification("Group size must be between 1 and 8", "error");
      return;
    }
    
    // Special handling for seniors - they can sit anywhere they want
    if (occupantType === "senior") {
      const availableSeats = [];
      for (let r = 0; r < ROWS && availableSeats.length < groupSize; r++) {
        for (let c = 0; c < COLS && availableSeats.length < groupSize; c++) {
          const seat = seating[r][c];
          if (!seat.booked && seat.type !== SEAT_TYPES.BROKEN) {
            availableSeats.push({ row: r, col: c });
          }
        }
      }
      
      if (availableSeats.length < groupSize) {
        showNotification(`Not enough available seats for ${groupSize} people`, "error");
        return;
      }
      
      const newSeating = seating.map(row => [...row]);
      availableSeats.slice(0, groupSize).forEach(({ row, col }) => {
        newSeating[row][col].booked = true;
        newSeating[row][col].occupantType = occupantType;
      });
      
      setSeating(newSeating);
      showNotification(`Successfully booked ${groupSize} seats for seniors`, "success");
      return;
    }
    
    // Find contiguous blocks of seats first
    let bestBlock = null;
    let bestBlockSize = 0;
    
    // Check for available contiguous blocks
    for (let r = 0; r < ROWS; r++) {
      let currentBlockStart = -1;
      let currentBlockSize = 0;
      
      for (let c = 0; c < COLS; c++) {
        const seat = seating[r][c];
        const isAvailable = !seat.booked && seat.type !== SEAT_TYPES.BROKEN;
        const isAgeAppropriate = occupantType !== "child" || seat.type !== SEAT_TYPES.AGE_RESTRICTED;
        
        if (isAvailable && isAgeAppropriate) {
          if (currentBlockStart === -1) currentBlockStart = c;
          currentBlockSize++;
          
          // Check if we found a perfect match
          if (currentBlockSize === groupSize) {
            bestBlock = { row: r, start: currentBlockStart, end: c };
            break;
          }
        } else {
          // Track the largest block found so far
          if (currentBlockSize > bestBlockSize) {
            bestBlockSize = currentBlockSize;
            bestBlock = { row: r, start: currentBlockStart, end: c - 1 };
          }
          currentBlockStart = -1;
          currentBlockSize = 0;
        }
      }
      
      // Check at end of row
      if (currentBlockSize > bestBlockSize) {
        bestBlockSize = currentBlockSize;
        bestBlock = { row: r, start: currentBlockStart, end: COLS - 1 };
      }
      
      if (bestBlock && bestBlockSize >= groupSize) break;
    }
    
    // If we found a suitable block, use it
    if (bestBlock && (bestBlock.end - bestBlock.start + 1) >= groupSize) {
      const seatsToBook = Math.min(groupSize, bestBlock.end - bestBlock.start + 1);
      const newSeating = seating.map(row => [...row]);
      
      for (let c = bestBlock.start; c < bestBlock.start + seatsToBook; c++) {
        newSeating[bestBlock.row][c].booked = true;
        newSeating[bestBlock.row][c].occupantType = occupantType;
      }
      
      setSeating(newSeating);
      showNotification(`Successfully booked ${seatsToBook} seats together in row ${String.fromCharCode(65 + bestBlock.row)}`, "success");
      return;
    }
    
    // If no suitable block found, find the best available seats
    const availableSeats = [];
    for (let r = 0; r < ROWS && availableSeats.length < groupSize; r++) {
      for (let c = 0; c < COLS && availableSeats.length < groupSize; c++) {
        const seat = seating[r][c];
        const isAgeAppropriate = occupantType !== "child" || seat.type !== SEAT_TYPES.AGE_RESTRICTED;
        if (!seat.booked && seat.type !== SEAT_TYPES.BROKEN && isAgeAppropriate) {
          // Prioritize keeping groups together in the same row
          if (availableSeats.length > 0 && availableSeats[0].row === r) {
            availableSeats.push({ row: r, col: c });
          } else if (availableSeats.length === 0) {
            availableSeats.push({ row: r, col: c });
          }
        }
      }
    }
    
    if (availableSeats.length < groupSize) {
      showNotification(`Not enough available seats for ${groupSize} people`, "error");
      return;
    }
    
    // Book the seats
    const newSeating = seating.map(row => [...row]);
    availableSeats.slice(0, groupSize).forEach(({ row, col }) => {
      newSeating[row][col].booked = true;
      newSeating[row][col].occupantType = occupantType;
    });
    
    setSeating(newSeating);
    showNotification(`Booked ${groupSize} seats (some may not be together)`, "info");
  };

  // Render components
  const Seat = ({ type, booked, selected, onClick }) => {
    const seatStyles = {
      standard: { bg: "#757575", icon: <MdEventSeat /> },
      vip: { bg: THEME.accent, icon: <MdKingBed />, text: THEME.textDark },
      accessible: { bg: THEME.accessible, icon: <FaWheelchair />, text: THEME.textDark },
      broken: { bg: THEME.background, icon: <FaRegSadCry />, text: "#757575" },
      ageRestricted: { bg: THEME.secondary, icon: <FaHeart /> },
      reservedAdmin: { bg: THEME.admin, icon: <FaUserShield /> }
    };
    
    const { bg, icon, text = THEME.textLight } = seatStyles[type] || seatStyles.standard;
    
    return (
      <div 
        onClick={onClick}
        style={{
          width: "36px",
          height: "36px",
          backgroundColor: booked ? THEME.primary : bg,
          color: text,
          borderRadius: type === SEAT_TYPES.ACCESSIBLE ? "50%" : "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: selected ? `3px solid ${THEME.accent}` : `1px solid ${THEME.background}`,
          boxShadow: `0 2px 5px rgba(0,0,0,0.3)`,
          transition: "all 0.2s ease",
          position: "relative",
          overflow: "hidden",
          ":hover": {
            transform: "scale(1.05)",
            filter: "brightness(1.2)"
          }
        }}
      >
        {icon}
        {booked && <FaTicketAlt style={{ position: "absolute", bottom: 2, right: 2, fontSize: "0.8em" }} />}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "20%",
          height: "20%",
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: "50%",
          filter: "blur(1px)"
        }} />
      </div>
    );
  };

  const TheaterScreen = () => (
    <div style={{
      background: THEME.screenGradient,
      height: "80px",
      width: "100%",
      marginBottom: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: THEME.textLight,
      fontSize: "1.8em",
      fontWeight: "bold",
      letterSpacing: "8px",
      textTransform: "uppercase",
      borderRadius: "8px",
      boxShadow: `inset 0 -10px 20px rgba(0,0,0,0.5)`,
      borderBottom: `3px solid ${THEME.accent}`,
      transform: "perspective(300px) rotateX(10deg)",
      textShadow: `0 0 10px rgba(255,215,0,0.5)`
    }}>
      Screen
    </div>
  );

  const SeatLegend = () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "12px",
      marginTop: "30px",
      padding: "20px",
      backgroundColor: THEME.background,
      borderRadius: "10px",
      border: `1px solid ${THEME.secondary}`
    }}>
      {Object.entries({
        [SEAT_TYPES.STANDARD]: "Standard",
        [SEAT_TYPES.VIP]: "VIP",
        [SEAT_TYPES.ACCESSIBLE]: "Accessible",
        [SEAT_TYPES.AGE_RESTRICTED]: "Age Restricted",
        [SEAT_TYPES.BROKEN]: "Unavailable",
        [SEAT_TYPES.RESERVED_ADMIN]: "Admin Reserved",
        booked: "Booked",
        selected: "Selected"
      }).map(([type, label]) => (
        <div key={type} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "24px",
            height: "24px",
            backgroundColor: 
              type === "booked" ? THEME.primary :
              type === "selected" ? "transparent" :
              type === SEAT_TYPES.STANDARD ? "#757575" :
              type === SEAT_TYPES.VIP ? THEME.accent :
              type === SEAT_TYPES.ACCESSIBLE ? THEME.accessible :
              type === SEAT_TYPES.AGE_RESTRICTED ? THEME.secondary :
              type === SEAT_TYPES.BROKEN ? THEME.background :
              THEME.admin,
            borderRadius: "4px",
            border: type === "selected" ? `2px solid ${THEME.accent}` : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: type === SEAT_TYPES.VIP || type === SEAT_TYPES.ACCESSIBLE ? THEME.textDark : THEME.textLight
          }}>
            {type === SEAT_TYPES.VIP ? <MdKingBed size={14} /> :
             type === SEAT_TYPES.ACCESSIBLE ? <FaWheelchair size={12} /> :
             type === SEAT_TYPES.AGE_RESTRICTED ? <FaHeart size={12} /> :
             type === SEAT_TYPES.BROKEN ? <FaRegSadCry size={14} /> :
             type === SEAT_TYPES.RESERVED_ADMIN ? <FaUserShield size={12} /> :
             type === "booked" ? <FaTicketAlt size={12} /> : null}
          </div>
          <span style={{ fontSize: "0.9em" }}>{label}</span>
        </div>
      ))}
    </div>
  );

  // Admin Page
  const AdminPage = () => {
    return (
      <div style={{
        backgroundColor: THEME.background,
        color: THEME.textLight,
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "30px",
          color: THEME.accent,
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}>
          <FaUserShield /> Theater Administration
        </h1>
        
        <div style={{
          backgroundColor: "#1a1a1a",
          padding: "30px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "600px",
          boxShadow: `0 5px 15px rgba(0,0,0,0.3)`
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "25px",
            paddingBottom: "15px",
            borderBottom: `1px solid ${THEME.secondary}`
          }}>
            <h2 style={{ fontSize: "1.5rem" }}>Admin Controls</h2>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <input 
                type="checkbox" 
                checked={adminMode} 
                onChange={() => setAdminMode(!adminMode)} 
                style={{ width: "20px", height: "20px" }}
              />
              <span>Admin Mode</span>
            </label>
          </div>
          
          <div style={{ display: "grid", gap: "15px" }}>
            <button 
              onClick={() => {
                setSeating(generateSeatingLayout());
                showNotification("Theater layout has been reset", "success");
              }}
              style={{
                padding: "12px",
                backgroundColor: THEME.error,
                color: THEME.textLight,
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontWeight: "bold",
                transition: "all 0.2s ease",
                ":hover": {
                  backgroundColor: "#b71c1c"
                }
              }}
            >
              <FaBan /> Reset Theater
            </button>
            
            <button 
              onClick={() => setCurrentPage("booking")}
              style={{
                padding: "12px",
                backgroundColor: "transparent",
                color: THEME.textLight,
                border: `1px solid ${THEME.primary}`,
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                ":hover": {
                  backgroundColor: "rgba(128,0,32,0.2)"
                }
              }}
            >
              <FaFilm /> View Seating Chart
            </button>
            
            <button 
              onClick={() => setCurrentPage("home")}
              style={{
                padding: "12px",
                backgroundColor: "transparent",
                color: THEME.textLight,
                border: `1px solid ${THEME.textLight}`,
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                ":hover": {
                  backgroundColor: "rgba(255,255,255,0.1)"
                }
              }}
            >
              <FaHome /> Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Booking page
  const BookingPage = () => {
    return (
      <div style={{
        backgroundColor: THEME.background,
        color: THEME.textLight,
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          gap: "30px"
        }}>
          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "20px",
            borderBottom: `1px solid ${THEME.secondary}`
          }}>
            <h1 style={{
              fontSize: "2rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}>
              <FaFilm /> Theater Seating
            </h1>
            
            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                onClick={() => setCurrentPage("home")}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: THEME.textLight,
                  border: `1px solid ${THEME.textLight}`,
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                  ":hover": {
                    backgroundColor: "rgba(255,255,255,0.1)"
                  }
                }}
              >
                <FaHome /> Home
              </button>
              
              <button 
                onClick={() => setCurrentPage("admin")}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: THEME.accent,
                  border: `1px solid ${THEME.accent}`,
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                  ":hover": {
                    backgroundColor: "rgba(255,215,0,0.1)"
                  }
                }}
              >
                <FaUserShield /> Admin
              </button>
            </div>
          </div>
          
          {/* Notification */}
          {notification.message && (
            <div style={{
              padding: "12px",
              backgroundColor: 
                notification.type === "success" ? THEME.success :
                notification.type === "error" ? THEME.error :
                "rgba(255,255,255,0.1)",
              color: THEME.textLight,
              borderRadius: "6px",
              textAlign: "center",
              fontWeight: "bold"
            }}>
              {notification.message}
            </div>
          )}
          
          {/* Booking controls */}
          {!adminMode && (
            <div style={{
              backgroundColor: "#1a1a1a",
              padding: "20px",
              borderRadius: "10px",
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <label style={{ minWidth: "80px" }}>Occupant:</label>
                <select
                  value={occupantType}
                  onChange={(e) => setOccupantType(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#333",
                    color: THEME.textLight,
                    border: "none",
                    borderRadius: "6px",
                    minWidth: "120px"
                  }}
                >
                  <option value="adult">Adult</option>
                  <option value="child">Child</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
              
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <label style={{ minWidth: "80px" }}>Group Size:</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={groupSize}
                  onChange={(e) => setGroupSize(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#333",
                    color: THEME.textLight,
                    border: "none",
                    borderRadius: "6px",
                    width: "60px",
                    textAlign: "center"
                  }}
                />
              </div>
              
              <button
                onClick={bookGroup}
                style={{
                  padding: "10px 20px",
                  backgroundColor: THEME.primary,
                  color: THEME.textLight,
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "bold",
                  transition: "all 0.2s ease",
                  ":hover": {
                    backgroundColor: THEME.secondary
                  }
                }}
              >
                <FaUsers /> Book Group
              </button>
            </div>
          )}
          
          {/* Theater seating */}
          <div style={{
            backgroundColor: "#1a1a1a",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: `0 5px 15px rgba(0,0,0,0.3)`
          }}>
            <TheaterScreen />
            
            <div style={{ overflowX: "auto", paddingBottom: "20px" }}>
              <table style={{ borderCollapse: "separate", borderSpacing: "8px", margin: "0 auto" }}>
                <thead>
                  <tr>
                    <th style={{ width: "40px", color: "#999", fontSize: "0.9em" }}></th>
                    {Array.from({ length: COLS }).map((_, col) => (
                      <th key={`col-${col}`} style={{ 
                        width: "40px", 
                        color: "#999", 
                        fontSize: "0.9em",
                        paddingBottom: "5px",
                        textAlign: "center"
                      }}>
                        {col + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seating.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                      <td style={{ 
                        color: "#999", 
                        fontWeight: "bold",
                        paddingRight: "10px",
                        textAlign: "center",
                        fontSize: "0.9em"
                      }}>
                        {String.fromCharCode(65 + rowIndex)}
                      </td>
                      {row.map((seat, colIndex) => (
                        <td key={seat.id}>
                          <Seat
                            type={seat.type}
                            booked={seat.booked}
                            selected={selectedSeats.some(s => s.row === rowIndex && s.col === colIndex)}
                            onClick={() => handleSeatClick(rowIndex, colIndex)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Aisle indicators */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
              color: "#666",
              fontSize: "0.9em",
              fontWeight: "bold"
            }}>
              <span>AISLE</span>
              <span>AISLE</span>
            </div>
          </div>
          
          {/* Selected seats actions */}
          {selectedSeats.length > 0 && !adminMode && (
            <div style={{
              backgroundColor: "#1a1a1a",
              padding: "20px",
              borderRadius: "10px",
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              justifyContent: "center"
            }}>
              <button
                onClick={() => {
                  const newSeating = seating.map(row => [...row]);
                  selectedSeats.forEach(({ row, col }) => {
                    newSeating[row][col].booked = false;
                    newSeating[row][col].occupantType = null;
                  });
                  setSeating(newSeating);
                  setSelectedSeats([]);
                  showNotification(`Cancelled ${selectedSeats.length} booking(s)`, "success");
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: THEME.error,
                  color: THEME.textLight,
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "bold",
                  transition: "all 0.2s ease",
                  ":hover": {
                    backgroundColor: "#b71c1c"
                  }
                }}
              >
                <FaTimes /> Cancel Selected ({selectedSeats.length})
              </button>
              
              <button
                onClick={() => {
                  showNotification("Checkout completed!", "success");
                  setSelectedSeats([]);
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: THEME.success,
                  color: THEME.textLight,
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "bold",
                  transition: "all 0.2s ease",
                  ":hover": {
                    backgroundColor: "#2e7d32"
                  }
                }}
              >
                <FaCheck /> Checkout ({selectedSeats.length})
              </button>
            </div>
          )}
          
          {/* Seat legend */}
          <SeatLegend />
        </div>
        
        {/* Seat edit modal */}
        {editingSeat && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: "#1a1a1a",
              padding: "30px",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "400px",
              boxShadow: `0 5px 20px rgba(0,0,0,0.5)`
            }}>
              <h2 style={{
                fontSize: "1.5rem",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <FaEdit /> Edit Seat {String.fromCharCode(65 + editingSeat.row)}{editingSeat.col + 1}
              </h2>
              
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px" }}>Seat Type:</label>
                <select
                  value={editingSeat.currentType}
                  onChange={(e) => setEditingSeat({ ...editingSeat, currentType: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#333",
                    color: THEME.textLight,
                    border: "none",
                    borderRadius: "6px"
                  }}
                >
                  {Object.entries(SEAT_TYPES).map(([key, value]) => (
                    <option key={value} value={value}>
                      {value.charAt(0).toUpperCase() + value.slice(1).replace(/([A-Z])/g, ' $1')}
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setEditingSeat(null)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "transparent",
                    color: THEME.textLight,
                    border: `1px solid ${THEME.textLight}`,
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    ":hover": {
                      backgroundColor: "rgba(255,255,255,0.1)"
                    }
                  }}
                >
                  Cancel
                </button>
                
                <button
                  onClick={() => {
                    const newSeating = seating.map(row => [...row]);
                    newSeating[editingSeat.row][editingSeat.col].type = editingSeat.currentType;
                    setSeating(newSeating);
                    setEditingSeat(null);
                    showNotification("Seat updated successfully", "success");
                  }}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: THEME.primary,
                    color: THEME.textLight,
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    ":hover": {
                      backgroundColor: THEME.secondary
                    }
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render current page
  switch (currentPage) {
    case "home":
      return <HomeScreen setCurrentPage={setCurrentPage} />;
    case "admin":
      return <AdminPage />;
    case "booking":
      return <BookingPage />;
    default:
      return <HomeScreen setCurrentPage={setCurrentPage} />;
  }
}

// Styles
const styles = {
  container: {
    backgroundColor: "#0a0a0a",
    color: "#f5f5f5",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "rgba(10, 10, 10, 0.9)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottom: "1px solid #333"
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    letterSpacing: "2px"
  },
  nav: {
    display: "flex",
    gap: "20px"
  },
  navButton: {
    backgroundColor: "transparent",
    color: "#f5f5f5",
    border: "none",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    padding: "8px 16px",
    borderRadius: "4px",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#333"
    }
  },
  hero: {
    background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "0 20px"
  },
  heroContent: {
    maxWidth: "800px"
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#fff"
  },
  heroSubtitle: {
    fontSize: "20px",
    marginBottom: "40px",
    color: "#ccc"
  },
  searchContainer: {
    position: "relative",
    maxWidth: "600px",
    margin: "0 auto"
  },
  searchIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#999"
  },
  searchInput: {
    width: "100%",
    padding: "15px 15px 15px 45px",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    backgroundColor: "#333",
    color: "#fff",
    outline: "none"
  },
  section: {
    padding: "40px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#fff",
    borderLeft: "4px solid #800020",
    paddingLeft: "15px"
  },
  movieGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "30px"
  },
  movieCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)"
    }
  },
  moviePoster: {
    width: "100%",
    height: "320px",
    objectFit: "cover"
  },
  movieInfo: {
    padding: "15px"
  },
  movieTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  movieMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "14px",
    color: "#999"
  },
  movieGenre: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    display: "inline-block"
  },
  hallContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px"
  },
  hallCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#222"
    }
  },
  hallName: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px"
  },
  seatAvailability: {
    marginTop: "15px"
  },
  seatProgressContainer: {
    height: "6px",
    backgroundColor: "#333",
    borderRadius: "3px",
    marginBottom: "8px",
    overflow: "hidden"
  },
  seatProgress: {
    height: "100%",
    transition: "width 0.5s ease"
  },
  seatCount: {
    fontSize: "14px",
    color: "#999"
  },
  showtimeContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px"
  },
  showtimeButton: {
    padding: "12px 20px",
    borderRadius: "6px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#800020",
      transform: "translateY(-2px)"
    }
  },
  bookNowContainer: {
    padding: "0 40px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center"
  },
  bookNowButton: {
    backgroundColor: "#800020",
    color: "#fff",
    border: "none",
    padding: "15px 30px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "6px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#5D001E",
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(128, 0, 32, 0.4)"
    }
  },
  footer: {
    backgroundColor: "#1a1a1a",
    padding: "40px 0 0",
    marginTop: "60px"
  },
  footerContent: {
    display: "flex",
    justifyContent: "space-around",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 40px"
  },
  footerSection: {
    marginBottom: "30px"
  },
  footerTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#800020"
  },
  copyright: {
    textAlign: "center",
    padding: "20px",
    borderTop: "1px solid #333",
    color: "#999",
    fontSize: "14px"
  }
};