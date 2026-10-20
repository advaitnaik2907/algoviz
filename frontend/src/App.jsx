import { useEffect, useState } from "react";
import CodePanel from "./components/CodePanel";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

/* =========================================================
   SHARED COMPONENTS
========================================================= */

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

/* =========================================================
   VISUALIZER COMPONENTS
========================================================= */

import Sidebar from "./components/Sidebar";
import ArrayBars from "./components/ArrayBars";
import Controls from "./components/Controls";
import AlgorithmInfo from "./components/AlgorithmInfo";
import SpeedControl from "./components/SpeedControl";
import SearchTarget from "./components/SearchTarget";
import AnimationLegend from "./components/AnimationLegend";
import AnimationStatus from "./components/AnimationStatus";

/* =========================================================
   PAGES
========================================================= */

import LandingPage from "./components/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LearnPage from "./pages/LearnPage";
import AlgorithmLearnPage from "./pages/AlgorithmLearnPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Quiz from "./pages/Quiz";
import QuizHistory from "./pages/QuizHistory";
import Progress from "./pages/Progress";

/* =========================================================
   DATA
========================================================= */

import { algorithms } from "./data/algorithms";

/* =========================================================
   RANDOM ARRAY GENERATOR
========================================================= */

function generateRandomArray(size = 30) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * 90) + 10
  );
}

/* =========================================================
   VISUALIZER PAGE
========================================================= */

function VisualizerPage() {

  // =========================
  // ARRAY
  // =========================

  const [arraySize, setArraySize] = useState(30);

  const [target, setTarget] = useState("");

  const [array, setArray] = useState(
    generateRandomArray(30)
  );

  // =========================
  // ALGORITHM
  // =========================

  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState("bubbleSort");

  const currentAlgorithm =
    algorithms[selectedAlgorithm];

  // =========================
  // ANIMATION
  // =========================

  const [speed, setSpeed] = useState(500);

  const [isRunning, setIsRunning] = useState(false);

  const [steps, setSteps] = useState([]);

  const [currentStep, setCurrentStep] = useState(0);

  // =========================
  // VISUAL STATE
  // =========================

  const [activeIndices, setActiveIndices] =
    useState([]);

  const [sortedIndices, setSortedIndices] =
    useState([]);

  const [pivotIndex, setPivotIndex] =
    useState(null);

  const [foundIndex, setFoundIndex] =
    useState(null);

  const [minimumIndex, setMinimumIndex] =
    useState(null);

  // =========================
  // BINARY SEARCH STATE
  // =========================

  const [searchRange, setSearchRange] =
    useState(null);

  const [searchMiddle, setSearchMiddle] =
    useState(null);

  const [searchLeft, setSearchLeft] =
    useState(null);

  const [searchRight, setSearchRight] =
    useState(null);

  // =========================
  // START ALGORITHM
  // =========================

  const handleStart = () => {

    if (isRunning) {
      return;
    }

    if (!currentAlgorithm.run) {

      console.log(
        `${currentAlgorithm.name} is not available yet.`
      );

      return;
    }

    let algorithmSteps;

    // =========================
    // SEARCHING
    // =========================

    if (
      currentAlgorithm.category ===
      "Searching"
    ) {

      const targetValue = Number(target);

      if (target === "") {

        alert(
          "Please enter a target value."
        );

        return;
      }

      // Binary Search requires sorted data

      if (
        selectedAlgorithm ===
        "binarySearch"
      ) {

        const sortedArray = [...array].sort(
          (a, b) => a - b
        );

        setArray(sortedArray);

        algorithmSteps =
          currentAlgorithm.run(
            sortedArray,
            targetValue
          );

      } else {

        algorithmSteps =
          currentAlgorithm.run(
            array,
            targetValue
          );
      }

    }

    // =========================
    // SORTING
    // =========================

    else {

      algorithmSteps =
        currentAlgorithm.run(array);
    }

    // =========================
    // RESET VISUAL STATE
    // =========================

    setSteps(algorithmSteps);

    setCurrentStep(0);

    setSortedIndices([]);

    setActiveIndices([]);

    setPivotIndex(null);

    setFoundIndex(null);

    setMinimumIndex(null);

    setSearchRange(null);

    setSearchMiddle(null);

    setSearchLeft(null);

    setSearchRight(null);

    setIsRunning(true);
  };

  // =========================
  // ANIMATION ENGINE
  // =========================

  useEffect(() => {

    if (!isRunning) {
      return;
    }

    // =========================
    // ANIMATION COMPLETE
    // =========================

if (currentStep >= steps.length) {
      setIsRunning(false);
      return;
    }

    const step = steps[currentStep];

    const timer = setTimeout(() => {

      // =========================
      // COMPARE
      // =========================

      if (step.type === "compare") {

        setActiveIndices(
          step.indices
        );
      }

      // =========================
      // SWAP
      // =========================

      if (step.type === "swap") {

        setArray(step.array);

        setActiveIndices(
          step.indices
        );
      }

      // =========================
      // OVERWRITE
      // =========================

      if (step.type === "overwrite") {

        setArray(step.array);

        setActiveIndices([
          step.index,
        ]);
      }

      // =========================
      // PIVOT
      // =========================

      if (step.type === "pivot") {

        setPivotIndex(
          step.index
        );

        setActiveIndices([]);
      }

      // =========================
      // MINIMUM
      // =========================

      if (step.type === "minimum") {

        setMinimumIndex(
          step.index
        );

        setActiveIndices([]);
      }

      // =========================
      // SORTED
      // =========================

      if (step.type === "sorted") {

        setActiveIndices([]);

        setMinimumIndex(null);

        setSortedIndices(
          (previous) => {

            if (
              previous.includes(
                step.index
              )
            ) {

              return previous;
            }

            return [
              ...previous,
              step.index,
            ];
          }
        );
      }

      // =========================
      // SORTED RANGE
      // =========================

      if (step.type === "sortedRange") {

        const range = [];

        for (
          let i = step.start;
          i <= step.end;
          i++
        ) {

          range.push(i);
        }

        setSortedIndices(
          (previous) => {

            return [
              ...new Set([
                ...previous,
                ...range,
              ]),
            ];
          }
        );

        setActiveIndices([]);
      }

      // =========================
      // FOUND
      // =========================

      if (step.type === "found") {

        setFoundIndex(
          step.index
        );

        setActiveIndices([
          step.index,
        ]);

        setSearchMiddle(null);
      }

      // =========================
      // NOT FOUND
      // =========================

      if (step.type === "notFound") {

        setActiveIndices([]);

        setSearchMiddle(null);
      }

      // =========================
      // BINARY SEARCH RANGE
      // =========================

      if (step.type === "range") {

        setSearchRange({
          left: step.left,
          right: step.right,
        });

        setSearchLeft(
          step.left
        );

        setSearchMiddle(
          step.middle
        );

        setSearchRight(
          step.right
        );

        setActiveIndices([]);
      }

      // =========================
      // SEARCH LEFT / RIGHT
      // =========================

      if (
        step.type === "searchLeft" ||
        step.type === "searchRight"
      ) {

        setSearchRange({
          left: step.left,
          right: step.right,
        });

        setSearchLeft(
          step.left
        );

        setSearchRight(
          step.right
        );

        setSearchMiddle(null);

        setActiveIndices([]);
      }

      // =========================
      // NEXT STEP
      // =========================

      setCurrentStep(
        (previous) =>
          previous + 1
      );

    }, speed);

    return () =>
      clearTimeout(timer);

  }, [
    isRunning,
    currentStep,
    steps,
    speed,
  ]);

  // =========================
  // GENERATE ARRAY
  // =========================

  const handleGenerate = () => {

    setIsRunning(false);

    setSteps([]);

    setCurrentStep(0);

    setActiveIndices([]);

    setSortedIndices([]);

    setPivotIndex(null);

    setFoundIndex(null);

    setMinimumIndex(null);

    setSearchRange(null);

    setSearchMiddle(null);

    setSearchLeft(null);

    setSearchRight(null);

    setArray(
      generateRandomArray(
        arraySize
      )
    );
  };

  // =========================
  // RESET
  // =========================

  const handleReset = () => {

    setIsRunning(false);

    setSteps([]);

    setCurrentStep(0);

    setActiveIndices([]);

    setSortedIndices([]);

    setPivotIndex(null);

    setFoundIndex(null);

    setMinimumIndex(null);

    setSearchRange(null);

    setSearchMiddle(null);

    setSearchLeft(null);

    setSearchRight(null);

    setArray(
      generateRandomArray(
        arraySize
      )
    );
  };

  // =========================
  // SELECT ALGORITHM
  // =========================

  const handleSelectAlgorithm = (
    algorithmId
  ) => {

    if (isRunning) {
      return;
    }

    setSelectedAlgorithm(
      algorithmId
    );

    setActiveIndices([]);

    setSortedIndices([]);

    setPivotIndex(null);

    setFoundIndex(null);

    setMinimumIndex(null);

    setSearchRange(null);

    setSearchMiddle(null);

    setSearchLeft(null);

    setSearchRight(null);

    setSteps([]);

    setCurrentStep(0);
  };

  // =========================
  // VISUALIZER UI
  // =========================

  return (

    <div className="app">

      <div className="main-layout">

        {/* SIDEBAR */}

        <Sidebar
          selectedAlgorithm={
            selectedAlgorithm
          }

          onSelectAlgorithm={
            handleSelectAlgorithm
          }
        />

        <main className="visualizer">

          {/* VISUALIZER HEADER */}

          <div className="visualizer-header">

            <div>

              <h2>
                {currentAlgorithm.name}
              </h2>

              <p>
                {currentAlgorithm.category}
              </p>

            </div>

            <SpeedControl
              speed={speed}
              onSpeedChange={
                setSpeed
              }
            />

          </div>

          {/* ARRAY VISUALIZATION */}

          
<div className="visualizer-workspace">

  <div className="visualizer-area">
    <ArrayBars
      array={array}
      activeIndices={activeIndices}
      sortedIndices={sortedIndices}
      pivotIndex={pivotIndex}
      foundIndex={foundIndex}
      minimumIndex={minimumIndex}
      searchRange={searchRange}
      searchMiddle={searchMiddle}
      searchLeft={searchLeft}
      searchRight={searchRight}
    />
  </div>

  <CodePanel
    algorithmId={selectedAlgorithm}
    step={currentStep > 0 ? steps[currentStep - 1] : null}
  />

</div>
          {/* ANIMATION STATUS */}

          <AnimationStatus
          algorithmId={selectedAlgorithm}
            step={
              steps.length === 0
                ? null
                : currentStep >= steps.length
                  ? steps[steps.length - 1]
                  : steps[currentStep]
            }
            currentStep={currentStep}
            totalSteps={steps.length}
            isRunning={isRunning}
            array={array}
          />

          {/* CONTROLS */}

          <Controls
            arraySize={
              arraySize
            }

            onArraySizeChange={
              setArraySize
            }

            onGenerate={
              handleGenerate
            }

            onStart={
              handleStart
            }

            onReset={
              handleReset
            }

            isRunning={
              isRunning
            }
          />

          {/* SEARCH TARGET */}

          {currentAlgorithm.category ===
            "Searching" && (

            <SearchTarget
              target={
                target
              }

              onTargetChange={
                setTarget
              }

              disabled={
                isRunning
              }
            />

          )}

          {/* ANIMATION LEGEND */}

          <AnimationLegend />

          {/* ALGORITHM INFORMATION */}

          <AlgorithmInfo
            algorithm={
              currentAlgorithm
            }
          />

        </main>

      </div>

    </div>
  );
}

/* =========================================================
   SHARED APP LAYOUT
========================================================= */

function AppLayout({ children }) {
  return (
    <div className="app-shell">

      <Navbar />

      <div className="app-content">
        {children}
      </div>

      <Footer />

    </div>
  );
}

/* =========================================================
   MAIN APP / ROUTING
========================================================= */

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>

      <Routes>

        {/* =================================================
            LANDING / AUTH
        ================================================= */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* =================================================
            MAIN APPLICATION
        ================================================= */}

        <Route
          path="/learn"
          element={
            <AppLayout>
              <LearnPage />
            </AppLayout>
          }
        />

        <Route
          path="/learn/:algorithmId"
          element={
            <AppLayout>
              <AlgorithmLearnPage />
            </AppLayout>
          }
        />

        <Route
          path="/visualizer"
          element={
            <AppLayout>
              <VisualizerPage />
            </AppLayout>
          }
        />

        {/* =================================================
            QUIZ LIBRARY
        ================================================= */}

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Quiz />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* =================================================
            INDIVIDUAL QUIZ
        ================================================= */}

        <Route
        path="/quiz/:algorithm"
        element={
        <ProtectedRoute>
        <AppLayout>
        <Quiz key={window.location.pathname} />
        </AppLayout>
      </ProtectedRoute>
        }
        />

        <Route
          path="/quiz-history"
          element={
            <ProtectedRoute>
              <AppLayout>
                <QuizHistory />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Progress />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
