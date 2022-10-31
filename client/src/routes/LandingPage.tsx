import { Dispatch, SetStateAction } from "react";
import { WelcomeSection } from "../components/landing/WelcomeSection";

export const LandingPage = ({ onLogin }: {
  onLogin: React.Dispatch<React.SetStateAction<string | undefined>>
}) => {

  return (
      <WelcomeSection onLogin={ onLogin } position={'absolute'} />
  );
}
