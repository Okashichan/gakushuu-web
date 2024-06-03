import { useRouter } from 'next/navigation';
import { Link as MuiLink } from "@mui/material";

export default function StyledLink({ href, children }) {

    const router = useRouter();

    const handleClick = (href) => {
        router.push(href);
        router.refresh();
    };

    return (
        <MuiLink underline="none" color='inherit' onClick={() => handleClick(href)}>
            {children}
        </MuiLink>
    );
}