import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function PrivateRoute(props: any) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('profile-token') ?? "";
        let decodedToken = null;

        try {
            decodedToken = jwtDecode(token);
            localStorage.setItem('decodedtoken', JSON.stringify(decodedToken))
        }
        catch (err) {

        }

        if (!decodedToken || !isValidToken(decodedToken)) {
            navigate('/');
        }
    }, []);

    return <>
        {props.children}
    </>

    function isValidToken(decodedToken: any): boolean {
        const expEpoch = decodedToken.exp * 1000;
        const nowEpoch = new Date().getTime();

        const tokenHasExpired = nowEpoch >= expEpoch
        if (tokenHasExpired)
            return false;

        return true;
    }
}

export default PrivateRoute;