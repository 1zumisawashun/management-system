import { useState } from "react";
const filterList = [
  "all",
  "mine",
  "development",
  "sales",
  "design",
  "marketing",
];
export default function ProjectFilter() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const handleClick = (newFilter) => {
    console.log(newFilter);
    setCurrentFilter(newFilter);
  };
  return (
    <div className="project-filter">
      <nav>
        <p>FIlter by:</p>
        {filterList.map((f) => (
          // 無名関数にする理由は？
          <button
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
