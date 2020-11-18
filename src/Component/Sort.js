import React from 'react'
import { Dropdown } from 'semantic-ui-react';
import "./Sort.css";

function Sort({setSorting}) {

    return (
        <div className="sort__sort">
            <Dropdown
                text='Sort'
                icon='sort'
                floating
                labeled
                button
                className='icon sort__btn'
            >
                <Dropdown.Menu>
                    <Dropdown.Header icon='tags' content='Sort by tag' />
                    <Dropdown.Divider />
                    <Dropdown.Item
                        onClick={() => { setSorting('recent') }}
                        text="Recent Added"
                    />
                    <Dropdown.Item
                        onClick={() => { setSorting('rating') }}
                        text="Rating"
                    />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Sort
