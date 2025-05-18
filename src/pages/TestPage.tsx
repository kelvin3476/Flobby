import React from 'react';

import Main from '../api/main/Main';

const TestPage = () => {
  const refFileInput = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
    
        const jsonData = {
            clubName: '개발자 독서모임',
            description: "우리 모임은 개발자들이 함께 모여 기술 서적을 읽고, 새로운 기술 트렌드와 개발 문화를 공유하는 자리입니다. 책을 통해 지식을 쌓고, 서로의 경험을 나누며, 함께 성장할 수 있는 기회를 제공합니다. 매달 정해진 주제에 맞는 도서를 선정하여, 각자 읽고 생각을 나누는시간을 가질 예정입니다. 다양한 개발 분야에 관심이 있는 분들의 많은 참여를 기다립니다.",
            mainCategory: '자기계발',
            subCategory: 'IT',
            location: 218,
            maxMembers: 20,
            autoApprovalFlag: false,
        }

        formData.append('data', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));

        for (const x of formData) {
            console.log(x);
        }
    
        try {
          const response = await Main.createClub(formData);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
    }
  };

  return (
    <>
      <input type="file" ref={refFileInput} onChange={handleFileChange} />
    </>
  );
};

export default TestPage;
