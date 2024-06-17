import { useEffect, useState } from "react";
import { InputRadio } from "./InputRadio";

const InputRadioDescription = (props) => {
  const [activeRadio, setActiveRadio] = useState("");

  const handleRadioChange = (radioValue) => {
    setActiveRadio(radioValue);
  };
  useEffect(() => {
    props.showFunc(activeRadio=='label3');
  }, [activeRadio]);

  return (
    <>
      <InputRadio
        nameProp={"name"}
        activeProp={activeRadio}
        valueProp={"label1"}
        descriptionProp={"Без оценивания"}
        funcProp={handleRadioChange}
      />
      <InputRadio
        nameProp={"name"}
        activeProp={activeRadio}
        valueProp={"label2"}
        descriptionProp={"Оценивание по шкале без критериев"}
        funcProp={handleRadioChange}
        children={
          <>
            <InputRadio
              nameProp={"nameCh"}
              valueProp={"label"}
              descriptionProp={"Зачет/Незачет"}
            />
            <InputRadio
              nameProp={"nameCh"}
              valueProp={"labelCh"}
              descriptionProp={"Пятибальная шкала"}
            />
            <InputRadio
              nameProp={"nameCh"}
              valueProp={"labelCh"}
              descriptionProp={"Стобальная шкала"}
            />
          </>
        }
      />
      <InputRadio
        nameProp={"name"}
        activeProp={activeRadio}
        valueProp={"label3"}
        descriptionProp={"Оценивание по шкале с критериями"}
        funcProp={handleRadioChange}
        children={
          <>
            <InputRadio
              nameProp={"nameCh"}
              valueProp={"labelCh"}
              descriptionProp={"Зачет/Незачет"}
            />
            <InputRadio
              nameProp={"nameCh"}
              valueProp={"labelCh"}
              descriptionProp={"Пятибальная шкала"}
            />
            <InputRadio
              nameProp={"nameCh"}
              valueProp={"labelCh"}
              descriptionProp={"Стобальная шкала"}
            />
          </>
        }
      />
    </>
  );
};

export { InputRadioDescription };
