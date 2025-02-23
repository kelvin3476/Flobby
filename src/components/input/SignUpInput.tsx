// Input이 이미있어서 재사용하려고했으나, 다른부분이 꽤있어안건드리고 새로 생성
// 리팩토링 필요

import React from "react";
import Button from "../button/Button";

interface InputProps {
    type: string;
    name: string;
    value: string;
    onClick?: (value: string) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    isValid: boolean;
    errorMessage?: [string,string] ;
    placeholder: string;
    className?: string;
    maxLength: number;
    timer?: string; //타이머 ex)인증번호
    show?:string[]; //ex) show true인 className 담기
}

const SignUpInput: React.FC<InputProps> = ({
                                         type,
                                         name,
                                         value,
                                         onChange,
                                         onClick,
                                         onBlur,
                                         isValid,
                                         errorMessage,
                                         className,
                                         placeholder,
                                         maxLength,
                                         timer,
                                         show


                                     }) => {
    return (
      <div>
        <input
          type={type !== 'password' ? type :  show.filter((el)=> el === name).length > 0 ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={
            className
              ? `${className} ${value.length > 0 && !isValid ? 'warning' : ''}`
              : value.length > 0 && !isValid
                ? 'warning'
                : ''
          }
          maxLength={maxLength}
        />
        {name === 'verification-code' ? (
          <div className="verification-code">
            <Button
              type="reset"
              className={value.length ? 'reset show' : 'reset'}
              onClick={() =>
                onChange({
                  target: { value: '' },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
            <span className="timer">{timer}</span>
          </div>
        ) : name === 'password' || name === 'check_password' ? (
          <div className="password">
            <Button
              type="reset"
              className={value.length ? 'reset show' : 'reset'}
              onClick={() =>
                onChange({
                  target: { value: '' },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
            <span className="show-password"
            onClick={()=> onClick(name)}></span>
          </div>
        ) : (
          <>
            <Button
              type="reset"
              className={value.length ? 'reset show' : 'reset'}
              onClick={() =>
                onChange({
                  target: { value: '' },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          </>
        )}

        {errorMessage && <p className={errorMessage[0]}>{errorMessage[1]}</p>}
      </div>
    );
};

export default SignUpInput;