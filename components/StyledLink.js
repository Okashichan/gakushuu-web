import Link from "next/link";
import { Link as MuiLink } from "@mui/material";

export default function StyledLink({ href, children }) {
    return (
        <Link href={href} passHref legacyBehavior>
            <MuiLink underline="none" color='inherit'>
                {children}
            </MuiLink>
        </Link>
    );
}