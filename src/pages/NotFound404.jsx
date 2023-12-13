
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FlexBox, FlexRowCenter } from "../components/flex-box";
import Image from "../components/Image";
import notfound from '../assets/404.svg'

const NotFound404 = () => {
    const navigate = useNavigate()

    const handleGoBack = () => navigate(-1)

    return (
        <FlexRowCenter px={2} minHeight="100vh" flexDirection="column">
            <Image
                src={notfound}
                sx={{
                    display: "block",
                    maxWidth: 320,
                    width: "100%",
                    mb: 3,
                }}
            />

            <FlexBox flexWrap="wrap">
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                        m: 1,
                    }}
                    onClick={handleGoBack}
                >
                    Go Back
                </Button>

                <Link to="/" >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            m: 1,
                        }}
                    >
                        Go to Home
                    </Button>
                </Link>
            </FlexBox>
        </FlexRowCenter>
    );
};

export default NotFound404;
