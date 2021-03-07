import React, { useState, useEffect } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect'

import { listAuthors } from '../../services/authors';

function AuthorDropdown({ value, onChange }) {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            const data = await listAuthors();
            setAuthors(data);
        };

        fetchAuthors();
    }, []);

    return (
        <div className="AuthorDropdown">
            <Multiselect
                value={ value }
                data={ authors }
                textField="firstName"
                valueField="id"
                onChange={ onChange }
                allowCreate={ true }
            />
        </div>
    );
}

export default AuthorDropdown;
