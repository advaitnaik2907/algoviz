function SearchTarget({ target, onTargetChange, disabled }) {
  return (
    <div className="search-target">
      <label htmlFor="search-target">
        Target Value
      </label>

      <input
        id="search-target"
        type="number"
        value={target}
        onChange={(event) =>
          onTargetChange(event.target.value)
        }
        disabled={disabled}
        placeholder="Enter value"
      />
    </div>
  );
}

export default SearchTarget;