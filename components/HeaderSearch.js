"use client";

import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './HeaderClientComponents';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeaderSearch() {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (search.trim() === '') {
            return;
        }
        e.target.value = '';
        router.push(`/search/${search}`);
    }


    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Пошук…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        searchSubmitHandler(e);
                    }
                }}
            />
        </Search>
    )
}