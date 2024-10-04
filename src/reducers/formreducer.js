const formReducer = (state = JSON.parse(localStorage.getItem("data")) || [], action) => {

    switch (action.type) {
        case "CREATE": {
            localStorage.setItem("data", JSON.stringify([...state, action.payload]));
            return [...state, action.payload]
        }
            break;

        case "DELETE": {
            const newstate = state.filter((idx, index) => index !== action.payload)
            localStorage.setItem("data", JSON.stringify(newstate))
            return newstate;
        }
            break;

        case "EDIT": {
            const { editIndex, record } = action.payload;
            const newstate = state.map((item, i) => (i === editIndex ? record : item));
            localStorage.setItem("data", JSON.stringify(newstate));
            return newstate;
        }
            break;

        case "SORT": {
            const sortOrder = "asc";
            const sortedstate = [...state].sort((a, b) => {
                if (sortOrder === "asc") {
                    return a.fname.toLowerCase() > b.fname.toLowerCase() ? 1 : -1;
                } else {
                    return a.fname.toLowerCase() < b.fname.toLowerCase() ? -1 : 1;
                }
            });
            return sortedstate;
        }
            break;

        case "SORTING": {
            const { field, Order } = action.payload;

            const sortDaata = [...state].sort((a, b) => {
                if (Order === "asc") {
                    return a[field].toString().toLowerCase() > b[field].toString().toLowerCase() ? 1 : -1;
                } else {
                    return a[field].toString().toLowerCase() < b[field].toString().toLowerCase() ? -1 : 1;

                }

            })
            return sortDaata;
        }
            break;

        case "SEARCH": {
            const searchTerm = action.payload;
            const results = [...state].filter((record) => {
                return (
                    record.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    record.age.toString().includes(searchTerm)
                );
            });
            return results;
        }
            break;

        case "SEARCHING": {
            const { searchField, searchTerm } = action.payload;
            if (!searchTerm) {
                return state;
            }
            const sreachresults = [...state].filter((record) => {
                console.log(record[searchField]);
                if (record[searchField] !== undefined && record[searchField] !== null) {
                    return record[searchField].toLowerCase().includes(searchTerm.toLowerCase());
                }
               
            })
            return sreachresults ;



        }

        default: {

            return state || []
        }
    }
}

export { formReducer }