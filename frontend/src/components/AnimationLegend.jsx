function AnimationLegend() {
  const legendItems = [
    {
      className: "legend-dot compare",
      label: "Compare",
    },
    {
      className: "legend-dot swap",
      label: "Swap",
    },
    {
      className: "legend-dot sorted",
      label: "Sorted",
    },
    {
      className: "legend-dot minimum",
      label: "Minimum",
    },
    {
      className: "legend-dot pivot",
      label: "Pivot",
    },
    {
      className: "legend-dot found",
      label: "Found",
    },
  ];

  return (
    <div className="animation-legend">
      <div className="legend-title">
        Visualization Legend
      </div>

      <div className="legend-items">
        {legendItems.map((item) => (
          <div className="legend-item" key={item.label}>
            <span className={item.className}></span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimationLegend;