import { useWeatherSearch } from "../hooks/useWeatherSearch";

const Search = () => {
  const { city, setCity, handleSubmit, activeForm, errorMessage } =
    useWeatherSearch();

  return (
    <div className="search-wrapper">
      <div className={`search-bg ${activeForm ? "intro-open" : ""}`}>
        <form action="" className="search-form">
          <input
            type="text"
            value={city}
            placeholder="Wyszukaj miasto..."
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      {errorMessage && <h2 className="error-message">{errorMessage}</h2>}
    </div>
  );
};

export default Search;
