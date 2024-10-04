import './App.css';
import React, { useState } from "react";
import { create, handleDelete, handleEdit, handlesearch, handlesort, handlesorting, handlesearching } from './Actions';
import { useSelector, useDispatch } from 'react-redux';


const FormToTable = () => {

  // flow => state => action => reducer => combine reducer => store => provider => whole app 

  const selector = useSelector((selector) => selector);

  console.log(selector);

  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({ fname: "", age: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [sortOrder, setsortOrder] = useState(true);
  const [sortField, setSortField] = useState("age");
  const [sortingorder, setsortingorder] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [searchField, setsearchField] = useState("fname");

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      dispatch(handleEdit(editIndex, formValues));
    } else {
      dispatch(create(formValues))
    }

    setFormValues({ fname: "", age: "" });
    setEditIndex(null);
  };
  const handleDeletec = (idx) => {
    dispatch(handleDelete(idx));
  }

  const handleEditc = (idx) => {
    const recordedit = selector.formReducer[idx];
    setFormValues(recordedit);
    setEditIndex(idx);
  }
  console.log(selector.formReducer);

  const handlesortc = () => {
    const sortOrdervalue = sortOrder ? "asc" : "desc";
    setsortOrder(!sortOrder);
    dispatch(handlesort(sortOrdervalue));
  };

  const handlesearchc = (e) => {

    const searchvalue = e.target.value;

    dispatch(handlesearch(searchvalue));

  }

  const handleSortChange = (e) => {
    setSortField(e.target.value);
  }

  const handlesortingc = () => {
    const neworder = sortingorder === "asc" ? "desc" : "asc";
    setsortingorder(neworder);
    dispatch(handlesorting(sortField, neworder));
  }

  const handlesearchange = (e) => {
    setsearchField(e.target.value);
  }

  const handlesearchingc = (e) => {
    setsearchTerm(e.target.value);

  }

  const handleSEARCHCH = () => {
    // console.log(formReducer);

    console.log('Dispatching search with:', { searchField, searchTerm });
    if (searchField && searchTerm) {
      dispatch(handlesearching({ searchField, searchTerm }));
    } else {
      console.error('Search field or term is missing.');
    }
  }
  console.log(selector.formReducer);

  return (
    <div>
      <div className='mainform'>
        <h2>Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input className='nameinput'
              type="text"
              name="fname"
              value={formValues.fname}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Age:
            <input className='nameinput'
              type="number"
              name="age"
              value={formValues.age}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input className='nameinput'
              type='email'
              name='email'
              value={formValues.email}
              onChange={handleInputChange} />
          </label><br />
          <label>
            Password:
            <input className='nameinput'
              type='password'
              name='password'
              value={formValues.password}
              onChange={handleInputChange} />
          </label><br />
          <div className='mainsubbtn'>
          <button className='subbtn' type="submit">{editIndex !== null ? "Update" : "Submit"}</button>

          <button className='subbtn'  type='button' onClick={() => handlesortc()}>Sort </button><br />
          </div>
          <div className='mainsubbtn'>
          <input type='text' placeholder='Search' className='subbtn'
            value={selector.searchTerm}
            onChange={handlesearchc} />
          <button className='subbtn' type='button' onClick={{}}>Search</button><br />
          </div>
          <div className='mainsubbtn'>
          <select className='subbtn' value={sortField} onChange={handleSortChange}>
            <option value="fname">Name</option>
            <option value="age">Age</option>
          </select>
          <button className='subbtn' type='button' onClick={() => handlesortingc()}>Sorting </button><br />
</div>
<div className='mainsubbtn'>
          <select className='subbtn' value={searchField} onChange={handlesearchange}>
            <option value="fname">Name</option>
            <option value="age">Age</option>
          </select>
          <input className='subbtn' type='text' placeholder='Search' value={searchTerm} onChange={handlesearchingc} />
          <button className='subbtn' type='button' onClick={handleSEARCHCH}>Searching</button>
        </div>
        </form>
      </div>

      <table className='maintable' border="1">

        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Password</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>

          {selector.formReducer && selector.formReducer.map((record, index) => {
            return (
              <tr key={index}>
                <td>{record.fname}</td>
                <td>{record.age}</td>
                <td>{record.email}</td>
                <td>{record.password}</td>
                <td><button className='editbtn' id='red' onClick={() => handleDeletec(index)}>Delete</button></td>
                <td><button className='editbtn' onClick={() => handleEditc(index)}>Edit</button></td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );
}

export default FormToTable;
