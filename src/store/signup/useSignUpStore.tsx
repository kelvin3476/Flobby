import { create } from 'zustand';
import React from "react";

interface SignUpStore {
 signUpData : {
     nickname: string;
     phone: string;
     email: string;
     password: string;
     checkPassword: string;
     foreignerYn: string;
 };
 setSignUpData : (e:React.ChangeEvent<HTMLInputElement>)=> void;
}

const useSignUpStore = create<SignUpStore>(set => ({
    signUpData : {
        nickname: "",
        phone: "",
        email: "",
        password: "",
        checkPassword: "",
        foreignerYn: "N",
    },
   setSignUpData: (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
          set((state) => ({
              signUpData: {...state.signUpData, [name]: value}
          }))

  },
    }));

export default useSignUpStore;
