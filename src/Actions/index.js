import { type } from "@testing-library/user-event/dist/type"

export const create = (obj) => {
    return { type: "CREATE", payload: obj }
}

export const handleDelete = (idx) => {
    return { type: "DELETE", payload: idx }
}

export const handleEdit = (idx, updateobj) => {
    return { type: "EDIT", payload: { editIndex: idx, record: updateobj } }
}

export const handlesort = () => {
    return { type: "SORT" }
}

export const handlesorting = (field, Order) => {
    return { type: "SORTING", payload: { field, Order } }
}

export const handlesearch = (searchTerm) => {
    return { type: "SEARCH", payload: searchTerm };
};

export const handlesearching = ({searchField, searchTerm}) => {
    return { type: "SEARCHING", payload: { searchField, searchTerm } };
};
