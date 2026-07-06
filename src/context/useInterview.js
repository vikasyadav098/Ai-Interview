import { useContext } from "react";
import { InterviewContext } from "./InterviewContext";

export const useInterview = () => useContext(InterviewContext);
