

import { FlexRowCenter } from "../components/flex-box";
import Signup from "../components/sessions/Signup";

const SignUp = () => {
    return (
        <FlexRowCenter sx={{ width: "100%" }} flexDirection="column" minHeight="100vh">
            <Signup />
        </FlexRowCenter>
    );
};

export default SignUp;
