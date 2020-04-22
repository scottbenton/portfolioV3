import React, { FunctionComponent } from "react";
import { Card } from "components/shared/Card";
import { Button, ButtonVariants } from "components/shared/Button";
import { ThemeColors } from "utils/theme-utils";
import { useFirebase } from "providers/FirebaseProvider";
import { useHistory } from "react-router-dom";

export const LoginPage: FunctionComponent = props => {
  const { login } = useFirebase();
  const history = useHistory();

  const handleClick = () => {
    if (login) {
      login(() => {
        console.debug("logged in");
        history.push("/");
      });
    }
  };

  return (
    <div className={"h-full relative"}>
      <div className={"center-in-screen mx-auto"}>
        <Card className={"max-w-md m-2 mx-auto text-center center p-6"}>
          <h1 className={"text-2xl mb-8 font-bold"}>Login to Edit</h1>
          <Button
            variant={ButtonVariants.outlined}
            color={ThemeColors.secondary}
            onClick={handleClick}
          >
            Login with Google
          </Button>
        </Card>
      </div>
    </div>
  );
};
