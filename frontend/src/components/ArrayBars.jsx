function ArrayBars({
  array,
  activeIndices = [],
  sortedIndices = [],
  pivotIndex = null,
  foundIndex = null,
  minimumIndex = null,
  searchRange = null,
  searchMiddle = null,
  searchLeft = null,
  searchRight = null,
}) {
  const maxValue = Math.max(...array, 1);
  const showValues = array.length <= 35;

  return (
    <div className="array-container">

      {/* Fixed label layer */}
      <div className="array-label-layer">
        {array.map((_, index) => {
          const isPivot = pivotIndex === index;
          const isFound = foundIndex === index;
          const isMinimum = minimumIndex === index;

          const isSearchLeft = searchLeft === index;
          const isSearchMiddle = searchMiddle === index;
          const isSearchRight = searchRight === index;

          const labels = [];

          if (isSearchLeft) {
            labels.push({
              text: "LOW",
              className: "search-label low-label",
            });
          }

          if (isSearchMiddle) {
            labels.push({
              text: "MID",
              className: "search-label mid-label",
            });
          }

          if (isSearchRight) {
            labels.push({
              text: "HIGH",
              className: "search-label high-label",
            });
          }

          if (isPivot) {
            labels.push({
              text: "PIVOT",
              className: "bar-label pivot-label",
            });
          }

          if (isMinimum) {
            labels.push({
              text: "MIN",
              className: "bar-label minimum-label",
            });
          }

          if (isFound) {
            labels.push({
              text: "FOUND",
              className: "bar-label found-label",
            });
          }

          return (
            <div className="array-label-slot" key={index}>
              <div className="array-label-stack">
                {labels.map((label, labelIndex) => (
                  <span
                    key={`${label.text}-${labelIndex}`}
                    className={label.className}
                  >
                    {label.text}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bars */}
      <div className="array-bars-layer">
        {array.map((value, index) => {
          const isActive = activeIndices.includes(index);
          const isSorted = sortedIndices.includes(index);
          const isPivot = pivotIndex === index;
          const isFound = foundIndex === index;
          const isMinimum = minimumIndex === index;

          const isInSearchRange =
            searchRange &&
            index >= searchRange.left &&
            index <= searchRange.right;

          const isSearchMiddle =
            searchMiddle === index;

          let className = "array-bar";

          if (isInSearchRange) {
            className += " search-range";
          }

          if (isSorted) {
            className += " sorted";
          }

          if (isMinimum) {
            className += " minimum";
          }

          if (isActive) {
            className += " active";
          }

          if (isPivot) {
            className += " pivot";
          }

          if (isSearchMiddle) {
            className += " search-middle";
          }

          if (isFound) {
            className += " found";
          }

          const height = Math.max(
            (value / maxValue) * 100,
            3
          );

          return (
            <div
              key={index}
              className="array-bar-wrapper"
            >
              <div
                className={className}
                style={{
                  height: `${height}%`,
                }}
              >
                {showValues && (
                  <span className="array-value">
                    {value}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default ArrayBars;