import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <div className="header">
            <Link href="/about">
                <a>About</a>
            </Link>
        </div>
    );
};

export default Header