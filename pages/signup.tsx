import * as React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { RootState } from '../reducers';

export const Form = styled.form`padding: 10;`;

const ErrorMsg = styled.span`color: red;`;

const SignupDiv = styled.div`margin-top: 10px;`;

export type UseInputType = [string, (e: React.FormEvent<EventTarget>) => void];

export const useInput = (initialValue: string): UseInputType => {
	const [ value, setter ] = React.useState<string>(initialValue);
	const handler = React.useCallback((e: React.FormEvent<EventTarget>): void => {
		const target = e.target as HTMLInputElement;
		setter(target.value);
	}, []);
	return [ value, handler ];
};

const Signup: React.FunctionComponent = () => {
	const [ id, onChangeId ]: UseInputType = useInput('');
	const [ password, onChangePassword ]: UseInputType = useInput('');
	const [ passwordCheck, setPasswordCheck ] = React.useState<string>('');
	const [ term, setTerm ] = React.useState<boolean>(false);
	const [ passwordError, setPasswordError ] = React.useState<boolean>(false);
	const [ termError, setTermError ] = React.useState<boolean>(false);
	const dispatch = useDispatch();
	const { isSigningUp, me } = useSelector((state: RootState) => state.user);

	React.useEffect(
		() => {
			if (me) {
				alert('Go to main page because you are logged in.');
				Router.push('/');
			}
		},
		[ me && me.id ]
	);

	const onSubmit = React.useCallback(
		(e: React.FormEvent<EventTarget>): void => {
			e.preventDefault();
			if (!password) {
				setPasswordError(true);
			}

			if (password !== passwordCheck) {
				setPasswordError(true);
			}

			if (!term) {
				setTermError(true);
			}
			dispatch({
				type: SIGN_UP_REQUEST,
				data: {
					userId: id,
					password
				}
			});
		},
		[ id, password, passwordCheck, term ]
	);

	const onChangePasswordCheck = React.useCallback(
		(e: React.FormEvent<EventTarget>): void => {
			const target = e.target as HTMLInputElement;
			setPasswordError(target.value !== password);
			setPasswordCheck(target.value);
		},
		[ password ]
	);

	const onChangeTerm = React.useCallback((e: React.ChangeEvent): void => {
		const target = e.target as HTMLInputElement;
		setTermError(!target.checked);
		setTerm(target.checked);
	}, []);

	if (me) {
		return null;
	}

	return (
		<React.Fragment>
			<Form onSubmit={onSubmit}>
				<div>
					<label htmlFor="user-id">ID</label>
					<br />
					<Input name="user-id" required onChange={onChangeId} value={id} />
				</div>
				<div>
					<label htmlFor="user-password">Password</label>
					<br />
					<Input type="password" name="user-password" required onChange={onChangePassword} value={password} />
				</div>
				{passwordError && <ErrorMsg>This password is incorrect.</ErrorMsg>}
				<div>
					<label htmlFor="user-password-check">Password Check</label>
					<br />
					<Input
						type="password"
						name="user-password-check"
						onChange={onChangePasswordCheck}
						value={passwordCheck}
					/>
					{passwordError && <ErrorMsg>This password is incorrect</ErrorMsg>}
				</div>
				<div>
					<Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
						Please repeat that in a respectful way
					</Checkbox>
					{termError && <ErrorMsg>Please check the term.</ErrorMsg>}
				</div>
				<SignupDiv>
					<Button type="primary" htmlType="submit" loading={isSigningUp}>
						Submit
					</Button>
				</SignupDiv>
			</Form>
		</React.Fragment>
	);
};

export default Signup;
