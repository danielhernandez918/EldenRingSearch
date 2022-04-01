import React from 'react';
import {Link} from 'react-router-dom'
import './styles.css';

const Categories = () => {
    return (
            <div className='center '>
                <h1 className='text-decoration-underline '>Categories </h1>
                <h2>
                    <ul>
                        <li><Link className="noLine" to ={ `/list/ammos` }>Ammos</Link></li>
                        <li><Link className="noLine" to ={ `/list/armors` }>Armors</Link></li>
                        <li><Link className="noLine" to ={ `/list/ashes` }>Ashes</Link></li>
                        <li><Link className="noLine" to ={ `/list/incantations` }>Incantations</Link></li>
                        <li><Link className="noLine" to ={ `/list/items` }>Items</Link></li>
                        <li><Link className="noLine" to ={ `/list/shields` }>Shields</Link></li>
                        <li><Link className="noLine" to ={ `/list/sorceries` }>Sorceries</Link></li>
                        <li><Link className="noLine" to ={ `/list/spirits` }>Spirits</Link></li>
                        <li><Link className="noLine" to ={ `/list/talismans` }>Talismans</Link></li>
                        <li><Link className="noLine" to ={ `/list/weapons` }>Weapons</Link></li>
                    </ul>
                </h2>
            </div>
    )
}

export default Categories;