import React, { FormEvent, useEffect, useState } from "react";
import "@material/react-button/dist/button.css";
import "@material/react-typography/dist/typography.css";
import "./style.css";
import Button from "@material/react-button";
import { Headline1 } from "@material/react-typography";
import "@material/react-material-icon/dist/material-icon.css";
import MaterialIcon from "@material/react-material-icon";
import "@material/react-text-field/dist/text-field.css";
import TextField, { Input } from "@material/react-text-field";

interface CounterState {
  number: number;
  changeBy: number;
}

const initialState = {
  number: 0,
  changeBy: 10,
};

export const Counter = () => {
  const [state, setState] = useState<CounterState>(initialState);
  useEffect(() => {
    const lastState = localStorage.getItem("counter");
    if (lastState) {
      setState(JSON.parse(lastState));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("counter", JSON.stringify(state));
  }, [state]);
  const changeNumber = (newNumber: number) => {
    if (newNumber < 0) {
      return;
    }
    setState({
      ...state,
      number: newNumber,
    });
  };
  const setNewChangeBy = (newChangeBy: string) => {
    const changeBy = Number(newChangeBy);
    if (Number.isNaN(changeBy)) {
      return;
    }
    setState({
      ...state,
      changeBy: Number(newChangeBy),
    });
  };
  const reset = () => {
    setState({
      ...state,
      number: 0,
    });
  };
  return (
    <>
      <Headline1 className="counter__number">{state.number}</Headline1>
      <div className="counter__button-container">
        <Button className="counter__button-reset" onClick={reset}>
          Reset
        </Button>
        <div className="counter__change-by-input">
          <TextField outlined={true} label="Change By">
            <Input
              value={state.changeBy}
              onChange={(e: FormEvent<HTMLInputElement>): void =>
                setNewChangeBy(e.currentTarget.value)
              }
            />
          </TextField>
        </div>
        <span className="counter__buttons">
          <Button
            onClick={() => changeNumber(state.number - state.changeBy)}
            className="counter__button-minus"
          >
            <MaterialIcon icon="indeterminate_check_box" />
          </Button>

          <Button
            onClick={() => changeNumber(state.number + state.changeBy)}
            className="counter__button-add"
          >
            <MaterialIcon icon="add_box" />
          </Button>
        </span>
      </div>
    </>
  );
};
