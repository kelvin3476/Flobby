import React from "react";

import Header from "@/components/login/Header";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";

import usePasswordForm from "@/hooks/password/usePasswordForm";

import "@/styles/password/ResetPassword.scss";

const ResetPassword = () => {

    const {
        inputType,
        password,
        isPasswordValid,
        passwordError,
        handlePasswordBlur,
        handlePasswordChange,
        handlePasswordVisibility,
        confirmPasswordInputType,
        confirmPassword,
        isConfirmPasswordValid,
        confirmPasswordError,
        handleConfirmPasswordBlur,
        handleConfirmPasswordChange,
        handleConfirmPasswordVisibility,
        handlePasswordResetSubmit,
    } = usePasswordForm();

    return (
        <div className="reset-password-container">
            <div className="reset-password-title">
                <Header className="Header" headerTitle="비밀번호 재설정"/>
                <span>비밀번호는 문자+숫자+특수문자 조합 8~20자리를 입력해 주세요</span>
            </div>

            <main>
                <div className="input-container">
                    <label>
                        <Input
                            type={inputType}
                            value={password}
                            onClick={handlePasswordVisibility}
                            onChange={handlePasswordChange}
                            onBlur={handlePasswordBlur}
                            isValid={isPasswordValid}
                            errorMessage={passwordError}
                            placeholder="비밀번호를 입력해 주세요."
                        />
                    </label>
                    <label>
                        <Input
                            type={confirmPasswordInputType}
                            value={confirmPassword}
                            onClick={handleConfirmPasswordVisibility}
                            onChange={handleConfirmPasswordChange}
                            onBlur={handleConfirmPasswordBlur}
                            isValid={isConfirmPasswordValid}
                            errorMessage={confirmPasswordError}
                            placeholder="비밀번호를 한 번 더 입력해 주세요."
                        />
                    </label>
                </div>

                <Button className="change-password-button" title="비밀번호 변경" onClick={handlePasswordResetSubmit} />
            </main>
        </div>
    );
};

export default ResetPassword;