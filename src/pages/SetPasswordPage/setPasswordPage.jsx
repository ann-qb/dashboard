import LoginCard from '../Login/LoginCards';
import { useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react';

export default function SetPasswordPage(props) {
  const history = useHistory();
  const location = useLocation();
	const [errorMessage, setErrorMessage] = useState(null);
	const [showLoading, setShowLoading] = useState(false);
	const [disableSubmit, setDisableSubmit] = useState(true);
	const [password, setPassword] = useState('');

	// Meathods
	const useQuery = () => {
		return new URLSearchParams(useLocation().search);
	};
	let query = useQuery();

	const onHandlePasswordChange = (e) => {
		const value = e.target.value;
		setPassword(value);
		password.trim().length ? setDisableSubmit(false) : setDisableSubmit(true);
	};

	const submitPassword = () => {
    // history.push('/dashboard')
    console.log(location)
  };

  const onSetPassword = (data)=>async(dispatch)=>{
    setShowLoading(true)
    const response = await axios.post(`http://user-dashboard.qburst.build:3002/user/password${location.search}`),{
      password:data.password
    }
    if(response.status === 200){
      setShowLoading(false)
      dispatch(login(response.data))
    }
  }

	// Query data
	const action = query.get('action');
	const token = query.get('token');

	return (
		<div id="login_background">
			<LoginCard
				cardHeader="Password"
				cardType="new password"
				onChange={onHandlePasswordChange}
				errorMessage={errorMessage}
				buttonDisabled={disableSubmit}
				buttonText="Submit"
				onClick={submitPassword}
				loading={showLoading}
			/>
		</div>
	);
}
