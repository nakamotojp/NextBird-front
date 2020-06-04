import * as React from 'react';
import styled from 'styled-components';
import { Form, Input, Checkbox, Button } from 'antd';

const FormComponent = styled(Form)`
  padding: 10;
`;

const ErrorMsg = styled.span`
  color: red;
`;

const SignupDiv = styled.div`
  margin-top: 10px;
`;

type UseInputType = [string, (e: React.FormEvent<EventTarget>) => void];

const Signup: React.FunctionComponent = () => {
  const useInput = (initialValue: string): UseInputType => {
    const [value, setter] = React.useState<string>(initialValue);
    const handler = React.useCallback((e: React.FormEvent<EventTarget>): void => {
      const target = e.target as HTMLInputElement;
      setter(target.value);
    }, []);
    return [value, handler];
  };

  const [id, onChangeId]: UseInputType = useInput('');
  const [password, onChangePassword]: UseInputType = useInput('');
  const [passwordCheck, setPasswordCheck] = React.useState<string>('');
  const [term, setTerm] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = React.useState<boolean>(false);
  const [termError, setTermError] = React.useState<boolean>(false);

  const onSubmit = React.useCallback(
    (e: React.FormEvent<EventTarget>): void => {
      if (!password) {
        setPasswordError(true);
      }

      if (password !== passwordCheck) {
        setPasswordError(true);
      }

      if (!term) {
        setTermError(true);
      }
      e.preventDefault();
    },
    [password, passwordCheck, term],
  );

  const onChangePasswordCheck = React.useCallback(
    (e: React.FormEvent<EventTarget>): void => {
      const target = e.target as HTMLInputElement;
      setPasswordError(target.value !== password);
      setPasswordCheck(target.value);
    },
    [password],
  );

  const onChangeTerm = React.useCallback((e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setTermError(!target.checked);
    setTerm(target.checked);
  }, []);

  return (
    <React.Fragment>
      <FormComponent onSubmit={onSubmit}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <Input name="user-id" required onChange={onChangeId} value={id} />
        </div>
        <div>
          <label htmlFor="user-password">Password</label>
          <br />
          <Input
            type="password"
            name="user-password"
            required
            onChange={onChangePassword}
            value={password}
          />
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
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Submit
          </Button>
        </SignupDiv>
      </FormComponent>
    </React.Fragment>
  );
};

export default Signup;