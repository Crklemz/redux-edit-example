import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function StudentDetail(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    //dispatch to our edit reducer
    dispatch({
      type: 'SET_EDIT_STUDENT', 
      payload: props.student
    })

    //navigate to the edit view
    history.push('/edit')
  }

  return (
    <tr>
      <td>{props.student.github_name}</td>
      <td onClick={handleClick}>Edit!</td>
    </tr>
  );
}

export default StudentDetail;
