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
import Card from "@material/react-card";
import "@material/react-card/dist/card.css";

interface CounterState {
  number: number;
  changeBy: string;
}

const initialState = {
  number: 0,
  changeBy: "10",
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
    setState({
      ...state,
      changeBy: newChangeBy,
    });
  };
  const reset = () => {
    setState({
      changeBy: "10",
      number: 0,
    });
  };
  const onChangeCounter = (type: "+" | "-") => {
    const changeBy = Number(state.changeBy);
    if (Number.isNaN(changeBy)) {
      return;
    }
    let newNumber: number;
    switch (type) {
      case "+":
        newNumber = state.number + changeBy;
        break;
      case "-":
        newNumber = state.number - changeBy;
        break;
    }
    changeNumber(newNumber);
  };
  return (
    <div className="counter__container">
      <Card className="counter__wrapper" outlined>
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
              onClick={() => onChangeCounter("-")}
              className="counter__button-minus"
            >
              <MaterialIcon icon="indeterminate_check_box" />
            </Button>

            <Button
              onClick={() => onChangeCounter("+")}
              className="counter__button-add"
            >
              <MaterialIcon icon="add_box" />
            </Button>
          </span>
        </div>
      </Card>
    </div>
  );
};
