import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  async function sigunupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could not create use, Please check your input and try again later!"
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating)
    return <LoadingOverlay message={"Is creating user...."} />;
  return <AuthContent onAuthenticate={sigunupHandler} />;
}

export default SignupScreen;
