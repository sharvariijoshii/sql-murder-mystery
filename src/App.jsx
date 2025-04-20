import { useState, useEffect } from 'react';
import initSqlJs from 'sql.js';
import SQLTerminal from './components/SQLTerminal';
import ClueBoard from './components/ClueBoard';
import IntroModal from './components/IntroModal';
import CaseClosedModal from './components/CaseClosedModal';
import './App.css';

function App() {
  const challenges = [
    {
      id: 1,
      prompt: "A murder has occurred at Central Park. First, let's find all security cameras in the area.\n\nComplete the query to find all security cameras where location contains 'park':\n\nSELECT * FROM security_cameras WHERE location ____ '%park%'\n\nExpected output: A list of all cameras with their IDs and locations containing the word 'park'",
      answer: "SELECT * FROM security_cameras WHERE location LIKE '%park%'",
      hint: "The LIKE operator is used with % wildcards. Fill in: LIKE",
      concept: "LIKE operator, Pattern Matching",
      template: "SELECT * FROM security_cameras WHERE location ____ '%park%'"
    },
    {
      id: 2,
      prompt: "The murder occurred between 10 PM and midnight. Find all people caught on camera during this time.\n\nComplete the query to find people recorded between 22:00 and 23:59:\n\nSELECT name, time FROM camera_logs WHERE time _____ '22:00' ____ '23:59'\n\nExpected output: Names and timestamps of people recorded between 10 PM and midnight",
      answer: "SELECT name, time FROM camera_logs WHERE time BETWEEN '22:00' AND '23:59'",
      hint: "Use BETWEEN ... AND ... for time ranges",
      concept: "BETWEEN operator, Time filtering",
      template: "SELECT name, time FROM camera_logs WHERE time _____ '22:00' ____ '23:59'"
    },
    {
      id: 3,
      prompt: "We need to cross-reference suspects with their alibis.\n\nComplete the query to join suspects and alibis tables using suspect_id:\n\nSELECT s.name, a.location \nFROM suspects s \n____ alibis a \nON s.suspect_id = a.suspect_id\n\nExpected output: Suspect names and their claimed locations during the crime",
      answer: "SELECT s.name, a.location \nFROM suspects s \nJOIN alibis a \nON s.suspect_id = a.suspect_id",
      hint: "Use JOIN to connect the tables",
      concept: "JOIN operations, Table aliases",
      template: "SELECT s.name, a.location \nFROM suspects s \n____ alibis a \nON s.suspect_id = a.suspect_id"
    },
    {
      id: 4,
      prompt: "Let's find how many suspects were in each location.\n\nComplete the query to count suspects per location:\n\nSELECT location, ____(*) as suspect_count \nFROM alibis \n____ BY location\n\nExpected output: Each location and the number of suspects who claim to be there",
      answer: "SELECT location, COUNT(*) as suspect_count FROM alibis GROUP BY location",
      hint: "Use COUNT(*) and GROUP BY",
      concept: "GROUP BY, Aggregation",
      template: "SELECT location, ____(*) as suspect_count \nFROM alibis \n____ BY location"
    },
    {
      id: 5,
      prompt: "Find suspicious locations with more than 3 suspects.\n\nComplete the query to find locations with over 3 suspects:\n\nSELECT location, COUNT(*) as suspect_count \nFROM alibis \nGROUP BY location \n_____ suspect_count > 3\n\nExpected output: Locations where more than 3 suspects claim to be - these are highly suspicious!",
      answer: "SELECT location, COUNT(*) as suspect_count FROM alibis GROUP BY location HAVING suspect_count > 3",
      hint: "Use HAVING to filter grouped results",
      concept: "HAVING clause, Filtering groups",
      template: "SELECT location, COUNT(*) as suspect_count \nFROM alibis \nGROUP BY location \n_____ suspect_count > 3"
    }
  ];

  const [db, setDb] = useState(null);
  const [dbError, setDbError] = useState(null);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [clues, setClues] = useState([
    {
      id: 1,
      image: '/clues/park-map.png',
      description: 'Crime Scene: Central Park - 11:30 PM'
    }
  ]);

  const [connections, setConnections] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [showCaseClosed, setShowCaseClosed] = useState(false);

  useEffect(() => {
    // Initialize SQL.js and create the database
    const initDb = async () => {
      try {
        // Initialize SQL.js
        const SQL = await initSqlJs({
          locateFile: file => `https://sql.js.org/dist/${file}`
        });

        // Fetch the SQL initialization file
        const response = await fetch('/init.sql');
        const sqlContent = await response.text();

        // Create a new database and run the initialization SQL
        const newDb = new SQL.Database();
        newDb.run(sqlContent);
        setDb(newDb);
      } catch (error) {
        console.error('Database initialization error:', error);
        setDbError(error.message);
      }
    };

    initDb();
  }, []);

  const normalizeQuery = (query) => {
    return query
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/\s*([,()=])\s*/g, '$1')
      .trim();
  };

  const handleQuerySubmit = (query) => {
    if (!db) {
      alert('Database is not ready yet. Please wait...');
      return;
    }

    try {
      // Execute the query
      const result = db.exec(query);
      
      // Normalize both queries for comparison
      const normalizedInput = normalizeQuery(query);
      const normalizedAnswer = normalizeQuery(challenges[currentChallengeIndex].answer);
      
      // Check if the query matches the current challenge
      if (normalizedInput === normalizedAnswer) {
        // Add new clue based on the challenge completed
        const newClue = {
          id: clues.length + 1,
          image: `/clues/clue-${currentChallengeIndex + 1}.png`,
          description: getClueDescription(currentChallengeIndex)
        };
        
        setClues([...clues, newClue]);
        
        // Add connection between last clue and new clue if there are at least 2 clues
        if (clues.length > 0) {
          setConnections([
            ...connections,
            {
              start: { x: 100, y: 100 * clues.length },
              end: { x: 200, y: 100 * (clues.length + 1) }
            }
          ]);
        }

        // Move to next challenge if not at the end
        if (currentChallengeIndex < challenges.length - 1) {
          setCurrentChallengeIndex(currentChallengeIndex + 1);
          alert("Excellent work, Detective! New evidence uncovered!");
        } else {
          setShowCaseClosed(true);
        }
      } else {
        // Show the query result even if it's not the exact answer
        const columns = result[0]?.columns;
        const values = result[0]?.values;
        if (columns && values) {
          alert("Query result:\n\n" + 
                columns.join(", ") + "\n" +
                values.map(row => row.join(", ")).join("\n") +
                "\n\nYour query works but doesn't exactly match what we're looking for. Try to match the template exactly!");
        } else {
          alert("Query executed but returned no results. Try again!");
        }
      }
    } catch (error) {
      alert("Error in your query: " + error.message);
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const getClueDescription = (index) => {
    const clueDescriptions = [
      'Security footage shows three suspicious figures',
      'Time logs reveal unusual activity pattern',
      'Suspect alibis show conflicting statements',
      'Multiple suspects gathered at warehouse',
      'Key evidence points to the mastermind'
    ];
    return clueDescriptions[index];
  };

  return (
    <div className="game-container">
      {showIntro && <IntroModal onStart={() => setShowIntro(false)} />}
      {showCaseClosed && <CaseClosedModal onRestart={handleRestart} />}
      {!showIntro && !showCaseClosed && (
        <>
          <header className="game-header">
            <h1>SQL Murder Mystery</h1>
            <p>Help solve the case using your SQL skills!</p>
          </header>
          <main className="game-content">
            <SQLTerminal 
              onQuerySubmit={handleQuerySubmit}
              currentChallenge={challenges[currentChallengeIndex]}
            />
            <ClueBoard 
              clues={clues}
              connections={connections}
            />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
