import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [orderBy, setOrderBy] = useState("relevant");
    const [category, setCategory] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [range, setRange] = useState([0, 0]);
    const [currentAddListType, setCurrentAddListType] = useState("");

    // const resetFilters = () => {
    //     setOrderBy("relevant");
    //     setRange([0, 0]);
    //     setCategory(null);
    // }

    return (
        <FilterContext.Provider value={{
            orderBy,
            setOrderBy,
            range,
            setRange,
            category,
            setCategory,
            categoryOptions,
            setCategoryOptions,
            // resetFilters
            setCurrentAddListType,
            currentAddListType
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => useContext(FilterContext);
