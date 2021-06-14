import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import StudentForm from '../StudentForm/StudentForm.jsx';
import StudentList from '../StudentList/StudentList.jsx';

function Home() {

    const dispatch = useDispatch();

    let [currentStudent, setCurrentStudent] = useState({});

    //On Load, call server
    useEffect(() => {
        console.log('in useEffect')
        getStudents();
    }, [])


    // This function is called by the StudentForm when the submit button is pressed
    const addStudent = (newStudent) => {
        // POST your data here
        axios({
            method: 'POST',
            url: '/students',
            data: {github_name: newStudent.githubName}
        }).then((response) => {
            console.log(response);
            getStudents();
        }).catch((err) => {
            console.log(err);
        })
    }

    // get students from DB
    const getStudents = () => {
        axios({
            method: 'GET',
            url: '/students'
        }).then((response) => {
            dispatch({ type: 'SET_STUDENT_LIST', payload: response.data });
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className="App">
            <h2>Add a Student</h2>
            <StudentForm addStudent={addStudent} currentStudent={currentStudent} />

            <h2>Student list:</h2>
            <StudentList />
        </div>
    );

}

export default Home;
